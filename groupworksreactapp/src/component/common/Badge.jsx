import styled from 'styled-components';

const TONES = {
    primary: ['var(--gw-primary-soft)', 'var(--gw-primary)'],
    success: ['#e3f6ee', 'var(--gw-success)'],
    danger: ['#fdecec', 'var(--gw-danger)'],
    warning: ['#fff4dd', '#b7791f'],
    gray: ['var(--gw-surface-2)', 'var(--gw-text-muted)'],
};

// 작은 상태 표시. tone: primary | success | danger | warning | gray
const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 2px 9px;
    border-radius: 999px;
    background: ${({ $tone = 'gray' }) => (TONES[$tone] ?? TONES.gray)[0]};
    color: ${({ $tone = 'gray' }) => (TONES[$tone] ?? TONES.gray)[1]};
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
`;

export default Badge;
