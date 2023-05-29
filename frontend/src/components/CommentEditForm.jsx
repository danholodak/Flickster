import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../store/comments";

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
    return (
        <form classname="comment-form" onSubmit={submitComment}>
        <img src={sessionUser?.profilePicUrl} alt="current user profile picture" className="prof-pic-40-circle" />
        <div>
            <textarea className="comment-input" cols="30" rows="10" placeholder='Add a comment' onChange={(e)=>setCurrentComment(e.target.value)}>{currentComment}</textarea>
            <input type="submit" value={"Done"}/>
        </div>
    </form>
    )
}