import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSignUpDiv = styled.div`
    height: 100vh;
    background-color: #61dafb;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledSignUpForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 90vh;
    align-items: center;
    justify-content: center;
    background-color: #effcff;
    border: 1px solid transparents;
    border-radius: 15%;
`;

const SignUp = () => {
    const navigate = useNavigate();

    const [memberVo, setMemberVo] = useState({
        name: "",
        id : "",
        pwd: "",
        email: "",
        tel: "",
        address: "",
        departNo: "",
        companyNo: "",
        positionNo: ""
    });

    const [companyVo, setCompanyVo] = useState({
        name:"",
    });

    const handleInputCompany = (event) => {
        const {name , value} = event.target;
        
        setCompanyVo({
          ...companyVo ,
          [name] : value
        });
    }

    // 멤버 데이터 저장
    const handleInputChange = (event) => {
        const {name , value} = event.target;
    
        setMemberVo({
        ...memberVo ,
        [name] : value
        });
    };

    // 회사 등록
    const handleCompanyAdd = () => {
        fetch(`http://127.0.0.1:8888/app/api/company`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(companyVo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                const cNo = data.companyNo;
                setMemberVo({
                    ...memberVo ,
                    companyNo : cNo
                })
              alert("회사명 추가 완료 !");
            } else{
            alert("회사명 추가 실패");
            }
          })
    };

    // id 중복확인
    const handleIdCheck = () => {
        let idStr = memberVo.id;
        fetch(`http://127.0.0.1:8888/app/api/member/check-id?id=${idStr}`)
        .then( resp => resp.json() )
        .then( data => {
        if(data.msg === 'nope'){
            alert("사용가능한 아이디 입니다.");
        }else if(data.msg === 'okay') {
            alert("중복된 아이디입니다. 다른 아이디를 입력해주세요.");
        }
        });
    }

    //Join Api 호출
    const handleJoinSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8888/app/api/member/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberVo)
        })
        .then( resp => resp.json())
        .then( data => {
        if(data.msg === 'okay'){
            alert("회원가입 완료!");
            navigate("/login");
        }else{
            alert('회원가입 실패');
        }
        })
    };

    return (
        <StyledSignUpDiv>
            <StyledSignUpForm>
                <h1>회원가입</h1>
                <Form onSubmit={handleJoinSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이름</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="이름" name='name' onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="ID" name='id'onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            4글자 이상의 아이디를 입력후, 중복체크를 해주세요.
                        </Form.Text>
                        <Button size='sm' variant="primary" onClick={handleIdCheck}>
                            중복체크
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size='sm' type="password" placeholder="Password" name='pwd' onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control size='sm' type="email" placeholder="Email" name='email' onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>연락처</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="연락처" name='tel' onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>주소</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="주소" name='address' onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>회사명</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="회사명을 입력해주세요." name='name' onChange={handleInputCompany} />
                        <Button size='sm' variant="primary" onClick={handleCompanyAdd}>
                            회사 등록
                        </Button>
                    </Form.Group>
        
                    <Button variant="primary" type="submit">
                        가입하기
                    </Button>
                </Form>
            </StyledSignUpForm>
        </StyledSignUpDiv>
    );
};

export default SignUp;