import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {

    constructor(){
        super();
        console.log('[OrderSUmmary] willUpdate')
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
            });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A deliciuos burger with the current ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    clicked={this.props.purchaseCanceled}
                    buttonType={'Danger'}>CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinue}
                    buttonType={'Success'}>CONTINUE</Button>
            </Auxiliary>
        )

    }
}

export default orderSummary;