import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthCard } from '../AuthLayout';
import { API_BASE } from '../../../api/config';

const Login = () => {

    const navigate = useNavigate();
    const [memberVo , setMemberVo] = useState({
        id : "" ,
        pwd : ""
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setMemberVo( {
            ...memberVo ,
            [name] : value
        } );
    };

    // API 호출
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        fetch(`${API_BASE}/api/member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberVo)
        })
        .then( resp => resp.ok ? resp.json() : { msg: 'nope' } )
        .then( data => {
            if(data.msg === 'okay') {
                sessionStorage.setItem("loginMemberNo", data.loginMemberNo);
                navigate("/");
            } else {
                setError("아이디 또는 비밀번호를 확인해주세요.");
            }
        } )
        .catch( () => setError("서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.") )
        .finally( () => setLoading(false) );
    };

    return (
        <AuthLayout>
            <AuthCard className="gw-card">
                <h1>로그인</h1>
                <p className="sub">GroupWorks 계정으로 로그인하세요.</p>

                {error && <Alert variant="danger" className="py-2">{error}</Alert>}

                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="loginId">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control type="text" placeholder="아이디를 입력하세요" name='id' autoComplete="username" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="loginPwd">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호를 입력하세요" name='pwd' autoComplete="current-password" onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? '로그인 중...' : '로그인'}
                    </Button>
                </Form>

                <div className="foot">
                    처음 이용하시나요? <Link to="/sign-up">회사 등록하기</Link>
                </div>
            </AuthCard>
        </AuthLayout>
    );
};

export default Login;
