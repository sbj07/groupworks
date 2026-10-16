import styled from 'styled-components';

// 목록이 비었을 때 안내 문구
const EmptyState = styled.p`
    margin: 0;
    padding: ${({ $compact }) => ($compact ? '20px 0' : '48px 0')};
    color: var(--gw-text-muted);
    font-size: 13px;
    text-align: center;
`;

export default EmptyState;
