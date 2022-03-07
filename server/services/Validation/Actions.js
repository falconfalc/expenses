//@ts-check
import _ from "lodash";
import { getDocumentByFilter } from "../document";
import ResponseError from "../../utils/ResponseError";

export const validateDocument = async (ctx, errors) => {
    const DOCUMENT_DATE = 'documentDate';
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
    const fileSize = parseInt(ctx.request.headers['content-length']);
    //Validate document month/year
    let documentDate = _.get(ctx.request.body, DOCUMENT_DATE, undefined);


    if(fileSize > MAX_FILE_SIZE) {
        errors.push(new ResponseError('error', 'document.upload.main', 'Document size is too big.'));
    }

    if(!documentDate) {
        errors.push(new ResponseError('error', 'document.upload.date.period.validation.message', 'Document date period is missing.'));
    } else {
        documentDate = JSON.parse(documentDate);

        Object.entries(documentDate).forEach(([key, val]) => {
            documentDate[key] = parseInt(val);
        });

        const document = await getDocumentByFilter(documentDate);

        if(document) {
            errors.push(new ResponseError('error', 'document.upload.date.period.validation.message', 'Document period already present!'));
        }
    }
};

export const validateDataRange = (dateRange, errors) => {
    let { rangeStart, rangeEnd } = dateRange;

    if (!rangeStart || !rangeEnd) {
        errors.push(new ResponseError('error', 'date.range.message', 'Data range is not correctly set'));
    }

    validateValidYearMonthDate(rangeStart, errors);
    validateValidYearMonthDate(rangeEnd, errors);
};

const validateValidYearMonthDate = (date, errors) => {
    const currentDate = new Date();
    const MIN_MONTH_VALUE = 1;
    const MIN_DAY_VALUE = 1;
    const MIN_YEAR_VALUE = 2015;
    const MAX_DAY_VALUE = 31;
    const MAX_MONTH_VALUE = 12;
    const MAX_YEAR_VALUE = currentDate.getFullYear();

    if (!Object.values(date).every(val => val)) {
        errors.push(new ResponseError('error', 'date.range.message', 'Data range is not correctly set'));
    }

    if (date.year < MIN_YEAR_VALUE || date.year > MAX_YEAR_VALUE) {
        errors.push(new ResponseError('error', 'date.range.year.message', 'Data year is out of range.'));
    }

    if (date.month < MIN_MONTH_VALUE || date.month > MAX_MONTH_VALUE) {
        errors.push(new ResponseError('error', 'date.range.month.message', 'Date month is out of range.'));
    }

    if (date.day < MIN_DAY_VALUE || date.month > MAX_DAY_VALUE) {
        errors.push(new ResponseError('error', 'date.range.day.message', 'Date day is out of range.'));
    }
}