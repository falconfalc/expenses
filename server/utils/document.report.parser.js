//@ts-check
import { LOGGER } from "./logger";
import { randomUUID } from 'crypto';

const REGEX_MATCHER_CURATE = /(\d{2}[ ]\w+[ ]\d{4}.*)/;
const REGEX_MATCHER_CURATE_EXACT = /^(\d{2}[ ]\w+[ ]\d{4}.*)$/;
const REGEX_MATCHER_MAIN_LINE = /(?=(\d{2}[ ]\w+[ ]\d{4}.*)\s+?)/g;
const REGEX_MATCHER_NEW_LINE = /\n/;
const REGEX_MATCHER_COMMAS = /\,{2,}/g;
const REGEX_MATCHER_DATE = /\d{2}[ ]\w+[ ]\d{4}/;
const REGEX_MATCHER_SUM = /\"((\d+\.)*\d+)+\,\d+\"/;

export const TRANSACTION_TYPES = {
    Cumparare: 'Cumparare',
    Retragere: 'Retragere',
    Incasare: 'Incasare',
    Transfer: 'Transfer Home\'Bank',
};

const months = new Map([
    ['ianuarie', 0],
    ['februarie', 1],
    ['martie', 2],
    ['aprilie', 3],
    ['mai', 4],
    ['iunie', 5],
    ['iulie', 6],
    ['august', 7],
    ['septembrie', 8],
    ['octombrie',  9],
    ['noiembrie', 10],
    ['decembrie', 11]
]);

const getTransactionTypeFromRow = (subRow) => {
    for(const transactionType in TRANSACTION_TYPES) {
        if(subRow.match(new RegExp(transactionType))) {
            return transactionType.toUpperCase();
        }
    }
};

const parseRowData = (row) => {
    const obj = {
        fullData: []
    };

    row.map((subRow, idx) => {
        if(idx === 0) {
            const [day, month, year] = subRow.match(REGEX_MATCHER_DATE)[0].split(' ');
            const sum = subRow.match(REGEX_MATCHER_SUM)[0]
                            .replace('"', '')
                            .replace('.', '')
                            .replace(',', '.');

            obj.sum = parseFloat(sum);
            obj.date = new Date(parseInt(year), months.get(month), parseInt(day));
            obj.transactionType = getTransactionTypeFromRow(subRow);
        }

        obj.fullData = [...obj.fullData, subRow];
    });

    return obj;
};

export const parseCsv = (data) => {
    const dataArr = data.split(REGEX_MATCHER_MAIN_LINE);

    const curatedData = dataArr
                            .filter(row => row.match(REGEX_MATCHER_CURATE))
                            .filter(row => !row.match(REGEX_MATCHER_CURATE_EXACT))
                            .map(row => row
                                            .split(REGEX_MATCHER_NEW_LINE)
                                            .filter(str => str.length !== 0)
                                            .map(str => str
                                                            .replace(REGEX_MATCHER_COMMAS, ' ')
                                                            .trim()
                                            )
                            )
                            .map(row => parseRowData(row));

    return curatedData;
};

export const enrichDocument = (documentData, parsedDocument) => {
    const{ id, month, year } = documentData;

    return parsedDocument.map((documentDataRow) => ({
        ...documentDataRow,
        id: randomUUID(),
        documentId: id,
        month,
        year,
    }));
};
