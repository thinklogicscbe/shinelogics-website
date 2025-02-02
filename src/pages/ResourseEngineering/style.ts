import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  color: #1e3a8a;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #1e40af;
  margin-bottom: 20px;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 10px;
`;

export const Section = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Subheading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 12px;
`;

export const Text = styled.p`
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
`;

export const List = styled.ul`
  padding-left: 20px;
  color: #374151;
`;

export const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.5;
`;
