import {axiosClassic, axiosWithAuth} from "../api/interceprots";
import Cookies from "js-cookie";
export const AuthService = {
    async login(username:string, password:string) {
        const response = await axiosClassic.post('auth/authorize/password', {username, password})
        return response
    },
    async register(email:string, username:string, first_name:string, password:string, invite_code?:string) {
        const response = await axiosClassic.post('auth/register', {email, username, first_name, password, invite_code})
        return response
    },
    async getUserInfo() {   
        const id = Cookies.get('userId')
        const response = await axiosWithAuth.get(`users/${id}`)
        return response
    },
    async getNewTokens() {
        const refreshToken = Cookies.get('refreshToken')
        const response = await axiosClassic.post('auth/refresh', {refresh_token: refreshToken})
        Cookies.set('accessToken', response.data.access_token, { expires: 7 })
        Cookies.set('refreshToken', response.data.refresh_token, { expires: 7 })
        Cookies.set('userId', response.data.user_id, { expires: 7 })
        Cookies.set('isAuth', 'true', { expires: 7 })
        Cookies.set('email', response.data.email, { expires: 7 })
        return response
    }
}