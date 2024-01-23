import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

    const navigate = useNavigate();

    const [bookVoList, setBookVoList] = useState([]);
    const loadBookVoList = () => {
        fetch(`http://127.0.0.1:8888/app/book/list`)
        .then(resp => resp.json())
        .then(data => {
            console.log("데이터 갖고옴");
            console.log(data.voList);

            if (data.voList && Array.isArray(data.voList)) {
                setBookVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
                setBookVoList([]);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setBookVoList([]);
        });
    };
    useEffect( () => {
        // console.log("useEffect 호출");
        loadBookVoList();
    }, [] );

    return (
        <StyledBookListDiv>
            <h1>예약 조회</h1>
            <table>
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>예약자명</th>
                        <th>사용 일자</th>
                        <th>사용 목적</th>
                    </tr>
                </thead>
                <tbody>
                    {bookVoList.map(book => (
                        <tr key={book.bookNo}>
                            <td>{book.bookNo}</td>
                            <td>{book.memberNo}</td>
                            <td>{book.useDate}</td>
                            <td>{book.usePurpose}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </StyledBookListDiv>
    );
};

export default BookList;
