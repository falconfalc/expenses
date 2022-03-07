//@ts-check
import HttpStatus from "http-status";
import { getDataFromRange, groupDataFromRange } from "../services/data";
import { validateDataRange } from "../services/Validation/Actions";
import { yearMonthDayDateFromString } from "../utils/dataUtils";

const getDataInRange = async (ctx, next) => {
    const errors = [];

    let { rangeStart, rangeEnd } = ctx?.request?.params;

    rangeStart = yearMonthDayDateFromString(rangeStart);
    rangeEnd = yearMonthDayDateFromString(rangeEnd);

    validateDataRange({rangeStart, rangeEnd}, errors);

    if (errors.length) {
        ctx.status = HttpStatus.BAD_REQUEST;
        ctx.body = errors;
    } else {
        const data = await getDataFromRange(ctx, {rangeStart, rangeEnd});

        ctx.status = HttpStatus.OK;
        ctx.body = data;
    }
};

const groupDataInRange = async (ctx, next) => {
    const errors = [];
    let { rangeStart, rangeEnd } = ctx?.request?.params;

    rangeStart = yearMonthDayDateFromString(rangeStart);
    rangeEnd = yearMonthDayDateFromString(rangeEnd);

    validateDataRange({rangeStart, rangeEnd}, errors);

    if (errors.length) {
        ctx.status = HttpStatus.BAD_REQUEST;
        ctx.body = errors;
    } else {
        const data = await groupDataFromRange(ctx, {rangeStart, rangeEnd});

        ctx.status = HttpStatus.OK;
        ctx.body = data;
    }
};

const ctrl = {
    getDataInRange,
    groupDataInRange
};

export default ctrl;