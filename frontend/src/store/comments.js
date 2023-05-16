import csrfFetch from "./csrf"

const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})
const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})
const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})
export const getComment = (commentId) => state => state.comments?.[commentId]? state.comments[commentId] : null
export const getComments = state => state.comments? state.comments : {}

//thunk action creators
export const fetchComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveComment(data.comment))
    }
}
export const fetchComments = (photoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${photoId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveComments(data))
    }
}

export const createComment = (comment) => async dispatch =>{
    const res = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveComment(data.comment));
}
export const updateComment = (comment) => async dispatch =>{
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        body: JSON.stringify({comment: comment}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveComment(data.comment));
}
export const deleteComment = (commentId) => async dispatch =>{
    const res = await csrfFetch(`/api/comments/${commentId}`,{
        method: 'DELETE'
    })
    if (res.ok){dispatch(removeComment(commentId));}   
}


export default function commentsReducer(state ={}, action){
    const newState = {...state};
    switch(action.type){
        case RECEIVE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case RECEIVE_COMMENTS:
            return {...newState, ...action.comments};
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }

}