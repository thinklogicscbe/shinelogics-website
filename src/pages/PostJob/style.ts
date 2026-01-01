import styled from "styled-components";

/* PAGE CONTAINER */
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

/* HEADINGS */
export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  margin-top: 30px;
`;

export const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 24px;
`;

/* FORM */
export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormColumn = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 14px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
