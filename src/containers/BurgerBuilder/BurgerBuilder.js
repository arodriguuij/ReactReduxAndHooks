import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export const burgerBuilder = props => {
    const [purchaseClicked, setPurchaseClicked] = useState(false);

    const dispatch = useDispatch();
    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const onGetBurgerFromServer = useCallback(() => dispatch(actions.getBurgerFromServer()), [dispatch]);
    const onPurchaseInit = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector(state => state.burgerBuilderReducer.ingredients);
    const price = useSelector(state => state.burgerBuilderReducer.totalPrice);
    const error = useSelector(state => state.burgerBuilderReducer.error);
    const isAuth = useSelector(state => state.authReducer.idToken !== null);

    useEffect(() => {
        onGetBurgerFromServer();
    }, [onGetBurgerFromServer]);

    const updatePutchaseableState = (updateIngredients) => {
        const sum = Object.keys(updateIngredients)
            .map(igKey => {
                return updateIngredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuth)
            setPurchaseClicked(true)
        else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const closeModalAndBackdropHandler = () => {
        setPurchaseClicked(false)
    }

    const purchaseContinueHandler = () => {
        onPurchaseInit();
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...ings
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ordered={purchaseHandler}
                    price={price}
                    ingredientAdded={(ingredientName) => onIngredientAdded(ingredientName)}
                    ingredientRemoved={(ingredientName) => onIngredientRemoved(ingredientName)}
                    disabled={disableInfo}
                    isAuth={isAuth}
                    disabledOrder={!updatePutchaseableState(ings)} />
            </Aux>
        );
        orderSummary = <OrderSummary
            totalPrice={price}
            purchaseContinue={() => purchaseContinueHandler(ings)}
            purchaseCanceled={closeModalAndBackdropHandler}
            ingredients={ings} />
    }

    return (
        <Aux>
            <Modal
                modalClosed={closeModalAndBackdropHandler}
                show={purchaseClicked}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

export default withErrorHandler(burgerBuilder, axios);
