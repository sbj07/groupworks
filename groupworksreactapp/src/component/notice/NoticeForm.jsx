import React, { useEffect, useState } from 'react';
import { Form, Label, Input, TextArea, Select, SubmitButton } from '../common/FormLayout';
import useLoginMember from '../../hooks/useLoginMember';
import { api } from '../../api/http';
import { notify } from '../common/Toast';
import { attachment, firstError, maxLength, required, selected } from '../../utils/validate';

const TITLE_MAX = 100;
const CONTENT_MAX = 2000;

/**
 * 공지사항 작성/수정 공통 폼
 * - initial: 수정할 때 기존 공지 (없으면 새 글)
 * - onSubmit(formData): FormData 를 받아 저장하고 성공 여부를 돌려준다
 */
const NoticeForm = ({ heading, initial, onSubmit }) => {
    const member = useLoginMember() ?? {};
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({
        title: initial?.title ?? '',
        content: initial?.content ?? '',
        category: initial?.category ?? '',
        openDepart: initial?.openDepart ?? '',
        emergencyYn: initial?.emergencyYn ?? 'N',
    });
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        api.get('/notice/list/categoryList').then(data => data.ok && setCategories(data.categories ?? []));
        api.get('/notice/list/departList').then(data => data.ok && setDepartments(data.list ?? []));
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (e) => {
        const chosen = e.target.files[0] ?? null;
        const error = attachment(chosen);
        if (error) {
            notify(error, 'error');
            e.target.value = '';
            setFile(null);
            return;
        }
        setFile(chosen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = firstError([
            required(form.title, '제목'),
            maxLength(form.title, TITLE_MAX, '제목'),
            required(form.content, '내용'),
            maxLength(form.content, CONTENT_MAX, '내용'),
            selected(form.category, '카테고리'),
            selected(form.openDepart, '공개 부서'),
        ]);
        if (error) {
            notify(error, 'error');
            return;
        }
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, typeof value === 'string' ? value.trim() : value));
        if (file) formData.append('file', file);

        setSubmitting(true);
        await onSubmit(formData);
        setSubmitting(false);
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            {heading && <h1>{heading}</h1>}
            <Label>작성자<span className="readonly">{initial?.memberName ?? member.name}</span></Label>
            <Label>
                제목
                <Input type="text" name="title" value={form.title} onChange={handleChange} maxLength={TITLE_MAX} placeholder="제목을 입력하세요" />
            </Label>
            <Label>
                내용
                <TextArea name="content" value={form.content} onChange={handleChange} maxLength={CONTENT_MAX} placeholder="내용을 입력하세요" />
            </Label>
            <div className="row">
                <Label>
                    카테고리
                    <Select name="category" value={form.category} onChange={handleChange}>
                        <option value="">선택</option>
                        {categories.map(c => <option key={c.categoryNo} value={c.categoryNo}>{c.categoryCon}</option>)}
                    </Select>
                </Label>
                <Label>
                    공개 부서
                    <Select name="openDepart" value={form.openDepart} onChange={handleChange}>
                        <option value="">선택</option>
                        {departments.map(d => <option key={d.no} value={d.no}>{d.name}</option>)}
                    </Select>
                </Label>
                <Label>
                    긴급 여부
                    <Select name="emergencyYn" value={form.emergencyYn} onChange={handleChange}>
                        <option value="N">일반</option>
                        <option value="Y">긴급</option>
                    </Select>
                </Label>
            </div>
            <Label>
                파일첨부 <small style={{ fontWeight: 400 }}>(5MB 이하, 문서·이미지·zip{initial?.filePath ? ' · 새 파일을 고르면 기존 파일을 바꿉니다' : ''})</small>
                <Input type="file" name="file" onChange={handleFile} />
            </Label>
            <SubmitButton disabled={submitting}>{submitting ? '저장 중...' : '저장'}</SubmitButton>
        </Form>
    );
};

export default NoticeForm;
