import React, { useState, useEffect } from "react";
import { CreateEmployeeContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Employee {
  _id: string;
  firstName: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  mobileNumber?: string;
  role?: string;
  skillSet?: string[];
  location?: string;
  experience?: string;
  profilePhoto?: string;
  companyId?: any;
  teamIds?: any[];
  reportingManager?: any;
  status: number;
  createdAt: string;
  employeeCode?: number;
}

interface Company {
  _id: string;
  companyName: string;
  companyCode: string;
  industry: string;
  companyLogo?: string;
  companyAddress?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  contactDetails?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  timeZone?: string;
  workingHours?: {
    start?: string;
    end?: string;
    days?: string[];
  };
  isDeleted?: boolean;
}

interface Team {
  _id: string;
  teamName: string;
  department: string;
  teamType: string;
  teamDescription?: string;
  teamLead?: string;
  company?: any;
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

type ActiveTab = "company" | "team" | "member";

const ROLES = [
  "Admin", "Manager", "Team Lead", "Developer",
  "Tester", "Designer", "Marketing", "Sales", "Support",
];

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "Retail",
  "Manufacturing", "Real Estate", "Hospitality", "Logistics", "Media",
  "Consulting", "Construction", "Agriculture", "Other",
];

const TIMEZONES = [
  "Asia/Kolkata", "Asia/Dubai", "Asia/Singapore", "Asia/Tokyo",
  "Europe/London", "Europe/Berlin", "America/New_York",
  "America/Chicago", "America/Los_Angeles", "UTC",
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Default form state ───────────────────────────────────────────────────────

const defaultCompanyForm = {
  companyName: "",
  companyCode: "",
  industry: "",
  companyLogo: "",
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  email: "",
  phone: "",
  website: "",
  timeZone: "Asia/Kolkata",
  workStart: "09:00",
  workEnd: "18:00",
  workDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] as string[],
};

// ─── Component ────────────────────────────────────────────────────────────────

const CreateEmployee: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("company");

  // ── Company state ────────────────────────────────────────────────────────
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyForm, setCompanyForm] = useState({ ...defaultCompanyForm });
  const [companyEditId, setCompanyEditId] = useState<string | null>(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState("");
  const [companySuccess, setCompanySuccess] = useState("");
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);

  // ── Team state ───────────────────────────────────────────────────────────
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamForm, setTeamForm] = useState({
    teamName: "",
    department: "",
    teamType: "",
    company: "",
    teamDescription: "",
    teamLead: "",
  });
  const [teamEditId, setTeamEditId] = useState<string | null>(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState("");
  const [teamSuccess, setTeamSuccess] = useState("");
  const [deleteTeamId, setDeleteTeamId] = useState<string | null>(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  // ── Member state ─────────────────────────────────────────────────────────
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [firstName, setFirstName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [reportingManager, setReportingManager] = useState("");
  const [role, setRole] = useState("Developer");
  const [skillSet, setSkillSet] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [memberSearch, setMemberSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // ── Invite state ─────────────────────────────────────────────────────────
  const [inviteModal, setInviteModal] = useState<Employee | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMsg, setInviteMsg] = useState("");

  // ── Task modal state ─────────────────────────────────────────────────────
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeTasks, setEmployeeTasks] = useState<TaskDoc[]>([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [filterDate, setFilterDate] = useState("");

  // ── Fetch all ────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchCompanies();
    fetchTeams();
    fetchEmployees();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/company`);
      const data = await res.json();
      if (data.success) setCompanies(data.result?.companies || data.result || []);
    } catch (e) { console.error(e); }
  };

  const fetchTeams = async () => {
    try {
      const res = await fetch(`${BASE_URL}/teams`);
      const data = await res.json();
      if (data.success) setTeams(data.result?.teams || data.result || []);
    } catch (e) { console.error(e); }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${BASE_URL}/members`);
      const data = await res.json();
      if (data.success) setEmployees(data.result?.users || []);
    } catch (e) { console.error(e); }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // COMPANY HANDLERS
  // ════════════════════════════════════════════════════════════════════════════

  const setCompanyField = (key: keyof typeof companyForm, val: string | string[]) =>
    setCompanyForm(prev => ({ ...prev, [key]: val }));

  const toggleWorkDay = (day: string) => {
    setCompanyForm(prev => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter(d => d !== day)
        : [...prev.workDays, day],
    }));
  };

  const resetCompanyForm = () => {
    setCompanyForm({ ...defaultCompanyForm });
    setCompanyEditId(null);
    setCompanyError("");
    setCompanySuccess("");
  };

  // Build the API payload from flat form fields → nested schema
  const buildCompanyPayload = () => ({
    companyName: companyForm.companyName,
    companyCode: companyForm.companyCode,
    industry: companyForm.industry,
    companyLogo: companyForm.companyLogo,
    companyAddress: {
      street: companyForm.street,
      city: companyForm.city,
      state: companyForm.state,
      country: companyForm.country,
      zipCode: companyForm.zipCode,
    },
    contactDetails: {
      email: companyForm.email,
      phone: companyForm.phone,
      website: companyForm.website,
    },
    timeZone: companyForm.timeZone,
    workingHours: {
      start: companyForm.workStart,
      end: companyForm.workEnd,
      days: companyForm.workDays,
    },
  });

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyError(""); setCompanySuccess(""); setCompanyLoading(true);
    try {
      const url = companyEditId ? `${BASE_URL}/company/${companyEditId}` : `${BASE_URL}/company`;
      const method = companyEditId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildCompanyPayload()),
      });
      const data = await res.json();
      if (data.success) {
        setCompanySuccess(companyEditId ? "Company updated!" : "Company created!");
        fetchCompanies();
        setTimeout(resetCompanyForm, 1500);
      } else {
        setCompanyError(data.message || "Failed");
      }
    } catch { setCompanyError("Server error"); }
    finally { setCompanyLoading(false); }
  };

  const handleEditCompany = (c: Company) => {
    setCompanyEditId(c._id);
    setCompanyForm({
      companyName: c.companyName || "",
      companyCode: c.companyCode || "",
      industry: c.industry || "",
      companyLogo: c.companyLogo || "",
      street: c.companyAddress?.street || "",
      city: c.companyAddress?.city || "",
      state: c.companyAddress?.state || "",
      country: c.companyAddress?.country || "",
      zipCode: c.companyAddress?.zipCode || "",
      email: c.contactDetails?.email || "",
      phone: c.contactDetails?.phone || "",
      website: c.contactDetails?.website || "",
      timeZone: c.timeZone || "Asia/Kolkata",
      workStart: c.workingHours?.start || "09:00",
      workEnd: c.workingHours?.end || "18:00",
      workDays: c.workingHours?.days || ["Mon", "Tue", "Wed", "Thu", "Fri"],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/company/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { setDeleteCompanyId(null); fetchCompanies(); }
    } catch (e) { console.error(e); }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // TEAM HANDLERS
  // ════════════════════════════════════════════════════════════════════════════

  const setTeamField = (key: keyof typeof teamForm, val: string) =>
    setTeamForm(prev => ({ ...prev, [key]: val }));

  const resetTeamForm = () => {
    setTeamForm({
      teamName: "",
      department: "",
      teamType: "",
      company: "",
      teamDescription: "",
      teamLead: "",
    });

    setTeamEditId(null);
    setTeamError("");
    setTeamSuccess("");
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamError(""); setTeamSuccess(""); setTeamLoading(true);
    try {
      const url = teamEditId ? `${BASE_URL}/teams/${teamEditId}` : `${BASE_URL}/teams`;
      const method = teamEditId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamForm),
      });
      const data = await res.json();
      if (data.success) {
        setTeamSuccess(teamEditId ? "Team updated!" : "Team created!");
        fetchTeams();
        setTimeout(resetTeamForm, 1500);
      } else {
        setTeamError(data.message || "Failed");
      }
    } catch { setTeamError("Server error"); }
    finally { setTeamLoading(false); }
  };

  const handleEditTeam = (t: any) => {
    setTeamEditId(t._id);

    setTeamForm({
      teamName: t.teamName || "",
      department: t.department || "",
      teamType: t.teamType || "",
      company: t.company?._id || t.company || "",
      teamDescription: t.teamDescription || "",
      teamLead: t.teamLead || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/teams/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { setDeleteTeamId(null); fetchTeams(); }
    } catch (e) { console.error(e); }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // MEMBER HANDLERS
  // ════════════════════════════════════════════════════════════════════════════

  const handleEditClick = (emp: Employee) => {
    setEditMode(true); setEditId(emp._id);
    setFirstName(emp.firstName);
    setEmailId(emp.email);
    setPassword("");
    setDepartment(emp.department || "");
    setDesignation(emp.designation || "");
    setPhone(emp.mobileNumber || emp.phone || "");
    setCompanyId(emp.companyId?._id || emp.companyId || "");
    setTeamIds((emp.teamIds || []).map((t: any) => t._id || t));
    setReportingManager(emp.reportingManager?._id || emp.reportingManager || "");
    setRole(emp.role || "Developer");
    setSkillSet((emp.skillSet || []).join(", "));
    setLocation(emp.location || "");
    setExperience(emp.experience || "");
    setProfilePhoto(emp.profilePhoto || "");
    setErrorMessage(""); setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditMode(false); setEditId("");
    setFirstName(""); setEmailId(""); setPassword("");
    setDepartment(""); setDesignation(""); setPhone("");
    setCompanyId(""); setTeamIds([]); setReportingManager("");
    setRole("Developer"); setSkillSet(""); setLocation("");
    setExperience(""); setProfilePhoto("");
    setErrorMessage(""); setSuccessMessage("");
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/members/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Member removed successfully!");
        setDeleteConfirmId(null);
        fetchEmployees();
      } else {
        setErrorMessage(data.message || "Failed to remove member");
      }
    } catch { setErrorMessage("Server error. Please try again."); }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/members/status/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) fetchEmployees();
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("department", department);
      formData.append("designation", designation);
      formData.append("phone", phone);
      formData.append("mobileNumber", phone);
      formData.append("companyId", companyId);
      formData.append("reportingManager", reportingManager);
      formData.append("role", role);
      formData.append("skillSet", skillSet);
      formData.append("location", location);
      formData.append("experience", experience);

      teamIds.forEach((id) => {
        formData.append("teamIds", id);
      });

      if (profilePhotoFile) {
        formData.append("profilePhoto", profilePhotoFile);
      }

      if (editMode) {
        formData.append("email", emailId);

        if (password) {
          formData.append("password", password);
        }

        const res = await fetch(`${BASE_URL}/members/${editId}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          setSuccessMessage("Member updated successfully!");
          handleCancelEdit();
          fetchEmployees();
        } else {
          setErrorMessage(data.message || "Failed to update member");
        }
      } else {
        formData.append("emailId", emailId);
        formData.append("password", password);

        const res = await fetch(`${BASE_URL}/members/create`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          setSuccessMessage("Member added successfully!");

          setFirstName("");
          setEmailId("");
          setPassword("");
          setDepartment("");
          setDesignation("");
          setPhone("");
          setCompanyId("");
          setTeamIds([]);
          setReportingManager("");
          setRole("Developer");
          setSkillSet("");
          setLocation("");
          setExperience("");
          setProfilePhoto("");
          setProfilePhotoFile(null);

          fetchEmployees();
        } else {
          setErrorMessage(data.message || "Failed to add member");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Invite ───────────────────────────────────────────────────────────────

  const handleInvite = async () => {
    if (!inviteModal) return;
    setInviteLoading(true); setInviteMsg("");
    try {
      const res = await fetch(`${BASE_URL}/members/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: inviteModal._id }),
      });
      const data = await res.json();
      setInviteMsg(data.success
        ? `✓ Invite sent to ${inviteModal.email}`
        : data.message || "Failed to send invite"
      );
      if (data.success) setTimeout(() => { setInviteModal(null); setInviteMsg(""); }, 2000);
    } catch { setInviteMsg("Server error."); }
    finally { setInviteLoading(false); }
  };

  // ── Task modal ───────────────────────────────────────────────────────────

  const handleViewTasks = async (emp: Employee) => {
    setSelectedEmployee(emp); setTaskModalOpen(true);
    setTaskLoading(true); setFilterDate("");
    try {
      const res = await fetch(`${BASE_URL}/tasks/employee/${emp._id}`);
      const data = await res.json();
      if (data.success) setEmployeeTasks(data.result?.tasks || []);
    } catch (e) { console.error(e); }
    finally { setTaskLoading(false); }
  };

  const handleFilterDate = async () => {
    if (!selectedEmployee) return;
    setTaskLoading(true);
    try {
      const url = filterDate
        ? `${BASE_URL}/tasks/employee/${selectedEmployee._id}?date=${filterDate}`
        : `${BASE_URL}/tasks/employee/${selectedEmployee._id}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setEmployeeTasks(data.result?.tasks || []);
    } catch (e) { console.error(e); }
    finally { setTaskLoading(false); }
  };

  const filteredTasks = filterDate ? employeeTasks.filter(t => t.date === filterDate) : employeeTasks;
  const filteredMembers = employees.filter(emp => {
    const s = memberSearch.toLowerCase();
    const matchSearch = !s ||
      emp.firstName.toLowerCase().includes(s) ||
      emp.email.toLowerCase().includes(s) ||
      (emp.designation || "").toLowerCase().includes(s);
    const matchRole = !roleFilter || emp.role === roleFilter;
    return matchSearch && matchRole;
  });

  // ── Tab config ───────────────────────────────────────────────────────────

  const tabs: { key: ActiveTab; label: string; icon: string; count?: number }[] = [
    { key: "company", label: "Companies", icon: "🏢", count: companies.length },
    { key: "team", label: "Teams", icon: "👥", count: teams.length },
    { key: "member", label: "Members", icon: "👤", count: employees.length },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <CreateEmployeeContainer>

      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Setup</h1>
          <p className="page-subtitle">Create company → build team → add members</p>
        </div>
      </div>

      {/* ── STEP TABS ── */}
      <div className="step-tabs">
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            className={`step-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="step-num">{idx + 1}</span>
            <span className="step-icon">{tab.icon}</span>
            <span className="step-label">{tab.label}</span>
            {tab.count !== undefined && <span className="step-count">{tab.count}</span>}
          </button>
        ))}
        <div
          className="tab-indicator"
          style={{ transform: `translateX(${tabs.findIndex(t => t.key === activeTab) * 100}%)` }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1 — COMPANY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === "company" && (
        <>
          <div className="form-card">
            <div className="form-card-header">
              <div>
                <h2>{companyEditId ? "Edit Company" : "Create Company"}</h2>
                <p className="subtitle">
                  {companyEditId ? "Update company details" : "Register a new company to get started"}
                </p>
              </div>
              {companyEditId && (
                <button className="cancel-btn" onClick={resetCompanyForm}>Cancel</button>
              )}
            </div>

            <form onSubmit={handleCompanySubmit} autoComplete="off">

              {/* ── Identity ── */}
              <div className="section-label">Identity</div>
              <div className="form-grid col-3">
                <div className="input-group">
                  <label>Company Name <span className="required">*</span></label>
                  <input
                    type="text" placeholder="e.g. Acme Corp"
                    value={companyForm.companyName}
                    onChange={e => setCompanyField("companyName", e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Company Code <span className="required">*</span></label>
                  <input
                    type="text" placeholder="e.g. ACME001"
                    value={companyForm.companyCode}
                    onChange={e => setCompanyField("companyCode", e.target.value.toUpperCase())}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Industry <span className="required">*</span></label>
                  <select
                    value={companyForm.industry}
                    onChange={e => setCompanyField("industry", e.target.value)}
                    required
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="input-group span-3">
                  <label>Company Logo</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        // companyLogoFile state is not used in the JSON payload submission
                      }
                    }}
                  />

                  {companyForm.companyLogo && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={companyForm.companyLogo}
                        alt="Company Logo"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "8px"
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ── Contact ── */}
              <div className="section-label">Contact Details</div>
              <div className="form-grid col-3">
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email" placeholder="info@acme.com"
                    value={companyForm.email}
                    onChange={e => setCompanyField("email", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="text" placeholder="e.g. +91 98765 43210"
                    value={companyForm.phone}
                    onChange={e => setCompanyField("phone", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Website</label>
                  <input
                    type="text" placeholder="https://acme.com"
                    value={companyForm.website}
                    onChange={e => setCompanyField("website", e.target.value)}
                  />
                </div>
              </div>

              {/* ── Address ── */}
              <div className="section-label">Address</div>
              <div className="form-grid col-3">
                <div className="input-group span-2">
                  <label>Street</label>
                  <input
                    type="text" placeholder="123 Main Street"
                    value={companyForm.street}
                    onChange={e => setCompanyField("street", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>City</label>
                  <input
                    type="text" placeholder="Coimbatore"
                    value={companyForm.city}
                    onChange={e => setCompanyField("city", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <input
                    type="text" placeholder="Tamil Nadu"
                    value={companyForm.state}
                    onChange={e => setCompanyField("state", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Country</label>
                  <input
                    type="text" placeholder="India"
                    value={companyForm.country}
                    onChange={e => setCompanyField("country", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>ZIP / Pin Code</label>
                  <input
                    type="text" placeholder="641001"
                    value={companyForm.zipCode}
                    onChange={e => setCompanyField("zipCode", e.target.value)}
                  />
                </div>
              </div>

              {/* ── Working Hours ── */}
              <div className="section-label">Working Hours</div>
              <div className="form-grid col-3">
                <div className="input-group">
                  <label>Time Zone</label>
                  <select
                    value={companyForm.timeZone}
                    onChange={e => setCompanyField("timeZone", e.target.value)}
                  >
                    {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Start Time</label>
                  <input
                    type="time" value={companyForm.workStart}
                    onChange={e => setCompanyField("workStart", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>End Time</label>
                  <input
                    type="time" value={companyForm.workEnd}
                    onChange={e => setCompanyField("workEnd", e.target.value)}
                  />
                </div>
                <div className="input-group span-3">
                  <label>Working Days</label>
                  <div className="day-picker">
                    {WEEKDAYS.map(day => (
                      <button
                        key={day}
                        type="button"
                        className={`day-btn ${companyForm.workDays.includes(day) ? "selected" : ""}`}
                        onClick={() => toggleWorkDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {companyError && <p className="error-msg">⚠ {companyError}</p>}
              {companySuccess && <p className="success-msg">✓ {companySuccess}</p>}

              <div className="form-actions">
                <button type="submit" className="create-btn" disabled={companyLoading}>
                  {companyLoading ? "Saving..." : companyEditId ? "Update Company" : "+ Create Company"}
                </button>
                <button type="button" className="next-btn" onClick={() => setActiveTab("team")}>
                  Next: Create Team →
                </button>
              </div>
            </form>
          </div>

          {/* Companies Table */}
          <div className="table-card">
            <h3>All Companies <span className="count-pill">{companies.length}</span></h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company</th>
                    <th>Code</th>
                    <th>Industry</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>City</th>
                    <th>Timezone</th>
                    <th>Hours</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length === 0 ? (
                    <tr><td colSpan={11} className="empty-row">No companies yet. Create your first one above.</td></tr>
                  ) : companies.map((c, i) => (
                    <tr key={c._id}>
                      <td className="td-num">{i + 1}</td>
                      <td>
                        <div className="company-cell">
                          {c.companyLogo
                            ? <img src={c.companyLogo} alt={c.companyName} className="company-logo-img" />
                            : <div className="company-logo-placeholder">{c.companyName.charAt(0)}</div>
                          }
                          <span className="name-cell">{c.companyName}</span>
                        </div>
                      </td>
                      <td><span className="code-badge">{c.companyCode}</span></td>
                      <td><span className="industry-badge">{c.industry || "—"}</span></td>
                      <td>{c.contactDetails?.email || "—"}</td>
                      <td>{c.contactDetails?.phone || "—"}</td>
                      <td>
                        {c.contactDetails?.website
                          ? <a href={c.contactDetails.website} target="_blank" rel="noreferrer" className="link">{c.contactDetails.website}</a>
                          : "—"}
                      </td>
                      <td>{c.companyAddress?.city || "—"}</td>
                      <td><span className="tz-badge">{c.timeZone || "—"}</span></td>
                      <td>
                        {c.workingHours?.start && c.workingHours?.end
                          ? <span className="hours-badge">{c.workingHours.start} – {c.workingHours.end}</span>
                          : "—"}
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="edit-btn" onClick={() => handleEditCompany(c)} title="Edit">✏️</button>
                          {deleteCompanyId === c._id ? (
                            <div className="confirm-delete">
                              <span>Sure?</span>
                              <button className="confirm-yes" onClick={() => handleDeleteCompany(c._id)}>Yes</button>
                              <button className="confirm-no" onClick={() => setDeleteCompanyId(null)}>No</button>
                            </div>
                          ) : (
                            <button className="delete-btn" onClick={() => setDeleteCompanyId(c._id)} title="Delete">🗑️</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2 — TEAM
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === "team" && (
        <>
          <div className="form-card">
            <div className="form-card-header">
              <div>
                <h2>{teamEditId ? "Edit Team" : "Create Team"}</h2>
                <p className="subtitle">
                  {teamEditId ? "Update team details" : "Group your employees into teams"}
                </p>
              </div>
              {teamEditId && <button className="cancel-btn" onClick={resetTeamForm}>Cancel</button>}
            </div>

            <form onSubmit={handleTeamSubmit} autoComplete="off">
              <div className="form-grid col-3">
                <div className="input-group">
                  <label>Team Name <span className="required">*</span></label>
                  <input
                    type="text" placeholder="e.g. Frontend Team"
                    value={teamForm.teamName}
                    onChange={e => setTeamField("teamName", e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Company <span className="required">*</span></label>
                  <select
                    value={teamForm.company}
                    onChange={e => setTeamField("company", e.target.value)}
                    required
                  >
                    <option value="">Select company</option>
                    {companies.map(c => (
                      <option key={c._id} value={c._id}>{c.companyName}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <input
                    type="text" placeholder="Brief description..."
                    value={teamForm.teamDescription}
                    onChange={e => setTeamField("teamDescription", e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Department *</label>
                <input
                  type="text"
                  value={teamForm.department}
                  onChange={e => setTeamField("department", e.target.value)}
                  placeholder="Engineering"
                />
              </div>

              <div className="input-group">
                <label>Team Type *</label>
                <select
                  value={teamForm.teamType}
                  onChange={e => setTeamField("teamType", e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Product">Product</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {teamError && <p className="error-msg">⚠ {teamError}</p>}
              {teamSuccess && <p className="success-msg">✓ {teamSuccess}</p>}

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => setActiveTab("company")}>← Back</button>
                <button type="submit" className="create-btn" disabled={teamLoading}>
                  {teamLoading ? "Saving..." : teamEditId ? "Update Team" : "+ Create Team"}
                </button>
                <button type="button" className="next-btn" onClick={() => setActiveTab("member")}>
                  Next: Add Members →
                </button>
              </div>
            </form>
          </div>

          <div className="table-card">
            <h3>All Teams <span className="count-pill">{teams.length}</span></h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Team Name</th><th>Company</th><th>Description</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr><td colSpan={5} className="empty-row">No teams yet. Create your first one above.</td></tr>
                  ) : teams.map((t, i) => (
                    <tr key={t._id}>
                      <td className="td-num">{i + 1}</td>
                      <td><span className="name-cell">👥 {t.teamName}</span></td>
                      <td>{(t.company as any)?.companyName || "—"}</td>
                      <td>{t.teamDescription || "—"}</td>
                      <td>
                        <div className="action-btns">
                          <button className="edit-btn" onClick={() => handleEditTeam(t)} title="Edit">✏️</button>
                          {deleteTeamId === t._id ? (
                            <div className="confirm-delete">
                              <span>Sure?</span>
                              <button className="confirm-yes" onClick={() => handleDeleteTeam(t._id)}>Yes</button>
                              <button className="confirm-no" onClick={() => setDeleteTeamId(null)}>No</button>
                            </div>
                          ) : (
                            <button className="delete-btn" onClick={() => setDeleteTeamId(t._id)} title="Delete">🗑️</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3 — MEMBER
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === "member" && (
        <>
          <div className="form-card">
            <div className="form-card-header">
              <div>
                <h2>{editMode ? "Edit Member" : "Add Team Member"}</h2>
                <p className="subtitle">
                  {editMode ? "Update member profile" : "Add a new member and optionally send them an invite"}
                </p>
              </div>
              {editMode && <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>}
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="section-label">Identity</div>
              <div className="form-grid col-4">
                <div className="input-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input type="text" placeholder="Enter full name" value={firstName}
                    onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label>Email ID <span className="required">*</span></label>
                  <input type="email" placeholder="member@company.com" autoComplete="new-email"
                    value={emailId} onChange={e => setEmailId(e.target.value)} required={!editMode} />
                </div>
                <div className="input-group">
                  <label>
                    Password {editMode
                      ? <span className="optional">(leave blank to keep)</span>
                      : <span className="required">*</span>}
                  </label>
                  <input type="password"
                    placeholder={editMode ? "Leave blank to keep" : "Set a password"}
                    autoComplete="new-password" value={password}
                    onChange={e => setPassword(e.target.value)} required={!editMode} />
                </div>
                <div className="input-group">
                  <label>Mobile Number</label>
                  <input type="text" placeholder="e.g. 9876543210" value={phone}
                    onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="section-label">Role & Position</div>
              <div className="form-grid col-4">
                <div className="input-group">
                  <label>Designation</label>
                  <input type="text" placeholder="e.g. Senior Developer" value={designation}
                    onChange={e => setDesignation(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Department</label>
                  <input type="text" placeholder="e.g. Engineering" value={department}
                    onChange={e => setDepartment(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Role</label>
                  <select value={role} onChange={e => setRole(e.target.value)}>
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Reporting Manager</label>
                  <select value={reportingManager} onChange={e => setReportingManager(e.target.value)}>
                    <option value="">Select manager</option>
                    {employees.filter(e => e._id !== editId).map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.firstName} ({emp.role || "—"})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="section-label">Assignment</div>
              <div className="form-grid col-4">
                <div className="input-group">
                  <label>Company</label>
                  <select value={companyId} onChange={e => setCompanyId(e.target.value)}>
                    <option value="">Select company</option>
                    {companies.map(c => <option key={c._id} value={c._id}>{c.companyName}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Team</label>
                  <select value={teamIds[0] || ""} onChange={e => setTeamIds(e.target.value ? [e.target.value] : [])}>
                    <option value="">Select team</option>
                    {teams.map(t => <option key={t._id} value={t._id}>{t.teamName}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Coimbatore" value={location}
                    onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Experience</label>
                  <input type="text" placeholder="e.g. 3 years" value={experience}
                    onChange={e => setExperience(e.target.value)} />
                </div>
              </div>

              <div className="section-label">Additional Info</div>
              <div className="form-grid col-4">
                <div className="input-group span-2">
                  <label>Skill Set</label>
                  <input type="text" placeholder="React, Node.js, TypeScript (comma separated)"
                    value={skillSet} onChange={e => setSkillSet(e.target.value)} />
                </div>
                <div className="input-group span-2">
                  <label>Profile Photo</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setProfilePhotoFile(e.target.files[0]);
                      }
                    }}
                  />

                  {profilePhoto && (
                    <div className="image-preview">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginTop: "10px"
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {errorMessage && <p className="error-msg">⚠ {errorMessage}</p>}
              {successMessage && <p className="success-msg">✓ {successMessage}</p>}

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => setActiveTab("team")}>← Back</button>
                <button type="submit" className="create-btn" disabled={loading}>
                  {loading
                    ? (editMode ? "Updating..." : "Adding...")
                    : (editMode ? "Update Member" : "+ Add Member")}
                </button>
              </div>
            </form>
          </div>

          {/* Members Table */}
          <div className="table-card">
            <div className="table-toolbar">
              <h3>All Members <span className="count-pill">{filteredMembers.length}</span></h3>
              <div className="toolbar-right">
                <div className="search-box">
                  <span>🔍</span>
                  <input type="text" placeholder="Search name, email..."
                    value={memberSearch} onChange={e => setMemberSearch(e.target.value)} />
                  {memberSearch && <button onClick={() => setMemberSearch("")}>✕</button>}
                </div>
                <select className="filter-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                  <option value="">All Roles</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Member</th>
                    <th>Emp ID</th>
                    <th>Mobile</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Reporting Manager</th>
                    <th>Company</th>
                    <th>Team</th>
                    <th>Location</th>
                    <th>Experience</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Tasks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length === 0 ? (
                    <tr><td colSpan={16} className="empty-row">No members found</td></tr>
                  ) : filteredMembers.map((emp, i) => (
                    <tr key={emp._id}>
                      <td className="td-num">{i + 1}</td>
                      <td>
                        <div className="member-cell">
                          {emp.profilePhoto
                            ? <img src={emp.profilePhoto} alt={emp.firstName} className="member-avatar-img" />
                            : <div className="member-avatar">{emp.firstName.charAt(0).toUpperCase()}</div>
                          }
                          <div>
                            <div className="member-name">{emp.firstName}</div>
                            <div className="member-email">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{emp.employeeCode ? <span className="code-badge">#{emp.employeeCode}</span> : "—"}</td>
                      <td>{emp.mobileNumber || emp.phone || "—"}</td>
                      <td>{emp.designation || "—"}</td>
                      <td>{emp.department || "—"}</td>
                      <td>
                        {emp.role && (
                          <span className={`role-badge role-${emp.role.toLowerCase().replace(/\s/g, "-")}`}>
                            {emp.role}
                          </span>
                        )}
                      </td>
                      <td>{emp.reportingManager?.firstName || "—"}</td>
                      <td>{emp.companyId?.companyName || "—"}</td>
                      <td>{emp.teamIds?.map((t: any) => t.teamName || t).join(", ") || "—"}</td>
                      <td>{emp.location || "—"}</td>
                      <td>{emp.experience || "—"}</td>
                      <td>
                        <div className="skills-cell">
                          {(emp.skillSet || []).slice(0, 2).map(s => (
                            <span key={s} className="skill-chip">{s}</span>
                          ))}
                          {(emp.skillSet || []).length > 2 && (
                            <span className="skill-chip more">+{(emp.skillSet || []).length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${emp.status === 1 ? "active" : "inactive"}`}
                          onClick={() => handleToggleStatus(emp._id)}
                          title="Click to toggle status"
                        >
                          {emp.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button className="tasks-icon-btn" onClick={() => handleViewTasks(emp)} title="View Tasks">📋</button>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="invite-btn" onClick={() => setInviteModal(emp)} title="Invite">✉️</button>
                          <button className="edit-btn" onClick={() => handleEditClick(emp)} title="Edit">✏️</button>
                          {deleteConfirmId === emp._id ? (
                            <div className="confirm-delete">
                              <span>Remove?</span>
                              <button className="confirm-yes" onClick={() => handleDelete(emp._id)}>Yes</button>
                              <button className="confirm-no" onClick={() => setDeleteConfirmId(null)}>No</button>
                            </div>
                          ) : (
                            <button className="delete-btn" onClick={() => setDeleteConfirmId(emp._id)} title="Remove">🗑️</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          INVITE MODAL
      ══════════════════════════════════════════════════════════════ */}
      {inviteModal && (
        <div className="modal-overlay" onClick={() => { setInviteModal(null); setInviteMsg(""); }}>
          <div className="invite-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-avatar">{inviteModal.firstName.charAt(0).toUpperCase()}</span>
                <div>
                  <h3>Invite Member</h3>
                  <p>{inviteModal.designation || "Member"} · {inviteModal.department || "—"}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => { setInviteModal(null); setInviteMsg(""); }}>✕</button>
            </div>
            <div className="invite-modal-body">
              <p className="invite-desc">
                An invitation email with login credentials will be sent to<br />
                <strong>{inviteModal.email}</strong>
              </p>
              {inviteMsg && (
                <p className={inviteMsg.startsWith("✓") ? "success-msg" : "error-msg"}>{inviteMsg}</p>
              )}
              <div className="invite-actions">
                <button className="create-btn" onClick={handleInvite} disabled={inviteLoading}>
                  {inviteLoading ? "Sending..." : "✉ Send Invite"}
                </button>
                <button className="cancel-btn" onClick={() => { setInviteModal(null); setInviteMsg(""); }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TASK MODAL
      ══════════════════════════════════════════════════════════════ */}
      {taskModalOpen && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setTaskModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-avatar">{selectedEmployee.firstName.charAt(0).toUpperCase()}</span>
                <div>
                  <h3>{selectedEmployee.firstName}</h3>
                  <p>{selectedEmployee.designation || "Employee"} · {selectedEmployee.department || "—"}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setTaskModalOpen(false)}>✕</button>
            </div>
            <div className="modal-filter">
              <input
                type="text" placeholder="Filter by date (DD-MM-YYYY)"
                value={filterDate} onChange={e => setFilterDate(e.target.value)}
                className="filter-input"
              />
              <button className="filter-btn" onClick={handleFilterDate}>Filter</button>
              {filterDate && (
                <button className="clear-btn" onClick={() => { setFilterDate(""); handleViewTasks(selectedEmployee); }}>Clear</button>
              )}
              <span className="task-count">{filteredTasks.length} record(s)</span>
            </div>
            <div className="modal-body">
              {taskLoading ? (
                <p className="modal-loading">Loading tasks...</p>
              ) : filteredTasks.length === 0 ? (
                <p className="modal-empty">No tasks found for this employee.</p>
              ) : filteredTasks.map(task => (
                <div className="task-entry" key={task._id}>
                  <div className="task-entry-header">
                    <span className="task-date">📅 {task.date}</span>
                    <div className="task-entry-badges">
                      <span className="loc-badge">{task.location}</span>
                      {task.dependency && <span className="dep-badge">👤 {task.dependency}</span>}
                      {task.isOutSubmitted
                        ? <span className="complete-badge">✓ Complete</span>
                        : <span className="pending-badge">⏳ IN only</span>}
                    </div>
                  </div>

                  <div className="task-section in-section">
                    <div className="section-pill in-pill">🌅 IN — {task.inTime || "—"}</div>
                    <div className="section-meta-text">
                      {selectedEmployee.firstName} IN – {task.location}
                      {task.dependency && ` | Dependency: ${task.dependency}`}
                    </div>
                    {task.tasks.map(t => (
                      <div className="task-line" key={t.taskNumber}>
                        <span className="tl-num">Task {t.taskNumber}:</span>
                        <span className="tl-title">{t.title}</span>
                        <span className="tl-meta">T-{t.targetPercent}% · {t.estimatedHours} hrs</span>
                      </div>
                    ))}
                  </div>

                  {task.isOutSubmitted ? (
                    <div className="task-section out-section">
                      <div className="section-pill out-pill">🌆 OUT — {task.outTime || "—"}</div>
                      <div className="section-meta-text">
                        {selectedEmployee.firstName} OUT – {task.location}
                        {task.dependency && ` | Dependency: ${task.dependency}`} – {task.date}
                      </div>
                      {task.tasks.map(t => (
                        <div className="task-line" key={t.taskNumber}>
                          <span className="tl-num">Task {t.taskNumber}:</span>
                          <span className="tl-title">{t.title}</span>
                          <span className={`status-tag ${t.status.replace(/\s/g, "-").toLowerCase()}`}>{t.status}</span>
                          <span className="tl-meta">
                            {t.estimatedHours}h / {t.actualHours}h · {t.targetPercent}% / {t.actualPercent}% · Score: {t.score}
                          </span>
                          {t.impact && <span className="tl-impact">[{t.impact}]</span>}
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
              ))}
            </div>
          </div>
        </div>
      )}
    </CreateEmployeeContainer>
  );
};

export default CreateEmployee;