'use client'

import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { ItineraryDocument } from "@/models/Itinerary";

export default function ShortItinerary({ data }: { data: ItineraryDocument }) {
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
      threshold: 0.5,
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

  return (
    <>
      <div className="relative flex flex-col md:gap-[75px] gap-14 items-center md:items-baseline w-full md:px-32">
        {data.locations.map((location, index) => (
          <div
            key={location.locationName}
            ref={(el) => { containerRefs.current[index] = el; }}
            className={`relative flex flex-col font-bold border-[2px] rounded-[1px] node-shadow h-[150px] w-[350px] p-5 opacity-0 ${
              index % 2 === 1 ? "md:ml-auto" : ""
            }`}
            id="loc"
          >
            <h2 className="text-3xl">{location.locationName}</h2>
            <div className="flex justify-center items-center w-full h-full flex-col">
              <h2 className="text-xl text-center font-medium">{location.locationHighlight}</h2>
              <h2 className="text-xl font-medium">{location.date}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
