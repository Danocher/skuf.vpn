import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
export default function Logout() {
    function handlerLogout() {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userId')
        Cookies.remove('isAuth')
        Cookies.remove('email')
        window.location.href = '/'
    }
    return (
        <Button variant="ghost" className="w-full justify-start gap-2 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50" onClick={handlerLogout}>
            <LogOut size={50} className="text-red-400" />
            Выйти
          </Button>
    )
}