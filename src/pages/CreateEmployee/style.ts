import styled, { createGlobalStyle, keyframes } from "styled-components";

// ─── Design Tokens ─────────────────────────────────────────────────────────────

const tokens = {
  // Palette: deep navy + slate + gold accent
  bg:          "#0d1117",
  bgSurface:   "#161b22",
  bgCard:      "#1c2130",
  bgHover:     "#212736",
  borderFaint: "#2a3142",
  border:      "#30384d",
  borderActive:"#4f6ef7",

  textPrimary: "#e8eaf0",
  textSec:     "#8b93a8",
  textMuted:   "#58627a",

  accent:      "#4f6ef7",    // vivid indigo
  accentHover: "#6b84f9",
  accentGlow:  "rgba(79,110,247,0.18)",

  gold:        "#f0b429",
  goldLight:   "rgba(240,180,41,0.12)",

  success:     "#22c55e",
  successBg:   "rgba(34,197,94,0.1)",
  error:       "#f87171",
  errorBg:     "rgba(248,113,113,0.1)",
  warning:     "#fbbf24",

  radius:      "10px",
  radiusLg:    "16px",
  radiusSm:    "6px",

  fontDisplay: "'Sora', 'DM Sans', sans-serif",
  fontBody:    "'DM Sans', 'Inter', sans-serif",
  fontMono:    "'JetBrains Mono', monospace",

  shadow:      "0 2px 16px rgba(0,0,0,0.35)",
  shadowHover: "0 6px 32px rgba(0,0,0,0.55)",
};

// ─── Keyframes ─────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Google Fonts import via GlobalStyle ──────────────────────────────────────

export const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${tokens.bg}; color: ${tokens.textPrimary}; font-family: ${tokens.fontBody}; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${tokens.bgSurface}; }
  ::-webkit-scrollbar-thumb { background: ${tokens.border}; border-radius: 8px; }
  ::-webkit-scrollbar-thumb:hover { background: ${tokens.accent}; }
