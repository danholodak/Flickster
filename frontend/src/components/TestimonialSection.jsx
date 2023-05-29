import SelfTestimonial from "./SelfTestimonial";
import OtherTestimonial from "./Testimonial";
import TestimonialInputForm from "./TestimonialInputForm";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers, fetchUser } from "../store/users";
import './css/CommentSection.css'
import { fetchTestimonials, getTestimonials } from "../store/testimonials";

export default function TestimonialSection({sessionUser, user, testimonialClicked, setTestimonialClicked}){
    const dispatch = useDispatch()
    const testimonialUsers = useSelector(getUsers)
    const testimonials = useSelector(getTestimonials)
    const {userId, photoId} = useParams();
    const hasTestimonials = user.testimonals?.length>0
    useEffect(()=>{
        Object.values(testimonials).forEach((testimonial)=>{
            dispatch(fetchUser(testimonial.author_id))
        })
    }, [testimonials, dispatch])
    useEffect(()=>{
        dispatch(fetchTestimonials(user.id))
    }, [user, dispatch])
    return (
    <>
    <div className="about-section">
        {user.testimonials.map((id, i)=>
        (testimonials[id].authorId !== sessionUser.id)?
            <OtherTestimonial testimonialUser={testimonialUsers[testimonials[id].authorId]} i={i} testimonial={testimonials[id]}/>
            :<SelfTestimonial path={`/photos/${userId}/${photoId}`} testimonialUser={testimonialUsers[testimonials[id].authorId]} i={i} testimonial={testimonials[id]}/>
        )}
            {!hasTestimonials&&!testimonialClicked&&<p>Have something nice to say about {user.firstName} {user.lastName}? <strong className="testimonial-toggle" onClick={()=>setTestimonialClicked(true)}>Write a testimonial</strong></p>}
            {testimonialClicked&&<TestimonialInputForm user={user} sessionUser={sessionUser} setTestimonialClicked={setTestimonialClicked} />}
        </div>
    </>)
}