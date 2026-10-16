import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OrganList from './OrganList';

// 조직도는 조회만 한다. 구성원 추가/수정/삭제는 인사관리 > 인원관리에서.
const OrganMain = () => {
    return (
        <Routes>
            <Route path='list' element={<OrganList/>}/>
            <Route path='*' element={<Navigate to='/organ/list' replace/>}/>
        </Routes>
    );
};

export default OrganMain;
