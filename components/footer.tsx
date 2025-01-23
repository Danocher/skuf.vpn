import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative ">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-gray-900/30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              SKUF VPN
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Безопасный и быстрый доступ к вашим любимым сайтам и сервисам. 
              Мы обеспечиваем надежную защиту ваших данных и высокую скорость соединения.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Документы</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#tariffs" className="text-gray-400 hover:text-white transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Возможности
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-gray-400 hover:text-white transition-colors">
                  Отзывы
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Связаться с нами</h3>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Image src="/telegramLogo.svg" alt="telegram" width={20} height={20} className='color-white'/>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Image src="/vkLogo.svg" alt="vk" width={20} height={20} className='color-white'/>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Image src="/whatsappLogo.svg" alt="whatsapp" width={20} height={20} className='color-white'/>
              </Button>
            </div>
            <p className="mt-4 text-gray-400">
              support@skufvpn.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              2024 SKUF VPN. Все права защищены.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="" className="text-sm text-gray-400 hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="" className="text-sm text-gray-400 hover:text-white transition-colors">
                Условия использования
              </Link>
              <Link href="" className="text-sm text-gray-400 hover:text-white transition-colors">
                Политика обработки персональных данных
              </Link>
              <Link href="" className="text-sm text-gray-400 hover:text-white transition-colors">
                Соглашение о присоединении к рекуррентной системе платежей
              </Link>
              <Link href="" className="text-sm text-gray-400 hover:text-white transition-colors">
                Договор оферты
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}