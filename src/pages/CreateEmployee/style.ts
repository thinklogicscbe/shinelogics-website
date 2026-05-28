import styled from "styled-components";

export const CreateEmployeeContainer = styled.div`
  padding: 24px;
  background: #f5f6fa;
  min-height: 100vh;

  .form-card,
  .table-card {
    background: #fff;
    border-radius: 10px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    animation: fadeInUp 0.4s ease-in-out;
  }

  h2 {
    font-size: 1.3rem;
    color: #333;
    margin: 0 0 4px 0;
  }

  h3 {
    font-size: 1.1rem;
    color: #333;
    margin: 0 0 16px 0;
  }

  .subtitle {
    font-size: 0.85rem;
    color: #888;
    margin: 0 0 20px 0;
  }

  .required {
    color: #e53935;
    margin-left: 2px;
  }

  .optional {
    color: #aaa;
    font-size: 0.75rem;
    font-weight: 400;
    margin-left: 4px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 0.85rem;
      color: #555;
      font-weight: 500;
    }

    input {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
      width: 100%;
      box-sizing: border-box;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
      }

      &::placeholder {
        color: #bbb;
      }

      &:disabled {
        background: #f5f5f5;
        color: #999;
        cursor: not-allowed;
      }
    }
  }

  .error-msg {
    color: #e53935;
    font-size: 0.85rem;
    margin: 12px 0 0 0;
  }

  .success-msg {
    color: #2e7d32;
    font-size: 0.85rem;
    margin: 12px 0 0 0;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
    align-items: center;
  }

  .create-btn {
    padding: 10px 28px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  .cancel-btn {
    padding: 10px 24px;
    background: transparent;
    color: #666;
    border: 1.5px solid #ddd;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #999;
      color: #333;
    }
  }

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th {
    text-align: left;
    padding: 10px 14px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    border-bottom: 2px solid #eee;
    background: #fafafa;
  }

  td {
    padding: 12px 14px;
    color: #444;
    border-bottom: 1px solid #f5f5f5;
    transition: background 0.2s;
  }

  tr:hover td {
    background: #f9f9f9;
  }

  .empty-row {
    text-align: center;
    color: #aaa;
    padding: 32px;
    font-size: 0.9rem;
  }

  .badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      background: #e8f5e9;
      color: #2e7d32;
    }

    &.inactive {
      background: #ffebee;
      color: #c62828;
    }
  }

  /* ACTION BUTTONS */
  .action-btns {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .edit-btn,
  .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 4px 6px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: #f0f0f0;
    }
  }

  /* CONFIRM DELETE */
  .confirm-delete {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: #e53935;
    font-weight: 600;

    span {
      color: #e53935;
    }
  }

  .confirm-yes {
    padding: 3px 10px;
    background: #e53935;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #c62828;
    }
  }

  .confirm-no {
    padding: 3px 10px;
    background: #eee;
    color: #555;
    border: none;
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #ddd;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* TASKS ICON BUTTON */
  .tasks-icon-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.2s;
    &:hover { background: #e3f2fd; }
  }

  /* MODAL OVERLAY */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 780px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* MODAL HEADER */
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    flex-shrink: 0;
  }

  .modal-title {
    display: flex;
    align-items: center;
    gap: 14px;

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 2px 0;
    }

    p {
      font-size: 0.78rem;
      color: #94a3b8;
      margin: 0;
    }
  }

  .modal-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .modal-close {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    font-size: 1rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    &:hover { background: rgba(255, 255, 255, 0.2); }
  }

  /* MODAL FILTER */
  .modal-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 24px;
    border-bottom: 1px solid #eee;
    background: #fafafa;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .filter-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.88rem;
    outline: none;
    width: 180px;
    &:focus { border-color: #007bff; }
  }

  .filter-btn {
    padding: 8px 16px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { background: #0056b3; }
  }

  .clear-btn {
    padding: 8px 14px;
    background: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    &:hover { background: #eee; }
  }

  .task-count {
    font-size: 0.8rem;
    color: #888;
    margin-left: auto;
  }

  /* MODAL BODY */
  .modal-body {
    overflow-y: auto;
    padding: 20px 24px;
    flex: 1;
  }

  .modal-loading,
  .modal-empty {
    text-align: center;
    color: #aaa;
    padding: 40px;
    font-size: 0.9rem;
  }

  /* TASK ENTRY */
  .task-entry {
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .task-entry-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    flex-wrap: wrap;
    gap: 8px;
  }

  .task-date {
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
  }

  .task-entry-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
  }

  .loc-badge {
    font-size: 0.72rem;
    background: rgba(255,255,255,0.15);
    color: #fff;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .dep-badge {
    font-size: 0.72rem;
    background: rgba(255,255,255,0.1);
    color: #cbd5e1;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .complete-badge {
    font-size: 0.72rem;
    background: #dcfce7;
    color: #15803d;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 600;
  }

  .pending-badge {
    font-size: 0.72rem;
    background: #fff8e1;
    color: #f57f17;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 600;
  }

  /* TASK SECTION */
  .task-section {
    padding: 14px 16px;
    border-bottom: 1px solid #f0f0f0;
    &:last-child { border-bottom: none; }
  }

  .in-section { background: #fff; }
  .out-section { background: #fffcf8; }
  .out-pending { background: #fafafa; }

  .section-pill {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 8px;
  }

  .in-pill { background: #e3f2fd; color: #1565c0; }
  .out-pill { background: #fff3e0; color: #e65100; }

  .section-meta-text {
    font-size: 0.82rem;
    color: #666;
    font-style: italic;
    margin-bottom: 10px;
  }

  /* TASK LINE */
  .task-line {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid #f5f5f5;
    flex-wrap: wrap;
    &:last-of-type { border-bottom: none; }
  }

  .tl-num {
    font-size: 0.72rem;
    font-weight: 700;
    color: #007bff;
    min-width: 50px;
    padding-top: 1px;
  }

  .tl-title {
    font-size: 0.85rem;
    color: #222;
    font-weight: 500;
    flex: 1;
    min-width: 120px;
  }

  .tl-meta {
    font-size: 0.72rem;
    color: #888;
    white-space: nowrap;
  }

  .tl-impact {
    font-size: 0.72rem;
    color: #555;
    font-style: italic;
    width: 100%;
    padding-left: 58px;
  }

  .status-tag {
    font-size: 0.68rem;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 20px;
    white-space: nowrap;
    &.todo { background: #f3f4f6; color: #6b7280; }
    &.in-progress { background: #dbeafe; color: #1d4ed8; }
    &.done { background: #dcfce7; color: #15803d; }
    &.incomplete { background: #fee2e2; color: #b91c1c; }
  }

  /* OVERALL SUMMARY */
  .overall-summary {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    padding: 8px 12px;
    background: linear-gradient(135deg, #f0f7ff, #e8f5e9);
    border-radius: 8px;
    font-size: 0.82rem;
    color: #444;
    flex-wrap: wrap;
  }

  .pending-text {
    font-size: 0.82rem;
    color: #aaa;
    font-style: italic;
    margin: 0;
  }
`;