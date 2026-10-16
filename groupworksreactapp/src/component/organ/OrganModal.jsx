import React, { useState } from 'react';
import styled from 'styled-components';
import AppModal from '../common/AppModal';
import InfoList from '../common/InfoList';
import { Avatar } from '../Topbar';
import Badge from '../common/Badge';
import MessageWrite from '../message/MessageWrite';
import { WORK_STATUS_TONE } from '../attendance/WorkStatus';

const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;

    strong {
        display: block;
        font-size: 17px;
    }

    small {
        color: var(--gw-text-muted);
    }
`;

const OrganModal = ({ selectedVo, closeModal }) => {
    const [writing, setWriting] = useState(false);
    const isMe = selectedVo?.no === sessionStorage.getItem('loginMemberNo');

    return (
        <>
        <AppModal
            isOpen={!!selectedVo}
            onClose={closeModal}
            title="구성원 정보"
            width={420}
            footer={<>
                <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>닫기</button>
                {!isMe && <button type="button" className="btn btn-primary" onClick={() => setWriting(true)}>쪽지 보내기</button>}
            </>}
        >
            {selectedVo && (
                <>
                    <Profile>
                        <Avatar $size={52}>{selectedVo.name?.charAt(0)}</Avatar>
                        <div>
                            <strong>{selectedVo.name}</strong>
                            <small>{[selectedVo.departName, selectedVo.positionName].filter(Boolean).join(' · ')}</small>
                        </div>
                    </Profile>
                    <InfoList items={[
                        { label: '근무 상태', value: selectedVo.workStatusName && <Badge $tone={WORK_STATUS_TONE[selectedVo.workStatusNo]}>{selectedVo.workStatusName}</Badge> },
                        { label: '전화번호', value: selectedVo.tel && <a href={`tel:${selectedVo.tel}`}>{selectedVo.tel}</a> },
                        { label: '이메일', value: selectedVo.email && <a href={`mailto:${selectedVo.email}`}>{selectedVo.email}</a> },
                    ]} />
                </>
            )}
        </AppModal>
        <MessageWrite
            isOpen={writing}
            to={writing && selectedVo ? { no: selectedVo.no, name: selectedVo.name } : null}
            onClose={() => setWriting(false)}
            onSent={() => { setWriting(false); closeModal(); }}
        />
        </>
    );
};

export default OrganModal;
