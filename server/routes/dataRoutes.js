//@ts-check
import Router from 'koa-router';
import * as ctrl from '../controllers';

const api = new Router();

api.get('/data/inRange/:rangeStart/:rangeEnd', ctrl.data.getDataInRange);
api.get('/data/groupInRange/:rangeStart/:rangeEnd', ctrl.data.groupDataInRange);

export default api.routes();