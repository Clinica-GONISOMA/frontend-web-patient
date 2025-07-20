'use client'
import { useState } from 'react'
import Stepper, { StepInterface } from '../components/Stepper';

export default function Appointment() {
  const [step, setStep] = useState(0)

  const steps: StepInterface[] = [
    {
      title: 'Información inicial',
      content: <div>Por favor, ingresa tu información personal.</div>
    },
    {
      title: 'Servicio',
      content: <div>Elige el servicio que deseas reservar.</div>
    },
    {
      title: 'Fecha y hora',
      content: <div>Revisa y confirma tu cita.</div>
    },
    {
      title: 'Confirmación',
      content: <div>Tu cita ha sido reservada exitosamente.</div>
    }
  ]
  return (
    <div className="w-full items-center justify-center flex">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] shadow-lg m-10 p-10 w-4xl rounded-4xl gap-6">
        <Stepper currentStep={step} steps={steps}/>

        <div className="flex justify-between w-xs">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            className="bg-[var(--color-foreground)]/20 text-[var(--color-foreground)] px-4 py-2 rounded-full cursor-pointer"
          >
            Anterior
          </button>
          <button
            onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            className="bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2 rounded-full cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
