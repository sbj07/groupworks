import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from './BookForm';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

// 회의실 예약 신청
const BookWrite = () => {
    const navigate = useNavigate();

    const handleSubmit = async (body) => {
        const result = await api.post('/book/insert', body);
        if (result.ok) {
            notify(result.message, 'success');
            navigate('/book/list');
        }
    };

    return <BookForm heading="회의실 예약 신청" onSubmit={handleSubmit} />;
};

export default BookWrite;
