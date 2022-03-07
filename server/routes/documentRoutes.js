//@ts-check
import Router from 'koa-router';
import koaBody from 'koa-body';
import * as ctrl from '../controllers';

const api = new Router();

const bodyParser = koaBody({
    multipart: true
});

api.get('/documents', ctrl.document.getAll);
api.get('/documents/:documentId', ctrl.document.get);
api.get('/documents/:documentId/download', ctrl.document.download);

api.post('/document:dryRun?', bodyParser, ctrl.document.post);
api.post('/documents/:documentId/parse', ctrl.document.parse);

export default api.routes();