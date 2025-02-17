import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderSection = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ensures vertical alignment */
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column; 
    padding: 15px;
    text-align: left;
    align-items: flex-start; /* Align left for mobile */
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;



export const ActiveLink = styled(NavLink)`
  color: green;
  text-decoration: none;
  font-weight: bold;
  margin-top: 25px;

  &.active {
    text-decoration: underline;
    text-decoration-thickness: 2px; /* Adjust thickness */
    text-underline-offset: 4px; /* Add space between text and underline */
    color: green;
  }

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px; /* Adjust thickness */
    text-underline-offset: 4px; /* Add space between text and underline */
    color: green;
  }
`;





export const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 10px

  /* Default styling */
  padding: 0.5rem;
  font-size: 1.5rem;

  /* For tablets and smaller screens */
  @media (max-width: 1024px) {
    font-size: 1.3rem;
    padding: 0.4rem;
  }

  /* For mobile screens */
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.3rem;
  }

  /* For small screens */
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.2rem;
  }

  /* For extra small screens */
  @media (max-width: 320px) {
    font-size: 0.8rem;
    padding: 0.15rem;
  }
`;





export const Burger = styled.div`
  cursor: pointer;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;

  div {
    background-color: #333;
    width: 100%;
    height: 3px;
    border-radius: 2px;
  }

  @media (max-width: 932px) {
    display: flex; 
    position: absolute;
    right: 25px; 
    top: 30px; 
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledButton = styled.button`
  background: transparent;
  border: none;
  padding: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;

  /* Apply active underline */
  &.active {
    border-bottom: 2px solid #007bff;  /* Blue underline */
  }

  /* Add hover effect */
  &:hover {
    color: #007bff;  /* Blue color on hover */
  }
`;

export const StyledButton1 = styled.button`
  background: none;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  position: relative;
  transition: all 0.3s ease;

  &.active {
    font-weight: bold;
    color: #007bff;
  }
`;
export const DropdownWrapper = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  width: 200px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.visible {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`;
export const DropdownWrapperMobile = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;

  &.visible {
    display: block;
  }
`;

export const DropdownArrow = styled.div`
  position: absolute;
  top: -6px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
`;

export const DropdownContent = styled.div`
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;




