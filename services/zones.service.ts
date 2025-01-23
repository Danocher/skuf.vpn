import {axiosClassic, axiosWithAuth} from "../api/interceprots";
import Cookies from "js-cookie";
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
    available: number; // Можно использовать boolean, если available только 0 или 1
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
    JSON: Record<string, unknown>; // Объект с ключами типа string и значениями любого типа
  }
export const ZonesService = {
    async getCountries() {
        const response = await axiosClassic.get<Country>('zones/countries?count=30&offset=0')
        return response.data
    },
    async searchZones(country: string) {
        const response = await axiosWithAuth.get<Zones>(`zones/search?country=${country}&count=30&offset=0`)
        return response.data
    },
    async getConfig(zone_id: string) {
        const response = await axiosWithAuth.get<Config>(`zones/${zone_id}/configuration`)
        return response.data
    }
}