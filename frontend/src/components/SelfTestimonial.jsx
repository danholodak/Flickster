import { useState } from "react";
import { Link } from "react-router-dom";
import TestimonialEditForm from "./TestimonialEditForm";
import { deleteTestimonial } from "../store/testimonials";
import { useDispatch } from "react-redux";

export default function SelfTestimonial({testimonialUser, i, testimonial}){
    const [editTestimonial, setEditTestimonial] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [testimonialBody, setTestimonialBody] = useState(testimonial.body)
    const dispatch = useDispatch()

    function confirmDelete(){ 
        dispatch(deleteTestimonial(testimonial.id))
    }
    if(editTestimonial){
        return(
            <TestimonialEditForm  setEditTestimonial={setEditTestimonial} sessionUser={testimonialUser} testimonial={testimonial}setTestimonialBody={setTestimonialBody}/>
        )
    }else
    return (
        <>
        {deleteModal && <div className="cover-screen">
        <div className="delete-form">
            <div className="delete-form-top"><h3>Delete Testimonial</h3><button className="x-out" onClick={()=>{setDeleteModal(false)}}>X</button></div>
            <div className="delete-form-mid"><p>Do you want to permanently delete this testimonial?</p></div>
            <div className="delete-form-bottom"><button className="cancel" onClick={()=>{setDeleteModal(false)}}>Cancel</button><button className="delete" onClick={confirmDelete}>Delete</button></div>
        </div>
        </div>}
        <div className="testimonial" key={i}>
            <Link to={`/photos/${testimonialUser.id}`}><img src={testimonialUser.profilePicUrl} alt={`${testimonialUser.displayName} profile`} className="prof-pic-50-circle" /></Link>
            <div className="testimonial-right">
                <header className="testimonial-header">
                <p><Link to={`/photos/${testimonialUser.id}`}>{testimonialUser.firstName} {testimonialUser.lastName}</Link> says:</p>
                <section className="button-section">
                    <button className="testimonial-edit-button" onClick={()=>setEditTestimonial(true)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="testimonial-edit-button" onClick={()=>setDeleteModal(true)}><i className="fa-solid fa-trash-can"></i></button>
                </section>
                </header>
                <p>{testimonialBody}</p>
            </div>
        </div>
        </>
    )

}