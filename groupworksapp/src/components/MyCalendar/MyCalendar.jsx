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
        const eventList = [];
    
        bTripList.forEach((vo) => {
            eventList.push({
                title: '출장'+vo.no,
                start: vo.startDate,
                end: vo.endDate,
                color: 'orange'
            });
        });
    
        outsideWorkList.forEach((vo) => {
            eventList.push({
                title: '외근',
                start: vo.startTime,
                end: vo.endTime,
                color: 'green'
            });
        });
    
        vacationList.forEach((vo) => {
            eventList.push({
                title: '휴가',
                start: vo.startDate,
                end: vo.endDate
            });
        });
        return eventList;
    };
    
    const handleEventClick = (event) => {
        console.log(event);
    };
    
    return (
        <StyledCalendarDiv>
            <FullCalendar
            locale={koLocale}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]} 
            height="auto"
            contentHeight={5}
            events={events()}
            eventClick={handleEventClick}
            />
        </StyledCalendarDiv>
    );
};

export default MyCalendar;