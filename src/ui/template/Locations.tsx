'use client';

import { useEffect } from 'react';
import anime from 'animejs';
import { mockItineraryData } from '@/lib/data';
import Duration from '@/assets/time.svg';
import Night from '@/assets/night.svg';
import Food from '@/assets/food.svg';
import Hotel from '@/assets/hotel.svg';
import Highlight from '@/assets/highlight.svg';
import Date from '@/assets/date.svg';
import Image from 'next/image';

const AnimatedHeading: React.FC = () => {
  useEffect(() => {
    const headings = document.querySelectorAll('.ml6 .letters');

    const animateHeading = (textWrapper: HTMLElement) => {
      textWrapper.innerHTML = textWrapper.textContent?.replace(/\S/g, "<span class='letter'>$&</span>") || '';

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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateHeading(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 1 });

    headings.forEach(heading => {
      observer.observe(heading);
    });

    return () => {
      headings.forEach(heading => {
        observer.unobserve(heading);
      });
    };
  }, []);

  return (
    <>
      {mockItineraryData.locations.map((location, index) => (
        <div className='h-[100vh] relative p-14' key={location.locationName}>
          <h1 className={`ml6 absolute font-extrabold text-7xl top-[80%] ${index % 2 === 0 ? 'left-10' : 'right-10'}`}>
            <span className='letters'>{location.locationName}</span>
          </h1>
          <div className={`${index % 2 === 0 ? 'left-10 right-[50%]' : 'left-[50%]'} absolute top-[20%]`}>            
            <div className="location-details mt-10 grid grid-cols-2 gap-4">
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
                  <
                    p className="text-md font-medium col-span-4">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-2xl mt-8">{location.overview}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnimatedHeading;
