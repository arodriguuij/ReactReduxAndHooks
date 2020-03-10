import React, { useEffect } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from '../../store/actions/index';

const orders = (props) => {
    const { onGetOrdersFromServer, idToken, userId } = props;

    useEffect(() => {
        onGetOrdersFromServer(idToken, userId);
    }, [onGetOrdersFromServer, idToken, userId]);

    let orders = <Spinner />;
    if (!props.loading) {
        orders = props.ords.map(order => (
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

const mapStateToProps = state => {
    return {
        ords: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        idToken: state.authReducer.idToken,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrdersFromServer: (token, userId) => dispatch(orderActions.getOrdersFromServer(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));