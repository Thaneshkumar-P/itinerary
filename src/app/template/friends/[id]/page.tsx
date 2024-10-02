'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import D from '@/assets/Dubai.svg'

import IMG2 from '@/assets/friends.jpg';
import localFont from "next/font/local";
import { mockItineraryData } from "@/lib/data";
import ScrollingLetters from "@/ui/template/Locations";
import ShortItinerary from "@/ui/template/ShortItinerary";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";

const lobster = localFont({ src: '../../../fonts/Lobster-Regular.ttf' });

const calculateFontSize = () => {
  const maxFontSize = 'clamp(2rem, 5vw, 5rem)';
  return maxFontSize;
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}
  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function FriendsPage() {

  const includedRef = useRef(null);
  const excludedRef = useRef(null);

  // Trigger animation when the section is in view
  const isInViewIncluded = useInView(includedRef, { once: false, margin: '0px 0px -100px 0px' });
  const isInViewExcluded = useInView(excludedRef, { once: false, margin: '0px 0px -100px 0px' });

  return (
    <>
      <div className="scrollbar-color">
        <div className="relative">
          <div className="flex justify-center w-full">
            <h4
              className="absolute font-extrabold text-orange-400 z-50 text-center mt-5 w-full"
              id="title"
              style={{
                fontSize: calculateFontSize()
              }}
            >
              {mockItineraryData.title}
            </h4>
          </div>
          <div className="h-[100vh] w-full">
            <Swiper
              slidesPerView={1}
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              loop={true}
            >
              {mockItineraryData.locations.map((location) => (
                <SwiperSlide className="w-full" key={location.locationName}>
                  <div className="deslide-item bg-black">
                    <div>
                      <h4
                        className={`${lobster.className} absolute font-extrabold text-orange-400 z-50 text-center mt-32 w-full`}
                        style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
                      >
                        {location.locationName}
                      </h4>
                    </div>
                    <div className="deslide-cover">
                      <Image
                        src={IMG2}
                        alt="img1"
                        className="object-fill w-full h-[100vh]"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <div className="my-4 font-semibold text-4xl">
          <h4>Short Itinerary</h4>
        </div>
        <ShortItinerary data={mockItineraryData} />
      </div>
      <div className="my-4">
        <ScrollingLetters />
      </div>
      <div className="p-5">
        <div className="md:flex items-stretch">

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-center">Included</h2>
            <motion.div 
              ref={includedRef} 
              variants={container} 
              initial="hidden" 
              animate={isInViewIncluded ? 'visible' : 'hidden'} 
              className="p-20 py-10 flex flex-col gap-5"
            >
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-full text-clip'>
                  <p className="text-md font-medium col-span-4">Included 1</p>
                </div>
              </motion.div>
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-[200px] text-clip'>
                  <p className="text-md font-medium col-span-4">Included 1</p>
                </div>
              </motion.div>
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-[200px] text-clip'>
                  <p className="text-md font-medium col-span-4">Included 1</p>
                </div>
              </motion.div>
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-[200px] text-clip'>
                  <p className="text-md font-medium col-span-4">Included 1</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex-1 border-l-2 border-black">
            <h2 className="text-2xl font-semibold text-center">Excluded</h2>
            <motion.div 
              ref={excludedRef} 
              variants={container} 
              initial="hidden" 
              animate={isInViewExcluded ? 'visible' : 'hidden'} 
              className="p-20 py-10 flex flex-col gap-5"
            >
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-[200px] text-clip'>
                  <p className="text-md font-medium col-span-4">Excluded 1</p>
                </div>
              </motion.div>
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-[200px] text-clip'>
                  <p className="text-md font-medium col-span-4">Excluded 1</p>
                </div>
              </motion.div>
              <motion.div variants={item} className='flex items-center gap-5'>
                <div className='shadow border w-fit p-2 rounded-2xl'>
                  <Image src={D} alt={`icon-${D}`} width={40} height={40} />
                </div>
                <div className='w-[200px] text-clip'>
                  <p className="text-md font-medium col-span-4">Excluded 1</p>
                </div>
              </motion.div>
              {/* Add more items as needed */}
            </motion.div>
          </div>

        </div>
      </div>


    </>
  );
}
