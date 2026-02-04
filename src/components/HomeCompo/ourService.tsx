import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ServiceContainer, ServiceCard, Title } from "./style";

/* ================= TYPES ================= */

interface Service {
  _id: string;
  title: string;
  description: string;
}

/* ================= COMPONENT ================= */

const OurService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  /* ================= FETCH SERVICES ================= */

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/service`)
      .then((res) => setServices(res.data.data || []))
      .catch((err) =>
        console.error("Failed to fetch services for OurService", err)
      );
  }, []);

  return (
    <ServiceContainer>
      <Title>Our Core Services</Title>

      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard
            key={service._id}
            onClick={() => navigate(`/service?id=${service._id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* Keep icons static or enhance later */}
            <div className="icon">
              {index === 0 && "🛡️"}
              {index === 1 && "🔐"}
              {index === 2 && "🤖"}
              {index === 3 && "📡"}
              {index === 4 && "📊"}
              {index === 5 && "👨‍💻"}
            </div>

            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </ServiceCard>
        ))}
      </div>
    </ServiceContainer>
  );
};

export default OurService;
