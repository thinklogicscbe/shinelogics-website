import { useState } from "react";
import {
  ChatbotIcon,
  PopupWrapper,
  PopupContent,
  ChatHeader,
  ChatMessages,
  ChatInput,
  DefaultQueries,
  QueryButton,
} from "./style";
import chatIconGif from "../../assets/botimg.png"; // Replace with your GIF file

const ChatbotButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [visibleQueries, setVisibleQueries] = useState(2); // Initially show 2 queries

  const defaultQueries = [
    "What are your working hours?",
    "How can I contact support?",
  ];

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (query: string | null = null) => {
    const text = query || inputValue.trim();
    if (text === "") return;

    setMessages([...messages, { sender: "user", text }]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: generateBotReply(text),
        },
      ]);
    }, 1500);
  };

  const generateBotReply = (userText: string) => {
    switch (userText.toLowerCase()) {
      case "what are your working hours?":
        return "Our working hours are from 9 AM to 6 PM, Monday to Friday.";
      case "how can i contact support?":
        return "You can reach our support team via email at support@example.com or call us at +1-800-123-4567.";
      default:
        return "Thanks for reaching out! We'll get back to you soon.";
    }
  };

  const handleQueryClick = (query: string) => {
    handleSendMessage(query);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement; // Typecast the event target to HTMLElement
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && visibleQueries < defaultQueries.length) {
      setVisibleQueries(visibleQueries + 2); // Load 2 more queries
    }
  };
  

  return (
    <>
      <ChatbotIcon onClick={togglePopup}>
        <img
          src={chatIconGif}
          alt="Chatbot"
          style={{ width: "200px", height: "200px", cursor: "pointer" }}
        />
      </ChatbotIcon>

      {isPopupOpen && (
        <PopupWrapper>
          <PopupContent>
            <ChatHeader>
              <div className="profile-picture">
                <img src="https://via.placeholder.com/40" alt="Profile" />
              </div>
              <div className="header-text">
                <h3>Team</h3>
                <p>We are online!</p>
              </div>
              <span className="close-button" onClick={togglePopup}>
                &times;
              </span>
            </ChatHeader>

            <ChatMessages>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.sender === "user" ? "user-message" : "bot-message"}
                >
                  {msg.text}
                </div>
              ))}
            </ChatMessages>

            {/* Default Queries */}
            <DefaultQueries onScroll={handleScroll}>
              {defaultQueries.slice(0, visibleQueries).map((query, index) => (
                <QueryButton
                  key={index}
                  onClick={() => handleQueryClick(query)}
                >
                  {query}
                </QueryButton>
              ))}
            </DefaultQueries>

            <ChatInput
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </PopupContent>
        </PopupWrapper>
      )}
    </>
  );
};

export default ChatbotButton;
