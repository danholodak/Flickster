import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";
import './css/AboutPage.css'
import { useState } from "react";
import AboutContentSelf from "./AboutContentSelf";
import AboutContentOther from "./AboutContentOther";

export default function AboutPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const sessionUser = useSelector(state => state.session?.user);
    const user = useSelector(getUser(userId));
    const currentUser = (user?.id == sessionUser?.id)
    if(!user){
    return(
        <>
            <Header state="loggedIn"/>
            <SubHeader selection="about"/>
            <section className="content">
                {/* {user && <h1>
                    {user.displayName} doesn't have any personality yet. 😢
                </h1>} */}
            </section>
        </>
    )}else if(user && sessionUser){
        return(
            <>
                <Header state="loggedIn"/>
                <SubHeader selection="about"/>
                {currentUser?<AboutContentSelf />:<AboutContentOther />}
            </>
        )}
    // }else if(user && sessionUser && currentUser){
    //     return(
    //         <>
    //             <Header state="loggedIn"/>
    //             <SubHeader selection="about"/>
    //             <section className="content">
    //                 <div className="center-column">
    //                 {user.description&&<section className="about-description about-section"></section>}
    //                 {/* <section className="about-showcase about-section"></section> */}
    //                 <section className="about-info about-section">

    //                 </section>
    //                 <section className="about-stats about-section">
    //                 <div className="about-stat">
    //                         <h2>0</h2>
    //                         <p>views</p>
    //                     </div>
    //                     <div className="about-stat">
    //                         <h2>0</h2>
    //                         <p>tags</p>
    //                     </div>
    //                     <div className="about-stat">
    //                         <h2>0</h2>
    //                         <p>geotags</p>
    //                     </div>
    //                     <div className="about-stat">
    //                         <h2>0</h2>
    //                         <p>faves</p>
    //                     </div>
    //                     <div className="about-stat">
    //                         <h2>0</h2>
    //                         <p>groups</p>
    //                     </div>

    //                 </section>
    //                 </div>
    //             </section>
    //         </>

    //     )
    // }
    

}