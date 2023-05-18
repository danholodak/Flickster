import './css/PhotoShowPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from './Header'
import { useParams} from 'react-router-dom'
import { fetchPhoto, getPhoto, updatePhoto, deletePhoto } from '../store/photos'
import { getUser, fetchUser, getUsers } from '../store/users'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import {fetchComments, getComment, getComments, deleteComment } from '../store/comments'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function PhotoShowPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const {userId, photoId} = useParams();
    const [titleClicked, setTitleClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
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
        dispatch(fetchComments(photoId))
    }, [userId, photoId, dispatch])
    function handleTitleClick(){
        if(!titleClicked){
            setTitleClicked(true);
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
    }, [titleClicked]);
    function forwardClick(){
        if (nextPhoto){
            const nextIndex = user.photoIds.indexOf(photo.id)+1
            const nextPhotoId = user.photoIds[nextIndex]
            history.push(`/photos/${user.id}/${nextPhotoId}`)
        }
    }
    function backClick(){
        if (previousPhoto){
            const prevIndex = user.photoIds.indexOf(photo.id)-1
            const prevPhotoId = user.photoIds[prevIndex]
            history.push(`/photos/${user.id}/${prevPhotoId}`)
        }
    }
    
    const photo = useSelector(getPhoto(photoId));
    const comments = useSelector(getComments)
    const [title, setTitle] = useState(photo?.title);
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session?.user);
    const isCurrentUser = (user?.id === sessionUser?.id);
    const commentUsers = useSelector(getUsers)
    useEffect(()=>{
        comments.forEach((comment)=>{
            dispatch(fetchUser(comment.author_id))
        })
    }, [comments])
    let previousPhoto
    let nextPhoto
    if (user && photo){
        let currentIndex = user.photoIds.indexOf(photo.id)
        if (currentIndex)
        previousPhoto = (currentIndex > 0)
        nextPhoto = (currentIndex < (user.photoIds.length -1))
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
                    {/* description under the title */}
                    </div>
                    </div>
                    
                    {(photo?.comments.length>0)&&
                    <div>
                        {photo.comments.map((id, i)=>
                        <div classname="comment">
                            <Link to={`/photos/${commentUsers[comments.id.author_id]?.id}`}><img src={commentUsers[comments.id.author_id]?.profilePicUrl} alt="commenter profile picture" className="prof-pic-60-circle" /></Link>
                            <div>
                                <Link to={`/photos/${commentUsers[comments.id.author_id]?.id}`}>{commentUsers[comments.id.author_id]?.firstName} {commentUsers[comments.id.author_id]?.lastName}</Link>
                                <p>{comments.id.body}</p>
                                
                            </div>
                        </div>
                        //the comment author's photo to the left of comment body
                        )}
                    </div>}
                    {/* input zone for a comment */}
                </section>
                <section className="ps-right-column">
                    <div className="photo-stats">
                        <div className="photo-stat">
                            <h3>{photo.views}</h3>
                            <p>Views</p>
                        </div>
                        <div className="photo-stat">
                            <h3>0</h3>
                            <p>faves</p>
                        </div>
                        <div className="photo-stat">
                            <h3>{photo.comments.length}</h3>
                            <p>Comments</p>
                        </div>
                    </div>
                    
                    <p className="copywright">© all rights reserved</p>
                    
                </section>
            </section>
        </section>
        </>
    );
}
}