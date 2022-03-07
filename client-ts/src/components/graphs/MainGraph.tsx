import React, { useEffect, useState } from 'react';
import { DatePicker, Divider, Space } from 'antd';
import {
    LoadingOutlined,
} from '@ant-design/icons';
import { getDatasInRange } from '../../actions/DataActions';
import DataOnTreeMap from './DataOnTreeMap';
import _ from 'lodash';
import HorizontalBarPlot from './HorizontalBarPlot';
import AlertComp from '../commons/AlertComp';

const MainGraph = (props: any) => {
    const { RangePicker } = DatePicker;
    const [dateRange, setDateRange] = useState([]);
    const [data, setData] = useState([]);
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [alertData, setAlertData] = useState({message: '', type: '', showAlert: false});

    useEffect(() => {
        if (dateRange.length) {
            loadDataInRange()
        }
    }, [dateRange]);

    useEffect(() => {
        setParsedData(parseData(data));
    }, [data]);

    const loadDataInRange = async () => {
        setShowLoader(true);
        const _data = await getDatasInRange(dateRange);

        setData(_data);
        setShowLoader(false);

        if (!_data.length) {
            setAlertData({
                message: 'Range does not include any data',
                type: 'warning',
                showAlert: true,
            });
        } else {
            setAlertData({
                message: '',
                type: '',
                showAlert: false,
            });


        }
    };

    const parseData = (rawData: any[]) => {
        const groupedData = _.groupBy(rawData, 'transactionType');

        return Object.keys(groupedData)
            .map((key) => ({
                name: key,
                value: groupedData[key].reduce((acc, val) => acc + val.sum, 0),
                children: groupedData[key].map((row) => ({
                    name: key === 'TRANSFER' ? row?.fullData[1] : row?.fullData[2],
                    value: row?.sum,
                }))
            }));
    };

    const onChangeRangePicker = (dates: any, dateStrings: any) => {
        if (dateStrings) {
            setDateRange(dateStrings);
        }
    };

    const graphChildren = (
        <>
            <Divider />
            <DataOnTreeMap parsedData={parsedData} />
            <Divider />
            <HorizontalBarPlot data={data} />
        </>
    );

    return (
        <>
            <Space>
                <RangePicker onChange={onChangeRangePicker} />
                { showLoader && <LoadingOutlined/> }
                { alertData?.showAlert && <AlertComp message={alertData.message} type={alertData.type} /> }
            </Space>
            {data.length ? graphChildren : ''}
        </>
    );
};

export default MainGraph;