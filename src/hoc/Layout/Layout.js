import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const layout = (props) => {
    const [layoutSideDrawerIsVisible, setLayoutSideDrawerIsVisible] = useState(false)

    const sideDrawerClosedHandler = () => {
        setLayoutSideDrawerIsVisible(false)
    }

    const sideDrawerOpenedHanlder = () => {
        setLayoutSideDrawerIsVisible((prevState) => !prevState.showSideDrawer)
    }

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerOpenedHanlder} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={layoutSideDrawerIsVisible}
                clicked={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux >
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.idToken !== null
    }
}

export default connect(mapStateToProps, null)(layout);