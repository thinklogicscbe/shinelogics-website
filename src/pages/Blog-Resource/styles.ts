import styled from "styled-components";

/* ===== Layout ===== */

export const PageSection = styled.section`
  padding: 6rem 6%;
  background: linear-gradient(180deg, #f8fafc, #ffffff);
  font-family: "Poppins", sans-serif;
`;

/* ===== Header ===== */

export const Header = styled.div`
  max-width: 800px;
  margin-bottom: 4rem;
`;

export const Title = styled.h2`
  font-size: 2.6rem;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== Cards ===== */

export const Card = styled.div`
  padding: 2.6rem;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.12);
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.06);
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 35px 75px rgba(2, 6, 23, 0.12);
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.8rem;
  color: #020617;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #64748b;
`;

/* ===== List ===== */

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  position: relative;
  padding-left: 26px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #475569;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.4rem;
    color: #2563eb;
  }
`;

/* ===== CTA ===== */

export const CTASection = styled.div`
  margin-top: 6rem;
  padding: 4.5rem 2rem;
  border-radius: 32px;
  background: linear-gradient(135deg, #020617, #1e40af);
  color: #ffffff;
  text-align: center;
  box-shadow: 0 40px 90px rgba(2, 6, 23, 0.35);

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color : white;
  }
`;

export const CTAButton = styled.button`
  padding: 1rem 3.5rem;
  border-radius: 60px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: #020617;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 45px rgba(255, 255, 255, 0.35);
  }
`;
