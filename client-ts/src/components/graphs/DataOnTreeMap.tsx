import React from 'react';
import { Treemap } from '@ant-design/charts';
import { Typography  } from 'antd';
import _ from 'lodash';
import './DataOnTreeMap.css';

const DataOnTreeMap = (props: { parsedData: any[] }) => {
    const { parsedData } = props;
    const { Title } = Typography;

    const treeMapData = {
        name: 'root',
        children: parsedData,
    };

    const config = {
        data: treeMapData,
        colorField: 'name',
        tooltip: {
            formatter: (v: any) => {
                const root = v.path[v.path.length - 1];
                return {
                    name: v.name,
                    value: `${v.value} (${((v.value / root.value) * 100).toFixed(2)}%)`,
                };
            },
        },
        interactions: [
            {
                type: 'treemap-drill-down',
            },
        ],
        animation: {},
        drilldown: {
            enabled: true,
            breadCrumb: {
                rootText: 'Index',
                position: 'top-left',
            },
        },
    };

    return (
        <>
            <Title level={4} className='treemap-title' >Tree Map</Title>
            {
                //@ts-ignore
                <Treemap {...config} />
            }
        </>
    );
};

export default DataOnTreeMap;