'use client';
import Cookies from 'js-cookie';
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthModal } from "./auth.modal";
import { toast } from 'sonner';
import CabinetButton from '../app/(home)/profile/_components/cabinet-button';
import { useRouter } from 'next/navigation';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

import { Menu } from 'lucide-react';

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
                                onClick={(e) => {router.push(item.href); handleScroll(e, item.href)}}
                                className="text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base"
                            >
                                {item.title}
                            </a>
                        ))}
                        {auth ? <CabinetButton/> : <AuthModal/>}
                       
                    </nav>

                    {/* Mobile menu button */}
                    <Sheet >
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Menu/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={side} className='bg-black/80 backdrop-blur-sm [&>button]:text-white'>
                            <SheetHeader>
                            <SheetTitle className='text-white'>Меню</SheetTitle>
                           
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-2">
                                {navItems.map((item) => (
                                    <SheetClose asChild key={item.title}>
                                        <Button
                                            type='submit'
                                            onClick={(e) => {router.push(item.href); }}
                                            className="text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base"
                                        >
                                           
                                            <SheetClose asChild>
                                            {item.title}
                                            </SheetClose>
                                        </Button>
                                    </SheetClose>
                                ))}
                                <SheetClose asChild>
                                    <div>
                                        {auth ? <CabinetButton/> : <AuthModal/>}
                                    </div>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
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