import styled from "styled-components";

/* ===== Section ===== */

export const Section = styled.section`
  padding: 6rem 6%;
  background: linear-gradient(180deg, #f8fafc, #ffffff);
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
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== Card ===== */

export const Card = styled.div`
  position: relative;
  padding: 3rem 2.6rem;
  border-radius: 26px;
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.12);
  box-shadow: 0 22px 55px rgba(2, 6, 23, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 45px 100px rgba(2, 6, 23, 0.14);
  }
`;

/* ===== Badge ===== */

export const Badge = styled.div`
  position: absolute;
  top: -18px;
  left: 26px;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.35);
`;

/* ===== Text ===== */

export const CardTitle = styled.h4`
  margin-top: 1.3rem;
  margin-bottom: 0.7rem;
  font-size: 1.25rem;
  color: #020617;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 1.2rem;
`;

/* ===== List ===== */

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 22px;
    margin-bottom: 0.7rem;
    font-size: 0.92rem;
    color: #475569;
    line-height: 1.6;
  }

  li::before {
    content: "✔";
    position: absolute;
    left: 0;
    top: 0;
    color: #2563eb;
    font-weight: 700;
  }
`;
