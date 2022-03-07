import { Button, Divider, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { loadAllDocuments, parseDocument } from '../../actions/DocumentActions';
import DocumentUploadModal from './DocumentUploadModal';
import { Document } from '../../utils/types/DocumentType';
import { dispatch, useGlobalState } from '../../utils/GlobalHookState';

const Documents = (props: any) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [shouldLoadAllDocuments] = useGlobalState('shouldLoadAllDocuments');

    const enum DOCUMENT_STATUS {
        NEW = 'NEW',
        PROCESSED = 'PROCESSED',
        PROCESS_FAILED = 'PROCESS_FAILED'
    }

    useEffect(() => {
        getAllDocuments();
    }, []);


    useEffect(() => {
        if (shouldLoadAllDocuments) {
            getAllDocuments()
        }
    }, [shouldLoadAllDocuments]);

    const getAllDocuments = async () => {
        const documents = await loadAllDocuments();

        setDocuments(documents);

        dispatch({ type: 'LOAD_ALL_DOCUMENTS', payload: { shouldLoadAllDocuments: false }});
    };

    //TODO: fix dates for 2022
    const getDateFromString = (dateStr: Date) => {
        const date = new Date(dateStr);

        // ignore literal value
        const [ month, , day ] = new Intl
                                    .DateTimeFormat('en-US', {
                                        month: 'long',
                                        day: '2-digit'
                                    })
                                    .formatToParts(date);

        return `${day.value}-${month.value}-${date.getFullYear()}`;
    };

    const handleOpenUploadModal = () => {
        setShowUploadModal(true);
    };

    const handleParseDocument = async (document: Document) => {
        const { id } = document;

        const parsedDocument = await parseDocument(id);
    };

    const renderDocumentStatus = (status: String) => {
        switch(status) {
            case DOCUMENT_STATUS.NEW:
                return(<Tag color="blue">{DOCUMENT_STATUS.NEW}</Tag>);
            case DOCUMENT_STATUS.PROCESSED:
                return(<Tag color="green">{DOCUMENT_STATUS.PROCESSED}</Tag>);
            case DOCUMENT_STATUS.PROCESS_FAILED:
                return(<Tag color="red">{DOCUMENT_STATUS.PROCESS_FAILED}</Tag>);
            default:
                return(<></>);
        }
    };

    const renderDatePeriod = (val: any, row: any) => {
        return(`${row.year}-${row.month}`);
    };

    const renderParseButton = (val: any, row: any) => {
        return(
            <Button
                type='primary'
                onClick={() => handleParseDocument(row)}
                disabled={row.status !== DOCUMENT_STATUS.NEW}
            >Parse Document</Button>
        );
    };

    const columns = [
        {
            title: 'Date Period',
            dataIndex: '',
            key: '',
            render: renderDatePeriod,
        },
        {
            title: 'Document Filename',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Chunks',
            dataIndex: 'chunksNum',
            key: 'chunksNum',
        },
        {
            title: 'Date Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (dateStr: any) => getDateFromString(dateStr),
        },
        {
            title: 'Date Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (dateStr: any) => getDateFromString(dateStr),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderDocumentStatus
        },
        {
            title: '',
            dataIndex: '',
            key: 'index',
            render: renderParseButton
        }
    ];

    return (
        <>
            <Button type="primary" icon={<UploadOutlined />} onClick={handleOpenUploadModal}>
                Upload Doc
            </Button>
            <DocumentUploadModal
                showModal={showUploadModal}
                onUploadSuccess={getAllDocuments}
                onSetShowUploadModal={setShowUploadModal} />
            <Divider dashed />
            <Table columns={columns} dataSource={documents} />
        </>
    );
};

export default Documents;