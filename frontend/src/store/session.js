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

export const signup = (user) => async(dispatch) =>{
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    })
    if (response.ok){
        const data = await response.json();
        dispatch(setCurrentUser(data.user));
    };
    return response;
};

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
export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    setCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};
const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}
export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    setCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

const initialState = {user: JSON.parse(sessionStorage.getItem("currentUser"))}

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
