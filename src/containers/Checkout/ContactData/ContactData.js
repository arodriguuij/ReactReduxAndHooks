import React, { useState } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility'

const contactData = props => {
    const [formIsValidState, setFormIsValidState] = useState(false)
    const [orderFormState, setOrderFormState] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code (5 characters)'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            validation: {},
            value: 'fastest',
            valid: true
        }
    })

    const orderHandler = async (e) => {
        e.preventDefault();

        const formData = {};
        for (let formElement in orderFormState) {
            formData[formElement] = orderFormState[formElement].value;
        }
        const order = {
            ingredients: props.ings,
            totalPrice: parseInt(props.price, 10).toFixed(2),
            orderData: formData,
            userId: props.userId
        }

        props.onPurchaseBurger(order, props.idToken);
    }

    const inputChangeHandler = (e, id) => {
        const updatedFormElement = updateObject(orderFormState[id], {
            value: e.target.value,
            valid: checkValidity(e.target.value, orderFormState[id].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(orderFormState, {
            [id]: updatedFormElement
        })

        let formIsValid = true;

        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }
        setOrderFormState(updatedOrderForm);
        setFormIsValidState(formIsValid);
    }

    const formElementsArray = [];
    for (let key in orderFormState) {
        formElementsArray.push({
            id: key,
            config: orderFormState[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(e => {
                return <Input
                    changed={(event) => inputChangeHandler(event, e.id)}
                    key={e.id}
                    invalid={!e.config.valid}
                    shouldValidate={e.config.validation}
                    touched={e.config.touched}
                    elementType={e.config.elementType}
                    elementConfig={e.config.elementConfig}
                    value={e.config.value}></Input>
            })}
            <Button
                disabled={!formIsValidState}
                buttonType='Success'>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter toy contact data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading,
        idToken: state.authReducer.idToken,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (order, idToken) => dispatch(orderActions.purchaseBurger(order, idToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));