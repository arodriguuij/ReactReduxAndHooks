import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const getDataFromServerSuccess = (ingredients) => {
    return {
        type: actionTypes.GET_BURGER_FROM_SERVER_SUCCESS,
        ingredients: ingredients
    }
}
export const getDataFromServerFailed = () => {
    return {
        type: actionTypes.GET_BURGER_FROM_SERVER_FAILED
    }
}
export const getBurgerFromServer = () => {
    return dispatch => {
        axios.get('https://reactmyburger3.firebaseio.com/ingredients.json')
            .then(res => dispatch(getDataFromServerSuccess(res.data)))
            .catch(err => dispatch(getDataFromServerFailed()))
    };
}
