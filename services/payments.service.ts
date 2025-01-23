import {axiosClassic, axiosWithAuth} from "../api/interceprots";
import Cookies from "js-cookie";
export const PaymentsService = {
    async getPayments() {
        const response = await axiosWithAuth.get('payments/subscriptions?count=5&offset=0')
        return response.data
    },
    async cancelSubscription(Subscription_id: string) {
        const response = await axiosWithAuth.get(`cloudpayments/cancel/${Subscription_id}`)
        return response.data
    },
    async continueSubscription(Subscription_id: string) {
        const response = await axiosWithAuth.get(`cloudpayments/continue/${Subscription_id}`)
        return response.data
    }
}