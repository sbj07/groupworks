import React, { useMemo, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FiSearch, FiX, FiUserPlus } from 'react-icons/fi';

/* ---------- 결재 문서 공통 레이아웃 ---------- */

// 문서 한 장
export const DocSheet = styled.form`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 36px 40px 32px;
    border: 1px solid var(--gw-border);
    border-radius: var(--gw-radius);
    background: var(--gw-surface);
    box-shadow: var(--gw-shadow);

    @media (max-width: 720px) {
        padding: 24px 18px;
    }
`;

// 문서 제목 + 결재란
export const DocHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 2px solid var(--gw-text);

    h1 {
        margin: 6px 0 4px;
        font-size: 28px;
        letter-spacing: 0.3em;
    }

    .doc-meta {
        color: var(--gw-text-muted);
        font-size: 13px;
    }
`;

// 항목 표 (라벨 | 값)
export const DocTable = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr 120px 1fr;
    border-top: 1px solid var(--gw-border);
    border-left: 1px solid var(--gw-border);

    & > .label,
    & > .value {
        display: flex;
        align-items: center;
        min-height: 52px;
        padding: 10px 14px;
        border-right: 1px solid var(--gw-border);
        border-bottom: 1px solid var(--gw-border);
    }

    & > .label {
        justify-content: center;
        background: var(--gw-surface-2);
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 700;
        text-align: center;
    }

    & > .value {
        gap: 8px;
        flex-wrap: wrap;
        color: var(--gw-text);
    }

    & > .full {
        grid-column: span 3;
    }

    & .doc-days {
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--gw-primary-soft);
        color: var(--gw-primary);
        font-size: 12px;
        font-weight: 700;
    }

    & > .tall {
        align-items: stretch;
    }

    & input[type='date'],
    & input[type='text'],
    & textarea {
        padding: 8px 10px;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface);
        color: var(--gw-text);
        font-size: 14px;
    }

    & textarea {
        width: 100%;
        min-height: 220px;
        resize: vertical;
        line-height: 1.6;
    }

    & input:focus,
    & textarea:focus {
        outline: none;
        border-color: var(--gw-primary);
        box-shadow: 0 0 0 3px rgba(36, 89, 224, 0.15);
    }

    @media (max-width: 720px) {
        grid-template-columns: 96px 1fr;

        & > .full {
            grid-column: span 1;
        }
    }
`;

// 휴가 구분 같은 선택지 버튼
export const ChoiceGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    & > label {
        margin: 0;
        cursor: pointer;
    }

    & > label > input {
        display: none;
    }

    & > label > span {
        display: inline-block;
        padding: 7px 16px;
        border: 1px solid var(--gw-border);
        border-radius: 999px;
        background: var(--gw-surface);
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
        transition: all 0.15s;
    }

    & > label > input:checked + span {
        border-color: var(--gw-primary);
        background: var(--gw-primary-soft);
        color: var(--gw-primary);
    }
`;

// 신청 문구 + 날짜 + 신청자 서명
export const DocFooter = styled.div`
    margin-top: 32px;
    text-align: center;

    p {
        margin: 0 0 8px;
        font-size: 15px;
    }

    .date {
        color: var(--gw-text-muted);
        margin-bottom: 20px;
    }

    .sign {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        font-weight: 600;
    }

    .sign input {
        width: 140px;
        padding: 6px 4px;
        border: none;
        border-bottom: 1px solid var(--gw-text);
        background: transparent;
        font-size: 16px;
        text-align: center;
    }

    .sign input:focus {
        outline: none;
        border-bottom-color: var(--gw-primary);
    }
`;

export const DocActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 28px;

    & .btn {
        min-width: 110px;
    }
`;

/* ---------- 결재란 ---------- */

const StyledApprovalLine = styled.div`
    display: flex;
    border: 1px solid var(--gw-border);
    border-radius: var(--gw-radius-sm);
    overflow: hidden;

    & > .title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        background: var(--gw-surface-2);
        color: var(--gw-text-muted);
        font-size: 12px;
        font-weight: 700;
        writing-mode: vertical-rl;
        letter-spacing: 0.4em;
        border-right: 1px solid var(--gw-border);
    }

    & > .slot {
        display: flex;
        flex-direction: column;
        width: 96px;
        border-right: 1px solid var(--gw-border);
    }

    & > .slot:last-child {
        border-right: none;
    }

    & .role {
        padding: 6px 4px;
        border-bottom: 1px solid var(--gw-border);
        background: var(--gw-surface-2);
        color: var(--gw-text-muted);
        font-size: 12px;
        font-weight: 600;
        text-align: center;
    }

    & .stamp {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        height: 72px;
        padding: 4px;
        border: none;
        background: var(--gw-surface);
        font-size: 14px;
        font-weight: 700;
        color: var(--gw-text);
    }

    & button.stamp {
        cursor: pointer;
    }

    & button.stamp:hover {
        background: var(--gw-primary-soft);
    }

    & .stamp small {
        color: var(--gw-text-muted);
        font-size: 11px;
        font-weight: 500;
    }

    & .stamp.empty {
        color: var(--gw-primary);
        font-size: 12px;
        font-weight: 600;
    }

    & .stamp .st {
        margin-top: 2px;
        padding: 1px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
    }

    & .stamp .st-1 {
        background: var(--gw-surface-2);
        color: var(--gw-text-muted);
    }

    & .stamp .st-2 {
        background: #e3f6ee;
        color: var(--gw-success);
    }

    & .stamp .st-3 {
        background: #fdecec;
        color: var(--gw-danger);
    }
`;

