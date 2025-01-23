import React, { ChangeEvent } from "react";
import { SectionContainer, ImageContainer, FormContainer } from './style';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';

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

        <Box component="form" noValidate autoComplete="off">
          {/* FullName Field */}
          <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="name">FullName<span>*</span></InputLabel>
            <FilledInput id="name" placeholder="Enter your FullName" required />
          </FormControl>

          {/* Email Field */}
          <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email">Email<span>*</span></InputLabel>
            <FilledInput id="email" placeholder="Enter your Email" required />
            <FormHelperText>Please enter a valid email address.</FormHelperText>
          </FormControl>

          {/* Phone Number Field */}
          <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="phone-number">Phone Number<span>*</span></InputLabel>
            <FilledInput
              id="phone-number"
              type="text"
              placeholder="Enter your number"
              onInput={handleNumberInput}
              required
            />
            <FormHelperText>Max 10 digits.</FormHelperText>
          </FormControl>

          {/* Message Field */}
          <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="message">Message<span>*</span></InputLabel>
            <FilledInput
              id="message"
              placeholder="Write your Queries"
              multiline
              rows={4}
              required
            />
          </FormControl>

          <button type="submit">Send ✉️</button>
        </Box>
      </FormContainer>
    </SectionContainer>
  );
};

export default Contact;
