import styled from "styled-components";

/* =========================
   BANNER / HERO SECTION
========================= */

export const BannerContainer = styled.div`
  width: 100%;

  .heading-container {
    width: 100%;
  }

  .heading-banner {
    position: relative;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heading-banner::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.5);
  }

  .heading-content {
    position: relative;
    background: rgba(255, 255, 255, 0.85);
    padding: 25px;
    width: 60%;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    animation: fadeIn 1s ease-in-out;
  }

  .heading-content h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #18216d;
    margin-bottom: 20px;
  }

  .heading-content p {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.6;
    color: #333;
  }

  /* ---------- Responsive ---------- */

  @media (max-width: 1024px) {
    .heading-content {
      width: 75%;
    }
  }

  @media (max-width: 768px) {
    .heading-banner {
      height: 320px;
    }

    .heading-content {
      width: 85%;
      padding: 18px;
    }

    .heading-content h1 {
      font-size: 1.9rem;
    }

    .heading-content p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .heading-banner {
      height: 300px;
    }

    .heading-content {
      width: 92%;
    }

    .heading-content h1 {
      font-size: 1.4rem;
    }

    .heading-content p {
      font-size: 0.85rem;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* =========================
   CORE FEATURES (CARDS)
========================= */

export const CoreFeaturesContainer = styled.div`
  .core-features-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
  }

  .core-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  .core-feature-item {
    background: #ffffff;
    padding: 22px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .core-feature-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }

  .core-feature-item img {
    width: 100%;
    max-height: 180px;
    object-fit: contain;
    margin-bottom: 15px;
  }

  .core-feature-item strong {
    font-size: 1.25rem;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 12px;
  }

  .core-feature-item ul {
    padding-left: 18px;
    list-style: disc;
    text-align: left;
  }

  .core-feature-item li {
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    .core-features-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    .core-feature-item strong {
      font-size: 1.1rem;
    }

    .core-feature-item li {
      font-size: 0.95rem;
    }
  }
`;

/* =========================
   BENEFITS / WHY CHOOSE
========================= */

export const BenefitsContainer = styled.div`
  .why-choose-container {
    max-width: 1100px;
    margin: 50px auto;
    padding: 40px;
    background: #f7f7f7;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
    transition: transform 0.3s ease;
  }

  .why-choose-container:hover {
    transform: scale(1.03);
  }

  .why-choose-container h2 {
    font-size: 2.3rem;
    margin-bottom: 25px;
    font-weight: bold;
    text-transform: uppercase;
    color: #333;
    text-align: center;
  }

  .why-choose-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .why-choose-item {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 15px;
    padding-left: 25px;
    position: relative;
    line-height: 1.6;
  }

  .why-choose-item::before {
    content: "✔";
    position: absolute;
    left: 0;
    color: #007bff;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .why-choose-container {
      padding: 25px;
    }

    .why-choose-container h2 {
      font-size: 1.9rem;
    }

    .why-choose-item {
      font-size: 1.05rem;
    }
  }

  @media (max-width: 480px) {
    .why-choose-container h2 {
      font-size: 1.6rem;
    }

    .why-choose-item {
      font-size: 0.95rem;
    }
  }
`;
