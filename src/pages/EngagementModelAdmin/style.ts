import styled from "styled-components";

/* ===============================
   PAGE WRAPPER (SIDEBAR FRIENDLY)
================================ */
export const PageWrapper = styled.div`
  width: 100%;
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* ===============================
   HEADER
================================ */
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

/* ===============================
   CREATE BUTTON
================================ */
export const CreateButton = styled.button`
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* ===============================
   CARD GRID
================================ */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/* ===============================
   CARD
================================ */
export const Card = styled.div`
  background: white;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const CardText = styled.p`
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 14px;
`;

export const FeatureList = styled.ul`
  padding-left: 18px;
  margin-bottom: 16px;

  li {
    font-size: 13px;
    margin-bottom: 6px;
    color: #334155;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  flex-wrap: wrap;
`;

/* ===============================
   BUTTONS
================================ */
export const SecondaryButton = styled.button`
  background: #f1f5f9;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;

export const DangerButton = styled.button`
  background: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;

export const Button = styled.button`
  background: #4f46e5;
  color: white;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

/* ===============================
   MODAL (🔥 ABOVE SIDEBAR)
================================ */

/* Backdrop must be ABOVE sidebar + burger */
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  /* 🔥 VERY IMPORTANT */
  z-index: 3000;
`;

/* Modal ABOVE backdrop */
export const Modal = styled.div`
  background: white;
  width: 100%;
  max-width: 560px;
  border-radius: 18px;
  padding: 24px;
  max-height: 90vh;
  overflow-y: auto;

  /* 🔥 ABOVE BACKDROP */
  z-index: 3100;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
`;

/* ===============================
   FORM
================================ */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  min-height: 100px;
  font-size: 14px;
  width: 100%;
`;

export const FeatureRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const AddButton = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
`;
