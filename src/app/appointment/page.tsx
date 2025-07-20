'use client';

import { useState, useEffect } from 'react';
import Stepper, { StepInterface } from '../components/Stepper';
import InitialInfoStep from './steps/InitialInfoStep';

export default function Appointment() {
  // Paso actual
  const [step, setStep] = useState<number>(0);

  // Estados de identificación
  const [selectedIdType, setSelectedIdType] = useState<'rut' | 'pasaporte'>('rut');
  const [idNumber, setIdNumber] = useState<string>('');

  // Estados de previsión y servicio
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [selectedAttentionType, setSelectedAttentionType] = useState<string>('');
  const [selectedAttentionPlace, setSelectedAttentionPlace] = useState<string>('');

  // Estados de región/comuna
  const [regionOptions, setRegionOptions] = useState<{ label: string; value: string }[]>([]);
  const [communeOptions, setCommuneOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then((data: { nombre: string; codigo: string }[]) => {
        setRegionOptions(data.map(r => ({ label: r.nombre, value: r.codigo })));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;
    fetch(`/api/regions/${selectedRegion}/communes`)
      .then(res => res.json())
      .then((data: { nombre: string; codigo: string }[]) => {
        setCommuneOptions(data.map(c => ({ label: c.nombre, value: c.codigo })));
      })
      .catch(console.error);
  }, [selectedRegion]);

  const steps: StepInterface[] = [
    {
      title: 'Información inicial',
      content: (
        <InitialInfoStep
          selectedIdType={selectedIdType}
          setSelectedIdType={setSelectedIdType}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
          selectedInsurance={selectedInsurance}
          setSelectedInsurance={setSelectedInsurance}
          selectedServiceType={selectedServiceType}
          setSelectedServiceType={setSelectedServiceType}
          selectedAttentionType={selectedAttentionType}
          setSelectedAttentionType={setSelectedAttentionType}
          selectedAttentionPlace={selectedAttentionPlace}
          setSelectedAttentionPlace={setSelectedAttentionPlace}
          regionOptions={regionOptions}
          communeOptions={communeOptions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCommune={selectedCommune}
          setSelectedCommune={setSelectedCommune}
        />
      ),
    },
    {
      title: 'Servicio',
      content: <div>Elige el servicio que deseas reservar.</div>,
    },
    {
      title: 'Fecha y hora',
      content: <div>Revisa y confirma tu cita.</div>,
    },
    {
      title: 'Confirmación',
      content: <div>Tu cita ha sido reservada exitosamente.</div>,
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] shadow-lg w-fit m-10 p-10 rounded-4xl gap-6">
        <Stepper currentStep={step} steps={steps} />

        <div className="flex justify-between w-xs">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            className="bg-[var(--color-foreground)]/20 text-[var(--color-foreground)] px-4 py-2 rounded-full"
          >
            Anterior
          </button>
          <button
            onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            className="bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2 rounded-full"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}



