import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { FormShell, SubmitButton } from '../common/FormLayout';
import { API_BASE } from '../../api/config';



const NoticeEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const notice = location.state ? location.state.notice : null; // notice가 없는 경우를 고려
    const [editedNotice, setEditedNotice] = useState(notice);
    const [categoryList, setCategoryList] = useState([]);
    const [departList, setDepartList] = useState([]);

    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [loginMemberVo, setLoginMemberVo] = useState([]);

    const handleChange = (e) => {
        setEditedNotice({ ...editedNotice, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('noticeNo', editedNotice.noticeNo);
        formData.append('memberNo', editedNotice.memberNo);
        formData.append('title', editedNotice.title);
        formData.append('content', editedNotice.content);
        formData.append('clickNo', editedNotice.clickNo);
        formData.append('category', editedNotice.category);
        formData.append('emergencyYn', editedNotice.emergencyYn);
        formData.append('openDepart', editedNotice.openDepart);
        formData.append('enrollDate', editedNotice.enrollDate);
        // 파일이 첨부되었는지 확인하고 추가
        if (editedNotice.file) {
            formData.append('file', editedNotice.file);
        }

        // 수정된 공지사항 데이터를 서버로 전송합니다.
        fetch(`${API_BASE}/notice/edit`, {
            method: 'POST',
            body: formData // JSON.stringify를 사용하지 않고, FormData를 직접 전달
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

    useEffect( () => {
        fetch(`${API_BASE}/notice/list/categoryList`)
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === "okay"){
                setCategoryList(data.categories);
                console.log(categoryList);
            }
        })

        fetch(`${API_BASE}/api/member/list/depart`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setDepartList(data.departList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });

        fetch(`${API_BASE}/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginMemberVo(data.loginMemberVo);
        });
        

    },[]);

    const CategoryListOption = () => {
        return (
            <Form.Select name="category" value={editedNotice.category} 
            onChange={handleChange} >
                <option value=''>카테고리</option>
                {
                    categoryList.map( (data) => {
                        return <option key={data.categoryCon} value={data.categoryNo} >{data.categoryCon}</option>;
                    })
                }
            </Form.Select>
        );
    };

    const DepartListOption = () => {
        return (
            <Form.Select name="openDepart" value={editedNotice.openDepart} 
            onChange={handleChange} >
                <option value=''>공개부서</option>
                {
                    departList.map( (data) => {
                        return <option key={data.name} value={data.no} >{data.name}</option>;
                    })
                }
            </Form.Select>
        );
    };


    
    // 파일 첨부 처리
    const handleFileChange = (e) => {
        setEditedNotice({ ...editedNotice, file: e.target.files[0] });
    };

    if (!editedNotice) return <div>로딩 중...</div>;

    return (
        <FormShell>
            <h1>공지사항 수정</h1>
            <form onSubmit={handleSubmit}>
                <label>작성자<span className="readonly">{loginMemberVo.name}</span></label>
                <label>
                    제목
                    <input
                        type="text"
                        name="title"
                        value={editedNotice.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    내용
                    <textarea
                        name="content"
                        value={editedNotice.content}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    카테고리
                    <CategoryListOption />
                  
                </label>
                <label>
                    공개 부서
                    <DepartListOption />
                    {/* <input
                        type="text"
                        name="openDepart"
                        value={editedNotice.openDepart}
                        onChange={handleChange}
                    /> */}
                </label>
                <label>
                    파일첨부
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </label>
                <SubmitButton>저장</SubmitButton>
            </form>
        </FormShell>
    );
};

export default NoticeEdit;
