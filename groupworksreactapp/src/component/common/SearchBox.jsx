import React from 'react';
import styled from 'styled-components';
import { FiSearch, FiRotateCcw } from 'react-icons/fi';

const StyledSearchBox = styled.form`
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 12px 14px;
    padding: 16px 18px;
    margin-bottom: 18px;
    border: 1px solid var(--gw-border);
    border-radius: var(--gw-radius);
    background: var(--gw-surface-2);

    & > .fields {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 12px 14px;
        min-width: 0;
    }

    & > .actions {
        display: flex;
        gap: 6px;
    }

    & > .actions .btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin: 0;
    }

    & > .extra {
        margin-left: auto;
    }
`;

const StyledField = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    grid-column: span ${({ $span = 1 }) => $span};

    & > span {
        font-size: 12px;
        font-weight: 600;
        color: var(--gw-text-muted);
    }

    & .range {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    & .range > input {
        min-width: 0;
    }

    & .combo {
        display: flex;
        gap: 6px;
    }

    & .combo > select {
        flex: 0 0 116px;
    }

    & input,
    & select {
        width: 100%;
        height: 38px;
        padding: 0 10px;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface);
        color: var(--gw-text);
        font-size: 14px;
    }

    & input:focus,
    & select:focus {
        outline: none;
        border-color: var(--gw-primary);
        box-shadow: 0 0 0 3px rgba(36, 89, 224, 0.15);
    }
`;

// 조회조건 한 칸. span 으로 몇 칸을 차지할지 정한다.
export const SearchField = ({ label, span, children }) => (
    <StyledField $span={span}>
        <span>{label}</span>
        {children}
    </StyledField>
);

/**
 * 화면 공통 조회조건 박스
 * - onSearch: 조회 버튼 / Enter
 * - onReset: 초기화 버튼
 * - extra: 오른쪽 끝에 둘 버튼 (예: 작성하기)
 */
const SearchBox = ({ onSearch, onReset, extra, children }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.();
    };

    return (
        <StyledSearchBox onSubmit={handleSubmit}>
            <div className="fields">{children}</div>
            <div className="actions">
                <button type="submit" className="btn btn-primary"><FiSearch />조회</button>
                {onReset && (
                    <button type="button" className="btn btn-outline-secondary" onClick={onReset}><FiRotateCcw />초기화</button>
                )}
            </div>
            {extra && <div className="extra">{extra}</div>}
        </StyledSearchBox>
    );
};

export default SearchBox;
