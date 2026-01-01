import styled from "styled-components";

export const FooterSection = styled.footer`
  background: linear-gradient(135deg, #020617, #0f172a);
  color: #e5e7eb;
  padding: 4.5rem 2rem;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterColumn = styled.div``;

export const FooterTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.4rem;
  color: #ffffff;

  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 3px;
    background: #38bdf8;
    margin-top: 0.6rem;
  }
`;

export const FooterText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #cbd5f5;
  margin-bottom: 1.4rem;
`;

export const FooterLink = styled.a`
  display: block;
  font-size: 0.95rem;
  color: #38bdf8;
  margin-bottom: 0.7rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #22c55e;
    transform: translateX(6px);
  }
`;

export const FooterContactInfo = styled.div`
  font-size: 0.95rem;
  color: #cbd5f5;

  div {
    margin-bottom: 0.7rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;

  a {
    font-size: 0.95rem;
    color: #e5e7eb;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #38bdf8;
    }
  }
`;

export const NewsletterBox = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
`;

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: none;
  outline: none;
`;

export const SubscribeButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  background: #38bdf8;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #22c55e;
  }
`;

export const FooterBottom = styled.div`
  margin-top: 3.5rem;
  padding-top: 1.6rem;
  border-top: 1px solid #1e293b;
  font-size: 0.9rem;
  color: #94a3b8;
  text-align: center;
`;

export const HighlightedText = styled.span`
  color: #22c55e;
  font-weight: 700;
`;
