//@ts-check
import { LOGGER } from '../../utils/logger';
import DocumentProcessedDataModel from '../models/DocumentProcessedDataModel';

export const getDataInRange = async (dateStart, dateEnd) => {
    try {
        const data = await DocumentProcessedDataModel
            .find({ date: { $gte: dateStart, $lte: dateEnd } })
            .sort({ date: 1 })
            .lean()
            .exec();

        return data;
    } catch (error) {
        LOGGER.error(`[APP-DB] Error when reading Data from db in range ${dateStart} - ${dateEnd}`);
    }
}