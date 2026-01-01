import styled from "styled-components";

/* ================= PAGE CONTAINER ================= */

export const Destinationcontiner = styled.div`
  width: 100%;
  padding: 40px 20px;
  background: #f4f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ================= BACK BUTTON ================= */

export const ButtonStyle = styled.button`
  padding: 10px 22px;
  font-size: 16px;
  font-weight: 600;
  background: #0B1D45;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.35);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 123, 255, 0.45);
  }

  &:active {
    transform: scale(0.97);
  }
`;


/* ================= TOP SECTION ================= */

export const TopSection = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 18px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  gap: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;



export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Destination = styled.div`
  h2 {
    font-size: 42px;
    font-weight: 700;
    color: #18216d;
    margin-bottom: 15px;
  }
`;

export const Destinationcontent = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #444;
`;

/* ================= BOTTOM SECTION ================= */

export const BottomSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* ================= LEFT CONTENT ================= */

export const Leftsidecontent = styled.div`
  flex: 2;
  background: #ffffff;
  border-radius: 18px;
  padding: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
`;

export const SectionTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: #18216d;
  margin-bottom: 12px;
`;

export const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 25px;

  li {
    font-size: 15px;
    line-height: 1.7;
    color: #444;
    margin-bottom: 8px;
  }
`;

/* ================= RIGHT SUMMARY CARD ================= */

export const Rightsidecontent = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 18px;
  padding: 25px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

export const Jobsummery = styled.div`
  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #18216d;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: #555;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: #007bff;
  }
`;

export const Location = styled.div``;
export const JobType = styled.div``;
export const Positionscount = styled.div``;
export const Qualification = styled.div``;
export const Experience = styled.div``;
export const Posted = styled.div``;

export const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background: #e0e6ed;
  margin: 15px 0;
`;

/* ================= APPLY BUTTON ================= */

export const ApplyButton = styled.button`
  margin-top: 40px;
  padding: 14px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0, 123, 255, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 28px rgba(0, 123, 255, 0.5);
  }
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #18216d;
  margin-bottom: 20px;
`;


export const PageHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;


