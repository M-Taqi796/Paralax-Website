import React from 'react';
import { ReactLenis } from 'lenis/react';
import NavBar from './NavBar';
import BusAnimation from './BusAnimation';
import Features from './Features';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="bg-transparent min-h-screen text-black font-sans">
        <NavBar />
        <BusAnimation />
        <Features />
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
