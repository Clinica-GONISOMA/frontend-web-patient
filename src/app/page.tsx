'use client'

import Carousel from "./components/Carousel";
import ImageTopCard from "./components/ImageTopCard";


export default function Home() {
  const images = [
    '/images/banner-1.webp',
    '/images/banner-2.webp',
    '/images/banner-3.webp',
    '/images/banner-4.webp',
    '/images/banner-5.webp',
    '/images/banner-6.webp',
  ]

  return (
    <div className="mx-20 flex flex-col items-center justify-center">
      <Carousel images={images} height="h-[400px]" intervalMs={5000} />
      <div className="my-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Conoce nuestros planes</h1>
        <p className="text-lg mb-8">Elige el plan que mejor se adapte a tus necesidades de salud y paga menos por tus atenciones</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ImageTopCard
            imageSrc="/images/patient-1.webp"
            title="Plan Básico"
            description="Ideal para quienes buscan atención médica general."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Básico seleccionado')}
          />
          <ImageTopCard
            imageSrc="/images/patient-2.webp"
            title="Plan Avanzado"
            description="Para quienes necesitan atención especializada."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Avanzado seleccionado')}
          />
          <ImageTopCard
            imageSrc="/images/patient-3.webp"
            title="Plan Premium"
            description="Atención integral con beneficios exclusivos."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Premium seleccionado')}
          />
        </div>

      </div>
    </div>
  );
}