// 승인자 칸 상태 (1 대기, 2 승인, 3 반려)
export const APPROVER_STATUS = { '1': '대기', '2': '승인', '3': '반려' };

export const APPROVAL_ROLES = [
    { key: 'firstApply', label: '최초승인' },
    { key: 'midApply', label: '중간승인' },
    { key: 'lastApply', label: '최종승인' },
];

/**
 * 결재란
 * - approvers: { firstApply: {name, no, sub, status}, midApply: ..., lastApply: ... }
 * - onPick(roleKey): 넘기면 칸을 눌러 승인자를 고를 수 있다 (작성 화면)
 */
export const ApprovalLine = ({ approvers, onPick }) => (
    <StyledApprovalLine>
        <div className="title">결재</div>
        {APPROVAL_ROLES.map(({ key, label }) => {
            const person = approvers?.[key] ?? {};
            const content = person.name
                ? <><b>{person.name}</b>{person.sub && <small>{person.sub}</small>}{person.status && <span className={`st st-${person.status}`}>{APPROVER_STATUS[person.status]}</span>}</>
                : (onPick ? <><FiUserPlus />지정</> : <small>-</small>);
            return (
                <div className="slot" key={key}>
                    <div className="role">{label}</div>
                    {onPick
                        ? <button type="button" className={`stamp ${person.name ? '' : 'empty'}`} onClick={() => onPick(key)}>{content}</button>
                        : <div className="stamp">{content}</div>}
                </div>
            );
        })}
    </StyledApprovalLine>
);

/* ---------- 승인자 선택창 ---------- */

const PickerBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header h2 {
        margin: 0;
        font-size: 17px;
    }

    header button {
        border: none;
        background: none;
        color: var(--gw-text-muted);
        font-size: 18px;
    }

    .search {
        position: relative;
    }

    .search svg {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        color: var(--gw-text-muted);
    }

    .search input {
        width: 100%;
        height: 40px;
        padding: 0 12px 0 36px;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
        font-size: 14px;
    }

    ul {
        max-height: 320px;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        list-style: none;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 14px;
        border-bottom: 1px solid var(--gw-border);
        cursor: pointer;
    }

    li:last-child {
        border-bottom: none;
    }

    li:hover {
        background: var(--gw-row-hover);
    }

    li small {
        color: var(--gw-text-muted);
    }

    .empty {
        padding: 24px;
        color: var(--gw-text-muted);
        text-align: center;
    }
`;

export const ApproverPicker = ({ isOpen, roleLabel, members, onSelect, onClose }) => {
    const [keyword, setKeyword] = useState('');

    const filtered = useMemo(() => {
        const k = keyword.trim();
        if (!k) return members;
        return members.filter(m => [m.name, m.departName, m.positionName].some(v => (v ?? '').includes(k)));
    }, [members, keyword]);

    const handleClose = () => {
        setKeyword('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="승인자 선택"
            style={{
                overlay: { backgroundColor: 'rgba(15, 23, 42, 0.45)', zIndex: 100 },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    width: 'min(440px, calc(100vw - 32px))',
                    padding: '22px',
                },
            }}
        >
            <PickerBody>
                <header>
                    <h2>{roleLabel} 선택</h2>
                    <button type="button" className="gw-reset" onClick={handleClose} aria-label="닫기"><FiX /></button>
                </header>
                <div className="search">
                    <FiSearch />
                    <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="이름, 부서, 직책으로 검색" autoFocus />
                </div>
                <ul>
                    {filtered.length === 0 && <div className="empty">선택할 수 있는 승인자가 없습니다.</div>}
                    {filtered.map(member => (
                        <li key={member.no} onClick={(event) => { setKeyword(''); onSelect(member, event); }}>
                            <b>{member.name}</b>
                            <small>{[member.departName, member.positionName].filter(Boolean).join(' · ') || member.authorityName}</small>
                        </li>
                    ))}
                </ul>
            </PickerBody>
        </Modal>
    );
};

export const today = () =>
    new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
