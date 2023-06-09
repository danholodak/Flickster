import {updatePhoto } from "../store/photos"
import { useDispatch } from "react-redux"
// import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateUser } from "../store/users"
import './css/PhotoSelectionModal.css'


export default  function PhotoSelectionModal({user, photos, modalType, setThisModal}){
    const dispatch = useDispatch()
    let limit = 1
    if (modalType === "showcase"){
        limit = 25
    }
    const [showcasePhotos, setShowcasePhotos] = useState({})
    const [selectedPhotos, setSelectedPhotos] = useState({})
    const [photostreamActive, setPhotostreamActive] = useState(true)
    const [albumsActive, setAlbumsActive] = useState(false)
    const [selectedActive, setSelectedActive] = useState(false)
    const [uploadActive, setUploadActive] = useState(false)

    useEffect(() => {
        if (photos && modalType === "showcase") {
            let forShowcase = photos.filter((photo) => photo.showcase)
            let showcaseObj = {}
            forShowcase.forEach((photo)=>{
                showcaseObj[photo.id] = photo
            })
            setShowcasePhotos(showcaseObj);
            setSelectedPhotos(showcaseObj);
            console.log(showcaseObj);
        }
    }, [])

    let photosLeft 
    let bottomText
    function getBottomText(){
        photosLeft = limit - Object.keys(selectedPhotos).length
        bottomText = `Choose up to ${photosLeft} more photos`;
        if (photosLeft === 1) {
            bottomText = "One photo to go, choose well!"
        } else if(photosLeft === 0) {
            bottomText = "Your showcase is full! Change photos";}
    }
    getBottomText()
    useEffect(()=>{
        getBottomText()
    }, [selectedPhotos])

    function deselectPhoto(e, id){
        setSelectedPhotos((prev)=>{
            let newSelections={...prev}
            delete newSelections[id]
            return newSelections
        })
        e.target.parentElement.classList.remove("selected")
        // console.log("deselected")
        photosLeft = limit-Object.keys(selectedPhotos).length
        //if photo is in the previously showcased, mark for deselect update, otherwise remove from mark for select update 
    }
    function deselectSelectedPhoto(id){
        setSelectedPhotos((prev)=>{
            let newSelections={...prev}
            delete newSelections[id]
            return newSelections
        })
        // console.log(selectedPhotos)
    }
    function switchSelection(e, photo){
        setSelectedPhotos((prev)=>{
            let newSelections={}
            newSelections[photo.id] = photo
            return newSelections
        })
        document.querySelector(".square-photo-container.selected")?.classList.remove("selected")
        e.target.parentElement.classList.add("selected")

    }

    function clickPhoto(e, photo){
        if (modalType === "profile"||modalType === "header"){
            switchSelection(e, photo)
            return
        }
        // debugger
        if (selectedPhotos[photo.id]){
            deselectPhoto(e, photo.id)
        }else if (photosLeft>0){
            setSelectedPhotos((prev)=>{
                let newSelections={...prev}
                newSelections[photo.id] = photo
                return newSelections
            })
            // console.log("selected")
            e.target.parentElement.classList.add("selected")
            photosLeft = limit-Object.keys(selectedPhotos).length
            // debugger           
        }
        //if limit reached only deselect available
        //if already selected deselect
    }
    function submitShowcaseSelection(){
       Object.keys(showcasePhotos).forEach((photoId)=>{
            if (showcasePhotos[photoId]&&!selectedPhotos[photoId]){
                dispatch(updatePhoto({id: photoId, showcase: false}))
            }
        })
        Object.keys(selectedPhotos).forEach((photoId)=>{
            if (selectedPhotos[photoId]&&!showcasePhotos[photoId]){
                dispatch(updatePhoto({id: photoId, showcase: true}))
            }
        })
        // compare previously showcased collection with newly selected collection, 
        // remove newly unselected, add newly selected, then close modal
        setThisModal(false)
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
            // debugger
            setThisModal(false)
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
                <button className="modal-close-out" onClick={()=>setThisModal(false)}><i className="fa-regular fa-x"></i></button>
            </section>
            <section className="modal-main">
                {photostreamActive&&
                photos.map((photo, i)=>{
                    return(
                    <div key={i} className={selectedPhotos[photo.id]?"square-photo-container selected":"square-photo-container"}>
                        {selectedPhotos[photo.id]&&<p className="select-check">✔</p>}
                        <p className="square-photo-title">{photo.title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={photo.img} alt={photo.title}  className="square-photo" onClick={(e)=>clickPhoto(e, photo)}/>
                    </div>)
                })
                }
                {albumsActive&& <div className="no-albums"><h1 >{user.displayName} has no albums yet</h1></div>}
                {selectedActive&&Object.keys(selectedPhotos).map((id, i)=>{
                    return(
                    <div key={i} className="square-photo-container">
                        <button className="square-photo-close-out" onClick={()=>deselectSelectedPhoto(id)}><i className="fa-regular fa-x"></i></button>
                        
                        <p className="square-photo-title">{selectedPhotos[id].title}</p>
                        <p className="square-photo-user">by {user.firstName} {user.lastName}</p>
                        <img src={selectedPhotos[id].img} alt={selectedPhotos[id].title}  className="square-photo"/>
                    </div>)
                })}
                {selectedActive&&Object.keys(selectedPhotos).length == 0&&<div className="no-albums"><h1>No photos are selected</h1></div>}
                {uploadActive&& 
                <form>
                </form>}
            </section>
            <section className="modal-bottom">
                <div>
                {modalType ==="showcase"&&<p>{bottomText}</p>}
                </div>
                <form onSubmit={submitSelection}>
                    <input type="submit" value={Object.keys(selectedPhotos).length===1?"Select photo":"Select photos"} />
                </form>
            </section>

            </div>
        </div>
                )
            }
    
}