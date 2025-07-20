// components/Stepper.tsx
import { ReactNode } from 'react'

export interface StepInterface {
  title: string
  content: ReactNode
}

interface StepperProps {
  currentStep: number
  steps: StepInterface[]
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full space-y-6">
      {/* Circles and connecting lines */}
      <div className="flex">
        {steps.map((_, index) => (
          <div key={index} className="relative flex-1 flex justify-center items-center max-w-md w-md">
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition
                ${index === currentStep
                  ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                  : index < currentStep
                    ? 'bg-[var(--color-foreground)]/20 text-[var(--color-foreground)]'
                    : 'border-2 border-[var(--color-foreground)]/50'}`}
            >
              {index + 1}
            </div>

            {/* Connector to next: start right after circle, end at container right */}
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-1 bg-[var(--color-foreground)]/20 -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>

      {/* Titles aligned under circles */}
      <div className="flex">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center text-sm font-semibold px-1">
            {step.title}
          </div>
        ))}
      </div>

      {/* Content of current step */}
      <div>
        {steps[currentStep].content}
      </div>
    </div>
  )
}
