//@ts-check
import { getAllDocuments, getDocumentById, parseDocumentCSVData } from "../services/document";
import { handleDocumentDownload, handleDocumentUpload } from "../services/document.stream";
import _ from 'lodash';
import { validateDocument } from "../services/Validation/Actions";

const get = async (ctx, next) => {
    const res = await getDocumentById();

    res && (ctx.body = res);
};

const getAll = async(ctx, next) => {
    const res = await getAllDocuments();

    res && (ctx.body = res);
};

const download = async (ctx, next) => {
    await handleDocumentDownload(ctx);
};

const parse = async (ctx, next) => {
    const res = await parseDocumentCSVData(ctx);

    res && (ctx.body = res);
};

//TODO: refactor validation for a validation service
const post = async (ctx, next) => {
    const { dryRun } = ctx.request.query;
    let errors = [];

    if(dryRun === 'true') {
        ctx.status = 200;

        await validateDocument(ctx, errors);

        if(errors.length) {
            ctx.status = 400;
            ctx.body = errors;
        }
    } else {
        const res = await handleDocumentUpload(ctx);

        res && (ctx.body = {
            status: 200,
            msg: 'complete'
        });
    }
};

const ctrl = {
    get,
    getAll,
    download,
    parse,
    post
};

export default ctrl;