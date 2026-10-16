import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input, SubmitButton } from '../common/FormLayout';
import { API_BASE } from '../../api/config';

const OrganWrite = () => {
    const [organData, setOrganData] = useState({
        name: '',
        departNo: '',
        positionNo: '',
        tel: '',
        email: '',
        // departNo: '',
        // positionNo: '',
    });

    const handleChange = (e) => {
        setOrganData({ ...organData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleProfileChange = (e) => {
        // 파일이 선택되었을 때 상태 업데이트
        if (e.target.files.length > 0) {
            setOrganData({ ...organData, profile: e.target.files[0] });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append('orgNo', organData.orgNo);
        formData.append('memberNo', organData.memberNo);
        formData.append('name', organData.name);
        formData.append('profile', organData.profile);
        formData.append('id', organData.id);
        formData.append('address', organData.address);
        formData.append('departNo', organData.departNo);
        // formData.append('companyNo', organData.companyNo);
        formData.append('positionNo', organData.positionNo);
        formData.append('tel', organData.tel);
        formData.append('email', organData.email);

        console.log(organData);
        
        // navigate('/organ/list'); // 작성 완료 후 목록 페이지로 이동
        try{
            console.log('전송 시작', organData);
            const response = await fetch(`${API_BASE}/organ/insert`, {
                method : 'POST',
                body : formData,
            });
            const responseBody = await response.json();
            console.log(responseBody);
            if(!response.ok){
                throw new Error('서버 오류 발생');
            }
            navigate('/organ/list');
        }catch(error){
            console.error('조직도 작성 실패 : ', error)
        }
    };

    return (
            <Form onSubmit={handleSubmit}>
                <Label>
                    이름
                    <Input
                        type="text"
                        name='name'
                        value={organData.name}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    직원 번호
                    <Input
                        type="text"
                        name='memberNo'
                        value={organData.memberNo}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    아이디
                    <Input
                        type="text"
                        name='id'
                        value={organData.id}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    부서
                    <Input
                        type="text"
                        name='departNo'
                        value={organData.departNo}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    직책
                    <Input
                        type="text"
                        name='positionNo'
                        value={organData.positionNo}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    전화번호
                    <Input
                        type="text"
                        name='tel'
                        value={organData.tel}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    이메일
                    <Input
                        type="text"
                        name='email'
                        value={organData.email}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                프로필
                <Input
                    type="file"
                    name="profile"
                    onChange={handleProfileChange}
                />
            </Label>
                <SubmitButton>저장</SubmitButton>
            </Form>
    );
};

export default OrganWrite;
