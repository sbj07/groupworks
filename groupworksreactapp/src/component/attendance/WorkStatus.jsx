import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

// 근무 상태 번호별 색 (WORK_STATUS: 1 출근, 2 재택, 3 출장, 4 외근, 5 휴가, 6 반차, 7 퇴근)
export const WORK_STATUS_TONE = { 1: 'success', 2: 'primary', 3: 'primary', 4: 'primary', 5: 'warning', 6: 'warning', 7: 'gray' };

const Box = styled.div`
    margin-bottom: 16px;

    & > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 13px;
        font-weight: 600;
    }

    & > .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
    }

    & .grid > button {
        padding: 6px 0;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface);
        color: var(--gw-text);
        font-size: 12px;
        font-weight: 600;
        transition: background 0.15s, border-color 0.15s;
    }

    & .grid > button:hover:not(:disabled) {
        border-color: var(--gw-primary);
    }

    & .grid > button.active {
        border-color: var(--gw-primary);
        background: var(--gw-primary);
        color: #fff;
    }
`;

/**
 * 홈 프로필 카드의 근무 상태 전환 (출근 / 재택 / 출장 / 외근 / 휴가 / 반차 / 퇴근)
 * 바꾸면 'gw:member-changed' 이벤트를 보내 상단바 등도 새로 읽게 한다.
 */
const WorkStatus = ({ current, onChanged }) => {
    const [statuses, setStatuses] = useState([]);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        api.get('/api/member/work-stat').then(data => {
            if (data.ok) setStatuses(data.workStatusList ?? []);
        });
    }, []);

    const handleChange = async (status) => {
        if (status.no === current || busy) return;
        setBusy(true);
        const result = await api.put('/api/member/work-stat', { workStatusNo: status.no });
        setBusy(false);
        if (result.ok) {
            notify(`근무 상태를 '${status.name}'(으)로 바꿨습니다.`, 'success');
            onChanged?.();
            window.dispatchEvent(new Event('gw:member-changed'));
        }
    };

    if (statuses.length === 0) return null;

    return (
        <Box>
            <header>근무 상태</header>
            <div className="grid">
                {statuses.map(s => (
                    <button key={s.no} type="button" className={`gw-reset ${s.no === current ? 'active' : ''}`} disabled={busy} onClick={() => handleChange(s)}>
                        {s.name}
                    </button>
                ))}
            </div>
        </Box>
    );
};

export default WorkStatus;
