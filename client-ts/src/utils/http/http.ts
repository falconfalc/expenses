import axios, { AxiosRequestConfig } from 'axios';

const httpGetDefaultConfig: AxiosRequestConfig<any> = {
    timeout: 3000, // 3 seconds timeout
    responseType: 'json'
};

export const get = async (url: string, config = httpGetDefaultConfig) => {
    try {
        config.url = url;
        config.method = 'get';

        return await axios(config);
    } catch(error) {

    }
};

export const post = async (url: string, data?: any, config = httpGetDefaultConfig) => {
    config.url = url;
    config.method = 'post';
    config.data = data;

    return await axios(config);
};

export const upload = async(url: string, data: any, config = httpGetDefaultConfig) => {
    config.url = url;
    config.method = 'post';
    config.data = data;
    config.headers = {
        'Conten-Type': 'multipart/form-data'
    };

    return await axios(config);
};