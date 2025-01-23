import { IOrder } from "@/types/order.types";
import {axiosWithAuth} from "../api/interceprots";
import Cookies from "js-cookie";
export const OrdersService = {
    async CreateOrders(product_id: number, store_id: number, currency: string) {
        const email = Cookies.get('email')
        const response = await axiosWithAuth.post<IOrder>('orders', {product_id, store_id, email, currency})
        return response.data
    }
}