import styled from "styled-components";

export const ProductivityAdminContainer = styled.div`
  color: #0f172a;

  .page-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  h1 {
    margin: 0;
    font-size: 26px;
  }

  .muted {
    color: #64748b;
    margin: 4px 0 0;
  }

  .tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }

  .tabs button,
  .primary,
  .secondary,
  .danger {
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .tabs button {
    background: #e2e8f0;
    color: #334155;
  }

  .tabs button.active,
  .primary {
    background: #2563eb;
    color: #fff;
  }

  .secondary {
    background: #e2e8f0;
    color: #0f172a;
  }

  .danger {
    background: #fee2e2;
    color: #b91c1c;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 14px;
    margin-bottom: 18px;
  }

  .stat,
  .panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
  }

  .stat span {
    display: block;
    color: #64748b;
    font-size: 13px;
    font-weight: 700;
  }

  .stat strong {
    display: block;
    margin-top: 8px;
    font-size: 28px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }

  label {
    display: block;
    font-size: 13px;
    color: #475569;
    font-weight: 700;
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
    width: 100%;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px;
    font: inherit;
    box-sizing: border-box;
  }

  textarea {
    min-height: 78px;
    resize: vertical;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .table-wrap {
    overflow-x: auto;
    margin-top: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 760px;
    background: #fff;
  }

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
    vertical-align: top;
    font-size: 14px;
  }

  th {
    background: #f8fafc;
    color: #475569;
    font-size: 12px;
    text-transform: uppercase;
  }

  .pill {
    display: inline-flex;
    padding: 4px 8px;
    border-radius: 999px;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 12px;
    font-weight: 800;
  }

  .pill.blocked {
    background: #fee2e2;
    color: #b91c1c;
  }

  .pill.done {
    background: #dcfce7;
    color: #15803d;
  }

  .chat-list {
    display: grid;
    gap: 12px;
  }

  .chat-card {
    border-left: 4px solid #2563eb;
  }

  .comment-box {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    margin-top: 10px;
  }
`;
