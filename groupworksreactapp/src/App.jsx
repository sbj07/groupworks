import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import Login from './component/authentication/login/Login';
import SignUp from './component/authentication/signup/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='*' element={<Layout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
