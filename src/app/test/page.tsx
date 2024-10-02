'use client'

import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js"; // Import Anime.js
import { mockItineraryData } from "@/lib/data";

export default function Page() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize Anime.js animations for fade-in effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLDivElement;

          // Trigger fade-in animation with Anime.js
          anime({
            targets: element,
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutQuad',
          });

          observer.unobserve(element);
        }
      });
    }, {
      root: null,
      threshold: .5,
    });

    // Observe each container
    containerRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      // Cleanup: unobserve all elements
      observer.disconnect();
    };
  }, []);

  const curvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const cp1X = x1 + (x2 - x1) / 2; 
    const cp1Y = y1;
    const cp2X = x1 + (x2 - x1) / 2; // Midpoint control point
    const cp2Y = y2;
    return `M ${x1},${y1} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${x2},${y2}`;
  };

  return (
    <>
      <div className="h-[100vh]">

      </div>
      <div className="relative flex flex-col gap-[75px] w-full px-32">
        {mockItineraryData.locations.map((location, index) => (
          <div
            ref={(el) => {containerRefs.current[index] = el}}
            className={`relative flex font-bold border-[2px] rounded-[1px] node-shadow h-[150px] w-[350px] p-5 opacity-0 ${
              index % 2 === 1 ? "ml-auto" : ""
            }`}
            key={location.locationName}
            id="loc"
          >
            <h2 className="text-3xl">{location.locationName}</h2>

            {index < mockItineraryData.locations.length - 1 && (
              <svg
                width="100%"
                height={75} // Adjusted for better spacing
                style={{
                  position: "absolute",
                  top: "100%",
                  left: index % 2 === 1 ? "-350px" : "350px",
                  transform: index % 2 === 1 ? "scaleX(-1)" : "none", // Flip for right boxes
                }}
                id="path"
              >
                <path
                  d={curvePath(
                    0,
                    0, // Starting at the current box
                    350,
                    75 // Fixed height for the path
                  )}
                  fill="transparent"
                  stroke="black"
                  strokeWidth={2}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
