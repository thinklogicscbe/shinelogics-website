import React from "react";
import { SectionContainer, ImageContainer, FormContainer } from './style';

const Contact = () => {
  return (
    <SectionContainer>
      <ImageContainer>
        <img src="/img/Aiimage/AI.jpg" alt="AI Tech" />
      </ImageContainer>

      <FormContainer>
        <span>AI.Tech</span>
        <h1>Artificial Intelligence for Your Business Contact PAGE</h1>
        <form>
          <label>
            FullName<span>*</span>
          </label>
          <input type="text" id="name" placeholder="Enter your FullName" required />
          <label>
            Email<span>*</span>
          </label>
          <input type="email" placeholder="Enter your Email" required />
          <label>
            Phone Number<span>*</span>
          </label>
          <input type="number" placeholder="Enter your number" required />
          <label>
            Message<span>*</span>
          </label>
          <textarea placeholder="Write your Queries " required />
          <button type="submit">Send ✉️ </button>
        </form>
      </FormContainer>
    </SectionContainer>
  );
};

export default Contact;
