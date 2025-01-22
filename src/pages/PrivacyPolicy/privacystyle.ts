import styled from 'styled-components';
import background from '../../assets/bg-hero.png';

// Styled components for PrivacyPolicy page
export const Heading = styled.div`
  background: url(${background}) no-repeat center center;
  background-size: cover;
  text-align: center;
  padding: 50px 0;
`;

export const Title = styled.h2`
  color: #333;
`;

export const PolicyContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
`;

export const SubHeading = styled.h4`
  margin-top: 20px;
  color: #666;
`;

export const Paragraph = styled.p`
  margin-bottom: 15px;
  padding: 10px; /* Add padding */
  text-align: justify; /* Justify content */
`;
