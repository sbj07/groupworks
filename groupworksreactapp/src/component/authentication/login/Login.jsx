import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginDiv = styled.div`
    height: 100vh;
    background-color: #61dafb;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyeldLoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: 30%;
    height: 50%;
    background-color: #effcff;
    border: 1px solid white;
    border-radius: 10%;
    color: #2c5e6c;
    font-size: 2rem;
    & > label {
        color: black;
        font-size: 1rem;
    }
`;
const Login = () => {

    const navigate = useNavigate();
    const [memberVo , setMemberVo] = useState({
        id : "" ,
        pwd : ""
    });

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

    fetch("http://127.0.0.1:8888/app/api/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(memberVo)
    })
    .then( resp => resp.json() )
    .then( data => {
      if(data.msg === 'okay') {
        sessionStorage.setItem("loginMemberNo", data.loginMemberNo);
        navigate("/");
      }else if(data.errorMsg === 'NoData'){
        alert("로그인 실패, 조회결과가 없습니다.");
      }
    } )
  };

    return (
        <StyledLoginDiv>
            <StyeldLoginForm>
                <h1>로그인</h1>
                <br />
                <form onSubmit={handleLoginSubmit}>
                    <table>
                        <tr>
                            <td>
                                <label>ID</label>
                            </td>
                            <td>
                                <input type="text" name="id" placeholder='아이디를 입력하세요.' onChange={handleInputChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password</label>
                            </td>
                            <td>
                                <input type="password" name="pwd" placeholder='패스워드를 입력하세요.' onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button>Sign in</button>
                            </td>
                        </tr>
                    </table>
                </form>

                <label>계정이 없으시다면?</label>
                <Link to="/sign-up">이동하기</Link>
            </StyeldLoginForm>
        </StyledLoginDiv>
    );
};

export default Login;