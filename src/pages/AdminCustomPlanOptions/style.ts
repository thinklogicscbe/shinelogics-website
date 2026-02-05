import styled from "styled-components";

/* ================================
   PAGE LAYOUT
================================ */

export const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0b1d45;
`;

/* ================================
   CREATE BUTTON
================================ */

export const CreateButton = styled.button`
  background: #0b1d45;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0.7rem 1.3rem;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(11, 29, 69, 0.35);
  }
`;

/* ================================
   FORM
================================ */

export const Form = styled.form`
  background: #ffffff;
  border-radius: 22px;
  padding: 2.2rem;
  margin-bottom: 3rem;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1.4rem;
`;

export const FieldGroup = styled.div`
  display: grid;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 800;
  color: #374151;
  letter-spacing: 0.02em;
`;

export const Input = styled.input`
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

export const SubmitButton = styled.button`
  margin-top: 0.8rem;
  padding: 0.85rem;
  border-radius: 14px;
  border: none;
  background: #0b1d45;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(11, 29, 69, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* ================================
   FEEDBACK MESSAGES
================================ */

export const SuccessText = styled.p`
  color: #16a34a;
  font-weight: 800;
  margin-bottom: 1rem;
`;

export const ErrorText = styled.p`
  color: #dc2626;
  font-weight: 800;
  margin-bottom: 1rem;
`;

/* ================================
   CARDS GRID
================================ */

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ================================
   ADMIN CARD
================================ */

export const AdminCard = styled.div<{ accent?: string }>`
  position: relative;
  padding: 2rem;
  border-radius: 22px;
  background: #ffffff;

  border: 2px solid
    ${({ accent }) =>
      accent === "green"
        ? "#22c55e"
        : accent === "blue"
        ? "#6366f1"
        : accent === "gold"
        ? "#facc15"
        : "#e5e7eb"};

  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.18);
  }
`;

/* ================================
   CARD CONTENT
================================ */

export const CardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 900;
  color: #111827;
  margin-bottom: 0.4rem;
`;

export const CardPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 900;
  color: #0b1d45;
  margin-bottom: 1.2rem;
`;

/* ================================
   CARD ACTIONS
================================ */

export const CardActions = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const EditButton = styled.button`
  flex: 1;
  background: #e0e7ff;
  color: #3730a3;
  border: none;
  border-radius: 10px;
  padding: 0.45rem;
  font-size: 0.75rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c7d2fe;
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 10px;
  padding: 0.45rem;
  font-size: 0.75rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fecaca;
  }
`;


export const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  gap: 0.8rem;
  align-items: end;
`;

export const AddRowButton = styled.button`
  background: #f3f4f6;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  width: fit-content;
`;

export const RemoveRowButton = styled.button`
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 900;
  cursor: pointer;
  height: 38px;
`;
