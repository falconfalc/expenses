//@ts-check
export const serverConfig = {
        port: process.env.EXPENSES_SERVER_PORT || 8081,
        apiVersion: process.env.EXPENSES_API_VERSION || 'v1',
        environment: process.env.EXPENSES_ENVIRONMENT || 'DEV',
        version: process.env.EXPENSES_APP_VERSION || '0.0.1',
        logLevel: process.env.EXPENSES_LOG_LEVEL || 'error',
        name: 'Bills & Expenses',
        uploadMaxFileSize: 1 * 1024 * 1024 // max 1 MB
};