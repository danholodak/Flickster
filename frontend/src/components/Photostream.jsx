import Header from "./Header";
import SubHeader from "./SubHeader";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser, getUser } from "../store/users";
import { useEffect } from "react";
import { fetchPhotos, getPhotos } from "../store/photos";
import './css/Photostream.css'

export default function PhotostreamPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
        dispatch(fetchPhotos())
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    const photos = useSelector(getPhotos)
    if (!user){
        return null
    }else if((!photos||user.photoIds.length === 0)){
        return (
            <>
            <Header state="loggedIn"/>
            <SubHeader selection="photostream"/>
            <section className="content">
                <h1>
                    {user.displayName} doesn't have any photos yet. 😢
                </h1>
            </section>
        </>
        )
    }else {
        return(
            <>
                <Header state="loggedIn"/>
                <SubHeader selection="photostream"/>
                <section className="content photostream">
                    <section className="photo-column">
                        {user.photoIds.map((id, i)=><Link to={`/photos/${photos[id]?.userId}/${id}`} key={i}><img src={photos[id]?.img} alt={photos[id]?.title}  /></Link>)}
                    </section>
                </section>
            </>
        )
    }
    

}