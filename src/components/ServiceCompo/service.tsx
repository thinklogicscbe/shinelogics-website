import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import {
  SectionContainer,
  SliderContainer,
  ServiceBox,
  DetailsContainer,
  DescriptionRow,
  Title,
  DescriptionTitle,
  DescriptionText,
  DescriptionText1,
  DescriptionBox,
} from "./style";
import { serviceData } from "./servicesData";

const keys = [
  "web_development_services",
  "mobile_app_development_services",
  "cybersecurity_services",
  "data_analytics",
  "seo_optimization",
  "graphic_design_services",
];

const Service = () => {
  const location = useLocation(); // Get the current location object
  const [selectedServiceKey, setSelectedServiceKey] = useState<string>(keys[0]);
  const [selectedService, setSelectedService] = useState(serviceData[keys[0]]);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const service = queryParams.get("service");

    if (service && keys.includes(service)) {
      setSelectedServiceKey(service);
      setSelectedService(serviceData[service]);
    }
  }, [location]);

  const handleServiceClick = (key: string) => {
    setSelectedServiceKey(key);
    setSelectedService(serviceData[key]);
  };

  const handleWheel = (event: WheelEvent) => {
    if (sliderContainerRef.current) {
      // If the scroll is vertical (deltaY), scroll horizontally
      if (event.deltaY !== 0) {
        sliderContainerRef.current.scrollLeft += event.deltaY;
        event.preventDefault(); // Prevent the page from scrolling
      }

      // If the scroll is horizontal (deltaX), allow the default behavior
      if (event.deltaX !== 0) {
        sliderContainerRef.current.scrollLeft += event.deltaX;
      }
    }
  };

  useEffect(() => {
    const sliderContainer = sliderContainerRef.current;
    if (sliderContainer) {
      // Add event listener for mouse wheel
      sliderContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });

      return () => {
        // Cleanup event listener when the component unmounts
        sliderContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <SectionContainer>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "60px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        OUR SERVICES
      </h1>
      <SliderContainer ref={sliderContainerRef}>
        {keys.map((key, index) => (
          <div key={key} style={{ textAlign: "center", margin: "10px" }}>
            <ServiceBox
              onClick={() => handleServiceClick(key)}
              style={{
                position: "relative",
                overflow: "hidden",
                border:
                  selectedServiceKey === key
                    ? "2px solid #007bff"
                    : "1px solid #ddd",
                boxShadow:
                  selectedServiceKey === key
                    ? "0 2px 10px rgba(0, 123, 255, 0.2)"
                    : "none",
                transform:
                  selectedServiceKey === key ? "scale(1.05)" : "scale(1)",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                animationDelay: `${index * 0.1}s`, // Staggered delay based on index
              }}
            >
              <img
                src={serviceData[key].image}
                alt={serviceData[key].title}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </ServiceBox>

            <div
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                color: selectedServiceKey === key ? "#007bff" : "#000",
                textAlign: "center",
              }}
            >
              {serviceData[key].title}
            </div>
          </div>
        ))}
      </SliderContainer>

      <Title>{selectedService.title}</Title>
      <DescriptionText
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "18px",
          color: "#555",
        }}
      >
        {selectedService.description}
      </DescriptionText>
      <DetailsContainer>
        {Object.keys(selectedService.expertise).map((expertiseKey, idx) => {
          const expertise = selectedService.expertise[expertiseKey];
          const isEven = idx % 2 === 0; // Check if the index is even or odd
          const delay = `${idx * 0.1}s`; // Set delay based on index (e.g., 0s, 0.5s, 1s, 1.5s...)

          return (
            <DescriptionRow key={expertiseKey} delay={delay}>
              <DescriptionBox isEven={isEven}>
                <div style={{ flex: "1", paddingRight: "10px" }}>
                  <img
                    src={expertise.image}
                    alt={expertiseKey}
                    style={{
                      width: "100%",
                      height: "90%",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ flex: "1", paddingLeft: "10px" }}>
                  <DescriptionTitle>
                    {expertiseKey.replace(/_/g, " ")}
                  </DescriptionTitle>
                  <DescriptionText1>
                    {expertise.description.map((item, index) => (
                      <div key={index}>➤ {item}</div>
                    ))}
                  </DescriptionText1>
                </div>
              </DescriptionBox>
            </DescriptionRow>
          );
        })}
      </DetailsContainer>
    </SectionContainer>
  );
};

export default Service;
