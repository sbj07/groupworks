import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    DocSheet, DocHeader, DocTable, ChoiceGroup, DocFooter, DocActions,
    ApprovalLine, ApproverPicker, APPROVAL_ROLES, today,
} from './ApprovalDoc';
import { DOC_TYPES, VACATION_KINDS, CONTENT_MAX } from './approvalConstants';
import useLoginMember from '../../hooks/useLoginMember';
import { api } from '../../api/http';
import { notify } from '../common/Toast';
import { firstError, required, selected, maxLength, dateOrder } from '../../utils/validate';

const EMPTY_APPROVERS = {
    firstApply: { name: '', no: '' },
    midApply: { name: '', no: '' },
    lastApply: { name: '', no: '' },
};

// 휴가신청서 / 출장신청서 작성 (주소: /approval/write/vacation, /approval/write/business)
const ApprovalWrite = () => {
    const { type = 'vacation' } = useParams();
    const docType = DOC_TYPES[type] ?? DOC_TYPES.vacation;
    const navigate = useNavigate();
    const loginMember = useLoginMember() ?? {};

    const [members, setMembers] = useState([]);
    const [pickerRole, setPickerRole] = useState('');
    const [approvers, setApprovers] = useState(EMPTY_APPROVERS);
    const [form, setForm] = useState({ startTime: '', finishTime: '', vacationNo: '', content: '' });
    const [sign, setSign] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // 양식을 바꾸면 입력값 초기화
    useEffect(() => {
        setApprovers(EMPTY_APPROVERS);
        setForm({ startTime: '', finishTime: '', vacationNo: '', content: '' });
        setSign('');
    }, [type]);

    useEffect(() => {
        api.get('/api/approval/approvers').then(data => data.ok && setMembers(data.list ?? []));
    }, []);

    // 이미 다른 칸에 지정한 사람은 목록에서 뺀다
    const pickable = useMemo(() => {
        const chosen = Object.entries(approvers).filter(([key]) => key !== pickerRole).map(([, a]) => a.no);
        return members.filter(m => !chosen.includes(m.no));
    }, [members, approvers, pickerRole]);

    const days = form.startTime && form.finishTime && form.finishTime >= form.startTime
        ? Math.floor((new Date(form.finishTime) - new Date(form.startTime)) / 86400000) + 1
        : 0;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSelect = (member) => {
        setApprovers(prev => ({ ...prev, [pickerRole]: { name: member.name, no: member.no, sub: member.positionName } }));
        setPickerRole('');
    };

    const validate = () => firstError([
        approvers.firstApply.no && approvers.midApply.no && approvers.lastApply.no ? null : '결재란의 승인자 3명을 모두 지정해주세요.',
        required(form.startTime, '시작일'),
        required(form.finishTime, '종료일'),
        dateOrder(form.startTime, form.finishTime),
        type === 'vacation' ? selected(form.vacationNo, '휴가 구분') : null,
        type === 'vacation' && form.vacationNo === '2' && form.startTime !== form.finishTime ? '반차는 하루만 선택할 수 있습니다.' : null,
        required(form.content, '세부사항'),
        maxLength(form.content, CONTENT_MAX, '세부사항'),
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            notify(error, 'error');
            return;
        }
        setSubmitting(true);
        const result = await api.post(`/api/approval/${type}`, {
            firstApplyNo: approvers.firstApply.no,
            midApplyNo: approvers.midApply.no,
            lastApplyNo: approvers.lastApply.no,
            vacationNo: type === 'vacation' ? form.vacationNo : null,
            startTime: form.startTime,
            finishTime: form.finishTime,
            content: form.content.trim(),
        });
        setSubmitting(false);
        if (result.ok) {
            notify(result.message, 'success');
            navigate('/approval/my');
        }
    };

    return (
        <>
            <DocSheet onSubmit={handleSubmit} noValidate>
                <DocHeader>
                    <div>
                        <h1>{docType.label}</h1>
                        <div className="doc-meta">작성일 {today()}</div>
                    </div>
                    <ApprovalLine approvers={approvers} onPick={setPickerRole} />
                </DocHeader>

                <DocTable>
                    <div className="label">성명</div>
                    <div className="value">{loginMember.name}</div>
                    <div className="label">부서</div>
                    <div className="value">{loginMember.departName}</div>
                    <div className="label">직급</div>
                    <div className="value">{loginMember.positionName}</div>
                    <div className="label">회사</div>
                    <div className="value">{loginMember.companyName}</div>
                    <div className="label">기간</div>
                    <div className="value full">
                        <input type="date" name="startTime" value={form.startTime} onChange={handleChange} />
                        ~
                        <input type="date" name="finishTime" value={form.finishTime} min={form.startTime || undefined} onChange={handleChange} />
                        {days > 0 && <span className="doc-days">{days}일</span>}
                    </div>
                    {type === 'vacation' && (
                        <>
                            <div className="label">휴가 구분</div>
                            <div className="value full">
                                <ChoiceGroup>
                                    {Object.entries(VACATION_KINDS).map(([no, label]) => (
                                        <label key={no}>
                                            <input type="radio" name="vacationNo" value={no} checked={form.vacationNo === no} onChange={handleChange} />
                                            <span>{label}</span>
                                        </label>
                                    ))}
                                </ChoiceGroup>
                            </div>
                        </>
                    )}
                    <div className="label">세부사항</div>
                    <div className="value full tall" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <textarea name="content" value={form.content} onChange={handleChange} placeholder={docType.placeholder} maxLength={CONTENT_MAX} />
                        <small style={{ alignSelf: 'flex-end', color: 'var(--gw-text-muted)' }}>{form.content.length} / {CONTENT_MAX}</small>
                    </div>
                </DocTable>

                <DocFooter>
                    <p>{docType.statement}</p>
                    <p className="date">{today()}</p>
                    <div className="sign">
                        신청자
                        <input type="text" value={sign} onChange={e => setSign(e.target.value)} placeholder={loginMember.name || '이름'} maxLength={20} />
                        (인)
                    </div>
                </DocFooter>

                <DocActions>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/approval/my')}>취소</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? '요청 중...' : '결재 요청'}</button>
                </DocActions>
            </DocSheet>

            <ApproverPicker
                isOpen={!!pickerRole}
                roleLabel={APPROVAL_ROLES.find(r => r.key === pickerRole)?.label ?? '승인자'}
                members={pickable}
                onSelect={handleSelect}
                onClose={() => setPickerRole('')}
            />
        </>
    );
};

export default ApprovalWrite;
