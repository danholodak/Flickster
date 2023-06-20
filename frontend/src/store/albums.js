import csrfFetch from "./csrf"

const RECEIVE_ALBUM = 'albums/RECEIVE_ALBUM'
const RECEIVE_ALBUMS = 'albums/RECEIVE_ALBUMS'
const REMOVE_ALBUM = 'albums/REMOVE_ALBUM'

const receiveAlbum = (album) => ({
    type: RECEIVE_ALBUM,
    album
})
const receiveAlbums = (albums) => ({
    type: RECEIVE_ALBUMS,
    albums
})
const removeAlbum = (albumId) => ({
    type: REMOVE_ALBUM,
    albumId
})
export const getAlbum = (albumId) => state => state.albums?.[albumId]? state.albums[albumId] : null
export const getAlbums = state => {
    return state.albums? state.albums : {}}

//thunk action creators
export const fetchAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveAlbum(data.album))
    }
}
export const fetchAlbums = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${userId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveAlbums(data))
    }
}

export const createAlbum = (album) => async dispatch =>{
    const res = await csrfFetch('/api/albums', {
        method: 'POST',
        body: JSON.stringify(album),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveAlbum(data.album));
}
export const updateAlbum = (album) => async dispatch =>{
    const res = await csrfFetch(`/api/albums/${album.id}`, {
        method: 'PATCH',
        body: JSON.stringify({album: album}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveAlbum(data.album));
}
export const deleteAlbum = (albumId) => async dispatch =>{
    const res = await csrfFetch(`/api/albums/${albumId}`,{
        method: 'DELETE'
    })
    if (res.ok){dispatch(removeAlbum(albumId));}   
}


export default function albumsReducer(state ={}, action){
    const newState = {...state};
    switch(action.type){
        case RECEIVE_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case RECEIVE_ALBUMS:
            return {...action.albums};
        case REMOVE_ALBUM:
            delete newState[action.albumId];
            return newState;
        default:
            return state;
    }

}