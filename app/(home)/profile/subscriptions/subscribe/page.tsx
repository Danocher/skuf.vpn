'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GroupService } from '@/services/group.service';
import { toast } from 'sonner';
import { IGroup } from '@/types/group.types';
import Loading from '@/components/loading';
import Cookies from 'js-cookie';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@radix-ui/react-label';
import { OrdersService } from '@/services/orders.service';
import { IOrder } from '@/types/order.types';
declare global {
  interface Window {
    cp: any;
  }
}

export default function Subscribe() {
    const [groups, setGroups] = useState<IGroup | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(false)

    useEffect(() => {
        GroupService.getGroups()
        .then((res) => {
            setGroups(res)
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Ошибка получения групп")
        })
    }, [])

    function handleProductChange(value: string, groupId: number) {
        setSelectedProduct(value);
        setSelectedGroupId(groupId);
    }

    function handleSubmit() {
        if (!selectedGroupId) return toast.error("Выберите тариф");
        
        const group = groups?.items.find((group) => group.id === selectedGroupId);
        if (!group) return toast.error("Ошибка выбора тарифа");
        
        const product = group.products.find((product) => product.name === selectedProduct);
        if (!product) return toast.error("Ошибка выбора тарифа");

        setLoading(true);
        OrdersService.CreateOrders(product.id, 1, 'RUB')
        .then((res) => {
            setLoading(false);
            setOrder(true);
            if (!window.cp) {
                toast.error("Ошибка инициализации платежной системы");
                return;
            }

            const widget = new window.cp.CloudPayments();
            
            widget.pay('charge', 
                {
                    publicId: res.api_key,
                    description: res.title,
                    amount: res.amount,
                    currency: res.currency,
                    accountId: res.user.id,
                    invoiceId: res.id,
                    skin: "modern",
                    email: res.user.email,
                    autoClose: 3
                },
                {
                    onSuccess: (options: any) => {
                        toast.success("Оплата прошла успешно");
                        window.location.href = '/profile/vpn';
                    },
                    onFail: (reason: any, options: any) => {
                        toast.error(reason || "Ошибка оплаты");
                    },
                }
            );
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.response?.data?.message || "Ошибка создания заказа");
        });
    }

    return (
        <div className="container mx-auto px-3 sm:px-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-100">Оформление подписки</h2>
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-6">
                    Выберите тариф подходящий вам
                </p>
                {groups == null ? <Loading/> : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
                            {groups.items.slice(0, 4).map((group) => (
                                <div key={group.id} 
                                    className={`bg-gray-800/50 border ${selectedGroupId === group.id ? 'border-[#bfff01]' : 'border-gray-700'} rounded-lg p-3 sm:p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300`}
                                >
                                    <div className="mb-2 sm:mb-4">
                                        <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">{group.name}</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{group.description}</p>
                                    </div>
                                    <RadioGroup 
                                        value={selectedGroupId === group.id ? selectedProduct || '' : ''}
                                        onValueChange={(value) => handleProductChange(value, group.id)} 
                                        className="space-y-2 sm:space-y-4"
                                    >
                                        {group.products.map((product) => (
                                            <div key={product.id} 
                                                className={`flex items-center space-x-2 sm:space-x-4 rounded-lg border ${selectedGroupId === group.id && selectedProduct === product.name ? 'border-[#bfff01]' : 'border-gray-700'} p-2 sm:p-4 hover:bg-gray-700/50 transition-all cursor-pointer`}
                                                onClick={() => handleProductChange(product.name, group.id)}
                                            >
                                                <RadioGroupItem 
                                                    value={product.name} 
                                                    id={product.id.toString()} 
                                                    className="text-[#bfff01] bg-white h-4 w-4 sm:h-5 sm:w-5"
                                                />
                                                <div className="flex-1 flex justify-between items-center">
                                                    <span className="text-sm sm:text-lg text-white">{product.name}</span>
                                                    <span className="text-[#bfff01] font-semibold text-sm sm:text-lg whitespace-nowrap ml-2">{product.price} руб.</span>
                                                </div>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            ))}
                        </div>
                        <Button 
                            onClick={handleSubmit}
                            disabled={loading || !selectedProduct} 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 sm:py-6 text-sm sm:text-lg font-medium"
                        >
                            {loading ? "Загрузка..." : "Оплатить"}
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}