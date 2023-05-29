import SelfComment from "./SelfComment";
import OtherComment from "./Comment";
import CommentInputForm from "./CommentInputForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, fetchComments } from "../store/comments";
import { getUsers, fetchUser } from "../store/users";
import './css/CommentSection.css'

export default function CommentSection({sessionUser, photo}){
    const dispatch = useDispatch()
    const commentUsers = useSelector(getUsers)
    const comments = useSelector(getComments)
    const {userId, photoId} = useParams();
    useEffect(()=>{
        Object.values(comments).forEach((comment)=>{
            dispatch(fetchUser(comment.authorId))
        })
    }, [comments, dispatch])
    useEffect(()=>{
        dispatch(fetchComments(photoId))
    }, [photoId, dispatch])
    return (
    <>
    
    {comments&&commentUsers&&<div className="comment-section">
        {photo.comments?.map((id, i)=>
        (comments[id]?.authorId !== sessionUser.id)?
            <OtherComment commentUser={commentUsers[comments[id]?.authorId]} i={i} comment={comments[id]}/>
            :<SelfComment path={`/photos/${userId}/${photoId}`}commentUser={commentUsers[comments[id]?.authorId]} i={i} comment={comments[id]}/>
        
        )}
            <CommentInputForm sessionUser={sessionUser} photo={photo}/>
        </div>}
    </>)
}