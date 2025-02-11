

import styled from "styled-components";




export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensures modal is on top */
`;

export const Heading = styled.h3`
font-size: 1.1rem;
font-weight: bold;
margin-top: 15px;
color: #2c3e50;
`;


export const JobListingsHeading = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px auto;
  padding-bottom: 10px;
  border-bottom: 3px solid #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;




export const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 600px; /* Increased width */
  max-height: 85vh; /* Prevents overflow */
  overflow-y: auto; /* Enables scrolling */
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* Smooth shadow */
  border-radius: 8px;
`;

/* Heading for modal */
export const ModalHeader = styled.h2`
  font-size: 18px; /* Smaller heading size */
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  height: 120px; /* Fixed height for better UI */
  font-size: 14px;
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Btn = styled.button`
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &.update {
    background: #007bff;
    color: white;
  }

  &.close {
    background: #dc3545;
    color: white;
  }

  &:hover {
    opacity: 0.85;
  }
`;



export const Container = styled.div`
  padding: 20px;
  max-width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const TableHead = styled.thead`
  background: #007bff;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

export const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
`;

export const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-right: 5px;

  &.edit {
    background: #28a745;
    color: white;
  }
  &.delete {
    background: #dc3545;
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
`;
