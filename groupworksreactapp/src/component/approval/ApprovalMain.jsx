import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ApprovalWrite from './ApprovalWrite';
import ApprovalList from './ApprovalList';

// 전자결재: 양식별 작성, 결재내역, 승인대기
const ApprovalMain = () => (
    <Routes>
        <Route path="write/:type" element={<ApprovalWrite />} />
        <Route path="my" element={<ApprovalList mode="mine" />} />
        <Route path="pending" element={<ApprovalList mode="pending" />} />
        <Route path="*" element={<Navigate to="my" replace />} />
    </Routes>
);

export default ApprovalMain;
