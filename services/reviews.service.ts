import {axiosClassic} from "../api/interceprots";
import Cookies from "js-cookie";
interface Review {
    title: string;        // Заголовок отзыва
    count_stars: number;  // Количество звезд, выставленных в отзыве
    reviewer_name: string; // Имя автора отзыва
    date: string;        // Дата оставления отзыва в формате "дд.мм.гггг"
    id: number;          // Уникальный идентификатор отзыва
  }
  
 export interface Reviews {
    count: number;       // Общее количество отзывов
    sum: number;         // Сумма всех звезд (если необходимо для анализа)
    offset: number;      // Смещение для пагинации (если используется)
    items: Review[];     // Массив отзывов
  }
  
export const ReviewsService = {
    async getReviews() {
        const response = await axiosClassic.get<Reviews>('reviews?count=6&offset=0')
        return response.data
    }
}