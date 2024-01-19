import React from 'react';
import TodoList from './todo/TodoList';
import NoticeList from './notice/NoticeList';
import Calendar from './calendar/Calendar';
import AttandanceMain from './attandance/AttandanceMain';

const Home = () => {
    return (
        <>
            <Calendar />
            <AttandanceMain />
            <NoticeList showTopFive={true} showWriteButton={false} />
            <TodoList />
        </>
    );
};

export default Home;