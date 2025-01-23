import {axiosClassic, axiosWithAuth} from "../api/interceprots";
import Cookies from "js-cookie";
interface GroupProduct {
    id: number;
    name: string;
    description: string;
    benefits: string[];
    tags: string[];
    available: boolean;
    products: Product[];
  }
  
  interface Product {
    available: boolean;
    type: string; // Определите конкретные типы, если это возможно
    created_at: string; // Используйте Date, если необходимо
    updated_at: string; // Используйте Date, если необходимо
    id: number;
    name: string;
    price: number;
    description: string;
    benefits: string[];
    tags: string[];
    duration_days: number;
  }
  
  interface Store {
    id: number;
    name: string;
  }
  
  interface Item {
    status: number;
    virtual_subscription: boolean;
    auto_renew_status: number;
    is_active: boolean;
    is_in_billing_retry_period: boolean;
    start_at: string; // Используйте Date, если необходимо
    expires_at: string; // Используйте Date, если необходимо
    id: string;
    user_id: number;
    group_product: GroupProduct;
    store: Store;
  }
  
  export interface ApiResponse {
    count: number;
    sum: number;
    offset: number;
    items: Item[];
  }
export const PaymentsService = {
    async getPayments() {
        const response = await axiosWithAuth.get<ApiResponse>('payments/subscriptions?count=5&offset=0')
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