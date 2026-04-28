import React from 'react';
import { motion } from 'framer-motion';

export default function Features() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-transparent z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
        className="text-center"
      >
        <h2 className="text-[length:var(--fluid-h1)] lg:text-7xl lg:leading-none font-bold tracking-tight text-[#2086BF]">
          Features
        </h2>
      </motion.div>
    </div>
  );
}
