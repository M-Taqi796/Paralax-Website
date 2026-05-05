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

const TOTAL = features.length;
const TOTAL_STEPS = TOTAL + 0.5;
const STEP = 1 / TOTAL_STEPS;

/* ─── Individual Stacked Card ─── */
function StackedCard({ feature, index, scrollYProgress }) {
  const startEnter = index * STEP;
  const fullyEntered = (index + 1) * STEP;
  const startExit = (index + 2) * STEP;

  let input = [];
  let yOutput = [];
  let scaleOutput = [];
  let opacityOutput = [];

  if (index === TOTAL - 1) { 
    input = [startEnter, fullyEntered, 1];
    yOutput = [1200, 0, 0];
    scaleOutput = [1, 1, 1];
    opacityOutput = [1, 1, 1];
  } else {
    input = [startEnter, fullyEntered, startExit, 1];
    yOutput = [1200, 0, -40, -80]; 
    scaleOutput = [1, 1, 0.93, 0.85];
    opacityOutput = [1, 1, 1, 1];
  }

  const y = useTransform(scrollYProgress, input, yOutput);
  const scale = useTransform(scrollYProgress, input, scaleOutput);
  const opacity = useTransform(scrollYProgress, input, opacityOutput);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: index + 10, y, scale, opacity }}
    >
      <div className="
        pointer-events-auto
        w-[92vw] max-w-[1000px] 
        h-[520px] sm:h-[480px] lg:h-[500px]
        rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16
        flex flex-col-reverse sm:flex-row items-center justify-between gap-8 sm:gap-12
        relative overflow-hidden
      "
      style={{
        background: 'linear-gradient(135deg, #102a3a 0%, #07131b 100%)',
        border: '1px solid rgba(91,188,230,0.2)',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
      >
        {/* Background Accent Glow inside the card */}
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#2086BF]/20 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Left: Text Content */}
        <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-[55%] z-10 relative">
          <div className="flex items-center gap-4">
            <span className="text-[#5bbce6] font-mono text-xl sm:text-2xl font-bold tracking-widest bg-[#2086BF]/10 px-4 py-1 rounded-full border border-[#5bbce6]/20">
              0{feature.id}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#5bbce6]/40 to-transparent" />
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md">
            {feature.title}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed font-light">
            {feature.description}
          </p>
        </div>
        
        {/* Right: Visual representation */}
        <div className="relative w-full sm:w-[45%] h-[200px] sm:h-full flex items-center justify-center">
          {/* Orbital rings */}
          <motion.div 
            className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-[#5bbce6]/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full border border-dashed border-[#2086BF]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          
          {/* The Icon */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] bg-gradient-to-br from-[#1a3f58] to-[#0a1924] border border-[#5bbce6]/20 flex items-center justify-center shadow-[0_0_50px_rgba(32,134,191,0.2)]">
            <feature.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#5bbce6] drop-shadow-[0_0_15px_rgba(91,188,230,0.4)]" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Timeline Dots ─── */
function ProgressDots({ scrollYProgress }) {
  return (
    <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 hidden lg:flex">
      {features.map((_, index) => {
        const start = index * STEP;
        const fully = (index + 1) * STEP;
        const exit = (index + 2) * STEP;
        
        let input = [start, fully, exit];
        let output = [0.2, 1, 0.2];
        
        if (index === TOTAL - 1) {
          input = [start, fully, 1];
          output = [0.2, 1, 1];
        }
        
        const opacity = useTransform(scrollYProgress, input, output);
        const scale = useTransform(scrollYProgress, input, [0.8, 1.3, 0.8]);
        const backgroundColor = useTransform(scrollYProgress, input, ['#ffffff', '#5bbce6', '#ffffff']);
        
        return (
          <motion.div 
            key={index}
            className="w-2.5 h-2.5 rounded-full"
            style={{ scale, opacity, backgroundColor }}
          />
        );
      })}
    </div>
  );
}

/* ─── Main Features Component ─── */
export default function Features() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Title animations
  const titleY = useTransform(scrollYProgress, [0, STEP], [0, -300]);
  const titleOpacity = useTransform(scrollYProgress, [0, STEP * 0.8], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, STEP], [1, 0.9]);

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <div
      id="features-section"
      ref={targetRef}
      className="relative w-full z-10"
      style={{ backgroundColor: '#07131b', height: `${TOTAL_STEPS * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── Parallax Circuit Background ── */}
        <motion.div 
          className="absolute inset-0 w-full h-[120%] pointer-events-none" 
          style={{ y: bgY }}
        >
          <svg className="w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64b1de" strokeWidth="0.5" />
              </pattern>
              <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="1.5" fill="#64b1de" />
                <circle cx="60" cy="0" r="1.5" fill="#64b1de" />
                <circle cx="0" cy="60" r="1.5" fill="#64b1de" />
                <circle cx="60" cy="60" r="1.5" fill="#64b1de" />
                <circle cx="30" cy="30" r="1" fill="#64b1de" />
              </pattern>
              <pattern id="circuits" width="180" height="180" patternUnits="userSpaceOnUse">
                <line x1="0" y1="30" x2="60" y2="30" stroke="#64b1de" strokeWidth="1" />
                <line x1="120" y1="30" x2="180" y2="30" stroke="#64b1de" strokeWidth="1" />
                <line x1="0" y1="150" x2="90" y2="150" stroke="#64b1de" strokeWidth="1" />
                <line x1="90" y1="90" x2="180" y2="90" stroke="#64b1de" strokeWidth="1" />
                <line x1="60" y1="0" x2="60" y2="30" stroke="#64b1de" strokeWidth="1" />
                <line x1="60" y1="30" x2="60" y2="90" stroke="#64b1de" strokeWidth="1" />
                <line x1="90" y1="90" x2="90" y2="150" stroke="#64b1de" strokeWidth="1" />
                <line x1="120" y1="0" x2="120" y2="30" stroke="#64b1de" strokeWidth="1" />
                <line x1="30" y1="150" x2="30" y2="180" stroke="#64b1de" strokeWidth="1" />
                <circle cx="60" cy="30" r="3.5" fill="none" stroke="#64b1de" strokeWidth="1" />
                <circle cx="90" cy="90" r="3.5" fill="none" stroke="#64b1de" strokeWidth="1" />
                <circle cx="120" cy="30" r="3.5" fill="none" stroke="#64b1de" strokeWidth="1" />
                <circle cx="30" cy="150" r="3.5" fill="none" stroke="#64b1de" strokeWidth="1" />
                <circle cx="90" cy="150" r="3.5" fill="none" stroke="#64b1de" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#circuits)" />
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </motion.div>

        {/* ── Ambient Radial Glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(32,134,191,0.08) 0%, transparent 60%)'
          }}
        />

        {/* ── Progress Timeline Dots ── */}
        <ProgressDots scrollYProgress={scrollYProgress} />

        {/* ── Intro Title ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        >
          <div className="px-10 py-5 rounded-full border border-[#5bbce6]/20 bg-[#07131b]/80 backdrop-blur-md shadow-[0_0_50px_rgba(32,134,191,0.15)] mb-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-[#5bbce6]">
              App Features
            </h2>
          </div>
          <p className="text-[#5bbce6]/60 text-lg sm:text-xl font-medium tracking-widest uppercase">
            Scroll to explore
          </p>
        </motion.div>

        {/* ── Parallax Stacked Cards ── */}
        {features.map((feature, i) => (
          <StackedCard
            key={feature.id}
            feature={feature}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

      </div>
    </div>
  );
}
