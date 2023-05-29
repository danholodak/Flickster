import { useState } from "react";
import { Link } from "react-router-dom";
import CommentEditForm from "./CommentEditForm";
import { deleteComment } from "../store/comments";
import { useDispatch } from "react-redux";

export default function SelfComment({commentUser, i, comment}){
    const [editComment, setEditComment] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const dispatch = useDispatch()

    function confirmDelete(){ 
        dispatch(deleteComment(comment.id))
    }
    if(editComment){
        return(
            <CommentEditForm  setEditComment={setEditComment} sessionUser={commentUser} comment={comment}/>
        )
    }else
    return (
        <>
        {deleteModal && <div className="cover-screen">
        <div className="delete-form">
            <div className="delete-form-top"><h3>Delete Comment</h3><button className="x-out" onClick={()=>{setDeleteModal(false)}}>X</button></div>
            <div className="delete-form-mid"><p>Do you want to permanently delete this comment?</p></div>
            <div className="delete-form-bottom"><button className="cancel" onClick={()=>{setDeleteModal(false)}}>Cancel</button><button className="delete" onClick={confirmDelete}>Delete</button></div>
        </div>
        </div>}
        <div classname="comment" key={i}>
            <Link to={`/photos/${commentUser.id}`}><img src={commentUser.profilePicUrl} alt={`${commentUser.displayName} profile`} className="prof-pic-60-circle" /></Link>
            <div className="comment-right">
                <header className="comment-header">
                <Link to={`/photos/${commentUser.id}`}>{commentUser.firstName} {commentUser.lastName}</Link>
                <section className="button-section">
                    <button onClick={()=>setEditComment(true)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={()=>setDeleteModal(true)}><i class="fa-solid fa-trash-can"></i></button>
                </section>
                </header>
                <p>{comment.body}</p>
            </div>
        </div>
        </>
    )

}