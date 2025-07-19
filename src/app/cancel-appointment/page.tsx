'use client';
import { useState } from "react";

export default function CancelAppointment() {
  const [selected, setSelected] = useState<'rut' | 'pasaporte' | null>(null);
  const [value, setValue] = useState('');

  return (
    <div className="w-full items-center justify-center flex">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] shadow-lg m-10 p-10 w-fit rounded-4xl gap-6">
        <p className="text-2xl font-bold">Anular hora</p>

        {/* Selector */}
        <div className="flex gap-4">
          <button
            className={`border rounded-full px-4 py-2 transition ${
              selected === 'rut' ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
            }`}
            onClick={() => setSelected('rut')}
          >
            RUT
          </button>
          <button
            className={`border rounded-full px-4 py-2 transition ${
              selected === 'pasaporte' ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
            }`}
            onClick={() => setSelected('pasaporte')}
          >
            Pasaporte
          </button>
        </div>

        {/* Input */}
        {selected && (
          <input
            type="text"
            placeholder={selected === 'rut' ? 'Ingresa tu RUT' : 'Ingresa tu pasaporte'}
            className="border rounded-full px-4 py-2 w-64 mt-2 caret-[var(--color-foreground)] "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
