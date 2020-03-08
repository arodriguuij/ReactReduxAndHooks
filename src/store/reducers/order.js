import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const getOrdersFromServerStart = (state) => updateObject(state, { loading: true })
const getOrdersFromServerSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}
const getOrdersFromServerFailed = (state) => updateObject(state, { loading: false });
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}
const purchaseBurgerFail = (state) => {
    return updateObject(state, { loading: false })
}
const purchaseBurgerStart = (state) => {
    return updateObject(state, { loading: false })
}
const purchaseInit = (state) => {
    debugger;
    return updateObject(state, { purchased: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionType.GET_ORDERS_FROM_SERVER_START): return getOrdersFromServerStart(state)
        case (actionType.GET_ORDERS_FROM_SERVER_SUCCESS): return getOrdersFromServerSuccess(state, action)
        case (actionType.GET_ORDERS_FROM_SERVER_FAILED): return getOrdersFromServerFailed(state)
        case (actionType.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action)
        case (actionType.PURCHASE_BURGER_FAIL): return purchaseBurgerFail(state)
        case (actionType.PURCHASE_BURGER_START): return purchaseBurgerStart(state)
        case (actionType.PURCHASE_INIT): return purchaseInit(state)
        default: return state
    }
}

export default reducer;