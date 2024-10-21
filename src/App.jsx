import React, { useState } from 'react'
import './App.css'
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { RiPlanetLine } from "react-icons/ri";
import { FaPython } from 'react-icons/fa';
import { TbPrompt } from 'react-icons/tb';
import { GoogleGenerativeAI, GoogleGenerativeAIResponseError } from "@google/generative-ai";
function App() {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(true);
  const [messages, setMessages] = useState([]);
  let allMessages =[];


  const hitRequest = ()=>{
    if(message){
      generateResponse(message);
    }
    else{
      alert("you must type sommething...!!")
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;
    
    const genAI = new GoogleGenerativeAI("AIzaSyAp5pXwsrG-p5xzvE1VgLsVSsNbfzJrHA0");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    
    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setMessages(newMessages); // Append new messages to the existing ones
    setisResponseScreen(true);
    setMessage(""); // Clear the input field after sending the message
    console.log(result.response.text());
  };

  const newChat =()=>{
    setisResponseScreen(false);
    setMessages([]);
  }

  return (
    <>
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {
        isResponseScreen ? 
        <div className='h-[80vh]'>
          <div className="header flex items-center justify-between w-[100vw] px-[230px] py-4">
            <h2 className='text-2xl'>EnerGeine</h2>
            <button id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]'onClick={newChat}>New Chat</button>
          </div>

          <div className="messages flex-1 overflow-y-auto px-[230px] py-4">
            {
              messages?.map((msg,index) =>{
                return (
                  <div key={index} className={msg.type}>{msg.text}</div>
                )
              })
            }
          </div>
        </div> : 
        <div className="middle h-[80vh] flex items-center flex-col justify-center">
        <h1 className='text-4xl mb-3'> EnerGeine </h1>
        <div className="boxes mt-3 flex items-center gap-2">
          <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[25vh] bg-[#181818] p-[10px]">
            <p className='text-[20px]'>What is Coding? <br/> 
              How we can Learn it? </p>
              <i className='absolute right-3 bottom-3 text-[20px]'><IoCodeSlash /></i>
          </div>
          <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[25vh] bg-[#181818] p-[10px]">
            <p className='text-[20px]'>In which year python <br/> 
              was invented? </p>
              <i className='absolute right-3 bottom-3 text-[20px]'><FaPython/>              </i>
          </div>
          <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[25vh] bg-[#181818] p-[10px]">
            <p className='text-[20px]'>What is the last <br />
            planet of solar 
            <br />system  </p>
              <i className='absolute right-3 bottom-3 text-[20px]'><RiPlanetLine /></i>
          </div>
          <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[25vh] bg-[#181818] p-[10px]">
            <p className='text-[20px]'>What is Prompt <br/> 
              Engineering? </p>
              <i className='absolute right-3 bottom-3 text-[20px]'><TbPrompt /></i>
          </div>
        </div>
      </div>
      }
      

      <div className="bottom w-[100%] fixed bottom-0 flex flex-col items-center mb-2">
        <div className="inputBox w-[66%] text-[15px] py-[10px] flex items-center bg-[#181818] rounded-[30px]">
          <input value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" className='p=[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' id='messageBox' placeholder='Write your Prompt here...' />
        {
          message == "" ? "" : <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend/></i>

        }
        </div>
        <p className='text-[gray] text-[14px] mt-3'>EnerGeine uses the Gemini Api for response. </p>
      </div>
    </div>
    </>
  )
}

export default App