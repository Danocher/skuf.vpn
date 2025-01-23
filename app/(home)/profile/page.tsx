'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CheckCircle2, Copy, Gift, UserCircle, Wallet } from "lucide-react"
import { ProfileSidebar } from "@/app/(home)/profile/_components/profile-sidebar"
import { AccountService } from "@/services/account.service"

interface UserData {
  user: {
    verified: boolean;
    balance: number;
    register_type: number;
    invite: {
      id: number;
      user_id: number;
      issuer_id: number;
      benefit: {
        description: string;
        free_period_for_referral: number;
        free_period_for_user: number;
        accruals_for_user_percents: number;
      };
      is_active: boolean;
      type: string;
    };
    count_invited_users: number;
    id: number;
    email: string;
    username: string;
    first_name: string;
    created_at: string;
  };
  flags: {
    need_account_update: boolean;
    need_password_update: boolean;
    need_email_verification: boolean;
    ban?: {
      message: string;
      issuer_name: string;
      issuer_id: number;
      support: boolean;
      date: string;
    };
    _has_password: boolean;
  };
  invite_links: Array<{
    id: number;
    code: string;
    created_at: string;
    users: Array<{
      id: number;
      email: string;
      username: string;
      first_name: string;
      created_at: string;
    }>;
  }>;
}

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AccountService.getAccountInfo()
      .then((response) => {
        setUserInfo(response)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Скопировано в буфер обмена')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-[200px] w-full mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
        </div>
      </div>
    )
  }

  if (!userInfo) {
    return <div className="container mx-auto p-8">Ошибка загрузки данных</div>
  }
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  return (
    <div className="flex min-h-screen bg-gray-950">
      <ProfileSidebar />
      <div className="flex-1 p-8">
        <div className="container max-w-5xl mx-auto">
          {/* Основная информация */}
          <Card className="mb-12 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
            <CardHeader className="pb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Личный кабинет
                  </CardTitle>
                  <CardDescription className="text-2xl text-gray-200">
                    Добро пожаловать, {userInfo.user.first_name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {userInfo.user.verified ? (
                    <Badge className="py-2 px-4 text-base bg-green-600/20 text-green-400 hover:bg-green-600/30">
                      <CheckCircle2 className="w-5 h-5 mr-2" /> Верифицирован
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="py-2 px-4 text-base">
                      <AlertCircle className="w-5 h-5 mr-2" /> Не верифицирован
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Профиль */}
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-gray-100">
                      <UserCircle className="w-7 h-7 text-blue-400" />
                      Профиль
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-300 text-base mb-1">Email</p>
                        <p className="text-xl font-medium text-gray-100">{userInfo.user.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-base mb-1">Логин</p>
                        <p className="text-xl font-medium text-gray-100">{userInfo.user.username}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-base mb-1">Дата регистрации</p>
                        <p className="text-xl font-medium text-gray-100">
                          {new Date(userInfo.user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Баланс */}
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-gray-100">
                      <Wallet className="w-7 h-7 text-green-400" />
                      Баланс
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-300 text-base mb-1">Баланс</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
                          {userInfo.user.balance} ₽
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Реферальная программа */}
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-gray-100">
                      <Gift className="w-7 h-7 text-purple-400" />
                      Реферальная программа
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-300 text-base mb-2">Приглашено пользователей</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                          {userInfo.user.count_invited_users}
                        </p>
                      </div>
                      {userInfo.invite_links?.map((link) => (
                        <div key={link.id} className="space-y-2">
                          <p className="text-gray-300 text-base mb-1">Ваша реферальная ссылка</p>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 rounded bg-black/20 text-white">
                              {`${domain}/?referral_code=${link.code}`}
                            </code>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => copyToClipboard(`${domain}/?referral_code=${link.code}`)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Предупреждения */}
          {userInfo.flags.need_account_update && (
            <Card className="mb-6 bg-yellow-500/10 border-yellow-500/20 backdrop-blur-sm">
              <CardContent className="flex items-center gap-3 py-6">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <p className="text-yellow-500 text-lg">Требуется обновление данных аккаунта</p>
              </CardContent>
            </Card>
          )}

          {userInfo.flags.ban && (
            <Card className="mb-6 bg-red-500/10 border-red-500/20 backdrop-blur-sm">
              <CardContent className="flex items-center gap-3 py-6">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-red-500 font-semibold text-lg mb-1">Аккаунт заблокирован</p>
                  <p className="text-red-400">{userInfo.flags.ban.message}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}