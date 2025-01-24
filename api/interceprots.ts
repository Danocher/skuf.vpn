import axios, {type CreateAxiosDefaults} from 'axios'
import { getAccessToken } from './tokens'
import { AuthService } from '@/services/auth.service'
import Cookies from 'js-cookie'
const url = process.env.NEXT_PUBLIC_BASE_URL
const options: CreateAxiosDefaults = {
    baseURL: url, //'https://staging.openhere.space/', 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
    
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        if(error?.response?.status === 401 ||
            errorCatch(error) === 'jwt expired' ||
            errorCatch(error) === 'jwt must  be provided' &&
            error.config &&
            !error.config._isRetry
        ){
            originalRequest._isRetry = true
            try {
                try {
                    await AuthService.getNewTokens()
                } catch (error) {
                    window.location.href = '/';
                    return;
                }
                return axiosWithAuth.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                    Cookies.remove('userId')
                    Cookies.remove('isAuth')
                    window.location.href = '/';
                    return;
                }
            }
        }
        throw error
    }
)

export { axiosClassic, axiosWithAuth }
export const errorCatch = (error:any): string => {
    const message = error?.response?.data?.message

    return message
        ? typeof error.response.data.message === 'object'
            ? message[0]
            : message
        : error.message
}
