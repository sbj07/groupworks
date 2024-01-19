import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import TodoWrite from './TodoWrite';

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
        border: 1px solid #282c34;
        text-align: center;
        border-collapse: collapse;
    th{
        background-color: #282c34;
        color: white;
    }
    th, td {
        vertical-align: middle;
        padding: 8px;
    }
    button {
        background-color: red;
        border: none;
        border-radius: 10px;
        color: white;
        font-weight: bold;
    }
    }
    & > button {
        width: 30%;
        font-size: 2rem;
        background-color: green;
        color: white;
        border-radius: 10px;
    }
`;

const TodoList = () => {

    console.log("todoList 컴포넌트 랜더링");

    const navigate = useNavigate();
    const [memberNo, setMemberNo] = useState('31');
    const [todoVoList, setTodoVoList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const loadTodoVoList = () => {
        fetch(`http://127.0.0.1:8888/app/api/todo/list?memberNo=${memberNo}`)
        .then( resp => resp.json() )
        .then(data => {
            if(data.msg === "good"){
                setTodoVoList(data.todoList);
            }else {
                console.log("목록 가져오기 실패");
            }
        })
        ;
    }

    useEffect( () => {
        loadTodoVoList();
    }, [memberNo] );

    const handleDelete = (todoNo) => {
        fetch(`http://127.0.0.1:8888/app/api/todo/delete`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({no: todoNo, memberNo: '31'}),
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === 'good'){
                alert('todo 삭제 완료');
                loadTodoVoList();
            }else{
                alert('todo 삭제 실패');
            }
        } );
    };

    return (
        <StyledTodoDiv>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>Todo</th>
                        <th>작성일자</th>
                        <th>삭제</th>
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
                            <td><button onClick={() => handleDelete(vo.no)}>삭제</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>

            <button onClick={openModal}>Todo 추가</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Todo Write Modal"
                style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.75)' // semi-transparent black
                    },
                    content: {
                      color: 'lightsteelblue',
                      width: '40%', 
                      height: '40%', 
                      margin: 'auto' 
                    }
                  }}
            >
                <TodoWrite closeModal={closeModal} loadTodoVoList={loadTodoVoList} />
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </StyledTodoDiv>   
    );
};

export default TodoList;