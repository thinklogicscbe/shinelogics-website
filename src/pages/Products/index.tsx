import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BannerContainer } from "./style";

type Product = {
  title: string;
  slug: string;
  bannerImage: string;
  description: string;
  videos: string[];              // ✅ ADD THIS
  whatItDoes: string[];
  poweredBy: string[];
  businessValue: string[];
};

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/products`;

const ProductDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
  }, [slug]);

  const fetchProductBySlug = async (slug: string) => {
    try {
      setLoading(true);
      setNotFound(false);

      const res = await axios.get(`${API_BASE}/${slug}`);
      setProduct(res.data.result);
    } catch (error) {
      console.error("Failed to load product", error);
      setNotFound(true);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 40 }}>Loading product...</p>;
  }

  if (notFound || !product) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or is inactive.</p>
      </div>
    );
  }

  return (
    <BannerContainer>
      {/* ================= BANNER ================= */}
      <div className="heading-container">
        <div
          className="heading-banner"
          style={{ backgroundImage: `url(${product.bannerImage})` }}
        >
          {/* ===== HEADING CONTENT ===== */}
          <div className="heading-content">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* ================= VIDEO (PLACED AFTER heading-content) ================= */}
          {product.videos?.length > 0 && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <video
                src={product.videos[0]}   // ✅ First video
                controls
                style={{
                  width: "80%",
                  maxWidth: "900px",
                  borderRadius: "12px",
                  background: "#000",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
              />
            </div>
          )}

      {/* ================= FEATURES ================= */}
      <div className="features-container erp-layout">
        <div className="erp-sections">
          {/* WHAT IT DOES */}
          {product.whatItDoes?.length > 0 && (
            <div className="erp-section">
              <h3>What It Does</h3>
              <ul>
                {product.whatItDoes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* POWERED BY */}
          {product.poweredBy?.length > 0 && (
            <div className="erp-section">
              <h3>Powered By</h3>
              <ul>
                {product.poweredBy.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* BUSINESS VALUE */}
          {product.businessValue?.length > 0 && (
            <div className="erp-section">
              <h3>Business Value</h3>
              <ul className="check-list">
                {product.businessValue.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </BannerContainer>
  );
};

export default ProductDynamic;
