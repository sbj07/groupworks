import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledNoticeEditDiv = styled.div`
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


const NoticeEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const notice = location.state ? location.state.notice : null; // notice가 없는 경우를 고려
    const [editedNotice, setEditedNotice] = useState(notice);

    const handleChange = (e) => {
        setEditedNotice({ ...editedNotice, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const hasValidData = editedNotice.title || editedNotice.content ||
        editedNotice.category || editedNotice.openDepart; // 기타 필요한 필드 추가

        if (!hasValidData) {
        alert("수정할 내용을 입력하세요.");
        return;
        }


        // 수정된 공지사항 데이터를 서버로 전송합니다.
        fetch('http://127.0.0.1:8888/app/notice/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedNotice)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.json();
        })
        .then(data => {
            alert("공지사항 수정 성공")
            navigate('/notice/list');
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("공지사항 수정 실패")
        });
    };
    

    if (!editedNotice) return <div>로딩 중...</div>;

    return (
        <StyledNoticeEditDiv>
            <h1>공지사항 수정</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                    <input
                        type="text"
                        name="title"
                        value={editedNotice.title}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    내용:
                    <textarea
                        name="content"
                        value={editedNotice.content}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    카테고리:
                    <input
                        type="text"
                        name="category"
                        value={editedNotice.category}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    공개 부서:
                    <input
                        type="text"
                        name="openDepart"
                        value={editedNotice.openDepart}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    파일첨부:
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">저장</button>
            </form>
        </StyledNoticeEditDiv>
    );
};

export default NoticeEdit;
