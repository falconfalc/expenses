import { DATA_ENDPOINTS } from "../utils/const/Endpoints";
import { get } from "../utils/http/http";

export const getDatasInRange = async (dateRange: string[]) => {
    const [rangeStart, rangeEnd] = dateRange;

    const url = `${DATA_ENDPOINTS.DATA_IN_RANGE}/${rangeStart}/${rangeEnd}`;

    try {
        const res = await get(url);

        return res?.data;
    } catch (err) {

    }
};