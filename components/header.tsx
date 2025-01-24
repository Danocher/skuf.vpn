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
                                onClick={(e) => handleNavigation(e, item.href)}
                                className="text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base"
                            >
                                {item.title}
                            </a>
                        ))}
                        {auth ? <CabinetButton/> : <AuthModal/>}
                       
                    </nav>
                    <DropdownMenu>
                    <DropdownMenuTrigger className='text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base'><Menu/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Меню</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {navItems.map((item) => (
                            <DropdownMenuItem 
                                key={item.title} 
                                asChild
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) => handleNavigation(e, item.href)}
                                    className="w-full cursor-pointer"
                                >
                                    {item.title}
                                </a>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Mobile menu button */}
                    
                </div>
                {/* Mobile Navigation */}
                
            </div>
        </header>
    );
}