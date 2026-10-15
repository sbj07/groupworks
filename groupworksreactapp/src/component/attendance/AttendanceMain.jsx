import React, { useState } from 'react';
import styled from 'styled-components';
import AttendanceAdd from './AttendanceAdd';
import UserInfoMain from './UserInfoMain';
import Card from '../common/Card';

const StyledAttend = styled.div`
    display: grid;
    gap: 20px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    padding: 4px;
    margin-bottom: 14px;
    border-radius: 10px;
    background: var(--gw-surface-2);

    & > button {
        padding: 8px 0;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: var(--gw-text-muted);
        font-weight: 600;
        font-size: 13px;
    }

    & > button.active {
        background: var(--gw-surface);
        color: var(--gw-primary);
        box-shadow: var(--gw-shadow-sm);
    }
`;

const Empty = styled.p`
    margin: 0;
    color: var(--gw-text-muted);
    font-size: 13px;
    text-align: center;
`;

const AttendanceMain = () => {
    const [workEvent, setWorkEvent] = useState('');

    return (
        <StyledAttend>
            <UserInfoMain />
            <Card title="일정 등록">
                <Tabs>
                    <button type="button" className={`gw-reset ${workEvent === 'outwork' ? 'active' : ''}`} onClick={() => setWorkEvent('outwork')}>출장 / 외근</button>
                    <button type="button" className={`gw-reset ${workEvent === 'vacation' ? 'active' : ''}`} onClick={() => setWorkEvent('vacation')}>휴가</button>
                </Tabs>
                {workEvent === '' && <Empty>등록할 일정 종류를 선택하세요.</Empty>}
                {workEvent === 'outwork' && <AttendanceAdd type={"outwork"} />}
                {workEvent === 'vacation' && <AttendanceAdd type={"vacation"} />}
            </Card>
        </StyledAttend>
    );
};

export default AttendanceMain;
