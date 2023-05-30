import { Link } from "react-router-dom";

export default function OtherTestimonial({testimonialUser, i, testimonial}){

    return (
        <div className="testimonial" key={i}>
            <Link to={`/photos/${testimonialUser.id}`}><img src={testimonialUser.profilePicUrl} alt={`${testimonialUser.displayName} profile`} className="prof-pic-60-circle" /></Link>
            <div>
                <p><Link to={`/photos/${testimonialUser.id}`}>{testimonialUser.firstName} {testimonialUser.lastName}</Link> says:</p>
                <p>{testimonial.body}</p>                
            </div>
        </div>
    )

}