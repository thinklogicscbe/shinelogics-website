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
    totalEstimatedHours: string;
    totalActualHours: string;
    completionRate: string;
    hoursEfficiency: string;
    avgScore: string;
    avgProductivityPercent: string;
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

const PerformanceDashboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>("monthly");
  const [summaries, setSummaries] = useState<EmployeeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [periodLabel, setPeriodLabel] = useState("Last 30 Days");

  // Detail modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/performance/all?period=${period}`);
      const result = await res.json();
      if (result.success) {
        setSummaries(result.result?.summaries || []);
        setPeriodLabel(result.result?.period || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const fetchDetail = async (empId: string) => {
    setDetailOpen(true);
    setDetailLoading(true);
    setDetailData(null);
    try {
      const res = await fetch(`${BASE_URL}/performance/${empId}?period=${period}`);
      const result = await res.json();
      if (result.success) setDetailData(result.result);
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Excellent": return "#15803d";
      case "Good": return "#1d4ed8";
      case "Average": return "#d97706";
      case "Needs Improvement": return "#b91c1c";
      default: return "#6b7280";
    }
  };

  const getRecommendationStyle = (rec: string) => {
    switch (rec) {
      case "Promote": return { bg: "#dcfce7", color: "#15803d" };
      case "Retain": return { bg: "#dbeafe", color: "#1d4ed8" };
      case "Review": return { bg: "#fef9c3", color: "#854d0e" };
      case "Warning": return { bg: "#fee2e2", color: "#b91c1c" };
      default: return { bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "#15803d";
    if (score >= 6) return "#1d4ed8";
    if (score >= 4) return "#d97706";
    return "#b91c1c";
  };

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
            <button
              key={p}
              className={`period-btn ${period === p ? "active" : ""}`}
              onClick={() => setPeriod(p)}
            >
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
            <span className="stat-num">
              {summaries.filter(s => s.taskCount > 0).length}
            </span>
            <span className="stat-label">Active This Period</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">
              {summaries.filter(s => !s.metrics || s.taskCount === 0).length}
            </span>
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
        <div className="empty-state">
          <p>No employees found.</p>
        </div>
      ) : (
        <div className="employee-grid">
          {summaries.map((s) => (
            <div
              className="emp-card"
              key={s.employee.id}
              onClick={() => fetchDetail(s.employee.id)}
            >
              <div className="emp-card-header">
                <div className="emp-avatar">
                  {s.employee.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="emp-info">
                  <h3>{s.employee.firstName}</h3>
                  <p>{s.employee.designation || "—"}</p>
                  <span className="dept-tag">{s.employee.department || "—"}</span>
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
                    <div className="mini-stat">
                      <span>📋</span>
                      <span>{s.metrics.completedTasks}/{s.metrics.totalTasks} tasks</span>
                    </div>
                    <div className="mini-stat">
                      <span>⏱</span>
                      <span>{s.metrics.totalActualHours}h worked</span>
                    </div>
                    <div className="mini-stat">
                      <span>⭐</span>
                      <span>Score: {s.metrics.avgScore}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span className="days-badge">{s.metrics.outSubmittedDays} full days</span>
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
                    <div className="no-data-msg">
                      <p>📭 {detailData.message}</p>
                    </div>
                  ) : (
                    <>
                      {/* AI RATING BANNER */}
                      {detailData.aiAnalysis && (
                        <div className="ai-banner">
                          <div className="ai-rating-block">
                            <div className="ai-score"
                              style={{ color: getScoreColor(detailData.aiAnalysis.ratingScore) }}>
                              {detailData.aiAnalysis.ratingScore}
                              <span>/10</span>
                            </div>
                            <div className="ai-rating-info">
                              <span className="rating-label"
                                style={{ color: getRatingColor(detailData.aiAnalysis.overallRating) }}>
                                {detailData.aiAnalysis.overallRating}
                              </span>
                              <span className="rec-badge"
                                style={{
                                  background: getRecommendationStyle(detailData.aiAnalysis.recommendation).bg,
                                  color: getRecommendationStyle(detailData.aiAnalysis.recommendation).color
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
                              <span className="mdc-val">{detailData.metrics.totalActualHours}h</span>
                              <span className="mdc-label">Hours Worked</span>
                            </div>
                            <div className="metric-detail-card purple">
                              <span className="mdc-val">{detailData.metrics.avgScore}/10</span>
                              <span className="mdc-label">Avg Score</span>
                            </div>
                            <div className="metric-detail-card gray">
                              <span className="mdc-val">{detailData.metrics.completedTasks}/{detailData.metrics.totalTasks}</span>
                              <span className="mdc-label">Tasks Done</span>
                            </div>
                            <div className="metric-detail-card gray">
                              <span className="mdc-val">{detailData.metrics.outSubmittedDays}/{detailData.metrics.totalDays}</span>
                              <span className="mdc-label">Full Day Reports</span>
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

                      {/* STRENGTHS & IMPROVEMENTS */}
                      {detailData.aiAnalysis && (
                        <div className="si-grid">
                          <div className="strengths-box">
                            <h4>✅ Strengths</h4>
                            <ul>
                              {detailData.aiAnalysis.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="improvements-box">
                            <h4>📈 Areas to Improve</h4>
                            <ul>
                              {detailData.aiAnalysis.improvements.map((im, i) => (
                                <li key={i}>{im}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* TASK TIMELINE */}
                      <div className="task-timeline">
                        <h4>📅 Task Timeline ({detailData.tasks.length} days)</h4>
                        {detailData.tasks.slice(0, 7).map((task: any) => (
                          <div className="timeline-entry" key={task._id}>
                            <div className="timeline-date">{task.date}</div>
                            <div className="timeline-content">
                              <div className="timeline-tasks">
                                {task.tasks.map((t: any) => (
                                  <div className="tl-task" key={t.taskNumber}>
                                    <span className="tl-task-num">T{t.taskNumber}</span>
                                    <span className="tl-task-title">{t.title}</span>
                                    {task.isOutSubmitted && (
                                      <>
                                        <span className={`tl-status ${t.status.replace(/\s/g, "-").toLowerCase()}`}>
                                          {t.status}
                                        </span>
                                        <span className="tl-score">Score: {t.score}</span>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                              {task.isOutSubmitted && (
                                <div className="timeline-footer">
                                  ⏱ {task.overallHours}h · ⭐ {task.overallScore}
                                  {!task.isOutSubmitted && <span className="pending-tag">OUT Pending</span>}
                                </div>
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