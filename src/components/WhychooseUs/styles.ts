import styled from "styled-components";

/* ===== Section ===== */

export const Section = styled.section`
  padding: 6rem 6%;
  background: linear-gradient(180deg, #ffffff, #f8fafc);
`;

/* ===== Header ===== */

export const Header = styled.div`
  max-width: 780px;
  margin-bottom: 4rem;
`;

export const Title = styled.h2`
  font-size: 2.6rem;
  margin-bottom: 1.2rem;
  color: #020617;
`;

export const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #475569;
`;

/* ===== Grid ===== */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== Card ===== */

export const Card = styled.div`
  position: relative;
  padding: 2.8rem 2.4rem;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.12);
  box-shadow: 0 22px 55px rgba(2, 6, 23, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 40px 90px rgba(2, 6, 23, 0.14);
  }
`;

/* ===== Number Badge ===== */

export const Number = styled.div`
  position: absolute;
  top: -16px;
  left: 24px;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.45rem 0.9rem;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
`;

/* ===== Text ===== */

export const CardTitle = styled.h4`
  margin-top: 1.2rem;
  margin-bottom: 0.7rem;
  font-size: 1.2rem;
  color: #020617;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #64748b;
`;
