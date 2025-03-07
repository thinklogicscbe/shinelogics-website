import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f0f8ff; /* Light blue background */
  padding: 20px;

  @media (max-width: 768px) {
    height: auto; /* Allow height to adjust dynamically */
    padding: 10px; /* Reduce padding for smaller screens */
    align-items: flex-start; /* Align content to the top for better spacing */
  }
`;


export const FormWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #0077b6; /* Blue color */
  margin-bottom: 20px;
`;

export const ScrollableForm = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
`;

export const InputField = styled.input`
  width: 100%; /* Make input field take full width */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const StyledPhoneInput = styled(PhoneInput)`
  margin-top: 17px;
  .form-control {
    width: 100%;  /* Adjust width */
    padding: 21px; /* Adjust padding */
    font-size: 16px; /* Adjust font size */
    border-radius: 6px; /* Rounded corners */
    border: 1px solid #ccc; /* Border styling */
    outline: none;
    
    &:focus {
      border-color: #007bff; /* Change border color on focus */
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  .flag-dropdown {
    border-radius: 6px 0 0 6px; /* Adjust flag dropdown border-radius */
    border-right: 1px solid #ccc; 
  }
`;

export const SelectField = styled.select`
  width: 100%; /* Make select field take full width */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0077b6; /* Blue background */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #005f87; /* Darker blue on hover */
  }
`;

export const FormGroup = styled.div`
  margin-top: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  span {
    color: red; /* Set red color for the * */
  }
`;

export const FileInputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 5px;
`;

// Style for the row of fields (2 per row)
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Add space between fields */
  margin-bottom: 15px;

  div {
    flex: 1; /* Make fields take equal width */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px; /* Reduce gap between fields in mobile view */
  }
`;

export const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 5px;
`;
