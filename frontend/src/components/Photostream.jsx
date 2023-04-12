import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser, getUser } from "../store/users";
import { useEffect } from "react";

export default function PhotostreamPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    if (!user){
        return null
    }
    return(
        <>
            <Header state="loggedIn"/>
            <SubHeader selection="photostream"/>
            <section className="content">
                <h1>
                    {user?.displayName} doesn't have any photos yet. 😢
                </h1>
            </section>
        </>
    )

}