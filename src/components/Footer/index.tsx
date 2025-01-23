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
  FooterBottom,
  SocialMediaIcon
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

          <SocialMediaIcon>
            <div className="socialmediaicon">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/facebook-icon(1).png" alt="Facebook"  />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width={30} height={30} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/linkedin_icon(2) (1).png" alt="LinkedIn"   />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/twitter-icon_1_-removebg-preview.png" alt="Twitter"  />
              </a>
            </div>
          </SocialMediaIcon>

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
