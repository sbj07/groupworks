import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledNoticeListDiv = styled.div`
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

const NoticeList = () => {

    const navigate = useNavigate();

    const [noticeVoList, setNoticeVoList] = useState([]);
    const loadNoticeVoList = () => {
        fetch("http://127.0.0.1:8888/app/notice/list")
        .then( resp => resp.json() )
        .then(data => {
            if (data.voList && Array.isArray(data.voList)) {
                setNoticeVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
                setNoticeVoList([]); // 데이터가 배열이 아닌 경우 빈 배열로 설정
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setNoticeVoList([]); // 에러 발생 시 빈 배열로 설정
        });
    };
    useEffect( () => {
        console.log("useEffect 호출");
        loadNoticeVoList();
    }, [] );

    return (
        <StyledNoticeListDiv>
            <h1>공지사항 목록 조회</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th>파일</th>
                        <th>카테고리</th>
                        <th>긴급여부</th>
                        <th>공개부서</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        noticeVoList.length===0
                        ?
                        null
                        :
                        noticeVoList.map( vo => <tr>key ={vo.noticeNo}
                            <td>{vo.noticeNo}</td>
                            <td>{vo.memberNo}</td>
                            <td>{vo.title}</td>
                            <td>{vo.clickNo}</td>
                            <td>{vo.filePath}</td><button>파일수정</button>
                            <td>{vo.category}</td>
                            <td>{vo.emergencyYn}</td>
                            <td>{vo.openDepart}</td>
                            <td>{vo.enrollDate}</td>
                        </tr>
                            )
                    }
                </tbody>
            </table>

            <button onClick = { () => {
                navigate("notice/write")
            } }>공지사항 작성</button>
        </StyledNoticeListDiv>
    );
};

export default NoticeList;