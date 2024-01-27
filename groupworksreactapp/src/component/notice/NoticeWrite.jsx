import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const TextArea = styled.textarea`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
    height: 100px;
    resize: vertical;
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



const NoticeWrite = () => {
    //
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");

    const navigate = useNavigate();
    const [loginMemberVo, setLoginMemberVo] = useState([]);
    //
    const [noticeData, setNoticeData] = useState({
        memberNo: loginMemberNo,
        title: '',
        content: '',
        category: '',
        emergencyYn: '',
        openDepart: '',
        file: null
        
    });
    
    const handleInputChange = (e) => {
        setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
    };

    //기존 파일 수정 코드
    const handleFileChange = (e) => {
        // 파일이 선택되었을 때 상태 업데이트
        if (e.target.files.length > 0) {
            setNoticeData({ ...noticeData, file: e.target.files[0] });
        }
    };

    //파일 수정 코드(지피티 / 비추천 방법)
    // const handleFileChange = (e) => {
    //     if (e.target.files.length > 0) {
    //         const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             setNoticeData({ ...noticeData, file: reader.result });
    //         };
    //         reader.onerror = (error) => {
    //             console.error('Error: ', error);
    //         };
    //     }
    // };

    const func = ( ) => {
        fetch(`http://127.0.0.1:8888/app/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginMemberVo(data.loginMemberVo);
        });
    }
    useEffect( () => {
        func();
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 데이터 전송 로직
        const formData = new FormData();
        formData.append('title', noticeData.title);
        formData.append('content', noticeData.content);
        formData.append('memberNo', noticeData.memberNo);
        formData.append('category', noticeData.category);
        formData.append('openDepart', noticeData.openDepart);
        // formData.append('memberNo', memberNo);
        if (noticeData.file) {
            formData.append('file', noticeData.file);
        }

        try {
            const response = await fetch('http://127.0.0.1:8888/app/notice/insert', {
                method: 'POST',
                // headers: {
                //     "Content-type" : "application/json"
                // },
                // body: JSON.stringify(noticeData)
                body: formData
            });

            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }

            // 성공 시 다른 페이지로 이동 또는 알림 표시
            navigate('/notice/list');
        } catch (error) {
            console.error('공지사항 작성 실패:', error);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Label>
                제목:
                <Input
                    type="text"
                    name="title"
                    value={noticeData.title}
                    onChange={handleInputChange}
                />
            </Label>
            <Label>
                내용:
                <TextArea
                    name="content"
                    value={noticeData.content}
                    onChange={handleInputChange}
                />
            </Label>
            {/* <Label>
                작성자:{noticeData.memberNo}
                <Input
                    type="text"
                    name="memberNo"
                    value={noticeData.memberNo}
                    onChange={handleInputChange}
                    readOnly
                />
            </Label> */}
            <Label>이름 : {loginMemberVo.name}</Label>
            <Label>
                카테고리:
                <Input
                    type="text"
                    name="category"
                    value={noticeData.category}
                    onChange={handleInputChange}
                />
            </Label>
            <Label>
                공개 부서:
                <Input
                    type="text"
                    name="openDepart"
                    value={noticeData.openDepart}
                    onChange={handleInputChange}
                />
            </Label>
            <Label>
                파일첨부:
                <Input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
            </Label>
            {/* 기타 필드 */}
            <SubmitButton type="submit">저장</SubmitButton>
        </Form>
    );
};

export default NoticeWrite;