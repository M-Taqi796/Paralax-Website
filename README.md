# Bus Parallax Scroll Animation

A stunning, interactive web experience built with React, Vite, and Framer Motion. This project features a smooth, scroll-linked image sequence animation combined with dynamic text overlays, creating a premium Apple-style parallax effect.

## 🚀 How to Clone and Run Locally

Follow these steps to get the project up and running on your local machine:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Paralax-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   Open your browser and navigate to `http://localhost:5173/` (or the URL provided in your terminal).

## 🛠️ How It Was Made & How It Works

This project is built using modern web development practices to ensure high performance and a seamless user experience.

### Tech Stack
- **React & Vite**: Fast development environment and optimized production builds.
- **Tailwind CSS**: For rapid UI styling and responsive layouts.
- **Framer Motion**: Handles the complex scroll-linked animations and transitions.

### How the Animation Works

1. **Canvas Rendering**: Instead of using heavy video files or DOM-heavy `<img>` elements, the animation renders a sequence of 40 individual frames onto an HTML5 `<canvas>`. This ensures buttery-smooth playback tied directly to the user's scroll position.
2. **Scroll Tracking**: Framer Motion's `useScroll` and `useTransform` hooks track the page's scroll progress and map it to a specific frame index (0 to 39).
3. **Dynamic Overlays**: As you scroll, different text overlays fade in and out at specific scroll percentages (0%, 30%, 60%, 90%), also powered by Framer Motion.
4. **Responsive Design**: The canvas automatically resizes and crops the images depending on the viewport size, ensuring the subject stays centered and visible on both mobile and desktop screens.

### Asset Optimization Workflow

To make the heavy image sequence load fast, we processed the assets before adding them to the project:
- **Background Removal (`remove_bg.py`)**: A Python script was used to automatically remove the backgrounds from the raw animation frames.
- **WebP Conversion (`convert.js`)**: A custom Node script using the `sharp` library was run to compress and convert the heavy `.png` frames into the lightweight `.webp` format, drastically reducing the total load time.

## 📦 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Bundles the app into static files for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.
