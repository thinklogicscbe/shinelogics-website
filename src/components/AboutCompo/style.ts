import styled from "styled-components";

// export const SectionContainer = styled("div")`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   height: 90vh;
//   background: linear-gradient(to bottom right, #f5faff, #ffffff); /* Soft futuristic gradient */
//   padding: 0 5%;
//   border: 1px solid rgba(0, 0, 0, 0.1);
//   border-radius: 12px;

//   /* Subtle shadow for depth */
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 150, 255, 0.1);
// `;

// export const DivisionContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 40px;

//   .row {
//     margin-top: 60px;
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     opacity: 0;
//     animation: fadeIn 1s ease forwards;

//     &.row-1 {
//       flex-direction: row; /* Image on the left */
//     }

//     &.row-2 {
//       flex-direction: row-reverse; /* Image on the right */
//       animation: slideFromRight 1.5s ease forwards;
//     }

//     & > div:first-child {
//       flex: 0 0 30%; /* Image container takes 30% */
//       animation: slideFromLeft 1.5s ease forwards;
//     }

//     & > div:last-child {
//       flex: 0 0 70%; /* Text container takes 70% */
//       text-align: left;
//       animation: slideContentFromRight 1.5s ease forwards;

//       /* Text styling */
//       color: #0078d7; /* Vibrant AI blue */
//       font-weight: 600;
//       text-shadow: 0 0 3px rgba(0, 120, 215, 0.3);
//     }

//     img {
//       width: 100%;
//       height: auto;
//       border-radius: 8px;
//       border: 2px solid rgba(0, 0, 0, 0.1);
//       box-shadow: 0 4px 10px rgba(0, 120, 255, 0.2);
//     }

//     p {
//       font-size: 18px;
//       color: #333; /* Neutral dark text for readability */
//       line-height: 1.6;
//       margin: 0;
//       overflow: hidden;
//       animation: slideUp 0.5s ease forwards;
//     }
//   }

//   /* Animations */
//   @keyframes fadeIn {
//     0% {
//       opacity: 0;
//     }
//     100% {
//       opacity: 1;
//     }
//   }

//   @keyframes slideFromLeft {
//     0% {
//       opacity: 0;
//       transform: translateX(-20%);
//     }
//     100% {
//       opacity: 1;
//       transform: translateX(0);
//     }
//   }

//   @keyframes slideContentFromRight {
//     0% {
//       opacity: 0;
//       transform: translateX(20%);
//     }
//     100% {
//       opacity: 1;
//       transform: translateX(0);
//     }
//   }

//   @keyframes slideUp {
//     0% {
//       opacity: 0;
//       transform: translateY(10px);
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

// export const Video = styled.video`
//   width: 100%;
//   border-radius: 8px;
//   display: block; /* Ensures the video fills the container */
//   border: 2px solid rgba(0, 120, 255, 0.2);
//   box-shadow: 0 4px 10px rgba(0, 120, 255, 0.3);

//   /* Media query for responsive adjustments */
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;



export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  background: linear-gradient(135deg, #f4fbff 0%, #ffffff 50%, #e6f7ff 100%);
  padding: 0 5%;
  border: 1px solid rgba(0, 150, 255, 0.1);
  border-radius: 12px;
  position: relative;

  @media (max-width: 1024px) { /* Laptop */
    padding: 0 3%;
  }

  @media (max-width: 768px) { /* Mobile */
    flex-direction: column;
    padding: 0 2%;
  }
`;

export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: relative;
  z-index: 1;
  padding-bottom: 80px;

  .row {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 25px;

    &.row-1 {
      flex-direction: row;
    }

    &.row-2 {
      flex-direction: row-reverse;
    }

    & > div:first-child {
      flex: 0 0 30%; 
    }

    & > div:last-child {
      flex: 0 0 70%;
      text-align: left;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      border: 2px solid rgba(0, 150, 255, 0.1);
      box-shadow: 0 6px 20px rgba(0, 150, 255, 0.15);
    }

    p {
      font-size: 22px;
      text-align: justify;
      line-height: 2.0;
      color: #2D2D2D;
      padding: 2px;
      font-family: 'Uni Neue';
    }

    @media (max-width: 1024px) { /* Laptop */
      gap: 15px;
      margin-top: 40px;

      img {
        border-radius: 6px;
      }

      p {
        font-size: 20px;
      }
    }

    @media (max-width: 768px) { /* Mobile */
      flex-direction: column;
      text-align: center;

      &.row-1, &.row-2 {
        flex-direction: column;
      }

      img {
        width: 90%;
        margin: 0 auto;
      }

      p {
        font-size: 18px;
        padding: 5px;
      }
    }
  }
`;

export const Video = styled.video`
  width: 100%;
  border-radius: 8px;
  display: block;
  border: 2px solid rgba(0, 150, 255, 0.1);
  box-shadow: 0 6px 15px rgba(0, 150, 255, 0.15);

  @media (max-width: 1024px) { /* Laptop */
    border-radius: 6px;
  }

  @media (max-width: 768px) { /* Mobile */
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
  }
`;


