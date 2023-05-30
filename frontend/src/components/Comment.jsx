import { Link } from "react-router-dom";

export default function OtherComment({commentUser, i, comment}){
    if (commentUser&&comment){
    return (
        <div className="comment" key={i}>
            <Link to={`/photos/${commentUser.id}`}><img src={commentUser.profilePicUrl} alt={`${commentUser.displayName} profile`} className="prof-pic-40-circle" /></Link>
            <div>
            <header className="comment-header">
                <Link to={`/photos/${commentUser.id}`}>{commentUser.firstName} {commentUser.lastName}</Link>
            </header>
                <p>{comment.body}</p>                
            </div>
        </div>
    )
}

}
