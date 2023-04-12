import csrfFetch from "./csrf"

const RECEIVE_PHOTO = 'photos/RECEIVE_PHOTO'
const RECEIVE_PHOTOS = 'photos/RECEIVE_PHOTOS'
const REMOVE_PHOTO = 'photos/REMOVE_PHOTO'

const receivePhoto = (photo) => ({
    type: RECEIVE_PHOTO,
    photo
})
const receivePhotos = (photos) => ({
    type: RECEIVE_PHOTOS,
    photos
})
const removePhoto = (photoId) => ({
    type: REMOVE_PHOTO,
    photoId
})
export const getPhoto = (photoId) => state => state.photos?.[photoId]? state.photos[photoId] : null
export const getPhotos = state => state.photos? Object.values(state.photos) : []

//thunk action creators
export const fetchPhoto = (photoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/photos/${photoId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receivePhoto(data.photo))
    }
}
export const fetchPhotos = () => async (dispatch) => {
    const response = await csrfFetch('/api/photos');
    if (response.ok){
        const data = await response.json()
        dispatch(receivePhotos(data.photos))
    }
}

export const createPhoto = (photo) => async dispatch =>{
    const res = await csrfFetch('/api/photos', {
        method: 'POST',
        body: JSON.stringify(photo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receivePhoto(data.photo));
}
export const updatePhoto = (photo) => async dispatch =>{
    const res = await csrfFetch(`/api/photos/${photo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({photo: photo}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receivePhoto(data.photo));
}
export const deletePhoto = (photoId) => async dispatch =>{
    const res = await csrfFetch(`/api/photos/${photoId}`,{
        method: 'DELETE'
    })
    if (res.ok){dispatch(removePhoto(photoId));}   
}


export default function photosReducer(state ={}, action){
    const newState = {...state};
    switch(action.type){
        case RECEIVE_PHOTO:
            newState[action.photo.id] = action.photo;
            return newState;
        case RECEIVE_PHOTOS:
            return {...newState, ...action.photos};
        case REMOVE_PHOTO:
            delete newState[action.photo.id];
            return newState;
        default:
            return state;
    }

}