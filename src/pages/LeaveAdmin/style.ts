import styled from "styled-components";

export const LeaveAdminContainer = styled.div`
  padding: 24px;
  background: #f5f6fa;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;

    h1 { font-size: 1.4rem; font-weight: 800; color: #1a1a2e; margin: 0 0 4px 0; }
    p { font-size: 0.85rem; color: #6b7280; margin: 0; }
  }

  .pending-alert {
    background: #fef9c3;
    color: #854d0e;
    border: 1px solid #fde68a;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .success-msg {
    background: #e8f5e9; color: #2e7d32; padding: 10px 16px;
    border-radius: 8px; font-size: 0.88rem; margin-bottom: 16px;
    border-left: 3px solid #2e7d32;
  }

  .error-msg {
    background: #ffebee; color: #c62828; padding: 10px 16px;
    border-radius: 8px; font-size: 0.88rem; margin-bottom: 16px;
    border-left: 3px solid #c62828;
  }

  /* FILTER TABS */
  .filter-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .filter-tab {
    padding: 8px 18px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;

    &.active {
      background: linear-gradient(135deg, #1a1a2e, #0f3460);
      border-color: #0f3460;
      color: #fff;
      font-weight: 600;
    }

    &:hover:not(.active) { border-color: #0f3460; color: #0f3460; }
  }

  .badge {
    background: #ef4444;
    color: #fff;
    border-radius: 20px;
    padding: 1px 7px;
    font-size: 0.7rem;
    font-weight: 700;
  }

  .loading, .empty {
    text-align: center;
    padding: 60px;
    color: #9ca3af;
    font-size: 0.9rem;
    background: #fff;
    border-radius: 12px;
  }

  /* LEAVE LIST */
  .leave-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .leave-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
    border: 1px solid #eee;
    transition: box-shadow 0.2s;
    flex-wrap: wrap;

    &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
  }

  /* EMPLOYEE */
  .leave-emp {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 180px;
  }

  .emp-avatar {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emp-info {
    h3 { font-size: 0.95rem; font-weight: 700; color: #111827; margin: 0 0 2px 0; }
    p { font-size: 0.75rem; color: #6b7280; margin: 0 0 2px 0; }
    span { font-size: 0.7rem; color: #9ca3af; }
  }

  /* LEAVE DETAILS */
  .leave-details {
    flex: 1;
    min-width: 200px;
  }

  .leave-type-badge {
    display: inline-block;
    background: #e0f2fe;
    color: #0369a1;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 8px;
  }

  .leave-dates {
    font-size: 0.85rem;
    color: #374151;
    font-weight: 500;
    margin-bottom: 6px;
  }

  .days-count {
    font-size: 0.75rem;
    color: #6b7280;
    margin-left: 6px;
  }

  .leave-reason {
    font-size: 0.82rem;
    color: #555;
    font-style: italic;
    margin: 0 0 6px 0;
  }

  .applied-at {
    font-size: 0.72rem;
    color: #9ca3af;
  }

  /* ACTIONS */
  .leave-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    min-width: 140px;
  }

  .status-badge {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
  }

  .rejection-note {
    font-size: 0.72rem;
    color: #b91c1c;
    font-style: italic;
    margin: 0;
    max-width: 160px;
    text-align: right;
  }

  .action-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .view-btn {
    padding: 5px 12px;
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #e5e7eb; }
  }

  .approve-btn {
    padding: 5px 12px;
    background: #dcfce7;
    color: #15803d;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #15803d; color: #fff; }

    &.large {
      padding: 10px 24px;
      font-size: 0.9rem;
      border-radius: 8px;
    }
  }

  .reject-btn {
    padding: 5px 12px;
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fecaca;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #b91c1c; color: #fff; }

    &.large {
      padding: 10px 24px;
      font-size: 0.9rem;
      border-radius: 8px;
    }
  }

  /* MODALS */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .detail-modal {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 560px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    animation: slideUp 0.3s ease;
  }

  .reject-modal {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 460px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
  }

  .modal-emp {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 { font-size: 1rem; font-weight: 700; color: #fff; margin: 0 0 2px 0; }
    p { font-size: 0.78rem; color: #94a3b8; margin: 0 0 2px 0; }
    span { font-size: 0.72rem; color: #64748b; }
  }

  .modal-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    font-size: 1.1rem;
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
    width: 32px; height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { background: rgba(255,255,255,0.2); }
  }

  .modal-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .detail-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .detail-value {
    font-size: 0.88rem;
    font-weight: 500;
    color: #111827;
  }

  .reason-box {
    background: #f9fafb;
    border-radius: 8px;
    padding: 14px;
    border-left: 3px solid #0f3460;

    p { font-size: 0.88rem; color: #374151; margin: 6px 0 0 0; line-height: 1.5; }
  }

  .rejection-box {
    background: #fff5f5;
    border-radius: 8px;
    padding: 14px;
    border-left: 3px solid #b91c1c;

    p { font-size: 0.88rem; color: #b91c1c; margin: 6px 0 0 0; line-height: 1.5; }
  }

  .modal-action-btns {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 4px;
  }

  /* REJECT MODAL */
  .reject-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    background: #b91c1c;

    h3 { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; }
  }

  .modal-close.white {
    background: rgba(255,255,255,0.15);
    &:hover { background: rgba(255,255,255,0.25); }
  }

  .reject-modal-body {
    padding: 24px;

    p { font-size: 0.85rem; color: #6b7280; margin: 0 0 16px 0; }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;

    label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #374151;
    }

    textarea {
      padding: 10px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 0.9rem;
      outline: none;
      resize: vertical;
      font-family: inherit;
      &:focus { border-color: #b91c1c; }
    }
  }

  .required { color: #e53935; margin-left: 2px; }

  .reject-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .cancel-btn {
    padding: 9px 20px;
    background: transparent;
    color: #666;
    border: 1.5px solid #ddd;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { border-color: #999; }
  }

  .confirm-reject-btn {
    padding: 9px 22px;
    background: #b91c1c;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
    &:disabled { opacity: 0.6; cursor: not-allowed; }
    &:hover:not(:disabled) { opacity: 0.9; }
  }
`;