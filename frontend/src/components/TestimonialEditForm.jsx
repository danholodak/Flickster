import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTestimonial } from "../store/testimonials";

export default function TestimonialEditForm({setEditTestimonial, sessionUser, testimonial}){
    const [currentTestimonial, setCurrentTestimonial] = useState(testimonial);
    const dispatch = useDispatch()
    function submitTestimonial(){
        if (currentTestimonial !== ""){
            const newTestimonial={
                body: currentTestimonial,
                id: testimonial.id
            }
            dispatch(updateTestimonial(newTestimonial))
            setEditTestimonial(false)
        }else{
            alert("Testimonial must be at least 1 character")
            setCurrentTestimonial(testimonial)
            setEditTestimonial(false)
        }
    }
    return (
        <form classname="testimonial-form" onSubmit={submitTestimonial}>
        <img src={sessionUser?.profilePicUrl} alt={`${sessionUser.displayName} profile`} className="prof-pic-60-circle" />
        <div>
            <textarea className="testimonial-input" cols="30" rows="10" placeholder='Add a testimonial' onChange={(e)=>setCurrentTestimonial(e.target.value)}>{currentTestimonial}</textarea>
            <input type="submit" value={"Done"}/>
        </div>
    </form>
    )
}