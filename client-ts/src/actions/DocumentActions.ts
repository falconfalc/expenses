import { AxiosResponse } from "axios";
import { DOCUMENT_ENDPOINTS } from "../utils/const/Endpoints";
import { get, post } from "../utils/http/http";
import { dispatch } from '../utils/GlobalHookState';

export const loadAllDocuments = async () => {
    try {
        const _documents: AxiosResponse<any, any> | undefined = await get(DOCUMENT_ENDPOINTS.DOCUMENTS_BASE_PATH);

        return _documents?.data;
    } catch (err) {}
};

export const parseDocument = async (documentId: string) => {
    try {
        const documentParseUrl = `${DOCUMENT_ENDPOINTS.DOCUMENTS_BASE_PATH}/${documentId}/parse`;

        const res = await post(documentParseUrl);

        if (res?.status === 200) {
            dispatch({ type: 'LOAD_ALL_DOCUMENTS', payload: { shouldLoadAllDocuments: true }});
        }

        return res?.data;
    } catch (err) {}
};