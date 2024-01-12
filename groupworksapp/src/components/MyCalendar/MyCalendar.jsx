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
    const [bTripList, setBTripList] = useState([]);

    useEffect( () => {
        fetch("http://127.0.0.1:8888/app/api/attendance/business-trip?loginMemberNo=5")
        .then( resp => resp.json() )
        .then( data => {
            setBTripList(data.bTripList);
        });
    }, []);

    const events = bTripList.map( (vo) => ({
        title: '출장',
        start: vo.startDate,
        end: vo.endDate
    }));

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