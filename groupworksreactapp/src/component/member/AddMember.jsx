import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api/http';
import { notify } from '../common/Toast';
import { firstError, maxLength, memberId, password, required, selected } from '../../utils/validate';
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

// onDone 을 주면 인원관리의 '인원추가' 모달 안에서 쓰고, 끝나면 onDone 을 부른다
const AddMember = ({ onDone, onCancel }) => {
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


    const [idChecked, setIdChecked] = useState(false);
    const navigate = useNavigate();

    // 멤버 데이터 저장 (아이디를 바꾸면 중복체크를 다시 해야 한다)
    const handleInputChange = (event) => {
        const {name , value} = event.target;
        if (name === 'id') setIdChecked(false);
        setMemberVo({ ...memberVo, [name] : value });
    };

    // id 중복확인
    const handleIdCheck = async () => {
        const error = memberId(memberVo.id);
        if (error) {
            notify(error, 'error');
            return;
        }
        const result = await api.get(`/api/member/check-id?id=${encodeURIComponent(memberVo.id)}`);
        if (result.msg === 'nope') {
            setIdChecked(true);
            notify('사용할 수 있는 아이디입니다.', 'success');
        } else if (result.msg === 'okay') {
            setIdChecked(false);
            notify('이미 사용 중인 아이디입니다.', 'error');
        }
    };

    //Add Api 호출 (회사는 서버에서 관리자 회사로 정한다)
    const handleJoinSubmit = async (event) => {
        event.preventDefault();
        const error = firstError([
            required(memberVo.name, '이름'),
            maxLength(memberVo.name, 30, '이름'),
            memberId(memberVo.id),
            idChecked ? null : '아이디 중복체크를 해주세요.',
            password(memberVo.pwd, '초기 비밀번호'),
            selected(memberVo.departNo, '부서'),
            selected(memberVo.positionNo, '직책'),
        ]);
        if (error) {
            notify(error, 'error');
            return;
        }
        const result = await api.post('/api/member/add', memberVo);
        if (result.ok) {
            notify(`${memberVo.name}님을 구성원으로 추가했습니다.`, 'success');
            if (onDone) onDone();
            else navigate('/hr/members');
        }
    };

    const form = (
                <Form onSubmit={handleJoinSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="addName">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" placeholder="이름" name='name' onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addId">
                        <Form.Label>아이디</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="영문, 숫자 4~20자" name='id' maxLength={20} onChange={handleInputChange} />
                            <Button variant={idChecked ? 'success' : 'outline-primary'} onClick={handleIdCheck}>{idChecked ? '확인됨' : '중복체크'}</Button>
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
                        <Button variant="outline-secondary" onClick={() => (onCancel ? onCancel() : window.history.back())}>취소</Button>
                        <Button variant="primary" type="submit">추가</Button>
                    </div>
                </Form>
    );

    if (onDone) return form;

    return (
        <StyledSignUpDiv>
            <StyledSignUpForm>
                <h1>구성원 추가</h1>
                <p className="text-muted mb-4">새 구성원의 계정을 만들고 부서와 직책을 지정합니다.</p>
                {form}
            </StyledSignUpForm>
        </StyledSignUpDiv>
    );
};

export default AddMember;