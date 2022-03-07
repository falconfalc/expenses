import { notification } from 'antd';

export const type = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    WARN: 'warn'
};

export const openNotificationWithIcon = (type: string, title: any, description: any, duration = 0) => {
    const n: {[index: string]: any} = notification;

    n[type]({
        duration,
        message: title,
        description
    })
};
