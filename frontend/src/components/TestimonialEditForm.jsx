import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTestimonial } from "../store/testimonials";

export default function TestimonialEditForm({setEditTestimonial, sessionUser, testimonial, setTestimonialBody}){
    const [currentTestimonial, setCurrentTestimonial] = useState(testimonial.body);
    const dispatch = useDispatch()
    function submitTestimonial(){
        if (currentTestimonial !== ""){
            const newTestimonial={
                body: currentTestimonial,
                id: testimonial.id
            }
            dispatch(updateTestimonial(newTestimonial))
            setTestimonialBody(currentTestimonial)
            setEditTestimonial(false)
        }else{
            alert("Testimonial must be at least 1 character")
            setCurrentTestimonial(testimonial.body)
            setEditTestimonial(false)
        }
    }
    return (
        <form className="testimonial-form" onSubmit={submitTestimonial}>
        <img src={sessionUser?.profilePicUrl} alt={`${sessionUser.displayName} profile`} className="prof-pic-50-circle" />
        <div className="testimonial-input-section">
            <textarea className="testimonial-input" cols="30" rows="10" placeholder='Add a testimonial' onChange={(e)=>setCurrentTestimonial(e.target.value)}>{currentTestimonial}</textarea>
            <input className="testimonial-button" type="submit" value={"Done"}/>
        </div>
    </form>
    )
}