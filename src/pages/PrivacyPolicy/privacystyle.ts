import styled from 'styled-components';
import background from '../../assets/bg-hero.png';

export const Heading = styled.div`
  background: url(${background}) no-repeat center center;
  background-color: rgb(31, 101, 206);
  background-size: cover;
  text-align: center;
  padding: 50px 0;

  @media screen and (max-width: 1024px) { /* Laptop */
    padding: 40px 0;
  }

  @media screen and (max-width: 768px) { /* Mobile */
    padding: 30px 0;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: 36px;

  @media screen and (max-width: 1024px) { /* Laptop */
    font-size: 32px;
  }

  @media screen and (max-width: 768px) { /* Mobile */
    font-size: 28px;
  }
`;

export const PolicyContent = styled.div`
  max-width: 92%;
  margin: 0 auto;
  padding: 10px;
  line-height: 1.6;

  @media screen and (max-width: 1024px) { /* Laptop */
    max-width: 95%;
    padding: 8px;
  }

  @media screen and (max-width: 768px) { /* Mobile */
    max-width: 98%;
    padding: 6px;
  }
`;

export const SubHeading = styled.h4`
  margin-top: 20px;
  color: rgb(31, 101, 206);
  font-size: 40px;
  font-weight: 500;

  @media screen and (max-width: 1024px) { /* Laptop */
    font-size: 36px;
  }

  @media screen and (max-width: 768px) { /* Mobile */
    font-size: 28px;
    margin-top: 15px;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 15px;
  color: black;
  padding: 10px;
  text-align: justify;
  font-family: 'Uni Neue';
  line-height: 1.8;
  font-size: 23px;

  @media screen and (max-width: 1024px) { /* Laptop */
    font-size: 16px;
    padding: 8px;
  }

  @media screen and (max-width: 768px) { /* Mobile */
    font-size: 14px;
    padding: 6px;
  }
`;

export const H6 = styled.h6`
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 22px;
  padding: 6px;
  color: black;
  text-align: center;
  line-height: 1.5;

  @media screen and (max-width: 1024px) { /* Laptop */
    font-size: 20px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) { /* Mobile */
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
