import './css/PhotoShowPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from './Header'
import { useParams} from 'react-router-dom'
import { fetchPhoto, getPhoto, updatePhoto, deletePhoto } from '../store/photos'
import { getUser, fetchUser} from '../store/users'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import CommentSection from './CommentSection'

export default function PhotoShowPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const {userId, photoId} = useParams();
    const [titleClicked, setTitleClicked] = useState(false);
    const [descriptionClicked, setDescriptionClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const photo = useSelector(getPhoto(photoId));
    const [title, setTitle] = useState(photo?.title);
    const [description, setDescription] = useState(photo?.description)
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session?.user);
    const isCurrentUser = (user?.id === sessionUser?.id);
    const uploadDate = new Date(photo?.createdAt).toDateString().split(" ").slice(1).join(" ")
    const sortedPhotoIds = user?.photoIds.sort(function(a, b){return a-b})
    
    function deleteClick(){
        if(!deleteClicked){
            setDeleteClicked(true);
        }
    }
    function confirmDelete(){
        history.push('/');
        dispatch(deletePhoto(photo.id))
    }
    useEffect(()=>{
        dispatch(fetchUser(userId));
        dispatch(fetchPhoto(photoId));
    }, [userId, photoId, dispatch])
    function handleTitleClick(){
        if(!titleClicked){
            setTitleClicked(true);
        }
    }
    function handleDescriptionClick(){
        if(!descriptionClicked){
            setDescriptionClicked(true);
        }
    }
    function handleEditClick(){
        if(!editClicked){
            setEditClicked(true);
        }
    }
    useEffect(() => {
        if (!editClicked) return;
        const closeMenuEdit = (e) => {
            setEditClicked(false);
        };
        document.addEventListener('click', closeMenuEdit);
        return () => document.removeEventListener("click", closeMenuEdit);
    }, [editClicked]);
    useEffect(() => {
        if (!titleClicked) return;
        const closeMenu = (e) => {
            if(e.target.classList.contains('titleinput')){
                return;
            }
            setTitleClicked(false);
            dispatch(updatePhoto({title: title, id: photo.id}));
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [titleClicked, photo, dispatch, title]);
    useEffect(() => {
        if (!descriptionClicked) return;
        const closeDescription = (e) => {
            if(e.target.classList.contains('descriptioninput')){
                return;
            }
            setTitleClicked(false);
            dispatch(updatePhoto({description: description, id: photo.id}));
        };
        document.addEventListener('click', closeDescription);
        return () => document.removeEventListener("click", closeDescription);
    }, [descriptionClicked, description, dispatch, photo]);
    function forwardClick(){
        if (nextPhoto){
            const nextIndex = sortedPhotoIds.indexOf(photo.id)+1
            const nextPhotoId = sortedPhotoIds[nextIndex]
            history.push(`/photos/${user.id}/${nextPhotoId}`)
        }
    }
    function backClick(){
        if (previousPhoto){
            const prevIndex = sortedPhotoIds.indexOf(photo.id)-1
            const prevPhotoId = sortedPhotoIds[prevIndex]
            history.push(`/photos/${user.id}/${prevPhotoId}`)
        }
    }

    let previousPhoto
    let nextPhoto
    if (user && photo){
        let currentIndex = sortedPhotoIds.indexOf(photo.id)
        if (currentIndex){

            previousPhoto = (currentIndex > 0)
            nextPhoto = (currentIndex < (sortedPhotoIds.length -1))
        }
    }
    if(!sessionUser){
        return(<Redirect to="/"></Redirect>);
    };
    if (photo&&user)
    {
    return(
        <>
        <Header state="loggedIn"/>
        {deleteClicked && <div className="cover-screen">
            <div className="delete-form">
                <div className="delete-form-top"><h3>Delete Photo</h3><button className="x-out" onClick={()=>{setDeleteClicked(false)}}>X</button></div>
                <div className="delete-form-mid"><p>Do you want to permanently delete this photo?</p></div>
                <div className="delete-form-bottom"><button className="cancel" onClick={()=>{setDeleteClicked(false)}}>Cancel</button><button className="delete" onClick={confirmDelete}>Delete</button></div>
            </div>
            </div>}
        <section className="contents photo-show">
            <section className="photo-background">
                <div className="arrow-back" onClick={()=>history.goBack()}><i className="fa-sharp fa-solid fa-arrow-left"></i><p>Back</p></div>
                <button className={previousPhoto?"previous-button":"previous-button disabled"} onClick={backClick}><i className="fa-sharp fa-solid fa-chevron-left"></i></button>
                <img className="hero-image" src={`${photo?.img}`} alt={`${photo?.title}`} />
                <button className={nextPhoto?"next-button":"next-button disabled"} onClick={forwardClick}><i className="fa-sharp fa-solid fa-chevron-right"></i></button>
                {isCurrentUser && 
                <button className="edit-button" onClick={handleEditClick}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                }
                {editClicked && 
                <nav className="edit-popup">
                    <div className="point-down">
                    </div>
                    <div className="top-button-list">
                        <div className="list-button" onClick={deleteClick}>
                            <button className="delete-button">Delete</button>
                        </div>
                    </div>
                </nav>
                }
            </section>
            <section className="photo-show-bottom">
                <section className="ps-left-column">
                    <div className="user-info">
                    <img className="prof-pic-60-circle" src={user?.profilePicUrl?`${user?.profilePicUrl}`:"https://live.staticflickr.com/65535/52405649690_9f0a22c374_b.jpg"} alt={`${user?.displayName}'s profile pic`} />
                    <div className="info-text">
                    <h1 className="ps-user-name" onClick={()=>history.replace(`/photos/${user.id}`)}>{user?.firstName} {user?.lastName}</h1>
                    {(isCurrentUser && titleClicked)? <input className="titleinput" type="text" value={`${title}`} onChange={(e)=>setTitle(e.target.value)} /> : <h3 className="ps-title" onClick={handleTitleClick}>{title}</h3> }
                    {(isCurrentUser && descriptionClicked)? <input className="descriptioninput" type="text" value={`${description}`} onChange={(e)=>setDescription(e.target.value)} /> : <p className="ps-title" onClick={handleDescriptionClick}>{description}</p> }
                    </div>
                    </div>
                    <CommentSection sessionUser={sessionUser} photo={photo} />
                    
                </section>
                <section className="ps-right-column">
                    <div className="photo-stats">
                        <div className="photo-stat">
                            <h3>{photo.views}</h3>
                            <p>{photo.views===1?"View":"Views"}</p>
                        </div>
                        <div className="photo-stat">
                            <h3>0</h3>
                            <p>faves</p>
                        </div>
                        <div className="photo-stat">
                            <h3>{photo.comments?.length}</h3>
                            <p>{photo.comments?.length===1?"Comment":"Comments"}</p>
                        </div>
                        <div className="photo-stat">
                            <h4>Uploaded on {uploadDate}</h4>
                        </div>
                    </div>
                    
                    <p className="copywright"><strong>©</strong> All rights reserved</p>
                    
                </section>
            </section>
        </section>
        </>
    );
}
}