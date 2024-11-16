'use client';

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import D from '@/assets/Dubai.svg';
import IMG2 from '@/assets/friends.jpg';
import localFont from "next/font/local";
import { mockItineraryData } from "@/lib/data";
// import ScrollingLetters from "@/ui/template/Locations";
import ShortItinerary from "@/ui/template/ShortItinerary";
import TOC from "@/ui/template/TOC";
import Loader from "@/ui/Loader";
import DetailedItinerary from "@/ui/template/DetailedItinerary";


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
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function FriendsPage() {
  // const [loading, setLoading] = useState(true);
  // const [showContent, setShowContent] = useState(false);
  const includedRef = useRef<HTMLDivElement | null>(null);
  const excludedRef = useRef<HTMLDivElement | null>(null);
  const isInViewIncluded = useInView(includedRef, { once: true, margin: '0px 0px -100px 0px' });
  const isInViewExcluded = useInView(excludedRef, { once: true, margin: '0px 0px -100px 0px' });

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     setTimeout(() => {
  //       setShowContent(true);
  //     }, 1000);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <motion.div
        initial={{ y: 0, display: 'block' }}
        animate={{ y: '-105vh', display: 'none' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 3 }}
        className="fixed z-[9999] top-0 left-0 w-full h-full bg-white flex justify-center items-center"
      >
        <Loader data={mockItineraryData}/>
      </motion.div>
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
                autoplay={{
                  delay: 5000
                }}
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

          <div className="flex items-center justify-center flex-col">
            <div className="my-12 font-semibold text-4xl">
              <h4 className="text-center">Hey John, Start Your Journey Now!</h4>
            </div>
            <ShortItinerary data={mockItineraryData} />
          </div>

          <div className="my-4">
            <div className="flex items-center justify-center flex-col">
              <div className="my-12 font-semibold text-4xl text-center">
                <h4>Excited Already, John? Get the Full Itinerary!</h4>
                <h4 className="font-light text-2xl mt-2">Every Day, Every Place, Every Moment Planned Perfectly</h4>
              </div>
            </div>
            <div className="md:px-20">
              <DetailedItinerary />
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-center justify-center flex-col">
              <div className="my-12 font-semibold text-4xl text-center">
                <h4>Pack Like a Pro, John!</h4>
                <h4 className="font-light text-2xl mt-2">Essentials for Your Perfect Trip</h4>
              </div>
            </div>
            <div className="md:px-20">
              <TOC />
            </div>
          </div>

          <div className="p-5">
            {/* Heading Section */}
            <div className="flex justify-center my-10 flex-col items-center text-center">
              <h1 className="font-bold text-4xl md:text-5xl leading-snug">
                John, Here’s What Yaadigo Has Packed for Your Trip!
              </h1>
              <p className="font-semibold text-xl md:text-2xl mt-3">
                Everything You Need to Know!
              </p>
            </div>

            {/* Content Section */}
            <div className="md:flex items-stretch gap-5">
              {/* Included Section */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-5">
                  Included
                </h2>
                <motion.div
                  ref={includedRef}
                  variants={container}
                  initial="hidden"
                  animate={isInViewIncluded ? 'visible' : 'hidden'}
                  id="included"
                  className="md:p-10 flex flex-col gap-6"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div key={`included-${i}`} variants={item} className="flex items-center gap-5">
                      <div className="shadow border w-fit p-3 rounded-2xl">
                        <Image src={D} alt="Included Icon" width={40} height={40} />
                      </div>
                      <div className="flex-1">
                        <p className="text-md md:text-lg font-medium">Included {i + 1}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
                
              {/* Excluded Section */}
              <div className="flex-1 md:border-l-2 md:border-gray-300">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-5">
                  Excluded
                </h2>
                <motion.div
                  ref={excludedRef}
                  variants={container}
                  initial="hidden"
                  animate={isInViewExcluded ? 'visible' : 'hidden'}
                  id="excluded"
                  className="md:p-10 flex flex-col gap-6"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div key={`excluded-${i}`} variants={item} className="flex items-center gap-5">
                      <div className="shadow border w-fit p-3 rounded-2xl">
                        <Image src={D} alt="Excluded Icon" width={40} height={40} />
                      </div>
                      <div className="flex-1">
                        <p className="text-md md:text-lg font-medium">Excluded {i + 1}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>


          <div className="my-4 w-full">
            <div className="flex items-center justify-center flex-col">
              <div className="my-12 font-semibold text-4xl text-center">
                <h4>John, Let`s Make Your Paris Dream Real</h4>
                <h4 className="font-light text-2xl mt-2">Make every moment truly yours</h4>
              </div>
            </div>
            <div className="md:px-20">
              <div className="grid grid-cols-2">
                <div className="">
                  <h4 className="text-xl font-semibold">Simple Booking Steps</h4>
                  <ul>
                    <li>Initial Booking Deposit: ₹5,000</li>
                    <li>50% Payment: 30 Days Pre-Journey</li>
                    <li>Final Payment: 10 Days Before Departure</li>
                  </ul>
                </div>
                <div className="">
                  <h4 className="text-xl font-semibold">Simple Booking Steps</h4>
                  <ul>
                    <li>Initial Booking Deposit: ₹5,000</li>
                    <li>50% Payment: 30 Days Pre-Journey</li>
                    <li>Final Payment: 10 Days Before Departure</li>
                  </ul>
                </div>
                <div className="">
                  <h4 className="text-xl font-semibold">Simple Booking Steps</h4>
                  <ul>
                    <li>Initial Booking Deposit: ₹5,000</li>
                    <li>50% Payment: 30 Days Pre-Journey</li>
                    <li>Final Payment: 10 Days Before Departure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
