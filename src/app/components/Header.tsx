'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Branding from './Branding';

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Leer del sistema o localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            setIsDarkMode(systemPrefersDark);
        }
    }, []);

    // Aplicar clase al <html>
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <header className="flex content-between w-full justify-between px-20 py-5">
            {/* Logo y nombre */}
            <Branding />

            {/* Navegación y botón modo oscuro */}
            <nav className="flex items-center justify-between gap-10">
                <ul className="flex gap-6 items-center">
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <Link href="/help">Centro de ayuda</Link>
                    </li>
                    {/* <li>
                        <Link href="/account">Cuenta</Link>
                    </li> */}
                    <li className='flex items-center'>
                        <Link href="/appointment">
                            <button className="rounded-l-full cursor-pointer transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                                Reservar hora
                            </button>
                        </Link>
                        <Link href="/cancel-appointment" >
                            <button className="rounded-r-full border cursor-pointer h-10 sm:h-12 px-2 w-15 text-xs text-start">
                                Anular hora
                            </button>
                        </Link>
                    </li>
                </ul>
                <button
                    onClick={() => setIsDarkMode((prev) => !prev)}
                    className="p-2 border-2 border-[var(--color-foreground)]/50 rounded-full cursor-pointer"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </nav>
        </header>
    );
}
