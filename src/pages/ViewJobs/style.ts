import styled from "styled-components";

/* ================= PAGE ================= */
export const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;
`;

/* ================= HEADING ================= */
export const JobListingsHeading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

/* ================= TABLE ================= */
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 1100px;
  background: white;
  border-collapse: collapse;
  border-radius: 10px;
`;

export const TableHead = styled.thead`
  background: #2563eb;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8fafc;
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
`;

export const TableData = styled.td`
  padding: 10px;
  font-size: 14px;
  white-space: nowrap;
`;

/* ================= ACTION BUTTONS ================= */
export const IconBtn = styled.button<{ danger?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 6px;
  color: ${({ danger }) => (danger ? "#dc2626" : "#2563eb")};

  &:hover {
    opacity: 0.8;
  }
`;

/* ================= PAGINATION ================= */
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

/* ================= MODAL OVERLAY ================= */
export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

/* ================= MODAL CARD ================= */
export const ModalContent = styled.div`
  background: white;
  border-radius: 14px;
  width: 100%;
  max-width: 650px;

  /* 🔥 height + scroll support */
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  padding: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.18);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: translateY(8px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

/* ================= MODAL HEADER ================= */
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-shrink: 0;

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
  }

  p {
    margin-top: 4px;
    font-size: 14px;
    color: #6b7280;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

/* ================= MODAL BODY (SCROLL AREA) ================= */
export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7d2fe;
    border-radius: 6px;
  }
`;

/* ================= FORM ================= */
export const FormSection = styled.div`
  margin-bottom: 16px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #374151;
`;

/* ================= INPUTS ================= */
export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  resize: vertical;
  min-height: 90px;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

/* ================= MODAL FOOTER ================= */
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

/* ================= BUTTONS ================= */
export const PrimaryBtn = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

export const SecondaryBtn = styled.button`
  background: #f3f4f6;
  color: #111827;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #e5e7eb;
  }
`;