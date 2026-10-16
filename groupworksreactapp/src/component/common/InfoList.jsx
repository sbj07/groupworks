import React from 'react';
import styled from 'styled-components';

const StyledInfoList = styled.dl`
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 0;
    margin: 0;

    & > dt,
    & > dd {
        margin: 0;
        padding: 10px 0;
        border-bottom: 1px solid var(--gw-border);
    }

    & > dt {
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
    }

    & > dd {
        color: var(--gw-text);
        white-space: pre-wrap;
        word-break: break-word;
    }

    & > dt:last-of-type,
    & > dd:last-of-type {
        border-bottom: none;
    }
`;

/**
 * 상세 정보 목록 (라벨 / 값)
 * items: [{ label, value }] - value 가 비어 있으면 '-' 로 표시
 */
const InfoList = ({ items }) => (
    <StyledInfoList>
        {items.filter(Boolean).map(({ label, value }) => (
            <React.Fragment key={label}>
                <dt>{label}</dt>
                <dd>{value === undefined || value === null || value === '' ? '-' : value}</dd>
            </React.Fragment>
        ))}
    </StyledInfoList>
);

export default InfoList;
