import csrfFetch from "./csrf"

const RECEIVE_FAVE = 'faves/RECEIVE_FAVE'
const RECEIVE_FAVES = 'faves/RECEIVE_FAVES'
const REMOVE_FAVE = 'faves/REMOVE_FAVE'

const receiveFave = (fave) => ({
    type: RECEIVE_FAVE,
    fave
})
const receiveFaves = (faves) => ({
    type: RECEIVE_FAVES,
    faves
})
const removeFave = (faveId) => ({
    type: REMOVE_FAVE,
    faveId
})
export const getFave = (faveId) => state => state.faves?.[faveId]? state.faves[faveId] : null
export const getFaves = state => state.faves? state.faves : {}

//thunk action creators
export const fetchFave = (faveId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${faveId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveFave(data.fave))
    }
}
export const fetchFaves = () => async (dispatch) => {
    const response = await csrfFetch('/api/favorites');
    if (response.ok){
        const data = await response.json()
        dispatch(receiveFaves(data))
    }
}

export const createFave = (fave) => async dispatch =>{
    const res = await csrfFetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify(fave),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveFave(data.fave));
}
export const deleteFave = (faveId) => async dispatch =>{
    const res = await csrfFetch(`/api/faves/${faveId}`,{
        method: 'DELETE'
    })
    if (res.ok){dispatch(removeFave(faveId));}   
}


export default function favesReducer(state ={}, action){
    const newState = {...state};
    switch(action.type){
        case RECEIVE_FAVE:
            newState[action.fave.id] = action.fave;
            return newState;
        case RECEIVE_FAVES:
            return {...newState, ...action.faves};
        case REMOVE_FAVE:
            delete newState[action.faveId];
            return newState;
        default:
            return state;
    }

}