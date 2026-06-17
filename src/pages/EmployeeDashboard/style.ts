import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;

  /* ── HEADER ── */
  .header {
    background: #fff;
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-logo {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a1a2e;
    span { color: #007bff; }
  }

  .logout-btn {
    padding: 7px 20px;
    background: transparent;
    border: 1.5px solid #e53935;
    color: #e53935;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #e53935; color: #fff; }
  }

  /* ── MAIN ── */
  .main {
    padding: 24px 32px;
    max-width: 1100px;
    margin: 0 auto;
    @media (max-width: 768px) { padding: 16px; }
  }

  /* ── PROFILE BAR ── */
  .profile-bar {
    background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
    box-shadow: 0 4px 16px rgba(15,52,96,0.25);
    flex-wrap: wrap;
  }

  .avatar {
    width: 52px;
    height: 52px;
    min-width: 52px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    flex: 1;
  }

  .profile-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 16px;
  }

  .label {
    font-size: 0.68rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 0.88rem;
    color: #fff;
    font-weight: 500;
  }

  .divider {
    width: 1px;
    height: 32px;
    background: rgba(255,255,255,0.1);
    flex-shrink: 0;
    @media (max-width: 768px) { display: none; }
  }

  /* ── TABS ── */
  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .tab {
    padding: 9px 22px;
    border: 1.5px solid #ddd;
    background: #fff;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    color: #666;
    transition: all 0.2s;

    &.active {
      background: #007bff;
      border-color: #007bff;
      color: #fff;
      font-weight: 600;
    }
    &:hover:not(.active) {
      border-color: #007bff;
      color: #007bff;
    }
  }

  .team-wall-tab {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    border-color: #7c3aed !important;
    color: #fff !important;
    font-weight: 600;

    &:hover {
      background: linear-gradient(135deg, #6d28d9, #5b21b6) !important;
      border-color: #6d28d9 !important;
      color: #fff !important;
      opacity: 0.95;
    }
  }

  .private-chat-tab {
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    border-color: #0ea5e9 !important;
    color: #fff !important;
    font-weight: 600;

    &:hover {
      background: linear-gradient(135deg, #0284c7, #0369a1) !important;
      border-color: #0284c7 !important;
      color: #fff !important;
      opacity: 0.95;
    }
  }

  /* ── MESSAGES ── */
  .success-msg {
    background: #e8f5e9;
    color: #2e7d32;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 16px;
    border-left: 3px solid #2e7d32;
  }

  .error-msg {
    background: #ffebee;
    color: #c62828;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 16px;
    border-left: 3px solid #c62828;
  }

  /* ── CARD ── */
  .card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f0f0f0;
  }

  .tag {
    font-size: 0.95rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 6px;
  }

  .in-tag  { background: #e3f2fd; color: #1565c0; }
  .out-tag { background: #fff3e0; color: #e65100; }

  .submitted-badge {
    font-size: 0.8rem;
    color: #2e7d32;
    background: #e8f5e9;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 600;
  }

  .date-tag {
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }

  /* ── META ROW ── */
  .meta-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  /* ── INPUT GROUP ── */
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    input, select, textarea {
      padding: 9px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
      width: 100%;

      &:focus { border-color: #007bff; }
      &::placeholder { color: #bbb; }

      &:disabled {
        background: #f5f5f5;
        color: #999;
        cursor: not-allowed;
        border-color: #eee;
      }
    }

    &.wide  { flex: 3; min-width: 200px; }
    &.small { flex: 1; min-width: 80px; }
  }

  /* ── SECTION LABEL ── */
  .section-label {
    font-size: 0.82rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 10px;
  }

  /* ── TASK FORM HINT ── */
  .task-form-hint {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 20px;
    font-size: 0.85rem;
    color: #92400e;
    line-height: 1.5;
  }

  /* ── TASK ROW ── */
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  }

  .task-row {
    background: #f9fafb;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 16px;
  }

  .task-num {
    font-size: 0.78rem;
    font-weight: 700;
    color: #007bff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .task-num-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .task-fields {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .remove-task-btn {
    padding: 4px 10px;
    background: #ffebee;
    color: #c62828;
    border: none;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { background: #e53935; color: #fff; }
  }

  /* ── FORM ACTIONS ── */
  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .add-task-btn {
    padding: 9px 20px;
    background: #f0f7ff;
    color: #007bff;
    border: 1.5px dashed #007bff;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #007bff; color: #fff; border-style: solid; }
  }

  .submit-btn {
    padding: 10px 28px;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    &:disabled { opacity: 0.6; cursor: not-allowed; }
    &:hover:not(:disabled) { opacity: 0.9; }
  }

  .in-btn  { background: #1565c0; }
  .out-btn { background: #e65100; }

  .cancel-edit-btn {
    padding: 9px 20px;
    background: transparent;
    color: #666;
    border: 1.5px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { border-color: #999; color: #333; }
  }

  /* ── EDIT BUTTONS ── */
  .edit-in-btn {
    padding: 5px 14px;
    background: #e3f2fd;
    color: #1565c0;
    border: 1px solid #90caf9;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #1565c0; color: #fff; }
  }

  .edit-out-btn {
    padding: 5px 14px;
    background: #fff3e0;
    color: #e65100;
    border: 1px solid #ffcc80;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #e65100; color: #fff; }
  }

  /* ── HEADER RIGHT ── */
  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── IN PREVIEW ── */
  .update-preview {
    background: #f9fafb;
    border-radius: 8px;
    padding: 16px;
  }

  .preview-meta {
    font-size: 0.9rem;
    color: #444;
    margin: 0 0 12px 0;
  }

  .task-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #007bff;
    min-width: 52px;
  }

  .task-title {
    font-size: 0.9rem;
    color: #333;
    flex: 1;
  }

  .task-meta {
    font-size: 0.78rem;
    color: #888;
    white-space: nowrap;
  }

  /* ── OUT FIELDS ── */
  .out-task-row { border-left: 3px solid #e65100; }

  .task-title-display {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
    width: 100%;
  }

  .out-grid {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    width: 100%;
    align-items: flex-end;
  }

  .out-fields { flex-direction: column; }

  /* ── OVERALL ROW ── */
  .overall-row {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  /* ── SUB POINTS ── */
  .subpoints-section {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px dashed #e5e7eb;
  }

  .subpoints-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    display: block;
    margin-bottom: 8px;
  }

  .subpoint-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .bullet {
    color: #007bff;
    font-size: 1.1rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .subpoint-input {
    flex: 1;
    padding: 7px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.85rem;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;
    &:focus { border-color: #007bff; }
    &::placeholder { color: #c4c4c4; }
  }

  .remove-subpoint {
    background: none;
    border: none;
    color: #e53935;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 4px 6px;
    border-radius: 4px;
    flex-shrink: 0;
    &:hover { background: #ffebee; }
  }

  .add-subpoint-btn {
    margin-top: 6px;
    padding: 5px 14px;
    background: transparent;
    color: #007bff;
    border: 1px dashed #007bff;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #007bff; color: #fff; border-style: solid; }
  }

  /* ── TIME SEGMENTS ── */
  .time-segments-section {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px dashed #e5e7eb;
  }

  .segment-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .segment-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #6b7280;
    min-width: 48px;
    padding-bottom: 10px;
    white-space: nowrap;
  }

  .seg-duration-badge {
    display: inline-flex;
    align-items: center;
    background: #dcfce7;
    color: #15803d;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 12px;
    white-space: nowrap;
    align-self: flex-end;
    margin-bottom: 4px;
  }

  .time-calc-badge {
    display: inline-flex;
    align-items: center;
    background: #e0f2fe;
    color: #0369a1;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .seg-preview-pill {
    display: inline-flex;
    align-items: center;
    background: #eff6ff;
    color: #1d4ed8;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
    white-space: nowrap;
  }

  .break-preview-pill {
    display: inline-flex;
    align-items: center;
    background: #fef9c3;
    color: #854d0e;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
    white-space: nowrap;
  }

  /* ── TIMELINE BAR ── */
  .timeline-bar {
    display: flex;
    align-items: stretch;
    height: 36px;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    border: 1px solid #dbeafe;
    background: #f8fafc;
  }

  .timeline-block {
    background: linear-gradient(135deg, #1d4ed8, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    min-width: 60px;

    span {
      font-size: 0.65rem;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  }

  .timeline-break {
    background: #fef9c3;
    border-left: 1px dashed #fbbf24;
    border-right: 1px dashed #fbbf24;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    font-size: 0.65rem;
    font-weight: 700;
    color: #92400e;
    white-space: nowrap;
    padding: 0 4px;
  }

  /* ── PREVIEW SUBPOINTS ── */
  .preview-task-block {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    &:last-child { border-bottom: none; }
  }

  .preview-task-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .preview-subpoints {
    padding-left: 56px;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .preview-subpoint {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 0.82rem;
    color: #555;
    line-height: 1.5;
  }

  .preview-bullet {
    color: #007bff;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* ── OUT SUBPOINTS ── */
  .out-subpoints {
    padding-left: 0;
    margin: 6px 0 10px 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  /* ── CLOCK IN CARD (pre-clock-in) ── */
  .clock-in-card {
    border: 2px dashed #cbd5e1;
    background: #f8fafc;
  }

  .clock-in-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .clock-in-icon {
    font-size: 2.2rem;
    flex-shrink: 0;
  }

  .clock-in-text {
    flex: 1;
    min-width: 180px;

    h3 {
      margin: 0 0 4px 0;
      font-size: 1rem;
      font-weight: 700;
      color: #1a1a2e;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      color: #64748b;
      line-height: 1.5;
    }
  }

  .clock-in-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
  }

  .live-time {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a2e;
    font-variant-numeric: tabular-nums;
  }

  .clock-in-btn {
    padding: 10px 24px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(34,197,94,0.3);

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(34,197,94,0.4);
    }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  .clock-in-date {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 500;
  }

  /* ── CLOCK STATUS CARD (post-clock-in) ── */
  .clock-status-card {
    background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
    border-radius: 12px;
    padding: 20px 28px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 0;
    box-shadow: 0 4px 24px rgba(15,52,96,0.28);
    flex-wrap: wrap;
    gap: 0;
    position: relative;
    overflow: hidden;

    /* Animated shimmer bar at top */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2.5px;
      background: linear-gradient(90deg, transparent, #60a5fa, #22c55e, #60a5fa, transparent);
      background-size: 300% 100%;
      animation: cscShimmer 3s linear infinite;
    }
  }

  @keyframes cscShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Left column */
  .csc-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1.6;
    min-width: 200px;
    padding-right: 28px;
  }

  /* Pulsing green dot */
  .csc-indicator {
    position: relative;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .csc-dot {
    position: absolute;
    inset: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34,197,94,0.7);
  }

  .csc-pulse-ring {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid rgba(34,197,94,0.45);
    animation: cscPulse 2s ease-out infinite;
  }

  @keyframes cscPulse {
    0%   { transform: scale(0.6); opacity: 1; }
    100% { transform: scale(1.7); opacity: 0; }
  }

  .csc-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .csc-title {
    font-size: 0.65rem;
    font-weight: 800;
    color: #22c55e;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .csc-time-row {
    display: flex;
    align-items: center;
    gap: 7px;
    flex-wrap: wrap;
  }

  .csc-in-label {
    font-size: 0.78rem;
    color: #94a3b8;
  }

  .csc-in-time {
    font-size: 1.05rem;
    font-weight: 800;
    color: #f1f5f9;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.3px;
  }

  .csc-sep {
    color: #334155;
    font-size: 1rem;
  }

  .csc-date {
    font-size: 0.75rem;
    color: #475569;
    font-weight: 500;
  }

  .csc-workmode-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    margin-top: 2px;
    width: fit-content;
  }

  /* Center column: elapsed */
  .csc-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 12px 28px;
    border-left: 1px solid rgba(255,255,255,0.07);
    border-right: 1px solid rgba(255,255,255,0.07);
    min-width: 150px;
  }

  .csc-elapsed-label {
    font-size: 0.63rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 700;
  }

  .csc-elapsed-value {
    font-size: 1.8rem;
    font-weight: 800;
    color: #60a5fa;
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
    line-height: 1;
  }

  .csc-elapsed-sub {
    font-size: 0.63rem;
    color: #475569;
    font-weight: 500;
    margin-top: 1px;
  }

  /* Right column: live clock + actions */
  .csc-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    padding-left: 28px;
    min-width: 150px;
  }

  .csc-now-label {
    font-size: 0.63rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 700;
  }

  .csc-now-value {
    font-size: 1.05rem;
    font-weight: 700;
    color: #e2e8f0;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.5px;
  }

  /* Action buttons inside the status card */
  .csc-edit-btn {
    margin-top: 6px;
    padding: 6px 16px;
    background: rgba(255,255,255,0.08);
    color: #93c5fd;
    border: 1px solid rgba(147,197,253,0.3);
    border-radius: 7px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: rgba(255,255,255,0.15);
      border-color: #60a5fa;
      color: #fff;
    }
  }

  .csc-add-tasks-btn {
    margin-top: 6px;
    padding: 6px 16px;
    background: rgba(34,197,94,0.15);
    color: #86efac;
    border: 1px solid rgba(34,197,94,0.35);
    border-radius: 7px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: rgba(34,197,94,0.25);
      border-color: #22c55e;
      color: #fff;
    }
  }

  /* Responsive: stack columns on mobile */
  @media (max-width: 640px) {
    .clock-status-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      padding: 18px 20px;
    }

    .csc-left {
      padding-right: 0;
      padding-bottom: 16px;
      width: 100%;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }

    .csc-center {
      border-left: none;
      border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      align-items: flex-start;
      padding: 14px 0;
      width: 100%;
    }

    .csc-right {
      align-items: flex-start;
      padding-left: 0;
      padding-top: 14px;
      width: 100%;
    }

    .csc-edit-btn,
    .csc-add-tasks-btn {
      align-self: flex-start;
    }
  }

  /* ── TASKS PENDING CARD ── */
  .tasks-pending-card {
    border: 1.5px solid #fde68a;
    background: #fffbeb;
  }

  .tpc-inner {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .tpc-icon {
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .tpc-text {
    flex: 1;
    min-width: 160px;

    h3 {
      margin: 0 0 4px 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #92400e;
    }
    p {
      margin: 0;
      font-size: 0.83rem;
      color: #b45309;
      line-height: 1.5;
    }
  }

  .add-tasks-now-btn {
    padding: 9px 22px;
    background: #f59e0b;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(245,158,11,0.3);

    &:hover {
      background: #d97706;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(245,158,11,0.4);
    }
  }

  /* ── HISTORY ── */
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .history-card {
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.07);
    border: 1px solid #eee;
  }

  .history-date-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    flex-wrap: wrap;
    gap: 8px;
  }

  .history-date {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }

  .history-badges {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .history-location {
    font-size: 0.78rem;
    background: rgba(255,255,255,0.15);
    color: #fff;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .history-dep {
    font-size: 0.78rem;
    background: rgba(255,255,255,0.1);
    color: #cbd5e1;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .badge-done {
    font-size: 0.75rem;
    background: #dcfce7;
    color: #15803d;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 600;
  }

  .badge-pending {
    font-size: 0.75rem;
    background: #fff8e1;
    color: #f57f17;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 600;
  }

  .history-section {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    &:last-child { border-bottom: none; }
  }

  .out-section         { background: #fffcf8; }
  .out-pending-section { background: #fafafa; }

  .in-label  { background: #e3f2fd; color: #1565c0; }
  .out-label { background: #fff3e0; color: #e65100; }

  .section-meta {
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 10px;
    font-style: italic;
  }

  .history-task-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 7px 0;
    border-bottom: 1px solid #f5f5f5;
    flex-wrap: wrap;
    &:last-of-type { border-bottom: none; }
  }

  .out-row { background: transparent; }

  .ht-num {
    font-size: 0.75rem;
    font-weight: 700;
    color: #007bff;
    min-width: 52px;
    padding-top: 1px;
  }

  .ht-title {
    font-size: 0.88rem;
    color: #222;
    font-weight: 500;
    flex: 1;
    min-width: 150px;
  }

  .ht-meta {
    font-size: 0.75rem;
    color: #888;
    white-space: nowrap;
  }

  .ht-impact {
    font-size: 0.75rem;
    color: #555;
    font-style: italic;
    width: 100%;
    padding-left: 60px;
    margin-top: 2px;
  }

  .status-pill {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
    &.todo             { background: #f3f4f6; color: #6b7280; }
    &.started          { background: #ede9fe; color: #5b21b6; }
    &.in-progress      { background: #dbeafe; color: #1d4ed8; }
    &.paused           { background: #fef9c3; color: #854d0e; }
    &.blocked          { background: #fee2e2; color: #b91c1c; }
    &.completed-local  { background: #dcfce7; color: #15803d; }
    &.ready-for-testing { background: #e0f2fe; color: #0369a1; }
    &.testing-in-progress { background: #dbeafe; color: #1d4ed8; }
    &.test-passed      { background: #dcfce7; color: #15803d; }
    &.ready-for-production { background: #fef3c7; color: #92400e; }
    &.production-released  { background: #dcfce7; color: #14532d; }
    &.closed           { background: #f3f4f6; color: #374151; }
    &.done             { background: #dcfce7; color: #15803d; }
    &.incomplete       { background: #fee2e2; color: #b91c1c; }
  }

  .history-task-block {
    padding: 6px 0;
    border-bottom: 1px solid #f5f5f5;
    &:last-of-type { border-bottom: none; }
  }

  .history-subpoints {
    padding-left: 56px;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .history-subpoint {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 0.78rem;
    color: #6b7280;
    line-height: 1.4;
  }

  .history-overall-bar {
    display: flex;
    margin-top: 12px;
    padding: 10px 14px;
    background: linear-gradient(135deg, #f0f7ff, #e8f5e9);
    border-radius: 8px;
    font-size: 0.85rem;
    color: #444;
    flex-wrap: wrap;
    gap: 16px;
  }

  .pending-msg {
    font-size: 0.85rem;
    color: #aaa;
    font-style: italic;
    margin: 0;
  }

  .empty-msg {
    text-align: center;
    color: #aaa;
    padding: 32px;
    font-size: 0.9rem;
  }

  /* ── LEAVE ── */
  .days-preview {
    font-size: 0.82rem;
    font-weight: 600;
    color: #1565c0;
    background: #e3f2fd;
    padding: 6px 12px;
    border-radius: 6px;
    margin-bottom: 14px;
    display: inline-block;
  }

  .leave-pending-dot {
    background: #ef4444;
    color: #fff;
    border-radius: 20px;
    padding: 1px 6px;
    font-size: 0.68rem;
    font-weight: 700;
    margin-left: 5px;
  }

  .leave-history-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .leave-history-item {
    border-radius: 10px;
    padding: 14px 16px;
    border: 1px solid #eee;

    &.approved { border-left: 4px solid #15803d; background: #f0fdf4; }
    &.rejected { border-left: 4px solid #b91c1c; background: #fff5f5; }
    &.pending  { border-left: 4px solid #f59e0b; background: #fffbeb; }
  }

  .lhi-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 10px;
  }

  .lhi-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lhi-type {
    display: inline-block;
    background: #e0f2fe;
    color: #0369a1;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .lhi-dates {
    font-size: 0.85rem;
    color: #374151;
    font-weight: 500;
    margin: 0;
  }

  .lhi-days {
    font-size: 0.75rem;
    color: #6b7280;
    margin-left: 6px;
  }

  .lhi-reason {
    font-size: 0.82rem;
    color: #555;
    font-style: italic;
    margin: 0;
  }

  .lhi-applied {
    font-size: 0.72rem;
    color: #9ca3af;
  }

  .lhi-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  .lhi-status {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;

    &.approved { background: #dcfce7; color: #15803d; }
    &.rejected { background: #fee2e2; color: #b91c1c; }
    &.pending  { background: #fef9c3; color: #854d0e; }
  }

  .lhi-rejection {
    margin-top: 10px;
    padding: 10px 12px;
    background: #fff1f1;
    border: 1px solid #fecaca;
    border-radius: 8px;

    .lhi-rejection-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #b91c1c;
    }

    p {
      font-size: 0.82rem;
      color: #b91c1c;
      margin: 4px 0 0 0;
      font-style: italic;
      line-height: 1.4;
    }
  }

  /* ── BREAK TRACKER PANEL ── */
  .break-tracker-panel {
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 20px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
    border: 1px solid #f0f0f0;
  }

  .btp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .btp-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1a1a2e;
  }

  .btp-summary {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .btp-stat {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    &.total { background: #f1f5f9; color: #475569; }
    &.extra { background: #FEE2E2; color: #B91C1C; }
    &.saved { background: #DCFCE7; color: #15803D; }
  }

  .btp-slots {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .break-slot-card {
    background: #FAFAFA;
    border: 1.5px solid;
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: opacity 0.2s;
  }

  .bsc-used-badge {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .bsc-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .bsc-title-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .bsc-emoji {
    font-size: 1.3rem;
    line-height: 1;
    margin-top: 2px;
  }

  .bsc-name {
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .bsc-slot-time {
    font-size: 0.7rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .bsc-live-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #B91C1C;
    background: #FEE2E2;
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .bsc-timer {
    font-size: 1.6rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
    line-height: 1;
  }

  .bsc-progress-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bsc-progress-bar {
    position: relative;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: visible;
  }

  .bsc-progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s, background 0.3s;
    position: relative;
    z-index: 1;
  }

  .bsc-progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.68rem;
    flex-wrap: wrap;
    gap: 4px;
  }

  .bsc-extra-label {
    font-size: 0.68rem;
    font-weight: 700;
    color: #B91C1C;
    background: #FEE2E2;
    padding: 1px 6px;
    border-radius: 20px;
  }

  .bsc-ok-label {
    font-size: 0.68rem;
    font-weight: 600;
  }

  .bsc-controls {
    display: flex;
    gap: 8px;
  }

  .bsc-start-btn {
    flex: 1;
    padding: 7px 12px;
    border: 1.5px solid;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    &:hover:not(:disabled) { filter: brightness(0.92); }
  }

  .bsc-stop-btn {
    flex: 1;
    padding: 7px 12px;
    background: #FEE2E2;
    color: #B91C1C;
    border: 1.5px solid #FCA5A5;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #E53935; color: #fff; border-color: #E53935; }
  }

  .bsc-log {
    border-top: 1px dashed #e5e7eb;
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .bsc-log-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.68rem;
  }

  .bsc-log-time { color: #6b7280; }

  .bsc-log-mins {
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 20px;
    font-size: 0.68rem;
  }

  .break-pulse {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
    animation: breakPulse 1s infinite;
  }

  @keyframes breakPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }

  /* ── BREAK LOG PANEL ── */
  .break-log-panel {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed #e5e7eb;
  }

  .blp-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 10px;
  }

  .blp-slots {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .blp-slot {
    border: 1px solid;
    border-radius: 8px;
    overflow: hidden;
  }

  .blp-slot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
  }

  .blp-total {
    font-size: 0.78rem;
    font-weight: 700;
  }

  .blp-sessions {
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .blp-session-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
  }

  .blp-session-time { color: #6b7280; }

  .blp-session-mins {
    font-weight: 700;
    padding: 1px 7px;
    border-radius: 20px;
    font-size: 0.7rem;
  }

  /* ── DAY TIMELINE ── */
  .day-timeline-card {
    background: #fff;
    border: 1.5px solid #e0e7ff;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 16px;
    box-shadow: 0 1px 6px rgba(99,102,241,0.08);
  }

  .day-timeline-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .day-timeline-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: #3730a3;
  }

  .day-timeline-stats {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .dt-stat {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    &.work  { background: #dcfce7; color: #15803d; }
    &.break { background: #fef9c3; color: #92400e; }
    &.range { background: #f1f5f9; color: #475569; }
  }

  .dt-bar-wrap { margin-bottom: 12px; }

  .dt-bar {
    position: relative;
    height: 40px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .dt-seg {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid;
    border-radius: 4px;
    font-size: 0.68rem;
    font-weight: 700;
    overflow: hidden;
    transition: filter 0.15s;
    &:hover { filter: brightness(0.95); }
  }

  .dt-seg-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 4px;
  }

  .dt-gap {
    position: absolute;
    top: 0;
    height: 100%;
    background: repeating-linear-gradient(
      45deg, rgba(0,0,0,0.04), rgba(0,0,0,0.04) 2px,
      transparent 2px, transparent 6px
    );
    border: 1px dashed #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 2px;

    &:hover {
      background: rgba(251,191,36,0.15);
      border-color: #FBBF24;
    }

    &.is-break {
      background: repeating-linear-gradient(
        45deg, rgba(251,191,36,0.12), rgba(251,191,36,0.12) 2px,
        rgba(255,249,196,0.3) 2px, rgba(255,249,196,0.3) 6px
      );
      border-color: #FBBF24;
      border-style: solid;
    }
  }

  .dt-gap-label {
    font-size: 0.62rem;
    font-weight: 700;
    color: #92400e;
    white-space: nowrap;
    overflow: hidden;
  }

  .dt-axis {
    display: flex;
    justify-content: space-between;
    font-size: 0.68rem;
    color: #94a3b8;
    padding: 0 2px;
  }

  .dt-legend { margin-top: 6px; }

  .dt-legend-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }

  .dt-legend-item {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid;
    white-space: nowrap;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dt-gap-list {
    background: #fafafa;
    border-radius: 8px;
    padding: 12px 14px;
    border: 1px solid #f0f0f0;
  }

  .dt-gap-list-label {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 600;
    margin: 0 0 10px 0;
  }

  .dt-gap-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 10px;
    border-radius: 8px;
    margin-bottom: 6px;
    background: #fff;
    border: 1px solid #e5e7eb;
    flex-wrap: wrap;
    transition: background 0.15s;

    &.is-break {
      background: #fefce8;
      border-color: #fde68a;
    }

    &:last-child { margin-bottom: 0; }
  }

  .dt-gap-time {
    font-size: 0.8rem;
    font-weight: 600;
    color: #1e293b;
    min-width: 120px;
  }

  .dt-gap-dur {
    font-size: 0.75rem;
    background: #f1f5f9;
    color: #475569;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 600;
    white-space: nowrap;
  }

  .dt-gap-context {
    font-size: 0.72rem;
    color: #7c3aed;
    font-weight: 600;
    flex: 1;
  }

  .dt-gap-mark-btn {
    padding: 4px 12px;
    background: #fef9c3;
    color: #92400e;
    border: 1px solid #fde68a;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
    &:hover { background: #fbbf24; color: #451a03; }
  }

  .dt-gap-clear-btn {
    padding: 4px 12px;
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
    &:hover { background: #e53935; color: #fff; }
  }

  .dt-gap-applied {
    font-size: 0.72rem;
    color: #15803d;
    font-weight: 600;
    background: #dcfce7;
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .dt-no-gap {
    font-size: 0.8rem;
    color: #15803d;
    margin: 0;
    font-weight: 500;
  }
`;