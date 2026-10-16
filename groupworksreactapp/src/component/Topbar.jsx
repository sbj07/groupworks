import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledTopbar = styled.header`
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--gw-topbar-height);
    padding: 0 28px;
    background: rgba(243, 245, 249, 0.92);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--gw-border);

    h1 {
        margin: 0;
        font-size: 18px;
    }

    small {
        color: var(--gw-text-muted);
        font-size: 12px;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        line-height: 1.25;
    }

    strong {
        font-size: 14px;
    }
`;

export const Avatar = styled.span`
    display: grid;
    place-items: center;
    width: ${({ $size = 36 }) => $size}px;
    height: ${({ $size = 36 }) => $size}px;
    border-radius: 50%;
    background: var(--gw-primary-soft);
    color: var(--gw-primary);
    font-weight: 700;
    font-size: ${({ $size = 36 }) => Math.round($size * 0.4)}px;
    flex-shrink: 0;
`;

const TITLES = [
    ['/notice', '공지사항'],
    ['/approval/write/vacation', '휴가신청서 작성'],
    ['/approval/write/business', '출장신청서 작성'],
    ['/approval/my', '결재내역'],
    ['/approval/pending', '승인대기'],
    ['/organ', '조직도'],
    ['/book', '회의실 예약'],
    ['/member/add', '구성원 추가'],
    ['/member/delete', '구성원 관리'],
    ['/member/edit', '개인정보 수정'],
];

const pageTitle = (pathname) => {
    const found = TITLES.find(([prefix]) => pathname.startsWith(prefix));
    return found ? found[1] : '홈';
};

const today = () =>
    new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

const Topbar = ({ member }) => {
    const { pathname } = useLocation();

    return (
        <StyledTopbar>
            <div>
                <h1>{pageTitle(pathname)}</h1>
                <small>{today()}</small>
            </div>
            {member && (
                <User>
                    <div>
                        <strong>{member.name}</strong>
                        <small>{[member.departName, member.positionName].filter(Boolean).join(' · ')}</small>
                    </div>
                    <Avatar>{member.name?.charAt(0)}</Avatar>
                </User>
            )}
        </StyledTopbar>
    );
};

export default Topbar;
