import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthCard } from '../AuthLayout';

const SignUp = () => {
    const navigate = useNavigate();
    const [departList, setDepartList] = useState([]);
    const [positionList, setPositionList] = useState([]);

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

    useEffect( () => {
       
        fetch("http://127.0.0.1:8888/app/api/member/list/depart")
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setDepartList(data.departList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });

        fetch("http://127.0.0.1:8888/app/api/member/list/position")
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setPositionList(data.positionList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });
    }, []);

    // 옵션 리스트 생성
    const ListSelectBox = ( {prop, list} ) => {
        return (
            <Form.Select name={`${prop}No`} value={memberVo[`${prop}No`]} onChange={handleInputChange} >
                <option value=''>목록</option>
            {
                list.map( (data) => {
                    return <option key={data.name} value={data.no}>{data.name}</option>;
                } )
            }
            </Form.Select>
        );
    };
    

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
        <AuthLayout>
            <AuthCard className="gw-card" $wide>
                <h1>회사 등록</h1>
                <p className="sub">관리자 계정을 만들고 회사를 등록합니다.</p>

                <Form onSubmit={handleJoinSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>회사명</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="회사명을 입력해주세요." name='name' onChange={handleInputCompany} />
                            <Button variant="outline-primary" onClick={handleCompanyAdd}>회사 등록</Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="4글자 이상" name='id' onChange={handleInputChange} />
                            <Button variant="outline-primary" onClick={handleIdCheck}>중복체크</Button>
                        </InputGroup>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>이름</Form.Label>
                            <Form.Control type="text" placeholder="이름" name='name' onChange={handleInputChange} />
                        </Col>
                        <Col>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호" name='pwd' onChange={handleInputChange} />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder="name@company.com" name='email' onChange={handleInputChange}/>
                        </Col>
                        <Col>
                            <Form.Label>연락처</Form.Label>
                            <Form.Control type="text" placeholder="01012345678" name='tel' onChange={handleInputChange} />
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>주소</Form.Label>
                        <Form.Control type="text" placeholder="주소" name='address' onChange={handleInputChange} />
                    </Form.Group>

                    <Row className="mb-4">
                        <Col>
                            <Form.Label>부서</Form.Label>
                            <ListSelectBox prop="depart" list={departList} />
                        </Col>
                        <Col>
                            <Form.Label>직책</Form.Label>
                            <ListSelectBox prop="position" list={positionList} />
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        가입하기
                    </Button>
                </Form>

                <div className="foot">
                    이미 계정이 있나요? <Link to="/login">로그인</Link>
                </div>
            </AuthCard>
        </AuthLayout>
    );
};

export default SignUp;
