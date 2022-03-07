//@ts-check
export const DOCUMENT_STATUS = Object.freeze({
    NEW: Symbol('NEW'),
    PROCESSED: Symbol('PROCESSED'),
    PROCESS_FAILED: Symbol('PROCESS_FAILED')
});

export const TRANSACTION_TYPE = Object.freeze({
    CUMPARARE: 'CUMPARARE',
    RETRAGERE: 'RETRAGERE',
    INCASARE: 'INCASARE',
    TRANSFER: 'TRANSFER',
});