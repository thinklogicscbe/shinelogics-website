import React from 'react';
import { Heading, Title, PolicyContent, SubHeading, Paragraph, H6 } from './privacystyle';

const PrivacyPolicy = () => {
  return (
    <>
      <Heading>
        <Title>Privacy Policy</Title>
      </Heading>

      <PolicyContent>
        <H6>
          Shinelogics ("we," "our," or "us") respects your privacy and is committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
        </H6>
        <SubHeading> Information We Collect</SubHeading>
        <Paragraph><b>We may collect the following types of information</b></Paragraph>
        <Paragraph style={{ marginLeft: '2%' }}>
          Personal Information:
          Name, email address, phone number, and other contact details
          Business information if you inquire about our services
          <br></br>
          Non-Personal Information:
          IP address, browser type, and device information
          Website usage data through cookies and analytics tools
        </Paragraph>

        <SubHeading>How We Use Your Information</SubHeading>
        <Paragraph>
        <b>We use the collected information for</b>
        </Paragraph>
        <Paragraph style={{ marginLeft: '2%' }}>
        Providing and improving our services
        Responding to inquiries and customer support
        Sending updates and promotional content (only with consent)
        Ensuring website security and preventing fraud
                                                                                                                                                                    
        </Paragraph>

        <SubHeading>How We Share Your Information</SubHeading>
        <Paragraph><b>We do not sell or rent your personal data. However, we may share your information with</b></Paragraph>
        <Paragraph style={{ marginLeft: '2%' }}>
        Trusted third-party service providers (e.g., hosting, analytics)
        Legal authorities if required by law.
        </Paragraph>
        <SubHeading>
        Cookies and Tracking Technologies
        </SubHeading>

        <Paragraph>
        We use cookies to enhance your experience. You can manage or disable cookies through your browser settings.
        </Paragraph>
        <SubHeading>
        Data Security
        </SubHeading>
        <Paragraph>
        We implement security measures to protect your data, but no online platform is 100% secure.
        </Paragraph>
        <SubHeading>
        Your Rights
        </SubHeading>
        <Paragraph>
        <b>You have the right to</b>
        </Paragraph>
        <Paragraph style={{ marginLeft: '2%' }}>
        Access, update, or delete your data
        Opt-out of marketing communications
        Restrict or object to data processing
        For requests, contact us at [Insert Contact Email].

        </Paragraph>   
      </PolicyContent>
    </>
  );
};

export default PrivacyPolicy;
