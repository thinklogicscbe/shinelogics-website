import styled from "styled-components";
import { Button } from "antd";

/* ======================================================
   DESIGN TOKENS (ENTERPRISE CONSISTENCY)
   ====================================================== */

const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
};

const shadow = {
  card: "0 8px 24px rgba(15, 23, 42, 0.06)",
  hover: "0 14px 36px rgba(15, 23, 42, 0.12)",
  modal: "0 30px 80px rgba(15, 23, 42, 0.25)",
};

/* ================= PAGE ================= */

export const Page = styled.div`
  padding: 32px 40px;
  background: #f8fafc;
  min-height: 100vh;
`;

/* ================= HEADER ================= */

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #0f172a;
`;

/* ================= CREATE BUTTON ================= */

export const CreateCard = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #ffffff;
  padding: 12px 18px;
  border-radius: ${radius.lg};
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.35);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(37, 99, 235, 0.45);
  }

  span {
    font-weight: 600;
    font-size: 14px;
  }
`;

export const CreateIcon = styled.div`
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ================= GRID ================= */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
`;

/* ================= CARD ================= */

export const Card = styled.div`
  position: relative; /* IMPORTANT */

  background: #ffffff;
  border-radius: ${radius.xl};
  padding: 22px;
  border: 1px solid #e5e7eb;
  box-shadow: ${shadow.card};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${shadow.hover};
    border-color: #c7d2fe;
  }
`;



export const CenteredActions = styled.div`
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;

  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    border-radius: ${radius.sm};
    min-width: 70px;
  }
`;

/* ================= LOGO ================= */

export const LogoBox = styled.div`
  height: 72px;
  background: #f9fafb;
  border-radius: ${radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;

  img {
    max-height: 42px;
    max-width: 130px;
    object-fit: contain;
  }
`;

/* ================= TEXT ================= */

export const Name = styled.h4`
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #020617;
  margin-bottom: 6px;
`;

export const Desc = styled.p`
  text-align: center;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
`;

/* ================= FOOTER ================= */

export const Footer = styled.div`
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;

  button {
    border-radius: ${radius.sm};
  }
`;

/* ================= UPLOAD ================= */

export const UploadButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: ${radius.md};
  background: #f1f5f9;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  span {
    font-weight: 500;
  }

  &:hover {
    background: #e2e8f0;
  }
`;

export const Preview = styled.div`
  margin-top: 12px;

  img {
    max-height: 64px;
    object-fit: contain;
  }
`;

/* ======================================================
   MODAL — PREMIUM ENTERPRISE (WITH ❌ CLOSE ICON)
   ====================================================== */

export const StyledModalWrapper = styled.div`
  .ant-modal-mask {
    backdrop-filter: blur(4px);
    background: rgba(15, 23, 42, 0.55);
  }

  .ant-modal-content {
    border-radius: ${radius.xl} !important;
    padding: 0 !important;
    box-shadow: ${shadow.modal};
    overflow: hidden;
  }

  .ant-modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
    position: relative;
  }

  .ant-modal-title {
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
  }

  /* ❌ CLOSE ICON (TOP RIGHT) */
  .ant-modal-close {
    top: 16px;
    right: 16px;
  }

  .ant-modal-close-x {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .ant-modal-close-x:hover {
    background: #e2e8f0;
  }

  .ant-modal-body {
    padding: 26px 24px 28px;
  }

  /* FORM */
  .ant-form-item-label > label {
    font-weight: 600;
    font-size: 13px;
    color: #334155;
  }

  .ant-input,
  .ant-input-textarea,
  .ant-input-number {
    border-radius: ${radius.md};
    font-size: 14px;
  }

  .ant-switch {
    margin-top: 4px;
  }
`;

/* ================= SUBMIT BUTTON ================= */

export const SubmitButton = styled(Button)`
  height: 44px;
  border-radius: ${radius.lg};
  font-weight: 600;
  font-size: 14px;
`;


export const OrderBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
`;