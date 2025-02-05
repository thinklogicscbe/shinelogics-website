import React, { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { uploadPdfToS3 } from "../../components/AWS/aws"; 
import {
  FormContainer,
  FormWrapper,
  FormTitle,
  InputField,
  SelectField,
  SubmitButton,
  ScrollableForm,
  FormGroup,
  Label,
  FileInputField,
  ErrorMessage,
  Row,
} from "./style";

const ApplyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Simple validation: Check file size (5MB limit) and type (PDF)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"].includes(file.type)) {
      alert("Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed.");
      return;
    }

    const fileUpload = {
      name: file.name,
      type: file.type,
      content: file, 
    };

    setUploading(true);

    try {
      const uploadedUrl = await uploadPdfToS3(fileUpload);
      console.log(uploadedUrl,"uploadedUrl");
      
      setResumeUrl(uploadedUrl);
      setValue("resumeUrl", uploadedUrl); // set resume URL in form data
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: any) => {
    if (!resumeUrl) {
      alert("Please upload your resume before submitting.");
      return;
    }

    const formData = { ...data, resumeUrl };
    console.log("Submitted Data:", formData);
    // You can perform your API call here to submit form data
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
                  {...register("firstName", { required: "First Name is required" })}
                />
                {errors.firstName && (
                  <ErrorMessage>{(errors.firstName as FieldError).message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">
                  Last Name <span>*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", { required: "Last Name is required" })}
                />
                {errors.lastName && (
                  <ErrorMessage>{(errors.lastName as FieldError).message}</ErrorMessage>
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
                  placeholder="Date of Birth"
                  {...register("dob", { required: "Date of Birth is required" })}
                />
                {errors.dob && (
                  <ErrorMessage>{(errors.dob as FieldError).message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label htmlFor="gender">
                  Gender <span>*</span>
                </Label>
                <SelectField {...register("gender", { required: "Gender is required" })}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </SelectField>
                {errors.gender && (
                  <ErrorMessage>{(errors.gender as FieldError).message}</ErrorMessage>
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
                  {...register("email", { required: "Email Address is required" })}
                />
                {errors.email && (
                  <ErrorMessage>{(errors.email as FieldError).message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label htmlFor="phone">
                  Phone Number <span>*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", { required: "Phone Number is required" })}
                />
                {errors.phone && (
                  <ErrorMessage>{(errors.phone as FieldError).message}</ErrorMessage>
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
              {resumeUrl && <p>Uploaded: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
              {errors.resume && (
                <ErrorMessage>{(errors.resume as FieldError).message}</ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit Application"}
            </SubmitButton>
          </form>
        </ScrollableForm>
      </FormWrapper>
    </FormContainer>
  );
};

export default ApplyForm;
