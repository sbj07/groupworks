import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoticeForm from './NoticeForm';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

// 공지사항 작성
const NoticeWrite = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        const result = await api.post('/notice/insert', formData);
        if (result.ok) {
            notify(result.message, 'success');
            navigate('/notice/list');
        }
    };

    return <NoticeForm heading="공지사항 작성" onSubmit={handleSubmit} />;
};

export default NoticeWrite;
