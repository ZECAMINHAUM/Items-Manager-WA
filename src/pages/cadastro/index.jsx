import React, { Component } from 'react';
import { 
    Grid,
    Container,
    Box,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

import FormCadastro from '../../components/formcadastro/index';

class Cadastro extends Component {

   constructor(props){
       super(props);
       this.state = {
            username: '',
            password: '',
            errors: {
                username: '',
                password: '',        
            },
            isValid: true
       };
   }

   handlerChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        this.setState({ [name]: value});

        let { errors } = this.state;
        
        switch(name){
            case 'username':
                errors.username = value.trim().length < 6 ? 'O nome deve conter no mínimo 6 caracteres' : '';
                break;
            case 'password':
                errors.password = value.trim().length < 6 ? 'A senha deve conter no mínimo 6 caracteres': '';
                break;    
            default: 
                break;
        }
        if(errors.username.length > 0 || errors.password.length > 0){
            this.setState({isValid: true});
        }else{
            this.setState({isValid: false});
        }

    }
    handlerSubmit = e => {
        e.preventDefault();
        const data = {nome: this.state.username, senha: this.state.password};
        axios
            .post('https://lucaaix174.pythonanywhere.com/registro',  data)
            .then(res => {
                if(res.data.success){
                    this.props.history.push('/login');
                }
            })
            .catch(err => {
                const { errors } = err.response.data;

                this.setState({ errors: { username: errors.nome, password: '' }});
            });

    }

    render(){
        const data = { username: this.state.username, password: this.state.password }; 
        const { errors, isValid } = this.state;
        return (
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
                                Cadastro
                            </Typography>
                            <FormCadastro 
                                data={data}
                                handlerChange={this.handlerChange}
                                handlerSubmit={this.handlerSubmit}
                                errors={errors}
                                isValid={isValid}/>
                            <Typography>
                                Já possui conta ?
                                <Link to="/login">Acesse</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </Container>
            </div>       
        );
    }
}

export default Cadastro;