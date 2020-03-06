import React, { Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
//import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('/orders.json');
            //const orders = Object.values(response.data);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    id: key,
                    ...response.data[key]
                });
            }
            //console.log(fetchedOrders);
            this.setState({ orders: fetchedOrders, loading: false })
        } catch (error) {
            console.log(error);
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    console.log(order.ingredients)
                    return <Order ingredients={order.ingredients} price={order.totalPrice} key={order.id} />
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);