import styled from "styled-components";

// Sidebar container (default open on large screens)
// Sidebar container (sets the sidebar to 20% of the width)
export const SidebarContainer = styled.div<{ open: boolean }>`
    position: absolute;
    top: 100px;
    left: 0;
    width: 20%;  /* Sidebar takes 20% of the screen width */
    min-width: 260px;  /* Ensure the sidebar has a minimum width */
    height: 120vh;
    background: #222;
    color: white;
    transition: transform 0.3s ease-in-out;
    z-index: -1;
    padding-top: 60px;
    overflow-y: auto;

    @media (max-width: 1024px) {
        width: 220px;  /* Adjust for medium screens */
    }

    @media (max-width: 768px) {
        width: 260px;  /* Sidebar width for mobile view */
        transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")}; /* Sidebar toggle for mobile */
    }
`;


// Close Button inside Sidebar (Always visible on all screens)
export const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 30px;
    color: white;
    cursor: pointer;
    z-index: 1101;
    
    @media (min-width: 769px) {
        display: none; /* Hide on desktops */
    }

    @media (max-width: 768px) {
        display: block; /* Show on mobile and tablets */
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
    z-index: 1049;
    transition: opacity 0.3s ease-in-out;

    @media (min-width: 769px) {
        display: none; /* Hide on larger screens */
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







// Content Wrapper (adjusts for the remaining 80% width)
export const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    width: 80%;  /* Content takes the remaining 80% */
    margin-left: 20%;  /* Push content to the right, leaving space for the sidebar */
    background-color: #f8f9fa;
    padding: 20px;

    /* Handle responsiveness */
    @media (max-width: 1024px) {
        width: 100%;  /* Full width for smaller screens */
        margin-left: 0;  /* No margin on small screens */
    }

    @media (max-width: 768px) {
        margin-left: 0;  /* No margin for mobile */
    }
`;
