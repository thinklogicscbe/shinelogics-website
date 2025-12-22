import styled from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  width: 100%;
  padding: 80px 6%;
  font-family: "Poppins", sans-serif;
  background: #ffffff;
`;

/* ================= HEADER ================= */

export const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  color: #111827;
`;

export const Subtitle = styled.p`
  margin-top: 14px;
  font-size: 1.1rem;
  color: #4b5563;
`;

/* ================= INFO ================= */

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

export const InfoCard = styled.div`
  padding: 26px;
  border-radius: 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  text-align: center;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(99, 102, 241, 0.2);
  }
`;

export const InfoLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
`;

export const InfoValue = styled.div`
  margin-top: 8px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
`;

/* ================= FORM ================= */

export const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 70px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const TextArea = styled.textarea`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  grid-column: span 2;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const SubmitButton = styled.button`
  grid-column: span 2;
  padding: 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #4338ca);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 25px 70px rgba(99, 102, 241, 0.45);
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

/* ================= CTA ================= */

export const CTASection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const CTAButton = styled.button`
  padding: 16px 40px;
  border-radius: 999px;
  border: 2px solid #6366f1;
  background: transparent;
  color: #4338ca;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    background: #6366f1;
    color: #ffffff;
    box-shadow: 0 25px 70px rgba(99, 102, 241, 0.45);
  }
`;

/* ================= SOCIAL ================= */

export const SocialSection = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export const SocialLink = styled.a`
  font-weight: 600;
  color: #4f46e5;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
