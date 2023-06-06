import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser, updateUser } from "../store/users";
import { useEffect } from "react";
import './css/AboutPage.css'
import { useState } from "react";
import TestimonialSection from "./TestimonialSection";
import { getPhotos, fetchPhotos } from "../store/photos";
import { Link } from "react-router-dom";
import PhotoSelectionModal from "./PhotoSelectionModal";

export default function AboutContentSelf(){
    const {userId} = useParams()
    const user = useSelector(getUser(userId));
    const dispatch = useDispatch()
    const [currentOccupation, setCurrentOccupation] = useState(user?.occupation)
    const [currentHometown, setCurrentHometown] = useState(user?.hometown)
    const [currentCurrentCity, setCurrentCurrentCity] = useState(user?.currentCity)
    const [currentCountry, setCurrentCountry] = useState(user?.country)
    const [currentWebsite, setCurrentWebsite] = useState(user?.website)
    const [currentFacebook, setCurrentFacebook] = useState(user?.facebook)
    const [currentTwitter, setCurrentTwitter] = useState(user?.twitter)
    const [currentInstagram, setCurrentInstagram] = useState(user?.instagram)
    const [currentTumblr, setCurrentTumblr] = useState(user?.tumblr)
    const [currentPinterest, setCurrentPinterest] = useState(user?.pinterest)
    const [descriptionEdit, setDescriptionEdit] = useState(false)
    const [showcaseNameEdit, setShowcaseNameEdit] = useState(false)
    const [showcaseModal, setShowcaseModal] = useState(false)
    const [infoEdit, setInfoEdit] = useState(false)
    const allphotos = useSelector(getPhotos)
    const photos = Object.values(allphotos).filter((photo)=>photo.userId === user.id)
    useEffect(()=>{
        dispatch(fetchUser(userId))
        dispatch(fetchPhotos())
    }, [userId, dispatch])
    const sessionUser = useSelector(state => state.session?.user);
    const [currentDescription, setCurrentDescription] = useState(user?.description)
    const months = ["January","February","March","April","May","June","July","August","September","October","November","Decmber"]
    const joinedYear = new Date(user?.createdAt).getFullYear()
    const joinedMonth = months[new Date(user?.createdAt).getMonth()]
    const hasTestimonials = user.testimonials?.length>0

    let viewcount = 0
    photos.forEach((photo)=>{
        viewcount+=photo.views
    })
    const showcasePhotos = photos.filter((photo)=>photo.showcase === true)
    const popularPhotos = photos.sort((a, b)=> a.views-b.views)
    const MostPopularPhotos = popularPhotos.slice(0,24)
    let testimonialClicked
    let setTestimonialClicked
    function submitDescription(){
        if(currentDescription!==""){
            const updatedDescriptionUser = {user:{id: user.id, description: currentDescription}}
            dispatch(updateUser(updatedDescriptionUser))
            setDescriptionEdit(false)
        }else{
            setCurrentDescription(user?.description)
            setDescriptionEdit(false)
            alert("Description must include at least one character.")
        }

    }
    function submitInfo(){
        const updatedInfoUser={user:{id: user.id}}
        if(currentOccupation&&currentOccupation!==""&&currentOccupation!==user.occupation){
            updatedInfoUser.user.occupation = currentOccupation
        }
        if(currentHometown&&currentHometown!==""&&currentHometown!==user.hometown){
            updatedInfoUser.user.hometown = currentHometown
        }
        if(currentCurrentCity&&currentCurrentCity!==""&&currentCurrentCity!==user.currentCity){
            updatedInfoUser.user.currentCity = currentCurrentCity
        }
        if(currentCountry&&currentCountry!==""&&currentCountry!==user.country){
            updatedInfoUser.user.country = currentCountry
        }
        if(currentWebsite&&currentWebsite!==""&&currentWebsite!==user.website){
            updatedInfoUser.user.website = currentWebsite
        }
        if(currentFacebook&&currentFacebook!==""&&currentFacebook!==user.facebook){
            updatedInfoUser.user.facebook = currentFacebook
        }
        if(currentTwitter&&currentTwitter!==""&&currentTwitter!==user.twitter){
            updatedInfoUser.user.twitter = currentTwitter
        }
        if(currentInstagram&&currentInstagram!==""&&currentInstagram!==user.instagram){
            updatedInfoUser.user.instagram = currentInstagram
        }
        if(currentTumblr&&currentTumblr!==""&&currentTumblr!==user.tumblr){
            updatedInfoUser.user.tumblr = currentTumblr
        }
        if(currentPinterest&&currentPinterest!==""&&currentPinterest!==user.pinterest){
            updatedInfoUser.user.pinterest = currentPinterest
        }
        dispatch(updateUser(updatedInfoUser))
            setInfoEdit(false)
        //collect all fields with info and submit them in a update user action,  set infoEdit to false
    }
    function cancelDescription(){
        setCurrentDescription(user?.description)
        setDescriptionEdit(false)
    }
    return(
        <>
        {showcaseModal&&<PhotoSelectionModal user={user} photos={photos} modalType={"showcase"} setShowcaseModal={setShowcaseModal}/>}
        <section className="content column">
                    <div className="center-column">
                        {currentDescription&&currentDescription.length>0&&!descriptionEdit&&
                            <section className="about-description about-section space-btwn">
                                <p className="about-description">{currentDescription}</p>
                                <button className="edit-user-info-button" onClick={()=>setDescriptionEdit(true)}><i className="fa-solid fa-pencil"></i></button> 
                            </section>
                        }
                        {!currentDescription&&!descriptionEdit&&
                            <div className="space-btwn"><p onClick={()=>setDescriptionEdit(true)}>Write a little about yourself</p> <button className="edit-user-info-button" onClick={()=>setDescriptionEdit(true)}><i className="fa-solid fa-pencil"></i></button></div>
                        }
                        {descriptionEdit&&
                        <section className="about-section">
                            <form className="description-form" onSubmit={submitDescription}>
                                <textarea className="description-input" onChange={(e)=>setCurrentDescription(e.target.value)}>{currentDescription}</textarea>
                                <section className="description-button-section">
                                    <button className="testimonial-button cancel-button" onClick={cancelDescription}>Cancel</button>
                                    <input className="testimonial-button" type="submit" value="Save"/>
                                </section>
                            </form>
                            </section>
                        }
                        
                    <section className="about-showcase about-section">
                    <button className="edit-user-info-button" onClick={()=>setShowcaseModal(true)}><i className="fa-solid fa-plus"></i></button>
                        {!showcaseNameEdit&&<h3>Showcase</h3>}
                        {showcasePhotos.length==0&&
                        <div className="center-text">
                        <p>This is your showcase. <br />
                        Show off up to 25 of your photos.</p>
                        <p className="showcase-get-started" onClick={()=>setShowcaseModal(true)}>Get started</p>
                        </div>
                        }

                    </section>
                    {!infoEdit&&<section className="about-info about-section">
                    <button className="edit-user-info-button" onClick={()=>setInfoEdit(true)}><i className="fa-solid fa-pencil"></i></button>
                        <div className="side-by-side">
                            <div className="about-info-labels">
                                {user&& <p>Joined</p>}
                                {user&&user.occupation&&<p>Occupation</p>}
                                {user&&user.hometown&&<p>Hometown</p>}
                                {user&&user.currentCity&&<p>Current city</p>}
                                {user&&user.country&&<p>Country</p>}
                                {user&&user.email&&<p>Email</p>}
                            </div>
                            <div className="about-info-data">
                                {user&& <p>{joinedMonth} {joinedYear}</p>}
                                {user&&user.occupation&&<p>{currentOccupation}</p>}
                                {user&&user.hometown&&<p>{currentHometown}</p>}
                                {user&&user.currentCity&&<p>{currentCurrentCity}</p>}
                                {user&&user.country&&<p>{currentCountry}</p>}
                                {user&&user.email&&<a href={`mailto:${user.email}`}>{user.email}</a>}
                            </div>
                        </div>
                        <div className="side-by-side">
                            <div className="about-info-labels">
                                {user&&user.website&&<p>Website</p>}
                                {user&&user.facebook&&<p>Facebook</p>}
                                {user&&user.twitter&&<p>Twitter</p>}
                                {user&&user.instagram&&<p>Instagram</p>}
                                {user&&user.pinterest&&<p>Pinterest</p>}
                                {user&&user.tumblr&&<p>Tumblr</p>}
                            </div>
                            <div className="about-info-data last">
                                {user&&user.website&&<p><a href={currentWebsite}>{user.websiteName||currentWebsite}</a></p>}
                                {user&&user.facebook&&<p><a href={currentFacebook}>{currentFacebook}</a></p>}
                                {user&&user.twitter&&<p><a href={currentTwitter}>{currentTwitter}</a></p>}
                                {user&&user.instagram&&<p><a href={currentInstagram}>{currentInstagram}</a></p>}
                                {user&&user.pinterest&&<p><a href={currentPinterest}>{currentPinterest}</a></p>}
                                {user&&user.tumblr&&<p><a href={currentTumblr}>{currentTumblr}</a></p>}
                            </div>
                        </div>
                    </section>}

                    {infoEdit&&
                    
                        <section className="about-info about-section">
                        <div className="side-by-side">
                        <div className="about-info-labels">
                            {<p>Joined</p>}
                            {<p>Occupation</p>}
                            {<p>Hometown</p>}
                            {<p>Current city</p>}
                            {<p>Country</p>}
                            {<p>Email</p>}
                        </div>
                        <div className="about-info-data-inputs">
                            {user&& <p className="less-bottom-margin">{joinedMonth} {joinedYear}</p>}
                            <input className="about-info-input" type="text"  onChange={(e)=>setCurrentOccupation(e.target.value)} value={currentOccupation}/>
                            <input className="about-info-input" type="text"  onChange={(e)=>setCurrentHometown(e.target.value)} value={currentHometown}/>
                            <input className="about-info-input" type="text"  onChange={(e)=>setCurrentCurrentCity(e.target.value)} value={currentCurrentCity}/>
                            <input className="about-info-input" type="text"  onChange={(e)=>setCurrentCountry(e.target.value)} value={currentCountry}/>
                            {user&&user.email&&<p className="less-margin-top">{user.email}</p>}
                        </div>
                        </div>
                        <div className="side-by-side last">
                            <div className="about-info-labels">
                                {<p>Website</p>}
                                {<p>Facebook</p>}
                                {<p>Twitter</p>}
                                {<p>Instagram</p>}
                                {<p>Pinterest</p>}
                                {<p>Tumblr</p>}
                            </div>
                            <div className="about-info-data-inputs last">
                                <input className="about-info-input" type="text"  onChange={(e)=>setCurrentWebsite(e.target.value)} value={currentWebsite}/>
                                <input className="about-info-input" type="text"  onChange={(e)=>setCurrentFacebook(e.target.value)} value={currentFacebook}/>
                                <input className="about-info-input" type="text"  onChange={(e)=>setCurrentTwitter(e.target.value)} value={currentTwitter}/>
                                <input className="about-info-input" type="text"  onChange={(e)=>setCurrentInstagram(e.target.value)} value={currentInstagram}/>
                                <input className="about-info-input" type="text"  onChange={(e)=>setCurrentPinterest(e.target.value)} value={currentPinterest}/>
                                <input className="about-info-input" type="text"  onChange={(e)=>setCurrentTumblr(e.target.value)} value={currentTumblr}/>
                            </div>
                        </div>
                        <form onSubmit={submitInfo} className="info-button-section">
                            <input className="testimonial-button" type="submit" value="Done"/>
                        </form>
                    </section>
                }
                    <section className="about-stats about-section">
                        
                        <div className="about-stat">
                            <h2>{viewcount}</h2>
                            <p>{viewcount==1?"view":"views"}</p>
                        </div>
                        <div className="about-stat">
                            <h2>0</h2>
                            <p>tags</p>
                        </div>
                        <div className="about-stat">
                            <h2>0</h2>
                            <p>geotags</p>
                        </div>
                        <div className="about-stat">
                            <h2>0</h2>
                            <p>faves</p>
                        </div>
                        <div className="about-stat">
                            <h2>0</h2>
                            <p>groups</p>
                        </div>
                    </section>
                    </div>
                    <div className="section-label">
                        <h2>Most popular photos</h2>
                    </div>
                    <section className="popular-photos">
                    <section className="photo-column">
                        {MostPopularPhotos.map((photo, i)=><Link key={i} className={"popular-photo"} to={`/photos/${photo?.userId}/${photo.id}`}><img  src={photo?.img} alt={photo?.title}  /></Link>)}
                    </section>
                </section>
                    <div className="section-label">
                        <h2>Testimonials</h2>
                    </div>
                    
                    <div className="center-column labeled">
                        {hasTestimonials?
                        <TestimonialSection sessionUser={sessionUser} user={user} currentUser={true} testimonialClicked={testimonialClicked} setTestimonialClicked={setTestimonialClicked} hasTestimonials={hasTestimonials}/>
                        :<div className="about-section"><p>Nobody has added a testimonial for you yet.</p></div>}
                    </div>
        </section>
        </>
    )
}