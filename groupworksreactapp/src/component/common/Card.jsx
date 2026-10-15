import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.section`
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 20px 22px;
    overflow-x: auto;

    & > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
    }

    & > header h2 {
        margin: 0;
        font-size: 16px;
    }
`;

// 화면 공통 카드. title 을 주면 머리글을 그리고, action 은 오른쪽에 놓인다.
const Card = ({ title, action, className = '', children, ...rest }) => {
    return (
        <StyledCard className={`gw-card ${className}`} {...rest}>
            {(title || action) && (
                <header>
                    {title && <h2>{title}</h2>}
                    {action}
                </header>
            )}
            {children}
        </StyledCard>
    );
};

export default Card;
