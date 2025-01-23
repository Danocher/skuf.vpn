import {axiosClassic, axiosWithAuth} from "../api/interceprots";
import Cookies from "js-cookie";
export const AccountService = {
    async getAccountInfo() {
        const response = await axiosWithAuth.get(`/account`)
        return response.data
    },
    async editPassword(password: string, new_password: string) {
        const response = await axiosWithAuth.put(`/account/password`, {password, new_password})
        return response.data
    },
    async editNames(username: string, firstname: string) {
        const response = await axiosWithAuth.patch(`/account`, {username, first_name: firstname})
        return response.data
    },
    async fastRegister(email: string, invite_code?: string) {
        const response = await axiosClassic.post(`/auth/fast_register`, {email, invite_code})
        Cookies.set('accessToken', response.data.access_token, { expires: 7 })
        Cookies.set('refreshToken', response.data.refresh_token, { expires: 7 })
        Cookies.set('userId', response.data.user_id, { expires: 7 })
        Cookies.set('isAuth', 'true', { expires: 7 })
        Cookies.set('email', response.data.email, { expires: 7 })
    }
}