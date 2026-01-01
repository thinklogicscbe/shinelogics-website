import styled from "styled-components";

/* ===== PAGE CONTAINER ===== */
/* Assumes sidebar already takes space (grid / flex layout) */
export const Container = styled.div`
  width: 100%;
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* ===== HEADER ===== */
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const CreateButton = styled.button`
  background: #4f46e5;
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* ===== CARD GRID ===== */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== CARD ===== */
export const Card = styled.div`
  background: white;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardType = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 4px;
`;

export const CardTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;

export const CardText = styled.p`
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
`;

export const ItemList = styled.ul`
  padding-left: 18px;
  margin-top: 10px;

  li {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

/* ===== BUTTONS ===== */
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

export const SecondaryButton = styled.button`
  background: #e5e7eb;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

export const DangerButton = styled.button`
  background: #fee2e2;
  color: #b91c1c;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

/* ===== MODAL ===== */
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  padding: 16px;
`;

export const Modal = styled.div`
  background: white;
  width: 100%;
  max-width: 560px;
  border-radius: 18px;
  padding: 24px;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 22px;
`;

/* ===== FORM ===== */
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

export const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  width: 100%;
`;

export const ItemRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const AddItemButton = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
`;


export const PageWrapper = styled.div`
  width: 100%;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
