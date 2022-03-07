//@ts-check
import pino from 'pino';
import colada from 'pino-colada';
import os from 'os';
import { serverConfig } from '../config';

const serializers = {
    req: req => {
        return pino.stdSerializers.req(req)
    },
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    user: user => ({
        id: user._id,
    }),
};

const opts = {
    // level: serverConfig.logLevel,
    serializers,
    // base: {
    //     NODE_ENV: process.env.NODE_ENV,
    //     environment: serverConfig.environment,
    //     version: serverConfig.version,
    //     name: serverConfig.name,
    //     pid: process.pid,
    //     hostname: os.hostname(),
    // },
    // prettifier: colada
};

const LOGGER = pino(opts);

export {
    LOGGER,
    opts,
    serializers
};