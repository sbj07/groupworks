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
        width: 100%;
        height: 100%;
        display: center;
        border: 3px solid black;
    }
    & > button {
        width: 30%;
        /* font-size: 2rem; */
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

const NoticeList = ({ showTopFive, showWriteButton }) => {
    const navigate = useNavigate();
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticeVoList, setNoticeVoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 항목 수

    // useEffect(() => {
    //     // 공지사항 데이터 로드 로직
    // }, [currentPage]);

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
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        
        const totalItems = 100; 
        const maxPage = Math.ceil(totalItems / itemsPerPage);
    
        // 현재 페이지가 최대 페이지보다 작을 경우에만 페이지 번호를 증가시킵니다.
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCloseModal = () => {
        setSelectedNotice(null);
    };
    
    // const handleEdit = (notice) => {
    //     // NoticeEdit 컴포넌트로 이동
    //     navigate("/notice/edit", { state: { notice: notice } });
    // };

    //공지사항 삭제
    // const handleDelete = noticeNo => {
    //     fetch(`http://127.0.0.1:8888/app/notice/delete/${noticeNo}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then(response => {
    //         // 응답이 OK인지 확인
    //         if (!response.ok) {
    //             throw new Error('서버 오류 발생');
    //         }

    //         const contentType = response.headers.get('content-type');
    //         if (contentType && contentType.includes('application/json')) {
    //             return response.json(); // 응답이 JSON 형식이면 JSON으로 파싱
    //         } else {
    //             return response.text(); // 응답이 JSON 형식이 아니면 텍스트로 처리
    //         }
    //     })
    //     .then(data => {
    //         // data는 JSON 객체 또는 텍스트 문자열입니다.
    //         console.log('삭제 성공:', data);
    //         alert("공지사항 삭제 성공");
    //         loadNoticeVoList(); // 공지사항 목록 다시 로드
    //     })
    //     .catch(error => {
    //         console.error('삭제 실패:', error);
    //         alert("공지사항 삭제 실패");
    //     });
    // };
    const handleDelete = noticeNo => {
        fetch(`http://127.0.0.1:8888/app/notice/delete/${noticeNo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.text(); // 이 경우, 서버 응답이 JSON이 아닐 수 있으므로 text() 사용
        })
        .then(data => {
            console.log('삭제 성공:', data);
            alert("공지사항 삭제 성공");
            loadNoticeVoList(); // 공지사항 목록 다시 로드
        })
        .catch(error => {
            console.error('삭제 실패:', error);
            alert("공지사항 삭제 실패");
        });
    };
    



    const handleSave = (editedNotice) => {
        // API 호출 URL 설정
        const apiUrl = `http://127.0.0.1:8888/app/notice/edit`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedNotice),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.json();
        })
        .then(data => {
            console.log('수정 성공:', data);
            alert("공지사항 수정 성공");
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("공지사항 수정 실패");
        });
    };
    




    // const loadNoticeVoList = () => {
    //     // fetch("http://127.0.0.1:8888/app/notice/list")
    //     fetch(`http://127.0.0.1:8888/app/notice/list?page=${currentPage}&size=${itemsPerPage}`)
    //     .then( resp => resp.json() )
    //     .then(data => {
    //         // console.log("가장 최근에 저장된 공지사항 데이터 : ", data);
    //         if (data.voList && Array.isArray(data.voList)) {
    //             const listToShow = showTopFive ? data.voList.slice(0, 5) : data.voList;
    //             setNoticeVoList(listToShow);
    //         } else {
    //             console.error('Data is not an array:', data);
    //             setNoticeVoList([]); // 데이터가 배열이 아닌 경우 빈 배열로 설정
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Fetch error:', error);
    //         setNoticeVoList([]); // 에러 발생 시 빈 배열로 설정
    //     });
    // };

    const loadNoticeVoList = () => {
        fetch(`http://127.0.0.1:8888/app/notice/list?page=${currentPage}&size=${itemsPerPage}`)
        .then(response => response.json())
        .then(data => {
            if (data.voList && Array.isArray(data.voList)) {
                setNoticeVoList(data.voList);
            } else {
                setNoticeVoList([]);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setNoticeVoList([]);
        });
    };
    

    useEffect( () => {
        // console.log("useEffect 호출");
        loadNoticeVoList();
    }, [showTopFive, currentPage] );


    const renderPagination = () => {
        // 간단한 페이징 컴포넌트. 실제 구현에는 더 복잡한 로직이 필요할 수 있음
        return (
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
                <span>{currentPage}</span>
                <button onClick={handleNextPage}>다음</button>
            </div>
        );
    };

    return (
        <StyledNoticeListDiv>
            <h1>공지사항</h1>{showWriteButton && <button onClick={() => navigate("/notice/insert")}>공지사항 작성하기</button>}
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
                            // notice.deleteYn === 'y' ? null : (
                            <tr key={notice.noticeNo} onClick={() => handleNoticeClick(notice)}>
                            <td>{notice.noticeNo}</td>
                            <td>{notice.memberNo}</td>
                            <td>{notice.title}</td>
                            <td>{notice.clickNo}</td>
                            <td>{notice.filePath}</td>
                            <td>{notice.category}</td>
                            <td>{notice.emergencyYn}</td>
                            <td>{notice.openDepart}</td>
                            <td>{notice.enrollDate}</td>
                        </tr>
                            ))
                            // )
                    }
                </tbody>
            </table>
            {selectedNotice && (
                <NoticeModal 
                notice={selectedNotice} 
                onClose={handleCloseModal} 
                onSave={handleSave}
                onDelete={handleDelete}
                />
                )}
            
            {renderPagination()}
        </StyledNoticeListDiv>
    );
};

export default NoticeList;