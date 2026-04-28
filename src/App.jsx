import React from 'react';
import NavBar from './NavBar';
import BusAnimation from './BusAnimation';
import Features from './Features';
import './App.css';

function App() {
  return (
    <div className="bg-transparent min-h-screen text-black font-sans">
      <NavBar />
      <BusAnimation />
      <Features />
    </div>
  );
}

export default App;
