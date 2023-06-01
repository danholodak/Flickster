import { fetchPhotos, getPhotos, updatePhoto } from "../store/photos"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"


export default function PhotoSelectionModal(user, photos, modalType){
    let limit = 1
    if (modalType="showcase"){
        limit = 25
    }
    //get all the photos, make an array of previously showcased photos
    function deselectPhoto(){
        //if photo is in the previously showcased, mark for deselect update, otherwise remove from mark for select update 
    }
    function clickPhoto(){
        //if limit reached only deselect available
        // if alrady selected add to 
    }
    function submitSelection(){
        // compare previously selected collection with newly selected collection, remove newly unselected, add newly selected
    }
    
}