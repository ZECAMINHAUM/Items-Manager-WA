import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken, deleteToken } from '../../utils/auth';
import './style.css';

const logout = async () => {
        await axios
            .get('https://lucaaix174.pythonanywhere.com/logout',
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(res => {
                const { success } = res.data;
                if (success) {
                    deleteToken();
                    window.location.reload();
                }
            })
            .catch(err => {
                const { data } = err.response;
                console.log(data);
            })
}

const Header = (props) => (
    <header
        className="header">
        <div className="title">
            <Typography className="titletext" variant="h4">
                {props.title}
            </Typography>
        </div>
        <div>
            <Link className="bcadastrar" to="/criaritem">
                Cadastrar Item
            </Link>
            <Button onClick={logout}>
                <Typography className="blogout">
                    Log out
                </Typography>
            </Button>

           
        </div>
    </header>
)

export default Header;