import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import NoticeMain from './notice/NoticeMain';
import OrganMain from './organ/OrganMain';


const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 6fr 4fr; 
    grid-template-rows: 1fr 1fr;
    place-items: center center;
`;

const Main = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    return (
        <StyledMainDiv>
                {
                    loginMemberNo !== null
                    ?
                    <Routes>
                        {/* <Route path='/sign-in' element={<Signin />}></Route> */}
                    </Routes>
                    :
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/notice/*' element={<NoticeMain />}></Route>
                        {/* <Route path='/document/*' element={<DocumentMain />}></Route> */}
                        <Route path='/organ/*' element={<OrganMain />}></Route>
                    </Routes>
                }
        </StyledMainDiv>
    );
};

export default Main;