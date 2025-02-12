import styled from "styled-components";

// Fixed Header (Top Bar)
export const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    z-index: 1100;
`;

// Sidebar container (adjusted to start below header)
export const SidebarContainer = styled.div<{ open: boolean }>`
    position: fixed;
    top: 85px; /* Sidebar starts below the fixed header */
    left: 0;
    width: 20%;
    min-width: 260px;
    height: calc(100vh - 60px); /* Adjust height to avoid header overlap */
    background: #222;
    color: white;
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    padding-top: 20px;
    overflow-y: auto;

    @media (max-width: 768px) {
        width: 260px;
        transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    }
`;

// Close Button inside Sidebar
export const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 30px;
    color: white;
    cursor: pointer;

    @media (min-width: 769px) {
        display: none;
    }

    &:hover {
        color: #ff4d4d;
    }
`;

// Logo Wrapper for positioning
export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
   
`;

// Logo Image
export const LogoImage = styled.img`
    width: 400px;
    height: 50px;
    
`;

// Logo Text
export const LogoText = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: white;
`;

// Logout Button Wrapper (now inside header, aligned to right)
export const LogoutButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

// Logout Button
export const LogoutButton = styled.button`
    background: red;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: 0.3s;
    font-weight: bold;

    &:hover {
        background: darkred;
    }

    @media (max-width: 1024px) {
        font-size: 14px;
        padding: 8px 12px;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 6px 10px;
    }
`;

// Content Wrapper (adjusted for remaining 80% width)
export const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    width: 80%;
    margin-left: 20%;
    background-color: #f8f9fa;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 60px); /* Adjusted to not overlap with header */

    @media (max-width: 1024px) {
        width: 100%;
        margin-left: 0;
    }

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;


export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999; /* Lower than sidebar */
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ListItem = styled.li`
    padding: 15px 20px;
    cursor: pointer;
    font-size: 18px;
    border-bottom: 1px solid #444;
    
    &:hover {
        background-color: #444;
    }
`;

