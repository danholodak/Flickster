import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";

export default function AboutPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    return(
        <>
            <Header state="loggedIn"/>
            <SubHeader selection="about"/>
            <section className="content">
                {user && <h1>
                    {user.displayName} doesn't have any personality yet. 😢
                </h1>}
            </section>
        </>
    )

}