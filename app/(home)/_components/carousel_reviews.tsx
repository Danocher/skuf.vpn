'use client'

import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"
import { useInterval } from "@/hooks/use-interval"

const reviews = [
  {
    name: "Алексей",
    avatar: "/avatars/1.png",
    rating: 5,
    date: "20.01.2024",
    text: "Отличный VPN сервис! Скорость интернета практически не падает, а поддержка работает круглосуточно. Очень доволен!"
  },
  {
    name: "Мария",
    avatar: "/avatars/2.png",
    rating: 5,
    date: "19.01.2024",
    text: "Пользуюсь уже больше месяца, всё работает стабильно. Особенно радует возможность выбора серверов в разных странах."
  },
  {
    name: "Дмитрий",
    avatar: "/avatars/3.png",
    rating: 4,
    date: "18.01.2024",
    text: "Хороший сервис за свои деньги. Иногда бывают небольшие просадки скорости, но в целом всё отлично."
  },
  {
    name: "Анна",
    avatar: "/avatars/4.png",
    rating: 5,
    date: "17.01.2024",
    text: "Самый удобный VPN из всех, что я пробовала. Простой интерфейс и быстрое подключение."
  }
]

export default function CarouselReviews() {
  const [api, setApi] = useState<any>()

  return (
    <div className="relative w-full max-w-6xl mx-auto ">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-[280px]">
                <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12 ring-2 ring-purple-500/20">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600">{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-sm text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed line-clamp-4">{review.text}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-8">
          <CarouselPrevious className="static bg-gray-800 hover:bg-gray-700 border-gray-700" />
          <CarouselNext className="static bg-gray-800 hover:bg-gray-700 border-gray-700" />
        </div>
      </Carousel>
    </div>
  )
}