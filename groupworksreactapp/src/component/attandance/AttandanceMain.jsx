import React from 'react';
import styled from 'styled-components';
import AttandanceTypeSelect from './AttandanceTypeSelect';

const StyeldAttandDiv = styled.div`
    border: 2px solid black;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr; // 두 개의 열로 구성
    gap: 10px; // 그리드 간격
`;
const StyledUserInfoDiv = styled.div`
    display: grid;
    grid-template-rows: 3fr 1fr; // 첫 번째 열을 3:1 비율로 2개의 행으로 구성
    gap: 10px; // 내부 그리드 간격
    background-color: blue;

    & > :first-child {
        background-color: black;
    }

`;

const StyledAttandInputDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 6fr;
`;
const AttandanceMain = () => {
    return (
        <StyeldAttandDiv>
            <StyledUserInfoDiv>
                <div>
                    a
                </div>
                <div>
                    b
                </div>
            </StyledUserInfoDiv>
            <StyledAttandInputDiv>
                <div>
                    <h3>일정등록</h3>
                </div>
                <AttandanceTypeSelect />
                <div>d</div>
            </StyledAttandInputDiv>
        </StyeldAttandDiv>
    );
};

export default AttandanceMain;