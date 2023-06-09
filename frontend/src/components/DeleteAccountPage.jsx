import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/session"
import { deleteUser } from "../store/users"
import Header from "./Header"
import './css/DeletePage.css'
import { Redirect } from "react-router-dom"

export default function DeleteAccountPage(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    function deleteClick(e){
        e.preventDefault()
        if (sessionUser.email === "demo@user.com"){
            alert("Please don't try to delete demo user. He has so much to live for. (create an account to test delete functionality)")
        }else if (sessionUser && !(sessionUser.email ==="demo@user.com")){
            dispatch(deleteUser(sessionUser.id));
            dispatch(logout());
        };
    };
    if(!sessionUser){
        return (<Redirect to='/'></Redirect>)
    }
    return(
        <>
            <Header state="loggedIn"/>
            <div className="delete-page">
            <h1>FOR REAL DO YOU WANT TO DELETE???</h1>
            <h3>AAAH</h3>
            <button onClick={deleteClick}>OK - Next</button>
            </div>
        </>
    );
}