`;

// ─── Main Container ───────────────────────────────────────────────────────────

export const CreateEmployeeContainer = styled.div`
  min-height: 100vh;
  background: ${tokens.bg};
  font-family: ${tokens.fontBody};
  color: ${tokens.textPrimary};
  padding: 32px 40px 80px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) { padding: 20px 20px 60px; }

  /* ── Page Header ── */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
    animation: ${fadeUp} 0.4s ease both;
  }

  .page-title {
    font-family: ${tokens.fontDisplay};
    font-size: 28px;
    font-weight: 700;
    color: ${tokens.textPrimary};
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .page-subtitle {
    margin-top: 4px;
    font-size: 13.5px;
    color: ${tokens.textSec};
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  /* ── Step Tabs ── */
  .step-tabs {
    display: flex;
    position: relative;
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.borderFaint};
    border-radius: ${tokens.radiusLg};
    padding: 6px;
    gap: 4px;
    margin-bottom: 28px;
    animation: ${fadeUp} 0.4s 0.05s ease both;
    overflow: hidden;
  }

  .tab-indicator {
    position: absolute;
    top: 6px;
    left: 6px;
    width: calc(33.33% - 2.67px);
    height: calc(100% - 12px);
    background: linear-gradient(135deg, ${tokens.accent} 0%, #6b84f9 100%);
    border-radius: 10px;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 0;
    box-shadow: 0 4px 20px ${tokens.accentGlow};
  }

  .step-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 16px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: ${tokens.fontBody};
    font-size: 14px;
    font-weight: 500;
    color: ${tokens.textSec};
    border-radius: 10px;
    transition: color 0.2s;
    position: relative;
    z-index: 1;

    &.active {
      color: #fff;
    }
    &:not(.active):hover {
      color: ${tokens.textPrimary};
    }
  }

  .step-num {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    font-family: ${tokens.fontMono};
    flex-shrink: 0;
    .active & {
      background: rgba(255,255,255,0.2);
    }
  }

  .step-icon { font-size: 16px; }

  .step-label { font-size: 14px; }

  .step-count {
    background: rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 1px 8px;
    font-size: 11px;
    font-family: ${tokens.fontMono};
    font-weight: 600;
    .active & { background: rgba(255,255,255,0.25); }
  }

  /* ── Form Card ── */
  .form-card {
    background: ${tokens.bgCard};
    border: 1px solid ${tokens.borderFaint};
    border-radius: ${tokens.radiusLg};
    padding: 28px 32px;
    margin-bottom: 20px;
    animation: ${fadeUp} 0.35s ease both;
    box-shadow: ${tokens.shadow};
  }

  .form-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    h2 {
      font-family: ${tokens.fontDisplay};
      font-size: 18px;
      font-weight: 600;
      color: ${tokens.textPrimary};
    }
  }

  .subtitle {
    margin-top: 3px;
    font-size: 13px;
    color: ${tokens.textSec};
  }

  /* ── Section Labels ── */
  .section-label {
    font-family: ${tokens.fontMono};
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${tokens.accent};
    margin: 20px 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: ${tokens.borderFaint};
    }
  }

  /* ── Form Grid ── */
  .form-grid {
    display: grid;
    gap: 14px;
    &.col-3 { grid-template-columns: repeat(3, 1fr); }
    &.col-4 { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 1200px) {
      &.col-4 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      &.col-3, &.col-4 { grid-template-columns: 1fr; }
    }
  }

  .span-2 { grid-column: span 2; }

  /* ── Input Group ── */
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-size: 12px;
      font-weight: 500;
      color: ${tokens.textSec};
      letter-spacing: 0.01em;
    }

    input, select, textarea {
      background: ${tokens.bgSurface};
      border: 1px solid ${tokens.border};
      border-radius: ${tokens.radius};
      color: ${tokens.textPrimary};
      font-family: ${tokens.fontBody};
      font-size: 13.5px;
      padding: 9px 13px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
      width: 100%;
      &::placeholder { color: ${tokens.textMuted}; }
      &:focus {
        border-color: ${tokens.accent};
        box-shadow: 0 0 0 3px ${tokens.accentGlow};
        background: ${tokens.bgHover};
      }
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b93a8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 32px;
      cursor: pointer;
      option { background: ${tokens.bgCard}; }
    }
  }

  .required { color: ${tokens.error}; margin-left: 2px; }
  .optional { font-size: 11px; color: ${tokens.textMuted}; font-weight: 400; margin-left: 4px; }

  /* ── Messages ── */
  .error-msg {
    margin-top: 12px;
    padding: 10px 14px;
    background: ${tokens.errorBg};
    border: 1px solid rgba(248,113,113,0.25);
    border-radius: ${tokens.radiusSm};
    color: ${tokens.error};
    font-size: 13px;
  }

  .success-msg {
    margin-top: 12px;
    padding: 10px 14px;
    background: ${tokens.successBg};
    border: 1px solid rgba(34,197,94,0.25);
    border-radius: ${tokens.radiusSm};
    color: ${tokens.success};
    font-size: 13px;
  }

  /* ── Form Actions ── */
  .form-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
    flex-wrap: wrap;
  }

  /* ── Buttons ── */
  .create-btn {
    background: linear-gradient(135deg, ${tokens.accent}, #6b84f9);
    color: #fff;
    border: none;
    border-radius: ${tokens.radius};
    padding: 10px 22px;
    font-family: ${tokens.fontBody};
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 16px ${tokens.accentGlow};
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, ${tokens.accentHover}, #7c91fa);
      transform: translateY(-1px);
      box-shadow: 0 6px 24px ${tokens.accentGlow};
    }
    &:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  }

  .next-btn {
    background: transparent;
    color: ${tokens.accent};
    border: 1px solid ${tokens.accent};
    border-radius: ${tokens.radius};
    padding: 10px 20px;
    font-family: ${tokens.fontBody};
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: ${tokens.accentGlow};
      transform: translateX(2px);
    }
  }

  .back-btn {
    background: transparent;
    color: ${tokens.textSec};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radius};
    padding: 10px 16px;
    font-family: ${tokens.fontBody};
    font-size: 13.5px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      border-color: ${tokens.textSec};
      color: ${tokens.textPrimary};
    }
  }

  .cancel-btn {
    background: transparent;
    color: ${tokens.error};
    border: 1px solid rgba(248,113,113,0.35);
    border-radius: ${tokens.radius};
    padding: 8px 16px;
    font-family: ${tokens.fontBody};
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: ${tokens.errorBg}; }
  }

  .edit-btn, .delete-btn, .invite-btn, .tasks-icon-btn {
    width: 30px;
    height: 30px;
    border-radius: ${tokens.radiusSm};
    border: 1px solid ${tokens.border};
    background: ${tokens.bgSurface};
    cursor: pointer;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    &:hover { border-color: ${tokens.accent}; background: ${tokens.bgHover}; transform: scale(1.08); }
  }

  .delete-btn:hover { border-color: ${tokens.error}; }
  .invite-btn:hover { border-color: ${tokens.gold}; }

  /* ── Confirm Delete ── */
  .confirm-delete {
    display: flex;
    align-items: center;
    gap: 5px;
    span { font-size: 12px; color: ${tokens.textSec}; }
  }

  .confirm-yes {
    background: ${tokens.error};
    color: #fff;
    border: none;
    border-radius: ${tokens.radiusSm};
    padding: 4px 10px;
    font-size: 12px;
    cursor: pointer;
    &:hover { background: #ef4444; }
  }

  .confirm-no {
    background: ${tokens.bgHover};
    color: ${tokens.textSec};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    padding: 4px 10px;
    font-size: 12px;
    cursor: pointer;
    &:hover { border-color: ${tokens.textSec}; }
  }

  /* ── Table Card ── */
  .table-card {
    background: ${tokens.bgCard};
    border: 1px solid ${tokens.borderFaint};
    border-radius: ${tokens.radiusLg};
    padding: 20px 24px;
    animation: ${fadeUp} 0.4s 0.1s ease both;
    box-shadow: ${tokens.shadow};

    h3 {
      font-family: ${tokens.fontDisplay};
      font-size: 16px;
      font-weight: 600;
      color: ${tokens.textPrimary};
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
  }

  .count-pill {
    background: ${tokens.accentGlow};
    color: ${tokens.accent};
    border: 1px solid rgba(79,110,247,0.25);
    border-radius: 20px;
    padding: 1px 10px;
    font-size: 11px;
    font-family: ${tokens.fontMono};
    font-weight: 600;
  }

  /* ── Table Toolbar ── */
  .table-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radius};
    padding: 7px 12px;
    font-size: 13px;
    transition: border-color 0.2s;
    &:focus-within { border-color: ${tokens.accent}; box-shadow: 0 0 0 3px ${tokens.accentGlow}; }
    span { color: ${tokens.textMuted}; }
    input {
      background: transparent;
      border: none;
      outline: none;
      color: ${tokens.textPrimary};
      font-size: 13px;
      font-family: ${tokens.fontBody};
      width: 180px;
      &::placeholder { color: ${tokens.textMuted}; }
    }
    button {
      background: none;
      border: none;
      color: ${tokens.textMuted};
      cursor: pointer;
      font-size: 11px;
      &:hover { color: ${tokens.textPrimary}; }
    }
  }

  .filter-select {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radius};
    color: ${tokens.textPrimary};
    font-size: 13px;
    font-family: ${tokens.fontBody};
    padding: 7px 28px 7px 12px;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%238b93a8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    &:focus { border-color: ${tokens.accent}; box-shadow: 0 0 0 3px ${tokens.accentGlow}; }
    option { background: ${tokens.bgCard}; }
  }

  /* ── Table ── */
  .table-wrapper {
    overflow-x: auto;
    border-radius: ${tokens.radius};
    border: 1px solid ${tokens.borderFaint};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;

    thead {
      background: ${tokens.bgSurface};
      th {
        padding: 11px 14px;
        text-align: left;
        font-size: 11px;
        font-weight: 600;
        font-family: ${tokens.fontMono};
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: ${tokens.textMuted};
        white-space: nowrap;
        border-bottom: 1px solid ${tokens.borderFaint};
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid ${tokens.borderFaint};
        transition: background 0.15s;
        &:last-child { border-bottom: none; }
        &:hover { background: ${tokens.bgHover}; }
      }
      td {
        padding: 11px 14px;
        color: ${tokens.textSec};
        vertical-align: middle;
        white-space: nowrap;
      }
    }
  }

  .td-num {
    font-family: ${tokens.fontMono};
    font-size: 11.5px;
    color: ${tokens.textMuted} !important;
    font-weight: 500;
    width: 36px;
  }

  .empty-row {
    text-align: center;
    padding: 40px !important;
    color: ${tokens.textMuted} !important;
    font-size: 13px;
  }

  /* ── Name / Member Cell ── */
  .name-cell {
    font-weight: 600;
    color: ${tokens.textPrimary};
    font-size: 13.5px;
  }

  .member-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .member-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    font-family: ${tokens.fontDisplay};
    flex-shrink: 0;
    background: linear-gradient(135deg, ${tokens.accent}, #6b84f9);
    color: #fff;
    box-shadow: 0 2px 10px ${tokens.accentGlow};
  }

  .member-avatar-img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid ${tokens.border};
  }

  .member-name {
    font-weight: 600;
    font-size: 13px;
    color: ${tokens.textPrimary};
  }

  .member-email {
    font-size: 11.5px;
    color: ${tokens.textMuted};
    margin-top: 1px;
  }

  /* ── Badges ── */
  .code-badge {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    padding: 2px 8px;
    font-family: ${tokens.fontMono};
    font-size: 11.5px;
    color: ${tokens.gold};
  }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    &.active {
      background: ${tokens.successBg};
      color: ${tokens.success};
      border: 1px solid rgba(34,197,94,0.25);
    }
    &.inactive {
      background: rgba(248,113,113,0.08);
      color: ${tokens.error};
      border: 1px solid rgba(248,113,113,0.2);
    }
    &:hover { transform: scale(1.05); }
  }

  /* Role badges */
  .role-badge {
    display: inline-block;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid transparent;
  }

  .role-admin        { background: rgba(240,180,41,0.12); color: ${tokens.gold};    border-color: rgba(240,180,41,0.25); }
  .role-manager      { background: rgba(79,110,247,0.12); color: ${tokens.accent};  border-color: rgba(79,110,247,0.25); }
  .role-team-lead    { background: rgba(34,211,238,0.1);  color: #22d3ee;           border-color: rgba(34,211,238,0.2); }
  .role-developer    { background: rgba(167,139,250,0.1); color: #a78bfa;           border-color: rgba(167,139,250,0.2); }
  .role-tester       { background: rgba(52,211,153,0.1);  color: #34d399;           border-color: rgba(52,211,153,0.2); }
  .role-designer     { background: rgba(251,113,133,0.1); color: #fb7185;           border-color: rgba(251,113,133,0.2); }
  .role-marketing    { background: rgba(251,191,36,0.1);  color: #fbbf24;           border-color: rgba(251,191,36,0.2); }
  .role-sales        { background: rgba(74,222,128,0.1);  color: #4ade80;           border-color: rgba(74,222,128,0.2); }
  .role-support      { background: rgba(129,140,248,0.1); color: #818cf8;           border-color: rgba(129,140,248,0.2); }

  /* Skills */
  .skills-cell { display: flex; gap: 4px; flex-wrap: wrap; }
  .skill-chip {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    padding: 2px 7px;
    font-size: 11px;
    color: ${tokens.textSec};
    font-family: ${tokens.fontMono};
    &.more { color: ${tokens.accent}; border-color: rgba(79,110,247,0.3); background: ${tokens.accentGlow}; }
  }

  .link {
    color: ${tokens.accent};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }

  .action-btns {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ── Modal Overlay ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 24px;
  }

  /* ── Invite Modal ── */
  .invite-modal {
    background: ${tokens.bgCard};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusLg};
    width: 100%;
    max-width: 420px;
    box-shadow: ${tokens.shadowHover};
    animation: ${fadeUp} 0.25s ease;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 22px;
    border-bottom: 1px solid ${tokens.borderFaint};
  }

  .modal-title {
    display: flex;
    align-items: center;
    gap: 12px;
    h3 {
      font-family: ${tokens.fontDisplay};
      font-size: 15px;
      font-weight: 600;
      color: ${tokens.textPrimary};
    }
    p { font-size: 12px; color: ${tokens.textMuted}; margin-top: 1px; }
  }

  .modal-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${tokens.accent}, #6b84f9);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
    font-family: ${tokens.fontDisplay};
    box-shadow: 0 2px 12px ${tokens.accentGlow};
    flex-shrink: 0;
  }

  .modal-close {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    color: ${tokens.textSec};
    width: 28px;
    height: 28px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    &:hover { background: ${tokens.bgHover}; color: ${tokens.textPrimary}; border-color: ${tokens.textSec}; }
  }

  .invite-modal-body {
    padding: 22px;
  }

  .invite-desc {
    font-size: 13.5px;
    color: ${tokens.textSec};
    line-height: 1.7;
    margin-bottom: 18px;
    strong { color: ${tokens.textPrimary}; font-weight: 600; }
  }

  .invite-actions {
    display: flex;
    gap: 10px;
    margin-top: 6px;
  }

  /* ── Task Modal ── */
  .modal {
    background: ${tokens.bgCard};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusLg};
    width: 100%;
    max-width: 720px;
    max-height: 84vh;
    display: flex;
    flex-direction: column;
    box-shadow: ${tokens.shadowHover};
    animation: ${fadeUp} 0.25s ease;
  }

  .modal-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    border-bottom: 1px solid ${tokens.borderFaint};
    flex-wrap: wrap;
  }

  .filter-input {
    flex: 1;
    min-width: 180px;
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    color: ${tokens.textPrimary};
    font-family: ${tokens.fontBody};
    font-size: 13px;
    padding: 7px 12px;
    outline: none;
    &:focus { border-color: ${tokens.accent}; }
  }

  .filter-btn {
    background: ${tokens.accent};
    color: #fff;
    border: none;
    border-radius: ${tokens.radiusSm};
    padding: 7px 14px;
    font-size: 13px;
    font-family: ${tokens.fontBody};
    cursor: pointer;
    &:hover { background: ${tokens.accentHover}; }
  }

  .clear-btn {
    background: transparent;
    color: ${tokens.error};
    border: 1px solid rgba(248,113,113,0.3);
    border-radius: ${tokens.radiusSm};
    padding: 7px 12px;
    font-size: 13px;
    font-family: ${tokens.fontBody};
    cursor: pointer;
    &:hover { background: ${tokens.errorBg}; }
  }

  .task-count {
    font-size: 12px;
    font-family: ${tokens.fontMono};
    color: ${tokens.textMuted};
    margin-left: auto;
  }

  .modal-body {
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .modal-loading, .modal-empty {
    text-align: center;
    color: ${tokens.textMuted};
    font-size: 13.5px;
    padding: 40px 0;
  }

  /* ── Task Entry ── */
  .task-entry {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.borderFaint};
    border-radius: ${tokens.radius};
    overflow: hidden;
  }

  .task-entry-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 14px;
    background: ${tokens.bgHover};
    border-bottom: 1px solid ${tokens.borderFaint};
    flex-wrap: wrap;
    gap: 8px;
  }

  .task-date {
    font-family: ${tokens.fontMono};
    font-size: 12.5px;
    font-weight: 600;
    color: ${tokens.textPrimary};
  }

  .task-entry-badges { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }

  .loc-badge {
    background: ${tokens.accentGlow};
    color: ${tokens.accent};
    border: 1px solid rgba(79,110,247,0.2);
    border-radius: 20px;
    padding: 2px 9px;
    font-size: 11px;
    font-weight: 500;
  }

  .dep-badge {
    background: ${tokens.goldLight};
    color: ${tokens.gold};
    border: 1px solid rgba(240,180,41,0.2);
    border-radius: 20px;
    padding: 2px 9px;
    font-size: 11px;
  }

  .complete-badge {
    background: ${tokens.successBg};
    color: ${tokens.success};
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 20px;
    padding: 2px 9px;
    font-size: 11px;
    font-weight: 600;
  }

  .pending-badge {
    background: rgba(251,191,36,0.08);
    color: ${tokens.warning};
    border: 1px solid rgba(251,191,36,0.2);
    border-radius: 20px;
    padding: 2px 9px;
    font-size: 11px;
  }

  .task-section {
    padding: 12px 14px;
    & + & { border-top: 1px solid ${tokens.borderFaint}; }
  }

  .section-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
    font-family: ${tokens.fontMono};
    margin-bottom: 8px;
  }

  .in-pill  { background: rgba(34,211,238,0.1);  color: #22d3ee; border: 1px solid rgba(34,211,238,0.2); }
  .out-pill { background: rgba(251,113,133,0.1); color: #fb7185; border: 1px solid rgba(251,113,133,0.2); }

  .section-meta-text {
    font-size: 12px;
    color: ${tokens.textMuted};
    margin-bottom: 8px;
    line-height: 1.5;
  }

  .task-line {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 5px 0;
    border-bottom: 1px solid ${tokens.borderFaint};
    &:last-child { border-bottom: none; }
  }

  .tl-num  { font-family: ${tokens.fontMono}; font-size: 11px; color: ${tokens.accent}; font-weight: 600; }
  .tl-title { flex: 1; min-width: 100px; font-size: 12.5px; color: ${tokens.textPrimary}; font-weight: 500; }
  .tl-meta { font-size: 11px; color: ${tokens.textMuted}; font-family: ${tokens.fontMono}; }
  .tl-impact { font-size: 11px; color: ${tokens.warning}; font-style: italic; }

  .status-tag {
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    &.completed     { background: ${tokens.successBg}; color: ${tokens.success}; }
    &.in-progress   { background: ${tokens.accentGlow}; color: ${tokens.accent}; }
    &.pending       { background: rgba(251,191,36,0.08); color: ${tokens.warning}; }
    &.not-started   { background: rgba(248,113,113,0.08); color: ${tokens.error}; }
  }

  .out-pending {
    .pending-text { font-size: 12.5px; color: ${tokens.textMuted}; margin-top: 4px; }
  }

  .overall-summary {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${tokens.borderFaint};
    font-size: 12.5px;
    color: ${tokens.textSec};
    strong { color: ${tokens.textPrimary}; }
  }

  .day-picker {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .day-btn {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    color: ${tokens.textSec};
    font-family: ${tokens.fontMono};
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
    &:hover { border-color: ${tokens.accent}; color: ${tokens.textPrimary}; }
    &.selected {
      background: linear-gradient(135deg, ${tokens.accent}, #6b84f9);
      border-color: transparent;
      color: #fff;
      box-shadow: 0 2px 10px ${tokens.accentGlow};
    }
  }

  /* ── Company Table Extras ── */
  .company-cell {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .company-logo-img {
    width: 28px;
    height: 28px;
    border-radius: ${tokens.radiusSm};
    object-fit: contain;
    border: 1px solid ${tokens.border};
    background: ${tokens.bgSurface};
    padding: 2px;
    flex-shrink: 0;
  }

  .company-logo-placeholder {
    width: 28px;
    height: 28px;
    border-radius: ${tokens.radiusSm};
    background: linear-gradient(135deg, ${tokens.accent}, #6b84f9);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    font-family: ${tokens.fontDisplay};
    flex-shrink: 0;
  }

  .industry-badge {
    background: ${tokens.goldLight};
    color: ${tokens.gold};
    border: 1px solid rgba(240,180,41,0.2);
    border-radius: 20px;
    padding: 2px 9px;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }

  .tz-badge {
    background: ${tokens.bgSurface};
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radiusSm};
    padding: 2px 7px;
    font-family: ${tokens.fontMono};
    font-size: 10.5px;
    color: ${tokens.textSec};
    white-space: nowrap;
  }

  .hours-badge {
    background: rgba(34,211,238,0.06);
    color: #22d3ee;
    border: 1px solid rgba(34,211,238,0.18);
    border-radius: ${tokens.radiusSm};
    padding: 2px 8px;
    font-family: ${tokens.fontMono};
    font-size: 11px;
    white-space: nowrap;
  }

  .span-3 { grid-column: span 3; }


  // ─── ADD THESE STYLES to your existing CreateEmployeeContainer in style.ts ───
// Paste this block inside the styled.div template literal, after the last existing style.

/*

  .file-upload-area {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 120px;
    border: 2px dashed ${tokens.border};
    border-radius: ${tokens.radius};
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: ${tokens.bgSurface};
    margin-bottom: 16px;
    position: relative;
    overflow: visible;
    &:hover {
      border-color: ${tokens.accent};
      background: ${tokens.bgHover};
    }
  }

  .file-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    pointer-events: none;
  }

  .file-icon {
    font-size: 26px;
    opacity: 0.55;
  }

  .file-label {
    font-size: 12px;
    font-weight: 600;
    color: ${tokens.textSec};
    text-align: center;
    line-height: 1.4;
  }

  .file-hint {
    font-size: 10.5px;
    color: ${tokens.textMuted};
    text-align: center;
    line-height: 1.4;
    padding: 0 6px;
  }

  .file-preview {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
    &.circle img {
      border-radius: 50%;
    }
    &.circle {
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .file-clear-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${tokens.error};
    color: #fff;
    border: none;
    font-size: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: background 0.15s;
    &:hover { background: #ef4444; }
  }

*/

// ─── ACTUAL EXPORT for copy-paste into style.ts ───────────────────────────────
// If you prefer a standalone addition, import and spread this into your existing styled component.
// The easiest approach: open style.ts and paste the block above (without the /* */ comments)
// inside the CreateEmployeeContainer template literal at the end, before the closing backtick.
`;

  /* ── Day Picker (Working Days) ── */
  