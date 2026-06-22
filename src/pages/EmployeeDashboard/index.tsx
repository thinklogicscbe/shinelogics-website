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

// ── Parse "HH:MM AM/PM" → Date (today) ───────────────────────────────────────
const parseInTime = (inTime: string): Date | null => {
  try {
    const now   = new Date();
    const parts = inTime.trim().split(" ");
    const mer   = parts[parts.length - 1];
    const [hStr, mStr] = parts[0].split(":");
    let h = parseInt(hStr);
    const m = parseInt(mStr);
    if (mer?.toUpperCase() === "PM" && h !== 12) h += 12;
    if (mer?.toUpperCase() === "AM" && h === 12) h = 0;
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
  } catch { return null; }
};

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
  status:         string;
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
  isClockOnly:    boolean;
  inTime:         string;
  outTime:        string;
  breakState?:    Record<string, ServerBreakSlotState>;
}

interface EmployeeUser {
  id:           string;
  firstName:    string;
  email:        string;
  designation:  string;
  department:   string;
  employeeCode: number;
  role?:        string;
}

interface BreakSession {
  startIso: string;
  endIso:   string;
  mins:     number;
}

// ── Server-authoritative break slot state (from Task.breakState) ─────────────
interface ServerBreakSlotState {
  runningStartIso: string | null;
  elapsedMs:       number;
  sessions:        BreakSession[];
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

interface BreakSlot {
  id:       "morning" | "lunch" | "evening";
  label:    string;
  emoji:    string;
  allotted: number;
  hint:     string;
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

export interface BreakLogEntry {
  slotId:    string;
  slotLabel: string;
  emoji:     string;
  sessions:  BreakSession[];
  totalMins: number;
}

const emptySlotState = (): ServerBreakSlotState => ({
  runningStartIso: null, elapsedMs: 0, sessions: [],
});

// ── Break Timer (server-authoritative) ────────────────────────────────────────
interface BreakTimerProps {
  slot:       BreakSlot;
  state:      ServerBreakSlotState;
  onStart:    (slotId: string) => void;
  onStop:     (slotId: string) => void;
  disabled?:  boolean; // locked after OUT submitted
  busy?:      boolean; // request in flight
}

const BreakTimer: React.FC<BreakTimerProps> = ({ slot, state, onStart, onStop, disabled, busy }) => {
  const running      = !!state.runningStartIso;
  const sessionStart = state.runningStartIso ? new Date(state.runningStartIso) : null;

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 500);
    return () => clearInterval(id);
  }, [running]);

  const liveGap = running && sessionStart ? Date.now() - sessionStart.getTime() : 0;
  const displayMs  = state.elapsedMs + liveGap;
  const totalTaken = Math.round(displayMs / 60000);
  const extra       = totalTaken - slot.allotted;
  const withinLimit = extra <= 0;
  const hasTaken    = state.sessions.length > 0 || running;

  // tick is read so the effect re-renders this component each 500ms while running
  void tick;

  return (
    <div className="break-slot-card" style={{ borderColor: slot.color.border, opacity: disabled ? 0.75 : 1 }}>
      <div className="bsc-header">
        <div className="bsc-title-row">
          <span className="bsc-emoji">{slot.emoji}</span>
          <div>
            <div className="bsc-name" style={{ color: slot.color.text }}>{slot.label}</div>
            <div className="bsc-slot-time">{slot.hint}</div>
          </div>
        </div>
        {disabled ? (
          <span className="bsc-used-badge" style={{ background: "#f3f4f6", color: "#6b7280" }}>
            🔒 Day ended
          </span>
        ) : running ? (
          <span className="bsc-live-badge">
            <span className="break-pulse" style={{ background: slot.color.text }} /> Live
          </span>
        ) : hasTaken ? (
          <span className="bsc-used-badge" style={{ background: slot.color.badge, color: slot.color.text }}>
            ✓ Taken
          </span>
        ) : null}
      </div>

      <div className="bsc-timer" style={{ color: running ? slot.color.text : "#1a1a2e" }}>
        {fmtTimer(displayMs)}
      </div>

      <div className="bsc-progress-wrap">
        <div className="bsc-progress-bar">
          <div className="bsc-progress-fill" style={{
            width:      `${Math.min((totalTaken / slot.allotted) * 100, 100)}%`,
            background: withinLimit ? slot.color.text : "#E24B4A",
          }} />
        </div>
        <div className="bsc-progress-labels">
          <span style={{ color: slot.color.text, fontWeight: 600 }}>
            {totalTaken} / {slot.allotted} min
          </span>
          {!withinLimit
            ? <span className="bsc-extra-label">+{extra} min extra ⚠️</span>
            : <span className="bsc-ok-label" style={{ color: slot.color.text }}>
                {slot.allotted - totalTaken} min left ✓
              </span>}
        </div>
      </div>

      <div className="bsc-controls">
        {!running
          ? <button
              type="button"
              className="bsc-start-btn"
              style={{
                background: slot.color.bg, borderColor: slot.color.border, color: slot.color.text,
                opacity: (disabled || busy) ? 0.5 : 1, cursor: (disabled || busy) ? "not-allowed" : "pointer",
              }}
              onClick={() => onStart(slot.id)}
              disabled={!!disabled || !!busy}
            >
              ▶ Start {slot.label.toLowerCase()}
            </button>
          : <button
              type="button"
              className="bsc-stop-btn"
              onClick={() => onStop(slot.id)}
              disabled={!!disabled || !!busy}
            >
              ■ Stop break
            </button>}
      </div>

      {state.sessions.length > 0 && (
        <div className="bsc-log">
          {state.sessions.map((s, i) => (
            <div className="bsc-log-item" key={i}>
              <span className="bsc-log-time">
                {fmtClockTime(new Date(s.startIso))} – {fmtClockTime(new Date(s.endIso))}
              </span>
              <span className="bsc-log-mins" style={{ background: slot.color.badge, color: slot.color.text }}>
                {s.mins} min
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Break Tracker Panel (server-authoritative) ────────────────────────────────
interface BreakTrackerProps {
  employeeId:    string;
  breakState:    Record<string, ServerBreakSlotState>;
  onBreakUpdate: (breakTotals: Record<string, number>, breakLog: BreakLogEntry[]) => void;
  onRefresh:     () => Promise<void>;
  disabled?:     boolean;
}

const BreakTracker: React.FC<BreakTrackerProps> = ({ employeeId, breakState, onBreakUpdate, onRefresh, disabled }) => {
  const [busySlot, setBusySlot] = useState<string | null>(null);

  // Push totals/log up to parent whenever breakState changes (for IN-task break-split + OUT submit)
  useEffect(() => {
    const totals: Record<string, number> = {};
    const log: BreakLogEntry[] = [];
    BREAK_SLOTS.forEach((slot) => {
      const s = breakState[slot.id] || emptySlotState();
      const liveGap = s.runningStartIso ? Date.now() - new Date(s.runningStartIso).getTime() : 0;
      const totalMs = s.elapsedMs + liveGap;
      const mins = Math.round(totalMs / 60000);
      totals[slot.id] = mins;
      if (mins > 0) {
        log.push({
          slotId: slot.id, slotLabel: slot.label, emoji: slot.emoji,
          sessions: s.sessions, totalMins: mins,
        });
      }
    });
    onBreakUpdate(totals, log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakState]);

  const handleStart = async (slotId: string) => {
    if (!employeeId || busySlot) return;
    setBusySlot(slotId);
    try {
      const res = await fetch(`${BASE_URL}/tasks/break/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, date: today, slotId }),
      });
      const result = await res.json();
      if (result.success) await onRefresh();
      else alert(result.message || "Could not start break");
    } catch {
      alert("Server error starting break");
    } finally {
      setBusySlot(null);
    }
  };

  const handleStop = async (slotId: string) => {
    if (!employeeId || busySlot) return;
    setBusySlot(slotId);
    try {
      const res = await fetch(`${BASE_URL}/tasks/break/stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, date: today, slotId }),
      });
      const result = await res.json();
      if (result.success) await onRefresh();
      else alert(result.message || "Could not stop break");
    } catch {
      alert("Server error stopping break");
    } finally {
      setBusySlot(null);
    }
  };

  const totals = BREAK_SLOTS.reduce((acc, slot) => {
    const s = breakState[slot.id] || emptySlotState();
    const liveGap = s.runningStartIso ? Date.now() - new Date(s.runningStartIso).getTime() : 0;
    acc[slot.id] = Math.round((s.elapsedMs + liveGap) / 60000);
    return acc;
  }, {} as Record<string, number>);

  const totalAllotted = BREAK_SLOTS.reduce((s, b) => s + b.allotted, 0);
  const totalTaken    = Object.values(totals).reduce((s, v) => s + v, 0);
  const totalExtra    = Math.max(totalTaken - totalAllotted, 0);
  const totalSaved    = Math.max(totalAllotted - totalTaken, 0);

  return (
    <div className="break-tracker-panel">
      <div className="btp-header">
        <span className="btp-title">⏱ Break tracker {disabled && <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 400 }}>· locked (day ended)</span>}</span>
        <div className="btp-summary">
          <span className="btp-stat total">Today: <strong>{totalTaken} / {totalAllotted} min</strong></span>
          {totalExtra > 0 && <span className="btp-stat extra">+{totalExtra} min over ⚠️</span>}
          {totalSaved > 0 && totalTaken > 0 && <span className="btp-stat saved">{totalSaved} min saved ✓</span>}
        </div>
      </div>
      <div className="btp-slots">
        {BREAK_SLOTS.map((slot) => (
          <BreakTimer
            key={slot.id}
            slot={slot}
            state={breakState[slot.id] || emptySlotState()}
            onStart={handleStart}
            onStop={handleStop}
            disabled={disabled}
            busy={busySlot === slot.id}
          />
        ))}
      </div>
    </div>
  );
};

// ── Break Log Panel ───────────────────────────────────────────────────────────
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
                    <span className="blp-session-mins" style={{ background: slot.color.badge, color: slot.color.text }}>
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

// ── Live clock ────────────────────────────────────────────────────────────────
const LiveClock: React.FC = () => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span>
      {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
    </span>
  );
};

// ── Live elapsed time since clock-in ─────────────────────────────────────────
const LiveElapsed: React.FC<{ inTime: string }> = ({ inTime }) => {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const calc = () => {
      if (!inTime) return;
      const start = parseInTime(inTime);
      if (!start) return;
      const diffMs = new Date().getTime() - start.getTime();
      if (diffMs < 0) { setElapsed("0h 0m"); return; }
      const totalMins = Math.floor(diffMs / 60000);
      const hrs  = Math.floor(totalMins / 60);
      const mins = totalMins % 60;
      setElapsed(`${hrs}h ${String(mins).padStart(2, "0")}m`);
    };
    calc();
    const id = setInterval(calc, 30000);
    return () => clearInterval(id);
  }, [inTime]);

  return <span>{elapsed || "—"}</span>;
};

