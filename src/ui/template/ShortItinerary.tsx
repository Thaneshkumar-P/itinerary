'use client'

import { ItineraryDocument } from "@/models/Itinerary";
import Image from "next/image";
import IMG2 from '@/assets/friends.jpg';
import { useEffect, useState } from "react";

export default function ShortItinerary({ data }: { data: ItineraryDocument }) {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const getImageUrl = (fileId: string) => {
    return `http://localhost:8080/${fileId}`;
  };

  return (
    <>
    {isMobile && 
      <div className="relative flex flex-col gap-20 items-center w-full px-4 md:px-32 py-20">
      {data.locations.map((item, index) => (
        <div 
          key={index} 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
        >
          {index % 2 === 0 ? (
            <>
              {/* Image Section */}
              <div className="relative flex justify-center md:justify-start">
                <Image 
                  width={500} 
                  height={500} 
                  src={IMG2} 
                  alt={getImageUrl(item.images[0])} 
                  className="z-10 w-full max-w-[300px] md:max-w-[500px]" 
                />
                <div className="w-[310px] md:w-[600px] h-[60px] md:h-[150px] bg-white absolute -bottom-10 md:-bottom-20 md:-left-16 z-20 -rotate-6 md:-rotate-12"></div>
              </div>

              {/* Text Section */}
              <div className="flex w-full justify-center items-center px-4 md:px-10 z-40">
                <div>
                  <h4 className="text-2xl md:text-4xl font-semibold text-center">{item.locationName}</h4>
                  <h4 className="text-lg md:text-2xl text-center">{item.overview}</h4>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Image Section */}
              <div className="relative flex justify-center md:justify-start">
                
                <div className="w-[310px] md:w-[600px] h-[60px] md:h-[150px] bg-white absolute -top-[1.5rem] md:-top-20  md:-left-16 z-20 -rotate-6 md:-rotate-12"></div>
                <Image 
                  width={500} 
                  height={500} 
                  src={IMG2} 
                  alt={getImageUrl(item.images[0])} 
                  className="z-10 w-full max-w-[300px] md:max-w-[500px]" 
                />
                <div className="w-[310px] md:w-[600px] h-[60px] md:h-[150px] bg-white absolute -bottom-10 md:-bottom-20  md:-left-16 z-20 -rotate-6 md:-rotate-12"></div>
              </div>

              {/* Text Section */}
              <div className="flex w-full justify-center items-center px-4 md:px-10 z-40">
                <div>
                  <h4 className="text-2xl md:text-4xl font-semibold text-center">{item.locationName}</h4>
                  <h4 className="text-lg md:text-2xl text-center">{item.overview}</h4>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    }
    { !isMobile && (
    <div className="relative flex flex-col gap-20 items-center w-full px-4 md:px-32 py-20">
      {data.locations.map((item, index) => (
        <div 
          key={index} 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
        >
          {index % 2 === 0 ? (
            <>
              {/* Image Section */}
              <div className="relative flex justify-center md:justify-start">
                <Image 
                  width={500} 
                  height={500} 
                  src={IMG2} 
                  alt={getImageUrl(item.images[0])} 
                  className="z-10 w-full max-w-[300px] md:max-w-[500px]" 
                />
                <div className="w-[300px] md:w-[600px] h-[60px] md:h-[150px] bg-white absolute -bottom-10 md:-bottom-20 md:-left-16 z-20 -rotate-6 md:-rotate-12"></div>
              </div>

              {/* Text Section */}
              <div className="flex w-full justify-center items-center px-4 md:px-10 z-40">
                <div>
                  <h4 className="text-2xl md:text-4xl font-semibold text-center">{item.locationName}</h4>
                  <h4 className="text-lg md:text-2xl text-center">{item.overview}</h4>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Text Section */}
              <div className="flex w-full justify-center items-center px-4 md:px-10 z-40">
                <div>
                  <h4 className="text-2xl md:text-4xl font-semibold text-center">{item.locationName}</h4>
                  <h4 className="text-lg md:text-2xl text-center">{item.overview}</h4>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative flex justify-center md:justify-start">
                
                <div className="w-[300px] md:w-[600px] h-[60px] md:h-[150px] bg-white absolute -top-[5.5rem] md:-top-20  md:-left-16 z-20 -rotate-6 md:-rotate-12"></div>
                <Image 
                  width={500} 
                  height={500} 
                  src={IMG2} 
                  alt={getImageUrl(item.images[0])} 
                  className="z-10 w-full max-w-[300px] md:max-w-[500px]" 
                />
                <div className="w-[300px] md:w-[600px] h-[60px] md:h-[150px] bg-white absolute -bottom-10 md:-bottom-20  md:-left-16 z-20 -rotate-6 md:-rotate-12"></div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    )
    }
    </>
  );
}
