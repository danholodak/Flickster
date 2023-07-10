import Header from "./Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { fetchAlbum, getAlbum } from "../store/albums";
import { fetchPhotos, getPhotos } from "../store/photos";
import { fetchUser } from "../store/users";

export default function Album(){
    const {albumId} = useParams();
    const dispatch = useDispatch();
    const album = useSelector(getAlbum(albumId));
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(getPhotos)
    const userId = album.userId;
    const user= useSelector(getUser(userId))
    const currentUser = userId === sessionUser?.id;
    useEffect(()=>{
        dispatch(fetchAlbum(albumId));
        dispatch(fetchPhotos);
    },[albumId, dispatch]);
    useEffect(()=>{
        dispatch(fetchUser(userId));
    },[userId, dispatch]);
    if(album&&user){
        return(
        <>
            <Header state="loggedIn"/>
            <div class="above-banner">
                <button onClick={()=>history.push(`/photos/${userId}/albums`)}>
                    <i className="fa-sharp fa-solid fa-arrow-left"></i><p> Back to albums list</p>
                </button>
            </div>
            {/* the banner image and on it - title, description(editable if owned) photocount, link to photostream 'by: name' */}
            {/* album photos in the same style as photostream again */}
            <div className="banner-pic" style={{backgroundImage: `url(${photos[album.bannerId]})`, backgroundPosition: 'center center'}}>
                <h1 className="album-title">{album.title}</h1>
                <h2 className="album-description">{album.description}</h2>
                <p>{album.photos.length + album.photos.length==1? "photo": "photos"}</p>
                <p>by: {user.firstName} {user.lastName}</p>
            </div>
            <section className="content photostream">
                    <section className="photo-column">
                        {album.photos.map((id, i)=><Link to={`/photos/${photos[id]?.userId}/${id}`} key={i}><img src={photos[id]?.img} alt={photos[id]?.title}  /></Link>)}
                    </section>
            </section>
        </>
    )}
}