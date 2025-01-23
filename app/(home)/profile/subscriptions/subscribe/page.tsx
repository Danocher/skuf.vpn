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
  useEffect(() => {
    GroupService.getGroups()
    .then((res) => {
      setGroups(res)
    })
    .catch((error) => {
      toast.error(error.response?.data?.message || "Ошибка получения групп")
    })
  }, [])
  const [selectedValue, setSelectedValue] = useState<string | undefined>('')
  const [order, setOrder] = useState(false)
//   const [orderAll, setOrderAll] = useState<IOrder | null>()
  function handlePay() {
    const product_id = groups?.items[0]?.products.find((product) => product.price.toString() === selectedValue)?.id
    if(!product_id) return toast.error("Ошибка выбора тарифа")
    OrdersService.CreateOrders(product_id, 1, 'RUB')
    .then((res) => {
      console.log(res)
      
      setOrder(true)
      if (!window.cp) {
        toast.error("Ошибка инициализации платежной системы")
        return
      }

      const widget = new window.cp.CloudPayments();
      
      widget.pay('charge', 
        {
          publicId: res.api_key,
          description: res.product.description,
          amount: res.amount,
          currency: res.currency,
          accountId: res.user.id,
          invoiceId: res.id,
          skin: "modern", // пусть остается так
          email: res.user.email, // email юзера (user.email)
          autoClose: 3 // время, через которое закрывается виджет после оплаты (можно как-то настроить, чтобы было недолго)
        },
        {
          onSuccess: (options: any) => {
            toast.success("Оплата прошла успешно")
          },
          onFail: (reason: any, options: any) => {
            toast.error(reason || "Ошибка оплаты")
          },
        }
      )
    })
    .catch((error) => {
      toast.error(error.response?.data?.message || "Ошибка создания заказа")
    })
  }
  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Оформление подписки</h2>
          <p className="text-gray-300 mb-6">
            Выберите тариф подходящий вам
          </p>
          {groups==null  ? <Loading/> : (
                    <Card className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:transform hover:scale-105 transition-all duration-300">
                        <CardHeader className="space-y-4">
                            <CardTitle className="text-2xl text-white font-bold">{groups.items[0].name}</CardTitle>
                            <CardDescription className="text-gray-300">{groups.items[0].description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <RadioGroup defaultValue="comfortable" onValueChange={(value) => setSelectedValue(groups.items[0].products.find((product) => product.name === value)?.price.toString())}>
                        <ul className="space-y-4">
                            {groups.items[0].products.map((product) => (
                                <li key={product.id} className="flex items-center justify-between text-white">
                                    <RadioGroupItem value={product.name} id="r1" className='text-[#bfff01] bg-white'/>
                                    <span className="text-lg">{product.name}</span>
                                    <span className="text-[#bfff01] font-semibold">{product.price} руб.</span>
                                </li>
                            ))}
                        </ul>
                            </RadioGroup>
                            
                           
                        </CardContent>
                    </Card>
                )}
                {order ? (<Button
            id="payButton"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 mt-4"
          >
            Оплатить {selectedValue} ₽
          </Button>) : (
            <Button
            onClick={handlePay}
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 mt-4"
          >
            Оформить заказ
          </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}