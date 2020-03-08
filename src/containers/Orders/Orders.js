import React, { Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onGetOrdersFromServer(this.props.idToken);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.ords.map(order => (
                < Order
                    ingredients={order.ingredients}
                    price={order.totalPrice}
                    key={order.id} />
            ));
        }
        
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ords: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        idToken: state.authReducer.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrdersFromServer: (token) => dispatch(orderActions.getOrdersFromServer(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));