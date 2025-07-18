'use client'

import Carousel from "./components/Carousel";


export default function Home() {
  const images = [
    '/images/banner-1.png',
    '/images/banner-2.png',
    '/images/banner-3.png',
    '/images/banner-4.jpg',
    '/images/banner-5.jpg',
    '/images/banner-6.jpg',
  ]

  return (
    <div className="mx-20 flex flex-col items-center justify-center">
      <Carousel images={images} height="h-[400px]" intervalMs={5000} />
    </div>
  );
}



