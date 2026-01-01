import { Link } from "react-router-dom";
import {
  FooterSection,
  FooterContainer,
  FooterColumn,
  FooterTitle,
  FooterLink,
  FooterText,
  FooterContactInfo,
  FooterBottom,
  SocialIcons,
  HighlightedText,
  NewsletterBox,
  NewsletterInput,
  SubscribeButton,
} from "./styles";

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>

        {/* ===== Brand & Social ===== */}
        <FooterColumn>
          <FooterTitle>Shinelogics</FooterTitle>
          <FooterText>
            Secure, <HighlightedText>Intelligent</HighlightedText>, and future-ready
            technology solutions designed for modern businesses.
          </FooterText>

          <SocialIcons>
            <a href="https://www.linkedin.com/company/shinelogics-pvt-ltd/" target="_blank">LinkedIn</a>
            <a href="https://x.com/shinelogic" target="_blank">Twitter</a>
            <a href="https://github.com" target="_blank">GitHub</a>
            <a href="https://www.instagram.com/shinelogicschennai" target="_blank">Instagram</a>
          </SocialIcons>
        </FooterColumn>

        {/* ===== Quick Links ===== */}
        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink as={Link} to="/">Home</FooterLink>
          <FooterLink as={Link} to="/about">About Us</FooterLink>
          <FooterLink as={Link} to="/service">Services</FooterLink>
          {/* <FooterLink as={Link} to="/industries">Industries</FooterLink> */}
          <FooterLink as={Link} to="/Blog-Resource">Resources & Blog</FooterLink>
          <FooterLink as={Link} to="/career">Careers</FooterLink>
          <FooterLink as={Link} to="/contact">Contact Us</FooterLink>
          <FooterLink as={Link} to="/privacyPolicy">Privacy Policy</FooterLink>
          <FooterLink as={Link} to="/terms">Terms & Conditions</FooterLink>
        </FooterColumn>

        {/* ===== Newsletter ===== */}
        <FooterColumn>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>
            Stay updated with the latest in secure technology and AI innovation.
          </FooterText>

          <NewsletterBox>
            <NewsletterInput type="email" placeholder="Enter your email" />
            <SubscribeButton>Subscribe</SubscribeButton>
          </NewsletterBox>
        </FooterColumn>

        {/* ===== Contact ===== */}
        <FooterColumn>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterContactInfo>
            <div>Chennai, India</div>
            <div>+91-9500037221</div>
            <div>support@shinelogics.com</div>
          </FooterContactInfo>
        </FooterColumn>

      </FooterContainer>

      {/* ===== Bottom Bar ===== */}
      <FooterBottom>
        © 2025 Shinelogics — Secure, Intelligent, Future-Ready Technology Solutions  
        <br />
        Designed for Modern Businesses | Security First | Innovation Always
      </FooterBottom>
    </FooterSection>
  );
};

export default Footer;
