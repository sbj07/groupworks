import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import TodoMain from './todo/TodoMain';
import TodoList from './todo/TodoList';

const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 6fr 4fr; 
    grid-template-rows: 1fr 1fr;
    place-items: center center;
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <TodoList/>
        </StyledMainDiv>
    );
};

export default Main;