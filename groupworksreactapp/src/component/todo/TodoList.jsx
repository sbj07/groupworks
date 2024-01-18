import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTodoDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > table {
        width: 100%;
        height: 100%;
        border: 2px solid black;
        margin: auto;
    }
    & > button {
        width: 100%;
        font-size: 2rem;
    }
`;

const TodoList = () => {

    console.log("todoList 컴포넌트 랜더링");

    const navigate = useNavigate();

    const [todoVoList, setTodoVoList] = useState([]);

    const loadTodoVoList = () => {
        fetch("http:127.0.0.1:8888/app/api/todo/list")
        .then( resp => resp.json() )
        .then( (x) => { setTodoVoList(x); } ) 
        ;
    }

    useEffect( () => {
        console.log("effect 호출");
        loadTodoVoList();
    }, [] );

    return (
        <StyledTodoDiv>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>내용</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoVoList.length === 0
                        ?
                        <h1>로딩중...</h1>
                        :
                        todoVoList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>
                            <td>{vo.content}</td>
                            <td>{vo.writeDate}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>

            <button onClick = { () => {
                navigate("todo/write")
            } }>todo 등록</button>
        </StyledTodoDiv>   
    );
};

export default TodoList;