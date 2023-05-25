import { useEffect, useState } from "react";
import { createTestimonial } from "../store/testimonials";
import { useDispatch } from "react-redux";

export default function TestimonialInputForm({user, sessionUser, setTestimonialClicked}){
    const [currentTestimonial, setCurrentTestimonial] = useState("");
    const [testimonialActive, setTestimonialActive] = useState(true)
    const dispatch = useDispatch()
    function submitTestimonial(){
        if (currentTestimonial !== ""){
            const newTestimonial={
                testimonial: {body: currentTestimonial, 
                authorId: sessionUser.id,
                subjectId: user.id}
            }
            debugger
            dispatch(createTestimonial(newTestimonial))
        }
    }
    useEffect(() => {
        if (!testimonialActive) return;
        const closeTestimonial = (e) => {
            if(e.target.classList.contains('testimonial-input')){
                return;
            }
            setTestimonialActive(false);
        };
        document.addEventListener('click', closeTestimonial);
        return () => document.removeEventListener("click", closeTestimonial);
    }, [testimonialActive]);
    return (
        <form className="testimonial-form" onSubmit={submitTestimonial}>
        <img src={sessionUser?.profilePicUrl} alt={`${sessionUser.displayName} profile`} className="prof-pic-60-circle" />
        <div className="testimonial-input-section">           
            <textarea className={testimonialActive?"testimonial-input active":"testimonial-input"} cols="30" rows="10" placeholder='Add a testimonial' onChange={(e)=>setCurrentTestimonial(e.target.value)} onClick={()=>setTestimonialActive(true)}>{currentTestimonial}</textarea>
            <section>
                <button className="cancel-button" onClick={()=>setTestimonialClicked(false)}>Cancel</button>
                <input className="testimonial-input button" type="submit" value="Post"/>
            </section>
        </div>
    </form>
    )
}