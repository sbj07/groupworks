import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../api/http';
import { FiHome, FiBell, FiUsers, FiCalendar, FiUserCheck, FiLogOut, FiSun, FiBriefcase, FiFileText, FiInbox } from 'react-icons/fi';

const StyledSidebar = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    width: var(--gw-sidebar-width);
    height: 100vh;
    padding: 20px 14px;
    background: linear-gradient(180deg, var(--gw-navy) 0%, var(--gw-navy-dark) 100%);
    color: rgba(255, 255, 255, 0.82);
    overflow-y: auto;

    /* 좁은 화면에서는 아이콘만 남긴다 */
    @media (max-width: 900px) {
        padding: 20px 10px;

        .label,
        .section {
            display: none;
        }

        a,
        button {
            justify-content: center;
        }
    }
`;

const Brand = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px 22px;
    color: #fff;
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -0.02em;

    & > span {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        border-radius: 9px;
        background: #fff;
        color: var(--gw-navy);
        font-size: 15px;
    }
`;

const Section = styled.div`
    margin: 18px 10px 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.45);
`;

const Item = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    margin-bottom: 2px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: inherit;
    transition: background 0.15s, color 0.15s;

    & > svg {
        font-size: 17px;
        flex-shrink: 0;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
    }

    &.active {
        background: var(--gw-navy-active);
        color: #fff;
        font-weight: 700;
    }
`;

const Logout = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: auto;
    padding: 11px 12px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    background: transparent;
    color: rgba(255, 255, 255, 0.82);
    font-size: 14px;
    font-weight: 500;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
    }
`;

const Count = styled.span`
    margin-left: auto;
    min-width: 20px;
    padding: 1px 7px;
    border-radius: 999px;
    background: #ff6b6b;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    text-align: center;

    @media (max-width: 900px) {
        display: none;
    }
`;

const Sidebar = ({ member, pendingCount = 0 }) => {
    const navigate = useNavigate();
    const isAdmin = member?.authNo === '1';

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    return (
        <StyledSidebar className="gw-scroll">
            <Brand to="/"><span>G</span><b className="label">GroupWorks</b></Brand>

            <Item to="/" end><FiHome /><span className="label">홈</span></Item>
            <Item to="/notice/list"><FiBell /><span className="label">공지사항</span></Item>
            <Item to="/organ/list"><FiUsers /><span className="label">조직도</span></Item>
            <Item to="/book/list"><FiCalendar /><span className="label">회의실 예약</span></Item>

            <Section className="section">전자결재</Section>
            <Item to="/approval/write/vacation"><FiSun /><span className="label">휴가신청서</span></Item>
            <Item to="/approval/write/business"><FiBriefcase /><span className="label">출장신청서</span></Item>
            <Item to="/approval/my"><FiFileText /><span className="label">결재내역</span></Item>
            <Item to="/approval/pending">
                <FiInbox /><span className="label">승인대기</span>
                {pendingCount > 0 && <Count>{pendingCount}</Count>}
            </Item>

            {isAdmin && (
                <>
                    <Section className="section">인사관리</Section>
                    <Item to="/hr/members"><FiUserCheck /><span className="label">인원관리</span></Item>
                </>
            )}

            <Logout type="button" className="gw-reset" onClick={handleLogout}>
                <FiLogOut /><span className="label">로그아웃</span>
            </Logout>
        </StyledSidebar>
    );
};

export default Sidebar;
