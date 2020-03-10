import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItem = (props) => (
    <ul
        link={props}
        className={classes.NavigationItems}>
        <NavigationItem link={"/"} exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link={"/orders"} >Orders</NavigationItem> : null}
        {props.isAuthenticated
            ? <NavigationItem link={"/logout"} >Logout</NavigationItem>
            : <NavigationItem link={"/auth"} >Authenticate</NavigationItem>}
    </ul>
)

export default navigationItem;