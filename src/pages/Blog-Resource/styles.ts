import styled from "styled-components";

/* ===== Layout ===== */
export const PageSection = styled.section`
  padding: 5rem 6%;
  background: radial-gradient(circle at top, #eef2ff, #ffffff);
  font-family: "Poppins", sans-serif;
`;

/* ===== Header ===== */
export const Header = styled.div`
  max-width: 760px;
  margin-bottom: 4rem;
`;

export const Title = styled.h2`
  font-size: 2.7rem;
  font-weight: 800;
  color: #020617;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
`;

/* ===== Grid ===== */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.2rem;
`;

/* ===== Card ===== */
export const Card = styled.div`
  position: relative;
  padding: 2.4rem 2.2rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 18px 45px rgba(2, 6, 23, 0.08);
  transition: all 0.35s ease;

  /* Accent strip */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 6px;
    border-radius: 22px 0 0 22px;
    background: linear-gradient(180deg, #6366f1, #22d3ee);
  }

  &:hover {
    box-shadow: 0 35px 90px rgba(79, 70, 229, 0.25);
  }
`;

/* ===== Card Content ===== */
export const CardTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #020617;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #475569;
  margin-bottom: 1.2rem;
`;

/* ===== List ===== */
export const List = styled.ul`
  padding-left: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #334155;

  &::before {
    content: "✔";
    color: #6366f1;
    font-weight: 700;
    margin-top: 2px;
  }
`;

/* ===== CTA Section ===== */
export const CTASection = styled.div`
  margin-top: 6rem;
  padding: 4rem 2rem;
  border-radius: 28px;
  background: linear-gradient(135deg, #020617, #1e3a8a);
  color: white;
  text-align: center;
  box-shadow: 0 45px 95px rgba(2, 6, 23, 0.45);

  h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ffffff;
  }
`;

/* ===== CTA Button ===== */
export const CTAButton = styled.button`
  padding: 1rem 3.2rem;
  border-radius: 999px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: #020617;
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 45px rgba(255, 255, 255, 0.4);
  }
`;
