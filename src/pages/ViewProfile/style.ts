import styled from "styled-components";

/* PAGE WRAPPER (SIDEBAR AWARE) */
export const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

/* HEADER */
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
`;

export const FilterWrapper = styled.div`
  width: 280px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

/* TABLE */
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
  background: white;
`;

export const Thead = styled.thead`
  background: #2563eb;
  color: white;
`;

export const Tbody = styled.tbody`
  tr:nth-child(even) {
    background: #f8fafc;
  }
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

export const Th = styled.th`
  padding: 14px;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  white-space: nowrap;
`;
