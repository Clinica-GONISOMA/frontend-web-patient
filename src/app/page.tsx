'use client'

import Carousel from "./components/Carousel";


export default function Home() {
  const images = [
    '/images/vinadelmar.jpg',
    '/images/puertoaysen.jpg',
    '/images/valparaiso.jpg',
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Carousel images={images} height="h-[500px]" intervalMs={5000} />
    </div>
  );
}



