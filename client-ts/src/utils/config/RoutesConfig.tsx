import React from 'react';
import Documents from '../../components/documents/Documents';
import Main from '../../components/Main';
import MainGraph from '../../components/graphs/MainGraph';

const RoutesConfig = [
    {
        path: '/',
        Component: <Main />
    },
    {
        path: '/documents',
        Component: <Documents />
    },
    {
        path: '/graphs',
        Component: <MainGraph />
    }
];

export default RoutesConfig;