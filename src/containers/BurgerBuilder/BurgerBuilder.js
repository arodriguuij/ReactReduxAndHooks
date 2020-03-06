import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchaseClicked: false,
        loading: false,
        error: false
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://reactmyburger3.firebaseio.com/ingredients.json');
            this.setState({ ingredients: response.data })
        } catch (error) {
            this.setState({ error: true })
            console.log(error);
        }
    }

    updatePutchaseableState(updateIngredients) {
        const sum = Object.keys(updateIngredients)
            .map(igKey => {
                return updateIngredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchaseClicked: true });
    }

    closeModalAndBackdropHandler = () => {
        this.setState({ purchaseClicked: false })
    }

    purchaseContinueHandler = (ingredients) => {
        let queryString = Object.keys(ingredients).map(key => key + '=' + ingredients[key]).join('&');
        queryString = queryString + ('&price=' + this.props.price);

        this.props.history.push({
            pathname: 'checkout',
            search: queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        ingredientAdded={(ingredientName) => this.props.onIngredientAdded(ingredientName)}
                        ingredientRemoved={(ingredientName) => this.props.onIngredientRemoved(ingredientName)}
                        disabled={disableInfo}
                        disabledOrder={!this.updatePutchaseableState(this.props.ings)} />
                </Aux>
            );
            orderSummary = <OrderSummary
                totalPrice={this.props.price}
                purchaseContinue={() => this.purchaseContinueHandler(this.props.ings)}
                purchaseCanceled={this.closeModalAndBackdropHandler}
                ingredients={this.props.ings} />
        }

        if (this.state.loading)
            orderSummary = <Spinner />;

        return (
            <Aux>
                <Modal
                    modalClosed={this.closeModalAndBackdropHandler}
                    show={this.state.purchaseClicked}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actions.ADD_INGREDIENT, payload: { ingredientName: ingredientName } }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actions.REMOVE_INGREDIENT, payload: { ingredientName: ingredientName } })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
