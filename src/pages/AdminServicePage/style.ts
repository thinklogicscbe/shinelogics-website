import styled from "styled-components";

/* ================= LAYOUT ================= */

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 32px 40px;
  background: #f8f9fb;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Heading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const CreateButton = styled.button`
  background: #111827;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #1f2937;
  }
`;

/* ================= CARD GRID ================= */

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const ServiceCardBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 16px;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const ServiceImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const ServiceName = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
`;

export const ServiceDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
  flex-grow: 1;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
`;

export const ActionButton = styled.button<{ danger?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: ${({ danger }) => (danger ? "#dc2626" : "#2563eb")};
`;

/* ================= FORM PANEL ================= */

export const FormPanel = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-top: 24px;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

/* ================= FORM ================= */

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
`;

export const Field = styled.div`
  margin-bottom: 18px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 13px;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  min-height: 100px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

export const Divider = styled.hr`
  margin: 32px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

export const ExpertiseCard = styled.div`
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 16px;
  margin-bottom: 16px;
  background: #f9fafb;
`;

export const SmallButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 6px;
  background: #e5e7eb;
  border: none;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background: #111827;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
