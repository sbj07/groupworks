import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiBriefcase, FiMapPin, FiSun } from 'react-icons/fi';
import AppModal from '../common/AppModal';
import EventForm from './EventForm';

const KINDS = [
    { key: 'business-trip', label: '출장', icon: <FiBriefcase /> },
    { key: 'outside-work', label: '외근', icon: <FiMapPin /> },
    { key: 'vacation', label: '휴가', icon: <FiSun /> },
];

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 18px;

    & > button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 12px 0;
        border: 1px solid var(--gw-border);
        border-radius: 12px;
        background: var(--gw-surface);
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
        transition: all 0.15s;
    }

    & > button > svg {
        font-size: 18px;
    }

    & > button:hover {
        border-color: var(--gw-primary);
    }

    & > button.active {
        border-color: var(--gw-primary);
        background: var(--gw-primary-soft);
        color: var(--gw-primary);
    }
`;

// 캘린더의 "일정 등록" 팝업: 출장 / 외근 / 휴가 중 골라서 등록
const ScheduleModal = ({ isOpen, onClose }) => {
    const [kind, setKind] = useState('business-trip');

    useEffect(() => {
        if (isOpen) setKind('business-trip');
    }, [isOpen]);

    return (
        <AppModal isOpen={isOpen} onClose={onClose} title="일정 등록" subtitle="등록할 일정 종류를 고르세요." width={440}>
            <Tabs>
                {KINDS.map(k => (
                    <button key={k.key} type="button" className={`gw-reset ${kind === k.key ? 'active' : ''}`} onClick={() => setKind(k.key)}>
                        {k.icon}{k.label}
                    </button>
                ))}
            </Tabs>
            {/* 종류를 바꾸면 입력값을 비우도록 key 로 새로 그린다 */}
            <EventForm key={kind} kind={kind} hideTitle />
        </AppModal>
    );
};

export default ScheduleModal;
