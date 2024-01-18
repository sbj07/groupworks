import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledSideDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 10%;
    margin-left: 10%;
    border-radius: 10px;
    width: 100%;
    background-color: #282c34;
    height: 100%;
    & > div,StyledLogoutDiv {
        display: flex;
        flex-direction: column;
        font-size: 2rem;
        color: white;
    }
`;

const StyledMenuDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    color: white;
`;

const StyledLogoutDiv = styled.div`
    position: absolute;
    bottom: 15px;
    height: 10%;
    width: 10%;
    margin-left: -5%;
    background-color: #61dafb;
    font-size: large;
    text-align: center;
    color: white;
`;


const Sidebar = () => {
    return (
        <StyledSideDiv>
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/notice/list">공지사항</Link></div>
                    <div><Link to="/document/list">전자결재</Link></div>
                    <div><Link to="/organ/list">조직도</Link></div>
                    <div><Link to="/organ/list">예약</Link></div>
                    <div>
                        <StyledLogoutDiv>LOGOUT</StyledLogoutDiv>
                    </div>
        </StyledSideDiv>
    );
};

export default Sidebar;