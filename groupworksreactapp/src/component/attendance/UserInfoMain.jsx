import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import EditMember from '../member/EditMember';
import WorkStatus from './WorkStatus';
import Card from '../common/Card';
import { Avatar } from '../Topbar';
import { API_BASE } from '../../api/config';

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    & > strong {
        margin-top: 12px;
        font-size: 18px;
    }

    & > span {
        margin-top: 2px;
        color: var(--gw-text-muted);
        font-size: 13px;
    }
`;

const Clock = styled.div`
    margin: 18px 0 16px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
    text-align: center;
`;

const Stats = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 16px;

    & > div {
        padding: 12px;
        border-radius: 10px;
        background: var(--gw-surface-2);
        text-align: center;
    }

    & small {
        display: block;
        color: var(--gw-text-muted);
        font-size: 12px;
    }

    & b {
        font-size: 18px;
    }
`;

const Actions = styled.div`
    display: grid;
    gap: 6px;

    & .btn + .btn {
        margin-left: 0;
    }
`;

const useClock = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map((n) => String(n).padStart(2, '0'))
        .join(' : ');
};

const UserInfoMain = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [loginMemberVo, setLoginMemberVo] = useState({});
    const [totalDays, setTotalDays] = useState();
    const [openModal, setOpenModal] = useState(false);
    const time = useClock();

    const loadMember = useCallback(() => {
        fetch(`${API_BASE}/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginMemberVo(data.loginMemberVo ?? {});
        });
    }, [loginMemberNo]);

    useEffect( () => {
        loadMember();

        fetch(`${API_BASE}/api/attendance/vacation/total/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setTotalDays(data.totalDays);
        })
    },[loginMemberNo, loadMember]);

    const handleMemberEdit = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Card>
            <Profile>
                <Avatar $size={72}>{loginMemberVo.name?.charAt(0)}</Avatar>
                <strong>{loginMemberVo.name}</strong>
                <span>{loginMemberVo.companyName}</span>
                <span>{[loginMemberVo.departName, loginMemberVo.positionName].filter(Boolean).join(' · ')}</span>
            </Profile>

            <Clock>{time}</Clock>

            <Stats>
                <div><small>사용 연차</small><b>{totalDays ?? 0}</b>일</div>
                <div><small>남은 연차</small><b>{loginMemberVo.annual ?? 0}</b>일</div>
            </Stats>

            <WorkStatus current={loginMemberVo.workStatusNo} onChanged={loadMember} />

            <Actions>
                <Button variant="outline-primary" onClick={handleMemberEdit}>개인정보 수정</Button>
            </Actions>
            <EditMember memberNo={loginMemberNo} openModal={openModal} handleCloseModal={handleCloseModal} />
        </Card>
    );
};

export default UserInfoMain;
