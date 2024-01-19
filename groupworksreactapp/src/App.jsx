import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import RouteSet from './RouteSet';
import Login from './component/authentication/login/Login';
import SignUp from './component/authentication/signup/SignUp';


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
