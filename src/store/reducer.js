import * as actions from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
            }
        case (actions.REMOVE_INGREDIENT):
            if (state.ingredients[action.payload.ingredientName] > 0) {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                    },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
                }
            }
            return state
        default:
            return state;
    }
}

export default reducer;


