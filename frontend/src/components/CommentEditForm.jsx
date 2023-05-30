import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../store/comments";
import { Link } from "react-router-dom";

export default function CommentEditForm({setEditComment, sessionUser, comment, setCommentBody}){
    const [currentComment, setCurrentComment] = useState(comment.body);
    const dispatch = useDispatch()
    function submitComment(){
        if (currentComment !== ""){
            const newComment={
                body: currentComment,
                id: comment.id
            }
            dispatch(updateComment(newComment))
            setCommentBody(currentComment)
            setEditComment(false)
        }else{
            alert("Comment must be at least 1 character")
            setCurrentComment(comment.body)
            setEditComment(false)
        }
    }
    if (sessionUser){
        return (
            <form className="comment-form" onSubmit={submitComment}>
            <img src={sessionUser?.profilePicUrl} alt="current user profile picture" className="prof-pic-40-circle" />
            <div className="comment-input-section">
            <header className="comment-header">
                    <Link style={{marginBottom: "10px"}}to={`/photos/${sessionUser.id}`}>{sessionUser.firstName} {sessionUser.lastName}</Link>
            </header>
                <textarea className="comment-input" cols="30" rows="10" placeholder='Add a comment' onChange={(e)=>setCurrentComment(e.target.value)}>{currentComment}</textarea>
                <input className="comment-button" type="submit" value={"Done"}/>
            </div>
        </form>
        )
    }
}