import { Alert } from 'antd';
import React from 'react';

const AlertComp = (props: { message: string; type: any; }) => {
    const {message, type} = props;

    return(
        <>
            <Alert message={message} type={type} showIcon />
        </>
    );
};

export default AlertComp;