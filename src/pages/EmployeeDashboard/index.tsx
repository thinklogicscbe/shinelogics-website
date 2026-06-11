import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const today = new Date().toLocaleDateString("en-GB").split("/").join("-");

// ── Score calculator ──────────────────────────────────────────────────────────
const calcScore = (task: any) => {
  const pct = Math.min((task.actualPercent || 0) / (task.targetPercent || 100), 1) * 60;
  const hrs =
    task.estimatedHours > 0
      ? Math.min(task.estimatedHours / Math.max(task.actualHours || 0.1, 0.1), 1) * 40
      : 40;
  return Math.round(pct + hrs);
};

// ── Time helpers ──────────────────────────────────────────────────────────────
const toMinutes = (t: string): number => {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const calcSegmentHours = (segments: any[], breakMins: number): number => {
  const total = (segments || []).reduce((acc: number, s: any) => {
    const diff = toMinutes(s.end) - toMinutes(s.start);
    return acc + (diff > 0 ? diff : 0);
  }, 0);
  const net = Math.max(total - (breakMins || 0), 0);
  return Math.round((net / 60) * 4) / 4;
};

const fmtTimer = (ms: number): string => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
};

const fmtClockTime = (d: Date): string =>
  d.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

// ── localStorage helpers ──────────────────────────────────────────────────────
// Key: "break_<slotId>_<DD-MM-YYYY>"  so data auto-expires each day
const breakStorageKey = (slotId: string) => `break_${slotId}_${today}`;

// ── Interfaces ────────────────────────────────────────────────────────────────
interface TimeSegment { start: string; end: string; }

interface TaskItem {
  taskNumber:     number;
  title:          string;
  subPoints?:     string[];
  shortDesc?:     string;
  dependency?:    string;
  timeSegments?:  TimeSegment[];
  breakMinutes?:  number;
  estimatedHours: number;
  actualHours:    number;
  targetPercent:  number;
  actualPercent:  number;
  plannedStart?:  string;
  plannedEnd?:    string;
  actualStart?:   string;
  actualEnd?:     string;
  status:         "Todo" | "In Progress" | "Done" | "Incomplete";
  score:          string;
  impact:         string;
}

interface TaskDoc {
  _id:            string;
  date:           string;
  location:       string;
  dependency:     string;
  workMode:       string;
  tasks:          TaskItem[];
  overallHours:   number;
  overallScore:   string;
  isOutSubmitted: boolean;
  inTime:         string;
  outTime:        string;
}

interface EmployeeUser {
  id:           string;
  firstName:    string;
  email:        string;
  designation:  string;
  department:   string;
  employeeCode: number;
  role?:        string;
  companyId?:   string;
  teamIds?:     string[];
}

// ── Break session (a single start→stop) ──────────────────────────────────────
interface BreakSession {
  startIso: string; // ISO string — serialisable
  endIso:   string;
  mins:     number;
}

// ── Persisted state shape for one slot ───────────────────────────────────────
interface SlotPersistedState {
  elapsedMs:      number;
  sessions:       BreakSession[];
  runningStartIso: string | null; // non-null means timer was running when page closed
}

const STATUS_OPTIONS = [
  "Todo", "Started", "In Progress", "Paused", "Blocked",
  "Completed Local", "Ready For Testing", "Testing In Progress",
  "Test Passed", "Ready For Production", "Production Released", "Closed",
];

const emptySegment = (): TimeSegment => ({ start: "", end: "" });

const emptyInTask = () => ({
  title: "", shortDesc: "", subPoints: [""], dependency: "",
  timeSegments: [emptySegment()], breakMinutes: 0,
  estimatedHours: 0, targetPercent: 100, plannedStart: "", plannedEnd: "",
});

// ── Break Slot Definition ─────────────────────────────────────────────────────
// No fixed windows — breaks can be taken any time during the day.
// Allotted is the budget; the tracker just measures how much you actually took.
interface BreakSlot {
  id:       "morning" | "lunch" | "evening";
  label:    string;
  emoji:    string;
  allotted: number; // budget in minutes
  hint:     string; // display hint e.g. "Suggested: 11:00 AM"
  color:    { bg: string; border: string; text: string; badge: string };
}

const BREAK_SLOTS: BreakSlot[] = [
  {
    id: "morning", label: "Morning break", emoji: "☕",
    allotted: 30, hint: "30 min allotted",
    color: { bg: "#FEF9C3", border: "#FBBF24", text: "#92400E", badge: "#FDE68A" },
  },
  {
    id: "lunch", label: "Lunch break", emoji: "🍱",
    allotted: 60, hint: "60 min allotted",
    color: { bg: "#DCFCE7", border: "#86EFAC", text: "#15803D", badge: "#BBF7D0" },
  },
  {
    id: "evening", label: "Evening break", emoji: "🌤",
    allotted: 30, hint: "30 min allotted",
    color: { bg: "#E0F2FE", border: "#7DD3FC", text: "#0369A1", badge: "#BAE6FD" },
  },
];

// ── Exported break log entry shown in task details ────────────────────────────
export interface BreakLogEntry {
  slotId:    string;
  slotLabel: string;
  emoji:     string;
  sessions:  BreakSession[];
  totalMins: number;
}

// ── Single Break Timer Component ──────────────────────────────────────────────
interface BreakTimerProps {
  slot:     BreakSlot;
  onUpdate: (id: string, takenMins: number, sessions: BreakSession[]) => void;
}

