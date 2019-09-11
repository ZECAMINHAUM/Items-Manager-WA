import React, { Component } from 'react';
import { Grid, Card, CardActions, Typography, TextField, Button, CardContent } from '@material-ui/core';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import './style.css'


class CardItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditEnable: false,
            data: {
                name: ''
            },
            errors: {
                name: '',
            }
        }
    }

    enableEdit = () => this.setState({ isEditEnable: true });

    disableEdit = () => this.setState({ isEditEnable: false, data: { name: '' }, errors: { name: '' } });

    handlerChange = e => {
        e.preventDefault();

        const { value } = e.target;
        this.setState({ data: { name: value.trim() } })
        let { name } = this.state.data;
        name = name.trim().length < 5 ? 'O Nome deve conter no mínimo 5 caracteres' : '';
    }

    updateItem = async e => {
        e.preventDefault();
        const { name } = this.state.data;
        const id = this.props.item.id;

        const data = { nome: name };

        await axios
            .post(`https://lucaaix174.pythonanywhere.com/item/atualizar/${id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })
            .then(res => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    deleteItem = async e => {
        e.preventDefault();
        const id = this.props.item.id;
        await axios
            .get(`https://lucaaix174.pythonanywhere.com/item/deletar/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(res => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }


    render() {
        const { isEditEnable, data, errors } = this.state;
        const { item } = this.props;
        return (
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    {!isEditEnable ? (
                        <div className="cardname">
                            <div>
                                <Typography variant="h6">
                                    {item.nome}
                                </Typography>
                            </div>
                            <div>
                                <Button className="buttonDelete" onClick={this.deleteItem}><DeleteForeverSharpIcon /></Button>
                            </div>
                        </div>
                    ) : null}
                    <form onSubmit={this.updateItem}>
                        {isEditEnable ? (
                            <TextField
                                type="text"
                                label="Nome"
                                name="name"
                                variant="outlined"
                                margin="normal"
                                defaultValue={data.name}
                                onChange={this.handlerChange} />
                        ) : null}
                        {errors.name.length > 0 ? (
                            <span style={{ color: 'red' }}>{errors.name}</span>
                        ) : null}
                        <CardActions>
                            {isEditEnable ? (<Button type="submit">Confirmar</Button>) : null}
                            {!isEditEnable ? (<Button onClick={this.enableEdit}>Editar</Button>) : null}
                            {isEditEnable ? (<Button onClick={this.disableEdit}>Cancelar</Button>) : null}
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default CardItem;