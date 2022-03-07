import axios from 'axios';
import { openNotificationWithIcon, type } from '../Notification';

axios.interceptors.response.use(undefined, (error) => {
    openNotificationWithIcon(type.ERROR, error.code, error.message, 0);

    return Promise.reject(error);
});
