//@ts-check
import { LOGGER } from '../../utils/logger';
import DocumentModel from '../models/DocumentModel';
import DocumentChunksModel from '../models/DocumentChunksModel';
import DocumentProcessedDataModel from '../models/DocumentProcessedDataModel';

export const findDocumentById = async (documentId) => {
    try {
        const document = await DocumentModel.findOne({ id: documentId }).lean().exec();

        return document;
    } catch(error) {
        LOGGER.error(`[APP-DB] Error while reading document with id: ${documentId}`);
    }
};

export const findDocumentByFilter = async(filter) => {
    try {
        const document = await DocumentModel.findOne(filter).lean().exec();

        return document
    } catch(error) {
        LOGGER.error(`[APP-DB] Error while reading document with filter: ${JSON.stringify(filter)}`);
    }
};

export const updateDocument = async (documentId, documentUpdateData) => {
    try {
        // const document = await DocumentModel.findOne({ id: documentId }).lean().exec();

        await DocumentModel.updateOne({ id: documentId }, documentUpdateData);

        // await documentModel.save();
    } catch (error) {
        LOGGER.error(`[APP-DB] Failed to update document with id ${documentId}`);
    }
};

export const findAllDocuments = async () => {
    try {
        const documents = await DocumentModel.find().lean().exec();

        return documents;
    } catch(error) {
        LOGGER.error('[APP] Error while getting all documents from db.');
    };
};

export const insertDocument = async (documentData) => {
    const document = new DocumentModel(documentData);

    try {
        await document.save();
    } catch (error) {
        LOGGER.error(`[APP-DB] Error while inserting new document with id ${documentData.id} in DB: `, error);
    }
};

export const findChunkByDocumentIdAndChunkOrder = async (documentId, chunkOrder) => {
    try {
        const documentChunk = await DocumentChunksModel.findOne({ documentId, chunkOrder }).lean().exec();

        return documentChunk;
    } catch (error) {
        LOGGER.error(`[APP-DB] Error while reading chunk order ${chunkOrder} for document with id: ${documentId}`);
    };
};

export const insertDocumentChunk = async (chunk) => {
    const documentChunk = new DocumentChunksModel(chunk);

    try {
        await documentChunk.save();
    } catch (error) {
        LOGGER.error(`[APP-DB] Error while inserting new document with id ${chunk.documentId} in DB: `, error);
    }
};

export const insertDocumentProcessedData = async (documentData) => {
    const documentProcessedData = new DocumentProcessedDataModel(documentData);

    try {
        await documentProcessedData.save();
    } catch (error) {
        LOGGER.error(`[APP-DB] Error while inserting document data for document with id ${documentData.documentId} in DB: `, error);
    }
};