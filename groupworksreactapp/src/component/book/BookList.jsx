import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookModal from './BookModal';
import { useNavigate } from 'react-router-dom';

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

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px; // 각 테이블 사이의 간격

    & th, & td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
    }

    & .depart-header {
        background-color: lightgray; // 헤더 배경색
        font-size: 1.2em; // 헤더 폰트 사이즈
    }
`;

const BookList = () => {

    const [bookVoList, setBookVoList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const loginMemberName = sessionStorage.getItem("loginMemberName");


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



///////
// const handleDelete = bookNo => {
//     fetch(`http://127.0.0.1:8888/app/book/delete/${bookNo}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type' : 'application/json',
//         },
//     })
//     .then(response => {
//         if(!response.ok){
//             throw new Error('서버 오류 발생')
//         }
//         return response.text();
//     })
//     .then(data => {
//         console.log('삭제 성공:' , data);
//         alert("예약 삭제 성공");
//         loadBookVoList();
//     })
//     .catch(error => {
//         console.error('삭제 실패 : ', error);
//         alert("예약 삭제 실패")
//     });
// };///

    const handleDateChange = (e) => {
        if (e.target.name === 'startDate') {
            setStartDate(e.target.value);
        } else if (e.target.name === 'endDate') {
            setEndDate(e.target.value);
        }
    };

    const handleSearch = () => {
        if (startDate && endDate) {
            loadBookVoList(startDate, endDate);
        }
    };

    const navigate = useNavigate();
    const handleBookWrite = () => {
        // setShowModal(!showModal);
        navigate('/book/insert');
    };


//////////////////

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedVo, setSelectedVo] = useState(null);

    const openModal = (vo) => {
        setIsOpen(true);
        setSelectedVo(vo);
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedVo(null);
    }

    const navigateToEdit = () => {
        navigate(`/book/edit`, { state: { selectedVo } });
        closeModal();
    }

    // 목록을 새로 고치는 함수
    const refreshList = async () => {
        await loadBookVoList(startDate, endDate);
    };

    return (
        <StyledBookListDiv>
            <h1>예약 조회</h1>
            <button onClick={handleBookWrite}>예약 신청</button>
            {showModal && <BookModal closeModal={handleBookWrite} userName={loginMemberName}/>}
            <div>
                <label>
                    시작 날짜:
                    <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
                </label>
                <label>
                    종료 날짜:
                    <input type="date" name="endDate" value={endDate} onChange={handleDateChange} />
                </label>
                <button onClick={handleSearch}>조회</button>
            </div>
            <StyledTable>
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>예약자명</th>
                        <th>장소</th>
                        <th>언제부터</th>
                        <th>언제까지</th>
                        <th>사용 목적</th>
                        <th>예약시간</th>
                    </tr>
                </thead>
                <tbody>
                    { bookVoList.length > 0 ? (
                        bookVoList.map(book => (
                            <tr key={book.bookNo} onClick={() => openModal(book)}>
                                <td>{book.bookNo}</td>
                                <td>{book.memberName}</td>
                                <td>{book.bookPlace}</td>
                                <td>{book.startDate}</td>
                                <td>{book.endDate}</td>
                                <td>{book.bookPurpose}</td>
                                <td>{book.updateDate ? book.updateDate : book.bookDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">해당 기간 등록된 예약 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <BookModal
                modalIsOpen={modalIsOpen}
                selectedVo={selectedVo}
                closeModal={closeModal}
                navigateToEdit={navigateToEdit}
                refreshList={refreshList}
                book={selectedVo}
            />
        </StyledBookListDiv>
    );
};

export default BookList;
