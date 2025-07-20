'use client';
import { useId, useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  name?: string;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  name,
  className = "",
}: SelectProps) {
  const autoId = useId();
  const inputId = name || autoId;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-64 ${className}`} ref={ref}>
      <div
        id={inputId}
        className={`peer border rounded-full px-4 py-4 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-foreground)] bg-[var(--color-background)] border-[var(--color-foreground)]
        ${selectedOption ? 'text-[var(--color-foreground)]' : 'text-transparent'}
            `}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedOption?.label || "Test"}
      </div>

      <label
        htmlFor={inputId}
        className={`absolute left-4  text-base transition-all
          ${!selectedOption && !open ? 'top-4 text-base text-[var(--color-foreground)]/50' : '-top-3 text-sm text-[var(--color-foreground)]'}
          bg-[var(--color-background)] px-1 pointer-events-none`}
      >
        {label}
      </label>

      {/* Flecha */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-[var(--color-foreground)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 mt-2 w-full border rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2   cursor-pointer ${
                value === opt.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)] hover:text-[var(--color-background)] hover:bg-[var(--color-foreground)]' 
                : 'hover:bg-[var(--color-foreground)]/20'
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
