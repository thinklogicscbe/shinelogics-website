import styled from "styled-components";

/* ================================
   PAGE WRAPPER
================================ */

export const PageWrapper = styled.div`
  padding: 16px;
  background: #f8fafc;
  min-height: 100vh;

  @media (min-width: 640px) {
    padding: 24px;
  }

  @media (min-width: 1024px) {
    padding: 28px;
  }
`;

/* ================================
   HEADER BAR
================================ */

export const HeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

/* ================================
   CREATE BUTTON
================================ */

export const CreateButton = styled.button`
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
  }
`;

/* ================================
   CREATE / EDIT FORM CARD
================================ */

export const CreateFormCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 18px;
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;

  @media (min-width: 640px) {
    padding: 24px;
  }

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    color: #0f172a;
  }

  textarea {
    width: 100%;
    min-height: 110px;
    margin: 12px 0;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    padding: 10px;
    font-size: 14px;
  }

  input {
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    padding: 10px;
    font-size: 14px;
  }

  label {
    font-size: 12px;
    font-weight: 600;
    color: #475569;
    margin-top: 10px;
    display: block;
  }
`;

/* ================================
   FORM GRID
================================ */

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  input {
    font-size: 14px;
    padding: 10px 12px;
  }

  .small-title {
    font-size: 12px;
    font-weight: 500;
  }
`;

/* ================================
   DYNAMIC LIST
================================ */

export const DynamicList = styled.div`
  margin-top: 18px;
`;

export const DynamicRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  input {
    flex: 1;
    min-width: 180px;
  }

  button {
    border: none;
    background: #f1f5f9;
    border-radius: 8px;
    cursor: pointer;
    padding: 6px 10px;
    font-weight: 600;
  }
`;

export const AddRowButton = styled.button`
  background: #f1f5f9;
  border: 1px dashed #cbd5f5;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
`;

/* ================================
   FORM ACTIONS
================================ */

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;

  button {
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }

  .save {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    box-shadow: 0 6px 14px rgba(37, 99, 235, 0.25);
  }
`;

/* ================================
   PRODUCT GRID
================================ */

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
`;

/* ================================
   PRODUCT CARD
================================ */

export const ProductCard = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.12);
  border: 1px solid #e5e7eb;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 46px rgba(15, 23, 42, 0.18);
  }
`;

export const ProductBanner = styled.div`
  height: 160px;
  background-size: cover;
  background-position: center;
  background-color: #f1f5f9;
`;

export const ProductBody = styled.div`
  padding: 18px;
`;

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }
`;

export const SlugText = styled.div`
  font-size: 12px;
  color: #64748b;
  font-weight: bold;
`;

export const DescriptionText = styled.p`
  font-size: 13px;
  color: #0f172a;
  margin: 10px 0 14px;
  line-height: 1.5;
  font-weight: bold;
`;

/* ================================
   STATUS
================================ */

export const StatusBadge = styled.span<{ active: boolean }>`
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ active }) => (active ? "#dcfce7" : "#fee2e2")};
  color: ${({ active }) => (active ? "#166534" : "#991b1b")};
`;

/* ================================
   SECTIONS
================================ */

export const Section = styled.div`
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px dashed #e5e7eb;

  ul {
    margin: 8px 0 0 16px;
    padding: 0;
  }

  li {
    font-size: 12.5px;
    color: #0f172a;
    margin-bottom: 5px;
    line-height: 1.4;
    font-weight: bold;
  }
`;

export const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

/* ================================
   GALLERY
================================ */

export const GalleryRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 14px;
  flex-wrap: wrap;
`;

export const GalleryThumb = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  border: 1px solid #e5e7eb;
`;

/* ================================
   VIDEO INFO
================================ */

export const VideoInfo = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #1d4ed8;
  font-weight: 700;
`;

/* ================================
   CARD ACTIONS
================================ */

export const CardActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed #e5e7eb;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ variant?: "edit" | "delete" }>`
  flex: 1;
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;

  background: ${({ variant }) =>
    variant === "delete" ? "#fee2e2" : "#e0e7ff"};

  color: ${({ variant }) =>
    variant === "delete" ? "#991b1b" : "#1e3a8a"};

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

/* ================================
   MODAL
================================ */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 12px;
  z-index: 9999;
  overflow-y: auto;

  @media (min-width: 640px) {
    padding: 40px 16px;
  }
`;

export const ModalCard = styled(CreateFormCard)`
  width: 100%;
  max-width: 900px;
  margin: 0;
  animation: slideUp 0.25s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  border: none;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 6px 10px;
  font-weight: 800;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #e2e8f0;
  }
`;
