import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const getOrdersFromServerSuccess = (res) => {
    const fetchedOrders = [];
    for (let key in res.data) {
        fetchedOrders.push({
            id: key,
            ...res.data[key]
        });
    }
    return {
        type: actionTypes.GET_ORDERS_FROM_SERVER_SUCCESS,
        orders: fetchedOrders
    }
}

export const getOrdersFromServerFailed = () => {
    return {
        type: actionTypes.GET_ORDERS_FROM_SERVER_FAILED
    }
}

export const getOrdersFromServerStart = () => {
    return {
        type: actionTypes.GET_ORDERS_FROM_SERVER_START
    }
}

export const getOrdersFromServer = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        dispatch(getOrdersFromServerStart());
        axios.get('/orders.json' + queryParams)
            .then(res => dispatch(getOrdersFromServerSuccess(res)))
            .catch(err => dispatch(getOrdersFromServerFailed()))
    }
}

// Sync
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

// Sync
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

// Async
export const purchaseBurger = (orderData, token, userId) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth=' + token, orderData )
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
            .catch(err => dispatch(purchaseBurgerFail(err)))
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}