const BreakTimer: React.FC<BreakTimerProps> = ({ slot, onUpdate }) => {
  const key = breakStorageKey(slot.id);

  // ── Initialise from localStorage ─────────────────────────────────────────
  const initState = (): { elapsedMs: number; sessions: BreakSession[] } => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return { elapsedMs: 0, sessions: [] };
      const saved: SlotPersistedState = JSON.parse(raw);
      let elapsedMs = saved.elapsedMs ?? 0;
      // If the timer was running when the page closed, count the gap as elapsed
      if (saved.runningStartIso) {
        const gap = Date.now() - new Date(saved.runningStartIso).getTime();
        elapsedMs += gap;
      }
      return { elapsedMs, sessions: saved.sessions ?? [] };
    } catch { return { elapsedMs: 0, sessions: [] }; }
  };

  const init = initState();

  const [running, setRunning]               = useState(false);
  const [elapsed, setElapsed]               = useState(init.elapsedMs);
  const [sessionStart, setSessionStart]     = useState<Date | null>(null);
  const [sessionElapsed, setSessionElapsed] = useState(0);
  const [sessions, setSessions]             = useState<BreakSession[]>(init.sessions);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Persist to localStorage ───────────────────────────────────────────────
  const persist = useCallback((
    elapsedMs: number,
    sess: BreakSession[],
    runningStart: Date | null,
  ) => {
    const data: SlotPersistedState = {
      elapsedMs,
      sessions: sess,
      runningStartIso: runningStart ? runningStart.toISOString() : null,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }, [key]);

  // Live ticker
  useEffect(() => {
    if (running && sessionStart) {
      tickRef.current = setInterval(() => {
        setSessionElapsed(Date.now() - sessionStart.getTime());
      }, 500);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [running, sessionStart]);

  // Notify parent on mount if we have restored data
  useEffect(() => {
    if (init.elapsedMs > 0) {
      onUpdate(slot.id, Math.round(init.elapsedMs / 60000), init.sessions);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    const start = new Date();
    setSessionStart(start);
    setSessionElapsed(0);
    setRunning(true);
    persist(elapsed, sessions, start);
  };

  const handleStop = () => {
    if (!sessionStart) return;
    const endTime    = new Date();
    const durMs      = endTime.getTime() - sessionStart.getTime();
    const mins       = Math.max(1, Math.round(durMs / 60000));
    const newElapsed = elapsed + durMs;
    const newSession: BreakSession = {
      startIso: sessionStart.toISOString(),
      endIso:   endTime.toISOString(),
      mins,
    };
    const newSessions = [...sessions, newSession];

    setRunning(false);
    setSessionStart(null);
    setSessionElapsed(0);
    setElapsed(newElapsed);
    setSessions(newSessions);
    persist(newElapsed, newSessions, null);
    onUpdate(slot.id, Math.round(newElapsed / 60000), newSessions);
  };

  const displayMs   = running ? elapsed + sessionElapsed : elapsed;
  const totalTaken  = Math.round(displayMs / 60000);
  const extra       = totalTaken - slot.allotted;
  const withinLimit = extra <= 0;
  const hasTaken    = sessions.length > 0 || running;

  return (
    <div className="break-slot-card" style={{ borderColor: slot.color.border }}>
      {/* Header */}
      <div className="bsc-header">
        <div className="bsc-title-row">
          <span className="bsc-emoji">{slot.emoji}</span>
          <div>
            <div className="bsc-name" style={{ color: slot.color.text }}>{slot.label}</div>
            <div className="bsc-slot-time">{slot.hint}</div>
          </div>
        </div>
        {running ? (
          <span className="bsc-live-badge">
            <span className="break-pulse" style={{ background: slot.color.text }} /> Live
          </span>
        ) : hasTaken ? (
          <span className="bsc-used-badge" style={{ background: slot.color.badge, color: slot.color.text }}>
            ✓ Taken
          </span>
        ) : null}
      </div>

      {/* Timer */}
      <div className="bsc-timer" style={{ color: running ? slot.color.text : "#1a1a2e" }}>
        {fmtTimer(displayMs)}
      </div>

      {/* Progress bar */}
      <div className="bsc-progress-wrap">
        <div className="bsc-progress-bar">
          <div
            className="bsc-progress-fill"
            style={{
              width: `${Math.min((totalTaken / slot.allotted) * 100, 100)}%`,
              background: withinLimit ? slot.color.text : "#E24B4A",
            }}
          />
          {!withinLimit && (
            <div className="bsc-progress-extra"
              style={{ width: `${Math.min((extra / slot.allotted) * 100, 60)}%` }} />
          )}
        </div>
        <div className="bsc-progress-labels">
          <span style={{ color: slot.color.text, fontWeight: 600 }}>{totalTaken} / {slot.allotted} min</span>
          {!withinLimit ? (
            <span className="bsc-extra-label">+{extra} min extra ⚠️</span>
          ) : (
            <span className="bsc-ok-label" style={{ color: slot.color.text }}>
              {slot.allotted - totalTaken} min left ✓
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bsc-controls">
        {!running ? (
          <button type="button" className="bsc-start-btn"
            style={{ background: slot.color.bg, borderColor: slot.color.border, color: slot.color.text }}
            onClick={handleStart}>
            ▶ Start {slot.label.toLowerCase()}
          </button>
        ) : (
          <button type="button" className="bsc-stop-btn" onClick={handleStop}>
            ■ Stop break
          </button>
        )}
      </div>

      {/* Session log */}
      {sessions.length > 0 && (
        <div className="bsc-log">
          {sessions.map((s, i) => (
            <div className="bsc-log-item" key={i}>
              <span className="bsc-log-time">
                {fmtClockTime(new Date(s.startIso))} – {fmtClockTime(new Date(s.endIso))}
              </span>
              <span className="bsc-log-mins"
                style={{ background: slot.color.badge, color: slot.color.text }}>
                {s.mins} min
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Break Tracker Panel ───────────────────────────────────────────────────────
interface BreakTrackerProps {
  onBreakUpdate: (breakTotals: Record<string, number>, breakLog: BreakLogEntry[]) => void;
}

const BreakTracker: React.FC<BreakTrackerProps> = ({ onBreakUpdate }) => {
  const [breakTotals, setBreakTotals] = useState<Record<string, number>>({
    morning: 0, lunch: 0, evening: 0,
  });
  const [breakSessions, setBreakSessions] = useState<Record<string, BreakSession[]>>({
    morning: [], lunch: [], evening: [],
  });

  const handleSlotUpdate = (id: string, takenMins: number, sessions: BreakSession[]) => {
    setBreakTotals((prevTotals) => {
      const updatedTotals = { ...prevTotals, [id]: takenMins };
      setBreakSessions((prevSess) => {
        const updatedSess = { ...prevSess, [id]: sessions };
        // Build full log and notify parent
        const log: BreakLogEntry[] = BREAK_SLOTS.map((slot) => ({
          slotId:    slot.id,
          slotLabel: slot.label,
          emoji:     slot.emoji,
          sessions:  updatedSess[slot.id] ?? [],
          totalMins: updatedTotals[slot.id] ?? 0,
        })).filter((e) => e.totalMins > 0);
        onBreakUpdate(updatedTotals, log);
        return updatedSess;
      });
      return updatedTotals;
    });
  };

  const totalAllotted = BREAK_SLOTS.reduce((s, b) => s + b.allotted, 0);
  const totalTaken    = Object.values(breakTotals).reduce((s, v) => s + v, 0);
  const totalExtra    = Math.max(totalTaken - totalAllotted, 0);
  const totalSaved    = Math.max(totalAllotted - totalTaken, 0);

  return (
    <div className="break-tracker-panel">
      <div className="btp-header">
        <span className="btp-title">⏱ Break tracker</span>
        <div className="btp-summary">
          <span className="btp-stat total">
            Today: <strong>{totalTaken} / {totalAllotted} min</strong>
          </span>
          {totalExtra > 0 && <span className="btp-stat extra">+{totalExtra} min over ⚠️</span>}
          {totalSaved > 0 && totalTaken > 0 && <span className="btp-stat saved">{totalSaved} min saved ✓</span>}
        </div>
      </div>
      <div className="btp-slots">
        {BREAK_SLOTS.map((slot) => (
          <BreakTimer key={slot.id} slot={slot} onUpdate={handleSlotUpdate} />
        ))}
      </div>
    </div>
  );
};

// ── Break Log Panel (shown inside task detail) ────────────────────────────────
const BreakLogPanel: React.FC<{ log: BreakLogEntry[] }> = ({ log }) => {
  if (log.length === 0) return null;
  return (
    <div className="break-log-panel">
      <div className="blp-title">☕ Today's break log</div>
      <div className="blp-slots">
        {log.map((entry) => {
          const slot = BREAK_SLOTS.find((s) => s.id === entry.slotId)!;
          return (
            <div key={entry.slotId} className="blp-slot" style={{ borderColor: slot.color.border }}>
              <div className="blp-slot-header" style={{ background: slot.color.bg }}>
                <span>{entry.emoji} {entry.slotLabel}</span>
                <span className="blp-total" style={{ color: slot.color.text }}>
                  {entry.totalMins} / {slot.allotted} min
                </span>
              </div>
              <div className="blp-sessions">
                {entry.sessions.map((s, i) => (
                  <div key={i} className="blp-session-row">
                    <span className="blp-session-time">
                      {fmtClockTime(new Date(s.startIso))} – {fmtClockTime(new Date(s.endIso))}
                    </span>
                    <span className="blp-session-mins"
                      style={{ background: slot.color.badge, color: slot.color.text }}>
                      {s.mins} min
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const EmployeeDashboard: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeUser | null>(null);
  const navigate = useNavigate();

  const [todayTask,  setTodayTask]  = useState<TaskDoc | null>(null);
  const [pastTasks,  setPastTasks]  = useState<TaskDoc[]>([]);
  const [activeTab,  setActiveTab]  = useState<"today" | "history" | "leave">("today");

  const [location,    setLocation]    = useState("O-CBE");
  const [dependency,  setDependency]  = useState("");
  const [workMode,    setWorkMode]    = useState("Office");
  const [inTasks,     setInTasks]     = useState<any[]>([emptyInTask()]);
  const [isEditingIN, setIsEditingIN] = useState(false);

  const [outTasks,     setOutTasks]     = useState<TaskItem[]>([]);
  const [overallHours, setOverallHours] = useState(0);
  const [overallScore, setOverallScore] = useState("");
  const [isEditingOUT, setIsEditingOUT] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // ── Break log state (lifted from BreakTracker) ────────────────────────────
  const [breakLog, setBreakLog] = useState<BreakLogEntry[]>([]);

  const [leaves,       setLeaves]       = useState<any[]>([]);
  const [leaveType,    setLeaveType]    = useState("Sick Leave");
  const [fromDate,     setFromDate]     = useState("");
  const [toDate,       setToDate]       = useState("");
  const [leaveReason,  setLeaveReason]  = useState("");
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [leaveMessage, setLeaveMessage] = useState({ text: "", type: "" });

  // ── Break tracker callback ────────────────────────────────────────────────
  const handleBreakUpdate = useCallback(
    (breakTotals: Record<string, number>, log: BreakLogEntry[]) => {
      setBreakLog(log);
      const totalMins = Object.values(breakTotals).reduce((s, v) => s + v, 0);
      if (totalMins === 0) return;

      setInTasks((prev) => {
        const taskDurations = prev.map((t) =>
          (t.timeSegments || []).reduce((acc: number, s: TimeSegment) => {
            if (s.start && s.end) {
              const diff = toMinutes(s.end) - toMinutes(s.start);
              return acc + (diff > 0 ? diff : 0);
            }
            return acc;
          }, 0)
        );
        const grandTotal = taskDurations.reduce((a, b) => a + b, 0);
        if (grandTotal === 0) return prev;

        return prev.map((t, i) => {
          if (taskDurations[i] === 0) return t;
          const share     = taskDurations[i] / grandTotal;
          const taskBreak = Math.round(totalMins * share);
          const estHours  = calcSegmentHours(t.timeSegments || [], taskBreak);
          return { ...t, breakMinutes: taskBreak, estimatedHours: estHours };
        });
      });
    },
    []
  );

  // ── Fetchers ──────────────────────────────────────────────────────────────
  const fetchTodayTask = useCallback(async (empId: string) => {
    try {
      const res    = await fetch(`${BASE_URL}/tasks/employee/${empId}?date=${today}`);
      const result = await res.json();
      if (result.success && result.result?.tasks?.length > 0) {
        const task = result.result.tasks[0];
        setTodayTask(task);
        setOutTasks(
          task.tasks.map((t: TaskItem) => ({
            ...t,
            actualHours:   t.actualHours   ?? t.estimatedHours,
            actualPercent: t.actualPercent  ?? 0,
            actualStart:   (t as any).actualStart ?? "",
            actualEnd:     (t as any).actualEnd   ?? "",
            score:         t.score  || "N/A",
            impact:        t.impact || "",
            status:        t.status || "Todo",
          }))
        );
        setOverallHours(task.overallHours || 0);
        setOverallScore(task.overallScore  || "");
      }
    } catch (err) { console.error(err); }
  }, []);

  const fetchPastTasks = useCallback(async (empId: string) => {
    try {
      const res    = await fetch(`${BASE_URL}/tasks/employee/${empId}`);
      const result = await res.json();
      if (result.success) setPastTasks(result.result?.tasks || []);
    } catch (err) { console.error(err); }
  }, []);

  const fetchLeaves = useCallback(async (empId: string) => {
    try {
      const res    = await fetch(`${BASE_URL}/leaves/employee/${empId}`);
      const result = await res.json();
      if (result.success) setLeaves(result.result?.leaves || []);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (!stored) { navigate("/Employee"); return; }
    const emp = JSON.parse(stored);
    setEmployee(emp);
    fetchTodayTask(emp.id);
    fetchPastTasks(emp.id);
    fetchLeaves(emp.id);
  }, [navigate, fetchTodayTask, fetchPastTasks, fetchLeaves]);

  // ── IN handlers ───────────────────────────────────────────────────────────
  const addInTask    = () => setInTasks([...inTasks, emptyInTask()]);
  const removeInTask = (i: number) => {
    if (inTasks.length > 1) setInTasks(inTasks.filter((_, idx) => idx !== i));
  };
  const updateInTask = (i: number, field: string, value: any) => {
    const u = [...inTasks]; u[i] = { ...u[i], [field]: value }; setInTasks(u);
  };

  const addSubPoint = (ti: number) => {
    const u = [...inTasks];
    u[ti] = { ...u[ti], subPoints: [...(u[ti].subPoints || []), ""] };
    setInTasks(u);
  };
  const removeSubPoint = (ti: number, pi: number) => {
    const u = [...inTasks];
    const pts = [...(u[ti].subPoints || [])];
    pts.splice(pi, 1);
    u[ti] = { ...u[ti], subPoints: pts };
    setInTasks(u);
  };
  const updateSubPoint = (ti: number, pi: number, value: string) => {
    const u = [...inTasks];
    const pts = [...(u[ti].subPoints || [])];
    pts[pi] = value;
    u[ti] = { ...u[ti], subPoints: pts };
    setInTasks(u);
  };

  const addSegment = (ti: number) => {
    const u = [...inTasks];
    u[ti] = { ...u[ti], timeSegments: [...(u[ti].timeSegments || []), emptySegment()] };
    setInTasks(u);
  };
  const removeSegment = (ti: number, si: number) => {
    const u = [...inTasks];
    const segs = [...(u[ti].timeSegments || [])];
    if (segs.length <= 1) return;
    segs.splice(si, 1);
    const estHours = calcSegmentHours(segs, u[ti].breakMinutes || 0);
    u[ti] = { ...u[ti], timeSegments: segs, estimatedHours: estHours,
      plannedStart: segs[0]?.start ?? "", plannedEnd: segs[segs.length - 1]?.end ?? "" };
    setInTasks(u);
  };
  const updateSegment = (ti: number, si: number, field: "start" | "end", value: string) => {
    const u = [...inTasks];
    const segs = [...(u[ti].timeSegments || [])];
    segs[si] = { ...segs[si], [field]: value };
    const estHours = calcSegmentHours(segs, u[ti].breakMinutes || 0);
    u[ti] = { ...u[ti], timeSegments: segs, estimatedHours: estHours,
      plannedStart: segs[0]?.start ?? "", plannedEnd: segs[segs.length - 1]?.end ?? "" };
    setInTasks(u);
  };
  const updateBreak = (ti: number, mins: number) => {
    const u = [...inTasks];
    u[ti] = { ...u[ti], breakMinutes: mins,
      estimatedHours: calcSegmentHours(u[ti].timeSegments || [], mins) };
    setInTasks(u);
  };

  const handleEditIN = () => {
    if (!todayTask) return;
    setLocation(todayTask.location);
    setDependency(todayTask.dependency);
    setWorkMode(todayTask.workMode || "Office");
    setInTasks(
      todayTask.tasks.map((t: any) => {
        // timeSegments priority:
        // 1. Saved timeSegments with at least one real start/end value
        // 2. Reconstruct single block from plannedStart + plannedEnd (backend may not return timeSegments array)
        // 3. Empty fallback
        const hasSavedSegs =
          Array.isArray(t.timeSegments) &&
          t.timeSegments.length > 0 &&
          t.timeSegments.some((s: any) => s.start || s.end);

        const timeSegments: TimeSegment[] = hasSavedSegs
          ? t.timeSegments.map((s: any) => ({ start: s.start ?? "", end: s.end ?? "" }))
          : (t.plannedStart || t.plannedEnd)
            ? [{ start: t.plannedStart ?? "", end: t.plannedEnd ?? "" }]
            : [emptySegment()];

        return {
          title:          t.title          ?? "",
          shortDesc:      t.shortDesc      ?? "",
          dependency:     t.dependency     ?? "",
          estimatedHours: t.estimatedHours ?? 0,
          targetPercent:  t.targetPercent  ?? 100,
          plannedStart:   t.plannedStart   ?? "",
          plannedEnd:     t.plannedEnd     ?? "",
          timeSegments,
          breakMinutes:   t.breakMinutes   ?? 0,
          subPoints:      t.subPoints?.length ? [...t.subPoints] : [""],
        };
      })
    );
    setIsEditingIN(true);
    setMessage({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEditIN = () => { setIsEditingIN(false); setMessage({ text: "", type: "" }); };

  const handleINSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    const cleanedTasks = inTasks.map((t, i) => ({
      ...t, taskNumber: i + 1,
      subPoints: (t.subPoints || []).filter((p: string) => p.trim() !== ""),
    }));
    try {
      if (isEditingIN && todayTask) {
        const res    = await fetch(`${BASE_URL}/tasks/in/${todayTask._id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location, dependency, workMode, tasks: cleanedTasks }),
        });
        const result = await res.json();
        if (result.success) {
          setMessage({ text: "✅ IN update edited successfully!", type: "success" });
          setIsEditingIN(false);
          fetchTodayTask(employee.id); fetchPastTasks(employee.id);
        } else { setMessage({ text: result.message || "Failed", type: "error" }); }
      } else {
        const res    = await fetch(`${BASE_URL}/tasks/in`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId: employee.id, employeeName: employee.firstName,
            date: today, location, dependency, workMode, tasks: cleanedTasks,
          }),
        });
        const result = await res.json();
        if (result.success) {
          setMessage({ text: "✅ IN update submitted!", type: "success" });
          fetchTodayTask(employee.id); fetchPastTasks(employee.id);
        } else { setMessage({ text: result.message || "Failed", type: "error" }); }
      }
    } catch { setMessage({ text: "Server error", type: "error" }); }
    finally  { setLoading(false); }
  };

  // ── OUT handlers ──────────────────────────────────────────────────────────
  const updateOutTask = (i: number, field: string, value: any) => {
    const u = [...outTasks]; (u[i] as any)[field] = value; setOutTasks(u);
  };
  const handleEditOUT    = () => { setIsEditingOUT(true);  setMessage({ text: "", type: "" }); };
  const handleCancelEditOUT = () => {
    if (!todayTask) return;
    setOutTasks(todayTask.tasks.map((t: any) => ({
      ...t,
      actualHours: t.actualHours ?? t.estimatedHours, actualPercent: t.actualPercent ?? 0,
      actualStart: t.actualStart ?? "", actualEnd: t.actualEnd ?? "",
      score: t.score || "N/A", impact: t.impact || "", status: t.status || "Todo",
    })));
    setOverallHours(todayTask.overallHours || 0);
    setOverallScore(todayTask.overallScore  || "");
    setIsEditingOUT(false);
    setMessage({ text: "", type: "" });
  };

  const handleOUTSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todayTask) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    const isEditing = todayTask.isOutSubmitted && isEditingOUT;
    try {
      const res    = await fetch(`${BASE_URL}/tasks/out/${todayTask._id}`, {
        method: isEditing ? "PATCH" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: outTasks, overallHours, overallScore }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: isEditing ? "✅ OUT edited!" : "✅ OUT submitted!", type: "success" });
        setIsEditingOUT(false);
        fetchTodayTask(employee!.id); fetchPastTasks(employee!.id);
      } else { setMessage({ text: result.message || "Failed", type: "error" }); }
    } catch { setMessage({ text: "Server error", type: "error" }); }
    finally  { setLoading(false); }
  };

  // ── Leave ─────────────────────────────────────────────────────────────────
  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setLeaveLoading(true);
    setLeaveMessage({ text: "", type: "" });
    const from = new Date(fromDate), to = new Date(toDate);
    const totalDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (totalDays < 1) {
      setLeaveMessage({ text: "To date must be on or after From date", type: "error" });
      setLeaveLoading(false); return;
    }
    try {
      const res    = await fetch(`${BASE_URL}/leaves/apply`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id, leaveType, fromDate, toDate, totalDays, reason: leaveReason }),
      });
      const result = await res.json();
      if (result.success) {
        setLeaveMessage({ text: "✅ Leave submitted!", type: "success" });
        setFromDate(""); setToDate(""); setLeaveReason(""); setLeaveType("Sick Leave");
        fetchLeaves(employee.id);
      } else { setLeaveMessage({ text: result.message || "Failed", type: "error" }); }
    } catch { setLeaveMessage({ text: "Server error", type: "error" }); }
    finally  { setLeaveLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem("employee"); navigate("/Employee"); };

  if (!employee) return null;

  const pendingLeaves = leaves.filter((l) => l.status === "Pending").length;

  const wmStyle = (mode: string, active: string) => {
    if (active !== mode) return {};
    if (mode === "Office") return { background: "#E6F1FB", color: "#0C447C", borderColor: "#85B7EB" };
    if (mode === "Remote") return { background: "#EAF3DE", color: "#27500A", borderColor: "#97C459" };
    return { background: "#EEEDFE", color: "#3C3489", borderColor: "#AFA9EC" };
  };
  const wmPillStyle = (mode: string) => {
    if (mode === "Office") return { background: "#E6F1FB", color: "#0C447C" };
    if (mode === "Remote") return { background: "#EAF3DE", color: "#27500A" };
    return { background: "#EEEDFE", color: "#3C3489" };
  };

  return (
    <DashboardContainer>
      {/* HEADER */}
      <div className="header">
        <div className="header-logo"><span></span></div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main">
        {/* PROFILE BAR */}
        <div className="profile-bar">
          <div className="avatar">{employee.firstName?.charAt(0).toUpperCase()}</div>
          <div className="profile-details">
            {[
              ["Name", employee.firstName], ["Email", employee.email],
              ["Designation", employee.designation || "—"], ["Department", employee.department || "—"],
              ["Employee ID", `#${employee.employeeCode || "—"}`], ["Today", today],
            ].map(([label, value], i, arr) => (
              <React.Fragment key={label}>
                <div className="profile-item">
                  <span className="label">{label}</span>
                  <span className="value">{value}</span>
                </div>
                {i < arr.length - 1 && <div className="divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          {[
            { key: "today",   label: "📋 Today's Tasks" },
            { key: "history", label: "📅 History" },
            { key: "leave",   label: "🏖️ Leave" },
          ].map(({ key, label }) => (
            <button key={key} className={`tab ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key as any)}>
              {label}
              {key === "leave" && pendingLeaves > 0 && (
                <span className="leave-pending-dot">{pendingLeaves}</span>
              )}
            </button>
          ))}
        </div>

        {message.text && (
          <p className={message.type === "success" ? "success-msg" : "error-msg"}>{message.text}</p>
        )}

        {/* TODAY TAB */}
        {activeTab === "today" && (
          <>
            <BreakTracker onBreakUpdate={handleBreakUpdate} />

            {/* IN FORM */}
            {(!todayTask || isEditingIN) && (
              <div className="card">
                <div className="card-header in">
                  <span className="tag in-tag">
                    🌅 {isEditingIN ? "Edit IN update" : "IN update — morning"}
                  </span>
                  <span className="date-tag">{today}</span>
                </div>

                <form onSubmit={handleINSubmit}>
                  <p className="section-label" style={{ marginBottom: 8 }}>Work mode</p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {["Office", "Remote", "Hybrid"].map((mode) => (
                      <button key={mode} type="button" onClick={() => setWorkMode(mode)}
                        style={{ flex: 1, padding: "8px 4px", fontSize: 13, fontWeight: 500,
                          border: "0.5px solid #ddd", borderRadius: 8, cursor: "pointer",
                          ...wmStyle(mode, workMode) }}>
                        {mode === "Office" ? "🏢 " : mode === "Remote" ? "🏠 " : "🔀 "}{mode}
                      </button>
                    ))}
                  </div>

                  <div className="meta-row">
                    <div className="input-group">
                      <label>Location</label>
                      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. O-CBE" />
                    </div>
                    <div className="input-group">
                      <label>Day dependency (overall)</label>
                      <input value={dependency} onChange={(e) => setDependency(e.target.value)} placeholder="e.g. Jawahar" />
                    </div>
                  </div>

                  <div className="tasks-list">
                    {inTasks.map((task, i) => (
                      <div className="task-row" key={i}>
                        <div className="task-num-header">
                          <span className="task-num">Task {i + 1}</span>
                          {inTasks.length > 1 && (
                            <button type="button" className="remove-task-btn" onClick={() => removeInTask(i)}>
                              ✕ Remove task
                            </button>
                          )}
                        </div>

                        <div className="input-group" style={{ marginBottom: 10 }}>
                          <label>Task title</label>
                          <input placeholder="e.g. Employee Management System Development"
                            value={task.title} onChange={(e) => updateInTask(i, "title", e.target.value)} required />
                        </div>

                        <div className="input-group" style={{ marginBottom: 10 }}>
                          <label>Task dependency (person / team)</label>
                          <input placeholder="e.g. Jawahar, Design team..."
                            value={task.dependency ?? ""} onChange={(e) => updateInTask(i, "dependency", e.target.value)} />
                        </div>

                        <div className="input-group" style={{ marginBottom: 12 }}>
                          <label>Description / paragraph</label>
                          <textarea className="subpoint-input"
                            style={{ width: "100%", minHeight: 64, padding: "8px 10px",
                              border: "1px solid #e0e0e0", borderRadius: 6,
                              fontSize: "0.9rem", fontFamily: "inherit", resize: "vertical" }}
                            placeholder="Write what you plan to do today on this task..."
                            value={task.shortDesc} onChange={(e) => updateInTask(i, "shortDesc", e.target.value)} />
                        </div>

                        <div className="subpoints-section">
                          <label className="subpoints-label">📌 Sub points</label>
                          {(task.subPoints || [""]).map((point: string, pi: number) => (
                            <div className="subpoint-row" key={pi}>
                              <span className="bullet">•</span>
                              <input className="subpoint-input" placeholder="e.g. Developed login module..."
                                value={point} onChange={(e) => updateSubPoint(i, pi, e.target.value)} />
                              {(task.subPoints || [""]).length > 1 && (
                                <button type="button" className="remove-subpoint"
                                  onClick={() => removeSubPoint(i, pi)}>✕</button>
                              )}
                            </div>
                          ))}
                          <button type="button" className="add-subpoint-btn" onClick={() => addSubPoint(i)}>
                            + Add sub point
                          </button>
                        </div>

                        <div className="time-segments-section">
                          <label className="subpoints-label">🕐 Time blocks (planned)</label>
                          {(task.timeSegments || [emptySegment()]).map((seg: any, si: number) => (
                            <div className="segment-row" key={si}>
                              <span className="segment-label">Block {si + 1}</span>
                              <div className="input-group small">
                                <label>Start</label>
                                <input type="time" value={seg.start}
                                  onChange={(e) => updateSegment(i, si, "start", e.target.value)} />
                              </div>
                              <div className="input-group small">
                                <label>End</label>
                                <input type="time" value={seg.end}
                                  onChange={(e) => updateSegment(i, si, "end", e.target.value)} />
                              </div>
                              {seg.start && seg.end && toMinutes(seg.end) > toMinutes(seg.start) && (
                                <span className="seg-duration-badge">
                                  {Math.round(((toMinutes(seg.end) - toMinutes(seg.start)) / 60) * 4) / 4}h
                                </span>
                              )}
                              {(task.timeSegments || []).length > 1 && (
                                <button type="button" className="remove-subpoint"
                                  style={{ alignSelf: "flex-end", marginBottom: 4 }}
                                  onClick={() => removeSegment(i, si)}>✕</button>
                              )}
                            </div>
                          ))}

                          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
                            <button type="button" className="add-subpoint-btn" onClick={() => addSegment(i)}>
                              + Add time block
                            </button>

                            {/* <div className="input-group small" style={{ minWidth: 160 }}>
                              <label>Break (mins) — manual override</label>
                              <input type="number" min="0" step="1"
                                value={task.breakMinutes ?? 0}
                                onChange={(e) => updateBreak(i, parseInt(e.target.value) || 0)}
                                style={task.breakMinutes > 0 ? {
                                  background: "#FEF9C3", color: "#92400E",
                                  fontWeight: 600, borderColor: "#FBBF24",
                                } : {}}
                              />
                            </div> */}

                            {task.estimatedHours > 0 && (
                              <div className="time-calc-badge">
                                ⏱ {task.estimatedHours}h productive
                                {task.breakMinutes > 0 ? ` (−${task.breakMinutes}m break)` : ""}
                              </div>
                            )}
                          </div>

                          {(task.timeSegments || []).some((s: any) => s.start && s.end) && (
                            <div className="timeline-bar">
                              {(task.timeSegments || []).map((seg: any, si: number) => {
                                if (!seg.start || !seg.end) return null;
                                const dur = toMinutes(seg.end) - toMinutes(seg.start);
                                if (dur <= 0) return null;
                                return (
                                  <React.Fragment key={si}>
                                    <div className="timeline-block" style={{ flex: dur }}
                                      title={`Block ${si + 1}: ${seg.start}–${seg.end} (${Math.round(dur)}m)`}>
                                      <span>{seg.start}</span><span>{seg.end}</span>
                                    </div>
                                    {si < (task.timeSegments || []).length - 1 && (
                                      <div className="timeline-break"
                                        style={{ flex: Math.max(task.breakMinutes || 15, 10) }}
                                        title={`Break: ${task.breakMinutes || "?"}m`}>
                                        ☕ {task.breakMinutes > 0 ? `${task.breakMinutes}m` : "break"}
                                      </div>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        <div className="task-fields" style={{ marginTop: 12 }}>
                          <div className="input-group small">
                            <label>Est. hours (auto)</label>
                            <input type="number" min="0" step="0.25" value={task.estimatedHours} readOnly
                              style={{ background: "#f0f7ff", color: "#1565c0", fontWeight: 600, cursor: "not-allowed" }} />
                          </div>
                          <div className="input-group small">
                            <label>Target %</label>
                            <input type="number" min="0" max="100" value={task.targetPercent}
                              onChange={(e) => updateInTask(i, "targetPercent", parseInt(e.target.value))} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <button type="button" className="add-task-btn" onClick={addInTask}>+ Add task</button>
                    {isEditingIN && (
                      <button type="button" className="cancel-edit-btn" onClick={handleCancelEditIN}>Cancel</button>
                    )}
                    <button type="submit" className="submit-btn in-btn" disabled={loading}>
                      {loading ? "Saving..." : isEditingIN ? "Save changes" : "Submit IN update"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* IN SUBMITTED VIEW */}
            {todayTask && !isEditingIN && (
              <>
                <div className="card">
                  <div className="card-header in">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span className="tag in-tag">🌅 IN update — submitted</span>
                      <span className="submitted-badge">✓ {todayTask.inTime}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, padding: "3px 10px",
                        borderRadius: 10, ...wmPillStyle(todayTask.workMode || "Office") }}>
                        {todayTask.workMode || "Office"}
                      </span>
                    </div>
                    <button className="edit-in-btn" onClick={handleEditIN}>✏️ Edit IN</button>
                  </div>

                  <div className="update-preview">
                    <p className="preview-meta">
                      <strong>{employee.firstName}</strong> IN – {todayTask.location}
                      {todayTask.dependency && ` | Dep: ${todayTask.dependency}`} – {todayTask.date}
                    </p>
                    {(todayTask.tasks as any[]).map((t) => (
                      <div className="preview-task-block" key={t.taskNumber}>
                        <div className="preview-task-header">
                          <span className="task-label">Task {t.taskNumber}:</span>
                          <span className="task-title">{t.title}</span>
                          <span className="task-meta">
                            {t.plannedStart && t.plannedEnd ? `${t.plannedStart}–${t.plannedEnd} · ` : ""}
                            {t.estimatedHours}h · T-{t.targetPercent}%
                          </span>
                        </div>
                        {t.dependency && (
                          <p style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600, marginLeft: 52, marginBottom: 3 }}>
                            👤 Dep: {t.dependency}
                          </p>
                        )}
                        {t.timeSegments?.length > 0 && (
                          <div style={{ marginLeft: 52, marginBottom: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {t.timeSegments.map((seg: any, si: number) =>
                              seg.start && seg.end ? (
                                <span key={si} className="seg-preview-pill">🕐 {seg.start}–{seg.end}</span>
                              ) : null
                            )}
                            {t.breakMinutes > 0 && (
                              <span className="break-preview-pill">☕ {t.breakMinutes}m break</span>
                            )}
                          </div>
                        )}
                        {t.shortDesc && (
                          <p style={{ fontSize: "0.83rem", color: "#555", fontStyle: "italic", marginLeft: 52, marginBottom: 4 }}>
                            {t.shortDesc}
                          </p>
                        )}
                        {t.subPoints?.filter((p: string) => p.trim()).length > 0 && (
                          <div className="preview-subpoints">
                            {t.subPoints.filter((p: string) => p.trim()).map((point: string, pi: number) => (
                              <div className="preview-subpoint" key={pi}>
                                <span className="preview-bullet">•</span><span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ── Break log shown under IN submitted view ── */}
                  <BreakLogPanel log={breakLog} />
                </div>

                {/* OUT FORM */}
                <div className="card">
                  <div className="card-header out">
                    <span className="tag out-tag">
                      🌆 {isEditingOUT ? "Edit OUT update" : "OUT update — evening"}
                    </span>
                    <div className="header-right">
                      {todayTask.isOutSubmitted && (
                        <>
                          <span className="submitted-badge">✓ {todayTask.outTime}</span>
                          {!isEditingOUT && (
                            <button className="edit-out-btn" onClick={handleEditOUT}>✏️ Edit OUT</button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* ── Break log also shown at the top of OUT form ── */}
                  <BreakLogPanel log={breakLog} />

                  <form onSubmit={handleOUTSubmit}>
                    <div className="tasks-list">
                      {outTasks.map((task, i) => {
                        const score  = calcScore(task);
                        const locked = todayTask.isOutSubmitted && !isEditingOUT;
                        return (
                          <div className="task-row out-task-row" key={i}>
                            <div className="task-num">Task {task.taskNumber}</div>
                            <div className="task-fields out-fields">
                              <div className="task-title-display">{task.title}</div>
                              {(task as any).dependency && (
                                <p style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600, marginBottom: 6 }}>
                                  👤 Dep: {(task as any).dependency}
                                </p>
                              )}
                              {(task as any).shortDesc && (
                                <p style={{ fontSize: "0.83rem", color: "#666", fontStyle: "italic", marginBottom: 8 }}>
                                  {(task as any).shortDesc}
                                </p>
                              )}
                              {(task as any).subPoints?.filter((p: string) => p.trim()).length > 0 && (
                                <div className="out-subpoints" style={{ marginBottom: 10 }}>
                                  {(task as any).subPoints.filter((p: string) => p.trim()).map((point: string, pi: number) => (
                                    <div className="preview-subpoint" key={pi}>
                                      <span className="preview-bullet">•</span><span>{point}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {(task as any).timeSegments?.length > 0 && (
                                <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                                  📅 Planned:
                                  {(task as any).timeSegments.map((seg: any, si: number) =>
                                    seg.start && seg.end ? (
                                      <span key={si} className="seg-preview-pill">{seg.start}–{seg.end}</span>
                                    ) : null
                                  )}
                                  {(task as any).breakMinutes > 0 && (
                                    <span className="break-preview-pill">☕ {(task as any).breakMinutes}m break</span>
                                  )}
                                  <strong style={{ color: "#1565c0" }}>= {task.estimatedHours}h productive</strong>
                                </div>
                              )}
                              <div className="out-grid">
                                <div className="input-group small">
                                  <label>Status</label>
                                  <select value={task.status}
                                    onChange={(e) => updateOutTask(i, "status", e.target.value)} disabled={locked}>
                                    {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                                  </select>
                                </div>
                                <div className="input-group small">
                                  <label>Actual start</label>
                                  <input type="time" value={(task as any).actualStart || ""}
                                    onChange={(e) => updateOutTask(i, "actualStart", e.target.value)} disabled={locked} />
                                </div>
                                <div className="input-group small">
                                  <label>Actual end</label>
                                  <input type="time" value={(task as any).actualEnd || ""}
                                    onChange={(e) => updateOutTask(i, "actualEnd", e.target.value)} disabled={locked} />
                                </div>
                                <div className="input-group small">
                                  <label>Act. hours</label>
                                  <input type="number" min="0" step="0.25" value={task.actualHours}
                                    onChange={(e) => updateOutTask(i, "actualHours", parseFloat(e.target.value))} disabled={locked} />
                                </div>
                                <div className="input-group small">
                                  <label>Completion %</label>
                                  <input type="number" min="0" max="100" value={task.actualPercent}
                                    onChange={(e) => updateOutTask(i, "actualPercent", parseInt(e.target.value))} disabled={locked} />
                                </div>
                                <div className="input-group wide">
                                  <label>Impact</label>
                                  <input placeholder="Describe the impact..." value={task.impact}
                                    onChange={(e) => updateOutTask(i, "impact", e.target.value)} disabled={locked} />
                                </div>
                              </div>
                              <div className="history-overall-bar" style={{ marginTop: 10, alignItems: "center", gap: 12 }}>
                                <span style={{ fontSize: "0.8rem", color: "#555" }}>Productivity score:</span>
                                <div style={{ flex: 1, height: 6, background: "#eee", borderRadius: 3 }}>
                                  <div style={{ height: 6, borderRadius: 3, transition: "width .3s",
                                    background: score >= 70 ? "#639922" : score >= 40 ? "#EF9F27" : "#E24B4A",
                                    width: `${score}%` }} />
                                </div>
                                <strong style={{ fontSize: "0.85rem",
                                  color: score >= 70 ? "#27500A" : score >= 40 ? "#633806" : "#A32D2D" }}>
                                  {score}%
                                </strong>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="overall-row">
                      <div className="input-group small">
                        <label>Overall hours</label>
                        <input type="number" min="0" step="0.5" value={overallHours}
                          onChange={(e) => setOverallHours(parseFloat(e.target.value))}
                          disabled={todayTask.isOutSubmitted && !isEditingOUT} />
                      </div>
                      <div className="input-group small">
                        <label>Overall score</label>
                        <input placeholder="e.g. 8/10" value={overallScore}
                          onChange={(e) => setOverallScore(e.target.value)}
                          disabled={todayTask.isOutSubmitted && !isEditingOUT} />
                      </div>
                    </div>

                    <div className="form-actions">
                      {isEditingOUT && (
                        <button type="button" className="cancel-edit-btn" onClick={handleCancelEditOUT}>Cancel</button>
                      )}
                      {(!todayTask.isOutSubmitted || isEditingOUT) && (
                        <button type="submit" className="submit-btn out-btn" disabled={loading}>
                          {loading ? "Saving..." : isEditingOUT ? "Save changes" : "Submit OUT update"}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}
          </>
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <div className="history-list">
            {pastTasks.length === 0 ? (
              <div className="card"><p className="empty-msg">No past tasks found.</p></div>
            ) : (
              pastTasks.map((task) => (
                <div className="history-card" key={task._id}>
                  <div className="history-date-header">
                    <span className="history-date">📅 {task.date}</span>
                    <div className="history-badges">
                      <span className="history-location">{task.location}</span>
                      {task.workMode && (
                        <span style={{ fontSize: "0.72rem", padding: "2px 8px",
                          borderRadius: 20, fontWeight: 600, ...wmPillStyle(task.workMode) }}>
                          {task.workMode}
                        </span>
                      )}
                      {task.dependency && <span className="history-dep">👤 {task.dependency}</span>}
                      {task.isOutSubmitted
                        ? <span className="badge-done">✓ Complete</span>
                        : <span className="badge-pending">⏳ OUT Pending</span>}
                    </div>
                  </div>

                  <div className="history-section">
                    <div className="section-label in-label">🌅 IN — {task.inTime || "—"}</div>
                    <p className="section-meta">
                      <strong>{employee.firstName}</strong> IN – {task.location}
                      {task.dependency && ` | Dep: ${task.dependency}`} – {task.date}
                    </p>
                    {(task.tasks as any[]).map((t) => (
                      <div className="history-task-block" key={t.taskNumber}>
                        <div className="history-task-row">
                          <span className="ht-num">Task {t.taskNumber}:</span>
                          <span className="ht-title">{t.title}</span>
                          <span className="ht-meta">Est: {t.estimatedHours}h · Target: {t.targetPercent}%</span>
                        </div>
                        {t.dependency && (
                          <p style={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 600, paddingLeft: 52, marginTop: 2, marginBottom: 3 }}>
                            👤 Dep: {t.dependency}
                          </p>
                        )}
                        {t.timeSegments?.length > 0 && (
                          <div style={{ paddingLeft: 52, marginBottom: 5, display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {t.timeSegments.map((seg: any, si: number) =>
                              seg.start && seg.end ? (
                                <span key={si} className="seg-preview-pill">🕐 {seg.start}–{seg.end}</span>
                              ) : null
                            )}
                            {t.breakMinutes > 0 && (
                              <span className="break-preview-pill">☕ {t.breakMinutes}m break</span>
                            )}
                          </div>
                        )}
                        {t.shortDesc && (
                          <p style={{ fontSize: "0.78rem", color: "#666", fontStyle: "italic", paddingLeft: 52, marginTop: 2, marginBottom: 4 }}>
                            {t.shortDesc}
                          </p>
                        )}
                        {t.subPoints?.filter((p: string) => p.trim()).length > 0 && (
                          <div className="history-subpoints">
                            {t.subPoints.filter((p: string) => p.trim()).map((point: string, pi: number) => (
                              <div className="history-subpoint" key={pi}>
                                <span className="preview-bullet">•</span><span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {task.isOutSubmitted ? (
                    <div className="history-section out-section">
                      <div className="section-label out-label">🌆 OUT — {task.outTime || "—"}</div>
                      <p className="section-meta">
                        <strong>{employee.firstName}</strong> OUT – {task.location}
                        {task.dependency && ` | Dep: ${task.dependency}`} – {task.date}
                      </p>
                      {(task.tasks as any[]).map((t) => (
                        <div className="history-task-block" key={t.taskNumber}>
                          <div className="history-task-row out-row">
                            <span className="ht-num">Task {t.taskNumber}:</span>
                            <span className="ht-title">{t.title}</span>
                            <span className={`status-pill ${t.status?.replace(/\s/g, "-").toLowerCase()}`}>{t.status}</span>
                          </div>
                          {t.dependency && (
                            <p style={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 600, paddingLeft: 52, marginTop: 2, marginBottom: 3 }}>
                              👤 Dep: {t.dependency}
                            </p>
                          )}
                          {t.shortDesc && (
                            <p style={{ fontSize: "0.78rem", color: "#666", fontStyle: "italic", paddingLeft: 52, marginTop: 2, marginBottom: 4 }}>
                              {t.shortDesc}
                            </p>
                          )}
                          {t.subPoints?.filter((p: string) => p.trim()).length > 0 && (
                            <div className="history-subpoints">
                              {t.subPoints.filter((p: string) => p.trim()).map((point: string, pi: number) => (
                                <div className="history-subpoint" key={pi}>
                                  <span className="preview-bullet">•</span><span>{point}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div style={{ paddingLeft: 52, marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {(t.plannedStart || t.actualStart) && (
                              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                                🕐 Planned: {t.plannedStart || "—"}–{t.plannedEnd || "—"} |
                                Actual: {t.actualStart || "—"}–{t.actualEnd || "—"}
                              </span>
                            )}
                            <span className="ht-meta">
                              Est: {t.estimatedHours}h / Act: {t.actualHours}h · Target: {t.targetPercent}% / Done: {t.actualPercent}%
                            </span>
                          </div>
                          {t.impact && <div className="ht-impact">[Impact: {t.impact}]</div>}
                        </div>
                      ))}
                      <div className="history-overall-bar">
                        <span>⏱ Overall: <strong>{task.overallHours} hrs</strong></span>
                        <span>⭐ Score: <strong>{task.overallScore}</strong></span>
                      </div>
                    </div>
                  ) : (
                    <div className="history-section out-pending-section">
                      <div className="section-label out-label">🌆 OUT — Pending</div>
                      <p className="pending-msg">Evening update not yet submitted.</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* LEAVE TAB */}
        {activeTab === "leave" && (
          <div>
            <div className="card">
              <div className="card-header in">
                <span className="tag in-tag">🏖️ Apply for leave</span>
              </div>
              <form onSubmit={handleLeaveSubmit} autoComplete="off">
                <div className="meta-row">
                  <div className="input-group">
                    <label>Leave type</label>
                    <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                      {["Sick Leave","Casual Leave","Emergency Leave","Personal Leave","Other"].map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>From date</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label>To date</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                  </div>
                </div>
                {fromDate && toDate && new Date(toDate) >= new Date(fromDate) && (
                  <div className="days-preview">
                    📅 {Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s) selected
                  </div>
                )}
                <div className="input-group" style={{ marginBottom: 16 }}>
                  <label>Reason</label>
                  <input placeholder="Enter reason for leave..." value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)} required />
                </div>
                {leaveMessage.text && (
                  <p className={leaveMessage.type === "success" ? "success-msg" : "error-msg"}>{leaveMessage.text}</p>
                )}
                <div className="form-actions">
                  <button type="submit" className="submit-btn in-btn" disabled={leaveLoading}>
                    {leaveLoading ? "Submitting..." : "Submit leave request"}
                  </button>
                </div>
              </form>
            </div>

            <div className="card">
              <div className="card-header in">
                <span className="tag in-tag">📋 My leave requests ({leaves.length})</span>
              </div>
              {leaves.length === 0 ? (
                <p className="empty-msg">No leave requests found.</p>
              ) : (
                <div className="leave-history-list">
                  {leaves.map((leave) => (
                    <div key={leave._id} className={`leave-history-item ${leave.status.toLowerCase()}`}>
                      <div className="lhi-top">
                        <div className="lhi-left">
                          <span className="lhi-type">{leave.leaveType}</span>
                          <p className="lhi-dates">
                            📅 {leave.fromDate} → {leave.toDate}
                            <span className="lhi-days">({leave.totalDays} day{leave.totalDays > 1 ? "s" : ""})</span>
                          </p>
                          <p className="lhi-reason">"{leave.reason}"</p>
                          <span className="lhi-applied">
                            Applied: {leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString("en-IN") : "—"}
                          </span>
                        </div>
                        <div className="lhi-right">
                          <span className={`lhi-status ${leave.status.toLowerCase()}`}>
                            {leave.status === "Pending" ? "⏳" : leave.status === "Approved" ? "✓" : "✗"} {leave.status}
                          </span>
                        </div>
                      </div>
                      {leave.status === "Rejected" && leave.rejectionReason && (
                        <div className="lhi-rejection">
                          <span className="lhi-rejection-label">❌ Rejection reason:</span>
                          <p>{leave.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;