import styled from "styled-components";

/* ====== PAGE TITLE ====== */
export const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #020617;
  margin-bottom: 28px;
`;
/* ====== FORM ====== */
/* ====== FORM (EDITOR STYLE) ====== */
export const FormBox = styled.form`
  position: relative;
  background: linear-gradient(180deg, #f8fafc, #ffffff);
  padding: 32px 32px 32px 40px;
  border-radius: 20px;
  margin-bottom: 56px;
  display: grid;
  gap: 18px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);

  /* LEFT ACCENT BAR */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 20px;
    width: 6px;
    border-radius: 6px;
    background: linear-gradient(180deg, #2563eb, #1e40af);
  }

  h3 {
    font-size: 19px;
    font-weight: 600;
    color: #020617;
    margin-bottom: 6px;
  }

  input,
  textarea {
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid #cbd5f5;
    font-size: 14px;
    background: #ffffff;
    transition: border 0.2s, box-shadow 0.2s;

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
    letter-spacing: 0.2px;
    transition: transform 0.15s, box-shadow 0.15s;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 28px rgba(37, 99, 235, 0.45);
    }
  }
`;

/* ====== INPUT ROW ====== */
export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ====== CARDS GRID ====== */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
`;

/* ====== CARD ====== */
export const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 30px 60px rgba(15, 23, 42, 0.15);
  }

  h3 {
    font-size: 17px;
    font-weight: 600;
    color: #020617;
    margin-bottom: 8px;
  }

  p {
    color: #475569;
    font-size: 14px;
    line-height: 1.6;
  }
`;

/* ====== VIDEO PREVIEW ====== */
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

/* ====== CARD ACTIONS ====== */
export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  gap: 10px;

  button {
    flex: 1;
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .edit {
    background: #2563eb;
    color: white;

    &:hover {
      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.4);
    }
  }

  .delete {
    background: #dc2626;
    color: white;

    &:hover {
      box-shadow: 0 10px 22px rgba(220, 38, 38, 0.4);
    }
  }
`;
