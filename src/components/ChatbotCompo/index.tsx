import { useState,useRef,useEffect } from "react";
import { Link } from "react-router-dom"; // For routing
import {
  ChatbotIcon,
  PopupWrapper,
  PopupContent,
  ChatHeader,
  ChatMessages,
  ChatInput,
  QueryButton,
  QueryButtonsWrapper,
} from "./style";
import chatIconGif from "../../assets/botimg.png"; // Replace with your GIF file
import logo from "../../assets/logo.png";
import sendSound from "../../assets/audio/send.mp3"; // Sending sound
import receiveSound from "../../assets/audio/receive.mp3"; // Receiving sound

// Define a TypeScript interface for message objects
interface Message {
  sender: string;
  text: React.ReactNode; // Change 'text' to React.ReactNode to handle both strings and JSX elements
  queries?: string[]; // Optional property for queries
}

const ChatbotButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi 👋 How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showInitialQueries, setShowInitialQueries] = useState(true); // State to control when queries are shown
  const [isInEstimationFlow, setIsInEstimationFlow] = useState(false); // Track if the user is in the Estimation flow
  const [estimationData, setEstimationData] = useState({
    projectDescription: "",
    projectTime: "",
    contactDetails: "",
  });
  const  chatMessagesEndRef = useRef<HTMLDivElement | null>(null);
  const sendSoundRef = useRef(new Audio(sendSound));
  const receiveSoundRef = useRef(new Audio(receiveSound));
  useEffect(() => {
    // Ensure that the reference is not null before calling scrollIntoView
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // This effect runs every time the messages state changes

  const followUpQueries: { [key in "Our Products" | "Our Services" | "Estimation"]: string[] } = {
    "Our Products": ["ERP(Enterprise Resource Planning)", "EMS(Employee Management System)", "E-Commerce"],
    "Our Services": [
      "Web Development",
      "Mobile App Development",
      "Cybersecurity",
      "SEO",
      "Data Analytics",
      "Graphic Design",
    ],
    "Estimation": ["Start Estimation"],
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const playSendSound = () => {
    sendSoundRef.current.currentTime = 0; // Reset for consecutive plays
    sendSoundRef.current.play();
  };

  const playReceiveSound = () => {
    receiveSoundRef.current.currentTime = 0;
    receiveSoundRef.current.play();
  };
  const handleSendMessage = (query: string | null = null) => {
    const text = query || inputValue.trim();
    if (text === "") return;
    playSendSound();
    // Add user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text },
    ]);

    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      let botReply: React.ReactNode = generateBotReply(text);
      let queries: string[] | null = null;
    
      if (followUpQueries[text as "Our Products" | "Our Services" | "Estimation"]) {
        queries = followUpQueries[text as "Our Products" | "Our Services" | "Estimation"];
      }
      playReceiveSound();
      if (text === "ERP(Enterprise Resource Planning)") {
        botReply = (
          <>
            ERP is a business management software. It helps businesses manage operations in real-time.{" "}
            <Link to="/ProductCompo/erp" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "EMS(Employee Management System)") {
        botReply = (
          <>
            EMS is an energy management system designed to optimize energy usage.{" "}
            <Link to="/ProductCompo/ems" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "E-Commerce") {
        botReply = (
          <>
            Our e-commerce platform enables businesses to sell online with ease.{" "}
            <Link to="/ProductCompo/e-commerce" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "Web Development") {
        botReply = (
          <>
            We offer custom web development services to help you build a strong online presence.{" "}
            <Link
              to="/service?service=web_development_services"
              style={{ color: "#00f", textDecoration: "underline" }}
            >
              Read More
            </Link>
          </>
        );
      }
       else if (text === "Mobile App Development") {
        botReply = (
          <>
            Our mobile app development services help businesses reach customers on their mobile devices.{" "}
            <Link to="/service?service=mobile_app_development_services" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "Cybersecurity") {
        botReply = (
          <>
            We provide cybersecurity solutions to keep your business safe from online threats.{" "}
            <Link to="/service?service=cybersecurity_services" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "SEO") {
        botReply = (
          <>
            Our SEO services help improve your website's visibility and ranking in search engines.{" "}
            <Link to="/service?service=seo_optimization" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "Data Analytics") {
        botReply = (
          <>
            We provide data analytics services to help you make informed business decisions.{" "}
            <Link to="/service?service=data_analytics" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (text === "Graphic Design") {
        botReply = (
          <>
            Our graphic design services help you create visually stunning content for your brand.{" "}
            <Link to="/service?service=graphic_design_services" style={{ color: "#00f", textDecoration: "underline" }}>
              Read More
            </Link>
          </>
        );
      } else if (isInEstimationFlow) {
        botReply = handleEstimationFlow(text);
      }
    
      // Add bot's response and optionally queries
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReply },
        ...(queries
          ? [
              {
                sender: "bot",
                text: "Please Select",
                queries: queries,
              },
            ]
          : []),
      ]);
    
      // Show initial queries only after the user's first message
      if (showInitialQueries) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "What would you like to know?",
            queries: ["Our Products", "Our Services", "Estimation"],
          },
        ]);
        setShowInitialQueries(false); // Prevent showing initial queries again
      }
    }, 1500);
  };

  const handleEstimationFlow = (text: string): React.ReactNode => {
    // Step 1: Get project description
    if (!estimationData.projectDescription) {
      setEstimationData((prev) => ({ ...prev, projectDescription: text }));
      return "Great! Please describe the project.";
    }
  
    // Step 2: Get project time
    if (!estimationData.projectTime) {
      setEstimationData((prev) => ({ ...prev, projectTime: text }));
      return "Thanks! How much time do you expect the project to take?";
    }
  
    // Step 3: Get contact details from user
    if (!estimationData.contactDetails) {
      setEstimationData((prev) => ({ ...prev, contactDetails: text }));
      return "Thank you! Please provide your contact details (email and phone number).";
    }
  
    // After collecting all details, end the estimation process
    setIsInEstimationFlow(false); // End estimation flow
    return "Thank you for your estimation request! We will get in touch soon.";
  };
  
  

  const generateBotReply = (userText: string): React.ReactNode => {
    switch (userText.toLowerCase()) {
      case "our products":
        return "These are our products.";
      case "our services":
        return "These are our services.";
      case "start estimation":
        setIsInEstimationFlow(true);
        return "Let's start the estimation! What is the project about?";
      default:
        return "Thanks for reaching out! Let me know how I can assist you.";
    }
  };

  const handleQueryClick = (query: string) => {
    handleSendMessage(query); // Send the query as if it was typed by the user
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
                <img src={logo} alt="Profile" />
              </div>
              <div className="header-text">
                <h3>Shinelogics</h3>
                <p><span className="status-indicator"></span>Online!</p>
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
                  {msg.queries && (
                    <QueryButtonsWrapper>
                      {msg.queries.map((query, idx) => (
                        <QueryButton key={idx} onClick={() => handleQueryClick(query)}>
                          {query}
                        </QueryButton>
                      ))}
                    </QueryButtonsWrapper>
                  )}
                </div>
              ))}
              <div ref={chatMessagesEndRef} /> 
            </ChatMessages>

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