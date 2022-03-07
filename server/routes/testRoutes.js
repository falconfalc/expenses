//@ts-check
import Router from 'koa-router';
import * as ctrl from '../controllers';

const api = new Router();

api.get('/test', ctrl.test.get);

export default api.routes();