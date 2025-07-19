
import Link from 'next/link';
import Branding from './Branding';

interface FooterLinkTopicInterface {
    title: string;
    links: {
        name: string;
        href?: string;
        phone_number?: string;
    }[];
}

export default function Footer() {
    const footerLinks: FooterLinkTopicInterface[] = [
        {
            title: 'Nosotros',
            links: [
                { name: 'Acerca de', href: '/about' },
                { name: 'Contacto', href: '/contact' },
            ],
        }, {
            title: 'Legal',
            links: [
                { name: 'Política de privacidad', href: '/privacy-policy' },
                { name: 'Términos de servicio', href: '/terms-of-service' },
            ],
        }, {
            title: 'Donde estamos',
            links: [
                { name: 'Clínicas', href: '/clinics' },
                { name: 'Centros médicos', href: '/medical-centers' },
                { name: 'Tomas de muestras', href: '/sample-collection' },
            ],
        }, {
            title: 'Te ayudamos',
            links: [
                { name: 'Mesa central', phone_number: '+56 2 1234 5678' },
                { name: 'Reserva de horas', phone_number: '+56 2 2345 6789' },
                { name: 'Urgencia', phone_number: '+56 2 3456 7890' },
            ],
        }
    ];
    return (
        <footer className="flex flex-col items-center justify-center w-full bg-[var(--color-foreground)]/20 text-[var(--color-foreground)] py-10">
            <div className='flex flex-row gap-30'>
                {footerLinks.map((topic, index) => (
                    <div key={index} className='flex flex-col items-start'>
                        <h1 className='text-lg font-semibold'>{topic.title}</h1>
                        <ul className='flex flex-col'>
                            {topic.links.map((link, linkIndex) => (
                                <li key={linkIndex} className='my-2'>
                                    {link.phone_number &&
                                        <div className='flex flex-col items-start'>
                                            <p >{link.name}</p>
                                            <p>{link.phone_number}</p>
                                        </div>
                                    }
                                    {link.href &&
                                        <Link href={link.href} className="hover:underline">
                                            {link.name}
                                        </Link>
                                    }

                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="w-full border-b-1 opacity-20 my-6" />
            <div className="flex flex-row justify-between w-full px-20">
                <Branding />
                <div className='flex flex-row gap-5 items-center'>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-full bg-[var(--color-foreground)] transition-colors  cursor-pointer">
                            <span className="text-2xl">📘</span>
                        </button>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-full bg-[var(--color-foreground)] transition-colors cursor-pointer">
                            <span className="text-2xl">📷</span>
                        </button>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-full bg-[var(--color-foreground)] transition-colors cursor-pointer">
                            <span className="text-2xl">🐦</span>
                        </button>
                    </a>
                </div>
                <div className='items-center flex gap-2'>
                    &copy; {new Date().getFullYear()}{', '}
                    <span>Nombre empresa</span>
                </div>


            </div>
        </footer>
    );
}
