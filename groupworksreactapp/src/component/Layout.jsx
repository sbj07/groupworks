import React from 'react';
import styled from 'styled-components';
import Main from './Main';
import Sidebar from './sidebar/Sidebar';
import Login from './login/Login';

const StyledLayoutDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: grid;
    grid-template-columns: 1.5fr 8.5fr;
    grid-template-rows: 1fr;
    place-items: center center;
`;

const loginMemberNo = sessionStorage.getItem("loginMemberNo");
const Layout = () => {
    return (
        <>
        {
            loginMemberNo === null
            ?
            <Login />
            :
            <StyledLayoutDiv>
                <Sidebar />
                <Main />
                </StyledLayoutDiv>
        }
        </>
    );
};

export default Layout;  