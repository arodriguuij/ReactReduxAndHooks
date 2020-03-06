import React from 'react';
import burgerLogo from '../../assest/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBuerger"/>
    </div>
);

export default logo;