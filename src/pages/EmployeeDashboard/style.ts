import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;

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

  .main {
    padding: 24px 32px;
    max-width: 1100px;
    margin: 0 auto;
    @media (max-width: 768px) { padding: 16px; }
  }

  /* PROFILE BAR */
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

  /* TABS */
  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
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

  /* MESSAGES */
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

  /* CARD */
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

  .in-tag {
    background: #e3f2fd;
    color: #1565c0;
  }

  .out-tag {
    background: #fff3e0;
    color: #e65100;
  }

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

  /* META ROW */
  .meta-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  /* INPUT GROUP */
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

    input, select {
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

      /* ✅ Disabled state for locked OUT fields */
      &:disabled {
        background: #f5f5f5;
        color: #999;
        cursor: not-allowed;
        border-color: #eee;
      }
    }

    &.wide { flex: 3; min-width: 200px; }
    &.small { flex: 1; min-width: 80px; }
  }

  /* TASK ROW */
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

  .task-fields {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .remove-btn {
    padding: 8px 12px;
    background: #ffebee;
    color: #c62828;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
    align-self: flex-end;
    &:hover { background: #e53935; color: #fff; }
  }

  /* FORM ACTIONS */
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

  .in-btn { background: #1565c0; }
  .out-btn { background: #e65100; }

  /* IN PREVIEW */
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

  .preview-task {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    flex-wrap: wrap;

    &:last-child { border-bottom: none; }
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

  /* OUT FIELDS */
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

  .out-fields {
    flex-direction: column;
  }

  /* OVERALL ROW */
  .overall-row {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  /* HEADER RIGHT */
  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* EDIT BUTTONS */
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

  /* ✅ NEW — Edit OUT button */
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

  /* HISTORY */
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

  /* HISTORY SECTION */
  .history-section {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    &:last-child { border-bottom: none; }
  }

  .out-section { background: #fffcf8; }
  .out-pending-section { background: #fafafa; }

  .section-label {
    font-size: 0.82rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 10px;
  }

  .in-label {
    background: #e3f2fd;
    color: #1565c0;
  }

  .out-label {
    background: #fff3e0;
    color: #e65100;
  }

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
    &.todo { background: #f3f4f6; color: #6b7280; }
    &.in-progress { background: #dbeafe; color: #1d4ed8; }
    &.done { background: #dcfce7; color: #15803d; }
    &.incomplete { background: #fee2e2; color: #b91c1c; }
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

  /* LEGACY — kept for compatibility */
  .history-title {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 16px 0;
  }

  .history-entry {
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 14px;
    background: #fafafa;
  }

  .history-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .history-task {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 0;
    border-bottom: 1px solid #f0f0f0;
    flex-wrap: wrap;
    &:last-of-type { border-bottom: none; }
  }

  .history-overall {
    margin-top: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
    background: #f0f7ff;
    padding: 6px 12px;
    border-radius: 6px;
  }

  .empty-msg {
    text-align: center;
    color: #aaa;
    padding: 32px;
    font-size: 0.9rem;
  }

  /* TASK NUM HEADER */
  .task-num-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
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

  /* SUB POINTS */
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

  /* PREVIEW SUBPOINTS */
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

  /* OUT SUBPOINTS */
  .out-subpoints {
    padding-left: 0;
    margin: 6px 0 10px 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  /* HISTORY SUBPOINTS */
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

  /* DAYS PREVIEW */
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

  /* LEAVE PENDING DOT */
  .leave-pending-dot {
    background: #ef4444;
    color: #fff;
    border-radius: 20px;
    padding: 1px 6px;
    font-size: 0.68rem;
    font-weight: 700;
    margin-left: 5px;
  }

  /* LEAVE HISTORY */
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
    &.rejected  { background: #fee2e2; color: #b91c1c; }
    &.pending   { background: #fef9c3; color: #854d0e; }
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
`;