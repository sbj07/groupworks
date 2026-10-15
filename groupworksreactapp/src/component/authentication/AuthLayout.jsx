import React from 'react';
import styled from 'styled-components';

const StyledAuth = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 100vh;
    background: var(--gw-surface);

    @media (max-width: 960px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const Brand = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px;
    overflow: hidden;
    background: linear-gradient(160deg, var(--gw-navy) 0%, var(--gw-navy-dark) 70%);
    color: #fff;

    @media (max-width: 960px) {
        display: none;
    }

    &::after {
        content: '';
        position: absolute;
        right: -120px;
        bottom: -120px;
        width: 420px;
        height: 420px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 70%);
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        font-weight: 800;
    }

    .logo > span {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: #fff;
        color: var(--gw-navy);
    }

    h2 {
        margin: 0 0 12px;
        color: #fff;
        font-size: 34px;
        line-height: 1.3;
    }

    p {
        margin: 0;
        color: rgba(255, 255, 255, 0.72);
        font-size: 15px;
        line-height: 1.6;
    }

    small {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const Panel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    background: var(--gw-bg);
`;

export const AuthCard = styled.div`
    width: 100%;
    max-width: ${({ $wide }) => ($wide ? 520 : 400)}px;
    padding: 40px 36px;

    h1 {
        margin: 0 0 6px;
        font-size: 24px;
    }

    .sub {
        margin: 0 0 28px;
        color: var(--gw-text-muted);
    }

    .btn-primary[type='submit'] {
        width: 100%;
        padding: 12px;
        font-size: 15px;
    }

    .foot {
        margin-top: 22px;
        color: var(--gw-text-muted);
        font-size: 13px;
        text-align: center;
    }

    .foot a {
        color: var(--gw-primary);
        font-weight: 600;
    }
`;

// 로그인, 회원가입 공통 화면: 왼쪽 브랜드 패널 + 오른쪽 폼
const AuthLayout = ({ children }) => {
    return (
        <StyledAuth>
            <Brand>
                <div className="logo"><span>G</span>GroupWorks</div>
                <div>
                    <h2>일하는 방식을<br />한곳에서 관리하세요</h2>
                    <p>근태, 전자결재, 공지사항, 조직도, 회의실 예약까지<br />우리 회사의 업무를 하나의 그룹웨어로.</p>
                </div>
                <small>© GroupWorks</small>
            </Brand>
            <Panel>{children}</Panel>
        </StyledAuth>
    );
};

export default AuthLayout;
