'use client'

import { useState } from 'react'
import { AccountService } from '@/services/account.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { KeyRound, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'

export function EditPassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Пожалуйста, заполните все поля')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Новый пароль должен содержать минимум 8 символов')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Новые пароли не совпадают')
      return
    }

    setIsLoading(true)

    try {
      await AccountService.editPassword(currentPassword, newPassword)
      toast.success('Пароль успешно изменен')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error('Ошибка при изменении пароля')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return null
    if (password.length < 8) return { color: 'text-red-400', message: 'Слишком короткий' }
    
    let strength = 0
    if (password.match(/[a-z]/)) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++

    if (strength === 4) return { color: 'text-green-400', message: 'Надежный пароль' }
    if (strength === 3) return { color: 'text-yellow-400', message: 'Средний пароль' }
    return { color: 'text-orange-400', message: 'Слабый пароль' }
  }

  const passwordStrength = getPasswordStrength(newPassword)
  const canSubmit = currentPassword && newPassword && confirmPassword && newPassword === confirmPassword && newPassword.length >= 8

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-xl text-gray-100 mb-6">
        <KeyRound className="w-6 h-6 text-purple-400" />
        Изменение пароля
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-sm text-gray-300">
            Текущий пароль
          </Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-gray-100 pr-10 focus:ring-purple-400/20 transition-all"
              placeholder="Введите текущий пароль"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            >
              {showPasswords.current ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm text-gray-300">
            Новый пароль
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-gray-100 pr-10 focus:ring-purple-400/20 transition-all"
              placeholder="Введите новый пароль"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            >
              {showPasswords.new ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {passwordStrength && newPassword && (
            <div className={`flex items-center gap-1 text-sm ${passwordStrength.color}`}>
              <ShieldCheck className="w-4 h-4" />
              {passwordStrength.message}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm text-gray-300">
            Подтвердите новый пароль
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-gray-100 pr-10 focus:ring-purple-400/20 transition-all"
              placeholder="Подтвердите новый пароль"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !canSubmit}
        className={`w-full transition-all duration-200 ${
          canSubmit
            ? 'bg-gradient-to-r from-purple-400 to-pink-500 hover:opacity-90'
            : 'bg-gray-700 cursor-not-allowed opacity-50'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Сохранение...
          </>
        ) : (
          'Изменить пароль'
        )}
      </Button>
    </form>
  )
}