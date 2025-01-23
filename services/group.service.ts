import { IGroup } from "@/types/group.types";
import {axiosClassic} from "../api/interceprots";

export const GroupService = {
    async getGroups() {
        const response = await axiosClassic.get<IGroup>('groups?count=5&offset=0')
        return response.data
    }
}