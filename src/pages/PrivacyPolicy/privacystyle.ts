// import styled from 'styled-components';
// import background from '../../assets/bg-hero.png';

// export const Heading = styled.div`
//   background: url(${background}) no-repeat center center;
//   background-color: rgb(31, 101, 206);
//   background-size: cover;
//   text-align: center;
//   padding: 50px 0;

//   @media screen and (max-width: 1024px) { /* Laptop */
//     padding: 40px 0;
//   }

//   @media screen and (max-width: 768px) { /* Mobile */
//     padding: 30px 0;
//   }
// `;

// export const Title = styled.h2`
//   color: white;
//   font-size: 36px;

//   @media screen and (max-width: 1024px) { /* Laptop */
//     font-size: 32px;
//   }

//   @media screen and (max-width: 768px) { /* Mobile */
//     font-size: 28px;
//   }
// `;

// export const PolicyContent = styled.div`
//   max-width: 92%;
//   margin: 0 auto;
//   padding: 10px;
//   line-height: 1.6;

//   @media screen and (max-width: 1024px) { /* Laptop */
//     max-width: 95%;
//     padding: 8px;
//   }

//   @media screen and (max-width: 768px) { /* Mobile */
//     max-width: 98%;
//     padding: 6px;
//   }
// `;

// export const SubHeading = styled.h4`
//   margin-top: 20px;
//   color: rgb(31, 101, 206);
//   font-size: 40px;
//   font-weight: 500;

//   @media screen and (max-width: 1024px) { /* Laptop */
//     font-size: 36px;
//   }

//   @media screen and (max-width: 768px) { /* Mobile */
//     font-size: 28px;
//     margin-top: 15px;
//   }
// `;

// export const Paragraph = styled.p`
//   margin-bottom: 8px;
//   color: black;
//   padding: 8px;
//   text-align: justify;
//   font-family: 'Uni Neue';
//   line-height: 1.4;
//   font-size: 23px;

//   @media screen and (max-width: 1024px) { /* Laptop */
//     font-size: 16px;
//     padding: 8px;
//   }

//   @media screen and (max-width: 768px) { /* Mobile */
//     font-size: 14px;
//     padding: 6px;
//   }
// `;

// export const H6 = styled.h6`
//   margin-top: 30px;
//   margin-bottom: 40px;
//   font-size: 22px;
//   padding: 6px;
//   color: black;
//   text-align: center;
//   line-height: 1.5;

//   @media screen and (max-width: 1024px) { /* Laptop */
//     font-size: 20px;
//     margin-bottom: 30px;
//   }

//   @media screen and (max-width: 768px) { /* Mobile */
//     font-size: 18px;
//     margin-top: 20px;
//     margin-bottom: 20px;
//   }
// `;


import styled from 'styled-components';
import background from '../../assets/bg-hero.png';

export const Heading = styled.div`
  background: linear-gradient(135deg, rgba(31, 101, 206, 0.9), rgba(10, 80, 180, 0.9)), 
              url(${background}) no-repeat center center;
  background-size: cover;
  text-align: center;
  padding: 60px 0;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 42px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;

  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const PolicyContent = styled.div`
  max-width: 85%;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  line-height: 1.8;

  @media screen and (max-width: 1024px) {
    max-width: 90%;
    padding: 16px;
  }

  @media screen and (max-width: 768px) {
    max-width: 95%;
    padding: 12px;
  }
`;

export const SubHeading = styled.h4`
  margin-top: 30px;
  color: rgb(31, 101, 206);
  font-size: 28px;
  font-weight: 600;
  border-left: 5px solid rgb(31, 101, 206);
  padding-left: 15px;

  @media screen and (max-width: 1024px) {
    font-size: 24px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-top: 20px;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 16px;
  color: #333;
  padding: 12px;
  text-align: justify;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  font-size: 18px;

  @media screen and (max-width: 1024px) {
    font-size: 16px;
    padding: 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const H6 = styled.h6`
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 20px;
  padding: 10px;
  color: #555;
  text-align: center;
  line-height: 1.6;
  border-bottom: 2px solid rgb(31, 101, 206);

  @media screen and (max-width: 1024px) {
    font-size: 18px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
