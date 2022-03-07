export const LogLevelType = {
    debug: 'debug',
    error: 'error',
    info: 'info',
    log: 'log',
    trace: 'trace',
    warn: 'warn'
}

const Logger = (logLevel: string | number, ...args: any[]) => {
    const logger: {[index: string]: any} = console;
    logger[logLevel](...args);
};

export default Logger;