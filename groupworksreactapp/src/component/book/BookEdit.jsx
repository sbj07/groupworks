import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBookEditDiv = styled.div`
    /* width: 100%;
    height: 100%;
    padding: 20px; */
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

const BookEdit = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [editedBook, setEditedBook] = useState(location.state?.selectedVo || {
        // memberNo: '',
        useDate: '',
        bookPurpose: '',
        updateDate: ''
    })

    useEffect(() => {
        if (location.state?.selectedVo) {
            const selectedBook = location.state.selectedVo;
            setEditedBook(selectedBook);
    
            if (selectedBook.useDate) {
                const formattedDate = selectedBook.useDate.split(' ')[0]; // 날짜 부분만 추출
                setStartDate(formattedDate);
            }
        }
    }, [location.state]);

    const handleChange = (e) => {
        setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
    }

    const handleDateChange = (e) => {
        if (e.target.name === 'startDate') {
            setStartDate(e.target.value);
        } else if (e.target.name === 'endDate') {
            setEndDate(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            bookNo: editedBook.bookNo,
            memberNo: editedBook.memberNo,
            useDate: startDate,
            bookPurpose: editedBook.bookPurpose,
            bookDate: editedBook.bookDate,
            updateDate: editedBook.updateDate
        };
    // const formData = new FormData();
    // formData.append('bookNo', editedBook.bookNo);
    // formData.append('memberNo', editedBook.memberNo);
    // formData.append('useDate', editedBook.useDate);
    // formData.append('bookPurpose', editedBook.bookPurpose);
    // formData.append('bookDate', editedBook.bookDate);
    // formData.append('updateDate', editedBook.updateDate);

        // 수정된 조직도 데이터를 서버로 전송합니다.
        fetch('http://127.0.0.1:8888/app/book/edit', {
            method: 'POST',
            // body: formData
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(bookData)
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.json();
        })
        .then(data => {
            alert("예약 수정 성공")
            navigate('/book/list');
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("예약 수정 실패")
        });

    };

    return (
        <StyledBookEditDiv>
            <h2>예약 수정</h2>
            <form onSubmit={handleSubmit}>
                {/* <label>예약자명
                    <input
                         type="text"
                         name="memberNo"
                         value={editedBook.memberNo}
                         onChange={handleChange}
                    />
                </label> */}
                <label>사용 희망일
                    <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
                </label>
                <label>사용 목적
                    <input
                         type="text"
                         name='bookPurpose'
                         value={editedBook.bookPurpose}
                         onChange={handleChange} />
                </label>
                <br />
                <button type='submit'>저장</button>
            </form>
        </StyledBookEditDiv>
    );
};

export default BookEdit;