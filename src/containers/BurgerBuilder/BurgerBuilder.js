import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchaseClicked: false
    }

    componentDidMount() {
        console.log(this.props); 
        this.props.onGetBurgerFromServer();
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

    purchaseContinueHandler = () => {
        debugger;
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

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
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error  
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onGetBurgerFromServer: () => dispatch(actions.getBurgerFromServer()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
