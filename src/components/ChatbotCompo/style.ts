import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const ChatbotIcon = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 160px;
  height: 200px;
  cursor: pointer;
  animation: ${waveAnimation} 2s ease-in-out infinite;
`;

export const PopupWrapper = styled.div`
  position: fixed;
  bottom: 180px;
  right: 40px;
  width: 300px;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #007bff, #0056d2);
  padding: 10px 15px;
  color: white;

  .profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .header-text {
    flex-grow: 1;
    margin-left: 10px;

    h3 {
      margin: 0;
      font-size: 16px;
    }

    p {
      margin: 0;
      font-size: 12px;
      opacity: 0.8;
    }
  }

  .close-button {
    font-size: 20px;
    cursor: pointer;
  }
`;

export const ChatMessages = styled.div`
  padding: 15px;
  max-height: 250px;
  overflow-y: auto;
  background: #f7f8fc;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .user-message {
    align-self: flex-end;
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 20px 20px 0 20px;
    max-width: 80%;
  }

  .bot-message {
    align-self: flex-start;
    background: #e0e7ef;
    padding: 10px 15px;
    border-radius: 20px 20px 20px 0;
    max-width: 80%;
  }
`;

export const DefaultQueries = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 15px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
  max-height: 200px; /* Set a maximum height for scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
`;


export const QueryButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056d2;
  }
`;

export const ChatInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin: 10px;
  width:90%;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
  }
`;
