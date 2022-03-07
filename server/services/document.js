//@ts-check
import { findAllDocuments, findDocumentByFilter, findDocumentById, insertDocumentProcessedData, updateDocument } from "../db/actions/documentActions";
import { DOCUMENT_STATUS } from "../utils/const/DocumentStatus";
import { enrichDocument } from "../utils/document.report.parser";
import { LOGGER } from "../utils/logger";
import ResponseError from "../utils/ResponseError";
import { readDocumentFromDb } from "./document.stream";

export const getDocumentById = (ctx) => {
    const { documentId } = ctx.params;

    return new Promise(async (resolve, reject) => {
        try {
            LOGGER.info(`[APP] Get file with id: ${documentId}`);

            const document = await findDocumentById(documentId);

            resolve(document);
        } catch(error) {
            LOGGER.error(`[APP] Error while getting document by id: ${documentId}`);

            reject(error);
        }
    });
};

export const getDocumentByFilter = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const document = await findDocumentByFilter(filter);

            resolve(document);
        } catch(error) {
            LOGGER.error(`[APP] Error while getting document by filter: ${JSON.stringify(filter)}`);

            reject(error);
        }
    });
};

export const getAllDocuments = (ctx) => {
    return new Promise(async (resolve, reject) => {
        try {
            LOGGER.info('[APP] Get all documents');

            const documents = await findAllDocuments();

            resolve(documents);
        } catch(error) {
            LOGGER.error('[APP] Error while getting all documents from db. ', error);

            reject(error);
        }
    });
};

export const parseDocumentCSVData = (ctx) => {
    const { documentId } = ctx.params;

    return new Promise(async (resolve, reject) => {
        try {
            LOGGER.info(`[APP] Parse document with id: ${documentId}`);

            const documentData = await findDocumentById(documentId);

            if (documentData?.status !== DOCUMENT_STATUS.PROCESSED) {
                const parsedDocument = await readDocumentFromDb(documentId);

                const enrichedDocuments = enrichDocument(documentData, parsedDocument);

                enrichedDocuments.forEach(async (enrichedDocumentDataRow) => {
                    await insertDocumentProcessedData(enrichedDocumentDataRow);
                });

                const documentUpdateData = { status: DOCUMENT_STATUS.PROCESSED };

                updateDocument(documentId, documentUpdateData);

                resolve(enrichedDocuments);
            }

            reject(new ResponseError('error', 'document.parse.button', ['Document already processed.']));
        } catch(error) {
            LOGGER.error(`[APP] Error while parsing document with id: ${documentId}`);

            reject(error);
        }
    });
};