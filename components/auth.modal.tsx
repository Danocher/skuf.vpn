'use client'
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner"

interface RegisterFormData {
    username: string;
    email: string;
    first_name: string;
    password: string;
    invite_code: string;
}

export function AuthModal() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        first_name: '',
        password: '',
        invite_code: '',
    });

    function submitLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        AuthService.login(email, password)
        .then((response) => {
            if(response) {
                toast.success("Вход выполнен успешно!")
                Cookies.set('accessToken', response.data.access_token, { expires: 7 })
                Cookies.set('refreshToken', response.data.refresh_token, { expires: 7 })
                Cookies.set('userId', response.data.user_id, { expires: 7 })
                Cookies.set('isAuth', 'true', { expires: 7 })
                window.location.href = '/';
            }
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Ошибка входа")
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function submitRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await AuthService.register(
                formData.email,
                formData.username,
                formData.first_name,
                formData.password,
                formData.invite_code
            );
            if(response) {
                toast.success("Регистрация успешна!")
                setIsRegister(false);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Ошибка регистрации")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 text-sm lg:text-base">
                    Начать бесплатно
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">
                        {isRegister ? "Регистрация" : "Вход"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-400">
                        {isRegister ? "Создайте новый аккаунт" : "Войдите в свой аккаунт"}
                    </DialogDescription>
                </DialogHeader>

                {isRegister ? (
                    <form onSubmit={submitRegister} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Почта</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="yourmail@domain.com"
                                className="col-span-3"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Имя пользователя</Label>
                            <Input
                                name="username"
                                placeholder="username"
                                className="col-span-3"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Ваше имя</Label>
                            <Input
                                name="first_name"
                                placeholder="firstname"
                                className="col-span-3"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Пароль</Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="yourpassword"
                                className="col-span-3"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Реферальный код</Label>
                            <Input
                                name="invite_code"
                                placeholder="referral code"
                                className="col-span-3"
                                value={formData.invite_code}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                            Зарегистрироваться
                        </Button>
                    </form>
                ) : (
                    <form className="grid gap-4 py-4" onSubmit={submitLogin}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Почта</Label>
                            <Input
                                type="email"
                                placeholder="yourmail@domain.com"
                                className="col-span-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Пароль</Label>
                            <Input
                                type="password"
                                placeholder="yourpassword"
                                className="col-span-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                            Войти
                        </Button>
                    </form>
                )}

                <DialogFooter className="flex items-center">
                    <Label className="text-gray-400">
                        {isRegister ? (
                            <>
                                Есть аккаунт? Тогда{" "}
                                <span className="underline cursor-pointer text-white" onClick={() => setIsRegister(false)}>
                                    войдите
                                </span>
                            </>
                        ) : (
                            <>
                                Нет аккаунта? Тогда{" "}
                                <span className="underline cursor-pointer text-white" onClick={() => setIsRegister(true)}>
                                    зарегистрируйтесь
                                </span>
                            </>
                        )}
                    </Label>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
