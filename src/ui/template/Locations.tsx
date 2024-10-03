'use client';

import { useEffect } from 'react';
import anime from 'animejs';
import { mockItineraryData } from '@/lib/data';
import IMG2 from '@/assets/friends.jpg';
import Duration from '@/assets/time.svg';
import Night from '@/assets/night.svg';
import Food from '@/assets/food.svg';
import Hotel from '@/assets/hotel.svg';
import Highlight from '@/assets/highlight.svg';
import Date from '@/assets/date.svg';
import Image from 'next/image';
import { SwiperSlide, Swiper } from 'swiper/react';
import { A11y, Autoplay, Mousewheel, Navigation } from 'swiper/modules';
import 'swiper/css/effect-fade';

const AnimatedHeading: React.FC = () => {
  useEffect(() => {
    const headings = document.querySelectorAll('.ml6 .letters');
    const background = document.querySelectorAll('.ml6')

    const animateHeading = (textWrapper: HTMLElement) => {
      textWrapper.innerHTML = textWrapper.textContent?.replace(/\S/g, "<span class='letter opacity-0'>$&</span>") || '';

      anime.timeline()
      .add({
        targets: textWrapper.querySelectorAll('.letter'),
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el: HTMLElement, i: number) => 50 * i,
        opacity: [0, 1],
      });
    };

    const animeBackground = (background: HTMLDivElement) => {
      anime({
        targets: background,
        opacity: [0, 1],
        duration: 750,
      })
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateHeading(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 1 });

    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animeBackground(entry.target as HTMLDivElement);
          backgroundObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 1 });

    headings.forEach(heading => {
      observer.observe(heading);
    });

    background.forEach(background => {
      backgroundObserver.observe(background);
    });

    return () => {
      headings.forEach(heading => {
        observer.unobserve(heading);
      });
      background.forEach(background => {
        backgroundObserver.unobserve(background);
      });
    };
  }, []);

  return (
    <>
      {mockItineraryData.locations.map((location, index) => (
        <div className="relative p-5 overflow-hidden" key={index}>
          <div className="absolute flex w-full z-[8000] -ml-[20px] justify-end">
            <div className='p-14 overflow-hidden flex flex-col justify-end'>
              <h1 className={`ml6 font-extrabold text-7xl top-[80%] opacity-0 ${index % 2 === 0 ? 'left-10' : 'right-10'}`}>
                <span className='letters'>{location.locationName}</span>
              </h1>
              <div className={`p-5 rounded-md`} style={{ background: 'rgb(255 255 255 / 70%)' }}>
                <div className="location-details flex flex-wrap gap-4">
                  {[
                    { icon: Duration, label: location.locationDays },
                    { icon: Night, label: location.nights },
                    { icon: Date, label: location.date },
                    { icon: Hotel, label: location.locationStay },
                    { icon: Food, label: location.locationMeals },
                    { icon: Highlight, label: location.locationHighlight },
                  ].map(({ icon, label }, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <div className='shadow border w-fit p-2 rounded-2xl'>
                        <Image src={icon} alt={`icon-${label}`} width={40} height={40} />
                      </div>
                      <div className='w-[200px] text-clip'>
                        <p className="text-md font-medium col-span-4">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-2xl">{location.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[100vh] w-full">
            <Swiper
              slidesPerView='auto'
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              autoplay={{
                delay: 5000
              }}
              spaceBetween={25}
              loop={true}
            >
              {mockItineraryData.locations.map((location) => (
                <SwiperSlide className="w-full" key={location.locationName}>
                  <div className="bg-white">
                    <div className="">
                      <Image
                        src={IMG2}
                        alt="img1"
                        className="object-cover w-full h-[100vh] rounded-xl"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnimatedHeading;
