import { CONF } from '../config/Config';

export const ENDPOINT_BASE_URL = `${CONF.ENDPOINT_PREFIX}localhost:${CONF.ENDPOINT_PORT}/api/v1`;

export const DOCUMENT_ENDPOINTS = {
    DOCUMENTS_BASE_PATH: `${ENDPOINT_BASE_URL}/documents`,
    UPLOAD_DOCUMENT: `${ENDPOINT_BASE_URL}/document`,
};

export const DATA_ENDPOINTS = {
    DATA_IN_RANGE: `${ENDPOINT_BASE_URL}/data/inRange`,
};