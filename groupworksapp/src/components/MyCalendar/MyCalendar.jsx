import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import styled from 'styled-components';

const StyledCalendarDiv = styled.div`
    background-color: white;
    border-radius: 1%;
`;



const MyCalendar = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");

    const [bTripList, setBTripList] = useState([]);
    const [outsideWorkList, setOutsideWorkList] = useState([]);
    const [vacationList, setVacationList] = useState([]);
    
    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/attendance/business-trip?loginMemberNo=${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setBTripList(data.bTripList);
        });

        fetch(`http://127.0.0.1:8888/app/api/attendance/outside-work?loginMemberNo=${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setOutsideWorkList(data.outsideWorkList);
        });

        fetch(`http://127.0.0.1:8888/app/api/attendance/vacation?loginMemberNo=${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setVacationList(data.vacationList);
        });
    }, []);

    const events = () => {

        bTripList.map( (vo) => ({
            title: '출장',
            start: vo.startDate,
            end: vo.endDate
        }));

        outsideWorkList.map( (vo) => ({
            title: '외근',
            start: vo.startTime,
            end: vo.endTime
        }));

        vacationList.map( (vo) => ({
            title: '휴가',
            start: vo.startDate,
            end: vo.endDate
        }));
        
    }
    return (
        <StyledCalendarDiv>
            <FullCalendar
            locale={koLocale}
            defalutView="dayGridMonth"
            plugins={[dayGridPlugin]} 
            height="auto"
            contentHeight={10}
            events={events}
            />
        </StyledCalendarDiv>
    );
};

export default MyCalendar;