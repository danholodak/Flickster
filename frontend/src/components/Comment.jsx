import { Link } from "react-router-dom";

export default function OtherComment({commentUser, i, comment}){

    return (
        <div classname="comment" key={i}>
            <Link to={`/photos/${commentUser.id}`}><img src={commentUser.profilePicUrl} alt={`${commentUser.displayName} profile`} className="prof-pic-60-circle" /></Link>
            <div>
                <Link to={`/photos/${commentUser.id}`}>{commentUser.firstName} {commentUser.lastName}</Link>
                <p>{comment.body}</p>                
            </div>
        </div>
    )

}
