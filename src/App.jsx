import React from 'react';
import NavBar from './NavBar';
import BusAnimation from './BusAnimation';
import Features from './Features';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="bg-transparent min-h-screen text-black font-sans">
      <NavBar />
      <BusAnimation />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
