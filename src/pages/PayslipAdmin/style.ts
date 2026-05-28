import styled from "styled-components";

export const PayslipContainer = styled.div`
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

  .add-btn {
    padding: 10px 22px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover { opacity: 0.9; }
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

  /* FORM */
  .form-card {
    background: #fff;
    border-radius: 12px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);

    h2 { font-size: 1.2rem; font-weight: 700; color: #1a1a2e; margin: 0 0 4px 0; }
    .subtitle { font-size: 0.82rem; color: #9ca3af; margin: 0 0 20px 0; }
  }

  .form-section {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
    &:last-of-type { border-bottom: none; }

    h3 {
      font-size: 0.88rem;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 14px 0;
    }
  }

  /* ✅ NEW — Net salary auto-split bar */
  .net-salary-bar {
    background: linear-gradient(135deg, #f0f7ff, #e8f5ff);
    border: 1.5px dashed #007bff;
    border-radius: 10px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .split-badge {
    font-size: 0.78rem;
    color: #15803d;
    font-weight: 600;
    background: #dcfce7;
    border: 1px solid #bbf7d0;
    padding: 6px 14px;
    border-radius: 20px;
    display: inline-block;
    width: fit-content;
  }

  .split-formula {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 0.78rem;
    color: #6b7280;
    font-weight: 600;
  }

  .formula-chip {
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;

    &.basic   { background: #dbeafe; color: #1d4ed8; }
    &.hra     { background: #dcfce7; color: #15803d; }
    &.medical { background: #fef9c3; color: #854d0e; }
    &.other   { background: #f3e8ff; color: #7e22ce; }
  }

  .net-match {
    color: #1d4ed8;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  .form-grid-1 {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 14px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #555;
    }

    input, select {
      padding: 9px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 0.9rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
      &:focus { border-color: #0f3460; }
      &::placeholder { color: #bbb; }
    }
  }

  .required { color: #e53935; margin-left: 2px; }

  .gross-preview {
    margin-top: 12px;
    font-size: 0.88rem;
    color: #374151;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 8px 14px;
    border-radius: 8px;

    strong { color: #15803d; font-size: 1rem; }
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .save-btn {
    padding: 10px 28px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    &:disabled { opacity: 0.6; cursor: not-allowed; }
    &:hover:not(:disabled) { opacity: 0.9; }
  }

  .cancel-btn {
    padding: 10px 22px;
    background: transparent;
    color: #666;
    border: 1.5px solid #ddd;
    border-radius: 8px;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { border-color: #999; }
  }

  /* TABLE */
  .table-card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);

    h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin: 0 0 16px 0; }
  }

  .table-wrapper { overflow-x: auto; }

  table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }

  th {
    text-align: left;
    padding: 10px 12px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    border-bottom: 2px solid #f3f4f6;
    background: #fafafa;
    white-space: nowrap;
  }

  td {
    padding: 12px;
    color: #374151;
    border-bottom: 1px solid #f9fafb;
    vertical-align: middle;
  }

  tr:hover td { background: #f9fafb; }

  .empty-row { text-align: center; color: #9ca3af; padding: 32px; }

  .emp-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    .emp-name { font-weight: 600; color: #111827; }
    .emp-code { font-size: 0.72rem; color: #9ca3af; }
  }

  .gross-cell { font-weight: 700; color: #15803d; }

  .action-btns { display: flex; align-items: center; gap: 6px; }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px 7px;
    border-radius: 6px;
    transition: background 0.2s;
    &:hover { background: #f3f4f6; }

    &.generate {
      background: #f0fdf4;
      &:hover { background: #dcfce7; }
    }
  }

  .confirm-delete {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: #e53935;
    font-weight: 600;
  }

  .confirm-yes {
    padding: 3px 8px;
    background: #e53935;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
  }

  .confirm-no {
    padding: 3px 8px;
    background: #eee;
    color: #555;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
  }

  /* MODAL */
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

  .payslip-modal {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 520px;
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

    h3 { font-size: 1rem; font-weight: 700; color: #fff; margin: 0 0 2px 0; }
    p { font-size: 0.78rem; color: #94a3b8; margin: 0; }
  }

  .modal-title { display: flex; align-items: center; gap: 12px; }

  .modal-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-close {
    background: rgba(255,255,255,0.1);
    border: none;
    color: #fff;
    width: 30px; height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { background: rgba(255,255,255,0.2); }
  }

  .modal-body { padding: 24px; }

  .modal-subtitle {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0 0 16px 0;
  }

  .quick-select { margin-bottom: 16px; }

  .qs-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    margin: 0 0 8px 0;
  }

  .qs-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .qs-btn {
    padding: 6px 14px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    color: #374151;
    transition: all 0.2s;

    &.active {
      background: #0f3460;
      border-color: #0f3460;
      color: #fff;
      font-weight: 600;
    }

    &:hover:not(.active) { border-color: #0f3460; color: #0f3460; }
  }

  .manual-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .salary-preview {
    background: #f9fafb;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 20px;
  }

  .sp-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #374151;
    padding: 5px 0;
    border-bottom: 1px solid #f3f4f6;
    &:last-child { border-bottom: none; }

    &.deductions { color: #dc2626; }
    &.net {
      font-weight: 800;
      font-size: 1rem;
      color: #15803d;
      padding-top: 10px;
      margin-top: 4px;
      border-top: 2px solid #e5e7eb;
    }
  }

  .generate-btn {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, #1a1a2e, #0f3460);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover { opacity: 0.9; }
  }
`;