import csrfFetch from "./csrf"

const RECEIVE_TESTIMONIAL = 'testimonials/RECEIVE_TESTIMONIAL'
const RECEIVE_TESTIMONIALS = 'testimonials/RECEIVE_TESTIMONIALS'
const REMOVE_TESTIMONIAL = 'testimonials/REMOVE_TESTIMONIAL'

const receiveTestimonial = (testimonial) => ({
    type: RECEIVE_TESTIMONIAL,
    testimonial
})
const receiveTestimonials = (testimonials) => ({
    type: RECEIVE_TESTIMONIALS,
    testimonials
})
const removeTestimonial = (testimonialId) => ({
    type: REMOVE_TESTIMONIAL,
    testimonialId
})
export const getTestimonial = (testimonialId) => state => state.testimonials?.[testimonialId]? state.testimonials[testimonialId] : null
export const getTestimonials = state => state.testimonials? state.testimonials : {}

//thunk action creators
export const fetchTestimonial = (testimonialId) => async (dispatch) => {
    const response = await csrfFetch(`/api/testimonials/${testimonialId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveTestimonial(data.testimonial))
    }
}
export const fetchTestimonials = (photoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/testimonials/${photoId}`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveTestimonials(data))
    }
}

export const createTestimonial = (testimonial) => async dispatch =>{
    const res = await csrfFetch('/api/testimonials', {
        method: 'POST',
        body: JSON.stringify(testimonial),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveTestimonial(data.testimonial));
}
export const updateTestimonial = (testimonial) => async dispatch =>{
    const res = await csrfFetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        body: JSON.stringify({testimonial: testimonial}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    dispatch(receiveTestimonial(data.testimonial));
}
export const deleteTestimonial = (testimonialId) => async dispatch =>{
    const res = await csrfFetch(`/api/testimonials/${testimonialId}`,{
        method: 'DELETE'
    })
    if (res.ok){dispatch(removeTestimonial(testimonialId));}   
}


export default function testimonialsReducer(state ={}, action){
    const newState = {...state};
    switch(action.type){
        case RECEIVE_TESTIMONIAL:
            newState[action.testimonial.id] = action.testimonial;
            return newState;
        case RECEIVE_TESTIMONIALS:
            return {...newState, ...action.testimonials};
        case REMOVE_TESTIMONIAL:
            delete newState[action.testimonialId];
            return newState;
        default:
            return state;
    }

}