import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import BookForm from './BookForm';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

// 회의실 예약 수정 (목록의 상세 창에서 넘어온다)
const BookEdit = () => {
    const navigate = useNavigate();
    const selectedVo = useLocation().state?.selectedVo;

    if (!selectedVo) return <Navigate to="/book/list" replace />;

    const handleSubmit = async (body) => {
        const result = await api.post('/book/edit', body);
        if (result.ok) {
            notify(result.message, 'success');
            navigate('/book/list');
        }
    };

    return <BookForm heading="예약 수정" initial={selectedVo} onSubmit={handleSubmit} />;
};

export default BookEdit;
