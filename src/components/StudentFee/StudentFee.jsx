import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { IMAGES } from "../../constants/images";
const images = [
    IMAGES.CS1,
    IMAGES.CS2,
    IMAGES.CS3,
    IMAGES.CS4,
    IMAGES.CS5
  ];
export default function InfiniteCarousel() {
   
  return (
    <div className="flex MyGradient container mx-auto py-10">
      <motion.div
        initial={{ x: `0` }}
        animate={{ x: `-100%` }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((images, index) => {
          return <img className="h-40 w-56 pr-20" src={images} key={index} />;
        })}
      </motion.div>

      <motion.div
        initial={{ x: `0` }}
        animate={{ x: `-100%` }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((images, index) => {
          return <div>
            <img className="h-40 w-56 pr-20" src={images} key={index} />
          </div>;
        })}
      </motion.div>
    </div>
  );
}