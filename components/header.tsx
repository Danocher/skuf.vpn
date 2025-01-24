'use client';
import Cookies from 'js-cookie';
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthModal } from "./auth.modal";
import { toast } from 'sonner';
import CabinetButton from '../app/(home)/profile/_components/cabinet-button';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';

import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);

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
    
    const handleNavigation = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else {
            router.push(href);
        }
    };

    const side = 'top'
    return (
        <header className=" top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between min-h-[5rem] py-4 md:py-0">
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
                                onClick={(e) => handleNavigation(e, item.href)}
                                className="text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base"
                            >
                                {item.title}
                            </a>
                        ))}
                        {auth ? <CabinetButton/> : <AuthModal/>}
                    </nav>

                    {/* Mobile Navigation */}
                    <div className='w-full grid grid-cols-2 gap-3 mt-4 md:hidden px-2'>
                        {[...navItems, { title: auth ? "Личный кабинет" : "Войти", href: auth ? "/profile" : "#" }].map((item) => (
                            <div key={item.title} className="flex justify-center">
                                {item.title === "Личный кабинет" || item.title === "Войти" ? (
                                    auth ? <CabinetButton /> : <AuthModal />
                                ) : (
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleNavigation(e, item.href)}
                                        className="text-white text-center px-3 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm w-full"
                                    >
                                        {item.title}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile menu button */}
                
            </div>
        </header>
    );
}