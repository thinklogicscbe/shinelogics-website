import React, { useEffect, useState, useCallback } from "react";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  CreateButton,
  CardsGrid,
  AdminCard,
  CardTitle,
  CardPrice,
  CardActions,
  EditButton,
  DeleteButton,
  Form,
  FieldGroup,
  Label,
  Input,
  SubmitButton,
  SuccessText,
  ErrorText,
  AddRowButton,
  RowGrid,
  RemoveRowButton,
} from "./style";

type CustomPlanOption = {
  _id: string;
  title: string;
  price: number;
  isActive: boolean;
};

type OptionRow = {
  title: string;
  price: string;
};

const AdminCustomPlanOptions: React.FC = () => {
  const [options, setOptions] = useState<CustomPlanOption[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [rows, setRows] = useState<OptionRow[]>([
    { title: "", price: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const API = `${process.env.REACT_APP_BACKEND_URL}/custom-plan-options`;

  /* ================= LOAD ================= */

const fetchOptions = useCallback(async () => {
  try {
    const res = await fetch(API);
    const data = await res.json();
    setOptions(data.data || []);
  } catch (error) {
    console.error("Failed to load custom plan options", error);
  }
}, [API]); // include dependencies used inside

useEffect(() => {
  fetchOptions();
}, [fetchOptions]);
  /* ================= ROW HANDLERS ================= */

  const handleRowChange = (
    index: number,
    field: "title" | "price",
    value: string
  ) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { title: "", price: "" }]);
  };

  const removeRow = (index: number) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  /* ================= EDIT ================= */

  const handleEdit = (opt: CustomPlanOption) => {
    setRows([{ title: opt.title, price: String(opt.price) }]);
    setEditingId(opt._id);
    setShowForm(true);
    setSuccess("");
    setError("");
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // EDIT MODE
      if (editingId) {
        const row = rows[0];
        await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: row.title,
            price: Number(row.price),
          }),
        });

        setSuccess("Option updated successfully!");
      }
      // CREATE MODE (bulk)
      else {
        for (const row of rows) {
          if (!row.title || !row.price) continue;

          await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: row.title,
              price: Number(row.price),
            }),
          });
        }

        setSuccess("Multiple options created successfully!");
      }

      setRows([{ title: "", price: "" }]);
      setEditingId(null);
      setShowForm(false);
      fetchOptions();
    } catch {
      setError("Failed to save option(s)");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this option?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchOptions();
  };

  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Custom Plan Options</PageTitle>
        <CreateButton
          onClick={() => {
            setShowForm((p) => !p);
            setEditingId(null);
            setRows([{ title: "", price: "" }]);
          }}
        >
          {showForm ? "Close" : "+ Add Options"}
        </CreateButton>
      </PageHeader>

      {success && <SuccessText>{success}</SuccessText>}
      {error && <ErrorText>{error}</ErrorText>}

      {showForm && (
        <Form onSubmit={handleSubmit}>
          {rows.map((row, index) => (
            <RowGrid key={index}>
              <FieldGroup>
                <Label>Option Title</Label>
                <Input
                  value={row.title}
                  onChange={(e) =>
                    handleRowChange(index, "title", e.target.value)
                  }
                  placeholder="e.g. Last 4 election strategy"
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={row.price}
                  onChange={(e) =>
                    handleRowChange(index, "price", e.target.value)
                  }
                  placeholder="e.g. 50000"
                  required
                />
              </FieldGroup>

              {!editingId && (
                <RemoveRowButton
                  type="button"
                  onClick={() => removeRow(index)}
                >
                  ✕
                </RemoveRowButton>
              )}
            </RowGrid>
          ))}

          {!editingId && (
            <AddRowButton type="button" onClick={addRow}>
              + Add Another Option
            </AddRowButton>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingId
              ? "Update Option"
              : "Create All Options"}
          </SubmitButton>
        </Form>
      )}

      <CardsGrid>
        {options.map((opt) => (
          <AdminCard key={opt._id} accent="blue">
            <CardTitle>{opt.title}</CardTitle>
            <CardPrice>₹ {opt.price.toLocaleString()}</CardPrice>

            <CardActions>
              <EditButton onClick={() => handleEdit(opt)}>
                Edit
              </EditButton>
              <DeleteButton onClick={() => handleDelete(opt._id)}>
                Delete
              </DeleteButton>
            </CardActions>
          </AdminCard>
        ))}
      </CardsGrid>
    </PageWrapper>
  );
};

export default AdminCustomPlanOptions;
