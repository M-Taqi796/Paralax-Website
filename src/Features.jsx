import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QrCode, UserCheck, MapPin, Route, FileText, MessageSquareWarning } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "QR Based Boarding",
    description: "Simply scan the QR code to board instantly. No physical tickets required.",
    icon: QrCode
  },
  {
    id: 2,
    title: "Seat Availability & AI",
    description: "Check available seats in real-time. Our AI predicts how crowded the next bus will be.",
    icon: UserCheck
  },
  {
    id: 3,
    title: "Bus Live Location",
    description: "Track your bus on a live map so you always know exactly when it will arrive.",
    icon: MapPin
  },
  {
    id: 4,
    title: "Bus Redirection AI",
    description: "Missed your bus? AI instantly suggests alternative reachable stops and routes.",
    icon: Route
  },
  {
    id: 5,
    title: "Online Fee Submission",
    description: "Get your Challan Paper online and pay fees instantly without visiting the MTO Office.",
    icon: FileText
  },
  {
    id: 6,
    title: "Direct Complaints",
    description: "Submit complaints and feedback directly to the MTO for rapid resolution.",
    icon: MessageSquareWarning
  }
];

export default function Features() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Animate heading from center to top
  const headingY = useTransform(scrollYProgress, [0, 0.15], ["0vh", "-35vh"]);
  const headingScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 1, 1]); // Fades in if needed

  // Animate cards sliding from right to left
  const cardsX = useTransform(scrollYProgress, [0.15, 1], ["100vw", "-200vw"]);



  return (
    <div ref={targetRef} className="relative h-[600vh] w-full z-10" style={{ background: '#0d1f2d' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Tech Circuit Board Texture Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64b1deff" strokeWidth="0.5" />
            </pattern>
            <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="1.5" fill="#64b1deff" />
              <circle cx="60" cy="0" r="1.5" fill="#64b1deff" />
              <circle cx="0" cy="60" r="1.5" fill="#64b1deff" />
              <circle cx="60" cy="60" r="1.5" fill="#64b1deff" />
              <circle cx="30" cy="30" r="1" fill="#64b1deff" />
            </pattern>
            {/* Circuit lines */}
            <pattern id="circuits" width="180" height="180" patternUnits="userSpaceOnUse">
              {/* Horizontal traces */}
              <line x1="0" y1="30" x2="60" y2="30" stroke="#64b1deff" strokeWidth="1" />
              <line x1="120" y1="30" x2="180" y2="30" stroke="#64b1deff" strokeWidth="1" />
              <line x1="0" y1="150" x2="90" y2="150" stroke="#64b1deff" strokeWidth="1" />
              <line x1="90" y1="90" x2="180" y2="90" stroke="#64b1deff" strokeWidth="1" />
              {/* Vertical traces */}
              <line x1="60" y1="0" x2="60" y2="30" stroke="#64b1deff" strokeWidth="1" />
              <line x1="60" y1="30" x2="60" y2="90" stroke="#64b1deff" strokeWidth="1" />
              <line x1="90" y1="90" x2="90" y2="150" stroke="#64b1deff" strokeWidth="1" />
              <line x1="120" y1="0" x2="120" y2="30" stroke="#64b1deff" strokeWidth="1" />
              <line x1="30" y1="150" x2="30" y2="180" stroke="#64b1deff" strokeWidth="1" />
              {/* Nodes (pads) */}
              <circle cx="60" cy="30" r="3.5" fill="none" stroke="#64b1deff" strokeWidth="1" />
              <circle cx="90" cy="90" r="3.5" fill="none" stroke="#64b1deff" strokeWidth="1" />
              <circle cx="120" cy="30" r="3.5" fill="none" stroke="#64b1deff" strokeWidth="1" />
              <circle cx="30" cy="150" r="3.5" fill="none" stroke="#64b1deff" strokeWidth="1" />
              <circle cx="90" cy="150" r="3.5" fill="none" stroke="#64b1deff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#circuits)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(32,134,191,0.18) 0%, transparent 70%)'
          }}
        />


        {/* Animated Heading */}
        <motion.div
          style={{ y: headingY, scale: headingScale, opacity: headingOpacity }}
          className="absolute z-20 flex justify-center w-full px-[var(--fluid-x)]"
        >
          <h2 className="text-[length:var(--fluid-h1)] lg:text-7xl lg:leading-none font-bold tracking-tight text-[#2086BF] text-center bg-[#ffffff] px-12 py-4 rounded-full border border-white/50 shadow-2xl">
            App Features
          </h2>
        </motion.div>

        {/* Horizontal Scrolling Cards Container */}
        <motion.div
          style={{ x: cardsX }}
          className="absolute flex gap-8 md:gap-16 items-center pt-24 px-8 md:px-[10vw]"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="w-[85vw] max-w-sm md:w-[400px] h-auto shrink-0 bg-[#ffffff] rounded-[2.5rem] border border-white/50 shadow-2xl p-10 flex flex-col items-center text-center hover:-translate-y-4 transition-transform duration-500 ease-out"
              >
                <div className="w-24 h-24 rounded-full bg-[#2086BF]/10 flex items-center justify-center mb-8 shadow-inner border border-[#2086BF]/20">
                  <Icon className="w-12 h-12 text-[#2086BF]" strokeWidth={1.5} />
                </div>

                <h3 className="text-[length:var(--fluid-h2)] lg:text-3xl font-bold tracking-tight text-[#2086BF] mb-4 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-[length:var(--fluid-p)] lg:text-base text-[#2086BF]/70 tracking-tight leading-relaxed">
                  {feature.description}
                </p>


              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
