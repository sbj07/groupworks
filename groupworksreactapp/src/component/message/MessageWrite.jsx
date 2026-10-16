import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AppModal from '../common/AppModal';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

const CONTENT_MAX = 1000;

const Form = styled.div`
    display: grid;
    gap: 14px;

    label {
        display: block;
        margin-bottom: 6px;
        font-size: 13px;
        font-weight: 600;
    }

    textarea {
        min-height: 180px;
        resize: vertical;
    }

    .counter {
        margin-top: 4px;
        color: var(--gw-text-muted);
        font-size: 12px;
        text-align: right;
    }

    .counter.over {
        color: var(--gw-danger);
    }
`;

/**
 * 쪽지 쓰기 / 답장 모달
 * - to: 답장할 상대 { no, name } (없으면 받는 사람을 고른다)
 */
const MessageWrite = ({ isOpen, to, onClose, onSent }) => {
    const loginMemberNo = sessionStorage.getItem('loginMemberNo');
    const [members, setMembers] = useState([]);
    const [recieveNo, setRecieveNo] = useState('');
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setRecieveNo(to?.no ?? '');
        setContent('');
    }, [isOpen, to]);

    useEffect(() => {
        if (!isOpen || members.length > 0) return;
        api.get(`/api/member/list/${loginMemberNo}`).then(data => {
            if (data.ok) setMembers((data.list ?? []).filter(m => m.no !== loginMemberNo));
        });
    }, [isOpen, loginMemberNo, members.length]);

    // 부서별로 묶어서 고르기 쉽게
    const groups = useMemo(() => members.reduce((acc, m) => {
        const key = m.departName || '부서 없음';
        (acc[key] = acc[key] || []).push(m);
        return acc;
    }, {}), [members]);

    const trimmed = content.trim();
    const over = content.length > CONTENT_MAX;

    const handleSend = async () => {
        if (!recieveNo) return notify('받는 사람을 선택해주세요.', 'error');
        if (!trimmed) return notify('내용을 입력해주세요.', 'error');
        if (over) return notify(`내용은 ${CONTENT_MAX}자 이하로 입력해주세요.`, 'error');
        setSending(true);
        const result = await api.post('/api/message', { recieveNo, content: trimmed });
        setSending(false);
        if (result.ok) {
            notify(result.message || '쪽지를 보냈습니다.', 'success');
            onSent?.();
        }
    };

    return (
        <AppModal
            isOpen={isOpen}
            onClose={onClose}
            title={to ? `${to.name}님에게 답장` : '쪽지 쓰기'}
            subtitle="같은 회사 구성원에게 보낼 수 있습니다."
            width={560}
            footer={<>
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>취소</button>
                <button type="button" className="btn btn-primary" disabled={sending} onClick={handleSend}>{sending ? '보내는 중...' : '보내기'}</button>
            </>}
        >
            <Form>
                <div>
                    <label htmlFor="message-to">받는 사람</label>
                    <select id="message-to" className="form-select" value={recieveNo} disabled={!!to} onChange={e => setRecieveNo(e.target.value)}>
                        {to ? <option value={to.no}>{to.name}</option> : <option value="">선택하세요</option>}
                        {!to && Object.entries(groups).map(([depart, list]) => (
                            <optgroup key={depart} label={depart}>
                                {list.map(m => <option key={m.no} value={m.no}>{m.name}{m.positionName ? ` (${m.positionName})` : ''}</option>)}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="message-content">내용</label>
                    <textarea id="message-content" className="form-control" value={content} onChange={e => setContent(e.target.value)} placeholder="보낼 내용을 입력하세요" />
                    <div className={`counter ${over ? 'over' : ''}`}>{content.length} / {CONTENT_MAX}</div>
                </div>
            </Form>
        </AppModal>
    );
};

export default MessageWrite;
