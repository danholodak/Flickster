import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";
import { fetchPhotos, getPhotos } from "../store/photos";
import { Link } from "react-router-dom";

export default function FavesPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(getUser(userId));
    const allPhotos = useSelector(getPhotos)
    const photos = Object.values(allPhotos).filter((photo)=>user.faves.includes(photo.id))
    useEffect(()=>{
        dispatch(fetchUser(userId))
        dispatch(fetchPhotos)
    }, [userId, dispatch])
    // debugger
    if (user){
        return(
            <>
                <Header state="loggedIn"/>
                <SubHeader selection="faves"/>
                {user.faves.length===0&&
                <section className="content">
                    <h1>
                        {user?.displayName} doesn't have any faves yet. 😢
                    </h1>
                </section>}
                {user.faves.length>0&&
                <section className="content photostream">
                        <section className="photo-column">
                            {photos.map((photo, i)=><Link to={`/photos/${photo.userId}/${photo.id}`} key={i}><img src={photo.img} alt={photo.title}  /></Link>)}
                        </section>
                </section>}
            </>
        )
    }

}