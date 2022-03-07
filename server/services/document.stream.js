//@ts-check
import fs from 'fs';
import { Readable } from 'stream';
import {
    codes as CODES,
    headers as HEADERS,
    types as TYPES } from 'http-constants';
import { randomUUID } from 'crypto';
import { findDocumentById, insertDocument, insertDocumentChunk, findChunkByDocumentIdAndChunkOrder } from '../db/actions/documentActions';
import { LOGGER } from '../utils/logger';
import { parseCsv } from '../utils/document.report.parser';
import { DOCUMENT_STATUS } from '../utils/const/DocumentStatus';

export const handleDocumentUpload = (ctx) => {
    let bytesRead = 0;
    let chunkOrder = 0;
    const fileSize = parseInt(ctx.request.headers['content-length']);

    const { file } = ctx.request.files;

    const readStream = fs.createReadStream(file.path);
    const documentDate = JSON.parse(ctx.request.body.documentDate);

    const documentData = {
        id: randomUUID(),
        name: file.name,
        size: fileSize,
        chunksNum: 0
    };

    return new Promise((resolve, reject) => {

        readStream.on('open', () => {
            LOGGER.info(`[APP] Uploading of file ${file.name} STARTED.`);
        });

        readStream.on('data', async (chunk) => {
            bytesRead = bytesRead + chunk.length

            chunkOrder += 1;

            const uploadPercentage = ((bytesRead / fileSize) * 100).toFixed(2);

            await insertDocumentChunk({
                documentId: documentData.id,
                chunkOrder,
                chunk: chunk.toString('base64')
            });

            LOGGER.info(`[APP] Uploaded ${uploadPercentage}% of file ${file.name}.`);
        });

        readStream.on('end', async () => {
            LOGGER.info(`[APP] Upload of file ${file.name} reached END.`);

            documentData['chunksNum'] = chunkOrder;
            documentData['status'] = DOCUMENT_STATUS.NEW;
            documentData['year'] = parseInt(documentDate.year);
            documentData['month'] = parseInt(documentDate.month);

            await insertDocument(documentData);

            resolve(file.name);
        });

        readStream.on('error', (error) => {
            LOGGER.error(`[APP] Error while uploading file ${file.name}. `, error);

            reject(error);
        });
    });
};

export const handleDocumentDownload = (ctx) => {
    const { documentId } = ctx.params;
    const stream = new Readable;

    return new Promise(async (resolve, reject) => {
        try {
            let chunkOrder = 1;

            LOGGER.info(`[APP] Get file with id: ${documentId}`);

            const document = await findDocumentById(documentId);

            ctx.response.set(HEADERS.response.CONTENT_TYPE, TYPES.bin);
            ctx.response.set(HEADERS.response.CONTENT_DISPOSITION, `attachment, filename="${parseFilename(document.name)}"`);

            ctx.body = stream;

            while(chunkOrder <= document.chunksNum) {
                const documentChunk = await findChunkByDocumentIdAndChunkOrder(documentId, chunkOrder);

                const chunkBuffer = Buffer.from(documentChunk.chunk, 'base64');

                stream.push(chunkBuffer);

                chunkOrder += 1;
            }

            //end of stream
            stream.push(null);

            resolve({msg: 'Download Completed!'});
        } catch(error) {
            LOGGER.error(`[APP] Error while getting document by id: ${documentId}`);

            reject(error);
        }
    });
};

const parseFilename = (fileName) => {
    const parsedFilename = fileName.replace(' ', '_');

    return parsedFilename;
};

export const readDocumentFromDb = (documentId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let chunkOrder = 1;
            let buffs = [];

            const document = await findDocumentById(documentId);

            if (!document) {
                reject();
            }

            LOGGER.info('[APP] Load document buffer.');

            while(chunkOrder <= document.chunksNum) {
                const documentChunk = await findChunkByDocumentIdAndChunkOrder(documentId, chunkOrder);

                const chunkBuffer = Buffer.from(documentChunk.chunk, 'base64');

                buffs = [...buffs, chunkBuffer];

                chunkOrder += 1;
            }

            const documentData = Buffer
                                    .concat(buffs)
                                    .toString('utf8');

            const parsedDocumentData = await parseCsv(documentData);

            resolve(parsedDocumentData);
        } catch(error) {
            LOGGER.error('[APP] Error reading document from DB');

            reject(error);
        }
    });
};
