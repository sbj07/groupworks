import React from 'react';
import styled from 'styled-components';
import AppModal from '../common/AppModal';
import InfoList from '../common/InfoList';
import { Avatar } from '../Topbar';

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

const OrganModal = ({ modalIsOpen, selectedVo, closeModal }) => {
    return (
        <AppModal
            isOpen={modalIsOpen && !!selectedVo}
            onClose={closeModal}
            title="구성원 정보"
            width={420}
            footer={<button type="button" className="btn btn-primary" onClick={closeModal}>닫기</button>}
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
                        { label: '전화번호', value: selectedVo.tel && <a href={`tel:${selectedVo.tel}`}>{selectedVo.tel}</a> },
                        { label: '이메일', value: selectedVo.email && <a href={`mailto:${selectedVo.email}`}>{selectedVo.email}</a> },
                    ]} />
                </>
            )}
        </AppModal>
    );
};

export default OrganModal;
