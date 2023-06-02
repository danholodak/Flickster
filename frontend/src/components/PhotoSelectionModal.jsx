import { fetchPhotos, getPhotos, updatePhoto } from "../store/photos"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useState } from "react"


export default function PhotoSelectionModal(user, photos, modalType){
    let limit = 1
    if (modalType="showcase"){
        limit = 25
    }
    let showcasePhotos = []
    let selectedPhotos = []
    if (photos){
        photos.forEach((photo)=>{
            if (photo.showcase){
                showcasePhotos.push(photo.id)
                selectedPhotos.push(photo.id)
            }
        })
    }
    let photosLeft = limit-showcasePhotos.length
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

    //get all the photos, make an array of previously showcased photos
    function deselectPhoto(id){
        let photoindex = selectedPhotos.findIndex(id)
        selectedPhotos.splice(photoindex, 1)
        //if photo is in the previously showcased, mark for deselect update, otherwise remove from mark for select update 
    }
    function clickPhoto(id){
        if (selectedPhotos.includes(id)){
            deselectPhoto(id)
        }else if (photosLeft>0){
            selectedPhotos.push(id)           
        }
        //if limit reached only deselect available
        // if alrady selected add to 
    }
    function submitSelection(){
        // compare previously selected collection with newly selected collection, remove newly unselected, add newly selected
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
    if (photos){
        return(
        <div className="cover-screen">
            <div className="selection-modal">
            <section className="acct-tabs">
                <button className={photostreamActive? "active" : ""} onClick={photostreamClick}>Photostream</button>
                <button className={albumsActive? "active" : ""} onClick={albumsClick}>Albums</button>
                {modalType==="showcase"&&<button className={selectedActive? "active" : ""} onClick={selectedClick}>Selected</button>}
                {modalType!=="showcase"&&<button className={uploadActive? "active" : ""} onClick={uploadClick}>Upload</button>}
            </section>
            <section className="modal-main">
                {photostreamActive&&
                photos.map((photo)=>{
                    return(
                    <div className="square-photo-container">
                        <button className="square-photo-close-out"></button>
                        <p className="square-photo-title">{photo.title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photo.img} alt={photo.title}  className="square-photo"/>
                    </div>)
                })
                }
                {albumsActive&& <h1>{user.displayName} has no albums yet</h1>}
                {/* selectedActive: loop through selected photos put x with onClick as deselectPhoto, if showcase give class selected */}
                {uploadActive&& 
                <form>
                </form>}
            </section>
            <section className="modal-bottom">
                {modalType ==="showcase"&&<p>{bottomText}</p>}

            </section>

            </div>
        </div>
    )}
    
}