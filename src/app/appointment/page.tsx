'use client';

import { useState, useEffect, useId, useRef } from 'react';
import Stepper, { StepInterface } from '../components/Stepper';
import TextInput from '../components/inputs/TextInput';
import Select from '../components/Select';

interface Region {
  nombre: string;
  codigo: string;
}

interface Comuna {
  nombre: string;
  codigo: string;
}

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
  const [regionOptions, setRegionOptions] = useState<Region[]>([]);
  const [communeOptions, setCommuneOptions] = useState<Comuna[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedComuna, setSelectedComuna] = useState<string>('');

  // Carga regiones al montar
  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then((data: Region[]) => {
        setRegionOptions(data);
      })
      .catch(console.error);
  }, []);


  // Carga comunas cuando cambia la región
  useEffect(() => {
    fetch(`/api/regions/${selectedRegion}/communes`)
      .then(res => res.json())
      .then((data: Region[]) => {
        setCommuneOptions(data);
      })
      .catch(console.error);
  }, [selectedRegion]);

  const steps: StepInterface[] = [
    {
      title: 'Información inicial',
      content: (
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Información personal</p>

            {/* Selector de tipo de ID */}
            <div className="flex gap-4">
              {['rut', 'pasaporte'].map((type) => (
                <button
                  key={type}
                  className={`border rounded-full px-3 py-1 text-sm transition ${selectedIdType === type
                    ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                    : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
                    }`}
                  onClick={() => setSelectedIdType(type as 'rut' | 'pasaporte')}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            <TextInput
              label={selectedIdType === 'rut' ? 'RUT' : 'Pasaporte'}
              value={idNumber}
              onChange={setIdNumber}
              name="id-number"
            />

            <Select
              label="Previsión"
              value={selectedInsurance}
              onChange={setSelectedInsurance}
              options={[
                { label: "Fonasa", value: "fonasa" },
                { label: "Isapre 1", value: "isapre-1" },
                { label: "Isapre 2", value: "isapre-2" },
                { label: "Isapre 3", value: "isapre-3" },
                { label: "Isapre 4", value: "isapre-4" },
                { label: "Isapre 5", value: "isapre-5" },
                { label: "Particular", value: "particular" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Información general</p>

            <Select
              label="Tipo de servicio"
              value={selectedServiceType}
              onChange={setSelectedServiceType}
              options={[
                { label: "Consulta médica", value: "consultation" },
                { label: "Exámenes", value: "examination" },
                { label: "Procedimiento", value: "procedure" },
              ]}
            />

            {selectedServiceType === 'consultation' && (
              <Select
                label="Tipo de atención"
                value={selectedAttentionType}
                onChange={setSelectedAttentionType}
                options={[
                  { label: "Presencial", value: "presencial" },
                  { label: "Telemedicina", value: "remote" },
                  { label: "Domicilio", value: "inPlace" },
                ]}
              />
            )}

            {(selectedServiceType === 'examination' ||
              selectedServiceType === 'procedure' ||
              selectedAttentionType === 'presencial') ? (
              <Select
                label="Lugar de atención"
                value={selectedAttentionPlace}
                onChange={setSelectedAttentionPlace}
                options={[
                  { label: "Clínica Central", value: "central" },
                  { label: "Sucursal Norte", value: "north" },
                  { label: "Sucursal Sur", value: "south" },
                  { label: "Sucursal Oriente", value: "east" },
                ]}
              />
            ) : (
              // Aquí va el selector combinado Región + Comuna
              <DoubleSelect
                regionLabel="Región"
                comunaLabel="Comuna"
                regions={regionOptions.map(r => ({ label: r.nombre, value: r.codigo }))}
                comunas={communeOptions.map(c => ({ label: c.nombre, value: c.codigo }))}
                selectedRegion={selectedRegion}
                selectedComuna={selectedComuna}
                onRegionChange={(val) => {
                  setSelectedRegion(val);
                  setSelectedComuna(""); // Reinicia comuna si cambia región
                }}
                onComunaChange={setSelectedComuna}
              />
            )}
          </div>
        </div>
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
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] shadow-lg m-10 p-10 w-4xl rounded-4xl gap-6">
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

interface Option {
  label: string;
  value: string;
}

interface DoubleSelectProps {
  regionLabel: string;
  comunaLabel: string;
  regions: Option[];
  comunas: Option[];
  selectedRegion: string;
  selectedComuna: string;
  onRegionChange: (value: string) => void;
  onComunaChange: (value: string) => void;
}

function DoubleSelect({
  regionLabel,
  comunaLabel,
  regions,
  comunas,
  selectedRegion,
  selectedComuna,
  onRegionChange,
  onComunaChange,
}: DoubleSelectProps) {
  const regionId = useId();
  const comunaId = useId();
  const [openMenu, setOpenMenu] = useState<'region' | 'comuna' | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selectedRegionLabel = regions.find(r => r.value === selectedRegion)?.label || "";
  const selectedComunaLabel = comunas.find(c => c.value === selectedComuna)?.label || "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const comunaDisabled = !selectedRegion;

  return (
    <div className="flex max-w-full items-center" ref={ref}>
      {/* Región */}
      <div className="relative w-64">
        <div
          id={regionId}
          className={
            `peer border border-[var(--color-foreground)] border-r-0 rounded-l-full px-4 py-4 w-full cursor-pointer focus:outline-none bg-[var(--color-background)] ` +
            `${selectedRegion ? 'text-[var(--color-foreground)]' : 'text-transparent'}`
          }
          onClick={() => setOpenMenu(openMenu === 'region' ? null : 'region')}
        >
          {selectedRegionLabel || regionLabel}
        </div>
        <label
          htmlFor={regionId}
          className={
            `absolute left-4 text-[var(--color-foreground)] transition-all ` +
            `${!selectedRegion && openMenu !== 'region' ? 'top-4 text-base' : '-top-2 text-sm'} ` +
            `bg-[var(--color-background)] px-1 pointer-events-none`
          }
        >
          {regionLabel}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {openMenu === 'region' && (
          <ul className="absolute z-10 mt-2 w-full border border-[var(--color-foreground)] rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
            {regions.map((r) => (
              <li
                key={r.value}
                className={`px-4 py-2 cursor-pointer ${selectedRegion === r.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'hover:bg-[var(--color-foreground)]/20'}`}
                onClick={() => {
                  onRegionChange(r.value);
                  onComunaChange("");
                  setOpenMenu(null);
                }}
              >
                {r.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Comuna */}
      <div className="relative w-64">
        <div
          id={comunaId}
          className={
            `peer border border-[var(--color-foreground)]  rounded-r-full px-4 py-4 w-full cursor-pointer focus:outline-none ` +
            `${comunaDisabled ? 'bg-[var(--color-foreground)]/20 cursor-not-allowed pointer-events-none' : 'bg-[var(--color-background)]'} ` +
            `${selectedComuna ? 'text-[var(--color-foreground)]' : 'text-transparent'}`
          }
          onClick={() => {
            if (!comunaDisabled) {
              setOpenMenu(openMenu === 'comuna' ? null : 'comuna');
            }
          }}
        >
          {selectedComunaLabel || comunaLabel}
        </div>
        <label
          htmlFor={comunaId}
          className={
            `absolute left-4 text-[var(--color-foreground)] transition-all ` +
            `${!selectedComuna && openMenu !== 'comuna' ? 'top-4 text-base' : '-top-2 text-sm'} ` +
            `${comunaDisabled ? 'bg-transparent cursor-not-allowed pointer-events-none' : 'bg-[var(--color-background)]'} ` +
            `px-1 pointer-events-none`
          }
        >
          {comunaLabel}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {openMenu === 'comuna' && !comunaDisabled && (
          <ul className="absolute z-10 mt-2 w-full border border-[var(--color-foreground)] rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
            {comunas.map((c) => (
              <li
                key={c.value}
                className={`px-4 py-2 cursor-pointer ${selectedComuna === c.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'hover:bg-[var(--color-foreground)]/20'}`}
                onClick={() => {
                  onComunaChange(c.value);
                  setOpenMenu(null);
                }}
              >
                {c.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

