import React, { useState, useEffect } from "react";
import { CreateEmployeeContainer } from "./style";

const BASE_URL = "http://localhost:5000/api";

interface Employee {
  _id: string;
  firstName: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  status: number;
  createdAt: string;
}

interface TaskItem {
  taskNumber: number;
  title: string;
  estimatedHours: number;
  actualHours: number;
  targetPercent: number;
  actualPercent: number;
  status: string;
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
  employeeName: string;
}

const CreateEmployee: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Task modal state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeTasks, setEmployeeTasks] = useState<TaskDoc[]>([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employees`);
      const result = await response.json();
      if (result.success) setEmployees(result.result?.users || []);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  // ✅ Open task modal and fetch tasks for that employee
  const handleViewTasks = async (emp: Employee) => {
    setSelectedEmployee(emp);
    setTaskModalOpen(true);
    setTaskLoading(true);
    setFilterDate("");
    try {
      const response = await fetch(`${BASE_URL}/tasks/employee/${emp._id}`);
      const result = await response.json();
      if (result.success) setEmployeeTasks(result.result?.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleFilterDate = async () => {
    if (!selectedEmployee) return;
    setTaskLoading(true);
    try {
      const url = filterDate
        ? `${BASE_URL}/tasks/employee/${selectedEmployee._id}?date=${filterDate}`
        : `${BASE_URL}/tasks/employee/${selectedEmployee._id}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) setEmployeeTasks(result.result?.tasks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleEditClick = (emp: Employee) => {
    setEditMode(true);
    setEditId(emp._id);
    setFirstName(emp.firstName);
    setEmailId(emp.email);
    setPassword("");
    setDepartment(emp.department || "");
    setDesignation(emp.designation || "");
    setPhone(emp.phone || "");
    setErrorMessage("");
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId("");
    setFirstName("");
    setEmailId("");
    setPassword("");
    setDepartment("");
    setDesignation("");
    setPhone("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Employee deleted successfully!");
        setDeleteConfirmId(null);
        fetchEmployees();
      } else {
        setErrorMessage(result.message || "Failed to delete employee");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/employees/status/${id}`, { method: "PATCH" });
      const result = await response.json();
      if (result.success) fetchEmployees();
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (editMode) {
        const body: any = { firstName, email: emailId, department, designation, phone };
        if (password) body.password = password;
        const response = await fetch(`${BASE_URL}/employees/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        if (result.success) {
          setSuccessMessage("Employee updated successfully!");
          handleCancelEdit();
          fetchEmployees();
        } else {
          setErrorMessage(result.message || "Failed to update employee");
        }
      } else {
        const response = await fetch(`${BASE_URL}/employees/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, emailId, password, department, designation, phone }),
        });
        const result = await response.json();
        if (result.success) {
          setSuccessMessage("Employee created successfully!");
          setFirstName(""); setEmailId(""); setPassword("");
          setDepartment(""); setDesignation(""); setPhone("");
          fetchEmployees();
        } else {
          setErrorMessage(result.message || "Failed to create employee");
        }
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = filterDate
    ? employeeTasks.filter((t) => t.date === filterDate)
    : employeeTasks;

  return (
    <CreateEmployeeContainer>
      {/* CREATE / EDIT FORM */}
      <div className="form-card">
        <h2>{editMode ? "Edit Employee" : "Create Employee"}</h2>
        <p className="subtitle">
          {editMode ? "Update the employee details below" : "Add login credentials for a new employee"}
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name <span className="required">*</span></label>
              <input type="text" placeholder="Enter employee name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Email Address <span className="required">*</span></label>
              <input type="email" placeholder="employee@company.com" autoComplete="new-email"
                value={emailId} onChange={(e) => setEmailId(e.target.value)} required={!editMode} />
            </div>
            <div className="input-group">
              <label>Password {editMode
                ? <span className="optional">(leave blank to keep same)</span>
                : <span className="required">*</span>}
              </label>
              <input type="password"
                placeholder={editMode ? "Leave blank to keep same" : "Set a password"}
                autoComplete="new-password" value={password}
                onChange={(e) => setPassword(e.target.value)} required={!editMode} />
            </div>
            <div className="input-group">
              <label>Department</label>
              <input type="text" placeholder="e.g. Engineering" value={department}
                onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Designation</label>
              <input type="text" placeholder="e.g. Software Developer" value={designation}
                onChange={(e) => setDesignation(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input type="text" placeholder="e.g. 9876543210" value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          {successMessage && <p className="success-msg">{successMessage}</p>}

          <div className="form-actions">
            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? (editMode ? "Updating..." : "Creating...") : (editMode ? "Update Employee" : "+ Create Employee")}
            </button>
            {editMode && (
              <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* EMPLOYEES TABLE */}
      <div className="table-card">
        <h3>All Employees ({employees.length})</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr><td colSpan={10} className="empty-row">No employees found</td></tr>
              ) : (
                employees.map((emp, i) => (
                  <tr key={emp._id}>
                    <td>{i + 1}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department || "-"}</td>
                    <td>{emp.designation || "-"}</td>
                    <td>{emp.phone || "-"}</td>
                    <td>
                      <span
                        className={`badge ${emp.status === 1 ? "active" : "inactive"}`}
                        onClick={() => handleToggleStatus(emp._id)}
                        title="Click to toggle status"
                      >
                        {emp.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : "-"}</td>
                    <td>
                      {/* ✅ TASKS ICON */}
                      <button
                        className="tasks-icon-btn"
                        onClick={() => handleViewTasks(emp)}
                        title="View Tasks"
                      >
                        📋
                      </button>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="edit-btn" onClick={() => handleEditClick(emp)} title="Edit">✏️</button>
                        {deleteConfirmId === emp._id ? (
                          <div className="confirm-delete">
                            <span>Sure?</span>
                            <button className="confirm-yes" onClick={() => handleDelete(emp._id)}>Yes</button>
                            <button className="confirm-no" onClick={() => setDeleteConfirmId(null)}>No</button>
                          </div>
                        ) : (
                          <button className="delete-btn" onClick={() => setDeleteConfirmId(emp._id)} title="Delete">🗑️</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ TASK MODAL */}
      {taskModalOpen && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setTaskModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* MODAL HEADER */}
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-avatar">
                  {selectedEmployee.firstName.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h3>{selectedEmployee.firstName}</h3>
                  <p>{selectedEmployee.designation || "Employee"} · {selectedEmployee.department || "—"}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setTaskModalOpen(false)}>✕</button>
            </div>

            {/* DATE FILTER */}
            <div className="modal-filter">
              <input
                type="text"
                placeholder="Filter by date (DD-MM-YYYY)"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="filter-input"
              />
              <button className="filter-btn" onClick={handleFilterDate}>Filter</button>
              {filterDate && (
                <button className="clear-btn" onClick={() => {
                  setFilterDate("");
                  handleViewTasks(selectedEmployee);
                }}>Clear</button>
              )}
              <span className="task-count">{filteredTasks.length} record(s)</span>
            </div>

            {/* TASK LIST */}
            <div className="modal-body">
              {taskLoading ? (
                <p className="modal-loading">Loading tasks...</p>
              ) : filteredTasks.length === 0 ? (
                <p className="modal-empty">No tasks found for this employee.</p>
              ) : (
                filteredTasks.map((task) => (
                  <div className="task-entry" key={task._id}>
                    {/* DATE HEADER */}
                    <div className="task-entry-header">
                      <span className="task-date">📅 {task.date}</span>
                      <div className="task-entry-badges">
                        <span className="loc-badge">{task.location}</span>
                        {task.dependency && <span className="dep-badge">👤 {task.dependency}</span>}
                        {task.isOutSubmitted
                          ? <span className="complete-badge">✓ Complete</span>
                          : <span className="pending-badge">⏳ IN only</span>
                        }
                      </div>
                    </div>

                    {/* IN SECTION */}
                    <div className="task-section in-section">
                      <div className="section-pill in-pill">🌅 IN — {task.inTime || "—"}</div>
                      <div className="section-meta-text">
                        {selectedEmployee.firstName} IN – {task.location}
                        {task.dependency && ` | Dependency: ${task.dependency}`}
                      </div>
                      {task.tasks.map((t) => (
                        <div className="task-line" key={t.taskNumber}>
                          <span className="tl-num">Task {t.taskNumber}:</span>
                          <span className="tl-title">{t.title}</span>
                          <span className="tl-meta">T-{t.targetPercent}% · {t.estimatedHours} hrs</span>
                        </div>
                      ))}
                    </div>

                    {/* OUT SECTION */}
                    {task.isOutSubmitted ? (
                      <div className="task-section out-section">
                        <div className="section-pill out-pill">🌆 OUT — {task.outTime || "—"}</div>
                        <div className="section-meta-text">
                          {selectedEmployee.firstName} OUT – {task.location}
                          {task.dependency && ` | Dependency: ${task.dependency}`}
                          {" – "}{task.date}
                        </div>
                        {task.tasks.map((t) => (
                          <div className="task-line" key={t.taskNumber}>
                            <span className="tl-num">Task {t.taskNumber}:</span>
                            <span className="tl-title">{t.title}</span>
                            <span className={`status-tag ${t.status.replace(/\s/g, "-").toLowerCase()}`}>
                              {t.status}
                            </span>
                            <span className="tl-meta">
                              {t.estimatedHours}h / {t.actualHours}h · {t.targetPercent}% / {t.actualPercent}% · Score: {t.score}
                            </span>
                            {t.impact && (
                              <span className="tl-impact">[{t.impact}]</span>
                            )}
                          </div>
                        ))}
                        <div className="overall-summary">
                          <span>⏱ Total: <strong>{task.overallHours} hrs</strong></span>
                          <span>⭐ Score: <strong>{task.overallScore}</strong></span>
                        </div>
                      </div>
                    ) : (
                      <div className="task-section out-pending">
                        <div className="section-pill out-pill">🌆 OUT — Pending</div>
                        <p className="pending-text">Evening update not yet submitted.</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </CreateEmployeeContainer>
  );
};

export default CreateEmployee;