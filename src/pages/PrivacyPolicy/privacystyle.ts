import styled from 'styled-components';
import background from '../../assets/bg-hero.png';


export const Heading = styled.div`
  background: url(${background}) no-repeat center center;
    background-color:  rgb(31, 101, 206) ;  
  background-size: cover;
  text-align: center;
  padding: 50px 0;
`;

export const Title = styled.h2`
 color:white;
`;

export const PolicyContent = styled.div`
   
  max-width: 92%;
  margin: 0 auto;
  padding: 2px;
  line-height: 1.6;
`;

export const SubHeading = styled.h4`
  margin-top: 20px;
  color:   rgb(31, 101, 206);
  font-size:40px;
  font-weight:500px;
`;

export const Paragraph = styled.p`
  margin-bottom: 15px;
   color:black;
  padding: 10px;  
  text-align: justify; 
  font-family:'Helvetica'; 
`;
export const H6 = styled.h6`
  margin-top:30px;
  margin-bottom: 40px;
  font-size: 22px; 
  padding:6px;
  color:black;
  text-align:center;
 line-height: 1.5;
`;
