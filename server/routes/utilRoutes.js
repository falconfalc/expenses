//@ts-check
import Router from 'koa-router';
import * as ctrl from '../controllers';

const api = new Router();

api.put('/util/groupData', ctrl.util.groupData);

export default api.routes();