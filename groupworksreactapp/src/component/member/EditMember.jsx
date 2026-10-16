import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import AppModal from '../common/AppModal';
import { API_BASE } from '../../api/config';
import { notify } from '../common/Toast';
import { email, firstError, maxLength, memberId, password, required, tel } from '../../utils/validate';

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
        const error = firstError([
            'name' in editVo ? required(editVo.name, '이름') || maxLength(editVo.name, 30, '이름') : null,
            'id' in editVo ? memberId(editVo.id) : null,
            editVo.pwd ? password(editVo.pwd, '새 비밀번호') : null,
            email(editVo.email),
            tel(editVo.tel),
            'annual' in editVo && !/^\d{1,3}$/.test(String(editVo.annual)) ? '연차는 0~999 사이 숫자로 입력해주세요.' : null,
        ]);
        if (error) {
            notify(error, 'error');
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
                notify("회원정보를 수정했습니다.", "success");
                setTimeout(() => window.location.reload(), 600);
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
                {FIELDS.filter(f => f.name !== 'annual' || loginVo.authNo === '1').map(f => (
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
