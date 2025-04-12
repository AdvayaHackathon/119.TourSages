'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const doodleIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const doodles = [
      `<svg width="50" height="50" viewBox="0 0 50 50">
          <path d="M25,10 Q35,25 25,40 Q15,25 25,10" 
                fill="none" stroke="#ff6b6b" stroke-width="2"/>
      </svg>`,
      `<svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" 
                  fill="none" stroke="#87ceeb" stroke-width="2"/>
      </svg>`,
      `<svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M5,15 L25,15 M15,5 L15,25" 
                stroke="#98fb98" stroke-width="2"/>
      </svg>`,
      `<svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M10,20 Q20,5 30,20 Q20,35 10,20" 
                fill="none" stroke="#ffd700" stroke-width="2"/>
      </svg>`,
      `<svg width="35" height="35" viewBox="0 0 35 35">
          <path d="M5,30 Q17.5,5 30,30" 
                fill="none" stroke="#ff69b4" stroke-width="2"/>
      </svg>`,
      `<svg width="45" height="45" viewBox="0 0 45 45">
          <polygon points="22.5,5 35,40 10,40" 
                   fill="none" stroke="#9370db" stroke-width="2"/>
      </svg>`,
      `<svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="10" y="10" width="20" height="20" rx="5"
                fill="none" stroke="#40e0d0" stroke-width="2"
                transform="rotate(45 20 20)"/>
      </svg>`
    ];

    function createRandomDoodle() {
      if (!containerRef.current) return;

      const doodle = document.createElement('div');
      doodle.className = 'doodle';
      doodle.style.left = Math.random() * 90 + 'vw';
      doodle.style.top = Math.random() * 90 + 'vh';
      doodle.innerHTML = doodles[Math.floor(Math.random() * doodles.length)];

      containerRef.current.appendChild(doodle);

      gsap.fromTo(doodle, 
        { 
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        { 
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(doodle, {
              opacity: 0,
              y: -20,
              duration: 0.5,
              delay: 3,
              onComplete: () => doodle.remove()
            });
          }
        }
      );
    }

    // Create initial burst of doodles
    for(let i = 0; i < 10; i++) {
      setTimeout(createRandomDoodle, i * 200);
    }

    // Continue creating doodles
    doodleIntervalRef.current = setInterval(createRandomDoodle, 500);

    // Animate title with GSAP
    gsap.from('.title', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });

    // Animate compass with GSAP
    gsap.from('.compass', {
      scale: 0,
      rotation: 360,
      duration: 1.5,
      ease: "back.out(1.7)",
      delay: 0.5
    });

    // Animate loading text with GSAP
    gsap.from('.loading-text', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power2.out"
    });

    // Cleanup function
    return () => {
      if (doodleIntervalRef.current) {
        clearInterval(doodleIntervalRef.current);
      }
      // Kill all GSAP animations
      gsap.killTweensOf('.doodle');
      gsap.killTweensOf('.title');
      gsap.killTweensOf('.compass');
      gsap.killTweensOf('.loading-text');
    };
  }, []);

  return (
    <div className="loading-animation">
      <div ref={containerRef} className="doodle-container"></div>
      <div className="container">
        <h1 className="title">TourSages</h1>
        <svg className="compass" viewBox="0 0 100 100">
          <circle className="compass-circle" cx="50" cy="50" r="45"/>
          <polygon className="compass-arrow" points="50,10 45,50 50,90 55,50" 
                   fill="#ff6b6b" stroke="none"/>
        </svg>
        <p className="loading-text">Planning your adventure...</p>
      </div>

      <style jsx>{`
        .loading-animation {
          margin: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
          font-family: 'Comic Sans MS', cursive;
          overflow: hidden;
        }

        .container {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .title {
          font-size: 3em;
          color: #ff6b6b;
          margin-bottom: 20px;
          position: relative;
        }

        .title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: url("data:image/svg+xml,%3Csvg width='100' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 5 Q 25 0, 50 5 T 100 5' stroke='%23ff6b6b' fill='none' stroke-width='2'/%3E%3C/svg%3E") repeat-x;
          animation: moveWave 2s infinite linear;
        }

        .doodle-container {
          position: absolute;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
        }

        .loading-text {
          font-size: 1.5em;
          color: #666;
          margin-top: 20px;
        }

        @keyframes moveWave {
          from { background-position: 0 0; }
          to { background-position: 100px 0; }
        }

        .compass {
          width: 100px;
          height: 100px;
          margin: 20px auto;
        }

        .compass-circle {
          fill: none;
          stroke: #ff6b6b;
          stroke-width: 2;
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          animation: drawCompass 2s infinite;
        }

        .compass-arrow {
          transform-origin: center;
          animation: rotateArrow 4s infinite ease-in-out;
        }

        @keyframes drawCompass {
          to { stroke-dashoffset: 0; }
        }

        @keyframes rotateArrow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        .doodle {
          position: absolute;
          opacity: 0;
          animation: floatIn 1s forwards;
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation; 