import styled from "styled-components";

export const EmployeeLoginContainer = styled.div`
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .image-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: slideInLeft 1s ease-in-out;
  }

  .image-section img {
    max-width: 100%;
    max-height: 90%;
    object-fit: cover;
    animation: danceUpDown 2s ease-in-out infinite;
  }

  @keyframes danceUpDown {
    0% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    50% { transform: translateY(0); }
    75% { transform: translateY(10px); }
    100% { transform: translateY(0); }
  }

  .auth-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: slideInRight 1s ease-in-out;
    padding: 20px;
  }

  .auth-box {
    background: #fff;
    padding: 30px 40px;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin-top: 10px;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 1.5rem;
    color: #333;
  }

  .page-subtitle {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 24px;
  }

  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #555;
  }

  .input-group input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: #bbb;
    }
  }

  .error-message {
    color: #e53935;
    font-size: 0.85rem;
    margin-bottom: 12px;
    text-align: left;
    background: #ffebee;
    padding: 8px 12px;
    border-radius: 4px;
    border-left: 3px solid #e53935;
  }

  .auth-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
    width: 100%;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  .toggle-text {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #555;
  }

  .toggle-link {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 5px;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }

  @keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Tablet */
  @media (max-width: 1024px) {
    .container {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-height: 100vh;
      padding: 10px;
      gap: 20px;
    }

    .image-section {
      width: 100%;
      height: 180px;
      overflow: hidden;
    }

    .image-section img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .auth-container {
      width: 90%;
      max-width: 500px;
      margin-top: 20px;
    }

    .auth-box {
      padding: 20px;
      max-width: 400px;
    }
  }

  /* Mobile landscape */
  @media (max-width: 768px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }

    .image-section {
      width: 50%;
      height: 300px;
    }

    .image-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .auth-container {
      width: 40%;
      max-width: 450px;
      padding: 15px;
    }

    .auth-box {
      padding: 20px;
      max-width: 350px;
    }

    h2 {
      font-size: 1.25rem;
    }

    .auth-button {
      font-size: 0.9rem;
    }
  }

  /* Mobile small */
  @media (max-width: 468px) {
    .container {
      padding: 15px;
      justify-content: flex-start;
      flex-direction: column;
    }

    .image-section {
      display: none;
    }

    .auth-container {
      width: 100%;
      height: auto;
      margin-top: 15px;
    }

    .auth-box {
      width: 100%;
      padding: 20px;
    }

    .auth-button {
      font-size: 14px;
    }
  }
`;