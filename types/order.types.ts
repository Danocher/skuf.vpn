interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    created_at: string; // Для более строгой типизации, можно использовать Date, но в таком случае нужно будет преобразовывать строку в Date при создании объекта
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    benefits: string[];
    tags: string[];
    duration_days: number;
  }
  
  export interface IOrder {
    id: number;
    title: string;
    api_key: string;
    user: User;
    product: Product;
    currency: string;
    amount: number;
    message: string;
  }
  