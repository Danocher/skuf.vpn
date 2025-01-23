'use client'

import { useState } from 'react'
import { AccountService } from '@/services/account.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { User, Loader2 } from 'lucide-react'

interface EditNamesProps {
  currentUsername: string
  currentFirstname: string
  onSuccess: () => void
}

export function EditNames({ currentUsername, currentFirstname, onSuccess }: EditNamesProps) {
  const [username, setUsername] = useState(currentUsername)
  const [firstname, setFirstname] = useState(currentFirstname)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !firstname.trim()) {
      toast.error('Пожалуйста, заполните все поля')
      return
    }

    setIsLoading(true)

    try {
      await AccountService.editNames(username, firstname)
      toast.success('Данные успешно обновлены')
      onSuccess()
    } catch (error) {
      toast.error('Ошибка при обновлении данных')
    } finally {
      setIsLoading(false)
    }
  }

  const hasChanges = username !== currentUsername || firstname !== currentFirstname

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-xl text-gray-100 mb-6">
        <User className="w-6 h-6 text-blue-400" />
        Личные данные
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm text-gray-300">
            Имя пользователя
          </Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800/50 border-gray-700 text-gray-100 focus:ring-blue-400/20 transition-all"
            placeholder="Введите имя пользователя"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstname" className="text-sm text-gray-300">
            Имя
          </Label>
          <Input
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="bg-gray-800/50 border-gray-700 text-gray-100 focus:ring-blue-400/20 transition-all"
            placeholder="Введите ваше имя"
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !hasChanges}
        className={`w-full transition-all duration-200 ${
          hasChanges
            ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90'
            : 'bg-gray-700 cursor-not-allowed opacity-50'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Сохранение...
          </>
        ) : (
          'Сохранить изменения'
        )}
      </Button>
    </form>
  )
}