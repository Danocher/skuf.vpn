'use client'

import { ZonesService } from "@/services/zones.service"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Server, Download, Shield, Copy } from "lucide-react"
import { ProfileSidebar } from "@/app/(home)/profile/_components/profile-sidebar"

interface Country {
    count: number;
    sum: number;
    offset: number;
    items: string[];
}

interface Zone {
    id: number;
    title: string;
    country: string;
    domain: string;
    subdomain: string;
    available: number;
    data: {
        protocol: string;
        config: {
            dest: string;
        };
    };
}

interface Zones {
    count: number;
    sum: number;
    offset: number;
    items: Zone[];
}

interface Config {
    URI: string;
    JSON: Record<string, unknown>;
}

export default function VPN() {
    const [countries, setCountries] = useState<Country>();
    const [zones, setZones] = useState<Zones>();
    const [selectedZone, setSelectedZone] = useState<Zone>();
    const [config, setConfig] = useState<Config>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ZonesService.getCountries()
            .then((response) => {
                setCountries(response)
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Ошибка получения списка стран")
            })
    }, [])

    const handleCountryChange = (value: string) => {
        setLoading(true)
        toast.success("Выбрана страна " + value)
        console.log(value)
        ZonesService.searchZones(value)
            .then((response) => {
                setZones(response)
                if (response.items.length > 0) {
                    setSelectedZone(response.items[0])
                    console.log(selectedZone)
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Ошибка поиска зон")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleZoneChange = (value: string) => {
        const zone = zones?.items.find((zone) => zone.id.toString() === value)
        if (zone) {
            setSelectedZone(zone)
        }
    }

    const getConfig = () => {
        if (!selectedZone?.id) return
        ZonesService.getConfig(selectedZone?.id.toString())
            .then((response) => {
                setConfig(response)
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Ошибка получения конфигурации")
            })
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-950">
            <ProfileSidebar />
            <div className="flex-1 p-4 lg:p-8 min-h-screen">
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-4 lg:space-y-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                                Настройки VPN
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-300">
                                Выберите сервер и получите конфигурацию
                            </p>
                            <p className="text-lg lg:text-xl text-gray-300 underline mt-2" onClick={() => {window.location.href = "/profile/vpn/instruction"}}>
                                Нажмите, чтобы просмотреть инструкцию
                            </p>
                        </div>

                        <div className="grid gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2">
                            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl text-gray-100">
                                        <Globe className="w-6 lg:w-7 h-6 lg:h-7 text-blue-400" />
                                        Выбор страны
                                    </CardTitle>
                                    <CardDescription className="text-sm lg:text-base text-gray-400">
                                        Выберите страну расположения сервера
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Select onValueChange={handleCountryChange} disabled={loading}>
                                        <SelectTrigger className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50 hover:border-purple-500/50 transition-all duration-300 text-white focus:ring-2 focus:ring-purple-500/50 h-10 lg:h-12">
                                            <SelectValue placeholder="Выберите страну" />
                                        </SelectTrigger>
                                        <SelectContent 
                                            className="bg-gray-900/95 backdrop-blur-xl border-blue-500/20"
                                            position="popper"
                                            sideOffset={4}
                                        >
                                            {countries?.items.map((country) => (
                                                <SelectItem 
                                                    key={country} 
                                                    value={country}
                                                    className="text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-500/20 cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 text-blue-400" />
                                                        {country}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl text-gray-100">
                                        <Server className="w-6 lg:w-7 h-6 lg:h-7 text-purple-400" />
                                        Выбор сервера
                                    </CardTitle>
                                    <CardDescription className="text-sm lg:text-base text-gray-400">
                                        Выберите конкретный сервер в выбранной стране
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Select 
                                        onValueChange={handleZoneChange} 
                                        disabled={!zones || loading}
                                        value={selectedZone?.id.toString()}
                                    >
                                        <SelectTrigger className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/50 hover:border-pink-500/50 transition-all duration-300 text-white focus:ring-2 focus:ring-pink-500/50 h-10 lg:h-12">
                                            <SelectValue placeholder="Выберите сервер" />
                                        </SelectTrigger>
                                        <SelectContent 
                                            className="bg-gray-900/95 backdrop-blur-xl border-purple-500/20"
                                            position="popper"
                                            sideOffset={4}
                                        >
                                            {zones?.items.map((zone) => (
                                                <SelectItem 
                                                    key={zone.id} 
                                                    value={zone.id.toString()}
                                                    className="text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 focus:bg-gradient-to-r focus:from-purple-500/20 focus:to-pink-500/20 cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Server className="w-4 h-4 text-purple-400" />
                                                        {zone.title}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>
                        </div>

                        {selectedZone && (
                            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl text-gray-100">
                                        <Shield className="w-6 lg:w-7 h-6 lg:h-7 text-green-400" />
                                        Информация о сервере
                                    </CardTitle>
                                    <CardDescription className="text-sm lg:text-base text-gray-400">
                                        Детальная информация о выбранном сервере
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-gray-400 mb-1 text-sm lg:text-base">Название</p>
                                        <p className="text-base lg:text-lg font-medium text-white">{selectedZone.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-1 text-sm lg:text-base">Страна</p>
                                        <p className="text-base lg:text-lg font-medium text-white">{selectedZone.country}</p>
                                    </div>
                                    {selectedZone.data && selectedZone.data.protocol && (
                                        <div>
                                            <p className="text-gray-400 mb-1 text-sm lg:text-base">Протокол</p>
                                            <p className="text-base lg:text-lg font-medium text-white">{selectedZone.data.protocol}</p>
                                        </div>
                                    )}
                                    <Button 
                                        onClick={getConfig}
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 lg:py-3"
                                    >
                                        <Download className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                                        {loading ? "Загрузка..." : "Получить конфигурацию"}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {config && (
                            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl text-gray-100">
                                        <Download className="w-6 lg:w-7 h-6 lg:h-7 text-green-400" />
                                        Конфигурация
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 lg:space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm lg:text-base text-gray-400">URI конфигурации</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 text-gray-400 hover:text-white"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(config.URI)
                                                    toast.success('URI скопирован в буфер обмена')
                                                }}
                                            >
                                                <Copy className="w-4 h-4 mr-2" />
                                                Копировать
                                            </Button>
                                        </div>
                                        <div className="bg-gray-900 p-3 lg:p-4 rounded-lg">
                                            <div className="max-h-[100px] overflow-y-auto">
                                                <code className="text-sm lg:text-base text-green-400 break-all">
                                                    {config.URI}
                                                </code>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-gray-400">JSON конфигурация</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-gray-400 hover:text-white"
                                            onClick={() => {
                                                navigator.clipboard.writeText(JSON.stringify(config.JSON, null, 2))
                                                toast.success('JSON конфигурация скопирована в буфер обмена')
                                            }}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Копировать
                                        </Button>
                                    </div>
                                    <div className="bg-gray-900 p-4 rounded-lg">
                                        <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                            <pre className="text-green-400">
                                                <code>
                                                    {JSON.stringify(config.JSON, null, 2)}
                                                </code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}