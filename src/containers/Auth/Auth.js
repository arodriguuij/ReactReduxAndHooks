import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility'

const auth = props => {
    const [isSignupState, setIsSignupState] = useState(true);
    const [controlsState, setControlsState] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const { buildingBurger, authRedirectPath, onSetAuthRedirecPath } = props;

    useEffect(() => {
        //Not building a burger, then go back to the begining
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirecPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirecPath]);

    const inputChangeHandler = (event, controlName) => {
        const updateControlls = updateObject(controlsState, {
            [controlName]: updateObject(controlsState[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controlsState[controlName].validation),
                touched: true
            })
        })
        setControlsState(updateControlls)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controlsState.email.value, controlsState.password.value, isSignupState);
    }

    const switchAuthModeHandler = () => {
        setIsSignupState(!isSignupState);
    }

    const formElementsArray = [];
    for (let key in controlsState) {
        formElementsArray.push({
            id: key,
            config: controlsState[key]
        });
    }

    let form = formElementsArray.map(e => (
        <Input
            key={e.id}
            elementType={e.config.elementType}
            changed={(event) => inputChangeHandler(event, e.id)}
            invalid={!e.config.valid}
            shouldValidate={e.config.validation}
            touched={e.config.touched}
            elementConfig={e.config.elementConfig}
            value={e.config.value}></Input>

    ));

    if (props.loading)
        form = <Spinner />;

    let errorMessage = null;
    if (props.error)
        errorMessage = (
            <p>{props.error.message}</p>
        );

    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={onSubmitHandler}>
                {form}
                <Button
                    buttonType="Success">Submit</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                buttonType='Danger'>Switch to {isSignupState ? 'Login' : 'SignUp'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        isAuth: state.authReducer.idToken !== null,
        buildingBurger: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirecPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);