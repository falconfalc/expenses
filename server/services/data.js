//@ts-check
import { getDataInRange } from "../db/actions/dataActions";
import { TRANSACTION_TYPE } from "../utils/const/DocumentStatus";
import { convertYearMonthDayToDate } from "../utils/dataUtils";
import { LOGGER } from "../utils/logger";
import { groupDataByFieldPartialMatch } from "./data.utils";

export const getDataFromRange = async (ctx, dataDateRange) => {
    const { rangeStart, rangeEnd } = dataDateRange;
    const dateStart = convertYearMonthDayToDate(rangeStart);
    const dateEnd = convertYearMonthDayToDate(rangeEnd);

    return new Promise( async (resolve, reject) => {
        try {
            const data = await getDataInRange(dateStart, dateEnd);

            resolve(data);
        } catch (error) {
            LOGGER.error(`[APP] Error while getting data from range: ${rangeStart.year}.${rangeStart.month}-${rangeEnd.year}.${rangeEnd.month}`);

            reject(error);
        }
    });
};

export const groupDataFromRange = async (ctx, dataDateRange) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await getDataFromRange(ctx, dataDateRange);

            const expensesData = data
                                    .filter((row) => [TRANSACTION_TYPE.CUMPARARE, TRANSACTION_TYPE.RETRAGERE].includes(row.transactionType))
                                    .map((row) => ({
                                        name: row.fullData[2],
                                        info: row.fullData[0],
                                        sum: row.sum,
                                        date: row.date,
                                        transationType: row.transactionType
                                    }))
                                    .sort((a, b) => a.date - b.date);

            const groupedData = groupDataByFieldPartialMatch(expensesData);

            resolve(groupedData);
        } catch (error) {
            LOGGER.error(`[APP] Error while getting & group data from range: ${dataDateRange?.rangeStart?.month}.${dataDateRange?.rangeStart?.year}-${dataDateRange.rangeEnd?.month}.${dataDateRange.rangeEnd?.year}`);

            reject(error);
        }
    });
};