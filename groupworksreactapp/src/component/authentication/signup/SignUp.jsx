import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthCard } from '../AuthLayout';
import { api } from '../../../api/http';
import { notify } from '../../common/Toast';
import { email, firstError, maxLength, memberId, password, required, selected, tel } from '../../../utils/validate';
import { API_BASE } from '../../../api/config';

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
       
        fetch(`${API_BASE}/api/member/list/depart`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setDepartList(data.departList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });

        fetch(`${API_BASE}/api/member/list/position`)
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
    

    const [companyDone, setCompanyDone] = useState(false);
    const [idChecked, setIdChecked] = useState(false);

    const handleInputCompany = (event) => {
        const {name , value} = event.target;
        setCompanyVo({ ...companyVo, [name] : value });
    }

    // 멤버 데이터 저장 (아이디를 바꾸면 중복체크를 다시 해야 한다)
    const handleInputChange = (event) => {
        const {name , value} = event.target;
        if (name === 'id') setIdChecked(false);
        setMemberVo({ ...memberVo, [name] : value });
    };

    // 회사 등록
    const handleCompanyAdd = async () => {
        const error = firstError([required(companyVo.name, '회사명'), maxLength(companyVo.name, 50, '회사명')]);
        if (error) {
            notify(error, 'error');
            return;
        }
        const result = await api.post('/api/company', { name: companyVo.name.trim() });
        if (result.ok && result.companyNo) {
            setMemberVo({ ...memberVo, companyNo: result.companyNo });
            setCompanyDone(true);
            notify('회사를 등록했습니다. 관리자 정보를 입력해주세요.', 'success');
        }
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
            notify('이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.', 'error');
        }
    };

    //Join Api 호출
    const handleJoinSubmit = async (event) => {
        event.preventDefault();
        const error = firstError([
            companyDone ? null : '회사명을 입력하고 회사 등록을 먼저 눌러주세요.',
            memberId(memberVo.id),
            idChecked ? null : '아이디 중복체크를 해주세요.',
            required(memberVo.name, '이름'),
            maxLength(memberVo.name, 30, '이름'),
            password(memberVo.pwd),
            email(memberVo.email),
            tel(memberVo.tel),
            maxLength(memberVo.address, 200, '주소'),
            selected(memberVo.departNo, '부서'),
            selected(memberVo.positionNo, '직책'),
        ]);
        if (error) {
            notify(error, 'error');
            return;
        }
        const result = await api.post('/api/member/sign-up', memberVo);
        if (result.ok) {
            notify('회원가입을 완료했습니다. 로그인해주세요.', 'success');
            navigate('/login');
        }
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
                            <Form.Control type="text" placeholder="회사명을 입력해주세요." name='name' maxLength={50} onChange={handleInputCompany} disabled={companyDone} />
                            <Button variant={companyDone ? 'success' : 'outline-primary'} onClick={handleCompanyAdd} disabled={companyDone}>{companyDone ? '등록됨' : '회사 등록'}</Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="영문, 숫자 4~20자" name='id' maxLength={20} onChange={handleInputChange} />
                            <Button variant={idChecked ? 'success' : 'outline-primary'} onClick={handleIdCheck}>{idChecked ? '확인됨' : '중복체크'}</Button>
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