// ── Main Component ────────────────────────────────────────────────────────────
const EmployeeDashboard: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeUser | null>(null);
  const navigate = useNavigate();

  const [todayTask,  setTodayTask]  = useState<TaskDoc | null>(null);
  const [pastTasks,  setPastTasks]  = useState<TaskDoc[]>([]);
  const [activeTab,  setActiveTab]  = useState<"today" | "history" | "leave">("today");

  const [clockingIn, setClockingIn] = useState(false);

  const [location,    setLocation]    = useState("O-CBE");
  const [dependency,  setDependency]  = useState("");
  const [workMode,    setWorkMode]    = useState("Office");
  const [inTasks,     setInTasks]     = useState<any[]>([emptyInTask()]);
  const [isEditingIN, setIsEditingIN] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [outTasks,     setOutTasks]     = useState<TaskItem[]>([]);
  const [overallHours, setOverallHours] = useState(0);
  const [overallScore, setOverallScore] = useState("");
  const [isEditingOUT, setIsEditingOUT] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [breakLog,   setBreakLog]   = useState<BreakLogEntry[]>([]);
  // ── Server-authoritative break state for today, keyed by slotId ───────────
  const [breakState, setBreakState] = useState<Record<string, ServerBreakSlotState>>({
    morning: emptySlotState(), lunch: emptySlotState(), evening: emptySlotState(),
  });

  // ── NEW: track whether OUT has been submitted today ──────────────────────
  const [isOutDone,  setIsOutDone]  = useState(false);
  // Captured clock-out time displayed after submission
  const [clockOutTime, setClockOutTime] = useState<string>("");

  const [leaves,       setLeaves]       = useState<any[]>([]);
  const [leaveType,    setLeaveType]    = useState("Sick Leave");
  const [fromDate,     setFromDate]     = useState("");
  const [toDate,       setToDate]       = useState("");
  const [leaveReason,  setLeaveReason]  = useState("");
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [leaveMessage, setLeaveMessage] = useState({ text: "", type: "" });
  

  // Keep latest breakLog accessible inside handleOUTSubmit without stale closure
  const breakLogRef = useRef<BreakLogEntry[]>([]);
  useEffect(() => { breakLogRef.current = breakLog; }, [breakLog]);

  // ── Break tracker callback: also auto-split break minutes across IN tasks ─
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

  // ── Normalize breakState coming from the API (Map → plain object) ─────────
  const normaliseBreakState = (raw: any): Record<string, ServerBreakSlotState> => {
    const result: Record<string, ServerBreakSlotState> = {
      morning: emptySlotState(), lunch: emptySlotState(), evening: emptySlotState(),
    };
    if (!raw) return result;
    BREAK_SLOTS.forEach((slot) => {
      const s = raw[slot.id];
      if (s) {
        result[slot.id] = {
          runningStartIso: s.runningStartIso ?? null,
          elapsedMs:       s.elapsedMs ?? 0,
          sessions:        Array.isArray(s.sessions) ? s.sessions : [],
        };
      }
    });
    return result;
  };

  // ── Fetchers ────────────────────────────────────────────────────────────────
  const fetchTodayTask = useCallback(async (empId: string) => {
    try {
      const res    = await fetch(`${BASE_URL}/tasks/employee/${empId}?date=${today}`);
      const result = await res.json();
      if (result.success && result.result?.tasks?.length > 0) {
        const task = result.result.tasks[0];
        setTodayTask(task);
        setBreakState(normaliseBreakState(task.breakState));
        // Seed isOutDone from DB so freeze persists on reload
        setIsOutDone(task.isOutSubmitted ?? false);
        if (task.isOutSubmitted && task.outTime) {
          setClockOutTime(task.outTime);
        }
        if (task.isClockOnly) setShowTaskForm(true);
        setOutTasks(
          (task.tasks || []).map((t: TaskItem) => ({
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
      } else {
        setBreakState({ morning: emptySlotState(), lunch: emptySlotState(), evening: emptySlotState() });
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

  // Refresh just today's task (used after break start/stop) without
  // disturbing other UI state like task form visibility etc.
  const refreshBreakState = useCallback(async () => {
    if (!employee) return;
    await fetchTodayTask(employee.id);
  }, [employee, fetchTodayTask]);

  // ── Step 1: Clock In ────────────────────────────────────────────────────────
  const handleClockIn = async () => {
    if (!employee) return;
    setClockingIn(true);
    setMessage({ text: "", type: "" });
    try {
      const res    = await fetch(`${BASE_URL}/tasks/clock-in`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id, employeeName: employee.firstName, date: today }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: "✅ Clocked in! Now add your tasks below.", type: "success" });
        await fetchTodayTask(employee.id);
        await fetchPastTasks(employee.id);
        setShowTaskForm(true);
        setTimeout(() => {
          document.getElementById("task-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      } else {
        setMessage({ text: result.message || "Failed to clock in", type: "error" });
      }
    } catch {
      setMessage({ text: "Server error. Try again.", type: "error" });
    } finally {
      setClockingIn(false);
    }
  };

  // ── IN task form handlers ───────────────────────────────────────────────────
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
    const pts = [...(u[ti].subPoints || [])]; pts.splice(pi, 1);
    u[ti] = { ...u[ti], subPoints: pts }; setInTasks(u);
  };
  const updateSubPoint = (ti: number, pi: number, value: string) => {
    const u = [...inTasks];
    const pts = [...(u[ti].subPoints || [])]; pts[pi] = value;
    u[ti] = { ...u[ti], subPoints: pts }; setInTasks(u);
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
    u[ti] = {
      ...u[ti], timeSegments: segs, estimatedHours: estHours,
      plannedStart: segs[0]?.start ?? "", plannedEnd: segs[segs.length - 1]?.end ?? "",
    };
    setInTasks(u);
  };
  const updateSegment = (ti: number, si: number, field: "start" | "end", value: string) => {
    const u = [...inTasks];
    const segs = [...(u[ti].timeSegments || [])];
    segs[si] = { ...segs[si], [field]: value };
    const estHours = calcSegmentHours(segs, u[ti].breakMinutes || 0);
    u[ti] = {
      ...u[ti], timeSegments: segs, estimatedHours: estHours,
      plannedStart: segs[0]?.start ?? "", plannedEnd: segs[segs.length - 1]?.end ?? "",
    };
    setInTasks(u);
  };
  const updateBreak = (ti: number, mins: number) => {
    const u = [...inTasks];
    u[ti] = {
      ...u[ti], breakMinutes: mins,
      estimatedHours: calcSegmentHours(u[ti].timeSegments || [], mins),
    };
    setInTasks(u);
  };

  // ── Edit IN ──────────────────────────────────────────────────────────────────
  const handleEditIN = () => {
    if (!todayTask) return;
    setLocation(todayTask.location || "O-CBE");
    setDependency(todayTask.dependency || "");
    setWorkMode(todayTask.workMode || "Office");
    setInTasks(
      todayTask.tasks.map((t: any) => {
        const hasSavedSegs =
          Array.isArray(t.timeSegments) && t.timeSegments.length > 0 &&
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
          breakMinutes: t.breakMinutes ?? 0,
          subPoints: t.subPoints?.length ? [...t.subPoints] : [""],
        };
      })
    );
    setIsEditingIN(true);
    setShowTaskForm(true);
    setMessage({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEditIN = () => {
    setIsEditingIN(false);
    setShowTaskForm(false);
    setMessage({ text: "", type: "" });
  };

  // ── Step 2: Submit IN tasks ──────────────────────────────────────────────────
  const handleINSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee || !todayTask) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    const cleanedTasks = inTasks.map((t, i) => ({
      ...t,
      taskNumber: i + 1,
      subPoints: (t.subPoints || []).filter((p: string) => p.trim() !== ""),
    }));
    try {
      const res = await fetch(`${BASE_URL}/tasks/in/${todayTask._id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, dependency, workMode, tasks: cleanedTasks }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: isEditingIN ? "✅ Tasks updated!" : "✅ Tasks saved!", type: "success" });
        setIsEditingIN(false);
        setShowTaskForm(false);
        await fetchTodayTask(employee.id);
        await fetchPastTasks(employee.id);
      } else {
        setMessage({ text: result.message || "Failed to save tasks", type: "error" });
      }
    } catch {
      setMessage({ text: "Server error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ── OUT handlers ────────────────────────────────────────────────────────────
  // ✅ Auto-calculates actualHours from actualStart/actualEnd, and auto-sums
  //    overallHours from every task's actualHours.
  const updateOutTask = (i: number, field: string, value: any) => {
    const u = [...outTasks];
    (u[i] as any)[field] = value;

    // Auto-calc actualHours from actualStart & actualEnd
    if (field === "actualStart" || field === "actualEnd") {
      const start = field === "actualStart" ? value : (u[i] as any).actualStart;
      const end   = field === "actualEnd"   ? value : (u[i] as any).actualEnd;
      if (start && end) {
        const diffMins = toMinutes(end) - toMinutes(start);
        if (diffMins > 0) {
          const breakMins  = (u[i] as any).breakMinutes || 0;
          const netMins    = Math.max(diffMins - breakMins, 0);
          const roundedHrs = Math.round((netMins / 60) * 4) / 4;
          u[i] = { ...u[i], actualHours: roundedHrs } as any;
        }
      }
    }

    setOutTasks(u);

    // Auto-sum overallHours = sum of all tasks' actualHours
    const total = u.reduce((sum, t) => sum + (t.actualHours || 0), 0);
    setOverallHours(Math.round(total * 4) / 4);
  };

  const handleEditOUT = () => { setIsEditingOUT(true); setMessage({ text: "", type: "" }); };
  const handleCancelEditOUT = () => {
    if (!todayTask) return;
    setOutTasks(todayTask.tasks.map((t: any) => ({
      ...t,
      actualHours:   t.actualHours   ?? t.estimatedHours,
      actualPercent: t.actualPercent  ?? 0,
      actualStart:   t.actualStart    ?? "",
      actualEnd:     t.actualEnd      ?? "",
      score:         t.score  || "N/A",
      impact:        t.impact || "",
      status:        t.status || "Todo",
    })));
    setOverallHours(todayTask.overallHours || 0);
    setOverallScore(todayTask.overallScore  || "");
    setIsEditingOUT(false);
    setMessage({ text: "", type: "" });
  };

  // ── Step 3: Submit OUT (with clock-out time) ─────────────────────────────────
  const handleOUTSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todayTask) return;
    setLoading(true);
    setMessage({ text: "", type: "" });

    const isEditing = todayTask.isOutSubmitted && isEditingOUT;

    // overallHours is already kept in sync live via updateOutTask's auto-sum,
    // so we just use the current state value here.
    const computedOverallHours = overallHours;

    // ── Record clock-out time ─────────────────────────────────────────────────
    const nowFormatted = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: true,
    });

    try {
      const res = await fetch(`${BASE_URL}/tasks/out/${todayTask._id}`, {
        method:  isEditing ? "PATCH" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks:        outTasks,
          overallHours: computedOverallHours,
          overallScore,
          breakLog:     breakLogRef.current,
        }),
      });
      const result = await res.json();
      if (result.success) {
        // ── Freeze break timers ──────────────────────────────────────────────
        if (!isEditing) {
          setIsOutDone(true);
          setClockOutTime(nowFormatted);
        }
        setMessage({
          text: isEditing
            ? "✅ OUT edited!"
            : `✅ Clocked out at ${nowFormatted} · ${computedOverallHours}h recorded`,
          type: "success",
        });
        setIsEditingOUT(false);
        await fetchTodayTask(employee!.id);
        await fetchPastTasks(employee!.id);
      } else {
        setMessage({ text: result.message || "Failed", type: "error" });
      }
    } catch {
      setMessage({ text: "Server error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ── Leave ────────────────────────────────────────────────────────────────────
  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setLeaveLoading(true);
    setLeaveMessage({ text: "", type: "" });
    const from      = new Date(fromDate);
    const to        = new Date(toDate);
    const totalDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (totalDays < 1) {
      setLeaveMessage({ text: "To date must be on or after From date", type: "error" });
      setLeaveLoading(false);
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/leaves/apply`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id, leaveType, fromDate, toDate, totalDays, reason: leaveReason }),
      });
      const result = await res.json();
      if (result.success) {
        setLeaveMessage({ text: "✅ Leave submitted!", type: "success" });
        setFromDate(""); setToDate(""); setLeaveReason(""); setLeaveType("Sick Leave");
        fetchLeaves(employee.id);
      } else {
        setLeaveMessage({ text: result.message || "Failed", type: "error" });
      }
    } catch { setLeaveMessage({ text: "Server error", type: "error" }); }
    finally  { setLeaveLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem("employee"); navigate("/Employee"); };

  if (!employee) return null;

  const pendingLeaves   = leaves.filter((l) => l.status === "Pending").length;
  const hasClockedIn    = !!todayTask;
  const hasTasksFilled  = hasClockedIn && !todayTask?.isClockOnly;
  const taskFormVisible = showTaskForm || isEditingIN;

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
              ["Name",        employee.firstName],
              ["Email",       employee.email],
              ["Designation", employee.designation || "—"],
              ["Department",  employee.department  || "—"],
              ["Employee ID", `#${employee.employeeCode || "—"}`],
              ["Today",       today],
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
            <button
              key={key}
              className={`tab ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key as any)}
            >
              {label}
              {key === "leave" && pendingLeaves > 0 && (
                <span className="leave-pending-dot">{pendingLeaves}</span>
              )}
            </button>
          ))}
          <button className="tab team-wall-tab" onClick={() => navigate("/Team-Wall")}>
            🏆 Team Wall
          </button>
          <button className="tab private-chat-tab" onClick={() => navigate("/chat")}>
            💬 Private Chat
          </button>
        </div>

        {message.text && (
          <p className={message.type === "success" ? "success-msg" : "error-msg"}>{message.text}</p>
        )}

        {/* ── TODAY TAB ── */}
        {activeTab === "today" && (
          <>
            {/* Break tracker — server-authoritative, locked once OUT is submitted */}
            <BreakTracker
              employeeId={employee.id}
              breakState={breakState}
              onBreakUpdate={handleBreakUpdate}
              onRefresh={refreshBreakState}
              disabled={isOutDone}
            />

            {/* STEP 1: CLOCK IN */}
            {!hasClockedIn && (
              <div className="card clock-in-card">
                <div className="clock-in-inner">
                  <div className="clock-in-icon">🕐</div>
                  <div className="clock-in-text">
                    <h3>Start your day</h3>
                    <p>Clock in now to record your start time. You can add your tasks right after — even after your morning meeting.</p>
                  </div>
                  <div className="clock-in-right">
                    <div className="live-time"><LiveClock /></div>
                    <button className="clock-in-btn" onClick={handleClockIn} disabled={clockingIn}>
                      {clockingIn ? "Clocking in…" : "🟢 Clock In"}
                    </button>
                    <div className="clock-in-date">{today}</div>
                  </div>
                </div>
              </div>
            )}

            {/* CLOCKED IN — STATUS CARD */}
            {hasClockedIn && (
              <div className="clock-status-card">
                <div className="csc-left">
                  <div className="csc-indicator">
                    {isOutDone ? (
                      <span style={{ fontSize: 22 }}>🔴</span>
                    ) : (
                      <>
                        <span className="csc-pulse-ring" />
                        <span className="csc-dot" />
                      </>
                    )}
                  </div>
                  <div className="csc-info">
                    <div className="csc-title">
                      {isOutDone ? "Day ended" : "Active session"}
                    </div>
                    <div className="csc-time-row">
                      <span className="csc-in-label">🌅 IN</span>
                      <span className="csc-in-time">{todayTask?.inTime}</span>
                      {isOutDone && clockOutTime && (
                        <>
                          <span className="csc-sep">·</span>
                          <span className="csc-in-label">🌆 OUT</span>
                          <span className="csc-in-time" style={{ color: "#e65100" }}>{clockOutTime}</span>
                        </>
                      )}
                      <span className="csc-sep">·</span>
                      <span className="csc-date">{today}</span>
                    </div>
                    {todayTask?.workMode && (
                      <div className="csc-workmode-pill" style={wmPillStyle(todayTask.workMode)}>
                        {todayTask.workMode === "Office" ? "🏢" : todayTask.workMode === "Remote" ? "🏠" : "🔀"} {todayTask.workMode}
                      </div>
                    )}
                  </div>
                </div>

                <div className="csc-center">
                  {isOutDone ? (
                    <>
                      <div className="csc-elapsed-label">Total worked</div>
                      <div className="csc-elapsed-value" style={{ color: "#15803d" }}>
                        {overallHours > 0 ? `${overallHours}h` : "—"}
                      </div>
                      <div className="csc-elapsed-sub">net productive hours</div>
                    </>
                  ) : (
                    <>
                      <div className="csc-elapsed-label">Time elapsed</div>
                      <div className="csc-elapsed-value">
                        {todayTask?.inTime ? <LiveElapsed inTime={todayTask.inTime} /> : "—"}
                      </div>
                      <div className="csc-elapsed-sub">since clock-in</div>
                    </>
                  )}
                </div>

                <div className="csc-right">
                  {isOutDone ? (
                    <div style={{
                      background: "#dcfce7", color: "#15803d", border: "1px solid #86efac",
                      borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600,
                      textAlign: "center",
                    }}>
                      ✅ Clocked out<br />
                      <span style={{ fontSize: 11, fontWeight: 400, color: "#166534" }}>{clockOutTime}</span>
                    </div>
                  ) : (
                    <>
                      <div className="csc-now-label">Current time</div>
                      <div className="csc-now-value"><LiveClock /></div>
                      {hasTasksFilled && !taskFormVisible && (
                        <button className="csc-edit-btn" onClick={handleEditIN}>✏️ Edit tasks</button>
                      )}
                      {!hasTasksFilled && !taskFormVisible && (
                        <button
                          className="csc-add-tasks-btn"
                          onClick={() => {
                            setShowTaskForm(true);
                            setTimeout(() => {
                              document.getElementById("task-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 100);
                          }}
                        >
                          + Add tasks
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: TASK FORM */}
            {hasClockedIn && taskFormVisible && (
              <div className="card" id="task-form-section">
                <div className="card-header in">
                  <span className="tag in-tag">
                    {isEditingIN ? "✏️ Edit your tasks" : "📋 Add your tasks for today"}
                  </span>
                  <span className="date-tag">{today}</span>
                </div>

                {!isEditingIN && (
                  <div className="task-form-hint">
                    <span>💡</span>
                    <span>Add the tasks your manager assigned. You can come back and edit these anytime during the day.</span>
                  </div>
                )}

                <form onSubmit={handleINSubmit}>
                  <p className="section-label" style={{ marginBottom: 8 }}>Work mode</p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {["Office", "Remote", "Hybrid"].map((mode) => (
                      <button
                        key={mode} type="button" onClick={() => setWorkMode(mode)}
                        style={{
                          flex: 1, padding: "8px 4px", fontSize: 13, fontWeight: 500,
                          border: "0.5px solid #ddd", borderRadius: 8, cursor: "pointer",
                          ...wmStyle(mode, workMode),
                        }}
                      >
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
                          <input
                            placeholder="e.g. Employee Management System Development"
                            value={task.title}
                            onChange={(e) => updateInTask(i, "title", e.target.value)}
                            required
                          />
                        </div>

                        <div className="input-group" style={{ marginBottom: 10 }}>
                          <label>Task dependency (person / team)</label>
                          <input
                            placeholder="e.g. Jawahar, Design team..."
                            value={task.dependency ?? ""}
                            onChange={(e) => updateInTask(i, "dependency", e.target.value)}
                          />
                        </div>

                        <div className="input-group" style={{ marginBottom: 12 }}>
                          <label>Description / paragraph</label>
                          <textarea
                            className="subpoint-input"
                            style={{
                              width: "100%", minHeight: 64, padding: "8px 10px",
                              border: "1px solid #e0e0e0", borderRadius: 6,
                              fontSize: "0.9rem", fontFamily: "inherit", resize: "vertical",
                            }}
                            placeholder="Write what you plan to do today on this task..."
                            value={task.shortDesc}
                            onChange={(e) => updateInTask(i, "shortDesc", e.target.value)}
                          />
                        </div>

                        <div className="subpoints-section">
                          <label className="subpoints-label">📌 Sub points</label>
                          {(task.subPoints || [""]).map((point: string, pi: number) => (
                            <div className="subpoint-row" key={pi}>
                              <span className="bullet">•</span>
                              <input
                                className="subpoint-input"
                                placeholder="e.g. Developed login module..."
                                value={point}
                                onChange={(e) => updateSubPoint(i, pi, e.target.value)}
                              />
                              {(task.subPoints || [""]).length > 1 && (
                                <button type="button" className="remove-subpoint" onClick={() => removeSubPoint(i, pi)}>✕</button>
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
                                <button
                                  type="button" className="remove-subpoint"
                                  style={{ alignSelf: "flex-end", marginBottom: 4 }}
                                  onClick={() => removeSegment(i, si)}
                                >✕</button>
                              )}
                            </div>
                          ))}
                          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
                            <button type="button" className="add-subpoint-btn" onClick={() => addSegment(i)}>
                              + Add time block
                            </button>
                            <div className="input-group small" style={{ minWidth: 160 }}>
                              <label>Break (mins) — manual override</label>
                              <input
                                type="number" min="0" step="1"
                                value={task.breakMinutes ?? 0}
                                onChange={(e) => updateBreak(i, parseInt(e.target.value) || 0)}
                                style={task.breakMinutes > 0 ? {
                                  background: "#FEF9C3", color: "#92400E", fontWeight: 600, borderColor: "#FBBF24",
                                } : {}}
                              />
                            </div>
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
                                    <div
                                      className="timeline-block" style={{ flex: dur }}
                                      title={`Block ${si + 1}: ${seg.start}–${seg.end} (${Math.round(dur)}m)`}
                                    >
                                      <span>{seg.start}</span><span>{seg.end}</span>
                                    </div>
                                    {si < (task.timeSegments || []).length - 1 && (
                                      <div
                                        className="timeline-break"
                                        style={{ flex: Math.max(task.breakMinutes || 15, 10) }}
                                        title={`Break: ${task.breakMinutes || "?"}m`}
                                      >
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
                            <input
                              type="number" min="0" step="0.25" value={task.estimatedHours} readOnly
                              style={{ background: "#f0f7ff", color: "#1565c0", fontWeight: 600, cursor: "not-allowed" }}
                            />
                          </div>
                          <div className="input-group small">
                            <label>Target %</label>
                            <input
                              type="number" min="0" max="100" value={task.targetPercent}
                              onChange={(e) => updateInTask(i, "targetPercent", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <button type="button" className="add-task-btn" onClick={addInTask}>+ Add task</button>
                    {(isEditingIN || todayTask?.isClockOnly) && (
                      <button type="button" className="cancel-edit-btn" onClick={handleCancelEditIN}>Cancel</button>
                    )}
                    <button type="submit" className="submit-btn in-btn" disabled={loading}>
                      {loading ? "Saving…" : isEditingIN ? "Save changes" : "Save tasks"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TASKS SUBMITTED VIEW */}
            {hasClockedIn && hasTasksFilled && !taskFormVisible && (
              <>
                <div className="card">
                  <div className="card-header in">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span className="tag in-tag">🌅 IN update — submitted</span>
                      <span className="submitted-badge">✓ {todayTask?.inTime}</span>
                      <span style={{
                        fontSize: 12, fontWeight: 500, padding: "3px 10px",
                        borderRadius: 10, ...wmPillStyle(todayTask?.workMode || "Office"),
                      }}>
                        {todayTask?.workMode || "Office"}
                      </span>
                    </div>
                    {!isOutDone && (
                      <button className="edit-in-btn" onClick={handleEditIN}>✏️ Edit tasks</button>
                    )}
                  </div>

                  <div className="update-preview">
                    <p className="preview-meta">
                      <strong>{employee.firstName}</strong> IN – {todayTask?.location}
                      {todayTask?.dependency && ` | Dep: ${todayTask.dependency}`} – {todayTask?.date}
                    </p>
                    {(todayTask?.tasks as any[] || []).map((t) => (
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
                              seg.start && seg.end
                                ? <span key={si} className="seg-preview-pill">🕐 {seg.start}–{seg.end}</span>
                                : null
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

                  <BreakLogPanel log={breakLog} />
                </div>

                {/* OUT FORM */}
                <div className="card">
                  <div className="card-header out">
                    <span className="tag out-tag">
                      🌆 {isEditingOUT ? "Edit OUT update" : isOutDone ? "OUT update — submitted" : "OUT update — evening"}
                    </span>
                    <div className="header-right">
                      {todayTask?.isOutSubmitted && (
                        <>
                          <span className="submitted-badge">✓ {todayTask.outTime || clockOutTime}</span>
                          {!isEditingOUT && (
                            <button className="edit-out-btn" onClick={handleEditOUT}>✏️ Edit OUT</button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Clock-out summary banner — shown after submission */}
                  {isOutDone && !isEditingOUT && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
                      background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10,
                      padding: "12px 18px", margin: "12px 0", fontSize: 13,
                    }}>
                      <span style={{ fontSize: 22 }}>✅</span>
                      <div>
                        <div style={{ fontWeight: 700, color: "#15803d", fontSize: 14 }}>
                          Day complete — clocked out at {todayTask?.outTime || clockOutTime}
                        </div>
                        <div style={{ color: "#166534", marginTop: 2 }}>
                          🌅 IN {todayTask?.inTime} &nbsp;·&nbsp; 🌆 OUT {todayTask?.outTime || clockOutTime}
                          &nbsp;·&nbsp; ⏱ {overallHours}h productive
                        </div>
                      </div>
                    </div>
                  )}

                  <BreakLogPanel log={breakLog} />

                  <form onSubmit={handleOUTSubmit}>
                    <div className="tasks-list">
                      {outTasks.map((task, i) => {
                        const taskScore = calcScore(task);
                        const locked = (todayTask?.isOutSubmitted ?? false) && !isEditingOUT;
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
                                    seg.start && seg.end
                                      ? <span key={si} className="seg-preview-pill">{seg.start}–{seg.end}</span>
                                      : null
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
                                  <select value={task.status} onChange={(e) => updateOutTask(i, "status", e.target.value)} disabled={locked}>
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
                                  <label>Act. hours <span style={{ fontSize: 9, color: "#9ca3af" }}>(auto)</span></label>
                                  <input type="number" min="0" step="0.25" value={task.actualHours}
                                    onChange={(e) => updateOutTask(i, "actualHours", parseFloat(e.target.value))} disabled={locked}
                                    style={!locked ? { background: "#f0fdf4", color: "#15803d", fontWeight: 600 } : {}}
                                  />
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
                                  <div style={{
                                    height: 6, borderRadius: 3, transition: "width .3s",
                                    background: taskScore >= 70 ? "#639922" : taskScore >= 40 ? "#EF9F27" : "#E24B4A",
                                    width: `${taskScore}%`,
                                  }} />
                                </div>
                                <strong style={{
                                  fontSize: "0.85rem",
                                  color: taskScore >= 70 ? "#27500A" : taskScore >= 40 ? "#633806" : "#A32D2D",
                                }}>
                                  {taskScore}%
                                </strong>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="overall-row">
                      <div className="input-group small">
                        <label>Overall hours <span style={{ fontSize: 10, color: "#9ca3af" }}>(auto — sum of tasks)</span></label>
                        <input
                          type="number" min="0" step="0.25" value={overallHours}
                          onChange={(e) => setOverallHours(parseFloat(e.target.value))}
                          disabled={(todayTask?.isOutSubmitted ?? false) && !isEditingOUT}
                          style={overallHours > 0 ? { background: "#f0fdf4", color: "#15803d", fontWeight: 600 } : {}}
                        />
                      </div>
                      <div className="input-group small">
                        <label>Overall score</label>
                        <input
                          placeholder="e.g. 8/10" value={overallScore}
                          onChange={(e) => setOverallScore(e.target.value)}
                          disabled={(todayTask?.isOutSubmitted ?? false) && !isEditingOUT}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      {isEditingOUT && (
                        <button type="button" className="cancel-edit-btn" onClick={handleCancelEditOUT}>Cancel</button>
                      )}
                      {(!(todayTask?.isOutSubmitted) || isEditingOUT) && (
                        <button type="submit" className="submit-btn out-btn" disabled={loading}>
                          {loading
                            ? "Saving…"
                            : isEditingOUT
                              ? "Save changes"
                              : "🔴 Clock Out & Submit"}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* CLOCK-IN PENDING — waiting for tasks */}
            {hasClockedIn && !hasTasksFilled && !taskFormVisible && (
              <div className="card tasks-pending-card">
                <div className="tpc-inner">
                  <div className="tpc-icon">📋</div>
                  <div className="tpc-text">
                    <h3>Clocked in at {todayTask?.inTime}</h3>
                    <p>Your start time is recorded. Add your tasks whenever you're ready — after your meeting, or now.</p>
                  </div>
                  <button
                    className="add-tasks-now-btn"
                    onClick={() => {
                      setShowTaskForm(true);
                      setTimeout(() => {
                        document.getElementById("task-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }}
                  >
                    + Add tasks now
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── HISTORY TAB ── */}
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
                        <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 20, fontWeight: 600, ...wmPillStyle(task.workMode) }}>
                          {task.workMode}
                        </span>
                      )}
                      {task.dependency && <span className="history-dep">👤 {task.dependency}</span>}
                      {task.isOutSubmitted
                        ? <span className="badge-done">✓ Complete</span>
                        : task.isClockOnly
                          ? <span className="badge-pending">⏰ Tasks pending</span>
                          : <span className="badge-pending">⏳ OUT Pending</span>}
                    </div>
                  </div>

                  <div className="history-section">
                    <div className="section-label in-label">🌅 IN — {task.inTime || "—"}</div>
                    {task.isClockOnly ? (
                      <p className="pending-msg" style={{ paddingLeft: 0, color: "#9ca3af" }}>
                        Clocked in — tasks not yet added.
                      </p>
                    ) : (
                      <>
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
                                  seg.start && seg.end
                                    ? <span key={si} className="seg-preview-pill">🕐 {seg.start}–{seg.end}</span>
                                    : null
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
                      </>
                    )}
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
                  ) : !task.isClockOnly ? (
                    <div className="history-section out-pending-section">
                      <div className="section-label out-label">🌆 OUT — Pending</div>
                      <p className="pending-msg">Evening update not yet submitted.</p>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        )}

        {/* ── LEAVE TAB ── */}
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
                      {["Sick Leave", "Casual Leave", "Emergency Leave", "Personal Leave", "Other"].map((l) => (
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
                  <input
                    placeholder="Enter reason for leave..." value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)} required
                  />
                </div>
                {leaveMessage.text && (
                  <p className={leaveMessage.type === "success" ? "success-msg" : "error-msg"}>{leaveMessage.text}</p>
                )}
                <div className="form-actions">
                  <button type="submit" className="submit-btn in-btn" disabled={leaveLoading}>
                    {leaveLoading ? "Submitting…" : "Submit leave request"}
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