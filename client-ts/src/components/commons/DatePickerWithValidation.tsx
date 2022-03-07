import React from 'react';
import { DatePicker } from 'antd';
import Text from 'antd/lib/typography/Text';
import { INPUT_NAME_RESOLVER } from '../../helpers/NameResolvers';

const DatePickerWithValidation = ({ onDateChange }: { onDateChange: any }) => {
    return(
        <>
            <DatePicker
                onChange={onDateChange}
                picker="month"
            />
            <Text
                className='validation-message'
                type="danger" id={INPUT_NAME_RESOLVER.DOCUMENT_UPLOAD_DATE_PERIOD_VALIDATION_MESSAGE}
                style={{display: 'none'}}
            ></Text>
        </>
    );
};

export default DatePickerWithValidation;