'use client'

import { useEffect, useState } from 'react'
import { PaymentsService } from '@/services/payments.service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, Clock, RefreshCcw, Undo2, Plus, Ban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import ButtonCancel from './_components/button.cancel'
import ButtonResume from './_components/button.resume'

interface Product {
    available: boolean
    type: string
    created_at: string
    updated_at: string
    id: number
    name: string
    price: number
    description: string
    benefits: string[]
    tags: string[]
    duration_days: number
  }
  
  interface GroupProduct {
    id: number
    name: string
    description: string
    benefits: string[]
    tags: string[]
    available: boolean
    products: Product[]
  }
  
  interface Store {
    id: number
    name: string
  }
  
  export interface Subscription {
    status: number
    virtual_subscription: boolean
    auto_renew_status: number
    is_active: boolean
    is_in_billing_retry_period: boolean
    start_at: string
    expires_at: string
    id: string
    user_id: number
    group_product: GroupProduct
    store: Store
  }
  
  interface PaymentsResponse {
    count: number
    sum: number
    offset: number
    items: Subscription[]
  }
  

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await PaymentsService.getPayments()
      setSubscriptions(data.items)
      setIsLoading(false)
    }

    fetchSubscriptions()
  }, [])

  const getStatusBadge = (subscription: Subscription) => {
    
    if (subscription.status === 1) {
      return (
        <div>
        {subscription.virtual_subscription ? (<Badge className="py-1 px-3 text-sm bg-green-600/20 text-yellow-400 hover:bg-green-600/30">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Виртуальная
        </Badge>) : (<Badge className="py-1 px-3 text-sm bg-green-600/20 text-green-400 hover:bg-green-600/30">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Активна
        </Badge>)}</div>
      )
    }
    if(subscription.status === 2){
      return (
        <div>
        <Badge className="py-1 px-3 text-sm bg-green-600/20 text-yellow-400 hover:bg-green-600/30">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Просрочена
        </Badge>
        </div>
      )
    }
    if(subscription.status === 3){
      return (
        <div>
        <Badge className="py-1 px-3 text-sm bg-green-600/20 text-yellow-400 hover:bg-green-600/30">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Отменена
        </Badge>
        </div>
      )
    }
    if(subscription.status === 4){
      return (
        <div>
        <Badge className="py-1 px-3 text-sm bg-green-600/20 text-yellow-400 hover:bg-green-600/30">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Отклонена
        </Badge>
        </div>
      )
    }
    if(subscription.status === 5){
      return (
        <div>
        <Badge className="py-1 px-3 text-sm bg-green-600/20 text-yellow-400 hover:bg-green-600/30">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Завершена
        </Badge>
        </div>
      )
    }
    if(subscription.status === 0){
    return (
      <Badge variant="destructive" className="py-1 px-3 text-sm">
        <AlertCircle className="w-4 h-4 mr-1" /> Неактивна
      </Badge>
    )}
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-[250px]" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" onClick={() => window.history.back()}>
          <Undo2 size={18} className="text-purple-400 mr-1" />
          Назад
        </div>
        <div>
          <Button 
            onClick={() => window.location.href = '/profile/subscriptions/subscribe'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={18} />
            Оформить подписку
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Мои подписки
        </h1>
        <p className="text-xl text-gray-300">Управление подписками и автопродлением</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl text-gray-100">{subscription.group_product.name}</CardTitle>
                {getStatusBadge(subscription)}
              </div>
              <CardDescription className="text-gray-300">
                {subscription.group_product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-200">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Действует до</p>
                    <p className="font-medium">
                      {new Date(subscription.expires_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {subscription.group_product.benefits.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Преимущества:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-200">
                      {subscription.group_product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {subscription.status === 3 ? (
                    <ButtonResume subscription_id={subscription.id} />) :
                     (<ButtonCancel  subscription_id={subscription.id} />)}

                {subscription.auto_renew_status === 1 && (
                  <Button variant="outline" className="w-full gap-2">
                    <RefreshCcw className="w-4 h-4" /> Автопродление включено
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {subscriptions.length === 0 && (
          <Card className="col-span-full bg-gray-800/50 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-xl text-gray-300 mb-4">У вас пока нет активных подписок</p>
              <Button className="bg-gradient-to-r from-blue-400 to-purple-500" onClick={() => {window.location.href = '/profile/subscriptions/subscribe'}}>
                Оформить подписку
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}