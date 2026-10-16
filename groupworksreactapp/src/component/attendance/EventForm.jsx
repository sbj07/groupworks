import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../api/http';
import { notify } from '../common/Toast';
import { dateOrder, dateTimeOrder, firstError, maxLength, required } from '../../utils/validate';

/*
 * 출장/외근/휴가 일정 등록·수정 공통 폼
 * - kind: business-trip | outside-work | vacation
 * - type: 'put' 이면 수정 (putId 필요), 아니면 등록
 */
const KINDS = {
    'business-trip': { title: '출장', dateType: 'date', start: 'startDate', end: 'endDate', startLabel: '시작일', endLabel: '종료일' },
    'outside-work': { title: '외근', dateType: 'datetime-local', start: 'startTime', end: 'endTime', startLabel: '시작 시간', endLabel: '종료 시간' },
    vacation: { title: '휴가', dateType: 'date', start: 'startDate', end: 'endDate', startLabel: '시작일', endLabel: '종료일' },
};

const EventForm = ({ kind, type, putId, hideTitle }) => {
    const conf = KINDS[kind];
    const isPut = type === 'put';
    const [form, setForm] = useState({ start: '', end: '', memo: '', onsiteStart: false, onsiteEnd: false, half: false });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked, type: inputType } = e.target;
        setForm({ ...form, [name]: inputType === 'checkbox' ? checked : value });
    };

    const validate = () => firstError([
        required(form.start, conf.startLabel),
        required(form.end, conf.endLabel),
        kind === 'outside-work' ? dateTimeOrder(form.start, form.end) : dateOrder(form.start, form.end),
        kind === 'vacation' && form.half && form.start !== form.end ? '반차는 하루만 선택할 수 있습니다.' : null,
        kind === 'business-trip' ? maxLength(form.memo, 100, '메모') : null,
    ]);

    const body = () => {
        const base = { no: isPut ? putId : undefined, [conf.start]: form.start.replace('T', ' '), [conf.end]: form.end.replace('T', ' ') };
        if (kind === 'business-trip') return { ...base, memo: form.memo.trim() };
        if (kind === 'outside-work') return { ...base, onsiteStart: form.onsiteStart ? 'Y' : 'N', onsiteEnd: form.onsiteEnd ? 'Y' : 'N' };
        return { ...base, halfDayType: form.half ? 'Y' : 'N' };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            notify(error, 'error');
            return;
        }
        setSubmitting(true);
        const path = `/api/attendance/${kind}`;
        const result = isPut ? await api.put(path, body()) : await api.post(path, body());
        setSubmitting(false);
        if (result.ok) {
            notify(isPut ? '일정을 수정했습니다.' : '일정을 등록했습니다.', 'success');
            setTimeout(() => window.location.reload(), 600);
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            {!isPut && !hideTitle && <h3 style={{ fontSize: 15, marginBottom: 12 }}>{conf.title} 등록</h3>}
            <Form.Group className="mb-2" controlId={`${kind}-start`}>
                <Form.Label>{conf.startLabel}</Form.Label>
                <Form.Control type={conf.dateType} name="start" value={form.start} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2" controlId={`${kind}-end`}>
                <Form.Label>{conf.endLabel}</Form.Label>
                <Form.Control type={conf.dateType} name="end" value={form.end} min={form.start || undefined} onChange={handleChange} />
            </Form.Group>
            {kind === 'business-trip' && (
                <Form.Group className="mb-2" controlId={`${kind}-memo`}>
                    <Form.Label>메모/비고</Form.Label>
                    <Form.Control type="text" name="memo" value={form.memo} onChange={handleChange} maxLength={100} placeholder="출장지, 목적 등" />
                </Form.Group>
            )}
            {kind === 'outside-work' && (
                <div className="d-flex gap-3 mb-2">
                    <Form.Check type="checkbox" id={`${kind}-onsite-start`} label="현지출근" name="onsiteStart" checked={form.onsiteStart} onChange={handleChange} />
                    <Form.Check type="checkbox" id={`${kind}-onsite-end`} label="현지퇴근" name="onsiteEnd" checked={form.onsiteEnd} onChange={handleChange} />
                </div>
            )}
            {kind === 'vacation' && (
                <Form.Check className="mb-2" type="checkbox" id={`${kind}-half`} label="반차 (0.5일)" name="half" checked={form.half} onChange={handleChange} />
            )}
            <Button variant="primary" type="submit" className="w-100 mt-2" disabled={submitting}>
                {submitting ? '저장 중...' : isPut ? '수정' : '등록'}
            </Button>
        </Form>
    );
};

export default EventForm;
