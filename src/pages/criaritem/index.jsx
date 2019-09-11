import React, { Component } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import './style.css'

import Header from '../../components/header/index';

class CriarItem extends Component {

    constructor(props){
        super(props);
        this.state = { 
            data: {
                name: '',
            },
            errors: {
                name: '',
            }
        }
    }

    criarItem = async e => {
        e.preventDefault();
        const data = { nome: this.state.data.name };
        await axios
                .post('https://lucaaix174.pythonanywhere.com/item/adicionar',data,
                { 
                        headers: {
                            Authorization : `Bearer ${getToken()}`
                        }
                    }
                )
                .then(res => {
                    if(res.data.success){
                        this.props.history.push('/');
                    }
                })
                .catch(err => {
                    const { data } = err.response;
                    console.log(data);
                });
    }

    handlerChange = e => { 
        e.preventDefault();
        
        const { value } = e.target;
        let {errors } = this.state;
        this.setState({ data: { name: value }})
        
        errors.name = value.length < 5 ? 'O nome deve conter no mínimo 5 caracteres' : ''
    }

    render(){
        const { errors, data } = this.state;
        return (
            <div>
                <Header title="Cadastrar Item"/>
                <Grid
                    className="Gridcontainer"
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: '5%'}}>
                    <form onSubmit={this.criarItem}>
                        <Grid 
                            container
                            item xs={12}
                            direction="column"
                            alignItems="center">
                            <Typography className="titlecreate" variant="h3">
                                Novo Item
                            </Typography>
                        </Grid>
                        <Grid 
                            container
                            item xs={12}
                            direction="column"
                            alignItems="center">
                            <TextField 
                                label="Nome"
                                type="text"
                                name="name"
                                margin="normal"
                                variant="outlined"           
                                defaultValue={data.name}
                                onChange={this.handlerChange}/>
                                {errors.name.length > 0 ? (
                                    <span style={{color: 'red'}}>{errors.name}</span>
                                ):null}
                        </Grid>
                        <Grid 
                            className="buttonGrid"
                            container
                            direction="column"
                            alignItems="center" 
                            item xs={12}
                            style={{ marginTop: '10px', marginBottom: '10px'}}>
                            <Button className="bcriar" type="submit">Criar</Button>
                        </Grid>
                    </form>
                </Grid>
            </div>
        );
    }

}

export default CriarItem;
