import Header from "./Header";
import { getPhotos, fetchPhotos } from "../store/photos";
import { getAlbums, fetchAlbums } from "../store/albums";
export default function AlbumListOther({user}){


function clickAlbum(id){

}
    return (
        <>
        <Header state="loggedIn"/>
        {user.albums.map((album)=>
                    {<div key={i} className="square-photo-container">
                        <p className="square-photo-title">{album.title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photos[album.header].img} alt={`${album.title} header`} className="square-photo" onClick={(e)=>clickAlbum(album.id)}/>
                     </div>}
        )}
        </>
    )

}