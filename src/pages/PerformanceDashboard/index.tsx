import React, { useState, useEffect, useCallback } from "react";
import { PerformanceContainer } from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

interface EmployeeSummary {
  employee: {
    id: string;
    firstName: string;
    email: string;
    designation: string;
    department: string;
    employeeCode: number;
  };
  metrics: {
    totalDays: number;
    outSubmittedDays: number;
    totalTasks: number;
    completedTasks: number;
    incompleteTasks: number;
    inProgressTasks: number;
    blockedTasks: number;
    todoTasks: number;
    totalEstimatedHours: string;
    totalActualHours: string;
    totalProductiveHours: string;
    totalBreakMins: number;
    completionRate: string;
    hoursEfficiency: string;
    avgScore: string;
    avgProductivityPercent: string;
    tasksWithDependency: number;
    avgTimeAccuracy: string;
    dominantWorkMode: string;
  } | null;
  taskCount: number;
}

interface AIAnalysis {
  overallRating: string;
  ratingScore: number;
  salaryJustification: string;
  strengths: string[];
  improvements: string[];
  aiSummary: string;
  recommendation: string;
  breakInsight?: string;
  timeTrackingQuality?: string;
}

interface DetailData {
  employee: any;
  metrics: any;
  aiAnalysis: AIAnalysis | null;
  tasks: any[];
  period: string;
  message?: string;
}

type Period = "daily" | "weekly" | "monthly";

// All status options from the employee dashboard
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  "Todo":                  { bg: "#f3f4f6", color: "#6b7280" },
  "Started":               { bg: "#ede9fe", color: "#5b21b6" },
  "In Progress":           { bg: "#dbeafe", color: "#1d4ed8" },
  "Paused":                { bg: "#fef9c3", color: "#854d0e" },
  "Blocked":               { bg: "#fee2e2", color: "#b91c1c" },
  "Completed Local":       { bg: "#dcfce7", color: "#15803d" },
  "Ready For Testing":     { bg: "#e0f2fe", color: "#0369a1" },
  "Testing In Progress":   { bg: "#dbeafe", color: "#1d4ed8" },
  "Test Passed":           { bg: "#dcfce7", color: "#15803d" },
  "Ready For Production":  { bg: "#fef3c7", color: "#92400e" },
  "Production Released":   { bg: "#dcfce7", color: "#14532d" },
  "Closed":                { bg: "#f3f4f6", color: "#374151" },
  "Done":                  { bg: "#dcfce7", color: "#15803d" },
  "Incomplete":            { bg: "#fee2e2", color: "#b91c1c" },
};

const WM_STYLE: Record<string, { bg: string; color: string }> = {
  "Office": { bg: "#E6F1FB", color: "#0C447C" },
  "Remote": { bg: "#EAF3DE", color: "#27500A" },
  "Hybrid": { bg: "#EEEDFE", color: "#3C3489" },
};

