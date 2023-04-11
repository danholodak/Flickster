import csrfFetch from "./csrf"

const RECEIVE_USER = 'users/RECEIVE_USER'
const RECEIVE_USERS = 'users/RECEIVE_USERS'
const REMOVE_USER = 'users/REMOVE_USER'

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})
const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})
const removeUser = (userId) => ({
    type: REMOVE_USER,
    userId
})

//thunk action creators
export const fetchUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveUser(data))
    }
}
export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    if (response.ok){
        const data = await response.json()
        dispatch(receiveUsers(data))
    }
}

export const createUser = (user) => async dispatch =>{
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveUser(data));
}
export const updateUser = (user) => async dispatch =>{
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({user: user}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveUser(data));
}
export const deleteUser = (userId) => async dispatch =>{
    const res = await csrfFetch(`/api/users/${userId}`,{
        method: 'DELETE'
    })
    if (res.ok){dispatch(removeUser(userId));}   
}


export default function usersReducer(state ={}, action){
    const newState = {...state};
    switch(action.type){
        case RECEIVE_USER:
            newState[action.user.id] = action.user;
            return newState;
        case RECEIVE_USERS:
            return {...newState, ...action.users};
        case REMOVE_USER:
            delete newState[action.user.id];
            return newState;
        default:
            return state;
    }

}