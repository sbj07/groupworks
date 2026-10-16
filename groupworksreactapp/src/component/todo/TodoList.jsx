import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';
import TodoWrite from './TodoWrite';
import EmptyState from '../common/EmptyState';
import { API_BASE } from '../../api/config';

const MAX_TODO = 5;

const StyledTodo = styled.div`
    width: 100%;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 4px;
        border-bottom: 1px solid var(--gw-border);
    }

    li:last-child {
        border-bottom: none;
    }

    li::before {
        content: '';
        flex-shrink: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--gw-primary);
    }

    li > span {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    li > small {
        flex-shrink: 0;
        color: var(--gw-text-muted);
    }

    li > button {
        flex-shrink: 0;
        border: none;
        background: none;
        color: var(--gw-text-muted);
        line-height: 1;
    }

    li > button:hover {
        color: var(--gw-danger);
    }

    .count {
        margin-top: 10px;
        color: var(--gw-text-muted);
        font-size: 12px;
        text-align: right;
    }
`;

const TodoList = () => {
    const memberNo = sessionStorage.getItem('loginMemberNo');
    const [todoVoList, setTodoVoList] = useState([]);

    const loadTodoVoList = () => {
        fetch(`${API_BASE}/api/todo/list?memberNo=${memberNo}`)
        .then( resp => resp.json() )
        .then(data => {
            if(data.msg === "good"){
                setTodoVoList(data.todoList ?? []);
            }else {
                console.log("목록 가져오기 실패");
            }
        });
    };

    useEffect( () => {
        loadTodoVoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memberNo] );

    const handleDelete = (todoNo) => {
        fetch(`${API_BASE}/api/todo/delete`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({no: todoNo, memberNo: memberNo}),
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === 'good'){
                loadTodoVoList();
            }else{
                alert('할 일 삭제에 실패했습니다.');
            }
        } );
    };

    return (
        <StyledTodo>
            <TodoWrite loadTodoVoList={loadTodoVoList} disabled={todoVoList.length >= MAX_TODO} />
            {todoVoList.length === 0
                ? <EmptyState $compact>등록된 할 일이 없습니다.</EmptyState>
                : <ul>
                    {todoVoList.map(vo => (
                        <li key={vo.no}>
                            <span title={vo.content}>{vo.content}</span>
                            <small>{vo.writeDate}</small>
                            <button type="button" className="gw-reset" onClick={() => handleDelete(vo.no)} aria-label="삭제"><FiTrash2 /></button>
                        </li>
                    ))}
                  </ul>}
            <div className="count">{todoVoList.length} / {MAX_TODO}</div>
        </StyledTodo>
    );
};

export default TodoList;
