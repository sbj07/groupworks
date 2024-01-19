import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTodoWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    & > form {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const TodoWrite = ({closeModal, loadTodoVoList}) => {
    // const str = sessionStorage.getItem("memberNo");
    // const vo = JSON.parse(str);
    const memberNo = '31';
    const [inputTodoVo, setInputTodoVo] = useState({
        "writerNo" : memberNo,
    }) 
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8888/app/api/todo/write", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                ...inputTodoVo,
                memberNo: '31',
            }),
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === "good"){
                alert("todo 작성 완료");
                closeModal();
                loadTodoVoList();
            }else{
                alert("todo 작성 실패");
            }
        } )
        ;
    }

    const handleChangeInput = (event) => {
        const {name, value} = event.target;

        setInputTodoVo({
            ...inputTodoVo,
            [name] : value,
        });
    }
    
    return (
        <StyledTodoWriteDiv>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>내용</td>
                            <td><input type="text" name="content" onChange={handleChangeInput}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="submit" value="등록" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </StyledTodoWriteDiv>
    );
};

export default TodoWrite;