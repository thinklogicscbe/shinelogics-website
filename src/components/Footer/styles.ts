import styled from "styled-components";

export const FooterSection = styled.footer`
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #f0f0f0;
  padding: 4rem 2rem;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 3rem 1rem;
    overflow-x: hidden;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
    text-align: left; /* Ensure text aligns to the left */
    width: 100%;
  }
`;

export const FooterColumn = styled.div`
  flex: 1;
  margin: 0 1.5rem;
  box-sizing: border-box;
  max-width: 100%;

  @media screen and (max-width: 768px) {
    margin: 1.5rem 0;
    width: 100%;
  }
`;

export const FooterTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 700;
  color: #f0f0f0;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: #00d4ff;
    margin-top: 0.7rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    &::after {
      width: 30%;
      margin-left: 0; /* Align underline to the left */
    }
  }
`;

export const FooterText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #d1d1d1;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 768px) {
    font-size: 0.95rem;
    text-align: left; /* Ensure text aligns to the left */
  }
`;

export const FooterLink = styled.a`
  display: block;
  font-size: 1rem;
  color: #00d4ff;
  margin-bottom: 0.7rem;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #00ff99;
    transform: translateX(5px);
  }

  @media screen and (max-width: 768px) {
    font-size: 0.95rem;
    text-align: left; /* Align links to the left */
  }
`;

export const FooterContactInfo = styled.div`
  font-size: 1rem;
  color: #d1d1d1;
  margin: 1.5rem 0;

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.95rem;
    text-align: left;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-start; /* Align icons to the left */
  margin-top: 2rem;

  a {
    margin: 0 1rem 0 0; /* Adjust spacing for alignment */
    color: #f0f0f0;
    font-size: 1.8rem;
    display: flex; /* Flexbox to align image and text */
    align-items: center; /* Vertically align icons and text */
    transition: transform 0.3s ease, color 0.3s ease;

    img {
     border:2px solid white;
       border-radius:50%;
      width: 25px; 
      height: 25px; 
      margin-right: 0.5rem;  
    }

    &:hover {
      transform: scale(1.3);
      color: #00d4ff;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 1.5rem;
    a {
      font-size: 1.5rem;
      margin: 0 0.8rem 0 0;
      
      img {
        width: 20px; /* Adjust image size for smaller screens */
        height: 20px;
      }
    }
  }
`;


export const FooterBottom = styled.div`
  margin-top: 3rem;
  text-align: left; /* Align text to the left */
  font-size: 1rem;
  color: #8a8a8a;
  border-top: 1px solid #333;
  padding-top: 1.5rem;

  @media screen and (max-width: 768px) {
    margin-top: 2rem;
    font-size: 0.95rem;
  }
`;

export const HighlightedText = styled.span`
  color: #00ff99;
  font-weight: 700;
`;
 

