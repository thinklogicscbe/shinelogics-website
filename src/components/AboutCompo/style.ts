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
  height: 90vh;
  background: linear-gradient(135deg, #f4fbff 0%, #ffffff 50%, #e6f7ff 100%);
  padding: 0 5%;
  border: 1px solid rgba(0, 150, 255, 0.1);
  border-radius: 12px;
  position: relative;

  /* Subtle glow effect */
  box-shadow: 0 10px 30px rgba(0, 150, 255, 0.2), inset 0 0 12px rgba(0, 255, 255, 0.05);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 70%, rgba(0, 150, 255, 0.02));
    background-size: 100px 100px;
    pointer-events: none;
    z-index: 0;
  }
`;

export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
  z-index: 1;

  .row {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 25px;
    opacity: 0;
    animation: fadeIn 2s ease-in-out forwards;

    &.row-1 {
      flex-direction: row;
    }

    &.row-2 {
      flex-direction: row-reverse;
      animation: slideFromRight 2s ease-in-out forwards;
    }

    & > div:first-child {
      flex: 0 0 30%; 
      animation: slideFromLeft 2s ease-in-out forwards;
    }

    & > div:last-child {
      flex: 0 0 70%;
      text-align: left;
      animation: slideContentFromRight 2s ease-in-out forwards;
      
      /* Subtle, sleek futuristic text styling */
      color: #0078d7;
      font-size: 22px;
      font-weight: bold;
      text-shadow: 0 0 4px rgba(0, 120, 255, 0.2), 0 0 8px rgba(0, 255, 255, 0.1);
      border-left: 4px solid rgba(0, 150, 255, 0.3);
      padding-left: 12px;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      border: 2px solid rgba(0, 150, 255, 0.1);
      box-shadow: 0 6px 20px rgba(0, 150, 255, 0.15);

      &:hover {
        transform: scale(1.03);
        box-shadow: 0 8px 25px rgba(0, 150, 255, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
    }

    p {
      font-size: 18px;
      text-align: justify; 
      color: #333;
      line-height: 1.6;
      margin: 0;
      overflow: hidden;
      animation: slideUp 1s ease-in-out forwards;

      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #0078d7, rgba(0, 150, 255, 0.2));
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease-out;
      }

      &:hover:after {
        transform: scaleX(1);
      }
    }
  }

  /* Animations */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-25%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideFromRight {
    0% {
      opacity: 0;
      transform: translateX(25%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideContentFromRight {
    0% {
      opacity: 0;
      transform: translateX(20%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Video = styled.video`
  width: 100%;
  border-radius: 8px;
  display: block;
  border: 2px solid rgba(0, 150, 255, 0.1);
  box-shadow: 0 6px 15px rgba(0, 150, 255, 0.15);

  /* Subtle glowing effect */
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 150, 255, 0.2);
    transform: scale(1.02);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;


