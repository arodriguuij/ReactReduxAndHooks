import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';

const orderSummary = props => {
    const ingredientsSummary = Object.keys(props.ings)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ings[igKey]}
                </li>);
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A deliciuos burger with the current ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                clicked={props.purchaseCanceled}
                buttonType={'Danger'}>CANCEL</Button>
            <Button
                clicked={props.purchaseContinue}
                buttonType={'Success'}>CONTINUE</Button>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice
    }
};

export default connect(mapStateToProps)(orderSummary);
