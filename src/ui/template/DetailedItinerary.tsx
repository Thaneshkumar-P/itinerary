'use client'

import { mockItineraryData } from '@/lib/data';
import IMG2 from '@/assets/friends.jpg';
import { SwiperSlide, Swiper } from 'swiper/react';
import { A11y, Autoplay, Mousewheel, Navigation } from 'swiper/modules';
import Hotel from '@/assets/hotel.svg';
import 'swiper/css/effect-fade';
import Image from 'next/image';

export default function DetailedItinerary() {
  return (
    <div className="flex flex-col gap-12 p-4 md:p-0">
      {mockItineraryData.locations.map((location, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Image Section */}
          <div className="w-full h-[250px] md:w-[500px] md:h-[500px] flex-shrink-0">
            <Swiper
              slidesPerView="auto"
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              autoplay={{
                delay: 5000,
              }}
              spaceBetween={25}
              loop={true}
            >
              <SwiperSlide className="w-full" key={location.locationName}>
                <div className="bg-white h-full">
                  <Image
                    src={IMG2}
                    alt="img1"
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full" key={location.locationName}>
                <div className="bg-white h-full">
                  <Image
                    src={IMG2}
                    alt="img1"
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full" key={location.locationName}>
                <div className="bg-white h-full">
                  <Image
                    src={IMG2}
                    alt="img1"
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-4 w-full">
            <div className="p-3 rounded-full border border-black mb-4">
              <h5 className="font-bold text-lg md:text-2xl">
                Day {index + 1}: {location.locationName}
              </h5>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-5" id="details">
              {Array(7)
                .fill({ value: 0 })
                .map((_, detailIndex) => (
                  <div
                    key={detailIndex}
                    className="p-2 md:p-4 rounded-full border border-black flex gap-2 items-center"
                  >
                    <Image width={25} height={25} src={Hotel} alt="hotel" />
                    <h5 className="font-bold text-sm md:text-2xl">Description</h5>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
