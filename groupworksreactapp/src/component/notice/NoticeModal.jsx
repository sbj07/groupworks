import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
    border-radius: 10px; // 모달에 둥근 모서리 추가
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
    max-width: 500px; // 모달의 최대 너비 설정
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const StyledModalContent = styled.div`
    margin-bottom: 20px;
`;

const StyledModalHeader = styled.h2`
    margin-top: 0;
`;

const NoticeModal = ({ notice, onClose }) => {
    if (!notice) return null;

    return (
        <>
            <Overlay onClick={onClose} />
            <StyledModal>
                <StyledModalHeader>{notice.title}</StyledModalHeader>
                <StyledModalContent>
                    <p><strong>내용:</strong> {notice.content}</p>
                    <p><strong>작성자:</strong> {notice.memberNo}</p>
                    <p><strong>조회수:</strong> {notice.clickNo}</p>
                    <p><strong>첨부파일:</strong> {notice.filePath}</p>
                    <p><strong>카테고리:</strong> {notice.category}</p>
                    <p><strong>긴급 여부:</strong> {notice.emergencyYn}</p>
                    <p><strong>작성일자:</strong> {notice.enrollDate}</p>
                </StyledModalContent>
                <button onClick={onClose}>닫기</button>
            </StyledModal>
        </>
    );
};

export default NoticeModal;
