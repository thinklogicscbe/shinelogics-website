import styled from "styled-components";

/* ================= PAGE ================= */

export const Page = styled.div`
  padding: 32px;
  background: #f8fafc;
  min-height: 100vh;
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
  color: #0f172a;
`;

/* ================= TABLE ================= */

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
`;

export const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: #2563eb;
  color: white;
`;

export const TableRow = styled.tr`
  transition: background 0.15s ease;

  &:nth-child(even) {
    background: #f8fafc;
  }

  &:hover {
    background: #eef2ff;
  }
`;

export const TableHeader = styled.th`
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
`;

export const TableData = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #0f172a;
  white-space: nowrap;
`;

/* ================= ACTION BUTTONS ================= */

export const IconBtn = styled.button<{ danger?: boolean }>`
  background: ${({ danger }) => (danger ? "#fee2e2" : "#eef2ff")};
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 8px;
  padding: 6px;
  border-radius: 8px;
  color: ${({ danger }) => (danger ? "#dc2626" : "#2563eb")};
  transition: all 0.15s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
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
  border-radius: 18px;
  width: 100%;
  max-width: 520px;
  max-height: 80vh;
  padding: 24px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  position: sticky;
  top: 0;
  background: white;
  z-index: 10;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
  }

  span {
    font-size: 13px;
    color: #64748b;
  }
`;

export const CloseBtn = styled.button`
  background: #f1f5f9;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  color: #64748b;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  overflow-y: auto;
  max-height: 60vh;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7d2fe;
    border-radius: 10px;
  }
`;

/* ================= DETAILS ================= */

export const DetailRow = styled.div<{ full?: boolean }>`
  display: grid;
  grid-template-columns: ${({ full }) =>
    full ? "1fr" : "120px 1fr"};
  gap: 12px;
  background: #f8fafc;
  padding: 12px 14px;
  border-radius: 10px;
`;

export const DetailLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #475569;
`;

export const DetailValue = styled.span`
  font-size: 14px;
  color: #0f172a;
  word-break: break-word;
`;