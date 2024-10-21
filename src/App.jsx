import React, { useState } from 'react';
import './App.css';
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { RiPlanetLine } from "react-icons/ri";
import { FaPython } from 'react-icons/fa';
import { TbPrompt } from 'react-icons/tb';
import { GoogleGenerativeAI, GoogleGenerativeAIResponseError } from "@google/generative-ai";

function App() {
  const [message, setMessage] = useState("");
  const [isHomeScreen, setIsHomeScreen] = useState(true);
  const [messages, setMessages] = useState([]);

  const cards = [
    { text: "What is Coding? How can we learn it?", icon: <IoCodeSlash /> },
    { text: "In which year was Python invented?", icon: <FaPython /> },
    { text: "What is the last planet of the solar system?", icon: <RiPlanetLine /> },
    { text: "What is Prompt Engineering?", icon: <TbPrompt /> },
  ];

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must type something!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages);
    setMessage(""); // Clear the input field
  };

  const newChat = () => {
    setIsHomeScreen(true);
    setMessages([]);
  };

  const handleCardClick = (text) => {
    setIsHomeScreen(false);
    setMessage(text);
    generateResponse(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      hitRequest();
    }
  };

  return (
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {isHomeScreen ? (
        <div className="middle h-[80vh] flex items-center flex-col justify-center">
          <h1 className="text-4xl mb-3">EnerGeine</h1>
          <div className="boxes mt-3 mb-[60px] grid grid-cols-2 gap-4 p-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] relative bg-[#181818] p-4 flex flex-col justify-between"
                onClick={() => handleCardClick(card.text)}
              >
                <p className="text-[16px]">{card.text}</p>
                <div className="absolute right-3 bottom-3 text-[20px]">{card.icon}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col">
          <div className="header flex items-center justify-between w-[100vw] px-[230px] py-4">
            <h2 className="text-2xl">EnerGeine</h2>
            <button
              id="newChatBtn"
              className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
              onClick={newChat}
            >
              New Chat
            </button>
          </div>

          <div className="messages flex-1 overflow-y-auto px-[230px] py-4">
            {messages.map((msg, index) => (
              <div key={index} className={msg.type}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bottom w-[100%] fixed bottom-0 flex flex-col items-center mb-2">
        <div className="inputBox w-[66%] text-[15px] py-[10px] flex items-center bg-[#181818] rounded-[30px]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
            id="messageBox"
            placeholder="Write your Prompt here..."
          />
          {message !== "" && (
            <i
              className="text-green-500 text-[20px] mr-5 cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </div>
        <p className="text-[gray] text-[14px] mt-3">EnerGeine uses the Gemini API for responses.And can make so many mistakes,cause it was created by ____nivas__😎 </p>
      </div>
    </div>
  );
}

export default App;
