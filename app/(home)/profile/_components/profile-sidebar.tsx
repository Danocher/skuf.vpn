'use client'

import { Button } from "@/components/ui/button"
import { Settings, CreditCard, UserCog, UserRound } from "lucide-react"
import Link from "next/link"
import Logout from "./logout"
import { useEffect, useState } from "react"
import { PaymentsService } from "@/services/payments.service"
import { toast } from "sonner"

export const ProfileSidebar = () => {
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    PaymentsService.getPayments()
    .then((res) => {
       setIsActive(res.items.some(item => item.is_active));
    })
    .catch((error) => {
      toast.error(error.response?.data?.message || "Ошибка получения подписок")
    })
  }, [])
  return (
    <div className=" h-full bg-gray-900/50 m-8 rounded-xl border-gray-700 shadow-xl">
      <div className="flex flex-col gap-4 p-6">
      <Link href="/profile">
          <Button variant="ghost" className="w-full justify-start gap-2 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50">
            <UserRound size={24} className="text-blue-400" />
            Личный кабинет
          </Button>
        </Link>
        <Link href="/profile/subscriptions">
          <Button variant="ghost" className="w-full justify-start gap-2 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50">
            <CreditCard size={48} className="text-blue-400" />
            Подписка
          </Button>
        </Link>
        {isActive && (
          <Link href="/profile/vpn">
          <Button variant="ghost" className="w-full justify-start gap-2 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50">
            <Settings size={50} className="text-purple-400" />
            Настройки VPN 
          </Button>
        </Link>
        )}
        <Link href="/profile/edit">
          <Button variant="ghost" className="w-full justify-start gap-2 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50">
            <UserCog size={50} className="text-green-400" />
            Редактировать аккаунт
          </Button>
        </Link>
        <Logout/>
      </div>
    </div>
  )
}
