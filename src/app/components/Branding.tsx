
import Link from 'next/link';

export default function Branding() {
    return (
        <Link href="/">
            <div className="flex items-center">

                <div className="text-4xl text-center mt-2">🏥</div>
                <div className='hidden md:flex flex-col'>
                    <p>Nombre</p>
                    <p className="text-3xl">Empresa</p>
                </div>

            </div>
        </Link>
    );

}
