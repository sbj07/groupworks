import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 2px solid black;
    border-radius: 30px;
    & > div {
        text-align: center;
    }
`;
const UserInfoMain = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    
    const [loginMemberVo, setLoginMemberVo] = useState([]);
    const func = ( ) => {
        fetch(`http://127.0.0.1:8888/app/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            console.log(data.loginMemberVo);
            setLoginMemberVo(data.loginMemberVo);
            
        });
    }

    useEffect( () => {
        func();
    },[]);
    return (
        <StyledInfoDiv>
            <div><h2>[회원 정보]</h2></div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이름 : {loginMemberVo.name}</Form.Label>
                    <Form.Control size='sm' type="text" placeholder="수정시 입력후 하단에 수정버튼을 눌러주세요." name='name' />
                    <br />
                    <Form.Label>회사명(현재 회사번호) : {loginMemberVo.companyNo}</Form.Label>
                    <br />
                    <Form.Label>부서명 (현재 부서번호): {loginMemberVo.departNo}</Form.Label>
                    <br />
                    <Form.Label>직책 (현재 직책번호): {loginMemberVo.positionNo}</Form.Label>
            </Form.Group>
            
        </StyledInfoDiv>
    );
};

export default UserInfoMain;