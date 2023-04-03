import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) =>({
    type: SET_CURRENT_USER,
    user
});
export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

export const login = (user) => async(dispatch) =>{
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(setCurrentUser(data.user));
    };
    return response;
};
const initialState = {user: null}

export default function sessionReducer(state=initialState, action){
    const newState = {...state};
    switch(action.type){
        case SET_CURRENT_USER:
        newState['user'] = action.user
        return newState
        case REMOVE_CURRENT_USER:
        newState['user'] = null
        return newState
        default: return newState
    };
};
