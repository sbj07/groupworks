import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormShell, SubmitButton } from '../common/FormLayout';
import { API_BASE } from '../../api/config';



const OrganEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [editedOrgan, setEditedOrgan] = useState(location.state?.selectedVo || {
        name: '',
        departNo: '',
        positionNo: '',
        tel: '',
        email: '',
        // ... 기타 필요한 필드 ...
    });

    const handleChange = (e) => {
        setEditedOrgan({ ...editedOrgan, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('orgNo', editedOrgan.orgNo);
        formData.append('memberNo', editedOrgan.memberNo);
        formData.append('name', editedOrgan.name);
        formData.append('id', editedOrgan.id);
        formData.append('email', editedOrgan.email);
        formData.append('tel', editedOrgan.tel);
        formData.append('address', editedOrgan.address);
        formData.append('departNo', editedOrgan.departNo);
        formData.append('companyNo', editedOrgan.companyNo);
        formData.append('positionNo', editedOrgan.positionNo);
        // 파일이 첨부되었는지 확인하고 추가
        if (editedOrgan.profile) {
            formData.append('file', editedOrgan.profile);
        }


        // 수정된 조직도 데이터를 서버로 전송합니다.
        fetch(`${API_BASE}/organ/edit`, {
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
            alert("조직도 수정 성공")
            navigate('/organ/list');
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("조직도 수정 실패")
        });
    };


        // 파일 첨부 처리
        const handleFileChange = (e) => {
            setEditedOrgan({ ...editedOrgan, file: e.target.files[0] });
        };

        
    return (
        <FormShell>
            <h2>조직도 수정</h2>
            <form onSubmit={handleSubmit}>
                <label>이름 {editedOrgan.name}
                    {/* <input
                        type="text"
                        name="name"
                        value={editedOrgan.name}
                        onChange={handleChange}
                    /> */}
                </label>
                <label>부서
                    <input
                        type="text"
                        name="departNo"
                        value={editedOrgan.departNo}
                        onChange={handleChange}
                    />
                </label>
                <label>직책
                    <input
                        type="text"
                        name="positionNo"
                        value={editedOrgan.positionNo}
                        onChange={handleChange}
                    />
                </label>
                <label>번호
                    <input
                        type="text"
                        name="tel"
                        value={editedOrgan.tel}
                        onChange={handleChange}
                    />
                </label>
                <label>이메일
                    <input
                        type="text"
                        name="email"
                        value={editedOrgan.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    프로필
                    <input
                        type="file"
                        name="profile"
                        onChange={handleFileChange}
                    />
                </label>
                <SubmitButton>저장</SubmitButton>
                </form>
            </FormShell>
    )
}

export default OrganEdit;