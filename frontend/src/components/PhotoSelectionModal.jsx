import {updatePhoto } from "../store/photos"
import { useDispatch } from "react-redux"
// import { useSelector } from "react-redux"
import { useState } from "react"
import { updateUser } from "../store/users"
import './css/PhotoSelectionModal.css'


export default function PhotoSelectionModal({user, photos, modalType, setShowcaseModal}){
    const dispatch = useDispatch()

    let limit = 1
    if (modalType="showcase"){
        limit = 25
    }
    let showcasePhotos = []
    let selectedPhotos = []
    if (photos&&modalType==="showcase"){
        photos.forEach((photo)=>{
            if (photo.showcase){
                showcasePhotos.push(photo.id)
                selectedPhotos.push(photo.id)
            }
        })
    }
    let photosLeft = limit-selectedPhotos.length
    const [bottomText, setBottomText] = useState(`Choose up to ${photosLeft} more photos`)
    if(photosLeft === 1){
        setBottomText("One photo to go, choose well!")
    }else if(photosLeft === 0){
        setBottomText("Your showcase is full! Change photos")
    }
    const [photostreamActive, setPhotostreamActive] = useState(true)
    const [albumsActive, setAlbumsActive] = useState(false)
    const [selectedActive, setSelectedActive] = useState(false)
    const [uploadActive, setUploadActive] = useState(false)

    function deselectPhoto(id){
        let photoindex = selectedPhotos.findIndex(id)
        selectedPhotos.splice(photoindex, 1)
        //if photo is in the previously showcased, mark for deselect update, otherwise remove from mark for select update 
    }
    function clickPhoto(id){
        debugger
        if (selectedPhotos.includes(id)){
            deselectPhoto(id)
        }else if (photosLeft>0){
            selectedPhotos.push(id)
            debugger           
        }
        //if limit reached only deselect available
        //if already selected deselect
    }
    function submitShowcaseSelection(){
        showcasePhotos.forEach((photoId)=>{
            if (!selectedPhotos.includes(photoId)){
                dispatch(updatePhoto({photo:{id: photoId, showcase: false}}))
            }
        })
        selectedPhotos.forEach((photoId)=>{
            if (!showcasePhotos.includes(photoId)){
                dispatch(updatePhoto({photo:{id: photoId, showcase: true}}))
            }
        })
        // compare previously showcased collection with newly selected collection, 
        // remove newly unselected, add newly selected, then close modal
        setShowcaseModal(false)
    }

    function submitSelection(){
        if (modalType==="showcase"){
            submitShowcaseSelection()
        }else if(modalType==="header"){
            dispatch(updateUser({user:{id:user.id, header: photos[selectedPhotos[0]].img}}))
        } else if(modalType==="profile"){
            dispatch(updateUser({user:{id:user.id, header: photos[selectedPhotos[0]].img}}))
        }
    }
    function photostreamClick(){
        if (!photostreamActive){
            setPhotostreamActive(true)
            setAlbumsActive(false)
            setUploadActive(false)
            setSelectedActive(false)
        }
    }
    function albumsClick(){
        if (!albumsActive){
            setAlbumsActive(true)
            setPhotostreamActive(false)
            setUploadActive(false)
            setSelectedActive(false)
        }
    }
    function uploadClick(){
        if (!uploadActive){
            setUploadActive(true)
            setPhotostreamActive(false)
            setAlbumsActive(false)
            setSelectedActive(false)
        }
    }
    function selectedClick(){
        if (!selectedActive){
            setSelectedActive(true)
            setUploadActive(false)
            setPhotostreamActive(false)
            setAlbumsActive(false)
        }
    }
    function bgClick(e){
        // debugger
        if (Object.values(e.target.classList).includes("cover-screen")){
            console.log("true")
            setShowcaseModal(false)
        }
    }
    if (photos){
        return(
        <div className="cover-screen" onClick={bgClick}>
            <div className="selection-modal">
            <section className="acct-tabs on-modal">
                <button className={photostreamActive? "active" : ""} onClick={photostreamClick}>Photostream</button>
                <button className={albumsActive? "active" : ""} onClick={albumsClick}>Albums</button>
                {modalType==="showcase"&&<button className={selectedActive? "active" : ""} onClick={selectedClick}>Selected</button>}
                {modalType!=="showcase"&&<button className={uploadActive? "active" : ""} onClick={uploadClick}>Upload</button>}
                <button className="modal-close-out" onClick={()=>setShowcaseModal(false)}><i class="fa-regular fa-xmark"></i></button>
            </section>
            <section className="modal-main">
                {photostreamActive&&
                photos.map((photo, i)=>{
                    return(
                    <div key={i} className={selectedPhotos.includes(photo.id)?"square-photo-container selected":"square-photo-container"}>
                        {selectedPhotos.includes(photo.id)&&<p className="select-check">✔</p>}
                        <p className="square-photo-title">{photo.title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photo.img} alt={photo.title}  className="square-photo" onClick={()=>clickPhoto(photo.id)}/>
                    </div>)
                })
                }
                {albumsActive&& <h1>{user.displayName} has no albums yet</h1>}
                {selectedActive&&selectedPhotos.map((id, i)=>{
                    return(
                    <div key={i} className="square-photo-container">
                        <button className="square-photo-close-out" onClick={()=>deselectPhoto(id)}><i class="fa-regular fa-xmark"></i></button>
                        
                        <p className="square-photo-title">{photos[id].title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photos[id].img} alt={photos[id].title}  className="square-photo"/>
                    </div>)
                })}
                {uploadActive&& 
                <form>
                </form>}
            </section>
            <section className="modal-bottom">
                <div>
                {modalType ==="showcase"&&<p>{bottomText}</p>}
                </div>
                <form onSubmit={submitSelection}>
                    <input type="submit" value={selectedPhotos.length===1?"Select photo":"Select photos"} />
                </form>
            </section>

            </div>
        </div>
    )}
    
}