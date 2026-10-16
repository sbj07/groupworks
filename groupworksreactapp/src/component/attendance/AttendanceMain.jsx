import React from 'react';
import styled from 'styled-components';
import UserInfoMain from './UserInfoMain';
import ApprovalSummaryCard from '../approval/ApprovalSummaryCard';

const StyledAttend = styled.div`
    display: grid;
    gap: 20px;
`;

// 홈 왼쪽: 내 정보 + 결재 현황 (일정 등록은 캘린더의 버튼으로 옮김)
const AttendanceMain = ({ summary }) => {
    return (
        <StyledAttend>
            <UserInfoMain />
            {summary && <ApprovalSummaryCard summary={summary} />}
        </StyledAttend>
    );
};

export default AttendanceMain;
