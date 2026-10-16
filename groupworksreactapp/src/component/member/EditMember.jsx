import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import AppModal from '../common/AppModal';
import { API_BASE } from '../../api/config';

const FIELDS = [
    { name: 'name', label: '이름', type: 'text' },
    { name: 'id', label: '아이디', type: 'text' },
    { name: 'pwd', label: '새 비밀번호', type: 'password', placeholder: '바꿀 때만 입력' },
    { name: 'email', label: '이메일', type: 'email' },
    { name: 'tel', label: '연락처', type: 'text' },
    { name: 'annual', label: '연차', type: 'number' },
];

const EditMember = ( {memberNo , openModal, handleCloseModal} ) => {
    const [loginVo, setLoginVo] = useState({});
    // 바뀐 항목만 모아서 보낸다
    const [editVo, setEditVo] = useState({ no : memberNo });

    useEffect( () => {
        if (!memberNo || !openModal) return;
        fetch(`${API_BASE}/api/member/${memberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginVo(data.loginMemberVo ?? {});
        });
        setEditVo({ no: memberNo });
    }, [memberNo, openModal]);

    const changed = Object.keys(editVo).length > 1;

    const handleSubmit = (event) => {
        event?.preventDefault();
        if (!changed) {
            handleCloseModal();
            return;
        }
        fetch(`${API_BASE}/api/member/`, {
            method: "PUT" ,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editVo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay'){
                alert("회원정보를 수정했습니다.");
                window.location.reload();
            } else {
                alert("회원정보 수정에 실패했습니다. 다시 시도해주세요.");
            }
        })
    };

    const handleInputChange = (event) => {
        const {name , value} = event.target;
        setEditVo({
            ...editVo ,
            [name] : value
        });
    };

    const valueOf = (name) => editVo[name] ?? (name === 'pwd' ? '' : loginVo[name] ?? '');

    return (
        <AppModal
            isOpen={openModal}
            onClose={handleCloseModal}
            title="개인정보 수정"
            subtitle="바꾼 항목만 저장됩니다."
            width={460}
            footer={<>
                <button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}>취소</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!changed}>저장</button>
            </>}
        >
            <Form onSubmit={handleSubmit}>
                {FIELDS.map(f => (
                    <Form.Group className="mb-3" controlId={`edit-${f.name}`} key={f.name}>
                        <Form.Label>{f.label}</Form.Label>
                        <Form.Control type={f.type} name={f.name} value={valueOf(f.name)} placeholder={f.placeholder} onChange={handleInputChange} autoComplete={f.type === 'password' ? 'new-password' : undefined} />
                    </Form.Group>
                ))}
            </Form>
        </AppModal>
    );
};

export default EditMember;
