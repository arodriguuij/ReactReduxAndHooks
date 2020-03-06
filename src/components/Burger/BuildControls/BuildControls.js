import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const burgerController = (props) => (
    <div className={classes.BuilderController}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((e, i) =>
            <BuildControl
                ingredientAdded={() => props.ingredientAdded(e.type)}
                ingredientRemoved={() => props.ingredientRemoved(e.type)}
                key={e.label}
                label={e.label}
                disabled={props.disabled[e.type]} />
        )}
        <button 
            onClick={props.ordered}
            disabled={props.disabledOrder} 
            className={classes.OrderButton}>ORDER NOW</button>
    </div>
);

export default burgerController;