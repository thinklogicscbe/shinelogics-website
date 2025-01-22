import React from "react";
import {
  FooterSection,
  FooterContainer,
  FooterColumn,
  FooterTitle,
  FooterLink,
  FooterText,
  FooterContactInfo,
  HighlightedText,
  FooterBottom
} from "./styles";

const Footer = () => {
  return (
<FooterSection>
  <FooterContainer>
    <FooterColumn>
      <FooterTitle>Shinelogics</FooterTitle>
      <FooterText>
        Shinelogics is a global leader in <HighlightedText>AI-powered solutions</HighlightedText>, dedicated to transforming businesses with cutting-edge technology.
      </FooterText>
    </FooterColumn>
    <FooterColumn>
      <FooterTitle>Explore</FooterTitle>
      <FooterLink href="home">Home</FooterLink>
      <FooterLink href="About">About</FooterLink>
      <FooterLink href="Service">Services</FooterLink>
      <FooterLink href="#">Portfolio</FooterLink>
      <FooterLink href="#">Team</FooterLink>
    </FooterColumn>
    <FooterColumn>
      <FooterTitle>Privacy Policy</FooterTitle>
      <FooterLink href="privacyPolicy">Privacy Policy</FooterLink>
    </FooterColumn>
    <FooterColumn>
      <FooterTitle>Get in Touch</FooterTitle>
      <FooterContactInfo>
        <div>
          3rd Floor, KJ Aditya Towers, Chennai-600042
        </div>
        <div>
          +91-9500037221
        </div>
        <div>
          info@shinelogics.com
        </div>
      </FooterContactInfo>
    </FooterColumn>
  </FooterContainer>
  <FooterBottom>&copy; 2025 Shinelogics. All Rights Reserved.</FooterBottom>
</FooterSection>

  );
};

export default Footer;
