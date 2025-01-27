import React from "react";
import { Link } from "react-router-dom";

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
  SocialIcons,
} from "./styles";

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterColumn>
          <FooterTitle>Shinelogics</FooterTitle>
          <FooterText>
            Shinelogics is a global leader in{" "}
            <HighlightedText>AI-powered solutions</HighlightedText>, dedicated
            to transforming businesses with cutting-edge technology.
          </FooterText>
          <SocialIcons>
            <a href="https://www.facebook.com/share/1YHbrEVKhb/">
              <img src="/img/socialmediaimg/facebook.png" alt="" />
            </a>
            <a href="https://www.instagram.com/shinelogicschennai?igsh=OXkycHRoZWxtbmNs">
              <img src="/img/socialmediaimg/social.png" alt="" />
            </a>
            <a href="https://www.linkedin.com/company/shinelogics-pvt-ltd/">
              <img src="/img/socialmediaimg/linkedin.png" alt="" />
            </a>
            <a href="https://x.com/shinelogic?t=WWH5qEbodqxZwAdmbIWxvA&s=09">
              <img src="/img/socialmediaimg/twitter.png" alt="" />
            </a>
            <a href="https://youtube.com/@shinelogicsinfotech3857?si=hy7SKoSgFf7WpMT_ ">
              <img src="/img/socialmediaimg/youtube.png" alt="you tube" />
            </a>
          </SocialIcons>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Explore</FooterTitle>
          <FooterLink as={Link} to="/home">
            Home
          </FooterLink>
          <FooterLink as={Link} to="/about">
            About
          </FooterLink>
          <FooterLink as={Link} to="/service">
            Services
          </FooterLink>
          <FooterLink as={Link} to="/portfolio">
            Portfolio
          </FooterLink>
          <FooterLink as={Link} to="/team">
            Team
          </FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Privacy Policy</FooterTitle>
          <FooterLink as={Link} to="/privacyPolicy">Privacy Policy</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Get in Touch</FooterTitle>
          <FooterContactInfo>
            <div>3rd Floor, KJ Aditya Towers, Chennai-600042</div>
            <div>+91-9500037221</div>
            <div>info@shinelogics.com</div>
          </FooterContactInfo>
        </FooterColumn>
      </FooterContainer>
      <FooterBottom>&copy; 2025 Shinelogics. All Rights Reserved.</FooterBottom>
    </FooterSection>
  );
};

export default Footer;
