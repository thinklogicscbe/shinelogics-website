import React, { useEffect, useState } from "react";
import {
  Overlay,
  Modal,
  ModalHeader,
  CloseBtn,
  Form,
  FieldGroup,
  Label,
  Input,
  OptionsGrid,
  OptionCard,
  OptionTitle,
  OptionPrice,
  Checkbox,
  TotalBar,
  SubmitButton,
  SuccessText,
  ErrorText,
} from "./style";

/* ================= TYPES ================= */

type CustomPlanOption = {
  _id: string;
  title: string;
  price: number;
};

type SelectedOption = {
  optionId: string;
  title: string;
  price: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

/* ================= UTILS ================= */

// Indian thousand separator
const formatCurrency = (value: number) =>
  value.toLocaleString("en-IN");

const CustomPlanForm: React.FC<Props> = ({ open, onClose }) => {
  const [options, setOptions] = useState<CustomPlanOption[]>([]);
  const [selected, setSelected] = useState<SelectedOption[]>([]);

  const [form, setForm] = useState({
    candidateName: "",
    district: "",
    constituency: "",
    party: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const OPTIONS_API = `${process.env.REACT_APP_BACKEND_URL}/custom-plan-options`;
  const LEAD_API = `${process.env.REACT_APP_BACKEND_URL}/custom-plan-leads`;

  /* ================= LOAD OPTIONS ================= */

  useEffect(() => {
    if (!open) return;

    const fetchOptions = async () => {
      try {
        const res = await fetch(OPTIONS_API);
        const data = await res.json();
        setOptions(data.data || []);
      } catch {
        setError("Failed to load plan options");
      }
    };

    fetchOptions();
  }, [open]);

  /* ================= HANDLERS ================= */

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleOption = (opt: CustomPlanOption) => {
    setSelected((prev) => {
      const exists = prev.find((o) => o.optionId === opt._id);
      if (exists) {
        return prev.filter((o) => o.optionId !== opt._id);
      }
      return [
        ...prev,
        {
          optionId: opt._id,
          title: opt.title,
          price: opt.price,
        },
      ];
    });
  };

  const totalPrice = selected.reduce((sum, o) => sum + o.price, 0);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (selected.length === 0) {
        throw new Error("Please select at least one plan option");
      }

      const res = await fetch(LEAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: form.candidateName,
          district: form.district,
          constituency: form.constituency,
          party: form.party,
          selectedOptions: selected,
          totalPrice, // clean number
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setSuccess("Your custom plan request has been submitted successfully!");
      setForm({
        candidateName: "",
        district: "",
        constituency: "",
        party: "",
      });
      setSelected([]);

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  /* ================= UI ================= */

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <h3>Custom Campaign Plan</h3>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </ModalHeader>

        {success && <SuccessText>{success}</SuccessText>}
        {error && <ErrorText>{error}</ErrorText>}

        <Form onSubmit={handleSubmit}>
          {/* CANDIDATE DETAILS */}
          <FieldGroup>
            <Label>Candidate Name</Label>
            <Input
              name="candidateName"
              value={form.candidateName}
              onChange={handleInput}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>District</Label>
            <Input
              name="district"
              value={form.district}
              onChange={handleInput}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Constituency</Label>
            <Input
              name="constituency"
              value={form.constituency}
              onChange={handleInput}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Party</Label>
            <Input
              name="party"
              value={form.party}
              onChange={handleInput}
              required
            />
          </FieldGroup>

          {/* OPTIONS */}
          <ModalHeader>
            <h3>Select Plan Options</h3>
          </ModalHeader>

          <OptionsGrid>
            {options.map((opt) => {
              const checked = selected.some(
                (s) => s.optionId === opt._id
              );

              return (
                <OptionCard
                  key={opt._id}
                  active={checked}
                  onClick={() => toggleOption(opt)}
                >
                  <Checkbox type="checkbox" checked={checked} readOnly />
                  <div>
                    <OptionTitle>{opt.title}</OptionTitle>
                    <OptionPrice>
                      ₹ {formatCurrency(opt.price)}
                    </OptionPrice>
                  </div>
                </OptionCard>
              );
            })}
          </OptionsGrid>

          {/* TOTAL */}
          <TotalBar>
            <span>Total</span>
            <strong>₹ {formatCurrency(totalPrice)}</strong>
          </TotalBar>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Custom Plan"}
          </SubmitButton>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default CustomPlanForm;
