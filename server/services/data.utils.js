//@ts-check
import { Searcher } from 'fast-fuzzy';
import _ from 'lodash';
import { LOGGER } from '../utils/logger';

export const groupDataByFieldPartialMatch = (data, fields) => {

    return new Promise((resolve, reject) => {
        try {
            const cleanUpRegex = /(Terminal\:)|((RO) \w+)/g;

            const dataWithCleanNames = data.map((d) => ({
                ...d,
                name: d?.name?.replace(cleanUpRegex, '').trim(),
            }));

            const groupedData = fastFuzzy(dataWithCleanNames);

            resolve(groupedData);
        } catch (error) {
            LOGGER.error(`[APP] Error while grouping data by field`, error);
            reject(error);
        }
    });
};

const fastFuzzy = (data) => {
    let grouped = [];

    const searchOptions = {
        keySelector: (obj) => obj.name,
    };

    const searcher = new Searcher(data, searchOptions);

    data.forEach((dataObj) => {
        if (!alreadyGrouped(grouped, dataObj)) {
            grouped = [...grouped, (searcher.search(dataObj.name))];
        }
    });

    return grouped;
};

const alreadyGrouped = (grouped, obj) => {
    return grouped.some((group) => group.some((item) => _.isEqual(item, obj)));
};