import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import NoticeForm from './NoticeForm';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

// 공지사항 수정 (목록의 상세 창에서 넘어온다)
const NoticeEdit = () => {
    const navigate = useNavigate();
    const notice = useLocation().state?.notice;

    useEffect(() => {
        if (!notice) notify('수정할 공지사항을 목록에서 선택해주세요.', 'info');
    }, [notice]);

    if (!notice) return <Navigate to="/notice/list" replace />;

    const handleSubmit = async (formData) => {
        formData.append('noticeNo', notice.noticeNo);
        const result = await api.post('/notice/edit', formData);
        if (result.ok) {
            notify(result.message, 'success');
            navigate('/notice/list');
        }
    };

    return <NoticeForm heading="공지사항 수정" initial={notice} onSubmit={handleSubmit} />;
};

export default NoticeEdit;
