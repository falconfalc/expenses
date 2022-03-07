import React from 'react';
import { Typography } from 'antd';
import { Bar } from '@ant-design/plots';
import { transactionTypeResolver } from '../../utils/const/NameResolver';

const HorizontalBarPlot = (props: { data: any; }) => {
    const { data } = props;

    const { Title } = Typography;

    const plotData = data
                        .filter((row: { transactionType: string; }) => row.transactionType === transactionTypeResolver.CUMPARARE)
                        .sort((a: { sum: number; }, b: { sum: number; }) => b.sum - a.sum)
                        .map((row: { fullData: any[]; sum: any; }) => ({
                            name: row.fullData[2],
                            info: row.fullData[0],
                            value: row.sum,
                        }));

    const config = {
        data: plotData,
        xField: 'value',
        yField: 'name',
        seriesField: 'name',
        legend: {
            position: 'top-left'
        },
        minBarWidth: 8,
        height: 800,
    };

    return (
        <>
            <Title level={4} className='treemap-title' >Top Buy</Title>
            {
                //@ts-ignore}
                <Bar {...config} />
            }
        </>
    );
};

export default HorizontalBarPlot;