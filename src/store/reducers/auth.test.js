import reducer, {initialState} from './auth';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/auth';

describe('auth reducer', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        expect(reducer(initialState, actions.authSuccess('token', 'id'))).toEqual({
            ...initialState,
            token: 'token',
            userId: 'id',
        });
    });

});
