import { useState } from "react";
import { createComment } from "../store/comments";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


export default function CommentInputForm({sessionUser, photo}){
    const [currentComment, setCurrentComment] = useState("");
    const [commentActive, setCommentActive] = useState(false)
    const dispatch = useDispatch()
    function submitComment(){
        if (currentComment !== ""){
            const newComment={
                comment: {body: currentComment,
                authorId: sessionUser.id,
                photoId: photo.id}
            }

            dispatch(createComment(newComment))
            setCurrentComment("")
            setCommentActive(false)
        }
    }
    useEffect(() => {
        if (!commentActive) return;
        const closeComment = (e) => {
            if(e.target.classList.contains('comment-input')){
                return;
            }
            setCommentActive(false);
        };
        document.addEventListener('click', closeComment);
        return () => document.removeEventListener("click", closeComment);
    }, [commentActive]);
    return (
        <form className="comment-form" onSubmit={submitComment}>
        <img src={sessionUser.profilePicUrl} alt={`${sessionUser.displayName} profile`} className="prof-pic-40-circle" />
        <div className="comment-input-section">           
            <textarea className={commentActive?"comment-input active":"comment-input"} cols="30" rows="10" placeholder='Add a comment' onChange={(e)=>setCurrentComment(e.target.value)} onClick={()=>setCommentActive(true)} value={currentComment}></textarea>
            {commentActive&&<input className="comment-input submit-button" type="submit" value="Comment"/>}
        </div>
    </form>
    )
}