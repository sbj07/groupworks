import React, { useState } from 'react';
import styled from 'styled-components';
import PayFormList from './PayFormList';
import VacationFormList from './VacationFormList';
import BusinessFormList from './BusinessFormList';


const StyledDocumentListDiv = styled.div`
    width: 80%;
    height: 80%;
`;

const DocumentList = () => {

    const [formType, setFormType] = useState('');

    const handleClick = (type) => {
        setFormType(type);
    };

    return (
       <StyledDocumentListDiv>
            <button onClick={() => handleClick('payForm')}>지출결의서 조회/등록</button>
            <button onClick={ () => handleClick('vacationForm')}>휴가신청서 조회/등록</button>
            <button onClick={() => handleClick('businessForm')}>출장신청서 조회/등록</button>
            {formType === 'payForm' && <PayFormList />}
            {formType === 'vacationForm' && <VacationFormList />}
            {formType === 'businessForm' && <BusinessFormList />}
       </StyledDocumentListDiv>
    );  
};

export default DocumentList;