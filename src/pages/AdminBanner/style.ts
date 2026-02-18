import styled from "styled-components";

/* ================================
   SPACER (REPLACES INLINE STYLES)
================================ */

export const Spacer30 = styled.div`
  margin-top: 30px;
`;

/* ================================
   SECTION TITLE
================================ */

export const SectionTitle = styled.h2`
  font-size: 1.45rem;
  font-weight: 700;
  color: #020617;
  margin-bottom: 1.5rem;

  @media (min-width: 480px) {
    font-size: 1.55rem;
  }

  @media (min-width: 768px) {
    font-size: 26px;
    margin-bottom: 1.75rem;
  }
`;

/* ================================
   PRIMARY ACTION BUTTON
================================ */

export const PrimaryActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 11px 18px;
  border-radius: 999px;
  border: none;
  cursor: pointer;

  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #ffffff;

  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;

  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.35);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 44px rgba(37, 99, 235, 0.5);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
  }

  @media (min-width: 768px) {
    padding: 12px 22px;
    font-size: 14px;
  }
`;

/* ================================
   FORM (EDITOR STYLE)
================================ */

export const FormBox = styled.form`
  position: relative;
  background: linear-gradient(180deg, #f8fafc, #ffffff);
  padding: 22px 18px 22px 26px;
  border-radius: 20px;
  margin-bottom: 3rem;
  display: grid;
  gap: 18px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);

  @media (min-width: 640px) {
    padding: 26px 24px 26px 32px;
  }

  @media (min-width: 768px) {
    padding: 32px 32px 32px 40px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 16px;
    bottom: 16px;
    width: 6px;
    border-radius: 6px;
    background: linear-gradient(180deg, #2563eb, #1e40af);
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #020617;

    @media (min-width: 768px) {
      font-size: 19px;
    }
  }

  input,
  textarea {
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid #cbd5f5;
    font-size: 14px;
    background: #ffffff;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
  }

  textarea {
    min-height: 110px;
    resize: vertical;
  }

  input[type="file"] {
    padding: 12px;
    background: #eef2ff;
    border-style: dashed;
    cursor: pointer;
  }

  button {
    margin-top: 18px;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #2563eb, #1e40af);
    color: white;
    font-weight: 600;
    font-size: 15px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 28px rgba(37, 99, 235, 0.45);
    }
  }
`;

/* ================================
   INPUT ROW
================================ */

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

/* ================================
   CARD GRID
================================ */

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  margin-top: 1.5rem;

  @media (min-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
`;

/* ================================
   CARD
================================ */

export const Card = styled.div`
  background: white;
  padding: 22px;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 30px 60px rgba(15, 23, 42, 0.15);
  }

  h3 {
    font-size: 15.5px;
    font-weight: 600;
    color: #020617;

    @media (min-width: 768px) {
      font-size: 17px;
    }
  }

  p {
    color: #475569;
    font-size: 14px;
    line-height: 1.6;
  }
`;

/* ================================
   VIDEO PREVIEW
================================ */

export const VideoPreview = styled.div`
  margin-top: 14px;
  border-radius: 14px;
  overflow: hidden;
  background: #000;

  video {
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }
`;

/* ================================
   CARD ACTIONS
================================ */

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 18px;

  button {
    flex: 1;
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  }

  .edit {
    background: #2563eb;
    color: white;
  }

  .delete {
    background: #dc2626;
    color: white;
  }
`;
