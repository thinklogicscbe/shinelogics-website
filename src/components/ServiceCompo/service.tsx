import React, { useEffect, useState, useRef } from "react";
import {
  SectionContainer,
  SliderContainer,
  ServiceBox,
  DetailsContainer,
  ServiceTitle,
  ServiceItem,
  Title,
  DescriptionTitle,
  DescriptionText,
  DescriptionText1,
  CardsGrid,
  ServiceCard,
  CardImage,
  CardContent,
  CTAWrapper,
  CTAButton,
} from "./style";

import { serviceData, ServiceKey } from "./servicesData";

/* ✅ derive keys safely */
const keys = Object.keys(serviceData) as ServiceKey[];

const Service: React.FC = () => {
  const [selectedServiceKey, setSelectedServiceKey] = useState<ServiceKey>(
    keys[0]
  );

  const [selectedService, setSelectedService] = useState<
    (typeof serviceData)[ServiceKey]
  >(serviceData[keys[0]]);

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (key: ServiceKey) => {
    setSelectedServiceKey(key);
    setSelectedService(serviceData[key]);
  };

  const handleWheel = (event: WheelEvent) => {
    if (!sliderContainerRef.current) return;

    if (event.deltaY !== 0) {
      sliderContainerRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  useEffect(() => {
    const slider = sliderContainerRef.current;
    if (!slider) return;

    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
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

      {/* ================= SLIDER ================= */}
      <SliderContainer ref={sliderContainerRef}>
        {keys.map((key, index) => (
          <ServiceItem key={key}>
            <ServiceBox
              active={selectedServiceKey === key}
              onClick={() => handleServiceClick(key)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={serviceData[key].image}
                alt={serviceData[key].title}
                loading="lazy"
              />
            </ServiceBox>

            <ServiceTitle active={selectedServiceKey === key}>
              {serviceData[key].title}
            </ServiceTitle>
          </ServiceItem>
        ))}
      </SliderContainer>

      {/* ================= DETAILS ================= */}
      <Title>{selectedService.title}</Title>

      <DescriptionText
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "18px",
        }}
      >
        {selectedService.description}
      </DescriptionText>

      <DetailsContainer>
        <CardsGrid>
          {Object.entries(selectedService.expertise).map(
            ([expertiseKey, expertise]) => (
              <ServiceCard key={expertiseKey}>
                <CardImage>
                  <img
                    src={expertise.image}
                    alt={expertiseKey}
                    loading="lazy"
                  />
                </CardImage>

                <CardContent>
                  <DescriptionTitle>
                    {expertiseKey.replace(/_/g, " ")}
                  </DescriptionTitle>

                  <DescriptionText1>
                    {expertise.description.map(
                      (item: string, index: number) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </DescriptionText1>
                </CardContent>
              </ServiceCard>
            )
          )}
        </CardsGrid>
        <CTAWrapper>
          <CTAButton>{selectedService.cta}</CTAButton>
        </CTAWrapper>
      </DetailsContainer>
    </SectionContainer>
  );
};

export default Service;
