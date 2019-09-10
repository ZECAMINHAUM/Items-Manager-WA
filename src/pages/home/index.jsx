import React, { Component } from 'react';
import {
    Grid,
    Typography
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { getToken, deleteToken } from '../../utils/auth';
import axios from 'axios';

import Header from '../../components/header/index';
import CardItem from '../../components/carditem/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: '',
        };
        this.getItems();
    }

    getItems = async () => {
        await axios
            .get('http://lucaaix174.pythonanywhere.com/items',
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(res => {
                const { items } = res.data;
                if (items.length == 0) {
                    this.setState({ items: items, text: 'Nenhum item cadastrado' });
                } else {
                    this.setState({ items: items });
                }
            })
            .catch(err => {
                const { data } = err.response;
                if (data !== null) {
                    if (data.msg === 'Token has expired') {
                        deleteToken();
                    }
                }
            });
    }
    render() {
        const { items, text } = this.state;
        const token = getToken();
        return token ? (
            <div>
                <Header title="Lista de Items" />
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                    style={{ marginTop: '1%' }}>
                    {items.length > 0 ?
                        items.map(item => (
                            <Grid item xs={6} lg={4} md={4} sm={4} key={item.id}>
                                <CardItem
                                    item={item} />
                            </Grid>
                        )) : (
                            <Typography variant="h5">
                                {text}
                            </Typography>
                        )}

                </Grid>
            </div>
        ) : (
                <Redirect to="/login" />
            )
    }
}

export default Home;