'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import TopNav from "@/ui/TopNav";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import HM from '@/assets/HM.jpg'

export default function Home() {
  const [selectedCard, setSelectedCard] = useState(false);

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

  return (
    <>
    <div>
      <TopNav />
    </div>
    <div className="md:py-3 md:px-20 px-5 py-1">
      <div>
      <h4 className="text-3xl font-semibold">
        Itinerary Builder
      </h4>
      <div className="grid grid-cols-3 mt-6">
        <motion.div layoutId="card" onClick={() => setSelectedCard(true)}>
          <Card className="h-[200px] flex justify-center items-center">
            <CardContent className="pt-6">
              <Button size="icon" className="rounded-full border bg-white hover:bg-gray-300 h-12 w-12">
                <Plus color="black" size={40} />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
            <motion.div 
              layoutId="card" 
              className="fixed inset-0 top-24 bottom-24 right-48 left-48 bg-white rounded-xl shadow border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-lg p-6 w-full h-[78%]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h5 className="text-xl font-semibold mb-4">Choose Template</motion.h5>
        
                <motion.div className="flex gap-5 grow h-full w-full justify-center">
                  <motion.div
                    variants={container}
                    className="grid md:grid-cols-3 grid-cols-1 gap-5"
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href={'/template?t=friends'} >
                      <motion.div variants={item} className="h-28 w-56 border shadow rounded-xl flex justify-center items-center bg-img-fn" whileHover={{
                        scale: 1.05
                      }} animate={{ opacity: 1, scale: 1}} drag>
                        <motion.h5 className="text-xl font-semibold">Friends</motion.h5>
                      </motion.div>
                    </Link>
                    <Link href={'/template?t=honey'} >
                      <motion.div variants={item} className="h-28 w-56 border shadow rounded-xl flex justify-center items-center bg-img-hm" whileHover={{
                        scale: 1.05
                      }} animate={{ opacity: 1, scale: 1}}
                      >
                        <motion.h5 className="text-xl font-semibold">Honeymoon</motion.h5>
                      </motion.div>
                    </Link>
                    <motion.div variants={item} className="h-28 w-56 border shadow rounded-xl flex justify-center items-center" whileHover={{
                      scale: 1.05
                    }} animate={{ opacity: 1, scale: 1}}>
                      <motion.h5 className="text-xl font-semibold">Example</motion.h5>
                    </motion.div>
                    <motion.div variants={item} className="h-28 w-56 border shadow rounded-xl flex justify-center items-center" whileHover={{
                      scale: 1.05
                    }} animate={{ opacity: 1, scale: 1}}>
                      <motion.h5 className="text-xl font-semibold">Example</motion.h5>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <Button className="mt-4" onClick={() => setSelectedCard(false)}>
                  Close
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  </div>
  </>
  );
}
