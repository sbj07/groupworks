import React from 'react';
import styled from 'styled-components';

const StyledLoginDiv = styled.div`
    height: 100vh;
    background-color: #61dafb;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyeldLoginForm = styled.div`
    text-align: center;
    width: 30%;
    height: 50%;
    background-color: #effcff;
    border: 1px solid #2c5e6c;
    border-radius: 30px;
    color: #2c5e6c;
    font-size: 2rem;
`;
const Login = () => {
    return (
        <StyledLoginDiv>
            <StyeldLoginForm>
                <h1>로그인</h1>
                <form onSubmit={console.log("ok")}>
                    <input type="text" name="id" placeholder='아이디' />

                </form>
            </StyeldLoginForm>
        </StyledLoginDiv>
    );
};

export default Login;