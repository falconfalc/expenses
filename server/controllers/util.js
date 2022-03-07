//@ts-check
import HttpStatus from "http-status";
import { groupDataByFieldPartialMatch } from "../services/data.utils";
import { validateDataRange } from "../services/Validation/Actions";
import { yearMonthDayDateFromString } from "../utils/dataUtils";
import ResponseError from "../utils/ResponseError";

const groupData = async (ctx, next) => {
    const errors = [];
    const { body } = ctx?.request;

    if (!Array.isArray(body)) {
        errors.push(new ResponseError('error', 'data.groupData', 'Data provided is in wrong format'));
    }

    if (errors.length) {
        ctx.status = HttpStatus.BAD_REQUEST;
        ctx.body = errors;
    } else {
        const data = await groupDataByFieldPartialMatch(body);

        ctx.status = HttpStatus.OK;
        ctx.body = data;
    }
};

const ctrl = {
    groupData
};

export default ctrl;