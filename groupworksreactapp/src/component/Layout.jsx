import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import Sidebar from './sidebar/Sidebar';
import Topbar from './Topbar';
import useLoginMember from '../hooks/useLoginMember';

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
    const loginMemberNo = sessionStorage.getItem('loginMemberNo');
    const navigate = useNavigate();
    const member = useLoginMember();

    useEffect(() => {
        if (loginMemberNo === null) {
            navigate('/login');
        }
    }, [loginMemberNo, navigate]);

    if (loginMemberNo === null) return null;

    return (
        <StyledLayout>
            <Sidebar member={member} />
            <Content>
                <Topbar member={member} />
                <Main />
            </Content>
        </StyledLayout>
    );
};

export default Layout;
