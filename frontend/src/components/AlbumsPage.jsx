import Header from "./Header";
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, fetchUser } from "../store/users";
import { useEffect } from "react";
import AlbumListSelf from "./AlbumListSelf";
import AlbumListOther from "./AlbumListOther";

export default function AlbumsPage(){
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user);
    const currentUser = user?.id === sessionUser?.id
    if (user && sessionUser){
        
        return(
        <>
            <Header state="loggedIn"/>
            <SubHeader selection="albums"/>
            <section className="content">
                {!currentUser&&user.albums.length===0&&
                <h1>
                    {user?.displayName} doesn't have any albums yet. 😢
                </h1>}
                {currentUser&&user.albums.length===0&&
                <h1>
                    {user?.displayName} doesn't have any albums yet. 😢
                </h1>}
                {currentUser&&user.albums.length>0&&
                <AlbumListSelf user={user}/>}
                {!currentUser&&user.albums?.length>0&&
                <AlbumListOther user={user}/>}
            </section>
        </>
    )}

}