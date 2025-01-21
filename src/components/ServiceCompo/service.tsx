import React, { useState, useRef, useEffect } from "react";
import {
  SectionContainer,
  SliderContainer,
  ServiceBox,
  DetailsContainer,
  DescriptionRow,
  Title,
  DescriptionTitle,
  DescriptionText,
  DescriptionImage,
  DescriptionBox,
  AdditionalContainers,
  ContainerBox,
  ContainerTitle,
  ContainerText,
} from "./style";
import aboutVideo from "../../assets/about-image/Employees_having_business_meeting.mp4_1736422910838.mp4"; // Your video import
import product from "../../assets/service/product.jpg";
import tech from "../../assets/service/techInovation.jpg";
import scalability from "../../assets/service/Scalability.jpg";



const serviceImages = [product, tech, scalability];

const services = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Service ${index + 1}`,
  descriptions: [
    {
      title: `Product Development`,
      description: `From ideation and prototyping to deployment and ongoing support, we guide you through every stage of product development. Whether it’s a brand-new concept or an enhancement to an existing product, we ensure a smooth, effective process. ${
        index + 1
      }`,
      image: product,
    },
    {
      title: `Technology Innovation`,
      description: `We harness the power of the latest technologies—ranging from full-stack development to AI/ML and data engineering—to build products that are both innovative and future-ready. ${
        index + 1
      }.`,
      image: tech,
    },
    {
      title: `Scalability & Growth`,
      description: `Our solutions are designed to grow with your business. We ensure that your products are not only relevant today but adaptable to future business demands. ${
        index + 1
      }.`,
      image: scalability,
    },
  ],
}));

type ServiceType = {
  id: number;
  title: string;
  descriptions: {
    title: string;
    description: string;
    image: string; // Add image property here
  }[];
};


const Service = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>(
    services[0]
  );
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  const handleServiceClick = (service: ServiceType) => {
    setSelectedService(service);
  };

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (sliderRef.current) {
      const scrollAmount = event.deltaY > 0 ? 300 : -300;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSliderMouseEnter = () => setShowArrows(true);
  const handleSliderMouseLeave = () => setShowArrows(false);

  const preventMouseActions = (event: MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const disablePageScroll = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "PageUp" ||
        e.key === "PageDown"
      ) {
        e.preventDefault();
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("wheel", handleScroll);
      sliderRef.current.addEventListener("mousedown", preventMouseActions);
      sliderRef.current.addEventListener("mousemove", preventMouseActions);
      sliderRef.current.addEventListener("mouseup", preventMouseActions);

      window.addEventListener("keydown", disablePageScroll);

      return () => {
        if (sliderRef.current) {
          sliderRef.current.removeEventListener("wheel", handleScroll);
          sliderRef.current.removeEventListener(
            "mousedown",
            preventMouseActions
          );
          sliderRef.current.removeEventListener(
            "mousemove",
            preventMouseActions
          );
          sliderRef.current.removeEventListener("mouseup", preventMouseActions);
        }

        window.removeEventListener("keydown", disablePageScroll);
      };
    }
  }, []);
  const serviceDescription =
    "Our comprehensive Enterprise Resource Planning (ERP) solution is designed to streamline and integrate your business processes, enhancing efficiency and decision-making across your organization. With a deep understanding of global markets—particularly in the US and Canada—we bring valuable industry insights and best practices to every collaboration, ensuring the right solutions for your business.";

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
      <SliderContainer
        ref={sliderRef}
        onMouseEnter={handleSliderMouseEnter}
        onMouseLeave={handleSliderMouseLeave}
      >
        {services.map((service) => (
          <div key={service.id} style={{ textAlign: "center", margin: "10px" }}>
            <ServiceBox
              onClick={() => handleServiceClick(service)}
              style={{
                position: "relative",
                overflow: "hidden",
                border:
                  service.id === selectedService.id
                    ? "2px solid #007bff"
                    : "1px solid #ddd",
                boxShadow:
                  service.id === selectedService.id
                    ? "0 2px 10px rgba(0, 123, 255, 0.2)"
                    : "none",
                transform:
                  service.id === selectedService.id
                    ? "scale(1.05)"
                    : "scale(1)",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
              }}
            >
              <video
                autoPlay
                loop
                muted
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={aboutVideo} type="video/mp4" />
              </video>
            </ServiceBox>
            <div
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                color: service.id === selectedService.id ? "#007bff" : "#000",
              }}
            >
              {service.title}
            </div>
          </div>
        ))}
      </SliderContainer>
      <Title>{selectedService.title}</Title>

      {/* Trigger animation on selected service change */}
      <div key={selectedService.id}>
      <DetailsContainer>
  {selectedService.descriptions.length > 0 ? (
    <DescriptionRow>
      {selectedService.descriptions.map((desc, index) => (
        <DescriptionBox key={index}>
          <DescriptionImage src={desc.image} alt={desc.title} />
          <DescriptionTitle>{desc.title}</DescriptionTitle>
          <DescriptionText>{desc.description}</DescriptionText>
        </DescriptionBox>
      ))}
    </DescriptionRow>
  ) : (
    <p>No descriptions available.</p>
  )}
</DetailsContainer>   

  <AdditionalContainers>
    {Array.from({ length: 4 }).map((_, index) => (
      <ContainerBox
        key={index}
        $isLeft={index % 2 === 0}
        $delay={index * 0.3}
      >
        <ContainerTitle>ERP Solution</ContainerTitle>
        <ContainerText>{serviceDescription}</ContainerText>
      </ContainerBox>
    ))}
  </AdditionalContainers>
</div>

    </SectionContainer>
  );
};

export default Service;
