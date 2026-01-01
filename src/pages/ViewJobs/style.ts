import styled from "styled-components";

/* PAGE */
export const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;
`;

/* HEADING */
export const JobListingsHeading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

/* TABLE */
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
`;

export const TableData = styled.td`
  padding: 10px;
  white-space: nowrap;
`;

/* ACTION BUTTONS */
export const IconBtn = styled.button<{ danger?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 6px;
  color: ${({ danger }) => (danger ? "#dc2626" : "#2563eb")};
`;

/* PAGINATION */
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

/* MODAL */
export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
`;

export const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

export const Heading = styled.h4`
  margin-top: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

/* MODAL BUTTONS */
export const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

export const Btn = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &.update {
    background: #2563eb;
    color: white;
  }

  &.close {
    background: #dc2626;
    color: white;
  }
`;
