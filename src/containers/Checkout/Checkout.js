import React from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = props => {
    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />;
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    onCheckoutCancel={checkoutCancelHandler}
                    onCheckoutContinue={checkoutContinueHandler}
                    ingredients={props.ings} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
                {/*                     //In order to be able to pass props, we are using render
                    render={(props) => (
                        <ContactData
                            ingredients={this.props.ings}
                            price={this.props.price} {...props}/>
                    )} /> */}
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(checkout);