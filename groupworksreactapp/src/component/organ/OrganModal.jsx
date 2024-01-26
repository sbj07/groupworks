import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';


export const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const OrganModal = ({ modalIsOpen, selectedVo, closeModal, navigateToEdit, onDelete, organ }) => {

    const navigateToDelete = () => {
        // if (!organ) {
        //     console.error('organ 객체가 정의되지 않음');
        //     return;
        // }
    
        // if (window.confirm("정말로 삭제하시겠습니까?")) {
        //     onDelete(organ.orgNo);
        // }
            if (selectedVo && selectedVo.orgNo) {
                onDelete(selectedVo.orgNo);
            }
            closeModal();
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="부서원 정보"
            style={{ overlay: {}, content: {
                background: 'none',
                border: 'none',
                padding: 0
            } }}
        >
            <StyledModal>
            <h2>부서원 정보</h2>
            {selectedVo && (
                <div>
                    <p>이름: {selectedVo.name}</p>
                    <p>부서: {selectedVo.departNo}</p>
                    <p>직책: {selectedVo.positionNo}</p>
                    <p>번호: {selectedVo.tel}</p>
                    <p>이메일: {selectedVo.email}</p>
                    <button onClick={navigateToEdit}>수정</button>
                    <button onClick={navigateToDelete}>삭제</button>
                    <button onClick={closeModal}>닫기</button>
                </div>
            )}
            </StyledModal>
        </Modal>
    );
};

export default OrganModal;
