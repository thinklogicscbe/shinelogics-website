import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceContainer, ServiceCard, Title } from "./style";

/* ================= TYPES ================= */

interface Product {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  icon?: string;
}

/* ================= HELPERS ================= */

/**
 * Approximate 2-line text limit (by characters)
 * 120 chars works well for most card widths
 */
const limitToTwoLines = (text: string, maxChars = 120) => {
  if (!text) return "";
  return text.length > maxChars
    ? text.slice(0, maxChars).trim() + "..."
    : text;
};

const Shineplatforms = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );
      const data = await res.json();
      setProducts(data.result || []);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  /* ================= RENDER ================= */

  return (
    <ServiceContainer>
      <Title>Our Platforms</Title>

      <div className="services-grid">
        {products.map((item) => (
          <ServiceCard
            key={item._id}
            onClick={() =>
              navigate(`/ProductCompo/${encodeURIComponent(item.slug)}`)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="icon">{item.icon || "🚀"}</div>

            <h3>{item.title}</h3>

            {item.subtitle && (
              <p style={{ fontWeight: 700 }}>
                {limitToTwoLines(item.subtitle)}
              </p>
            )}

            {item.description && (
              <p>
                {limitToTwoLines(item.description)}
              </p>
            )}
          </ServiceCard>
        ))}
      </div>
    </ServiceContainer>
  );
};

export default Shineplatforms;