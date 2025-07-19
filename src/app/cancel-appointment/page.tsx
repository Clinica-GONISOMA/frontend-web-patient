'use client';
import { useState } from "react";

export default function CancelAppointment() {
  const [selected, setSelected] = useState<'rut' | 'pasaporte' | null>(null);
  const [idNumber, setIdNumber] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState('');

  return (
    <div className="w-full items-center justify-center flex">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] shadow-lg m-10 p-10 w-fit rounded-4xl gap-6">
        <p className="text-2xl font-bold">Anular hora</p>

        {/* Selector */}
        <div className="flex gap-4">
          <button
            className={`border rounded-full px-4 py-2 transition ${selected === 'rut' ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
              }`}
            onClick={() => setSelected('rut')}
          >
            RUT
          </button>
          <button
            className={`border rounded-full px-4 py-2 transition ${selected === 'pasaporte' ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
              }`}
            onClick={() => setSelected('pasaporte')}
          >
            Pasaporte
          </button>
        </div>

        {/* Input */}
        {selected && (
          <div className="flex flex-col items-center">

            <input
              type="text"
              placeholder={selected === 'rut' ? 'Ingresa tu RUT' : 'Ingresa tu pasaporte'}
              className="border rounded-full px-4 py-2 w-64 mt-2 focus:outline-none"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder= 'Número de reserva'
              className="border rounded-full px-4 py-2 w-64 mt-5 focus:outline-none "
              value={appointmentNumber}
              onChange={(e) => setAppointmentNumber(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
