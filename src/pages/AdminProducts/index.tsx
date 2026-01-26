import { useEffect, useState } from "react";
import axios from "axios";
import {
  PageWrapper,
  HeaderBar,
  CreateButton,
  FormGrid,
  DynamicList,
  DynamicRow,
  AddRowButton,
  FormActions,
  ProductGrid,
  ProductCard,
  ProductBanner,
  ProductBody,
  StatusBadge,
  ProductHeader,
  SlugText,
  DescriptionText,
  Section,
  GalleryRow,
  GalleryThumb,
  VideoInfo,
  SectionTitle,
  CardActions,
  ActionButton,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  CloseButton,
} from "./style";

type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  galleryImages: string[];
  videos: string[];
  whatItDoes: string[];
  poweredBy: string[];
  businessValue: string[];
  isActive: boolean;
};

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/products`;

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const [whatItDoes, setWhatItDoes] = useState<string[]>([""]);
  const [poweredBy, setPoweredBy] = useState<string[]>([""]);
  const [businessValue, setBusinessValue] = useState<string[]>([""]);

  /* ================= FETCH ================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setProducts(res.data.result || []);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= RESET ================= */

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setBannerImage(null);
    setGalleryImages([]);
    setVideos([]);
    setWhatItDoes([""]);
    setPoweredBy([""]);
    setBusinessValue([""]);
    setEditingProduct(null);
  };

  /* ================= OPEN CREATE ================= */

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  /* ================= EDIT ================= */

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setShowModal(true);

    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setWhatItDoes(p.whatItDoes || [""]);
    setPoweredBy(p.poweredBy || [""]);
    setBusinessValue(p.businessValue || [""]);

    // ✅ Clear file inputs so backend doesn't get garbage
    setBannerImage(null);
    setGalleryImages([]);
    setVideos([]);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${API_BASE}/${id}`);
    fetchProducts();
  };

  /* ================= SAVE ================= */

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);

    if (bannerImage) formData.append("bannerImage", bannerImage);
    galleryImages.forEach((f) => formData.append("galleryImages", f));
    videos.forEach((v) => formData.append("videos", v));

    formData.append("whatItDoes", JSON.stringify(whatItDoes));
    formData.append("poweredBy", JSON.stringify(poweredBy));
    formData.append("businessValue", JSON.stringify(businessValue));

    if (editingProduct) {
      await axios.put(`${API_BASE}/${editingProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated");
    } else {
      await axios.post(API_BASE, formData);
      alert("Product created");
    }

    setShowModal(false);
    resetForm();
    fetchProducts();
  };

  /* ================= DYNAMIC LIST ================= */

  const renderDynamicList = (
    label: string,
    values: string[],
    setValues: (v: string[]) => void
  ) => (
    <DynamicList>
      <label>{label}</label>
      {values.map((val, i) => (
        <DynamicRow key={i}>
          <input
            value={val}
            onChange={(e) => {
              const copy = [...values];
              copy[i] = e.target.value;
              setValues(copy);
            }}
            placeholder={`Enter ${label}`}
          />
          <button
            onClick={() => setValues(values.filter((_, idx) => idx !== i))}
          >
            ✕
          </button>
        </DynamicRow>
      ))}
      <AddRowButton onClick={() => setValues([...values, ""])}>
        + Add {label}
      </AddRowButton>
    </DynamicList>
  );

  return (
    <PageWrapper>
      <HeaderBar>
        <CreateButton onClick={openCreate}>+ Create Product</CreateButton>
      </HeaderBar>

      {/* ================= MODAL ================= */}
      {showModal && (
        <ModalOverlay>
          <ModalCard>
            <ModalHeader>
              <h3>{editingProduct ? "Edit Product" : "Create Product"}</h3>
              <CloseButton
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                ✕
              </CloseButton>
            </ModalHeader>

            <FormGrid>
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </FormGrid>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Banner Image</label>
            <input
              type="file"
              onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
            />

            <label>Gallery Images</label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files || []))
              }
            />

            <label>Videos</label>
            <input
              type="file"
              multiple
              onChange={(e) => setVideos(Array.from(e.target.files || []))}
            />

            {renderDynamicList("What It Does", whatItDoes, setWhatItDoes)}
            {renderDynamicList("Powered By", poweredBy, setPoweredBy)}
            {renderDynamicList(
              "Business Value",
              businessValue,
              setBusinessValue
            )}

            <FormActions>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button className="save" onClick={handleSubmit}>
                {editingProduct ? "Update Product" : "Save Product"}
              </button>
            </FormActions>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* ================= CARDS ================= */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductGrid>
          {products.map((p) => (
            <ProductCard key={p._id}>
              <ProductBanner
                style={{ backgroundImage: `url(${p.bannerImage})` }}
              />

              <ProductBody>
                <ProductHeader>
                  <div>
                    <h3>{p.title}</h3>
                    <SlugText>/{p.slug}</SlugText>
                  </div>
                  <StatusBadge active={p.isActive}>
                    {p.isActive ? "Active" : "Inactive"}
                  </StatusBadge>
                </ProductHeader>

                <DescriptionText>{p.description}</DescriptionText>

                <Section>
                  <SectionTitle>What It Does</SectionTitle>
                  <ul>
                    {p.whatItDoes?.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </Section>

                <Section>
                  <SectionTitle>Powered By</SectionTitle>
                  <ul>
                    {p.poweredBy?.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </Section>

                <Section>
                  <SectionTitle>Business Value</SectionTitle>
                  <ul>
                    {p.businessValue?.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </Section>

                {p.galleryImages?.length > 0 && (
                  <GalleryRow>
                    {p.galleryImages.slice(0, 4).map((img, i) => (
                      <GalleryThumb
                        key={i}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    ))}
                  </GalleryRow>
                )}

                {p.videos?.length > 0 && (
                  <>
                    <VideoInfo>🎥 {p.videos.length} video(s)</VideoInfo>

                    {p.videos.slice(0, 1).map((videoUrl, i) => (
                      <video
                        key={i}
                        src={videoUrl}
                        controls
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          borderRadius: "10px",
                          background: "#000",
                        }}
                      />
                    ))}
                  </>
                )}

                <CardActions>
                  <ActionButton variant="edit" onClick={() => handleEdit(p)}>
                    ✏️ Edit
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleDelete(p._id)}
                  >
                    🗑 Delete
                  </ActionButton>
                </CardActions>
              </ProductBody>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </PageWrapper>
  );
};

export default AdminProducts;
