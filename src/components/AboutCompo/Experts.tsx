import { useEffect, useState } from "react";
import axios from "axios";
import {
  ExpertsSection,
  ExpertsGrid,
  ExpertCard,
  ExpertImage,
  ExpertName,
  ExpertRole,
  TitleSmall,
  Description,
} from "./styles";

const API_URL = "https://www.shinelogics.com/api/experts";

const Experts = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(res => {
      setExperts(res.data.result || []);
    });
  }, []);

  return (
    <ExpertsSection>
      <TitleSmall>Work With Our Experts</TitleSmall>
      <Description>
        Skilled professionals driving innovation and security.
      </Description>

      <ExpertsGrid>
        {experts.map((e: any) => (
          <ExpertCard key={e._id}>
            <ExpertImage src={e.image} />
            <ExpertName>{e.name}</ExpertName>
            <ExpertRole>{e.role}</ExpertRole>
          </ExpertCard>
        ))}
      </ExpertsGrid>
    </ExpertsSection>
  );
};

export default Experts;
