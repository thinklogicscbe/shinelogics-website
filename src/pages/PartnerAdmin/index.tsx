import React, { useEffect, useState } from "react";
import axios from "axios";

/* ================= ANTD ================= */
import {
  Modal,
  Form,
  Input,
  Upload,
  Switch,
  Button,
  Popconfirm,
  message,
  Empty,
} from "antd";

/* ================= ICONS ================= */
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

/* ================= STYLES ================= */
import {
  Page,
  Header,
  PageTitle,
  CreateCard,
  CreateIcon,
  Grid,
  Card,
  LogoBox,
  Name,
  Desc,
  Preview,
  StyledModalWrapper,
  UploadButton,
  OrderBadge,
  CenteredActions,
} from "./style";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/partners`;

/* ================= TYPES ================= */

interface Partner {
  _id: string;
  name: string;
  description: string;
  logo: string;
  isActive: boolean;
  order: number;
}

/* ================= COMPONENT ================= */

const PartnerAdmin: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(API_URL);

      const apiData = res?.data?.result || res?.data?.data || [];

      const sortedData = Array.isArray(apiData)
        ? [...apiData].sort((a, b) => (a.order || 0) - (b.order || 0))
        : [];

      setPartners(sortedData);
    } catch {
      setPartners([]);
      message.error("Failed to load partners");
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (values: any) => {
    if (!logoUrl && !editing?.logo) {
      message.error("Logo is required");
      return;
    }

    setLoading(true);

    const payload = {
      ...values,
      order: Number(values.order) || 0,
      logo: logoUrl || editing?.logo,
    };

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing._id}`, payload);
        message.success("Partner updated");
      } else {
        await axios.post(API_URL, payload);
        message.success("Partner created");
      }

      closeModal();
      fetchPartners();
    } catch {
      message.error("Something went wrong");
    }

    setLoading(false);
  };

  /* ================= EDIT ================= */

  const handleEdit = (item: Partner) => {
    setEditing(item);
    setLogoUrl(item.logo);

    form.setFieldsValue({
      ...item,
      order: item.order ?? 0,
    });

    setModalOpen(true);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Partner deleted");
      fetchPartners();
    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= TOGGLE ACTIVE ================= */

  // const _toggleActive = async (id: string, checked: boolean) => {
  //   try {
  //     await axios.put(`${API_URL}/${id}`, { isActive: checked });

  //     setPartners((prev) =>
  //       prev.map((item) =>
  //         item._id === id ? { ...item, isActive: checked } : item,
  //       ),
  //     );
  //   } catch {
  //     message.error("Update failed");
  //   }
  // };

  /* ================= CLOSE ================= */

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setLogoUrl("");
    form.resetFields();
  };

  /* ================= RENDER ================= */

  return (
    <Page>
      <Header>
        <PageTitle>Partner Management</PageTitle>

        <CreateCard onClick={() => setModalOpen(true)}>
          <CreateIcon>
            <PlusOutlined />
          </CreateIcon>
          <span>Add Partner</span>
        </CreateCard>
      </Header>

      <Grid>
        {partners.length === 0 ? (
          <Empty description="No partners added yet" />
        ) : (
          partners.map((item) => (
            <Card key={item._id}>
              <OrderBadge>#{item.order || 0}</OrderBadge>

              <LogoBox>
                <img src={item.logo} alt={item.name} />
              </LogoBox>

              <Name>{item.name}</Name>
              <Desc>{item.description}</Desc>

              <CenteredActions>
                <Button size="small" onClick={() => handleEdit(item)}>
                  Edit
                </Button>

                <Popconfirm
                  title="Delete this partner?"
                  onConfirm={() => handleDelete(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </CenteredActions>
            </Card>
          ))
        )}
      </Grid>

      {/* ================= MODAL ================= */}

      <StyledModalWrapper>
        <Modal
          open={modalOpen}
          onCancel={closeModal}
          footer={null}
          centered
          destroyOnClose
          width={480}
          title={editing ? "Edit Partner" : "Create Partner"}
        >
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Partner Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter partner name" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} placeholder="Short description..." />
            </Form.Item>

            <Form.Item label="Logo">
              <Upload
                name="file"
                accept="image/*"
                showUploadList={false}
                customRequest={async ({ file, onSuccess, onError }) => {
                  const formData = new FormData();
                  formData.append("file", file as File);

                  try {
                    setUploading(true);

                    const res = await axios.post(
                      `${API_URL}/upload`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      },
                    );

                    const url = res?.data?.result?.url;

                    setLogoUrl(url);
                    message.success("Logo uploaded successfully");

                    onSuccess && onSuccess("ok");
                  } catch (err) {
                    message.error("Upload failed");
                    onError && onError(err as any);
                  } finally {
                    setUploading(false);
                  }
                }}
              >
                <UploadButton>
                  <UploadOutlined />
                  <span>{uploading ? "Uploading..." : "Upload Logo"}</span>
                </UploadButton>
              </Upload>

              {logoUrl && (
                <Preview>
                  <img src={logoUrl} alt="preview" />
                </Preview>
              )}
            </Form.Item>

            <Form.Item name="order" label="Order">
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Active"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={uploading || (!logoUrl && !editing)}
              block
              style={{ height: 44, borderRadius: 12 }}
            >
              {editing ? "Update Partner" : "Create Partner"}
            </Button>
          </Form>
        </Modal>
      </StyledModalWrapper>
    </Page>
  );
};

export default PartnerAdmin;