const PerformanceDashboard: React.FC = () => {
  const [period, setPeriod]       = useState<Period>("monthly");
  const [summaries, setSummaries] = useState<EmployeeSummary[]>([]);
  const [loading, setLoading]     = useState(false);
  const [periodLabel, setPeriodLabel] = useState("Last 30 Days");

  const [detailOpen, setDetailOpen]       = useState(false);
  const [detailData, setDetailData]       = useState<DetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res    = await fetch(`${BASE_URL}/performance/all?period=${period}`);
      const result = await res.json();
      if (result.success) {
        setSummaries(result.result?.summaries || []);
        setPeriodLabel(result.result?.period || "");
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [period]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const fetchDetail = async (empId: string) => {
    setDetailOpen(true);
    setDetailLoading(true);
    setDetailData(null);
    try {
      const res    = await fetch(`${BASE_URL}/performance/${empId}?period=${period}`);
      const result = await res.json();
      if (result.success) setDetailData(result.result);
    } catch (err) { console.error(err); }
    finally { setDetailLoading(false); }
  };

  const getRatingColor = (rating: string) => ({
    Excellent: "#15803d", Good: "#1d4ed8",
    Average: "#d97706", "Needs Improvement": "#b91c1c",
  }[rating] || "#6b7280");

  const getRecStyle = (rec: string) => ({
    Promote: { bg: "#dcfce7", color: "#15803d" },
    Retain:  { bg: "#dbeafe", color: "#1d4ed8" },
    Review:  { bg: "#fef9c3", color: "#854d0e" },
    Warning: { bg: "#fee2e2", color: "#b91c1c" },
  }[rec] || { bg: "#f3f4f6", color: "#6b7280" });

  const getScoreColor = (score: number) =>
    score >= 8 ? "#15803d" : score >= 6 ? "#1d4ed8" : score >= 4 ? "#d97706" : "#b91c1c";

  const fmtBreak = (mins: number) =>
    mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;

  return (
    <PerformanceContainer>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>AI Performance Monitor</h1>
          <p>Groq AI-powered employee performance analysis for {periodLabel}</p>
        </div>
        <div className="period-selector">
          {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
            <button key={p} className={`period-btn ${period === p ? "active" : ""}`}
              onClick={() => setPeriod(p)}>
              {p === "daily" ? "Today" : p === "weekly" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY STATS */}
      {!loading && summaries.length > 0 && (
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-num">{summaries.length}</span>
            <span className="stat-label">Total Employees</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">
              {summaries.filter(s => s.metrics && parseFloat(s.metrics.completionRate) >= 80).length}
            </span>
            <span className="stat-label">High Performers</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{summaries.filter(s => s.taskCount > 0).length}</span>
            <span className="stat-label">Active This Period</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{summaries.filter(s => !s.metrics || s.taskCount === 0).length}</span>
            <span className="stat-label">No Data</span>
          </div>
        </div>
      )}

      {/* EMPLOYEE GRID */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Calculating performance metrics...</p>
        </div>
      ) : summaries.length === 0 ? (
        <div className="empty-state"><p>No employees found.</p></div>
      ) : (
        <div className="employee-grid">
          {summaries.map((s) => (
            <div className="emp-card" key={s.employee.id}
              onClick={() => fetchDetail(s.employee.id)}>
              <div className="emp-card-header">
                <div className="emp-avatar">{s.employee.firstName.charAt(0).toUpperCase()}</div>
                <div className="emp-info">
                  <h3>{s.employee.firstName}</h3>
                  <p>{s.employee.designation || "—"}</p>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                    <span className="dept-tag">{s.employee.department || "—"}</span>
                    {s.metrics?.dominantWorkMode && (
                      <span className="wm-tag"
                        style={{
                          background: WM_STYLE[s.metrics.dominantWorkMode]?.bg,
                          color: WM_STYLE[s.metrics.dominantWorkMode]?.color,
                        }}>
                        {s.metrics.dominantWorkMode === "Office" ? "🏢"
                          : s.metrics.dominantWorkMode === "Remote" ? "🏠" : "🔀"}{" "}
                        {s.metrics.dominantWorkMode}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {s.metrics ? (
                <>
                  <div className="metrics-grid">
                    <div className="metric">
                      <span className="metric-val">{s.metrics.completionRate}%</span>
                      <span className="metric-label">Completion</span>
                      <div className="progress-bar">
                        <div className="progress-fill completion"
                          style={{ width: `${Math.min(parseFloat(s.metrics.completionRate), 100)}%` }} />
                      </div>
                    </div>
                    <div className="metric">
                      <span className="metric-val">{s.metrics.avgProductivityPercent}%</span>
                      <span className="metric-label">Productivity</span>
                      <div className="progress-bar">
                        <div className="progress-fill productivity"
                          style={{ width: `${Math.min(parseFloat(s.metrics.avgProductivityPercent), 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="metrics-row">
                    <div className="mini-stat">📋 {s.metrics.completedTasks}/{s.metrics.totalTasks} tasks</div>
                    <div className="mini-stat">⏱ {s.metrics.totalProductiveHours}h productive</div>
                    {s.metrics.totalBreakMins > 0 && (
                      <div className="mini-stat">☕ {fmtBreak(s.metrics.totalBreakMins)} break</div>
                    )}
                    <div className="mini-stat">⭐ Score: {s.metrics.avgScore}</div>
                    {s.metrics.blockedTasks > 0 && (
                      <div className="mini-stat blocked-stat">🚫 {s.metrics.blockedTasks} blocked</div>
                    )}
                  </div>

                  <div className="card-footer">
                    <span className="days-badge">{s.metrics.outSubmittedDays}/{s.metrics.totalDays} days complete</span>
                    <span className="analyze-btn">🤖 Analyze →</span>
                  </div>
                </>
              ) : (
                <div className="no-data">
                  <p>No tasks submitted for this period</p>
                  <span className="analyze-btn-disabled">No data to analyze</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* AI DETAIL MODAL */}
      {detailOpen && (
        <div className="modal-overlay" onClick={() => setDetailOpen(false)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            {detailLoading ? (
              <div className="modal-loading">
                <div className="spinner large" />
                <p>🤖 Groq AI is analyzing performance...</p>
                <span>This may take a few seconds</span>
              </div>
            ) : detailData ? (
              <>
                {/* MODAL HEADER */}
                <div className="detail-header">
                  <div className="detail-emp-info">
                    <div className="detail-avatar">
                      {detailData.employee.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2>{detailData.employee.firstName}</h2>
                      <p>{detailData.employee.designation || "—"} · {detailData.employee.department || "—"}</p>
                      <span>#{detailData.employee.employeeCode} · {detailData.period}</span>
                    </div>
                  </div>
                  <button className="modal-close" onClick={() => setDetailOpen(false)}>✕</button>
                </div>

                <div className="detail-body">
                  {detailData.message ? (
                    <div className="no-data-msg"><p>📭 {detailData.message}</p></div>
                  ) : (
                    <>
                      {/* AI RATING BANNER */}
                      {detailData.aiAnalysis && (
                        <div className="ai-banner">
                          <div className="ai-rating-block">
                            <div className="ai-score"
                              style={{ color: getScoreColor(detailData.aiAnalysis.ratingScore) }}>
                              {detailData.aiAnalysis.ratingScore}<span>/10</span>
                            </div>
                            <div className="ai-rating-info">
                              <span className="rating-label"
                                style={{ color: getRatingColor(detailData.aiAnalysis.overallRating) }}>
                                {detailData.aiAnalysis.overallRating}
                              </span>
                              <span className="rec-badge"
                                style={{
                                  background: getRecStyle(detailData.aiAnalysis.recommendation).bg,
                                  color: getRecStyle(detailData.aiAnalysis.recommendation).color,
                                }}>
                                {detailData.aiAnalysis.recommendation}
                              </span>
                            </div>
                          </div>
                          <div className="ai-summary-text">
                            <span className="groq-badge">🤖 Groq AI</span>
                            <p>{detailData.aiAnalysis.aiSummary}</p>
                          </div>
                        </div>
                      )}

                      {/* METRICS */}
                      {detailData.metrics && (
                        <div className="detail-metrics">
                          <h4>Performance Metrics</h4>
                          <div className="metrics-detail-grid">
                            <div className="metric-detail-card blue">
                              <span className="mdc-val">{detailData.metrics.completionRate}%</span>
                              <span className="mdc-label">Task Completion</span>
                            </div>
                            <div className="metric-detail-card green">
                              <span className="mdc-val">{detailData.metrics.avgProductivityPercent}%</span>
                              <span className="mdc-label">Avg Productivity</span>
                            </div>
                            <div className="metric-detail-card orange">
                              <span className="mdc-val">{detailData.metrics.totalProductiveHours}h</span>
                              <span className="mdc-label">Productive Hours</span>
                            </div>
                            <div className="metric-detail-card yellow">
                              <span className="mdc-val">{fmtBreak(detailData.metrics.totalBreakMins)}</span>
                              <span className="mdc-label">Total Break Time</span>
                            </div>
                            <div className="metric-detail-card purple">
                              <span className="mdc-val">{detailData.metrics.avgScore}/10</span>
                              <span className="mdc-label">Avg Score</span>
                            </div>
                            <div className="metric-detail-card gray">
                              <span className="mdc-val">{detailData.metrics.avgTimeAccuracy}%</span>
                              <span className="mdc-label">Time Accuracy</span>
                            </div>
                            <div className="metric-detail-card gray">
                              <span className="mdc-val">{detailData.metrics.completedTasks}/{detailData.metrics.totalTasks}</span>
                              <span className="mdc-label">Tasks Done</span>
                            </div>
                            <div className="metric-detail-card gray">
                              <span className="mdc-val">{detailData.metrics.outSubmittedDays}/{detailData.metrics.totalDays}</span>
                              <span className="mdc-label">Full Day Reports</span>
                            </div>
                            <div className="metric-detail-card gray">
                              <span className="mdc-val">{detailData.metrics.hoursEfficiency}%</span>
                              <span className="mdc-label">Hours Efficiency</span>
                            </div>
                          </div>

                          {/* Status breakdown */}
                          <div className="status-breakdown">
                            {[
                              { label: "Done/Closed", val: detailData.metrics.completedTasks, style: STATUS_COLORS["Done"] },
                              { label: "In Progress", val: detailData.metrics.inProgressTasks, style: STATUS_COLORS["In Progress"] },
                              { label: "Blocked/Paused", val: detailData.metrics.blockedTasks, style: STATUS_COLORS["Blocked"] },
                              { label: "Incomplete", val: detailData.metrics.incompleteTasks, style: STATUS_COLORS["Incomplete"] },
                              { label: "Todo", val: detailData.metrics.todoTasks, style: STATUS_COLORS["Todo"] },
                            ].filter(i => i.val > 0).map((item) => (
                              <span key={item.label} className="status-badge"
                                style={{ background: item.style.bg, color: item.style.color }}>
                                {item.label}: {item.val}
                              </span>
                            ))}
                          </div>

                          {/* Work mode & dependency info */}
                          <div className="extra-info-row">
                            <div className="extra-info-item">
                              <span className="ei-label">Dominant work mode</span>
                              <span className="ei-val" style={{
                                background: WM_STYLE[detailData.metrics.dominantWorkMode]?.bg,
                                color: WM_STYLE[detailData.metrics.dominantWorkMode]?.color,
                              }}>
                                {detailData.metrics.dominantWorkMode === "Office" ? "🏢 " : detailData.metrics.dominantWorkMode === "Remote" ? "🏠 " : "🔀 "}
                                {detailData.metrics.dominantWorkMode}
                              </span>
                            </div>
                            <div className="extra-info-item">
                              <span className="ei-label">Tasks with dependencies</span>
                              <span className="ei-val neutral">{detailData.metrics.tasksWithDependency} tasks</span>
                            </div>
                            <div className="extra-info-item">
                              <span className="ei-label">Tasks with time tracked</span>
                              <span className="ei-val neutral">{detailData.metrics.tasksWithActualTime} tasks</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SALARY JUSTIFICATION */}
                      {detailData.aiAnalysis && (
                        <div className="salary-section">
                          <h4>💰 Salary Justification</h4>
                          <p>{detailData.aiAnalysis.salaryJustification}</p>
                        </div>
                      )}

                      {/* BREAK & TIME TRACKING INSIGHTS */}
                      {detailData.aiAnalysis && (detailData.aiAnalysis.breakInsight || detailData.aiAnalysis.timeTrackingQuality) && (
                        <div className="insights-row">
                          {detailData.aiAnalysis.breakInsight && (
                            <div className="insight-card break-insight">
                              <span className="insight-icon">☕</span>
                              <div>
                                <span className="insight-label">Break Habits</span>
                                <p>{detailData.aiAnalysis.breakInsight}</p>
                              </div>
                            </div>
                          )}
                          {detailData.aiAnalysis.timeTrackingQuality && (
                            <div className="insight-card time-insight">
                              <span className="insight-icon">🕐</span>
                              <div>
                                <span className="insight-label">Time Tracking</span>
                                <p>{detailData.aiAnalysis.timeTrackingQuality}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* STRENGTHS & IMPROVEMENTS */}
                      {detailData.aiAnalysis && (
                        <div className="si-grid">
                          <div className="strengths-box">
                            <h4>✅ Strengths</h4>
                            <ul>{detailData.aiAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                          </div>
                          <div className="improvements-box">
                            <h4>📈 Areas to Improve</h4>
                            <ul>{detailData.aiAnalysis.improvements.map((im, i) => <li key={i}>{im}</li>)}</ul>
                          </div>
                        </div>
                      )}

                      {/* TASK TIMELINE */}
                      <div className="task-timeline">
                        <h4>📅 Task Timeline ({detailData.tasks.length} days)</h4>
                        {detailData.tasks.slice(0, 7).map((task: any) => (
                          <div className="timeline-entry" key={task._id}>
                            <div className="timeline-date-col">
                              <span className="timeline-date">{task.date}</span>
                              {task.workMode && (
                                <span className="timeline-wm"
                                  style={{
                                    background: WM_STYLE[task.workMode]?.bg,
                                    color: WM_STYLE[task.workMode]?.color,
                                  }}>
                                  {task.workMode}
                                </span>
                              )}
                            </div>
                            <div className="timeline-content">
                              <div className="timeline-tasks">
                                {task.tasks.map((t: any) => {
                                  const sc = STATUS_COLORS[t.status] || STATUS_COLORS["Todo"];
                                  const segs = (t.timeSegments || []).filter((s: any) => s.start && s.end);
                                  return (
                                    <div className="tl-task" key={t.taskNumber}>
                                      <span className="tl-task-num">T{t.taskNumber}</span>
                                      <span className="tl-task-title">{t.title}</span>
                                      {task.isOutSubmitted && (
                                        <>
                                          <span className="tl-status"
                                            style={{ background: sc.bg, color: sc.color }}>
                                            {t.status}
                                          </span>
                                          <span className="tl-score">Score: {t.score}</span>
                                        </>
                                      )}
                                      {segs.length > 0 && (
                                        <span className="tl-time">
                                          🕐 {segs.map((s: any) => `${s.start}–${s.end}`).join(", ")}
                                          {t.breakMinutes > 0 && ` ☕${t.breakMinutes}m`}
                                        </span>
                                      )}
                                      {t.dependency && (
                                        <span className="tl-dep">👤 {t.dependency}</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              {task.isOutSubmitted && (
                                <div className="timeline-footer">
                                  ⏱ {task.overallHours}h · ⭐ {task.overallScore}
                                  {task.dependency && <span className="tl-day-dep"> · 👤 {task.dependency}</span>}
                                </div>
                              )}
                              {!task.isOutSubmitted && (
                                <div className="timeline-footer pending">⏳ OUT pending</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </PerformanceContainer>
  );
};

export default PerformanceDashboard;