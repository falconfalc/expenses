//@ts-check
import Koa from 'koa';
import koaLogger from 'koa-pino-logger';
import koaBody from 'koa-body';
import serve from 'koa-static';
import mount from 'koa-mount';
import cors from '@koa/cors';
import path from 'path';

import { serverConfig }  from './config';
import { getDbConnection } from './db/dbConnect';
import router from './routes';
import { LOGGER, opts } from './utils/logger';

const app = new Koa();

const PATH_TO_STATIC = path.join(path.resolve(), '/client-ts/build');

app
    .use(koaLogger({
        serializers: opts.serializers
    }))
    .use(cors())
    .use(koaBody())
    .use(mount('/', serve(PATH_TO_STATIC)))
    .use(router.routes())
    .use(router.allowedMethods());

getDbConnection()
    .then(() => {
        app.listen(serverConfig.port, () => {
            LOGGER.info(`[APP] Server is listening on port ${serverConfig.port}. Visit http://localhost:${serverConfig.port}/`);
        });
    })
    .catch((error) => {
        LOGGER.error('[APP] Error occurred: ', error);
});