import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from './TodoList';
import TodoWrite from './TodoWrite';
import TodoDelete from './TodoDelete';
import styled from 'styled-components';

const StyledTodoMainDiv = styled.div`
    
`;

const TodoMain = () => {
    return (
        <Routes>
            <Route path='list' element={<TodoList />}/>
            <Route path='write' element={<TodoWrite />}/>
            <Route path='delete' element={<TodoDelete />}/>
        </Routes>    
    );
};

export default TodoMain;
