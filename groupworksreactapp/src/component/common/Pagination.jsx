import React from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const StyledPagination = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 16px;

    & > button {
        display: grid;
        place-items: center;
        min-width: 32px;
        height: 32px;
        padding: 0 8px;
        border: 1px solid transparent;
        border-radius: var(--gw-radius-sm);
        background: transparent;
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
    }

    & > button:hover:not(:disabled) {
        border-color: var(--gw-border);
        color: var(--gw-text);
    }

    & > button.active {
        background: var(--gw-primary);
        color: #fff;
    }

    & > button:disabled {
        opacity: 0.35;
    }
`;

/**
 * 페이지 번호 목록
 * - currentPage: 1부터 시작
 * - totalPages: 전체 페이지 수 (0 이면 1로 본다)
 * - onChange(page)
 * - pageRange: 한 번에 보여줄 번호 개수
 */
const Pagination = ({ currentPage, totalPages, onChange, pageRange = 5 }) => {
    const last = Math.max(1, totalPages || 1);
    const start = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const end = Math.min(last, start + pageRange - 1);
    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);

    const go = (page) => {
        if (page >= 1 && page <= last && page !== currentPage) onChange(page);
    };

    return (
        <StyledPagination aria-label="페이지">
            <button type="button" className="gw-reset" onClick={() => go(currentPage - 1)} disabled={currentPage <= 1} aria-label="이전 페이지"><FiChevronLeft /></button>
            {pages.map(p => (
                <button type="button" key={p} className={`gw-reset ${p === currentPage ? 'active' : ''}`} onClick={() => go(p)}>{p}</button>
            ))}
            <button type="button" className="gw-reset" onClick={() => go(currentPage + 1)} disabled={currentPage >= last} aria-label="다음 페이지"><FiChevronRight /></button>
        </StyledPagination>
    );
};

export default Pagination;
