import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const TOTAL_FRAMES = 80;
const BUS_FRAMES = 40;

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
      let src = '';
      if (i <= BUS_FRAMES) {
        const frameNumber = i.toString().padStart(3, '0');
        src = `/BusAnimation/ezgif-frame-${frameNumber}.webp`;
      } else {
        const frameNumber = (i - BUS_FRAMES).toString().padStart(3, '0');
        src = `/MobileAnimation/ezgif-frame-${frameNumber}.webp`;
      }
      img.src = src;
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
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
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
        // Canvas is narrower than image (e.g. mobile/tablet)
        renderWidth = canvas.width;

        // Make image wider on small screens to crop edges and zoom in slightly
        if (window.innerWidth < 768) {
          renderWidth = canvas.width * 1.8; // mobile: heavily crop sides to make bus larger
        } else if (window.innerWidth < 1024) {
          renderWidth = canvas.width * 1.3; // tablet: crop slightly
        }

        renderHeight = renderWidth / imgRatio;
        x = (canvas.width - renderWidth) / 2; // Center horizontally (crops equally from left/right)
        y = 0; // Lock to top
      } else {
        // Canvas is wider than image (e.g. ultrawide)
        renderHeight = canvas.height;
        renderWidth = renderHeight * imgRatio;
        x = (canvas.width - renderWidth) / 2;
        y = 0; // Lock to top
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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#d5d5d5] text-black">
          <div className="w-12 h-12 border-4 border-[#2086BF]/20 border-t-[#2086BF] rounded-full animate-spin mb-4"></div>
          <p className="text-[#2086BF]/70 tracking-tight">Loading Experience... {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%</p>
        </div>
      )}

      <div ref={containerRef} className="relative h-[800vh] bg-transparent">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas for rendering images */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />

          {/* Text Overlays Layer */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center @container px-[var(--fluid-x)]">

            {/* 0% Scroll: Centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: opacity1 }}
            >
              <div className="text-center bg-white/60 backdrop-blur-lg p-[var(--fluid-p)] rounded-3xl border border-white/40 shadow-2xl max-w-[min(100%,40rem)]">
                <h1 className="text-[length:var(--fluid-h1)] lg:text-5xl lg:leading-tight font-bold tracking-tight text-[#2086BF] mb-4 leading-tight">The Future of Movement</h1>
              </div>
            </motion.div>

            {/* 30% Scroll: Left Aligned */}
            <motion.div
              className="absolute inset-0 flex items-center justify-start"
              style={{ opacity: opacity2 }}
            >
              <div className="max-w-[min(100%,32rem)] bg-white/60 backdrop-blur-lg p-[var(--fluid-p)] rounded-3xl border border-white/40 shadow-2xl">
                <h2 className="text-[length:var(--fluid-h2)] lg:text-4xl lg:leading-tight font-bold tracking-tight text-[#2086BF] mb-4 leading-tight">Smart Transport System</h2>
                <p className="text-[length:var(--fluid-p)] lg:text-base text-[#2086BF]/70 tracking-tight leading-relaxed">
                  Seamlessly integrated modular design that separates for efficiency and expands for maximum utility.
                </p>
              </div>
            </motion.div>

            {/* 60% Scroll: Right Aligned */}
            <motion.div
              className="absolute inset-0 flex items-center justify-end"
              style={{ opacity: opacity3 }}
            >
              <div className="max-w-[min(100%,32rem)] text-right bg-white/60 backdrop-blur-lg p-[var(--fluid-p)] rounded-3xl border border-white/40 shadow-2xl">
                <h2 className="text-[length:var(--fluid-h2)] lg:text-4xl lg:leading-tight font-bold tracking-tight text-[#2086BF] mb-4 leading-tight">Easse University Traveling</h2>
                <p className="text-[length:var(--fluid-p)] lg:text-base text-[#2086BF]/70 tracking-tight leading-relaxed">
                  Engineered from the inside out to handle the busiest campus routes with precision and elegance.
                </p>
              </div>
            </motion.div>

            {/* 90% Scroll: Centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: opacity4 }}
            >
              <div className="text-center bg-white/60 backdrop-blur-lg p-[var(--fluid-p)] rounded-3xl border border-white/40 shadow-2xl max-w-[min(100%,40rem)]">
                <h2 className="text-[length:var(--fluid-h1)] lg:text-5xl lg:leading-tight font-bold tracking-tight text-[#2086BF] mb-8 leading-tight">Ready to Ride?</h2>
                <button
                  className="pointer-events-auto px-8 py-4 min-h-[44px] min-w-[44px] bg-[#2086BF] text-white font-semibold rounded-full hover:bg-[#2086BF]/90 transition-all duration-300 ease-out text-[length:var(--fluid-p)] lg:text-base tracking-tight focus-visible:ring-4 focus-visible:ring-[#2086BF]/50 focus-visible:outline-none"
                  aria-label="Download UniGo App"
                >
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
