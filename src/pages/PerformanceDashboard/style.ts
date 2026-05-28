import styled from "styled-components";

export const PerformanceContainer = styled.div`
  padding: 24px;
  background: #f5f6fa;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;

  /* PAGE HEADER */
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;

    h1 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a1a2e;
      margin: 0 0 4px 0;
    }

    p {
      font-size: 0.85rem;
      color: #6b7280;
      margin: 0;
    }
  }

  .period-selector {
    display: flex;
    gap: 8px;
    background: #fff;
    padding: 4px;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  .period-btn {
    padding: 8px 18px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background: linear-gradient(135deg, #1a1a2e, #0f3460);
      color: #fff;
      font-weight: 600;
    }

    &:hover:not(.active) { background: #f3f4f6; }
  }

  /* STATS BAR */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;

    @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  }

  .stat-card {
    background: #fff;
    border-radius: 12px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  }

  .stat-num {
    font-size: 1.8rem;
    font-weight: 800;
    color: #1a1a2e;
  }

  .stat-label {
    font-size: 0.78rem;
    color: #9ca3af;
    font-weight: 500;
  }

  /* EMPLOYEE GRID */
  .employee-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  .emp-card {
    background: #fff;
    border-radius: 14px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
    border: 1px solid #eee;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      border-color: #007bff;
    }
  }

  .emp-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f3f4f6;
  }

  .emp-avatar {
    width: 46px;
    height: 46px;
    min-width: 46px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emp-info {
    h3 {
      font-size: 0.95rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 2px 0;
    }

    p {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0 0 4px 0;
    }
  }

  .dept-tag {
    font-size: 0.68rem;
    background: #f3f4f6;
    color: #6b7280;
    padding: 2px 8px;
    border-radius: 20px;
  }

  /* METRICS */
  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .metric-val {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
  }

  .metric-label {
    font-size: 0.7rem;
    color: #9ca3af;
    text-transform: uppercase;
  }

  .progress-bar {
    height: 5px;
    background: #f3f4f6;
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s ease;

    &.completion { background: linear-gradient(90deg, #1d4ed8, #3b82f6); }
    &.productivity { background: linear-gradient(90deg, #15803d, #22c55e); }
  }

  .metrics-row {
    display: flex;
    gap: 8px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .mini-stat {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    color: #6b7280;
    background: #f9fafb;
    padding: 4px 8px;
    border-radius: 6px;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .days-badge {
    font-size: 0.72rem;
    color: #6b7280;
    background: #f3f4f6;
    padding: 3px 8px;
    border-radius: 20px;
  }

  .analyze-btn {
    font-size: 0.78rem;
    color: #007bff;
    font-weight: 600;
  }

  .analyze-btn-disabled {
    font-size: 0.78rem;
    color: #9ca3af;
  }

  .no-data {
    text-align: center;
    padding: 16px 0;

    p {
      font-size: 0.82rem;
      color: #9ca3af;
      margin: 0 0 8px 0;
    }
  }

  /* LOADING */
  .loading-state, .empty-state {
    text-align: center;
    padding: 60px;
    color: #9ca3af;

    p { margin-top: 12px; font-size: 0.9rem; }
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #e5e7eb;
    border-top-color: #007bff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto;

    &.large {
      width: 52px;
      height: 52px;
      border-width: 4px;
    }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .detail-modal {
    background: #fff;
    border-radius: 18px;
    width: 100%;
    max-width: 820px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    gap: 16px;

    p {
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a2e;
      margin: 0;
    }

    span {
      font-size: 0.82rem;
      color: #9ca3af;
    }
  }

  /* DETAIL HEADER */
  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    flex-shrink: 0;
  }

  .detail-emp-info {
    display: flex;
    align-items: center;
    gap: 16px;

    h2 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 3px 0;
    }

    p {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 0 0 2px 0;
    }

    span {
      font-size: 0.72rem;
      color: #64748b;
    }
  }

  .detail-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .modal-close {
    background: rgba(255,255,255,0.1);
    border: none;
    color: #fff;
    font-size: 1rem;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    &:hover { background: rgba(255,255,255,0.2); }
  }

  /* DETAIL BODY */
  .detail-body {
    overflow-y: auto;
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* AI BANNER */
  .ai-banner {
    background: linear-gradient(135deg, #f0f7ff, #faf5ff);
    border: 1px solid #e0e7ff;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .ai-rating-block {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .ai-score {
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1;

    span {
      font-size: 1rem;
      font-weight: 500;
      color: #9ca3af;
    }
  }

  .ai-rating-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rating-label {
    font-size: 1rem;
    font-weight: 700;
  }

  .rec-badge {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
    text-align: center;
  }

  .ai-summary-text {
    flex: 1;

    p {
      font-size: 0.88rem;
      color: #374151;
      line-height: 1.6;
      margin: 8px 0 0 0;
    }
  }

  .groq-badge {
    font-size: 0.72rem;
    background: #7c3aed;
    color: #fff;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 600;
  }

  /* DETAIL METRICS */
  .detail-metrics {
    h4 {
      font-size: 0.9rem;
      font-weight: 700;
      color: #374151;
      margin: 0 0 12px 0;
    }
  }

  .metrics-detail-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
  }

  .metric-detail-card {
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &.blue { background: #dbeafe; }
    &.green { background: #dcfce7; }
    &.orange { background: #ffedd5; }
    &.purple { background: #f3e8ff; }
    &.gray { background: #f3f4f6; }
  }

  .mdc-val {
    font-size: 1.4rem;
    font-weight: 800;
    color: #111827;
  }

  .mdc-label {
    font-size: 0.72rem;
    color: #6b7280;
    font-weight: 500;
  }

  /* SALARY SECTION */
  .salary-section {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 12px;
    padding: 18px;

    h4 {
      font-size: 0.9rem;
      font-weight: 700;
      color: #92400e;
      margin: 0 0 10px 0;
    }

    p {
      font-size: 0.88rem;
      color: #78350f;
      line-height: 1.6;
      margin: 0;
    }
  }

  /* STRENGTHS & IMPROVEMENTS */
  .si-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  .strengths-box, .improvements-box {
    border-radius: 12px;
    padding: 16px;

    h4 {
      font-size: 0.88rem;
      font-weight: 700;
      margin: 0 0 10px 0;
    }

    ul {
      margin: 0;
      padding-left: 16px;

      li {
        font-size: 0.82rem;
        color: #374151;
        margin-bottom: 6px;
        line-height: 1.5;
      }
    }
  }

  .strengths-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    h4 { color: #15803d; }
  }

  .improvements-box {
    background: #fff7ed;
    border: 1px solid #fed7aa;
    h4 { color: #c2410c; }
  }

  /* TASK TIMELINE */
  .task-timeline {
    h4 {
      font-size: 0.9rem;
      font-weight: 700;
      color: #374151;
      margin: 0 0 12px 0;
    }
  }

  .timeline-entry {
    display: flex;
    gap: 16px;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f3f4f6;
    &:last-child { border-bottom: none; }
  }

  .timeline-date {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    min-width: 80px;
    padding-top: 2px;
  }

  .timeline-content {
    flex: 1;
  }

  .timeline-tasks {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .tl-task {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tl-task-num {
    font-size: 0.7rem;
    font-weight: 700;
    color: #007bff;
    min-width: 20px;
  }

  .tl-task-title {
    font-size: 0.82rem;
    color: #374151;
    flex: 1;
  }

  .tl-status {
    font-size: 0.68rem;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 20px;

    &.todo { background: #f3f4f6; color: #6b7280; }
    &.in-progress { background: #dbeafe; color: #1d4ed8; }
    &.done { background: #dcfce7; color: #15803d; }
    &.incomplete { background: #fee2e2; color: #b91c1c; }
  }

  .tl-score {
    font-size: 0.7rem;
    color: #9ca3af;
  }

  .timeline-footer {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 6px;
  }

  .pending-tag {
    background: #fff8e1;
    color: #f57f17;
    padding: 2px 7px;
    border-radius: 20px;
    font-size: 0.68rem;
    margin-left: 8px;
  }

  .no-data-msg {
    text-align: center;
    padding: 40px;
    color: #9ca3af;
    p { font-size: 0.9rem; }
  }
`;