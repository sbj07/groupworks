import React from 'react';
import { Routes, Route } from 'react-router';
import DocumentList from './DocumentList';
import DocumentWrite from './DocumentWrite';
import styled from 'styled-components';

// const StyledDocumentDiv = styled.div`
//     width: 100%;
//     height: 100%;
// `;

const DocumentMain = () => {
    return (
            <Routes>
                <Route path='list' element={<DocumentList/>}/>
                <Route path='write' element={<DocumentWrite/>}/>
            </Routes>
    );
};

export default DocumentMain;