import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './style.css';

import Home from './pages/home/index';
import Login from './pages/login/index';
import Cadastro from './pages/cadastro/index';
import CriarItem from './pages/criaritem/index';
import { deleteToken } from './utils/auth';

if (localStorage.Token) {
  
    const decoded = jwt_decode(localStorage.Token);
  
    const currentTime = Date.now() / 1000;
  
    if (decoded.exp < currentTime) {
        deleteToken();
        window.location.href = '/login';
    }
}
  

const App = () => (
    <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" exact component={Cadastro} />
        <Route path="/criaritem" exact component={CriarItem} />
    </BrowserRouter>
)

export default App;