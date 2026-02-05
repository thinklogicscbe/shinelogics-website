import styled from "styled-components";

/* ===============================
   OVERLAY + MODAL (PREMIUM)
================================ */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(
    circle at top,
    rgba(11, 29, 69, 0.85),
    rgba(0, 0, 0, 0.85)
  );
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const Modal = styled.div`
  background: linear-gradient(180deg, #ffffff, #f8fafc);
  border-radius: 28px;
  width: 100%;
  max-width: 920px;
  max-height: 92vh;
  overflow-y: auto;
  padding: 2.5rem 2.8rem;
  box-shadow:
    0 60px 160px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.4);
  position: relative;
`;

/* ===============================
   HEADER
================================ */

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-size: 1.6rem;
    font-weight: 900;
    color: #0b1d45;
    letter-spacing: -0.01em;
  }
`;

export const CloseBtn = styled.button`
  border: none;
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #7f1d1d;
  border-radius: 12px;
  padding: 0.45rem 0.7rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(220, 38, 38, 0.25);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(220, 38, 38, 0.35);
  }
`;

/* ===============================
   FORM LAYOUT
================================ */

export const Form = styled.form`
  display: grid;
  gap: 1.6rem;
`;

export const FieldGroup = styled.div`
  display: grid;
  gap: 0.45rem;
`;

export const Label = styled.label`
  font-size: 0.78rem;
  font-weight: 900;
  color: #374151;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1.5px solid #e5e7eb;
  font-size: 0.95rem;
  background: #ffffff;
  transition: all 0.25s ease;

  &:focus {
    outline: none;
    border-color: #0b1d45;
    box-shadow:
      0 0 0 3px rgba(11, 29, 69, 0.15),
      0 6px 20px rgba(11, 29, 69, 0.15);
  }
`;

/* ===============================
   OPTIONS (PREMIUM CARDS)
================================ */

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-top: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const OptionCard = styled.div<{ active?: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.2rem 1.3rem;
  border-radius: 20px;

  border: 2px solid
    ${({ active }) => (active ? "#0b1d45" : "#e5e7eb")};

  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, #eef2ff, #e0e7ff)"
      : "linear-gradient(180deg, #ffffff, #f9fafb)"};

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  box-shadow: ${({ active }) =>
    active
      ? "0 20px 50px rgba(11,29,69,0.25)"
      : "0 10px 25px rgba(0,0,0,0.08)"};

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18);
  }
`;

export const Checkbox = styled.input`
  margin-top: 6px;
  transform: scale(1.15);
`;

export const OptionTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 900;
  color: #111827;
  margin-bottom: 0.3rem;
`;

export const OptionPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 900;
  color: #0b1d45;
  background: rgba(11, 29, 69, 0.08);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  display: inline-block;
`;

/* ===============================
   TOTAL BAR (PREMIUM)
================================ */

export const TotalBar = styled.div`
  margin-top: 1.2rem;
  padding: 1.2rem 1.4rem;
  border-radius: 20px;

  background: linear-gradient(135deg, #0b1d45, #1e3a8a);
  color: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.05rem;
  font-weight: 900;

  box-shadow: 0 20px 50px rgba(11, 29, 69, 0.45);

  span {
    opacity: 0.9;
  }

  strong {
    font-size: 1.2rem;
    letter-spacing: 0.02em;
  }
`;

/* ===============================
   SUBMIT + FEEDBACK
================================ */

export const SubmitButton = styled.button`
  margin-top: 1.4rem;
  padding: 1rem;
  border-radius: 18px;
  border: none;

  background: linear-gradient(135deg, #0b1d45, #1e40af);
  color: #ffffff;

  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  cursor: pointer;
  transition: all 0.3s ease;

  box-shadow: 0 18px 50px rgba(11, 29, 69, 0.45);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 28px 70px rgba(11, 29, 69, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SuccessText = styled.p`
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #065f46;
  font-weight: 900;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(22, 163, 74, 0.25);
`;

export const ErrorText = styled.p`
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #7f1d1d;
  font-weight: 900;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.25);
`;
