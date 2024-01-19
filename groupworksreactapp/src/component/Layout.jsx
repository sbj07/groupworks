import React, { useEffect } from 'react';
import styled from 'styled-components';
import Main from './Main';
import Sidebar from './sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Login from './authentication/login/Login';
import Home from './Home';

const StyledLayoutDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: grid;
    grid-template-columns: 1.5fr 8.5fr;
    grid-template-rows: 1fr;
    place-items: center center;
`;

const Layout = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();
    useEffect(() => {
        if (loginMemberNo === null) {
            navigate("/login");
        }
    }, [loginMemberNo, navigate]);

    return (
        loginMemberNo !== null && 
        <StyledLayoutDiv>
            <Sidebar />
            <Main />
        </StyledLayoutDiv>
    );
};

export default Layout;  