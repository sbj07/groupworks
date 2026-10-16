import React, { useState } from 'react';
import { Form, Label, Input, SubmitButton } from '../common/FormLayout';
import useLoginMember from '../../hooks/useLoginMember';
import { notify } from '../common/Toast';
import { dateTimeOrder, firstError, maxLength, required } from '../../utils/validate';

// 'YYYY-MM-DD HH:mm' ↔ datetime-local 'YYYY-MM-DDTHH:mm'
const toInput = (value) => (value ? value.replace(' ', 'T').slice(0, 16) : '');

/**
 * 회의실 예약 신청/수정 공통 폼
 * - initial: 수정할 때 기존 예약
 * - onSubmit(body): 저장 요청
 */
const BookForm = ({ heading, initial, onSubmit }) => {
    const member = useLoginMember() ?? {};
    const [form, setForm] = useState({
        bookPlace: initial?.bookPlace ?? '',
        startDate: toInput(initial?.startDate),
        endDate: toInput(initial?.endDate),
        bookPurpose: initial?.bookPurpose ?? '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = firstError([
            required(form.bookPlace, '장소'),
            maxLength(form.bookPlace, 50, '장소'),
            required(form.startDate, '시작 일시'),
            required(form.endDate, '종료 일시'),
            dateTimeOrder(form.startDate, form.endDate),
            !initial && form.startDate && new Date(form.startDate) < new Date() ? '지난 시간은 예약할 수 없습니다.' : null,
            required(form.bookPurpose, '사용 목적'),
            maxLength(form.bookPurpose, 200, '사용 목적'),
        ]);
        if (error) {
            notify(error, 'error');
            return;
        }
        setSubmitting(true);
        await onSubmit({
            bookNo: initial?.bookNo,
            bookPlace: form.bookPlace.trim(),
            startDate: form.startDate,
            endDate: form.endDate,
            bookPurpose: form.bookPurpose.trim(),
        });
        setSubmitting(false);
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <h1>{heading}</h1>
            <Label>예약자<span className="readonly">{initial?.memberName ?? member.name}</span></Label>
            <Label>
                장소
                <Input type="text" name="bookPlace" value={form.bookPlace} onChange={handleChange} maxLength={50} placeholder="예) 3층 대회의실" />
            </Label>
            <div className="row">
                <Label>
                    시작 일시
                    <Input type="datetime-local" name="startDate" value={form.startDate} onChange={handleChange} />
                </Label>
                <Label>
                    종료 일시
                    <Input type="datetime-local" name="endDate" value={form.endDate} min={form.startDate || undefined} onChange={handleChange} />
                </Label>
            </div>
            <Label>
                사용 목적
                <Input type="text" name="bookPurpose" value={form.bookPurpose} onChange={handleChange} maxLength={200} placeholder="예) 주간 회의" />
            </Label>
            <SubmitButton disabled={submitting}>{submitting ? '저장 중...' : '저장'}</SubmitButton>
        </Form>
    );
};

export default BookForm;
