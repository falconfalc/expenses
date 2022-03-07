import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import _ from 'lodash-es';
import { UploadFile } from 'antd/lib/upload/interface';
import { Button, Divider, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DOCUMENT_ENDPOINTS } from '../../utils/const/Endpoints';
import { upload } from '../../utils/http/http';
import { INPUT_NAME_RESOLVER } from '../../helpers/NameResolvers';
import { handleValidationErrors, ResponseError } from '../Validation/HandleValidation';
import DatePickerWithValidation from '../commons/DatePickerWithValidation';
import { dispatch } from '../../utils/GlobalHookState';

const DocumentUploadModal = ({ showModal, onSetShowUploadModal, onUploadSuccess }: { showModal: boolean, onSetShowUploadModal: Dispatch<SetStateAction<boolean>>, onUploadSuccess: () => Promise<void> }) => {
    const [uploadStatus, setUploadStatus] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [docDate, setDocDate] = useState({});
    const [formData, setFormData] = useState(new FormData());
    const [validToUpload, setValidToUpload] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (!_.isEmpty(docDate)) {
            validateDocPeriod(formData);
        }
    }, [docDate]);

    //TODO: Make also reset on the datepicker input
    const resetModal = () => {
        onSetShowUploadModal(false);
        setFileList([]);
        setFormData(new FormData());
    }

    const saveValidationErrors = (errors: ResponseError[]) => {
        dispatch({ type: 'VALIDATION_ERRORS', payload: { validationErrors: errors }});
        setValidationErrors([]);
    };

    const handleUpload = async () => {
        try {
            formData.delete('file');

            fileList.forEach((file) => {
                //@ts-expect-error: Unreachable code error
                formData.append('file', file);
            });

            setUploadStatus(true);

            await upload(DOCUMENT_ENDPOINTS.UPLOAD_DOCUMENT, formData);

            await onUploadSuccess();

            resetModal();
        } catch (err) {

        } finally {
            setUploadStatus(false);
        }
    };

    const documentUploadProps = {
        beforeUpload: (file: UploadFile<any>) => {
            setFileList([...fileList, file]);
        },
        onRemove: (file: any) => {
            const idx = fileList.indexOf(file);
            const newFileList = fileList.slice();

            newFileList.splice(idx, 1);

            setFileList(newFileList);
        },
        fileList,
    };

    const validateDocPeriod = async (formData: FormData) => {
        try {
            const res = await upload(`${DOCUMENT_ENDPOINTS.UPLOAD_DOCUMENT}?dryRun=true`, formData);

            saveValidationErrors([]);
            setValidToUpload(true);
        } catch (err: any) {
            console.log(err);

            setValidToUpload(false);

            if(err.isAxiosError && err.response?.status === 400) {
                const errors = err.response.data;

                saveValidationErrors(errors);
            }
        }
    };

    const onDateChange = async (date: any, dateString: string) => {
        const [year, month] = dateString.split('-').map(str => parseInt(str));

        setDocDate({year, month});

        //reset value from previous selection
        formData.delete('documentDate');

        formData.append('documentDate', JSON.stringify({year, month}));
    };

    return (
        <>
            <Modal
                title="Upload Document"
                visible={showModal}
                onCancel={resetModal}
                footer={null}
            >
                <DatePickerWithValidation onDateChange={onDateChange} />
                <Divider dashed />
                <Upload {...documentUploadProps}>
                    <Button icon={<UploadOutlined />}>Select Document</Button>
                </Upload>
                <Button
                    type='primary'
                    onClick={handleUpload}
                    disabled={_.isEmpty(docDate) || fileList.length === 0 || !validToUpload}
                    loading={uploadStatus}
                    style={{ marginTop: 16 }}
                >
                    {uploadStatus ? 'Uploading' : 'Start Upload'}
                </Button>
            </Modal>
        </>
    );
};

export default DocumentUploadModal;