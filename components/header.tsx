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
    
    
    const handleScrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                                onClick={(e) => router.push(item.href)}
                                className="text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm lg:text-base"
                            >
                                {item.title}
                            </a>
                        ))}
                        {auth ? <CabinetButton/> : <AuthModal/>}
                       
                    </nav>
                    <Sheet >
                    <SheetTrigger asChild className='md:hidden'>
                        <Button variant="outline" ><Menu/></Button>
                    </SheetTrigger>
                    <SheetContent side={side}>
                        <SheetHeader>
                            <SheetTitle>Меню</SheetTitle>
                        </SheetHeader>
                        
                        <div className="text-black">
                            {navItems.map((item) => (
                                 <div key={item.title} className="py-2" >
                                    <SheetClose asChild key={item.title}>
                                       <div onClick={() =>handleScrollToSection(item.href)}                               >
                                            {item.title}
                                        </div>
                                    </SheetClose>
                             </div>
                            ))}
                        </div>
                        
                        <SheetFooter>
                           
                        </SheetFooter>
                    </SheetContent>
                    </Sheet>
                    {/* Mobile menu button */}
                    
                </div>
                {/* Mobile Navigation */}
                
            </div>
        </header>
    );
}