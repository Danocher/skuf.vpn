import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-gray-900/30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              SKUF VPN
            </h2>
            <p className="mt-3 lg:mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
              Безопасный и быстрый доступ к вашим любимым сайтам и сервисам. 
              Мы обеспечиваем надежную защиту ваших данных и высокую скорость соединения.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 lg:mb-4 text-sm sm:text-base">Документы</h3>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link href="#tariffs" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Возможности
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Отзывы
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-3 lg:mb-4 text-sm sm:text-base">Связаться с нами</h3>
            <div className="flex gap-3 lg:gap-4">
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10 hover:bg-gray-800">
                <Image src="/telegramLogo.svg" alt="telegram" width={18} height={18} className='color-white'/>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10 hover:bg-gray-800">
                <Image src="/vkLogo.svg" alt="vk" width={18} height={18} className='color-white'/>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10 hover:bg-gray-800">
                <Image src="/whatsappLogo.svg" alt="whatsapp" width={18} height={18} className='color-white'/>
              </Button>
            </div>
            <p className="mt-3 lg:mt-4 text-sm sm:text-base text-gray-400">
              support@skufvpn.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-800">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
            <p className="text-xs sm:text-sm text-gray-400 text-center lg:text-left">
              2024 SKUF VPN. Все права защищены.
            </p>
            <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:gap-6">
              <Link href="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors text-center lg:text-left">
                Политика конфиденциальности
              </Link>
              <Link href="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors text-center lg:text-left">
                Условия использования
              </Link>
              <Link href="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors text-center lg:text-left">
                Политика обработки персональных данных
              </Link>
              <Link href="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors text-center lg:text-left">
                Соглашение о присоединении к рекуррентной системе платежей
              </Link>
              <Link href="" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors text-center lg:text-left">
                Договор оферты
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}