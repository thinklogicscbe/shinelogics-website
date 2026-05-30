import React, { useCallback, useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ProductivityAdminContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

type Tab = "dashboard" | "companies" | "teams" | "attendance" | "tasks" | "grid" | "reports";

const emptyCompany = {
  name: "",
  code: "",
  industry: "",
  logoUrl: "",
  address: "",
  timezone: "Asia/Kolkata",
  workingHours: { start: "09:00", end: "18:00" },
  contactDetails: { email: "", phone: "", website: "" },
};

const emptyTeam = {
  companyId: "",
  name: "",
  description: "",
  department: "",
  leadId: "",
  type: "Delivery",
  members: [] as string[],
};

const emptyTask = {
  companyId: "",
  teamId: "",
  employeeId: "",
  employeeName: "",
  date: new Date().toLocaleDateString("en-GB").split("/").join("-"),
  title: "",
  shortDesc: "",
  plannedStart: "09:00",
  plannedEnd: "18:00",
  estimatedHours: 8,
  targetPercent: 100,
  priority: "Medium",
  dependency: "",
  businessImpact: "",
  status: "Planned",
};

const workflow = [
  "Draft",
  "Planned",
  "Started",
  "In Progress",
  "Paused",
  "Blocked",
  "Completed Local",
  "Ready For Testing",
  "Testing In Progress",
  "Test Passed",
  "Ready For Production",
  "Production Released",
  "Closed",
  "Reassigned",
  "Reopened",
];

const ProductivityAdmin: React.FC = () => {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [companies, setCompanies] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>({});
  const [ai, setAi] = useState<any>(null);
  const [companyForm, setCompanyForm] = useState<any>(emptyCompany);
  const [teamForm, setTeamForm] = useState<any>(emptyTeam);
  const [taskForm, setTaskForm] = useState<any>(emptyTask);
  const [editingCompany, setEditingCompany] = useState("");
  const [editingTeam, setEditingTeam] = useState("");
  const [editingTask, setEditingTask] = useState("");
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  const selectedCompanyId = companyForm.companyId || companies[0]?._id || "";

  const api = useCallback(async (path: string, options?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
      ...options,
    });
    return res.json();
  }, []);

  const loadAll = useCallback(async () => {
    const [companyRes, teamRes, empRes, attendanceRes, taskRes, dashRes, aiRes] =
      await Promise.all([
        api("/companies"),
        api("/teams"),
        api("/employees"),
        api("/attendance"),
        api("/productivity/tasks"),
        api("/productivity/dashboard"),
        api("/productivity/ai"),
      ]);
    setCompanies(companyRes.result?.companies || []);
    setTeams(teamRes.result?.teams || []);
    setEmployees(empRes.result?.users || []);
    setAttendance(attendanceRes.result?.attendance || []);
    setTasks(taskRes.result?.tasks || []);
    setDashboard(dashRes.result || {});
    setAi(aiRes.result || null);
  }, [api]);

  useEffect(() => {
    loadAll();
    const timer = window.setInterval(loadAll, 15000);
    return () => window.clearInterval(timer);
  }, [loadAll]);

  const saveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    await api(`/companies${editingCompany ? `/${editingCompany}` : ""}`, {
      method: editingCompany ? "PUT" : "POST",
      body: JSON.stringify(companyForm),
    });
    setCompanyForm(emptyCompany);
    setEditingCompany("");
    loadAll();
  };

  const saveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    await api(`/teams${editingTeam ? `/${editingTeam}` : ""}`, {
      method: editingTeam ? "PUT" : "POST",
      body: JSON.stringify(teamForm),
    });
    setTeamForm(emptyTeam);
    setEditingTeam("");
    loadAll();
  };

  const saveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const employee = employees.find((item) => item._id === taskForm.employeeId);
    await api(`/productivity/tasks${editingTask ? `/${editingTask}` : ""}`, {
      method: editingTask ? "PUT" : "POST",
      body: JSON.stringify({
        ...taskForm,
        employeeName: employee?.firstName || taskForm.employeeName,
        companyId: taskForm.companyId || employee?.companyId?._id || employee?.companyId,
      }),
    });
    setTaskForm(emptyTask);
    setEditingTask("");
    loadAll();
  };

  const updateTaskStatus = async (task: any, status: string) => {
    await api(`/productivity/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ ...task, status }),
    });
    loadAll();
  };

  const loadComments = async (taskId: string) => {
    const result = await api(`/productivity/comments/${taskId}`);
    setComments((current) => ({ ...current, [taskId]: result.result?.comments || [] }));
  };

  const addComment = async (task: any) => {
    const message = commentDrafts[task._id];
    if (!message?.trim()) return;
    await api(`/productivity/comments/${task._id}`, {
      method: "POST",
      body: JSON.stringify({
        companyId: task.companyId,
        employeeId: "admin",
        employeeName: "Admin",
        message,
      }),
    });
    setCommentDrafts((current) => ({ ...current, [task._id]: "" }));
    loadComments(task._id);
  };

  const exportCsv = () => {
    const rows = [
      ["Date", "Employee", "Task", "Status", "Estimated Hours", "Actual Hours", "Score"],
      ...tasks.map((task) => [
        task.date,
        task.employeeId?.firstName || task.employeeName,
        task.title,
        task.status,
        task.estimatedHours,
        task.actualHours,
        task.productivityScore,
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "productivity-report.csv";
    link.click();
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text("Productivity Report", 14, 14);
    autoTable(doc, {
      head: [["Date", "Employee", "Task", "Status", "Score"]],
      body: tasks.map((task) => [
        task.date,
        task.employeeId?.firstName || task.employeeName || "-",
        task.title,
        task.status,
        task.productivityScore,
      ]),
    });
    doc.save("productivity-report.pdf");
  };

  const employeesForCompany = useMemo(() => employees.filter((emp) => {
    if (!selectedCompanyId) return true;
    return (emp.companyId?._id || emp.companyId) === selectedCompanyId;
  }), [employees, selectedCompanyId]);

  return (
    <ProductivityAdminContainer>
      <div className="page-head">
        <div>
          <h1>Productivity Management</h1>
          <p className="muted">Companies, teams, attendance, task execution, realtime grid, AI insights, and reports.</p>
        </div>
        <button className="secondary" onClick={loadAll}>Refresh</button>
      </div>

      <div className="tabs">
        {(["dashboard", "companies", "teams", "attendance", "tasks", "grid", "reports"] as Tab[]).map((item) => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <>
          <div className="grid">
            <div className="stat"><span>Total Companies</span><strong>{dashboard.companies || 0}</strong></div>
            <div className="stat"><span>Total Teams</span><strong>{dashboard.teams || 0}</strong></div>
            <div className="stat"><span>Total Employees</span><strong>{dashboard.employees || 0}</strong></div>
            <div className="stat"><span>Today's Attendance</span><strong>{dashboard.todayAttendance || 0}</strong></div>
            <div className="stat"><span>Active Tasks</span><strong>{dashboard.activeTasks || 0}</strong></div>
            <div className="stat"><span>Completed Tasks</span><strong>{dashboard.completedTasks || 0}</strong></div>
            <div className="stat"><span>Blocked Tasks</span><strong>{dashboard.blockedTasks || 0}</strong></div>
            <div className="stat"><span>Productivity Score</span><strong>{dashboard.productivityScore || 0}%</strong></div>
          </div>
          <div className="panel">
            <h3>AI Insights</h3>
            {(ai?.insights || []).map((item: string) => <p key={item}>{item}</p>)}
          </div>
        </>
      )}

      {tab === "companies" && (
        <div className="panel">
          <h3>{editingCompany ? "Edit Company" : "Create Company"}</h3>
          <form onSubmit={saveCompany}>
            <div className="form-grid">
              <div><label>Company Name</label><input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} required /></div>
              <div><label>Company Code</label><input value={companyForm.code} onChange={(e) => setCompanyForm({ ...companyForm, code: e.target.value })} required /></div>
              <div><label>Industry</label><input value={companyForm.industry} onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })} /></div>
              <div><label>Logo URL</label><input value={companyForm.logoUrl} onChange={(e) => setCompanyForm({ ...companyForm, logoUrl: e.target.value })} /></div>
              <div><label>Contact Email</label><input value={companyForm.contactDetails.email} onChange={(e) => setCompanyForm({ ...companyForm, contactDetails: { ...companyForm.contactDetails, email: e.target.value } })} /></div>
              <div><label>Contact Phone</label><input value={companyForm.contactDetails.phone} onChange={(e) => setCompanyForm({ ...companyForm, contactDetails: { ...companyForm.contactDetails, phone: e.target.value } })} /></div>
              <div><label>Time Zone</label><input value={companyForm.timezone} onChange={(e) => setCompanyForm({ ...companyForm, timezone: e.target.value })} /></div>
              <div><label>Working Start</label><input type="time" value={companyForm.workingHours.start} onChange={(e) => setCompanyForm({ ...companyForm, workingHours: { ...companyForm.workingHours, start: e.target.value } })} /></div>
              <div><label>Working End</label><input type="time" value={companyForm.workingHours.end} onChange={(e) => setCompanyForm({ ...companyForm, workingHours: { ...companyForm.workingHours, end: e.target.value } })} /></div>
              <div><label>Address</label><textarea value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} /></div>
            </div>
            <div className="actions"><button className="primary">Save Company</button></div>
          </form>
          <div className="table-wrap"><table><thead><tr><th>Name</th><th>Code</th><th>Industry</th><th>Timezone</th><th>Actions</th></tr></thead><tbody>{companies.map((item) => <tr key={item._id}><td>{item.name}</td><td>{item.code}</td><td>{item.industry}</td><td>{item.timezone}</td><td><button className="secondary" onClick={() => { setCompanyForm(item); setEditingCompany(item._id); }}>Edit</button></td></tr>)}</tbody></table></div>
        </div>
      )}

      {tab === "teams" && (
        <div className="panel">
          <h3>{editingTeam ? "Edit Team" : "Create Team"}</h3>
          <form onSubmit={saveTeam}>
            <div className="form-grid">
              <div><label>Company</label><select value={teamForm.companyId} onChange={(e) => setTeamForm({ ...teamForm, companyId: e.target.value })}><option value="">Select</option>{companies.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
              <div><label>Team Name</label><input value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required /></div>
              <div><label>Department</label><input value={teamForm.department} onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })} /></div>
              <div><label>Team Lead</label><select value={teamForm.leadId} onChange={(e) => setTeamForm({ ...teamForm, leadId: e.target.value })}><option value="">Select</option>{employees.map((emp) => <option key={emp._id} value={emp._id}>{emp.firstName}</option>)}</select></div>
              <div><label>Team Type</label><input value={teamForm.type} onChange={(e) => setTeamForm({ ...teamForm, type: e.target.value })} /></div>
              <div><label>Description</label><textarea value={teamForm.description} onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })} /></div>
            </div>
            <div className="actions"><button className="primary">Add Team</button></div>
          </form>
          <div className="table-wrap"><table><thead><tr><th>Team</th><th>Company</th><th>Department</th><th>Lead</th><th>Type</th><th>Actions</th></tr></thead><tbody>{teams.map((item) => <tr key={item._id}><td>{item.name}</td><td>{companies.find((c) => c._id === item.companyId)?.name || "-"}</td><td>{item.department}</td><td>{item.leadId?.firstName || "-"}</td><td>{item.type}</td><td><button className="secondary" onClick={() => { setTeamForm({ ...item, leadId: item.leadId?._id || item.leadId }); setEditingTeam(item._id); }}>Edit</button></td></tr>)}</tbody></table></div>
        </div>
      )}

      {tab === "attendance" && (
        <div className="panel">
          <h3>Daily Attendance</h3>
          <div className="grid">
            <div className="stat"><span>Present</span><strong>{attendance.filter((a) => a.status === "Present").length}</strong></div>
            <div className="stat"><span>Late</span><strong>{attendance.filter((a) => a.status === "Late").length}</strong></div>
            <div className="stat"><span>On Leave</span><strong>{attendance.filter((a) => a.status === "On Leave").length}</strong></div>
            <div className="stat"><span>Absent</span><strong>{Math.max(0, employees.length - attendance.length)}</strong></div>
          </div>
          <div className="table-wrap"><table><thead><tr><th>Date</th><th>Employee</th><th>Mode</th><th>Login</th><th>Logout</th><th>Location</th><th>Status</th></tr></thead><tbody>{attendance.map((item) => <tr key={item._id}><td>{item.date}</td><td>{item.employeeId?.firstName || item.employeeName}</td><td>{item.workMode}</td><td>{item.loginTime}</td><td>{item.logoutTime || "-"}</td><td>{item.checkInLocation}</td><td><span className="pill">{item.status}</span></td></tr>)}</tbody></table></div>
        </div>
      )}

      {tab === "tasks" && (
        <div className="panel">
          <h3>{editingTask ? "Edit Productivity Task" : "Create Productivity Task"}</h3>
          <form onSubmit={saveTask}>
            <div className="form-grid">
              <div><label>Company</label><select value={taskForm.companyId} onChange={(e) => setTaskForm({ ...taskForm, companyId: e.target.value })}><option value="">Select</option>{companies.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
              <div><label>Team</label><select value={taskForm.teamId} onChange={(e) => setTaskForm({ ...taskForm, teamId: e.target.value })}><option value="">Select</option>{teams.map((team) => <option key={team._id} value={team._id}>{team.name}</option>)}</select></div>
              <div><label>Employee</label><select value={taskForm.employeeId} onChange={(e) => setTaskForm({ ...taskForm, employeeId: e.target.value })} required><option value="">Select</option>{employeesForCompany.map((emp) => <option key={emp._id} value={emp._id}>{emp.firstName}</option>)}</select></div>
              <div><label>Date</label><input value={taskForm.date} onChange={(e) => setTaskForm({ ...taskForm, date: e.target.value })} /></div>
              <div><label>Task Title</label><input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} required /></div>
              <div><label>Priority</label><select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}><option>High</option><option>Medium</option><option>Low</option></select></div>
              <div><label>Planned Start</label><input type="time" value={taskForm.plannedStart} onChange={(e) => setTaskForm({ ...taskForm, plannedStart: e.target.value })} /></div>
              <div><label>Planned End</label><input type="time" value={taskForm.plannedEnd} onChange={(e) => setTaskForm({ ...taskForm, plannedEnd: e.target.value })} /></div>
              <div><label>Estimated Hours</label><input type="number" value={taskForm.estimatedHours} onChange={(e) => setTaskForm({ ...taskForm, estimatedHours: Number(e.target.value) })} /></div>
              <div><label>Target %</label><input type="number" value={taskForm.targetPercent} onChange={(e) => setTaskForm({ ...taskForm, targetPercent: Number(e.target.value) })} /></div>
              <div><label>Status</label><select value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}>{workflow.map((status) => <option key={status}>{status}</option>)}</select></div>
              <div><label>Dependency</label><input value={taskForm.dependency} onChange={(e) => setTaskForm({ ...taskForm, dependency: e.target.value })} /></div>
              <div><label>Business Impact</label><textarea value={taskForm.businessImpact} onChange={(e) => setTaskForm({ ...taskForm, businessImpact: e.target.value })} /></div>
              <div><label>Short Description</label><textarea value={taskForm.shortDesc} onChange={(e) => setTaskForm({ ...taskForm, shortDesc: e.target.value })} /></div>
            </div>
            <div className="actions"><button className="primary">Save Plan</button></div>
          </form>
          <div className="table-wrap"><table><thead><tr><th>Date</th><th>Employee</th><th>Task</th><th>Planned</th><th>Status</th><th>Score</th><th>Actions</th></tr></thead><tbody>{tasks.map((task) => <tr key={task._id}><td>{task.date}</td><td>{task.employeeId?.firstName || task.employeeName}</td><td>{task.title}<br /><small>{task.dependency}</small></td><td>{task.estimatedHours}h / {task.targetPercent}%</td><td><select value={task.status} onChange={(e) => updateTaskStatus(task, e.target.value)}>{workflow.map((status) => <option key={status}>{status}</option>)}</select></td><td>{task.productivityScore}%</td><td><button className="secondary" onClick={() => { setTaskForm({ ...task, employeeId: task.employeeId?._id || task.employeeId, teamId: task.teamId?._id || task.teamId }); setEditingTask(task._id); }}>Edit</button></td></tr>)}</tbody></table></div>
        </div>
      )}

      {tab === "grid" && (
        <div className="panel">
          <h3>Chat Grid Task Entry</h3>
          <div className="chat-list">{tasks.map((task) => <div className="panel chat-card" key={task._id} onMouseEnter={() => loadComments(task._id)}>
            <strong>{task.date} [{task.plannedStart || "09:00"}]</strong>
            <p><b>{task.employeeId?.firstName || task.employeeName}</b> - {task.employeeId?.department || "-"} - Status: <span className={`pill ${task.status === "Blocked" ? "blocked" : task.status === "Closed" ? "done" : ""}`}>{task.status}</span></p>
            <p>Task: {task.title} | Planned Hours: {task.estimatedHours} | Target: {task.targetPercent}% | Dependency: {task.dependency || "-"}</p>
            <p>Impact: {task.businessImpact || "-"}</p>
            {(comments[task._id] || []).map((comment) => <p key={comment._id}><b>{comment.employeeName}:</b> {comment.message}</p>)}
            <div className="comment-box"><input placeholder="Reply, add note, mention @name" value={commentDrafts[task._id] || ""} onChange={(e) => setCommentDrafts({ ...commentDrafts, [task._id]: e.target.value })} /><button className="primary" onClick={() => addComment(task)}>Send</button></div>
          </div>)}</div>
        </div>
      )}

      {tab === "reports" && (
        <div className="panel">
          <h3>Reports</h3>
          <p className="muted">Employee attendance, task productivity, utilization, and delivery data can be exported.</p>
          <div className="actions"><button className="primary" onClick={exportCsv}>Export CSV / Excel</button><button className="secondary" onClick={exportPdf}>Export PDF</button></div>
          <div className="table-wrap"><table><thead><tr><th>Date</th><th>Employee</th><th>Task</th><th>Status</th><th>Estimated</th><th>Actual</th><th>Score</th></tr></thead><tbody>{tasks.map((task) => <tr key={task._id}><td>{task.date}</td><td>{task.employeeId?.firstName || task.employeeName}</td><td>{task.title}</td><td>{task.status}</td><td>{task.estimatedHours}</td><td>{task.actualHours}</td><td>{task.productivityScore}%</td></tr>)}</tbody></table></div>
        </div>
      )}
    </ProductivityAdminContainer>
  );
};

export default ProductivityAdmin;
