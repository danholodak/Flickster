import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";


export default function FavesPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    return(
        <>
            <Header state="loggedIn"/>
            <SubHeader selection="faves"/>
            <section className="content">
                <h1>
                    {user?.displayName} doesn't have any faves yet. 😢
                </h1>
            </section>
        </>
    )

}