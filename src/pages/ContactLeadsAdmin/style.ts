import styled from "styled-components";

/* ================= BREAKPOINTS ================= */
const breakpoints = {
  sm: "480px",
  md: "768px",
};

/* ================= PAGE ================= */

export const Page = styled.div`
  padding: 40px;

  @media (max-width: ${breakpoints.md}) {
    padding: 24px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }
`;

/* ================= PAGE TITLE ================= */

export const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0b1d45;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: ${breakpoints.md}) {
    font-size: 1.7rem;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 1.4rem;
  }
`;

/* ================= GRID ================= */

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

/* ================= CARD ================= */

export const LeadCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.14);
  }
`;

/* ================= CARD HEADER ================= */

export const LeadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const LeadName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const LeadDate = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
`;

/* ================= CARD ROW ================= */

export const LeadRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 10px;
  font-size: 14px;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

export const LeadLabel = styled.span`
  font-weight: 700;
  color: #475569;
  font-size: 13px;
`;

export const LeadValue = styled.span`
  color: #0f172a;
  word-break: break-word;
`;
