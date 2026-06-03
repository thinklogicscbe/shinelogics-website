import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const today = new Date().toLocaleDateString("en-GB").split("/").join("-");


const calcScore = (task: any) => {
  const pct = Math.min((task.actualPercent || 0) / (task.targetPercent || 100), 1) * 60;
  const hrs = task.estimatedHours > 0
    ? Math.min(task.estimatedHours / Math.max(task.actualHours || 0.1, 0.1), 1) * 40
    : 40;
  return Math.round(pct + hrs);
};

interface TaskItem {
  taskNumber: number;
  title: string;
  subPoints?: string[];
  shortDesc?: string;
  estimatedHours: number;
  actualHours: number;
  targetPercent: number;
  actualPercent: number;
  plannedStart?: string;
  plannedEnd?: string;
  actualStart?: string;
  actualEnd?: string;
  status: "Todo" | "In Progress" | "Done" | "Incomplete";
  score: string;
  impact: string;
}

interface TaskDoc {
  _id: string;
  date: string;
  location: string;
  dependency: string;
  workMode: string;
  tasks: TaskItem[];
  overallHours: number;
  overallScore: string;
  isOutSubmitted: boolean;
  inTime: string;
  outTime: string;
}

interface EmployeeUser {
  id: string;
  firstName: string;
  email: string;
  designation: string;
  department: string;
  employeeCode: number;
  role?: string;
  companyId?: string;
  teamIds?: string[];
}

const STATUS_OPTIONS = [
  "Todo", "Started", "In Progress", "Paused", "Blocked",
  "Completed Local", "Ready For Testing", "Testing In Progress",
  "Test Passed", "Ready For Production", "Production Released", "Closed",
];

const emptyInTask = () => ({
  title: "",
  shortDesc: "",
  subPoints: [""],
  estimatedHours: 8,
  targetPercent: 100,
  plannedStart: "09:00",
  plannedEnd: "17:00",
});

