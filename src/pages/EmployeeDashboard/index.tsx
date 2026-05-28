import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContainer } from "./style";

const BASE_URL = "http://localhost:5000/api";

interface TaskItem {
  taskNumber: number;
  title: string;
  estimatedHours: number;
  actualHours: number;
  targetPercent: number;
  actualPercent: number;
  status: "Todo" | "In Progress" | "Done" | "Incomplete";
  score: string;
  impact: string;
}

interface TaskDoc {
  _id: string;
  date: string;
  location: string;
  dependency: string;
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
}

const today = new Date().toLocaleDateString("en-GB").split("/").join("-");

const EmployeeDashboard: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeUser | null>(null);
  const navigate = useNavigate();

  const [todayTask, setTodayTask] = useState<TaskDoc | null>(null);
  const [pastTasks, setPastTasks] = useState<TaskDoc[]>([]);
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  // IN form
  const [location, setLocation] = useState("O-CBE");
  const [dependency, setDependency] = useState("");
  const [inTasks, setInTasks] = useState([
    { title: "", estimatedHours: 0, targetPercent: 100 },
  ]);
  const [isEditingIN, setIsEditingIN] = useState(false);

  // OUT form
  const [outTasks, setOutTasks] = useState<TaskItem[]>([]);
  const [overallHours, setOverallHours] = useState(0);
  const [overallScore, setOverallScore] = useState("");
  const [isEditingOUT, setIsEditingOUT] = useState(false); // ✅ NEW

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (!stored) { navigate("/Employee"); return; }
    const emp = JSON.parse(stored);
    setEmployee(emp);
    fetchTodayTask(emp.id);
    fetchPastTasks(emp.id);
  }, []);

  const fetchTodayTask = async (empId: string) => {
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
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPastTasks = async (empId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/employee/${empId}`);
      const result = await res.json();
      if (result.success) setPastTasks(result.result?.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ── IN handlers ─────────────────────────────────────────────────────────────

  const addInTask = () => {
    setInTasks([...inTasks, { title: "", estimatedHours: 0, targetPercent: 100 }]);
  };

  const removeInTask = (index: number) => {
    if (inTasks.length === 1) return;
    setInTasks(inTasks.filter((_, i) => i !== index));
  };

  const updateInTask = (index: number, field: string, value: any) => {
    const updated = [...inTasks];
    (updated[index] as any)[field] = value;
    setInTasks(updated);
  };

  const handleEditIN = () => {
    if (!todayTask) return;
    setLocation(todayTask.location);
    setDependency(todayTask.dependency);
    setInTasks(
      todayTask.tasks.map((t) => ({
        title: t.title,
        estimatedHours: t.estimatedHours,
        targetPercent: t.targetPercent,
      }))
    );
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

    try {
      if (isEditingIN && todayTask) {
        const res = await fetch(`${BASE_URL}/tasks/in/${todayTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location, dependency, tasks: inTasks }),
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
            tasks: inTasks,
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

  // ── OUT handlers ─────────────────────────────────────────────────────────────

  const updateOutTask = (index: number, field: string, value: any) => {
    const updated = [...outTasks];
    (updated[index] as any)[field] = value;
    setOutTasks(updated);
  };

  // ✅ NEW — start editing OUT
  const handleEditOUT = () => {
    if (!todayTask) return;
    setIsEditingOUT(true);
    setMessage({ text: "", type: "" });
  };

  // ✅ NEW — cancel editing OUT
  const handleCancelEditOUT = () => {
    if (!todayTask) return;
    // Reset OUT fields back to saved values
    setOutTasks(
      todayTask.tasks.map((t) => ({
        ...t,
        actualHours: t.actualHours || t.estimatedHours,
        actualPercent: t.actualPercent || 0,
        score: t.score || "N/A",
        impact: t.impact || "",
        status: t.status || "Todo",
      }))
    );
    setOverallHours(todayTask.overallHours || 0);
    setOverallScore(todayTask.overallScore || "");
    setIsEditingOUT(false);
    setMessage({ text: "", type: "" });
  };

  // ✅ UPDATED — uses PATCH when editing, PUT for first submit
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
        setMessage({
          text: isEditing ? "✅ OUT update edited successfully!" : "✅ OUT update submitted!",
          type: "success",
        });
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

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate("/Employee");
  };

  if (!employee) return null;

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
            <div className="profile-item">
              <span className="label">Name</span>
              <span className="value">{employee.firstName}</span>
            </div>
            <div className="divider" />
            <div className="profile-item">
              <span className="label">Email</span>
              <span className="value">{employee.email}</span>
            </div>
            <div className="divider" />
            <div className="profile-item">
              <span className="label">Designation</span>
              <span className="value">{employee.designation || "—"}</span>
            </div>
            <div className="divider" />
            <div className="profile-item">
              <span className="label">Department</span>
              <span className="value">{employee.department || "—"}</span>
            </div>
            <div className="divider" />
            <div className="profile-item">
              <span className="label">Employee ID</span>
              <span className="value">#{employee.employeeCode || "—"}</span>
            </div>
            <div className="divider" />
            <div className="profile-item">
              <span className="label">Today</span>
              <span className="value">{today}</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "today" ? "active" : ""}`}
            onClick={() => setActiveTab("today")}
          >
            📋 Today's Tasks
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📅 History
          </button>
        </div>

        {message.text && (
          <p className={message.type === "success" ? "success-msg" : "error-msg"}>
            {message.text}
          </p>
        )}

        {/* TODAY TAB */}
        {activeTab === "today" && (
          <>
            {/* IN FORM — show if no task yet OR editing */}
            {(!todayTask || isEditingIN) && (
              <div className="card">
                <div className="card-header in">
                  <span className="tag in-tag">
                    🌅 {isEditingIN ? "Edit IN Update" : "IN Update — Morning"}
                  </span>
                  <span className="date-tag">{today}</span>
                </div>

                <form onSubmit={handleINSubmit}>
                  <div className="meta-row">
                    <div className="input-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. O-CBE"
                      />
                    </div>
                    <div className="input-group">
                      <label>Dependency</label>
                      <input
                        type="text"
                        value={dependency}
                        onChange={(e) => setDependency(e.target.value)}
                        placeholder="e.g. Jawahar"
                      />
                    </div>
                  </div>

                  <div className="tasks-list">
                    {inTasks.map((task, i) => (
                      <div className="task-row" key={i}>
                        <div className="task-num">Task {i + 1}</div>
                        <div className="task-fields">
                          <div className="input-group wide">
                            <label>Task Title</label>
                            <input
                              type="text"
                              placeholder="Describe the task..."
                              value={task.title}
                              onChange={(e) => updateInTask(i, "title", e.target.value)}
                              required
                            />
                          </div>
                          <div className="input-group small">
                            <label>Est. Hours</label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={task.estimatedHours}
                              onChange={(e) =>
                                updateInTask(i, "estimatedHours", parseFloat(e.target.value))
                              }
                            />
                          </div>
                          <div className="input-group small">
                            <label>Target %</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={task.targetPercent}
                              onChange={(e) =>
                                updateInTask(i, "targetPercent", parseInt(e.target.value))
                              }
                            />
                          </div>
                          {inTasks.length > 1 && (
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => removeInTask(i)}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <button type="button" className="add-task-btn" onClick={addInTask}>
                      + Add Task
                    </button>
                    {isEditingIN && (
                      <button
                        type="button"
                        className="cancel-edit-btn"
                        onClick={handleCancelEditIN}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="submit-btn in-btn"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : isEditingIN ? "Save Changes" : "Submit IN Update"}
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
                    <span className="tag in-tag">🌅 IN Update — Submitted</span>
                    <div className="header-right">
                      <span className="submitted-badge">✓ {todayTask.inTime}</span>
                      <button className="edit-in-btn" onClick={handleEditIN}>
                        ✏️ Edit IN
                      </button>
                    </div>
                  </div>
                  <div className="update-preview">
                    <p className="preview-meta">
                      <strong>{employee.firstName}</strong> IN – {todayTask.location}
                      {todayTask.dependency && ` | Dependency: ${todayTask.dependency}`}
                      {" – "}{todayTask.date}
                    </p>
                    {todayTask.tasks.map((t) => (
                      <div className="preview-task" key={t.taskNumber}>
                        <span className="task-label">Task {t.taskNumber}:</span>
                        <span className="task-title">{t.title}</span>
                        <span className="task-meta">
                          T-{t.targetPercent}% – {t.estimatedHours} hrs
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OUT UPDATE FORM */}
                <div className="card">
                  {/* ✅ UPDATED card-header with Edit OUT button */}
                  <div className="card-header out">
                    <span className="tag out-tag">
                      🌆 {isEditingOUT ? "Edit OUT Update" : "OUT Update — Evening"}
                    </span>
                    <div className="header-right">
                      {todayTask.isOutSubmitted && (
                        <>
                          <span className="submitted-badge">✓ {todayTask.outTime}</span>
                          {!isEditingOUT && (
                            <button className="edit-out-btn" onClick={handleEditOUT}>
                              ✏️ Edit OUT
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleOUTSubmit}>
                    <div className="tasks-list">
                      {outTasks.map((task, i) => (
                        <div className="task-row out-task-row" key={i}>
                          <div className="task-num">Task {task.taskNumber}</div>
                          <div className="task-fields out-fields">
                            <div className="task-title-display">{task.title}</div>
                            <div className="out-grid">
                              <div className="input-group small">
                                <label>Status</label>
                                <select
                                  value={task.status}
                                  onChange={(e) => updateOutTask(i, "status", e.target.value)}
                                  disabled={todayTask.isOutSubmitted && !isEditingOUT}
                                >
                                  <option>Todo</option>
                                  <option>In Progress</option>
                                  <option>Done</option>
                                  <option>Incomplete</option>
                                </select>
                              </div>
                              <div className="input-group small">
                                <label>Act. Hours</label>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.5"
                                  value={task.actualHours}
                                  onChange={(e) =>
                                    updateOutTask(i, "actualHours", parseFloat(e.target.value))
                                  }
                                  disabled={todayTask.isOutSubmitted && !isEditingOUT}
                                />
                              </div>
                              <div className="input-group small">
                                <label>Act. %</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={task.actualPercent}
                                  onChange={(e) =>
                                    updateOutTask(i, "actualPercent", parseInt(e.target.value))
                                  }
                                  disabled={todayTask.isOutSubmitted && !isEditingOUT}
                                />
                              </div>
                              <div className="input-group small">
                                <label>Score</label>
                                <input
                                  type="text"
                                  placeholder="e.g. 10/10"
                                  value={task.score}
                                  onChange={(e) => updateOutTask(i, "score", e.target.value)}
                                  disabled={todayTask.isOutSubmitted && !isEditingOUT}
                                />
                              </div>
                              <div className="input-group wide">
                                <label>Impact</label>
                                <input
                                  type="text"
                                  placeholder="Describe the impact..."
                                  value={task.impact}
                                  onChange={(e) => updateOutTask(i, "impact", e.target.value)}
                                  disabled={todayTask.isOutSubmitted && !isEditingOUT}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="overall-row">
                      <div className="input-group small">
                        <label>Overall Hours</label>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={overallHours}
                          onChange={(e) => setOverallHours(parseFloat(e.target.value))}
                          disabled={todayTask.isOutSubmitted && !isEditingOUT}
                        />
                      </div>
                      <div className="input-group small">
                        <label>Overall Score</label>
                        <input
                          type="text"
                          placeholder="e.g. 8/10"
                          value={overallScore}
                          onChange={(e) => setOverallScore(e.target.value)}
                          disabled={todayTask.isOutSubmitted && !isEditingOUT}
                        />
                      </div>
                    </div>

                    {/* ✅ UPDATED form-actions */}
                    <div className="form-actions">
                      {isEditingOUT && (
                        <button
                          type="button"
                          className="cancel-edit-btn"
                          onClick={handleCancelEditOUT}
                        >
                          Cancel
                        </button>
                      )}
                      {/* Hide submit button if OUT already submitted and not editing */}
                      {(!todayTask.isOutSubmitted || isEditingOUT) && (
                        <button
                          type="submit"
                          className="submit-btn out-btn"
                          disabled={loading}
                        >
                          {loading
                            ? "Saving..."
                            : isEditingOUT
                            ? "Save Changes"
                            : "Submit OUT Update"}
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
              <div className="card">
                <p className="empty-msg">No past tasks found.</p>
              </div>
            ) : (
              pastTasks.map((task) => (
                <div className="history-card" key={task._id}>
                  {/* DATE HEADER */}
                  <div className="history-date-header">
                    <span className="history-date">📅 {task.date}</span>
                    <div className="history-badges">
                      <span className="history-location">{task.location}</span>
                      {task.dependency && (
                        <span className="history-dep">👤 {task.dependency}</span>
                      )}
                      {task.isOutSubmitted ? (
                        <span className="badge-done">✓ Complete</span>
                      ) : (
                        <span className="badge-pending">⏳ OUT Pending</span>
                      )}
                    </div>
                  </div>

                  {/* IN SECTION */}
                  <div className="history-section">
                    <div className="section-label in-label">
                      🌅 IN — {task.inTime || "—"}
                    </div>
                    <div className="section-meta">
                      {employee.firstName} IN – {task.location}
                      {task.dependency && ` | Dependency: ${task.dependency}`}
                    </div>
                    {task.tasks.map((t) => (
                      <div className="history-task-row" key={t.taskNumber}>
                        <span className="ht-num">Task {t.taskNumber}:</span>
                        <span className="ht-title">{t.title}</span>
                        <span className="ht-meta">
                          T-{t.targetPercent}% – {t.estimatedHours} hrs
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* OUT SECTION */}
                  {task.isOutSubmitted ? (
                    <div className="history-section out-section">
                      <div className="section-label out-label">
                        🌆 OUT — {task.outTime || "—"}
                      </div>
                      <div className="section-meta">
                        {employee.firstName} OUT – {task.location}
                        {task.dependency && ` | Dependency: ${task.dependency}`}
                        {" – "}{task.date}
                      </div>
                      {task.tasks.map((t) => (
                        <div className="history-task-row out-row" key={t.taskNumber}>
                          <span className="ht-num">Task {t.taskNumber}:</span>
                          <span className="ht-title">{t.title}</span>
                          <span
                            className={`status-pill ${t.status
                              .replace(/\s/g, "-")
                              .toLowerCase()}`}
                          >
                            {t.status}
                          </span>
                          <span className="ht-meta">
                            {t.estimatedHours}hrs / {t.actualHours}hrs
                            {" · "}{t.targetPercent}% / {t.actualPercent}%
                            {" · Score: "}{t.score}
                          </span>
                          {t.impact && (
                            <span className="ht-impact">[Impact: {t.impact}]</span>
                          )}
                        </div>
                      ))}
                      <div className="history-overall-bar">
                        <span>
                          ⏱ Overall Productivity:{" "}
                          <strong>{task.overallHours} hrs</strong>
                        </span>
                        <span>
                          ⭐ Overall Score: <strong>{task.overallScore}</strong>
                        </span>
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
      </div>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;