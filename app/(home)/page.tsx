'use client'
import { CarouselSize } from "@/app/(home)/_components/carousel";
import CarouselReviews from "@/app/(home)/_components/carousel_reviews";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupService } from "@/services/group.service";
import { IGroup } from "@/types/group.types";
import { Rocket, Gauge, Headset, GlobeLock } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from 'js-cookie';
import { AuthModal } from "@/components/auth.modal";
import FastRegister from "@/components/fast.register.modal";
export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useState('false');
    const [groups, setGroups] = useState<IGroup | null>(null);
    useEffect(() => {   
        setAuth(Cookies.get('isAuth') || '')
        GroupService.getGroups()
        .then((response) => {
            if(response){
                setGroups(response)
                setIsLoading(false)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 py-20">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-20">
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold leading-tight">
                        <span className="text-[#bfff01] block mb-2">VPN</span>
                        <span className="text-white">для безопасного интернета</span>
                    </h1>
                    
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-4">
                        Наслаждайтесь безопасным интернетом
                        и оставайтесь анонимным в сети – всего от 1 рубля!
                    </p>
                    {auth === 'true' ? 
                    (<Button onClick={()=>{window.location.href = '/profile'}} className="bg-[#bfff01] text-black hover:bg-[#9fdf00] text-lg px-8 py-6 rounded-full transition-all duration-300 font-semibold">
                        Личный кабинет
                    </Button>):
                    ( <AuthModal/>)}
                   
                </div>

                {/* Features Section */}
                <p className="text-white text-2xl uppercase mb-4" id="features">{'[Преимущества]'}</p>
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Почему наш VPN - это лучший выбор
                    </h2>
                    <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
                        Он обеспечивает максимальную скорость, надежную защиту данных 
                        и простоту использования для всех устройств.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-black/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 rounded-full bg-blue-500/10">
                                    <Rocket className="w-20 h-20 text-blue-500" />
                                </div>
                                <p className="text-white font-medium">Высокая скорость и стабильность соединения до 10 Гбит/сек</p>
                            </div>
                        </Card>

                        <Card className="bg-black/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 rounded-full bg-[#bfff01]/10">
                                    <Gauge className="w-20 h-20 text-[#bfff01]" />
                                </div>
                                <p className="text-white font-medium">Моментальное подключение</p>
                            </div>
                        </Card>

                        <Card className="bg-black/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 rounded-full bg-[#bfff01]/10">
                                    <Headset className="w-20 h-20 text-[#bfff01]" />
                                </div>
                                <p className="text-white font-medium">Личный менеджер 24/7</p>
                            </div>
                        </Card>

                        <Card className="bg-black/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 rounded-full bg-blue-500/10">
                                    <GlobeLock className="w-20 h-20 text-blue-500" />
                                </div>
                                <p className="text-white font-medium">Безопасность ваших данных - шифрование на высшем уровне</p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="text-center flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
                    <p className="text-white text-xl sm:text-2xl uppercase" id="tariffs">{'[Тарифный план]'}</p>
                    <p className="text-white text-xl sm:text-2xl">Выберите тариф, который подходит именно вам</p>
                </div>
                <div>
                {groups==null ? <Loading/> : (
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-6 lg:gap-8 max-w-[1400px] items-center justify-center px-4 sm:px-6">
                            {groups.items.slice(0, 4).map((group) => (
                                <Card key={group.id} className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:transform hover:scale-105 transition-all duration-300 flex flex-col min-h-[500px] w-full sm:w-[380px]">
                                    <CardHeader className="space-y-3 p-6">
                                        <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-white font-bold text-center">{group.name}</CardTitle>
                                        <CardDescription className="text-base lg:text-lg text-gray-300 text-center">{group.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <ul className="space-y-4 flex-grow">
                                            {group.products.map((product) => (
                                                <li key={product.id} className="flex items-center justify-between text-white">
                                                    <span className="text-base sm:text-lg">{product.name}</span>
                                                    <span className="text-[#bfff01] font-semibold text-base sm:text-lg">{product.price} руб.</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-6 mt-auto">
                                            {auth === 'true' ? (
                                                <Button onClick={()=>{window.location.href = '/profile/subscriptions/subscribe'}} className="w-full bg-[#bfff01] text-black hover:bg-[#9fdf00] transition-all duration-300 font-semibold text-base sm:text-lg py-3">
                                                    Выбрать тариф
                                                </Button>
                                            ) : (
                                                <FastRegister />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
                </div>
                <CarouselSize/>
                <div className="text-center  flex justify-between mb-4">
                    <p className="text-white text-2xl uppercase" id="reviews">{'[Отзывы]'}</p>
                    <p className="text-white text-2xl">Вот, что о нас говорят наши клиенты</p>
                </div>
                <CarouselReviews/>
            </div>
        </div>
    );
}