import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    totalIngredients: 0,
    error: false,
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const changeIngredientCount = (state, ingredientName, amount) => {
    const multiplier = amount < 0 ? -1 : 1;
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] + amount,
        },
        totalPrice: state.totalPrice + (INGREDIENT_PRICES[ingredientName] * multiplier),
        totalIngredients: state.totalIngredients+1,
    };
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return changeIngredientCount(state, action.ingredientName, 1);
        case actionTypes.REMOVE_INGREDIENT:
            return changeIngredientCount(state, action.ingredientName, -1);
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    lettuce: action.ingredients.lettuce,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: initialState.totalPrice,
                error: false,
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return { ...state, error: true };
        default:
            return state;
    }
};

export default reducer;
