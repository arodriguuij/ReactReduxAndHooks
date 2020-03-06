import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const buger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients) // ['salad','bacon','cheese','meat'}
        .map(ingredientKey => {
            //console.log(ingredientKey)
            /*              salad
                            bacon
                            cheese
                            meat */
            //console.log(props.ingredients[ingredientKey])
            /*                  1
                                1
                                2
                                2 */
            //console.log([...Array(props.ingredients[ingredientKey])]);
            /*              [undefined]
                            [undefined]
                            [undefined, undefined]
                            [undefined, undefined] */
            return [...Array(props.ingredients[ingredientKey])].map((e, i) => {
                return <BurgerIngredient type={ingredientKey} key={ingredientKey + i} />
            });
        }).reduce((arr, el) => { // prevValue, curValue
            return arr.concat(el);
        }, []); //Initital value;

    if (ingredientsArray.length === 0)
        ingredientsArray = <p>Please start adding ingredients...</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default buger;