import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";
import './css/AboutPage.css'
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
    const currentUser = (user?.id === sessionUser?.id)
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
}