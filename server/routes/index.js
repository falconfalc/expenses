//@ts-check
import Router from '@koa/router';
import { serverConfig } from '../config';
import testRoutes from './testRoutes';
import documentRoutes from './documentRoutes';
import dataRoutes from './dataRoutes';
import utilRoutes from './utilRoutes';

const router = new Router();
const api = new Router();

api
    .use(testRoutes)
    .use(documentRoutes)
    .use(dataRoutes)
    .use(utilRoutes);

router.use(`/api/${serverConfig.apiVersion}`, api.routes());

export default router;