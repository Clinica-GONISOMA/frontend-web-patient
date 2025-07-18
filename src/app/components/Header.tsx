'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
            <Link href="/">
                <div className="flex items-center">

                    <div className="text-4xl text-center mt-2">🏥</div>
                    <div>
                        <p>Nombre</p>
                        <p className="text-3xl">Empresa</p>
                    </div>

                </div>
            </Link>

            {/* Navegación y botón modo oscuro */}
            <nav className="flex items-center justify-between gap-10">
                <ul className="flex gap-6 items-center">
                    <li>
                        <Link href="/help">Centro de ayuda</Link>
                    </li>
                    <li>
                        <Link href="/account">Cuenta</Link>
                    </li>
                    <li>
                        <Link href="/appointment">
                            <button className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                                Reservar hora
                            </button>
                        </Link>
                    </li>
                </ul>
                <button
                    onClick={() => setIsDarkMode((prev) => !prev)}
                    className="p-2 border-2 border-[var(--color-foreground)]/50 rounded-4xl cursor-pointer"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </nav>
        </header>
    );
}
