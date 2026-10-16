import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

const StyledTodoWrite = styled.form`
    display: flex;
    gap: 6px;
    margin-bottom: 12px;

    & > input {
        flex: 1;
        min-width: 0;
    }

    & > .btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
    }
`;

// 할 일 한 줄 입력
const TodoWrite = ({ loadTodoVoList, disabled }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) return;
        if (disabled) {
            notify('할 일은 최대 5개까지 등록할 수 있습니다. 기존 항목을 정리해주세요.', 'error');
            return;
        }
        const result = await api.post('/api/todo', { content: content.trim() });
        if (result.ok) {
            setContent('');
            loadTodoVoList();
        }
    };

    return (
        <StyledTodoWrite onSubmit={handleSubmit}>
            <input type="text" className="form-control" value={content} onChange={e => setContent(e.target.value)} placeholder="할 일을 입력하고 Enter" maxLength={100} />
            <button type="submit" className="btn btn-primary"><FiPlus />추가</button>
        </StyledTodoWrite>
    );
};

export default TodoWrite;
