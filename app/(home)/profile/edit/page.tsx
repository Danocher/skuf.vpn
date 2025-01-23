'use client'

import { useEffect, useState } from 'react'
import { EditNames } from './_components/editnames'
import { EditPassword } from './_components/editpassword'
import { Card, CardContent } from '@/components/ui/card'
import { AccountService } from '@/services/account.service'
import { Undo2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Cookies from 'js-cookie'

interface UserInfo {
  username: string
  first_name: string
}

export default function EditProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await AccountService.getAccountInfo()
        setUserInfo(data)
        Cookies.set('email', data.email, { expires: 7 })
      } catch (error) {
        console.error('Error fetching user info:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  const handleUpdateSuccess = async () => {
    const data = await AccountService.getAccountInfo()
    setUserInfo(data)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="space-y-8">
          <Skeleton className="h-12 w-[250px]" />
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Редактирование профиля
        </h1>
        <p className="text-xl text-gray-300 mb-4">Измените ваши личные данные и пароль</p>
        <div 
          className="flex items-center cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          onClick={() => window.history.back()}
        >
          <Undo2 size={18} className="text-purple-400 mr-1" />
          Назад
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="pt-6">
            {userInfo && (
              <EditNames
                currentUsername={userInfo.username}
                currentFirstname={userInfo.first_name}
                onSuccess={handleUpdateSuccess}
              />
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="pt-6">
            <EditPassword />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}