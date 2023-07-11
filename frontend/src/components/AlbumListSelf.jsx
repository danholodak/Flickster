import { getPhotos, fetchPhotos } from "../store/photos";
import { getAlbums, fetchAlbums } from "../store/albums";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PhotoSelectionModal from "./PhotoSelectionModal";

export default function AlbumListSelf({user}){
    const history = useHistory()
    const dispatch= useDispatch()
    const albums = useSelector(getAlbums)
    const photos = useSelector(getPhotos)
    const [albumTitleModal, setAlbumTitleModal] = useState(false)
    const [photoSelectionModal, setPhotoSelectionModal] = useState(false)
    const [currentTitle, setCurrentTitle] = useState()
    const [currentDescription, setCurrentDescription] = useState()
    useEffect(()=>{
        dispatch(fetchAlbums(user.id))
        dispatch(fetchPhotos)
    }, [user, dispatch])

    function clickAlbum(id){
        history.push(`/albums/${id}`)
    }
    function clickNewAlbum(){
        setAlbumTitleModal(true)
    }
    function HandleTitleModalSubmit(){
        setAlbumTitleModal(false)
        setPhotoSelectionModal(true)
    }
    return (
        <>
        {albumTitleModal&&<div className="title-modal">
            <button onClick={()=>setAlbumTitleModal(false)}>X</button>
            <form onSubmit={HandleTitleModalSubmit}>
                <label>Title:
                <input type="text" value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)}/>
                </label>
                <label>Description:
                <input type="text" value={currentDescription} onChange={(e)=>setCurrentDescription(e.target.value)}/>
                <input type="submit" value="Add Photos" />
                </label>
            </form>
        </div>}
        {photoSelectionModal&&
            <PhotoSelectionModal />
        }
        <div className="above-albums-grid">
            <button className="new-album-button">📔 New album</button>
        </div>
        {user.albums.map((album, i)=>
                    {return(<div key={i} className="square-photo-container">
                        <p className="square-photo-title">{albums[album].title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photos[albums[album].header].img} alt={`${album[album].title} header`} className="square-photo" onClick={(e)=>clickAlbum(album)}/>
                     </div>)}
        )}
        </>
    )
}