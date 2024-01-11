import FullCalendar from '@fullcalendar/react';
import React from 'react';
import styled from 'styled-components';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';


const StyledCalendarDiv = styled.div`
`;

// const handleCalendarClick = (event) = {
//     console.log(evnet);
// };
const MyCalendar = () => {
    return (
        <StyledCalendarDiv>
            <FullCalendar
                locale={koLocale}
                defalutView="dayGridMonth"
                plugins={[dayGridPlugin]} 
                height={450} />

        </StyledCalendarDiv>
    );
};

export default MyCalendar;