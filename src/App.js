import Chatbot from "./Chatbot";
import Header from "./Chatbot/header";
import "./App.css";
import Analytics from "./Analytics/analytics.js";
import React, { useState } from 'react';
function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  // Function to change the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="container">
    <div className="tab">
        <button
          className={activeTab === 'tab1' ? 'tablinks active' : 'tablinks'}
          onClick={() => handleTabClick('tab1')}
        >
         ChatBot
        </button>
        <button
          className={activeTab === 'tab2' ? 'tablinks active' : 'tablinks'}
          onClick={() => handleTabClick('tab2')}
        >
        Analytics
        </button>
      </div>

      {activeTab === 'tab1' && (
        <>
         <Header />
         <Chatbot />
         </>
      )}

      {activeTab === 'tab2' && (
       <Analytics/>
      )}
    </div>
   
  );
}

export default App;
