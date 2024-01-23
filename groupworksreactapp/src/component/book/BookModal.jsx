import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
`;

const BookModal = ({ closeModal, userName }) => {
    return (
        <StyledModal>
            <h2>예약 신청</h2>
            <form>
                <p>사용자 이름: {userName}</p>
                <br />
                <label>
                    시작 날짜:
                    <input type="date" name="useDate" />
                </label>
                <br />
                <label>
                    사용 목적:
                    <select name="purpose">
                        <option value="회의">회의</option>
                        <option value="행사">행사</option>
                        <option value="기타">기타</option>
                    </select>
                </label>
                <br />
                <button type="button" onClick={closeModal}>닫기</button>
                <button type="submit">예약 신청</button>
            </form>
        </StyledModal>
    );
};

export default BookModal;
