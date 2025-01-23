import { IGroup } from "@/types/group.types";
import {axiosClassic} from "../api/interceprots";

export const InvitesService = {
    async checkCode(code: string) {
        const response = await axiosClassic.get(`invites/check_code/${code}`)
        return response.data
    }
}