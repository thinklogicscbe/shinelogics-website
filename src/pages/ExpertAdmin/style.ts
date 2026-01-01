import styled from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  padding: 3rem 4%;
  background: #f8fafc;
  min-height: 100vh;
`;

/* ================= HEADER ================= */

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;

  /* Tablet */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  /* Mobile */
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.9rem;
  font-weight: 700;
  color: #020617;
  line-height: 1.2;

  /* Tablet */
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  /* Mobile */
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const CreateButton = styled.button`
  padding: 0.7rem 1.6rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
  }

  /* Tablet */
  @media (max-width: 768px) {
    align-self: stretch;
    text-align: center;
  }

  /* Mobile */
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.95rem;
  }
`;
/* ================= GRID & CARD ================= */

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  padding: 1.8rem;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 35px 70px rgba(2, 6, 23, 0.12);
  }

  img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 700;
  color: #020617;
  margin-top: 0.6rem;
`;

export const CardText = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 0.2rem;
`;

/* ================= ACTIONS ================= */

export const CardActions = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  flex: 1;
  padding: 0.55rem 0;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 0.55rem 0;
  border-radius: 8px;
  border: 1px solid #2563eb;
  background: #ffffff;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
`;

export const DangerButton = styled.button`
  flex: 1;
  padding: 0.55rem 0;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
`;

/* ================= MODAL ================= */

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Modal = styled.div`
  background: #ffffff;
  border-radius: 22px;
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  box-shadow: 0 50px 120px rgba(2, 6, 23, 0.35);
`;

export const ModalTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1.8rem;
  color: #020617;
`;

/* ================= FORM ================= */

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;
