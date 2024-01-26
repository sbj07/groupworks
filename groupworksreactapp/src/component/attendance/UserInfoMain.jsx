import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EditMember from '../member/EditMember';

const StyledInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 2px solid black;
    border-radius: 30px;
    align-items: center;
    & > div {
        text-align: center;
    }
    
`;


const UserInfoMain = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();
    const [loginMemberVo, setLoginMemberVo] = useState([]);
    const [openModal, setOpenModal] = useState(false);

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

    const handleMemberEdit = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <StyledInfoDiv>
            <div><h2>[회원 정보]</h2></div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이름 : {loginMemberVo.name}</Form.Label>
                    <br />
                    <Form.Label>회사명(현재 회사번호) : {loginMemberVo.companyName}</Form.Label>
                    <br />
                        <Form.Label>부서명 : { loginMemberVo.departName }</Form.Label>
                    <br /> 
                        <Form.Label>직책명 : { loginMemberVo.positionName }</Form.Label>
                    <br />
            </Form.Group>
            {
                loginMemberVo.authNo === '1' &&
                    <>
                        <div>
                            <Button onClick={ () => {navigate(`/member/add`,{ state: { cNo : loginMemberVo.companyNo }})} }>구성원 추가</Button>
                            <Button variant='danger' onClick={ () => {navigate("/member/delete")} }>구성원 삭제</Button>
                        </div>
                    </>
            }
                <Button size='lg' onClick={handleMemberEdit}>개인정보 수정</Button>
                <EditMember memberNo={loginMemberNo} openModal={openModal} handleCloseModal={handleCloseModal} />
        </StyledInfoDiv>
    );
};

export default UserInfoMain;