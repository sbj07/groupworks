import React from 'react';
import styled from 'styled-components';
import UserInfoMain from './UserInfoMain';
import ApprovalSummaryCard from '../approval/ApprovalSummaryCard';

// 왼쪽 열은 오른쪽 열(캘린더 + 공지/할 일) 높이에 맞춰 늘어나고, 결재 현황 카드가 남은 높이를 채운다
const StyledAttend = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;

    & > .gw-fill {
        flex: 1;
    }
`;

// 홈 왼쪽: 내 정보 + 결재 현황 (일정 등록은 캘린더의 버튼으로 옮김)
const AttendanceMain = ({ summary }) => {
    return (
        <StyledAttend>
            <UserInfoMain />
            {summary && <ApprovalSummaryCard summary={summary} className="gw-fill" />}
        </StyledAttend>
    );
};

export default AttendanceMain;
