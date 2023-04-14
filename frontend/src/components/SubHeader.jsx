import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import './css/SubHeader.css'
import { useDispatch } from "react-redux";
import { fetchUser, getUser } from "../store/users";

export default function SubHeader({selection}){
    // need to grab info: first name, last name, display name, how many photos, current city, country, year from created_at
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user)
    const [dotsClicked, setDotsClicked] = useState(false)
    const isCurrentUser = (userId === sessionUser?.id.toString())
    const aboutActive = (selection==="about")
    const photostreamActive = (selection==="photostream")
    const albumsActive = (selection==="albums")
    const favesActive = (selection==="faves")
    function dotsDropdown(){
        if(!dotsClicked){
            setDotsClicked(true);
        }
    }
    useEffect(() => {
        if (!dotsClicked) return;
        const closeMenu = () => {
          setDotsClicked(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
      }, [dotsClicked]);
    return (
        <>
        <div className="banner-pic" style={user?.headerPhotoUrl ? {backgroundImage: `url(${user.headerPhotoUrl})`} : {backgroundImage: `url(https://live.staticflickr.com/65535/51968874805_9ed9ef93bf_h.jpg)`, backgroundPosition: 'center top'}}>
            <section className="left-subheader">
                <img className="prof-pic" src={user?.profilePicUrl ? user.profilePicUrl : "https://live.staticflickr.com/65535/52405649690_9f0a22c374_b.jpg"} alt="Profile pic" />
                <section className="l-sh-text">
                    <div className="l-sh-text-top">
                        <h1 className="subheader-name">{user?.firstName} {user?.lastName}</h1>
                        {isCurrentUser && <button className="dots-button" onClick={dotsDropdown}>•••</button>}
                        {dotsClicked && isCurrentUser&& 
                        <nav className="triple-dots">
                            <div className="point"></div>
                            <div className="top-button-list">
                                <div className="list-button"><Link to='/'>Change cover photo</Link></div>
                                <div className="list-button"><Link to='/account'>Edit username</Link></div>
                                <div className="list-button"><Link to='/account'>Edit real name</Link></div>
                            </div></nav>}
                    </div>
                    <div className="l-sh-text-bottom">
                            <p>{user?.displayName}</p>
                            <p>0 Followers • 0 Following</p>
                    </div>
                </section>
            </section>
            <section className="right-subheader">
                <p>{user?.photoIds? user?.photoIds.length : 0} {user?.photoIds?.length===1? "Photo" : "Photos"}</p>
                <p>{user?.currentCity}, {user?.country}</p>
                <p>Joined {user?.createdAt.split('-')[0]}</p>
            </section>
        </div>
        <section className="acct-tabs">
            <Link to={`/people/${userId}`} className={aboutActive? "active" : ""}>About</Link>
            <Link to={`/photos/${userId}`}className={photostreamActive? "active" : ""} >Photostream</Link>
            <Link to={`/photos/${userId}/albums`}className={albumsActive? "active" : ""} >Albums</Link>
            <Link to={`/photos/${userId}/favorites`}className={favesActive? "active" : ""} >Faves</Link>
        </section>
        </>
    );
}