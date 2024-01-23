import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookModal from './BookModal';

const StyledBookListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > table {
        width: 80%;
        height: 80%;
        border: 3px solid black;
    }
    & > button {
        width: 30%;
        font-size: 2rem;
    }
`;

const BookList = () => {

    const [bookVoList, setBookVoList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const loggedInUserName = "김광희";

    const loadBookVoList = async (startDate, endDate) => {
        try {
            const queryStartDate = startDate === '' ? null : startDate;
            const queryEndDate = endDate === '' ? null : endDate;
            const response = await fetch(`http://127.0.0.1:8888/app/book/list?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.voList && Array.isArray(data.voList)) {
                setBookVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
        useEffect(() => {
            // 컴포넌트 마운트 시 전체 예약 데이터를 불러옵니다.
            loadBookVoList(null, null);
        }, []);

    const handleDateChange = (e) => {
        if (e.target.name === 'startDate') {
            setStartDate(e.target.value);
        } else if (e.target.name === 'endDate') {
            setEndDate(e.target.value);
        }
    };

    const handleSubmit = () => {
        if (startDate && endDate) {
            loadBookVoList(startDate, endDate);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    return (
        <StyledBookListDiv>
            <h1>예약 조회</h1>
            <button onClick={toggleModal}>예약 신청</button>
            {showModal && <BookModal closeModal={toggleModal} userName={loggedInUserName}/>}
            <div>
                <label>
                    시작 날짜:
                    <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
                </label>
                <label>
                    종료 날짜:
                    <input type="date" name="endDate" value={endDate} onChange={handleDateChange} />
                </label>
                <button onClick={handleSubmit}>조회</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>예약자명</th>
                        <th>사용 일자</th>
                        <th>사용 목적</th>
                        <th>신청 일자</th>
                    </tr>
                </thead>
                <tbody>
                    { bookVoList.length > 0 ? (
                        bookVoList.map(book => (
                            <tr key={book.bookNo}>
                                <td>{book.bookNo}</td>
                                <td>{book.memberNo}</td>
                                <td>{book.useDate}</td>
                                <td>{book.bookPurpose}</td>
                                <td>{book.bookDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">해당 기간 등록된 예약 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </StyledBookListDiv>
    );
};

export default BookList;
