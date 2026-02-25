import styled from "styled-components";

/* ================= PAGE ================= */

export const Container = styled.div`
  padding: 32px;
  background: #f8fafc;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;

  h2 {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }

  button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
    transition: all 0.15s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.35);
    }
  }
`;

/* ================= CARD GRID ================= */

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
`;

/* ================= CARD ================= */

export const Card = styled.div`
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  }

  img,
  video {
    width: 100%;
    border-radius: 14px;
    margin-bottom: 14px;
    max-height: 220px;
    object-fit: cover;
  }

  h3 {
    margin: 6px 0;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
  }

  p {
    font-size: 14px;
    color: #475569;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  ul {
    padding-left: 18px;
    font-size: 13px;
    color: #334155;
  }
`;

/* ================= ACTION ROW ================= */

export const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;

  svg {
    cursor: pointer;
    font-size: 18px;
    margin-left: 12px;
  }
`;

/* ================= FORM ================= */

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: 700;
    font-size: 13px;
    color: #334155;
    display: block;
    margin-bottom: 6px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
  }
`;

/* ================= POINT ROW ================= */

export const PointRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;

  input {
    flex: 1;
  }

  svg {
    cursor: pointer;
    color: #dc2626;
  }
`;

/* ================= BUTTONS ================= */

export const AddBtn = styled.button`
  background: #eef2ff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 600;
  color: #2563eb;

  &:hover {
    background: #dbeafe;
  }
`;

export const SaveBtn = styled.button`
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #1e40af;
  }
`;

/* ================= MODAL ================= */

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

export const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.2s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(12px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 20px 24px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
  }
`;

export const ModalBody = styled.div`
  padding: 0 24px 24px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7d2fe;
    border-radius: 6px;
  }
`;

export const CloseBtn = styled.button`
  background: #f1f5f9;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;

  &:hover {
    background: #e2e8f0;
  }
`;


export const UploadHint = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-top: 6px;
`;

export const PreviewMedia = styled.div`
  margin-top: 10px;

  img,
  video {
    width: 100%;
    max-height: 180px;
    border-radius: 10px;
    object-fit: cover;
  }
`;



/* ================= ACTION BUTTONS ================= */

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const BaseActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  background: transparent;

  svg {
    font-size: 16px;
  }

  span {
    line-height: 1;
  }
`;

export const EditBtn = styled(BaseActionBtn)`
  background: #eef2ff;
  color: #2563eb;

  &:hover {
    background: #dbeafe;
    transform: translateY(-1px);
  }
`;

export const DeleteBtn = styled(BaseActionBtn)`
  background: #fef2f2;
  color: #dc2626;

  &:hover {
    background: #fee2e2;
    transform: translateY(-1px);
  }
`;