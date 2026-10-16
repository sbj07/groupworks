import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API_BASE } from '../../api/config';

const StyledSignUpDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledSignUpForm = styled.div`
    width: 100%;
    max-width: 560px;
    padding: 8px 0;

    & > h1 {
        margin-bottom: 20px;
    }
`;

const AddMember = () => {
    const location = useLocation();
    const cNo = location.state?.cNo;
    const [departList, setDepartList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    useEffect( () => {
        fetch(`${API_BASE}/api/member/list/depart`)
        .then( (resp) => { return resp.json() })
        .then( (data) => {
          setDepartList(data.departList);
        });
    
        fetch(`${API_BASE}/api/member/list/position`)
        .then( (resp) => { return resp.json() })
        .then( (data) => {
          setPositionList(data.positionList);
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

    const [memberVo, setMemberVo] = useState({
        name: "",
        id : "",
        pwd: "",
        departNo: "",
        companyNo: cNo,
        positionNo: ""
    });


    // 멤버 데이터 저장
    const handleInputChange = (event) => {
        const {name , value} = event.target;
    
        setMemberVo({
        ...memberVo ,
        [name] : value
        });
    };

    // id 중복확인
    const handleIdCheck = () => {
        let idStr = memberVo.id;
        fetch(`${API_BASE}/api/member/check-id?id=${idStr}`)
        .then( resp => resp.json() )
        .then( data => {
        if(data.msg === 'nope'){
            alert("사용가능한 아이디 입니다.");
        }else if(data.msg === 'okay') {
            alert("중복된 아이디입니다. 다른 아이디를 입력해주세요.");
        }
        });
    }

    //Add Api 호출
    const handleJoinSubmit = (event) => {
        event.preventDefault();
        fetch(`${API_BASE}/api/member/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberVo)
        })
        .then( resp => resp.json())
        .then( data => {
        if(data.msg === 'okay'){
            alert("구성원추가 완료!");
            window.location.reload();
        }else{
            alert('구성원 추기 실패');
        }
        })
    };

    return (
        <StyledSignUpDiv>
            <StyledSignUpForm>
                <h1>구성원 추가</h1>
                <p className="text-muted mb-4">새 구성원의 계정을 만들고 부서와 직책을 지정합니다.</p>
                <Form onSubmit={handleJoinSubmit}>
                    <Form.Group className="mb-3" controlId="addName">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" placeholder="이름" name='name' onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addId">
                        <Form.Label>아이디</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="4글자 이상" name='id' onChange={handleInputChange} />
                            <Button variant="outline-primary" onClick={handleIdCheck}>중복체크</Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addPwd">
                        <Form.Label>초기 비밀번호</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호" name='pwd' autoComplete="new-password" onChange={handleInputChange} />
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

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="outline-secondary" onClick={() => window.history.back()}>취소</Button>
                        <Button variant="primary" type="submit">추가</Button>
                    </div>
                </Form>
            </StyledSignUpForm>
        </StyledSignUpDiv>
    );
};

export default AddMember;