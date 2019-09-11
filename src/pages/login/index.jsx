import React, { Component } from 'react';
import { 
    Grid,
    Container,
    Box,
    Typography
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setToken, getToken } from '../../utils/auth';

import './style.css';

import FormLogin from '../../components/formlogin/index';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username: '', 
            password: '',
            errors: {
                username: '', 
                password: '',
            } 
        };
    }


    handlerChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({ [name]: value.trim()});

    }
    handlerSubmit = e => {
        e.preventDefault();
        const data = { nome: this.state.username, senha: this.state.password };

        axios
            .post('https://lucaaix174.pythonanywhere.com/login', data)
            .then(res => {
                const { data } = res;
                setToken(data.token);
                this.props.history.push('/');

            })
            .catch(err =>  {
                const { errors } = err.response.data;
                this.setState({ errors: { username: errors.nome, password: '' }})
            })

    }

    render (){
        const { username, password, errors } = this.state;
        const data = { username, password };
        const token = getToken();
        return !token ? (
            <div className="content">
                <Container maxWidth="sm">
                    <Box mt={7} mb={12}>
                        <Grid
                            className="grid"
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <Typography className="title" variant="h1" component="h2">
                                Login
                            </Typography>
                            <FormLogin 
                                data={data}
                                handlerChange={this.handlerChange}
                                handlerSubmit={this.handlerSubmit}
                                errors={errors}/>

                            <Typography>
                                Não possui conta ?
                                <Link to="/cadastro">Cadastrar</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </Container>
            </div>        
        ):(
            <Redirect to="/" />
        );
    }
}

export default Login;