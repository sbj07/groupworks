import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiFileText, FiClock, FiCheckCircle, FiXCircle, FiInbox } from 'react-icons/fi';
import Card from '../common/Card';

const Tiles = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const Tile = styled(Link)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid var(--gw-border);
    border-radius: 12px;
    background: var(--gw-surface);
    transition: border-color 0.15s, box-shadow 0.15s;

    &:hover {
        border-color: var(--gw-primary);
        box-shadow: var(--gw-shadow-sm);
    }

    & > svg {
        flex-shrink: 0;
        width: 38px;
        height: 38px;
        padding: 9px;
        border-radius: 10px;
        background: ${({ $bg }) => $bg};
        color: ${({ $color }) => $color};
    }

    small {
        display: block;
        color: var(--gw-text-muted);
        font-size: 12px;
        font-weight: 600;
    }

    b {
        font-size: 22px;
        color: var(--gw-text);
    }

    b > span {
        margin-left: 2px;
        font-size: 13px;
        font-weight: 600;
        color: var(--gw-text-muted);
    }
`;

// 홈 대시보드: 내가 올린 결재 건수와 승인 대기 건수
const ApprovalSummaryCard = ({ summary }) => {
    const items = [
        { label: '올린 결재', value: summary.myTotal, to: '/approval/my', icon: <FiFileText />, bg: 'var(--gw-primary-soft)', color: 'var(--gw-primary)' },
        { label: '진행중', value: summary.myInProgress, to: '/approval/my', icon: <FiClock />, bg: '#fff4dd', color: '#b7791f' },
        { label: '승인', value: summary.myApproved, to: '/approval/my', icon: <FiCheckCircle />, bg: '#e3f6ee', color: 'var(--gw-success)' },
        { label: '반려', value: summary.myRejected, to: '/approval/my', icon: <FiXCircle />, bg: '#fdecec', color: 'var(--gw-danger)' },
        { label: '내 승인 대기', value: summary.pendingForMe, to: '/approval/pending', icon: <FiInbox />, bg: '#efe9ff', color: '#6941c6' },
    ];

    return (
        <Card title="결재 현황" action={<Link to="/approval/my" style={{ fontSize: 12, fontWeight: 600, color: 'var(--gw-text-muted)' }}>결재내역 ›</Link>}>
            <Tiles>
                {items.map(item => (
                    <Tile key={item.label} to={item.to} $bg={item.bg} $color={item.color}>
                        {item.icon}
                        <div>
                            <small>{item.label}</small>
                            <b>{item.value ?? 0}<span>건</span></b>
                        </div>
                    </Tile>
                ))}
            </Tiles>
        </Card>
    );
};

export default ApprovalSummaryCard;
