import Image from "next/image";
import Logo from '@/assets/yaadigo.webp';
import { ItineraryDocument } from "@/models/Itinerary";

export default function Loader({data}: {data: ItineraryDocument}) {
  return (
    <>
      <div className="h-[100vh]">
        <div className="flex h-full w-full justify-center items-center flex-col gap-5">
          <div className="shadow-2xl rounded-full p-1 loader w-[150px] h-[150px]">
            <div className="w-[142px] h-[142px] bg-white rounded-full flex justify-center items-center">
              <Image src={Logo} alt="Yaadigo" width={60} height={60} />
            </div>            
          </div>
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-xl">Hi, {data.client}!</h4>
            <h4 className="text-xl">{data.title}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
