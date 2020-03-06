import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    //const ingredientsArray = Object.values(props.ingredients)
    let ingredients = [];
    //console.log(props.ingredients);
    /*     {
            bacon: 1, 
            cheese: 2, 
            meat: 1, 
            salad: 1
        } */

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            ammount: props.ingredients[ingredientName]
        });
    }
    //console.log(ingredients)
    /*     [
            0: { name: "bacon", ammount: 1 }
            1: { name: "cheese", ammount: 2 }
            2: { name: "meat", ammount: 1 }
            3: { name: "salad", ammount: 1 }
        ] */

    const ingredientsOutput = ingredients.map(ingredient => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ingredient.name}>
            {ingredient.name} ({ingredient.ammount})
            </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
};

export default Order;