const ENV = process.env.EXPENSES_ENVIRONMENT || 'DEV';
const BACKEND_PORT = process.env.EXPENSES_SERVER_PORT || 8081;

export const CONF = {
    ENDPOINT_PREFIX: ENV === 'PROD' ? 'https://' : 'http://',
    ENDPOINT_PORT: BACKEND_PORT,
};