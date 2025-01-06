import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";


export const HeaderSection = styled("header")`
  display: flex; /* Ensure children are flex items */
  align-items: center;
  justify-content: space-between; /* Space between logo and navigation links */
  padding: 1rem 0.5rem;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;



export const LogoContainer = styled(Link)`
  display: flex;
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: #2e186a;
  }
`;



export const NotHidden = styled("div")`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;

  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: #18216d;
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #404041;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Outline = styled(MenuOutlined)`
  font-size: 22px;
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;

export const DrawerNavWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;

  a {
    font-size: 1.2rem;
    color: #18216d;
    margin: 1rem 0;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: rgb(255, 130, 92);
    }
  }
`;


export const ActiveNavLink = styled(Link)`
  color: rgb(255, 130, 92);
  font-weight: bold;

  &:hover {
    color: rgb(255, 80, 50);
  }
`;


export const StyledButton = styled.button`
  //padding: 4px 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:first-child {
    background-color: white;
    color: #0066ff;
  }

  &:last-child {
    //background-color: #111a91;
    color: #111a91;
    font-weight: bold;
    border: 2px solid white;
  }

  &:hover {
    opacity: 0.9;
  }

  &.active {
    background-color: orange;
    color: white;
  }
`;