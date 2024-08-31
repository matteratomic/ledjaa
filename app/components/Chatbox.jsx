"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoCloseOutline, IoSendSharp } from 'react-icons/io5';

const FactCard = ({ image, title, text }) => {
  return (
    <div className="mb-16 w-full">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="bg-cover bg-center bg-no-repeat mb-6 w-full h-64 flex items-center space-x-8 flex-1 shadow-md rounded-2xl"
      ></div>

      <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
      <h2 className="text-xl mb-2 font-medium text-gray-400">{text}</h2>
    </div>
  );
};

// Animation styles
const animationStyles = `
  @keyframes glow {
    0% {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 1);
    }
    100% {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
  .animate-glow {
    animation: glow 2s infinite;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .fade-out {
    animation: fadeOut 0.3s ease-in-out;
  }
`;

const AnimatedPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setIsVisible((prevState) => !prevState);
      },
      isVisible ? 10000 : 40000,
    );

    return () => clearInterval(timer);
  }, [isVisible]);

  return isVisible ? (
    <div className="absolute -top-10 left-0 bg-purple-800 text-white p-2 mb-10 rounded-lg animate-fade">
      Hello, I'm Lejaa. Ask me a question.
    </div>
  ) : null;
};

const ChatbotWidget = () => {
  const [isWidgetOpen, setWidgetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [modalTimer, setModalTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (modalTimer > 0 && isModalOpen) {
        setModalTimer(modalTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [modalTimer, isModalOpen]);

  useEffect(() => {
    if (modalTimer === 0 && isModalOpen) {
      setModalOpen(false);
      setModalTimer(60);
    }
  }, [modalTimer, isModalOpen]);

  const openWidget = () => {
    setWidgetOpen(true);
    setModalOpen(true);
  };

  const closeWidget = () => {
    setWidgetOpen(false);
    setModalOpen(false);
    setModalTimer(60);
  };

  const handleSend = async () => {
    if (userInput.trim() !== '') {
      const newMessage = { sender: 'User', message: userInput };
      setChatMessages([...chatMessages, newMessage]);

      try {
        const response = await fetch('https://chatgpt-api8.p.rapidapi.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'ea57f141bcmsh6dfef13948a9c36p1a559ajsn217d32aeb7fc',
            'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com',
          },
          body: JSON.stringify([{ content: userInput, role: 'user' }]),
        });
        const result = await response.json();
        if (result.text) {
          const botMessage = { sender: 'Lejaa', message: result.text };
          setChatMessages([...chatMessages, newMessage, botMessage]);
        } else {
          setChatMessages([...chatMessages, newMessage, { sender: 'Lejaa', message: 'Error: Invalid response.' }]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setChatMessages([...chatMessages, newMessage, { sender: 'Lejaa', message: 'Error fetching data. Please try again later.' }]);
      }
      setUserInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatedPrompt />
      <div className={`widget-container ${isWidgetOpen ? 'widget-open' : ''} transition-all duration-500 ease-in-out`}>
        <div
          className="widget-button text-white font-bold py-3 px-5 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
          onClick={openWidget}
        >
          <Image src="/mascot.png" alt="Chatbot Icon" width={160} height={160} className="w-10 h-10 object-contain animate-glow" />
          <style>{animationStyles}</style>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={`modal fixed inset-0 flex items-end justify-end z-50 transition-all duration-500 ease-in-out mr-20 mb-20 ${
            isModalOpen ? 'fade-in' : 'fade-out'
          }`}
        >
          <div className="modal-overlay absolute inset-0 opacity-75 transition-all duration-300 ease-in-out"></div>

          <div className="relative modal-content overflow-hidden bg-white rounded-2xl shadow-lg z-10 w-full max-w-xl transition-all duration-500 ease-in-out">
            <div className="rounded-2xl relative h-80 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg p-8 flex justify-between items-center">
              <div
                style={{ backgroundImage: 'url(/african-print.jpg)' }}
                className="absolute inset-0 flex items-center space-x-8 flex-1 shadow-md rounded-2xl"
              ></div>

              <div className="z-10 opacity-85 bg-gradient-to-br from-[#DD16FF] to-blue-500 absolute inset-0 flex items-center space-x-8 flex-1">
                {' '}
              </div>

              <div className="relative z-10 flex flex-col">
                <div className="absolute animate-ping w-6 h-6 bg-white rounded-full top-0 right-0"></div>
                <span className="text-white/85 text-5xl font-bold mb-2">Hello there</span>
                <span className="modal-title text-5xl font-bold">How can I help?</span>
              </div>

              <div
                onClick={closeWidget}
                className="cursor-pointer z-50 flex items-center justify-center absolute w-12 h-12 rounded-full top-6 right-6"
              >
                <IoCloseOutline className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="no-scrollbar relative z-10 modal-body h-xl overflow-y-auto p-6 -mt-16">
              <div className="min-h-24 chat-messages mb-4 bg-white p-4 rounded-lg shadow-md">
                {chatMessages.length ? (
                  chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${msg.sender.toLowerCase() === 'user' ? 'user-message' : 'agent-message'} mb-2 text-lg`}
                    >
                      <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col">
                    <span className="text-gray-800 text-2xl font-bold">Send me a message</span>
                    <span className="mt-1 text-gray-500 modal-title text-xl">I'm always here to help you</span>
                  </div>
                )}
              </div>

              <div className="mt-6 input-group flex">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ask me something..."
                />
                <button
                  onClick={handleSend}
                  className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <IoSendSharp className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
