import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import AttendanceAdd from './AttendanceAdd';

const StyeldAttendDiv = styled.div`
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
    background-color: aqua;

    & > :first-child {
        background-color: green;
    }

`;

const StyledAttendInputDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 6fr;
`;

const StyledSelectType = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const AttendanceMain = () => {
    const [workEvent , setWorkEvent] = useState('');

    
    return (
        <StyeldAttendDiv>
            <StyledUserInfoDiv>
                <div>
                    로그인 유저정보
                </div>
                <div>
                    남은 연차일
                    사용 연차일
                </div>
            </StyledUserInfoDiv>
            <StyledAttendInputDiv>
                <div>
                    <h3>일정등록</h3>
                </div>
                <StyledSelectType>
                    <div>
                        <Button variant='primary' onClick={() => setWorkEvent('outwork')}>출장/외근</Button>
                    </div>
                    <div>
                        <Button variant='primary'onClick={() => setWorkEvent('vacation')}>휴가</Button>
                    </div>
                </StyledSelectType>
                <div>

                {
                    workEvent === 'outwork' && <AttendanceAdd type={"outwork"} />
                }
                {
                    workEvent === 'vacation' && <AttendanceAdd type={"vacation"} />
                }                
                </div>
            </StyledAttendInputDiv>
        </StyeldAttendDiv>
    );
};

export default AttendanceMain;