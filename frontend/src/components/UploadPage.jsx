import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './css/UploadPage.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useState } from "react";
import csrfFetch from "../store/csrf";


export default function UploadPage(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state=> state.session.user)
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState ("");
    const [titleEdit, setTitleEdit] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);
    const [titleEdit2, setTitleEdit2] = useState(false);
    const [descriptionEdit2, setDescriptionEdit2] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [uploadingModal, setUploadingModal] = useState(false);
    const [photoFile, setPhotoFile] = useState (null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [photoSelected, setPhotoSelected] = useState(true)
    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        setTitle(currentTarget.value.split("\\")[2].split('.')[0])
        // console.log(currentTarget.value.split("\\")[2])
        setPhotoFile(file);
        setPhotoSelected(true);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
            }else{
                setPhotoUrl(null);
            } 
        
      }

    useEffect(()=>{
        if (sessionUser?.id) {
            dispatch(fetchUser(sessionUser?.id))
        }
    }, [sessionUser, dispatch])
    function photoInfoClick(){
        if (!photoSelected){
            setPhotoSelected(true)
        }
    }
    useEffect(()=>{
        if (!photoSelected) return;
        const deselectPhoto = (e) => {
          if(!(e.target.classList.contains("pib"))){
            setPhotoSelected(false);
          }
        };
        document.addEventListener('click', deselectPhoto);
        return () => document.removeEventListener("click", deselectPhoto);
    }, [photoSelected])
    useEffect(()=>{
        if (!titleEdit) return;
        const deselectTitle = (e) => {
          setTitleEdit(false);
        };
        document.addEventListener('click', deselectTitle);
        return () => document.removeEventListener("click", deselectTitle);
    }, [titleEdit])
    useEffect(()=>{
        if (!descriptionEdit) return;
        const deselectDescription = (e) => {
          if(!(e.target.classList.contains("description"))){
            setDescriptionEdit(false);
          }
        };
        document.addEventListener('click', deselectDescription);
        return () => document.removeEventListener("click", deselectDescription);
    }, [descriptionEdit])
    useEffect(()=>{
        if (!titleEdit2) return;
        const deselectTitle2 = (e) => {
          if(!(e.target.classList.contains("title"))){
            setTitleEdit2(false);
          }
        };
        document.addEventListener('click', deselectTitle2);
        return () => document.removeEventListener("click", deselectTitle2);
    }, [titleEdit2])
    useEffect(()=>{
        if (!descriptionEdit2) return;
        const deselectDescription2 = (e) => {
          if(!(e.target.classList.contains("description"))){
            setDescriptionEdit2(false);
          }
        };
        document.addEventListener('click', deselectDescription2);
        return () => document.removeEventListener("click", deselectDescription2);
    }, [descriptionEdit2])

    const user = useSelector(getUser(sessionUser?.id))
    async function handleUploadSubmit(e){
        e.preventDefault();
        setUploadingModal(true);
        const formData = new FormData();
        formData.append('photo[title]', title);
        formData.append('photo[userId]', user.id);
        if(description && description !== ""){
            formData.append('photo[description]', description)
        }
        if (photoFile) {
            formData.append('photo[img]', photoFile);
        }
        // debugger
        const response = await csrfFetch('/api/photos', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            setUploadComplete(true);
            setUploadingModal(false);
        }else{
            setUploadingModal(false);
        }
    }
    if(!user) return null;
    if (uploadComplete){
        return(
            <main className="upload-main">
                <Link to={`/photos/${user.id}`} className="choose-upload">Continue to photostream</Link>
            </main>
            
        )
    }
    if(!photoFile){
    return(
        <>
        <div className="mini-header">
            <div className="mini-header-left">
                <h1 className="blueh1">flickst<strong className="pinkh1">er<span>©</span></strong></h1>
                <Link className="white-header-link bold" to={`/photos/${sessionUser.id}`}>Your Photostream</Link>
            </div>
            <div className="mini-header-right">
                <Link className="white-header-link" to="/photos/upload">New Here?</Link>
                <Link to={`/photos/${sessionUser.id}`}><img src={user?.profilePicUrl} alt="prof pic" className="mini-header-profile-pic"/></Link>
            </div>
        </div>
        <div className="bottom-mini-header">
            
            <form action="">
            <label className="add-button">🏞 Add
                <input className="fileupload" type="file" onChange={handleFile} accept="image/gif, image/jpeg, image/png"/>
                </label>
            </form>
            
            <p className="upload greyed-out">Upload</p>
        </div>
        <main className="upload-main">
            <h1>You can upload {1000-user.photoIds.length} more photos and videos.</h1>
            <div className="pink-rectangle">
                <p>Get automatic photo backup on all your devices with Flickr Pro. <a className= "disabled" href="#">Upgrade now</a></p>
            </div>
            <form action="">
            <label className="choose-upload">
                <input className="fileupload" type="file" onChange={handleFile} accept="image/gif, image/jpeg, image/png"/>
                Choose photos to upload</label>
            </form>
        </main>
        </>
    );
}else{
    return(
        <>
        <div className="mini-header">
            <div className="mini-header-left">
                <h1 className="blueh1">flickst<strong className="pinkh1">er<span>©</span></strong></h1>
                <Link className="white-header-link bold" to={`/photos/${sessionUser.id}`}>Your Photostream</Link>
            </div>
            <div className="mini-header-right">
                <Link className="white-header-link" to="/photos/upload">New Here?</Link>
                <Link to={`/photos/${sessionUser.id}`}><img src={user?.profilePicUrl} alt="prof pic" className="mini-header-profile-pic"/></Link>
            </div>
        </div>
        <div className="bottom-mini-header">
            {uploadingModal&& 
                <div className="screencover">
                    <div className="uploading-modal-box">
                        <p>Uploading...</p>
                    </div>
                </div>
            } 
            
            <form action="">
            <label className="add-button" onClick={()=>setPhotoFile(null)}>🏞 Remove
                </label>
            </form>
            
            <button className="upload ready-to-upload" onClick={handleUploadSubmit}>Upload 1 photo</button>
        </div>
        <main className="upload-main flex-row">
           <section className="sidebar">
            {photoSelected? <><h3 className="select-photos">Editing 1 photo:</h3>
            <div className="photoinfo sidebar-div">
                {titleEdit2? <input className="title pib sidebar-title" type="text" value={title} onChange={(e=> setTitle(e.target.value))}/>:<h2 className="title pib" onClick={()=>setTitleEdit2(true)}>{title}</h2>}
                {descriptionEdit2?<textarea className="description pib sidebar-text-area" value={description} onChange={(e=> setDescription(e.target.value))} >{description||"Add a description"}</textarea>:<p className="description pib" onClick={()=>setDescriptionEdit2(true)}>{description||"Add a description"}</p>}
            </div>
            {/* <div className="disabled sidebar-div">
                    <p>Add tags</p>
            </div>
            <div className="disabled sidebar-div">
                    <p>Add people</p>
            </div>
            <div className="disabled sidebar-div">
                    <p>Add to albums</p>
            </div>
            <div className="disabled sidebar-div">
                    <p>Add to groups</p>
            </div>
            <div className="disabled sidebar-div">
                    <p>Owner settings</p>
            </div> */}
            </>
            :<h3 className="select-photos">Select photos to edit...</h3>}

           </section>
           <section className="photos-to-upload">
            <div className="photo-info-box pib" onClick={photoInfoClick}>
                <img className={photoSelected?"photo-to-upload active pib":"photo-to-upload pib"} src={photoUrl}alt={title}></img>
                {titleEdit? <input type="text" className="title pib" value={title} onChange={(e=> setTitle(e.target.value))}/>:<p className="title pib" onClick={()=>setTitleEdit(true)}>{title}</p>}
                {descriptionEdit?<textarea className="description pib" value={description} onChange={(e=> setDescription(e.target.value))} ></textarea>:<p className="description pib" onClick={()=>setDescriptionEdit(true)}>{description||"Add a description"}</p>}
            </div>
            

           </section>
        </main>
        </>)
    }
}