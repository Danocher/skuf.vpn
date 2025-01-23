'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AccountService } from "@/services/account.service"
import { InvitesService } from "@/services/invites.service"
import { Label } from "@radix-ui/react-label"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Cookies from 'js-cookie'
export default function FastRegister() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const referralCode = searchParams.get('referral_code')
    const auth = Cookies.get('isAuth')
   
    const handleSubmit = () => {
        setLoading(true)
        
        AccountService.fastRegister(email, referralCode || undefined)
        .then(() => {
            toast.success('Письмо с доступом отправлено на почту')
            window.location.href = '/profile/subscriptions/subscribe'
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || 'Ошибка регистрации')
        })
        .finally(() => {
            setLoading(false)
        })
            
        
    }
    const [code, setCode] = useState(referralCode || '')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(code);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(code);
          }, 500); // Задержка в 500 мс
      
          return () => {
            clearTimeout(handler); // Очистка таймера при изменении searchTerm
          };
       
    }, [code])
    useEffect(() => {
        if(code.length === 0) return
        setTimeout(() => {
            InvitesService.checkCode(code)
            .then((res) => {
                if(res.is_active === true) {
                    toast.success('Код активен')
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Ошибка проверки кода')
            })
        }, 500)
    }, [debouncedSearchTerm])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full mt-6 bg-[#bfff01] text-black hover:bg-[#9fdf00] transition-all duration-300 font-semibold" onClick={() => { if(auth === 'true') {
    window.location.href = '/profile/subscriptions/subscribe'}}}>
                    Выбрать тариф
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
                <DialogHeader>
                    <DialogTitle>Быстрая регистрация</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Введите email для получения доступа к VPN
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="col-span-4">Email</Label>
                        <Input
                            placeholder="Email"
                            className="col-span-4 bg-gray-800 border-gray-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="col-span-4">Код реферала</Label>
                        <Input
                            placeholder="Код реферала"
                            className="col-span-4 bg-gray-800 border-gray-700"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </form>
                <Button
                    onClick={handleSubmit}
                    className="bg-[#bfff01] text-black hover:bg-[#9fdf00]"
                    disabled={loading}
                >
                    {loading ? 'Отправка...' : 'Выбрать тариф'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}