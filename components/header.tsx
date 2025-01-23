'use client';
import Cookies from 'js-cookie';
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthModal } from "./auth.modal";
import { toast } from 'sonner';
import CabinetButton from '../app/(home)/profile/_components/cabinet-button';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { title: "Преимущества", href: "/#features" },
        { title: "Тарифный план", href: "/#tariffs" },
        { title: "Отзывы", href: "/#reviews" },
       
    ];

    const [auth, setAuth] = useState(false);
    useEffect(() => {
        setAuth(Cookies.get('isAuth') === 'true')
    }, []);
    
    const router = useRouter()
    
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (!href.startsWith('#')) return;

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            setIsMenuOpen(false); // Закрываем мобильное меню после клика
        }
    };

    return (
        <header className=" top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Image src="/logo.svg" alt="logo" width={80} height={80} className="w-auto h-12" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                onClick={(e) => {router.push(item.href); handleScroll(e, item.href)}}
                                className="text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base"
                            >
                                {item.title}
                            </a>
                        ))}
                        {auth ? <CabinetButton/> : <AuthModal/>}
                       
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden rounded-lg p-2 inline-flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                        <span className="sr-only">Открыть меню</span>
                        <svg
                            className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg
                            className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className="block text-white px-3 py-2 rounded-md text-base hover:bg-white/10 transition-colors"
                            >
                                {item.title}
                            </a>
                        ))}
                        <button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300">
                            Начать бесплатно
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}