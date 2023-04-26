import './css/PhotoShowPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from './Header'
import { useParams, Link } from 'react-router-dom'
import { fetchPhoto, getPhoto, updatePhoto, deletePhoto } from '../store/photos'
import { getUser, fetchUser } from '../store/users'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

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
        //find id in user's photoIds array, history.push
    }
    function backClick(){
        //find id in user's photoIds array, history.push
    }
    const photo = useSelector(getPhoto(photoId));
    const [title, setTitle] = useState(photo?.title);
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session?.user);
    const isCurrentUser = (user?.id === sessionUser?.id);
    //set a boolean that is true if there is a previous photo - array.find current photoId and check if the index is 0  (conditionally display arrow based on this)
    //set a boolean that's true if there is a next photo - array.find current photoId and check if index less than length-1 (conditionally display arrow based on this)
    if(!sessionUser){
        return(<Redirect to="/"></Redirect>);
    };
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
                <button className="previous-button"><i className="fa-sharp fa-solid fa-chevron-left"></i></button>
                <img className="hero-image" src={`${photo?.img}`} alt={`${photo?.title}`} />
                <button className="next-button"><i className="fa-sharp fa-solid fa-chevron-right"></i></button>
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
                    {/* <i className="fa-solid fa-pen-to-square"></i> */}
                    </div>
                    </div>
                    
                    <div>comments go here</div>
                </section>
                <section className="ps-right-column">
                    
                </section>
            </section>
        </section>
        </>
    );
}