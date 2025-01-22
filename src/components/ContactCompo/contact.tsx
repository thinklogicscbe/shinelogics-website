import React, { ChangeEvent } from "react";
import { SectionContainer, ImageContainer, FormContainer } from './style';

const Contact: React.FC = () => {
  
  const handleNumberInput = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    value = value.slice(0, 10);
    event.target.value = value;
  };

  return (
    <SectionContainer>
      <ImageContainer>
        <img src="/img/Aiimage/AI.jpg" alt="AI Tech" />
      </ImageContainer>

      <FormContainer>
        <span>ShineLogics.AI</span>
        <h1>Please use this form to ask any inquiries that you may have.</h1>
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
          <input
            id="numberInput"
            type="text"
            placeholder="Enter your number"
            required
            onInput={handleNumberInput}  
          />
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
