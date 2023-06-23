import { getPhotos, fetchPhotos } from "../store/photos";
import { getAlbums, fetchAlbums } from "../store/albums";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AlbumListOther({user}){
    const history = useHistory()
    const dispatch= useDispatch()
    const albums = useSelector(getAlbums)
    const photos = useSelector(getPhotos)
    useEffect(()=>{
        dispatch(fetchAlbums(user.id))
        dispatch(fetchPhotos)
    }, [user])

function clickAlbum(id){
    history.push(`/albums/${id}`)
}
    return (
        <>
        {user.albums.map((album, i)=>
                    {<div key={i} className="square-photo-container">
                        <p className="square-photo-title">{albums[album].title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photos[albums[album].header].img} alt={`${album[album].title} header`} className="square-photo" onClick={(e)=>clickAlbum(album)}/>
                     </div>}
        )}
        </>
    )

}