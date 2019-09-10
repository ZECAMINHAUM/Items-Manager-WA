import React, { Component } from 'react';
import {
    Grid,
    TextField, 
    Button 
} from '@material-ui/core';
 
class LoginForm extends Component{

    render(){
        const { errors, handlerSubmit, handlerChange, data } = this.props;
        return (
            <form onSubmit={handlerSubmit}>
                <Grid 
                    container
                    item xs={12}
                    direction="column"
                    alignItems="center">
                    <TextField
                        label="Usuário"
                        type="text"
                        name="username"
                        margin="normal"
                        variant="outlined"           
                        defaultValue={data.name}
                        onChange={handlerChange}/>
                    {errors.username.length > 0 ? (
                        <span style={{color: 'red'}}>{errors.username}</span>
                    ):null}
                        
                </Grid>
                <Grid 
                    container
                    direction="column"
                    alignItems="center"
                    item xs={12}>
                    <TextField
                        label="Senha"
                        type="password"
                        name="password"
                        margin="normal"
                        variant="outlined"
                        defaultValue={data.password}
                        onChange={handlerChange}/>
                    {errors.password.length > 0 ? (
                        <span style={{color: 'red'}}>{errors.password}</span>
                    ):null}
                       
                </Grid>
                <Grid 
                    className="buttonGrid"
                    container
                    direction="column"
                    alignItems="center" 
                    item xs={12}
                    style={{ marginTop: '10px', marginBottom: '10px'}}>
                    <Button 
                        size="large" 
                        type="submit" 
                        style={{ background: '#258ea6', color: 'white' }}>
                        Login
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default LoginForm;