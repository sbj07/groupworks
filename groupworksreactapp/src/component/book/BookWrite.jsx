import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookModal from './BookModal';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    background: white;

`;

const Label = styled.label`
    margin-bottom: 10px;
    color: #333;
    font-size: 1rem;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const BookWrite = () => {
    const [useDate, setUseDate] = useState('');
    const [bookData, setBookData] = useState({
        memberNo: '',
        // useDate: '',
        bookPurpose: ''
    });

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    
    const handleDateChange = (e) => {
        // 'YYYY-MM-DDTHH:MM' 형식을 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
        const formattedDate = e.target.value.replace('T', ' ') + ':00';
        setUseDate(formattedDate);
        // setUseDate(e.target.value);
        // if (e.target.name === 'startDate') {
        //     setStartDate(e.target.value);
        // } else if (e.target.name === 'endDate') {
        //     setEndDate(e.target.value);
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // useDate 값을 startDate로 설정
        // const updatedBookData = {
        //     ...bookData,
        //     useDate: startDate
        // useDate 값을 useDate 상태로 설정
        const updatedBookData = {
            ...bookData,
            useDate
        };
    
        try {
            // // JSON 데이터로 변환
            // const jsonData = {
            //     memberNo: bookData.memberNo,
            //     useDate: bookData.useDate,
            //     bookPurpose: bookData.bookPurpose
            // };
    
            // console.log('JSON 데이터 전송:', jsonData);
    
            // JSON 데이터로 요청 전송
            const response = await fetch('http://127.0.0.1:8888/app/book/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
    
            const responseBody = await response.json();
            console.log('예약 신청 성공:', responseBody);
            alert('예약 신청 완료')
            navigate('/book/list');
        } catch (error) {
            console.error('예약 신청 실패:', error);
        }
    }
    

    return (
        <Form onSubmit={handleSubmit}>
            <Label>
                예약자명
                <Input
                    type="text"
                    name="memberNo"
                    value={bookData.memberNo}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                사용 희망일시
                <Input type="datetime-local" name="useDate" value={useDate} onChange={handleDateChange} />
            </Label>
            <Label>
                사용 목적
                <Input
                    type="text"
                    name="bookPurpose"
                    value={bookData.bookPurpose}
                    onChange={handleChange}
                />
            </Label>
                <SubmitButton type="submit">저장</SubmitButton>
        </Form>
    );
};

export default BookWrite;
