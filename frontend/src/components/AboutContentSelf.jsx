import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";
import './css/AboutPage.css'
import { useState } from "react";

export default function AboutContentSelf(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    const [descriptionEdit, setDescriptionEdit] = useState(false)
    const [showcaseNameEdit, setShowcaseNameEdit] = useState(false)
    const [infoEdit, setInfoEdit] = useState(false)
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const sessionUser = useSelector(state => state.session?.user);
    const user = useSelector(getUser(userId));
    const currentUser = (user?.id == sessionUser?.id)
    const months = ["January","February","March","April","May","June","July","August","September","October","November","Decmber"]
    const joinedYear = new Date(user?.createdAt).getFullYear()
    const joinedMonth = months[new Date(user?.createdAt).getMonth()]

    return(
        <>
        <section className="content column">
                    <div className="center-column">
                        {!currentUser&&user.description&&
                            <section className="about-description about-section">
                                <p className="description">{user.description}</p>
                            </section>
                        }
                        {currentUser&&!descriptionEdit
                        
                        }
                    <section className="about-showcase about-section">
                        {!showcaseNameEdit&&<h3>Showcase</h3>}

                    </section>
                    <section className="about-info about-section">
                        <div className="about-info-labels">
                        {user&& <p>Joined</p>}
                        {user&&user.occupation&&<p>Occupation</p>}
                        </div>
                        <div className="about-info-data">
                        {user&& <p>{joinedMonth} {joinedYear}</p>}
                        {user&&user.occupation&&<p>{user.occupation}</p>}
                        </div>
                        <div className="about-info-labels">

                        </div>
                        <div className="about-info-data">

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
                        <p></p>
                    </div>
                </section>
        </>
    )
}