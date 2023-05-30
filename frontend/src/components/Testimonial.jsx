import { Link } from "react-router-dom";

export default function OtherTestimonial({testimonialUser, i, testimonial}){
    if (testimonialUser&&testimonial)
    {return (
        <div className="testimonial" key={i}>
            <Link to={`/photos/${testimonialUser.id}`}><img src={testimonialUser.profilePicUrl} alt={`${testimonialUser.displayName} profile`} className="prof-pic-50-circle" /></Link>
            <div>
            <header className="testimonial-header">
                <p><Link to={`/photos/${testimonialUser.id}`}>{testimonialUser.firstName} {testimonialUser.lastName}</Link> says:</p>
            </header>    
                <p>{testimonial.body}</p>                
            </div>
        </div>
    )}

}