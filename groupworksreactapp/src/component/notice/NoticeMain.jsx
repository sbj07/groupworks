import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoticeDetail from './NoticeDetail';
import NoticeList from './NoticeList';
import NoticeEdit from './NoticeEdit';
import NoticeDelete from './NoticeDelete';
import NoticeWrite from './NoticeWrite';



const NoticeMain = () => {
    return (
        <Routes>
            <Route path='write' element={<NoticeWrite/>}/>
            <Route path='list' element={<NoticeList/>}/>
            <Route path='detail' element={<NoticeDetail/>}/>
            <Route path='edit' element={<NoticeEdit/>}/>
            <Route path='delete' element={<NoticeDelete/>}/>
        </Routes>
    );
};

export default NoticeMain;