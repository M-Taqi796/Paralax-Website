import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const TOTAL_FRAMES = 40;

export default function BusAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Load all images on mount
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Format number to 3 digits, e.g., 001
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/BusAnimation/ezgif-frame-${frameNumber}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4, 0.45, 1], [0, 0, 1, 1, 0, 0]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5, 0.6, 0.7, 0.75, 1], [0, 0, 1, 1, 0, 0]);
  const opacity4 = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, 1, 1]);

  useEffect(() => {
    if (imagesLoaded < TOTAL_FRAMES) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Make canvas resize to match viewport while maintaining aspect ratio
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndex.get());
    };

    const renderFrame = (index) => {
      if (imagesLoaded < TOTAL_FRAMES) return;
      const currentImage = images[Math.round(index)];
      if (!currentImage) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the image dimensions to "contain" it in the canvas
      const imgRatio = currentImage.width / currentImage.height;
      const canvasRatio = canvas.width / canvas.height;

      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let x = 0;
      let y = 0;

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        renderWidth = canvas.width;
        renderHeight = renderWidth / imgRatio;
        y = (canvas.height - renderHeight) / 2;
      } else {
        // Image is taller than canvas
        renderHeight = canvas.height;
        renderWidth = renderHeight * imgRatio;
        x = (canvas.width - renderWidth) / 2;
      }

      ctx.drawImage(currentImage, x, y, renderWidth, renderHeight);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Subscribe to framer-motion scroll updates
    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      unsubscribe();
    };
  }, [imagesLoaded, images, frameIndex]);

  return (
    <>
      {/* If loading, show spinner as an overlay */}
      {imagesLoaded < TOTAL_FRAMES && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-black">
          <div className="w-12 h-12 border-4 border-[#2086BF]/20 border-t-[#2086BF] rounded-full animate-spin mb-4"></div>
          <p className="text-[#2086BF]/70 tracking-tight">Loading Experience... {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%</p>
        </div>
      )}

      <div ref={containerRef} className="relative h-[400vh] bg-transparent">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas for rendering images */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />

          {/* Text Overlays Layer */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-8 md:px-24">

            {/* 0% Scroll: Centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: opacity1 }}
            >
              <div className="text-center bg-white/60 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/40 shadow-2xl">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2086BF] mb-4">The Future of Movement</h1>
              </div>
            </motion.div>

            {/* 30% Scroll: Left Aligned */}
            <motion.div
              className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2"
              style={{ opacity: opacity2 }}
            >
              <div className="max-w-md bg-white/60 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/40 shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2086BF] mb-4">Smart Transport System</h2>
                <p className="text-lg text-[#2086BF]/70 tracking-tight leading-relaxed">
                  Seamlessly integrated modular design that separates for efficiency and expands for maximum utility.
                </p>
              </div>
            </motion.div>

            {/* 60% Scroll: Right Aligned */}
            <motion.div
              className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2"
              style={{ opacity: opacity3 }}
            >
              <div className="max-w-md text-right ml-auto bg-white/60 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/40 shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2086BF] mb-4">Easse University Traveling</h2>
                <p className="text-lg text-[#2086BF]/70 tracking-tight leading-relaxed">
                  Engineered from the inside out to handle the busiest campus routes with precision and elegance.
                </p>
              </div>
            </motion.div>

            {/* 90% Scroll: Centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: opacity4 }}
            >
              <div className="text-center bg-white/60 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/40 shadow-2xl">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2086BF] mb-8">Ready to Ride?</h2>
                <button className="pointer-events-auto px-8 py-4 bg-[#2086BF] text-white font-semibold rounded-full hover:bg-[#2086BF]/90 transition-colors text-lg tracking-tight">
                  Download App
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
