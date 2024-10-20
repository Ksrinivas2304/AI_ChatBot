import React, { useState } from 'react'
import './App.css'
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { RiPlanetLine } from "react-icons/ri";
import { FaPython } from 'react-icons/fa';
import { TbPrompt } from 'react-icons/tb';

function App() {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(true);
  return (
    <>
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {
        isResponseScreen ? 
        <div className='h-[80vh]'>
          <div className="header flex items-center justify-between w-[100vw] px-[200px] ">
            <h2 className='text-2xl'>EnerGeine</h2>
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
      

      <div className="bottom w-[100%] flex flex-col items-center">
        <div className="inputBox w-[66%] text-[15px] py-[10px] flex items-center bg-[#181818] rounded-[30px]">
          <input onChange={(e)=>{setMessage(e.target.value)}} type="text" className='p=[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' id='messageBox' placeholder='Write your Prompt here...' />
        {
          message == "" ? "" : <i className='text-green-500 text-[20px] mr-5 cursor-pointer'><IoSend/></i>

        }
        </div>
        <p className='text-[gray] text-[14px] mt-3'>EnerGeine uses the Gemini Api for response. </p>
      </div>
    </div>
    </>
  )
}

export default App