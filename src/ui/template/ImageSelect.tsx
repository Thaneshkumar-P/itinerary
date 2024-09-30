'use client'

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; 
import { Plus } from "lucide-react"; 
import { Label } from "@/components/ui/label"; 
import Image from "next/image";

const ImageSelect = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      className="grid w-full h-[350px] border-2 rounded-xl border-dashed items-center gap-1.5 col-span-4 cursor-pointer"
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: '#e4e4e7'
      }}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <input
          ref={fileInputRef}
          id="cover-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Cover"
            className="w-full h-[345px] object-fill object-top rounded-xl"
            width={100}
            height={340}
          />
        ) 
        : 
        <>
          <Button
            size="icon"
            className="rounded-full border bg-white hover:bg-gray-300 h-12 w-12"
          >
            <Plus color="black" size={40} />
          </Button>
          <Label htmlFor="days" className="text-base text-gray-500">
            Add Cover Image
          </Label>
        </>
        }
      </div>
    </motion.div>
  );
};

export default ImageSelect;
