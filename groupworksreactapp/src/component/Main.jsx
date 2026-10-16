import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import NoticeMain from './notice/NoticeMain';
import OrganMain from './organ/OrganMain';
import { Navigate } from 'react-router-dom';
import ApprovalMain from './approval/ApprovalMain';
import BookMain from './book/BookMain';
import MemberManage from './member/MemberManage';
import EditMember from './member/EditMember';
import Card from './common/Card';

const StyledMain = styled.main`
    flex: 1;
    padding: 24px 28px 40px;
`;

// 홈을 제외한 화면은 하나의 큰 카드 안에 그린다.
const Page = ({ children }) => <Card className="gw-page">{children}</Card>;

const Main = ({ summary }) => {
    return (
        <StyledMain>
            <Routes>
                <Route path='/' element={<Home summary={summary} />}></Route>
                <Route path='/notice/*' element={<Page><NoticeMain /></Page>}></Route>
                <Route path='/approval/*' element={<Page><ApprovalMain /></Page>}></Route>
                <Route path='/document/*' element={<Navigate to='/approval/my' replace />}></Route>
                <Route path='/organ/*' element={<Page><OrganMain /></Page>}></Route>
                <Route path='/book/*' element={<Page><BookMain /></Page>}></Route>
                <Route path='/hr/members' element={<Page><MemberManage /></Page>}></Route>
                <Route path='/member/add/*' element={<Navigate to='/hr/members' replace />}></Route>
                <Route path='/member/delete/*' element={<Navigate to='/hr/members' replace />}></Route>
                <Route path='/member/edit/*' element={<Page><EditMember /></Page>}></Route>
            </Routes>
        </StyledMain>
    );
};

export default Main;
