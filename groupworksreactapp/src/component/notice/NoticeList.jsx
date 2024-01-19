import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoticeModal from './NoticeModal';


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

//조회수 증가
// const incrementClickCount = async (noticeNo) => {
//     try {
//         const response = await fetch(`http://127.0.0.1:8888/app/notice/list/${noticeNo}`, {
//             method: 'POST', // 가정한 요청 메소드
//             // 필요한 경우 헤더와 바디를 추가합니다.
//         });

//         if (!response.ok) {
//             throw new Error('서버 오류 발생');
//         }

//         // 요청이 성공했을 때 추가 로직 구현
//         return true;
//     } catch (error) {
//         console.error('조회수 증가 요청 실패:', error);
//         return false;
//     }
// };

const NoticeList = () => {

    const navigate = useNavigate();
    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice);
    };

    //조회수 증가 코드 수정해야 함↑
    // const handleNoticeClick = async (notice) => {
    //     const success = await incrementClickCount(notice.noticeNo);
    
    //     if (success) {
    //         // 조회수 증가 후 공지사항의 조회수를 업데이트
    //         const updatedNotice = { ...notice, clickNo: notice.clickNo + 1 };
    //         setSelectedNotice(updatedNotice);
    //     }
    // };


    const handleCloseModal = () => {
        setSelectedNotice(null);
    };


    const handleFileEdit = (noticeNo) => {
        
    }

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
            <h1>공지사항</h1><button onClick={() => navigate("/notice/insert")}>공지사항 작성하기</button>
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
                        <tr><td colSpan="9">로딩 중...</td></tr>
                        :
                        noticeVoList.map( notice => (
                            <tr key={notice.noticeNo} onClick={() => handleNoticeClick(notice)}>
                            <td>{notice.noticeNo}</td>
                            <td>{notice.memberNo}</td>
                            <td>{notice.title}</td>
                            <td>{notice.clickNo}</td>
                            <td>{notice.filePath}</td><button onClick={() => handleFileEdit(notice.noticeNo)}>첨부파일</button>
                            <td>{notice.category}</td>
                            <td>{notice.emergencyYn}</td>
                            <td>{notice.openDepart}</td>
                            <td>{notice.enrollDate}</td>
                        </tr>
                            ))
                    }
                </tbody>
            </table>

            {/* <button onClick = { () => {
                navigate("notice/write")
            } }>공지사항 작성</button> */}
            <NoticeModal notice={selectedNotice} onClose={handleCloseModal} />
        </StyledNoticeListDiv>
    );
};

export default NoticeList;