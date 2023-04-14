import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { fetchPhotos, getPhotos } from "../store/photos";
import './css/NewsFeed.css'
import { fetchUsers, getUsers } from "../store/users";

export default function NewsFeed(){
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPhotos())
        dispatch(fetchUsers())
    }, [dispatch])
    const photos = useSelector(getPhotos)
    const users = useSelector(getUsers)
    const history = useHistory()
    function handlePhotoClick(photoId, userId){
        history.push(`/photos/${userId}/${photoId}`)
    }
    return(
        <>
        <Header state="loggedIn"/>
        <section className="content news-feed">
            <section className="content-box">
                <h1 className="new-photos">New Photos</h1>
            <section className="photo-column news-feed">
                        {Object.values(photos).map((photo, i)=>{
                            return(
                        <div key={i} className="news-feed-box">
                            <img  src={photo.img} alt={photo.title} 
                            onClick={()=>handlePhotoClick(photo.id, photo.userId)}/>
                            <div className="user-info">
                            <img className="prof-pic-small"  src={users[photo.userId]?.profilePicUrl ? users[photo.userId].profilePicUrl : "https://live.staticflickr.com/65535/52405649690_9f0a22c374_b.jpg"} alt="Profile pic" onClick={()=>history.push(`/photos/${photo.userId}`)}/>
                            <div className="user-info-text">
                                <h2 className="newsfeed-title" onClick={()=>history.push(`/photos/${photo.userId}/${photo.id}`)}>{photo.title}</h2>
                                <p className="newsfeed-credit" onClick={()=>history.push(`/photos/${photo.userId}`)}>by {users[photo.userId]?.displayName}</p>
                            </div>
                            </div>
                        </div>)}
                        )}
                    </section>
            </section>
        </section>
        </>
    )

}