import './css/PhotoShowPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from './Header'
import { useParams, Link } from 'react-router-dom'
import { fetchPhoto, getPhoto, updatePhoto } from '../store/photos'
import { getUser, fetchUser } from '../store/users'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'



export default function PhotoShowPage(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {userId, photoId} = useParams()
    const [titleClicked, setTitleClicked] = useState(false)
    useEffect(()=>{
        dispatch(fetchUser(userId))
        dispatch(fetchPhoto(photoId))
    }, [userId, photoId, dispatch])
    function handleTitleClick(){
        if(!titleClicked){
            setTitleClicked(true);
        }
    }
    useEffect(() => {
        if (!titleClicked) return;
        const closeMenu = (e) => {
            if(e.target.classList.contains('titleinput')){
                return
            }
            setTitleClicked(false);
            dispatch(updatePhoto({title: title, id: photo.id}))
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [titleClicked]);
    const photo = useSelector(getPhoto(photoId))
    const [title, setTitle] = useState(photo?.title)
    const user = useSelector(getUser(userId))
    const sessionUser = useSelector(state => state.session?.user)
    const isCurrentUser = (user?.id === sessionUser?.id)
    if(!sessionUser){
        return(<Redirect to="/"></Redirect>)
    }
    return(
        <>
        <Header state="loggedIn"/>
        <section className="contents photo-show">
            <section className="photo-background">
                <div className="arrow-back" onClick={()=>history.goBack()}><i className="fa-sharp fa-solid fa-arrow-left"></i><p>Back</p></div>
                <button className="previous-button"><i className="fa-sharp fa-solid fa-chevron-left"></i></button>
                <img className="hero-image" src={`${photo?.img}`} alt={`${photo?.title}`} />
                <button className="next-button"><i className="fa-sharp fa-solid fa-chevron-right"></i></button>
                <button className="edit-button"></button>
            </section>
            <section className="photo-show-bottom">
                <section className="ps-left-column">
                    <div className="user-info">
                    <img className="prof-pic-60-circle" src={user?.profilePicUrl?`${user?.profilePicUrl}`:"https://live.staticflickr.com/65535/52405649690_9f0a22c374_b.jpg"} alt={`${user?.displayName}'s profile pic`} />
                    <div className="info-text">
                    <Link className="ps-user-name" to={`photos/${user?.id}`}><h1 className="ps-user-name">{user?.firstName} {user?.lastName}</h1></Link>
                    {(isCurrentUser && titleClicked)? <input className="titleinput" type="text" value={`${title}`} onChange={(e)=>setTitle(e.target.value)} /> : <h3 className="ps-title" onClick={handleTitleClick}>{title}</h3> }
                    </div>
                    </div>
                    
                    {/* <div>info</div> */}
                </section>
                <section className="ps-right-column">
                    
                </section>
            </section>
        </section>
        </>
    )
}