const EmployeeDashboard: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeUser | null>(null);
  const navigate = useNavigate();

  const [todayTask, setTodayTask] = useState<TaskDoc | null>(null);
  const [pastTasks, setPastTasks] = useState<TaskDoc[]>([]);
  const [activeTab, setActiveTab] = useState<"attendance" | "today" | "history" | "leave">("attendance");

  // IN form
  const [location, setLocation] = useState("O-CBE");
  const [dependency, setDependency] = useState("");
  const [workMode, setWorkMode] = useState("Office");
  const [inTasks, setInTasks] = useState<any[]>([emptyInTask()]);
  const [isEditingIN, setIsEditingIN] = useState(false);

  // OUT form
  const [outTasks, setOutTasks] = useState<TaskItem[]>([]);
  const [overallHours, setOverallHours] = useState(0);
  const [overallScore, setOverallScore] = useState("");
  const [isEditingOUT, setIsEditingOUT] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Attendance
  const [attendance, setAttendance] = useState<any | null>(null);
  const [checkInLocation, setCheckInLocation] = useState("O-CBE");
  const [attendanceWorkMode, setAttendanceWorkMode] = useState("Office");

  // Leave
  const [leaves, setLeaves] = useState<any[]>([]);
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [leaveMessage, setLeaveMessage] = useState({ text: "", type: "" });

  const fetchTodayTask = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/employee/${empId}?date=${today}`);
      const result = await res.json();
      if (result.success && result.result?.tasks?.length > 0) {
        const task = result.result.tasks[0];
        setTodayTask(task);
        setOutTasks(
          task.tasks.map((t: TaskItem) => ({
            ...t,
            actualHours: t.actualHours || t.estimatedHours,
            actualPercent: t.actualPercent || 0,
            score: t.score || "N/A",
            impact: t.impact || "",
            status: t.status || "Todo",
          }))
        );
        setOverallHours(task.overallHours || 0);
        setOverallScore(task.overallScore || "");
      }
    } catch (err) { console.error(err); }
  }, []);

  const fetchPastTasks = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/employee/${empId}`);
      const result = await res.json();
      if (result.success) setPastTasks(result.result?.tasks || []);
    } catch (err) { console.error(err); }
  }, []);

  const fetchLeaves = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/leaves/employee/${empId}`);
      const result = await res.json();
      if (result.success) setLeaves(result.result?.leaves || []);
    } catch (err) { console.error(err); }
  }, []);

  const fetchAttendance = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/attendance?employeeId=${empId}&date=${today}`);
      const result = await res.json();
      setAttendance(result.result?.attendance?.[0] || null);
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
    fetchAttendance(emp.id);
  }, [navigate, fetchTodayTask, fetchPastTasks, fetchLeaves, fetchAttendance]);

  // ── IN handlers ───────────────────────────────────────────────────────────

  const addInTask = () => setInTasks([...inTasks, emptyInTask()]);

  const removeInTask = (i: number) => {
    if (inTasks.length === 1) return;
    setInTasks(inTasks.filter((_, idx) => idx !== i));
  };

  const updateInTask = (i: number, field: string, value: any) => {
    const updated = [...inTasks];
    updated[i] = { ...updated[i], [field]: value };
    setInTasks(updated);
  };

  const addSubPoint = (ti: number) => {
    const updated = [...inTasks];
    updated[ti] = { ...updated[ti], subPoints: [...(updated[ti].subPoints || []), ""] };
    setInTasks(updated);
  };

  const removeSubPoint = (ti: number, pi: number) => {
    const updated = [...inTasks];
    const pts = [...(updated[ti].subPoints || [])];
    pts.splice(pi, 1);
    updated[ti] = { ...updated[ti], subPoints: pts };
    setInTasks(updated);
  };

  const updateSubPoint = (ti: number, pi: number, value: string) => {
    const updated = [...inTasks];
    const pts = [...(updated[ti].subPoints || [])];
    pts[pi] = value;
    updated[ti] = { ...updated[ti], subPoints: pts };
    setInTasks(updated);
  };

  const handleEditIN = () => {
    if (!todayTask) return;
    setLocation(todayTask.location);
    setDependency(todayTask.dependency);
    setWorkMode(todayTask.workMode || "Office");
    setInTasks(todayTask.tasks.map((t: any) => ({
      title: t.title,
      shortDesc: t.shortDesc || "",
      estimatedHours: t.estimatedHours,
      targetPercent: t.targetPercent,
      plannedStart: t.plannedStart || "09:00",
      plannedEnd: t.plannedEnd || "17:00",
      subPoints: t.subPoints?.length ? t.subPoints : [""],
    })));
    setIsEditingIN(true);
    setMessage({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEditIN = () => {
    setIsEditingIN(false);
    setMessage({ text: "", type: "" });
  };

  const handleINSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setLoading(true);
    setMessage({ text: "", type: "" });

    const cleanedTasks = inTasks.map((t, i) => ({
      ...t,
      taskNumber: i + 1,
      subPoints: (t.subPoints || []).filter((p: string) => p.trim() !== ""),
    }));

    try {
      if (isEditingIN && todayTask) {
        const res = await fetch(`${BASE_URL}/tasks/in/${todayTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location, dependency, workMode, tasks: cleanedTasks }),
        });
        const result = await res.json();
        if (result.success) {
          setMessage({ text: "✅ IN update edited successfully!", type: "success" });
          setIsEditingIN(false);
          fetchTodayTask(employee.id);
          fetchPastTasks(employee.id);
        } else {
          setMessage({ text: result.message || "Failed", type: "error" });
        }
      } else {
        const res = await fetch(`${BASE_URL}/tasks/in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId: employee.id,
            employeeName: employee.firstName,
            date: today,
            location,
            dependency,
            workMode,
            tasks: cleanedTasks,
          }),
        });
        const result = await res.json();
        if (result.success) {
          setMessage({ text: "✅ IN update submitted!", type: "success" });
          fetchTodayTask(employee.id);
          fetchPastTasks(employee.id);
        } else {
          setMessage({ text: result.message || "Failed", type: "error" });
        }
      }
    } catch {
      setMessage({ text: "Server error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ── OUT handlers ──────────────────────────────────────────────────────────

  const updateOutTask = (i: number, field: string, value: any) => {
    const updated = [...outTasks];
    (updated[i] as any)[field] = value;
    setOutTasks(updated);
  };

  const handleEditOUT = () => { setIsEditingOUT(true); setMessage({ text: "", type: "" }); };

  const handleCancelEditOUT = () => {
    if (!todayTask) return;
    setOutTasks(todayTask.tasks.map((t) => ({
      ...t,
      actualHours: t.actualHours || t.estimatedHours,
      actualPercent: t.actualPercent || 0,
      score: t.score || "N/A",
      impact: t.impact || "",
      status: t.status || "Todo",
    })));
    setOverallHours(todayTask.overallHours || 0);
    setOverallScore(todayTask.overallScore || "");
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
      const res = await fetch(`${BASE_URL}/tasks/out/${todayTask._id}`, {
        method: isEditing ? "PATCH" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: outTasks, overallHours, overallScore }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: isEditing ? "✅ OUT edited!" : "✅ OUT submitted!", type: "success" });
        setIsEditingOUT(false);
        fetchTodayTask(employee!.id);
        fetchPastTasks(employee!.id);
      } else {
        setMessage({ text: result.message || "Failed", type: "error" });
      }
    } catch {
      setMessage({ text: "Server error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

 
  // ── Leave handler ─────────────────────────────────────────────────────────

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setLeaveLoading(true);
    setLeaveMessage({ text: "", type: "" });
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const totalDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (totalDays < 1) { setLeaveMessage({ text: "To date must be on or after From date", type: "error" }); setLeaveLoading(false); return; }
    try {
      const res = await fetch(`${BASE_URL}/leaves/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id, leaveType, fromDate, toDate, totalDays, reason: leaveReason }),
      });
      const result = await res.json();
      if (result.success) {
        setLeaveMessage({ text: "✅ Leave submitted!", type: "success" });
        setFromDate(""); setToDate(""); setLeaveReason(""); setLeaveType("Sick Leave");
        fetchLeaves(employee.id);
      } else { setLeaveMessage({ text: result.message || "Failed", type: "error" }); }
    } catch { setLeaveMessage({ text: "Server error", type: "error" }); }
    finally { setLeaveLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem("employee"); navigate("/Employee"); };

  if (!employee) return null;

  const pendingLeaves = leaves.filter((l) => l.status === "Pending").length;

  const wmStyle = (mode: string, active: string) => {
    const isActive = active === mode;
    if (!isActive) return {};
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
              ["Name", employee.firstName],
              ["Email", employee.email],
              ["Designation", employee.designation || "—"],
              ["Department", employee.department || "—"],
              ["Employee ID", `#${employee.employeeCode || "—"}`],
              ["Today", today],
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
            
            { key: "today", label: "📋 Today's Tasks" },
            { key: "history", label: "📅 History" },
            { key: "leave", label: "🏖️ Leave" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key as any)}
            >
              {label}
              {key === "leave" && pendingLeaves > 0 && <span className="leave-pending-dot">{pendingLeaves}</span>}
            </button>
          ))}
        </div>

        {message.text && (
          <p className={message.type === "success" ? "success-msg" : "error-msg"}>{message.text}</p>
        )}




        {/* ── TODAY TAB ── */}
        {activeTab === "today" && (
          <>
            {/* IN FORM — show when no task yet OR editing */}
            {(!todayTask || isEditingIN) && (
              <div className="card">
                <div className="card-header in">
                  <span className="tag in-tag">🌅 {isEditingIN ? "Edit IN update" : "IN update — morning"}</span>
                  <span className="date-tag">{today}</span>
                </div>

                <form onSubmit={handleINSubmit}>
                  {/* Work mode */}
                  <p className="section-label" style={{ marginBottom: 8 }}>Work mode</p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {["Office", "Remote", "Hybrid"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setWorkMode(mode)}
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

                  {/* Location + dependency */}
                  <div className="meta-row">
                    <div className="input-group">
                      <label>Location</label>
                      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. O-CBE" />
                    </div>
                    <div className="input-group">
                      <label>Dependency</label>
                      <input value={dependency} onChange={(e) => setDependency(e.target.value)} placeholder="e.g. Jawahar" />
                    </div>
                  </div>

                  {/* TASKS */}
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

                        {/* Title */}
                        <div className="input-group" style={{ marginBottom: 10 }}>
                          <label>Task title</label>
                          <input
                            placeholder="e.g. Employee Management System Development (Shinelogics)"
                            value={task.title}
                            onChange={(e) => updateInTask(i, "title", e.target.value)}
                            required
                          />
                        </div>

                        {/* Description */}
                        <div className="input-group" style={{ marginBottom: 12 }}>
                          <label>Description / paragraph</label>
                          <textarea
                            className="subpoint-input"
                            style={{ width: "100%", minHeight: 64, padding: "8px 10px", border: "1px solid #e0e0e0", borderRadius: 6, fontSize: "0.9rem", fontFamily: "inherit", resize: "vertical" }}
                            placeholder="Write what you plan to do today on this task..."
                            value={task.shortDesc}
                            onChange={(e) => updateInTask(i, "shortDesc", e.target.value)}
                          />
                        </div>

                        {/* Sub points */}
                        <div className="subpoints-section">
                          <label className="subpoints-label">📌 Sub points (bullet details)</label>
                          {(task.subPoints || [""]).map((point: string, pi: number) => (
                            <div className="subpoint-row" key={pi}>
                              <span className="bullet">•</span>
                              <input
                                className="subpoint-input"
                                placeholder="e.g. Developed login module with JWT auth..."
                                value={point}
                                onChange={(e) => updateSubPoint(i, pi, e.target.value)}
                              />
                              {(task.subPoints || [""]).length > 1 && (
                                <button type="button" className="remove-subpoint" onClick={() => removeSubPoint(i, pi)}>✕</button>
                              )}
                            </div>
                          ))}
                          <button type="button" className="add-subpoint-btn" onClick={() => addSubPoint(i)}>+ Add sub point</button>
                        </div>

                        {/* Time and hours */}
                        <div className="task-fields" style={{ marginTop: 12 }}>
                          <div className="input-group small">
                            <label>Planned start</label>
                            <input type="time" value={task.plannedStart} onChange={(e) => updateInTask(i, "plannedStart", e.target.value)} />
                          </div>
                          <div className="input-group small">
                            <label>Planned end</label>
                            <input type="time" value={task.plannedEnd} onChange={(e) => updateInTask(i, "plannedEnd", e.target.value)} />
                          </div>
                          <div className="input-group small">
                            <label>Est. hours</label>
                            <input type="number" min="0" step="0.5" value={task.estimatedHours}
                              onChange={(e) => updateInTask(i, "estimatedHours", parseFloat(e.target.value))} />
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
                    {isEditingIN && <button type="button" className="cancel-edit-btn" onClick={handleCancelEditIN}>Cancel</button>}
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
                      <span style={{ fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 10, ...wmPillStyle(todayTask.workMode || "Office") }}>
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
                            {t.plannedStart && `${t.plannedStart}–${t.plannedEnd} · `}
                            {t.estimatedHours}h · T-{t.targetPercent}%
                          </span>
                        </div>
                        {t.shortDesc && (
                          <p style={{ fontSize: "0.83rem", color: "#555", fontStyle: "italic", marginLeft: 52, marginBottom: 4 }}>
                            {t.shortDesc}
                          </p>
                        )}
                        {t.subPoints && t.subPoints.filter((p: string) => p.trim()).length > 0 && (
                          <div className="preview-subpoints">
                            {t.subPoints.filter((p: string) => p.trim()).map((point: string, pi: number) => (
                              <div className="preview-subpoint" key={pi}>
                                <span className="preview-bullet">•</span>
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* OUT FORM */}
                <div className="card">
                  <div className="card-header out">
                    <span className="tag out-tag">🌆 {isEditingOUT ? "Edit OUT update" : "OUT update — evening"}</span>
                    <div className="header-right">
                      {todayTask.isOutSubmitted && (
                        <>
                          <span className="submitted-badge">✓ {todayTask.outTime}</span>
                          {!isEditingOUT && <button className="edit-out-btn" onClick={handleEditOUT}>✏️ Edit OUT</button>}
                        </>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleOUTSubmit}>
                    <div className="tasks-list">
                      {outTasks.map((task, i) => {
                        const score = calcScore(task);
                        const locked = todayTask.isOutSubmitted && !isEditingOUT;
                        return (
                          <div className="task-row out-task-row" key={i}>
                            <div className="task-num">Task {task.taskNumber}</div>
                            <div className="task-fields out-fields">
                              {/* Task title */}
                              <div className="task-title-display">{task.title}</div>

                              {/* Description if present */}
                              {(task as any).shortDesc && (
                                <p style={{ fontSize: "0.83rem", color: "#666", fontStyle: "italic", marginBottom: 8 }}>
                                  {(task as any).shortDesc}
                                </p>
                              )}

                              {/* Sub points from morning */}
                              {(task as any).subPoints?.filter((p: string) => p.trim()).length > 0 && (
                                <div className="out-subpoints" style={{ marginBottom: 10 }}>
                                  {(task as any).subPoints.filter((p: string) => p.trim()).map((point: string, pi: number) => (
                                    <div className="preview-subpoint" key={pi}>
                                      <span className="preview-bullet">•</span>
                                      <span>{point}</span>
                                    </div>
                                  ))}
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
                                  <input type="time" value={(task as any).actualStart || ""} onChange={(e) => updateOutTask(i, "actualStart", e.target.value)} disabled={locked} />
                                </div>
                                <div className="input-group small">
                                  <label>Actual end</label>
                                  <input type="time" value={(task as any).actualEnd || ""} onChange={(e) => updateOutTask(i, "actualEnd", e.target.value)} disabled={locked} />
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

                              {/* Live productivity score */}
                              <div className="history-overall-bar" style={{ marginTop: 10, alignItems: "center", gap: 12 }}>
                                <span style={{ fontSize: "0.8rem", color: "#555" }}>Productivity score:</span>
                                <div style={{ flex: 1, height: 6, background: "#eee", borderRadius: 3 }}>
                                  <div style={{ height: 6, borderRadius: 3, background: score >= 70 ? "#639922" : score >= 40 ? "#EF9F27" : "#E24B4A", width: `${score}%`, transition: "width .3s" }} />
                                </div>
                                <strong style={{ fontSize: "0.85rem", color: score >= 70 ? "#27500A" : score >= 40 ? "#633806" : "#A32D2D" }}>{score}%</strong>
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
                      {isEditingOUT && <button type="button" className="cancel-edit-btn" onClick={handleCancelEditOUT}>Cancel</button>}
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
                        : <span className="badge-pending">⏳ OUT Pending</span>}
                    </div>
                  </div>

                  <div className="history-section">
                    <div className="section-label in-label">🌅 IN — {task.inTime || "—"}</div>
                    {(task.tasks as any[]).map((t) => (
                      <div className="history-task-block" key={t.taskNumber}>
                        <div className="history-task-row">
                          <span className="ht-num">Task {t.taskNumber}:</span>
                          <span className="ht-title">{t.title}</span>
                          <span className="ht-meta">
                            {t.plannedStart && `${t.plannedStart}–${t.plannedEnd} · `}
                            T-{t.targetPercent}% · {t.estimatedHours}h
                          </span>
                        </div>
                        {t.shortDesc && (
                          <p style={{ fontSize: "0.78rem", color: "#666", fontStyle: "italic", paddingLeft: 52, marginTop: 2 }}>{t.shortDesc}</p>
                        )}
                        {t.subPoints && t.subPoints.filter((p: string) => p.trim()).length > 0 && (
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
                      {(task.tasks as any[]).map((t) => (
                        <div className="history-task-block" key={t.taskNumber}>
                          <div className="history-task-row out-row">
                            <span className="ht-num">Task {t.taskNumber}:</span>
                            <span className="ht-title">{t.title}</span>
                            <span className={`status-pill ${t.status?.replace(/\s/g, "-").toLowerCase()}`}>{t.status}</span>
                            <span className="ht-meta">
                              {t.estimatedHours}h / {t.actualHours}h · {t.targetPercent}% / {t.actualPercent}% · Score: {t.score}
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

        {/* ── LEAVE TAB ── */}
        {activeTab === "leave" && (
          <div>
            <div className="card">
              <div className="card-header in"><span className="tag in-tag">🏖️ Apply for leave</span></div>
              <form onSubmit={handleLeaveSubmit} autoComplete="off">
                <div className="meta-row">
                  <div className="input-group">
                    <label>Leave type</label>
                    <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                      {["Sick Leave","Casual Leave","Emergency Leave","Personal Leave","Other"].map(l => <option key={l}>{l}</option>)}
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
                  <input placeholder="Enter reason for leave..." value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} required />
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
              <div className="card-header in"><span className="tag in-tag">📋 My leave requests ({leaves.length})</span></div>
              {leaves.length === 0 ? <p className="empty-msg">No leave requests found.</p> : (
                <div className="leave-history-list">
                  {leaves.map((leave) => (
                    <div key={leave._id} className={`leave-history-item ${leave.status.toLowerCase()}`}>
                      <div className="lhi-top">
                        <div className="lhi-left">
                          <span className="lhi-type">{leave.leaveType}</span>
                          <p className="lhi-dates">📅 {leave.fromDate} → {leave.toDate}<span className="lhi-days">({leave.totalDays} day{leave.totalDays > 1 ? "s" : ""})</span></p>
                          <p className="lhi-reason">"{leave.reason}"</p>
                          <span className="lhi-applied">Applied: {leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString("en-IN") : "—"}</span>
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