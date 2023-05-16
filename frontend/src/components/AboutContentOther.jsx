import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { getPhotos, fetchPhotos } from "../store/photos";
import { useEffect } from "react";
import './css/AboutPage.css'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AboutContentOther(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
        dispatch(fetchPhotos())
    }, [userId, dispatch])
    // user has a list of photo IDs in their showcase
    // photos are true or false 'showcased'
    // up to 15 photos showcased
    // testimonials are like comments, but have author id and subject id both point to users table
    // most popular photos is based on views
    const sessionUser = useSelector(state => state.session?.user);
    const user = useSelector(getUser(userId));
    const photos = useSelector(getPhotos())
    const months = ["January","February","March","April","May","June","July","August","September","October","November","Decmber"]
    const joinedYear = new Date(user?.createdAt).getFullYear()
    const joinedMonth = months[new Date(user?.createdAt).getMonth()]
    const showcasePhotos = []
    return(
        <>
            <section className="content column">
                <div className="center-column">
                    {user.description&&
                        <section className="about-description about-section">
                            <p className="description">{user.description}</p>
                        </section>
                    }

                    {user.showcase&&
                    <section className="about-showcase about-section">
                        <h3>Showcase</h3>
                        <section className="photo-column">
                        {showcasePhotos.map((id, i)=><Link to={`/photos/${photos[id]?.userId}/${id}`}><img key={i} src={photos[id]?.img} alt={photos[id]?.title}  /></Link>)}
                    </section>
                    </section>} 
                    <section className="about-info about-section">
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
                        {user&&user.occupation&&<p>{user.occupation}</p>}
                        {user&&user.hometown&&<p>{user.hometown}</p>}
                        {user&&user.currentCity&&<p>{user.currentCity}</p>}
                        {user&&user.country&&<p>{user.contry}</p>}
                        {user&&user.email&&<a href={`mailto:${user.email}`}>{user.email}</a>}
                        </div>
                        <div className="about-info-labels">
                        {user&&user.website&&<p>Website</p>}
                        {user&&user.facebook&&<p>Facebook</p>}
                        {user&&user.twitter&&<p>Twitter</p>}
                        {user&&user.instagram&&<p>Instagram</p>}
                        {user&&user.pinterest&&<p>Pinterest</p>}
                        {user&&user.tumblr&&<p>tumblr</p>}
                        </div>
                        <div className="about-info-data">
                        {user&&user.website&&<a href={user.website}>{user.website}</a>}
                        {user&&user.facebook&&<a href={user.facebook}>{user.facbook}</a>}
                        {user&&user.twitter&&<a href={user.twitter}>{user.twitter}</a>}
                        {user&&user.instagram&&<a href={user.instagram}>{user.instagram}</a>}
                        {user&&user.pinterest&&<a href={user.pinterest}>{user.pinterest}</a>}
                        {user&&user.tumblr&&<a href={user.tumblr}>{user.tumblr}</a>}
                        </div>
                    </section>
                    <section className="about-stats about-section">
                        <div className="about-stat">
                            <h2>0</h2>
                            <p>views</p>
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
                <div className="section-label">
                    <h2>Testimonials</h2>
                </div>
                
                <div className="center-column labeled">
                    {user&&(user.testimonials.length !== 0)&&user.testimonials.map((id, i)=>
                    <div className='testimonial'>
                        <img src={users[testimonials[id].authorId]} alt={`testimonials`} />
                    </div>
                    )}
                </div>
            </section>
        </>
    )
}