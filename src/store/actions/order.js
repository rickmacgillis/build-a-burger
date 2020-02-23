import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT});
export const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START});
export const purchaseBurgerSuccess = (orderId, orderData) => ({type: actionTypes.PURCHASE_BURGER_SUCCESS, orderId, orderData});
export const purchaseBurgerFail = error => ({type: actionTypes.PURCHASE_BURGER_FAIL, error});

export const purchaseBurger = orderData => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        const state = getState();
        axios.post('/orders.json?auth=' + state.auth.token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    };
};

export const fetchOrdersStart = () => ({type: actionTypes.FETCH_ORDERS_START});
export const fetchOrdersSuccess = orders => ({type: actionTypes.FETCH_ORDERS_SUCCESS, orders});
export const fetchOrdersFail = error => ({type: actionTypes.FETCH_ORDERS_FAIL, error});

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        const state = getState();
        const queryParams = '?auth=' + state.auth.token + '&orderBy="userId"&equalTo="' + state.auth.userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
};
