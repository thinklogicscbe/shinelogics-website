import styled from "styled-components";

// Sidebar container (default open on large screens)
export const SidebarContainer = styled.div<{ open: boolean }>`
    position: absolute;
    top: 100px;
    left: 0;
    width: 20%;
    min-width: 260px;
    height: 100vh;
    background: #222;
    color: white;
    transition: transform 0.3s ease-in-out;
    z-index: 1000;  /* Ensure sidebar is above other elements */
    padding-top: 60px;
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

// Backdrop for overlay effect on mobile
export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: opacity 0.3s ease-in-out;

    @media (min-width: 769px) {
        display: none;
    }
`;

// List inside sidebar
export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

// List Items
export const ListItem = styled.li`
    padding: 15px 20px;
    cursor: pointer;
    font-size: 18px;
    border-bottom: 1px solid #444;
    
    &:hover {
        background-color: #444;
    }
`;

// Content Wrapper (adjusts for remaining 80% width)
export const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    width: 80%;
    margin-left: 20%;
    background-color: #f8f9fa;
    padding: 20px;

    @media (max-width: 1024px) {
        width: 100%;
        margin-left: 0;
    }

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;
