import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
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
} from "./style";

interface ApplyFormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  resume: FileList;
}

const ApplyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ApplyFormData>({ mode: "onChange" });

  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const jobId = location.state?.jobId;
  const navigate = useNavigate();

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: ApplyFormData) => {
    if (!data.resume || data.resume.length === 0) {
      toast.error("Please upload your resume");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("dob", data.dob);
      formData.append("gender", data.gender);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("jobId", jobId);
      formData.append("resume", data.resume[0]); // 🔥 FILE

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/form/create`, // 🔁 change if needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        toast.success("Application submitted successfully!");
        setSubmitted(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(response.data?.message || "Submission failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <FormContainer>
      <FormWrapper>
        <FormTitle>Become a Part of the AI Revolution</FormTitle>

        <ScrollableForm>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <Row>
              <div>
                <Label>First Name *</Label>
                <InputField
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label>Last Name *</Label>
                <InputField
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                )}
              </div>
            </Row>

            {/* DOB + GENDER */}
            <Row>
              <div>
                <Label>Date of Birth *</Label>
                <InputField
                  type="date"
                  {...register("dob", { required: "DOB is required" })}
                />
                {errors.dob && (
                  <ErrorMessage>{errors.dob.message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label>Gender *</Label>
                <SelectField
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </SelectField>
                {errors.gender && (
                  <ErrorMessage>{errors.gender.message}</ErrorMessage>
                )}
              </div>
            </Row>

            {/* EMAIL + PHONE */}
            <Row>
              <div>
                <Label>Email *</Label>
                <InputField
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label>Phone *</Label>
                <StyledPhoneInput
                  country="in"
                  value={watch("phone")}
                  onChange={(value) =>
                    setValue("phone", value as string, {
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            </Row>

            {/* RESUME */}
            <FormGroup>
              <Label>Resume *</Label>
              <FileInputField
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("resume", {
                  required: "Resume is required",
                })}
              />
              {errors.resume && (
                <ErrorMessage>{errors.resume.message}</ErrorMessage>
              )}
            </FormGroup>

            {/* SUBMIT */}
            <SubmitButton
              type="submit"
              disabled={!isValid || uploading || submitted}
            >
              {submitted
                ? "Submitted"
                : uploading
                ? "Submitting..."
                : "Submit Application"}
            </SubmitButton>
          </form>
        </ScrollableForm>
      </FormWrapper>
    </FormContainer>
  );
};

export default ApplyForm;
