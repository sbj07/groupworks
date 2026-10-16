import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TodoList from './todo/TodoList';
import NoticeList from './notice/NoticeList';
import AttendanceMain from './attendance/AttendanceMain';
import TestCalendar from './calendar/TestCalendar';
import Card from './common/Card';
import ScheduleModal from './attendance/ScheduleModal';
import { FiPlus } from 'react-icons/fi';

const StyledHome = styled.div`
    display: grid;
    grid-template-columns: 320px minmax(0, 1fr);
    gap: 20px;
    align-items: start;

    @media (max-width: 1200px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const RightColumn = styled.div`
    display: grid;
    gap: 20px;
    min-width: 0;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 20px;

    @media (max-width: 1500px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const More = styled(Link)`
    font-size: 12px;
    font-weight: 600;
    color: var(--gw-text-muted);

    &:hover {
        color: var(--gw-primary);
    }
`;

const Home = ({ summary }) => {
    const [scheduleOpen, setScheduleOpen] = useState(false);

    return (
        <StyledHome>
            <AttendanceMain summary={summary} />
            <RightColumn>
                <Card title="일정" action={
                    <button type="button" className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" onClick={() => setScheduleOpen(true)}>
                        <FiPlus />일정 등록
                    </button>
                }>
                    <TestCalendar />
                </Card>
                <Row>
                    <Card title="공지사항" action={<More to="/notice/list">더보기 ›</More>}>
                        <NoticeList showTopFive={true} showWriteButton={false} showPagination={false} showEditAndDelete={false} />
                    </Card>
                    <Card title="할 일">
                        <TodoList />
                    </Card>
                </Row>
            </RightColumn>
            <ScheduleModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />
        </StyledHome>
    );
};

export default Home;
