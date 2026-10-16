import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import App from './App';
import { installFetchInterceptor } from './api/http';

// 모든 백엔드 요청에 로그인 토큰과 공통 오류 안내를 붙인다
installFetchInterceptor();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
