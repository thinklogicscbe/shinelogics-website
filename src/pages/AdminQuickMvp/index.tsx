import React, { useEffect, useState , useCallback} from "react";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  CreateButton,
  CardsGrid,
  AdminCard,
  CardTitle,
  CardPrice,
  CardSubtitle,
  CardFeature,
  CardBadge,
  CardActions,
  EditButton,
  DeleteButton,
  Form,
  FieldGroup,
  Label,
  Input,
  Textarea,
  Select,
  CheckboxRow,
  FeatureRow,
  AddFeatureButton,
  RemoveFeatureButton,
  SubmitButton,
  SuccessText,
  ErrorText,
} from "./style";

type QuickMvpPlan = {
  _id: string;
  title: string;
  price: string;
  subtitle: string;
  accent: "green" | "blue" | "gold";
  featured: boolean;
  features: string[];
  cta: string;
  ghostCta?: string;
};

const AdminQuickMvp: React.FC = () => {
  const [plans, setPlans] = useState<QuickMvpPlan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    subtitle: "",
    accent: "green" as "green" | "blue" | "gold",
    featured: false,
    features: [""],
    cta: "",
    ghostCta: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

const API = `${process.env.REACT_APP_BACKEND_URL}/quick-mvp-plans`;


  // ================================
  // LOAD PLANS
  // ================================
  const fetchPlans = useCallback(async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPlans(data.data || []);
    } catch (err) {
      console.error("Failed to load Quick MVP plans");
    }
  }, [API]); // dependencies used inside function

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // ================================
  // FORM HANDLERS
  // ================================
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (index: number) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  // ================================
  // CREATE / UPDATE
  // ================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId ? `${API}/${editingId}` : API;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save plan");

      setSuccess(
        editingId ? "Plan updated successfully!" : "Plan created successfully!",
      );
      setShowForm(false);
      setEditingId(null);

      setForm({
        title: "",
        price: "",
        subtitle: "",
        accent: "green",
        featured: false,
        features: [""],
        cta: "",
        ghostCta: "",
      });

      fetchPlans();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // EDIT
  // ================================
  const handleEdit = (plan: QuickMvpPlan) => {
    setEditingId(plan._id);
    setShowForm(true);
    setForm({
      title: plan.title,
      price: plan.price,
      subtitle: plan.subtitle,
      accent: plan.accent,
      featured: plan.featured,
      features: plan.features.length ? plan.features : [""],
      cta: plan.cta,
      ghostCta: plan.ghostCta || "",
    });
  };

  // ================================
  // DELETE
  // ================================
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchPlans();
    } catch (err) {
      alert("Failed to delete plan");
    }
  };

  return (
    <PageWrapper>
      {/* HEADER */}
      <PageHeader>
        <PageTitle>Quick MVP Plans</PageTitle>
        <CreateButton
          onClick={() => {
            setShowForm((p) => !p);
            setEditingId(null);
          }}
        >
          {showForm ? "Close" : "+ Create Plan"}
        </CreateButton>
      </PageHeader>

      {success && <SuccessText>{success}</SuccessText>}
      {error && <ErrorText>{error}</ErrorText>}

      {/* FORM */}
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Price</Label>
            <Input
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Subtitle</Label>
            <Textarea
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Accent</Label>
            <Select name="accent" value={form.accent} onChange={handleChange}>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="gold">Gold</option>
            </Select>
          </FieldGroup>

          <CheckboxRow>
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            <Label>Featured Plan</Label>
          </CheckboxRow>

          <FieldGroup>
            <Label>Features</Label>
            {form.features.map((feature, index) => (
              <FeatureRow key={index}>
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  required
                />
                {form.features.length > 1 && (
                  <RemoveFeatureButton
                    type="button"
                    onClick={() => removeFeature(index)}
                  >
                    ✕
                  </RemoveFeatureButton>
                )}
              </FeatureRow>
            ))}
            <AddFeatureButton type="button" onClick={addFeature}>
              + Add Feature
            </AddFeatureButton>
          </FieldGroup>

          <FieldGroup>
            <Label>Primary CTA</Label>
            <Input
              name="cta"
              value={form.cta}
              onChange={handleChange}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Ghost CTA</Label>
            <Input
              name="ghostCta"
              value={form.ghostCta}
              onChange={handleChange}
            />
          </FieldGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Plan" : "Create Plan"}
          </SubmitButton>
        </Form>
      )}

      {/* CARDS */}
      <CardsGrid>
        {plans.map((plan) => (
          <AdminCard key={plan._id} accent={plan.accent}>
            {plan.featured && <CardBadge>FEATURED</CardBadge>}

            <CardTitle>{plan.title}</CardTitle>
            <CardPrice>{plan.price}</CardPrice>
            <CardSubtitle>{plan.subtitle}</CardSubtitle>

            {plan.features.map((f, i) => (
              <CardFeature key={i}>✓ {f}</CardFeature>
            ))}

            <CardActions>
              <EditButton onClick={() => handleEdit(plan)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDelete(plan._id)}>
                Delete
              </DeleteButton>
            </CardActions>
          </AdminCard>
        ))}
      </CardsGrid>
    </PageWrapper>
  );
};

export default AdminQuickMvp;
