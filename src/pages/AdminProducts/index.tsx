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
  GalleryRow,
  GalleryThumb,
  VideoInfo,
  CardActions,
  ActionButton,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  CloseButton,
} from "./style";

import { uploadFileToS3 } from "../API/s3Upload";

/* ================= TYPES ================= */

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

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const [existingBanner, setExistingBanner] = useState("");
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [existingVideos, setExistingVideos] = useState<string[]>([]);

  const [whatItDoes, setWhatItDoes] = useState<string[]>([""]);
  const [poweredBy, setPoweredBy] = useState<string[]>([""]);
  const [businessValue, setBusinessValue] = useState<string[]>([""]);

  /* ================= FETCH ================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setProducts(res.data.result || []);
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
    setExistingBanner("");
    setExistingGallery([]);
    setExistingVideos([]);
    setWhatItDoes([""]);
    setPoweredBy([""]);
    setBusinessValue([""]);
    setEditingProduct(null);
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

    setExistingBanner(p.bannerImage);
    setExistingGallery(p.galleryImages || []);
    setExistingVideos(p.videos || []);

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
    try {
      let bannerUrl = existingBanner;
      if (bannerImage) {
        bannerUrl = await uploadFileToS3(bannerImage);
      }

      const uploadedGallery = await Promise.all(
        galleryImages.map(uploadFileToS3),
      );

      const uploadedVideos = await Promise.all(videos.map(uploadFileToS3));

      const payload = {
        title,
        slug,
        description,
        bannerImage: bannerUrl,
        galleryImages: [...existingGallery, ...uploadedGallery],

        // ✅ FIX: new videos FIRST
        videos: [...uploadedVideos, ...existingVideos],

        whatItDoes,
        poweredBy,
        businessValue,
      };

      if (editingProduct) {
        await axios.put(`${API_BASE}/${editingProduct._id}`, payload);
      } else {
        await axios.post(API_BASE, payload);
      }

      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch {
      alert("Failed to save product");
    }
  };

  /* ================= DYNAMIC LIST ================= */

  const renderDynamicList = (
    label: string,
    values: string[],
    setValues: (v: string[]) => void,
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

  /* ================= UI ================= */

  return (
    <PageWrapper>
      <HeaderBar>
        <CreateButton
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Create Product
        </CreateButton>
      </HeaderBar>

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Slug"
              />
            </FormGrid>

            <textarea
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
                setGalleryImages(
                  e.target.files ? Array.from(e.target.files) : [],
                )
              }
            />

            <label>Videos</label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setVideos(e.target.files ? Array.from(e.target.files) : [])
              }
            />

            {renderDynamicList("What It Does", whatItDoes, setWhatItDoes)}
            {renderDynamicList("Powered By", poweredBy, setPoweredBy)}
            {renderDynamicList(
              "Business Value",
              businessValue,
              setBusinessValue,
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

                {p.galleryImages?.length > 0 && (
                  <GalleryRow>
                    {p.galleryImages.slice(0, 4).map((img) => (
                      <GalleryThumb
                        key={img}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    ))}
                  </GalleryRow>
                )}

                {p.videos?.length > 0 && (
                  <>
                    <VideoInfo>🎥 {p.videos.length} video(s)</VideoInfo>

                    {/* ✅ FIX: key forces reload */}
                    <video
                      key={p.videos[0]}
                      src={p.videos[0]}
                      controls
                      style={{ width: "100%", marginTop: 10 }}
                    />
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
