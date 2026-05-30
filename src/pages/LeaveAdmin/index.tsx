import React, { useState, useEffect } from "react";
import { LeaveAdminContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

interface Employee {
  _id: string;
  firstName: string;
  email: string;
  designation: string;
  department: string;
  employeeCode: number;
  phone: string;
}

interface Leave {
  _id: string;
  employeeId: Employee;
  leaveType: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason: string;
  appliedAt: string;
  reviewedAt: string;
}

const LeaveAdmin: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState({ text: "", type: "" });

  // Rejection modal
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectingLeaveId, setRejectingLeaveId] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);

  // Detail modal
  const [detailModal, setDetailModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

  useEffect(() => { fetchLeaves(); }, [filterStatus]);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const url = filterStatus === "all"
        ? `${BASE_URL}/leaves/all`
        : `${BASE_URL}/leaves/all?status=${filterStatus}`;
      const res = await fetch(url);
      const result = await res.json();
      if (result.success) setLeaves(result.result?.leaves || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/leaves/approve/${id}`, { method: "PATCH" });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: "✅ Leave approved!", type: "success" });
        fetchLeaves();
        setDetailModal(false);
      }
    } catch { setMessage({ text: "Server error", type: "error" }); }
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) return;
    setRejectLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/leaves/reject/${rejectingLeaveId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: "Leave rejected with reason.", type: "success" });
        setRejectModal(false);
        setRejectionReason("");
        setRejectingLeaveId("");
        fetchLeaves();
        setDetailModal(false);
      }
    } catch { setMessage({ text: "Server error", type: "error" }); }
    finally { setRejectLoading(false); }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved": return { bg: "#dcfce7", color: "#15803d" };
      case "Rejected": return { bg: "#fee2e2", color: "#b91c1c" };
      default: return { bg: "#fef9c3", color: "#854d0e" };
    }
  };

  const pendingCount = leaves.filter(l => l.status === "Pending").length;

  return (
    <LeaveAdminContainer>
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>🏖️ Leave Management</h1>
          <p>Review and manage employee leave requests</p>
        </div>
        {pendingCount > 0 && (
          <div className="pending-alert">
            ⏳ {pendingCount} pending request{pendingCount > 1 ? "s" : ""} awaiting review
          </div>
        )}
      </div>

      {message.text && (
        <p className={message.type === "success" ? "success-msg" : "error-msg"}>
          {message.text}
        </p>
      )}

      {/* FILTER TABS */}
      <div className="filter-tabs">
        {["all", "Pending", "Approved", "Rejected"].map((s) => (
          <button
            key={s}
            className={`filter-tab ${filterStatus === s ? "active" : ""}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === "all" ? "All Requests" : s}
            {s === "Pending" && pendingCount > 0 && (
              <span className="badge">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* LEAVE LIST */}
      {loading ? (
        <div className="loading">Loading leave requests...</div>
      ) : leaves.length === 0 ? (
        <div className="empty">No leave requests found.</div>
      ) : (
        <div className="leave-list">
          {leaves.map((leave) => {
            const style = getStatusStyle(leave.status);
            return (
              <div className="leave-card" key={leave._id}>
                {/* LEFT — Employee Info */}
                <div className="leave-emp">
                  <div className="emp-avatar">
                    {leave.employeeId?.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="emp-info">
                    <h3>{leave.employeeId?.firstName}</h3>
                    <p>{leave.employeeId?.designation || "—"} · {leave.employeeId?.department || "—"}</p>
                    <span>#{leave.employeeId?.employeeCode}</span>
                  </div>
                </div>

                {/* MIDDLE — Leave Details */}
                <div className="leave-details">
                  <div className="leave-type-badge">{leave.leaveType}</div>
                  <div className="leave-dates">
                    📅 {leave.fromDate} → {leave.toDate}
                    <span className="days-count">({leave.totalDays} day{leave.totalDays > 1 ? "s" : ""})</span>
                  </div>
                  <p className="leave-reason">"{leave.reason}"</p>
                  <span className="applied-at">
                    Applied: {leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString("en-IN") : "—"}
                  </span>
                </div>

                {/* RIGHT — Status & Actions */}
                <div className="leave-actions">
                  <span className="status-badge" style={{ background: style.bg, color: style.color }}>
                    {leave.status === "Pending" ? "⏳" : leave.status === "Approved" ? "✓" : "✗"} {leave.status}
                  </span>

                  {leave.status === "Rejected" && leave.rejectionReason && (
                    <p className="rejection-note">Reason: {leave.rejectionReason}</p>
                  )}

                  <div className="action-btns">
                    <button className="view-btn" onClick={() => { setSelectedLeave(leave); setDetailModal(true); }}>
                      👁 View
                    </button>
                    {leave.status === "Pending" && (
                      <>
                        <button className="approve-btn" onClick={() => handleApprove(leave._id)}>
                          ✓ Approve
                        </button>
                        <button className="reject-btn" onClick={() => {
                          setRejectingLeaveId(leave._id);
                          setRejectModal(true);
                        }}>
                          ✗ Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailModal && selectedLeave && (
        <div className="modal-overlay" onClick={() => setDetailModal(false)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-emp">
                <div className="modal-avatar">
                  {selectedLeave.employeeId?.firstName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3>{selectedLeave.employeeId?.firstName}</h3>
                  <p>{selectedLeave.employeeId?.designation} · {selectedLeave.employeeId?.department}</p>
                  <span>{selectedLeave.employeeId?.email}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setDetailModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Leave Type</span>
                  <span className="detail-value">{selectedLeave.leaveType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">From Date</span>
                  <span className="detail-value">{selectedLeave.fromDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">To Date</span>
                  <span className="detail-value">{selectedLeave.toDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Days</span>
                  <span className="detail-value">{selectedLeave.totalDays} day{selectedLeave.totalDays > 1 ? "s" : ""}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value">
                    <span className="status-badge" style={{
                      background: getStatusStyle(selectedLeave.status).bg,
                      color: getStatusStyle(selectedLeave.status).color
                    }}>
                      {selectedLeave.status}
                    </span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Applied On</span>
                  <span className="detail-value">
                    {selectedLeave.appliedAt ? new Date(selectedLeave.appliedAt).toLocaleDateString("en-IN") : "—"}
                  </span>
                </div>
              </div>

              <div className="reason-box">
                <span className="detail-label">Reason for Leave</span>
                <p>{selectedLeave.reason}</p>
              </div>

              {selectedLeave.status === "Rejected" && selectedLeave.rejectionReason && (
                <div className="rejection-box">
                  <span className="detail-label">Rejection Reason</span>
                  <p>{selectedLeave.rejectionReason}</p>
                </div>
              )}

              {selectedLeave.status === "Pending" && (
                <div className="modal-action-btns">
                  <button className="approve-btn large" onClick={() => handleApprove(selectedLeave._id)}>
                    ✓ Approve Leave
                  </button>
                  <button className="reject-btn large" onClick={() => {
                    setRejectingLeaveId(selectedLeave._id);
                    setDetailModal(false);
                    setRejectModal(true);
                  }}>
                    ✗ Reject Leave
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectModal && (
        <div className="modal-overlay" onClick={() => { setRejectModal(false); setRejectionReason(""); }}>
          <div className="reject-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reject-modal-header">
              <h3>✗ Reject Leave Request</h3>
              <button className="modal-close white" onClick={() => { setRejectModal(false); setRejectionReason(""); }}>✕</button>
            </div>
            <div className="reject-modal-body">
              <p>Please provide a reason for rejection. This will be visible to the employee.</p>
              <div className="input-group">
                <label>Rejection Reason <span className="required">*</span></label>
                <textarea
                  rows={4}
                  placeholder="e.g. Critical project deadline, team understaffed this week..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
              <div className="reject-actions">
                <button className="cancel-btn" onClick={() => { setRejectModal(false); setRejectionReason(""); }}>
                  Cancel
                </button>
                <button
                  className="confirm-reject-btn"
                  onClick={handleRejectSubmit}
                  disabled={!rejectionReason.trim() || rejectLoading}
                >
                  {rejectLoading ? "Rejecting..." : "Confirm Rejection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LeaveAdminContainer>
  );
};

export default LeaveAdmin;