import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, FieldError } from "react-hook-form";
import { uploadPdfToS3 } from "../../components/AWS/aws";
import { createForm } from "../API/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FormContainer,
  FormWrapper,
  FormTitle,
  InputField,
  StyledPhoneInput,
  SelectField,
  SubmitButton,
  ScrollableForm,
  FormGroup,
  Label,
  FileInputField,
  ErrorMessage,
  Row,
  SuccessMessage, 
} from "./style";

const ApplyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const location = useLocation();
  const jobId = location.state?.jobId;
  console.log("JobID",jobId);
  
  

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Simple validation: Check file size (5MB limit) and type (PDF, DOC, DOCX, TXT)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ].includes(file.type)
    ) {
      toast.error(
        "Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed."
      );
      return;
    }

    setUploading(true);

    try {
      const uploadedUrl = await uploadPdfToS3({
        name: file.name,
        type: file.type,
        content: file,
      });

      setValue("resume", uploadedUrl);
      setResumeUploaded(true); // Indicate successful upload
    } catch (error) {
      console.error("File upload failed:", error);
      setResumeUploaded(false);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!resumeUploaded) {
      toast.error("Please upload your resume before submitting.");
      return;
    }
    if (!data.phone || data.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
  
    try {
      const response = await createForm({
        ...data,
        jobId: jobId, // Ensure jobId is explicitly passed
        resume: data.resume,
      });
  
      if (response?.success) {
        toast.success("Application submitted successfully!");
        setSubmitted(true);
      } else {
        toast.error(
          response?.message || "Failed to submit application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <FormContainer>
      <FormWrapper>
        <FormTitle>Become a Part of the AI Revolution</FormTitle>
        <ScrollableForm>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <div>
                <Label htmlFor="firstName">
                  First Name <span>*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <ErrorMessage>
                    {(errors.firstName as FieldError).message}
                  </ErrorMessage>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">
                  Last Name <span>*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <ErrorMessage>
                    {(errors.lastName as FieldError).message}
                  </ErrorMessage>
                )}
              </div>
            </Row>

            <Row>
              <div>
                <Label htmlFor="dob">
                  Date of Birth <span>*</span>
                </Label>
                <InputField
                  type="date"
                  {...register("dob", {
                    required: "Date of Birth is required",
                  })}
                />
                {errors.dob && (
                  <ErrorMessage>
                    {(errors.dob as FieldError).message}
                  </ErrorMessage>
                )}
              </div>

              <div>
                <Label htmlFor="gender">
                  Gender <span>*</span>
                </Label>
                <SelectField
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </SelectField>
                {errors.gender && (
                  <ErrorMessage>
                    {(errors.gender as FieldError).message}
                  </ErrorMessage>
                )}
              </div>
            </Row>

            <Row>
              <div>
                <Label htmlFor="email">
                  Email Address <span>*</span>
                </Label>
                <InputField
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                />
                {errors.email && (
                  <ErrorMessage>
                    {(errors.email as FieldError).message}
                  </ErrorMessage>
                )}
              </div>

              <div>
                <Label htmlFor="phone">
                  Phone Number <span>*</span>
                </Label>
                <StyledPhoneInput
                  country={"in"} // Default country set to India
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  value={watch("phone")} 
                  onChange={(value: unknown) => setValue("phone", value as string)}
                  enableSearch={true}
                />
                {errors.phone && (
                  <ErrorMessage>
                    {(errors.phone as FieldError).message}
                  </ErrorMessage>
                )}
              </div>
            </Row>

            <FormGroup>
              <Label htmlFor="resume">
                Resume <span>*</span>
              </Label>
              <FileInputField
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
              />
              {uploading && <p>Uploading...</p>}
              {resumeUploaded && (
                <SuccessMessage>Uploaded Successfully!!!</SuccessMessage>
              )}
              {errors.resume && (
                <ErrorMessage>
                  {(errors.resume as FieldError).message}
                </ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={uploading || submitted}>
              {submitted ? "Submitted" : "Submit Application"}
            </SubmitButton>
          </form>
        </ScrollableForm>
      </FormWrapper>
    </FormContainer>
  );
};

export default ApplyForm;
