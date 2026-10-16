import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Login from './component/authentication/login/Login';
import SignUp from './component/authentication/signup/SignUp';
import { ToastHost } from './component/common/Toast';

function App() {
  return (
    <BrowserRouter>
      <ToastHost />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='*' element={<Layout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
