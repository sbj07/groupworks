import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import Sidebar from './sidebar/Sidebar';
import Topbar from './Topbar';
import useLoginMember from '../hooks/useLoginMember';
import { auth } from '../api/http';
import useApprovalSummary from '../hooks/useApprovalSummary';

// 사이드바는 화면 높이에 고정되고, 오른쪽 본문만 스크롤된다.
const StyledLayout = styled.div`
    min-height: 100vh;
`;

const Content = styled.div`
    margin-left: var(--gw-sidebar-width);
    min-width: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Layout = () => {
    const loggedIn = auth.isLoggedIn();
    const navigate = useNavigate();
    const member = useLoginMember();
    const summary = useApprovalSummary();

    useEffect(() => {
        if (!loggedIn) {
            auth.logout();
            navigate('/login');
        }
    }, [loggedIn, navigate]);

    if (!loggedIn) return null;

    return (
        <StyledLayout>
            <Sidebar member={member} pendingCount={summary.pendingForMe} />
            <Content>
                <Topbar member={member} />
                <Main summary={summary} />
            </Content>
        </StyledLayout>
    );
};

export default Layout;
