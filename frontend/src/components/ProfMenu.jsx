import { logout } from "../store/session"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './css/ProfMenu.css'


export default function ProfMenu(){
    const dispatch= useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const greetings = [["Aloha", "Hawaiian"],["Labdien","Latvian"],["Szia","Hungarian"],
        ["Hola", "Spanish"],["Nomoshkar", "Bengali"],["Labas","Lithuanian"],
        ["Halo", "Indonesian"],["Dobrý den", "Czech"],["Merhaba", "Turkish"],
        ["Ahoy", "English"],["Hyvää päivää", "Finnish"],["Selamat datang", "Malay"],
        ["Tere", "Estonian"],["Zdravo", "Serbian"], ["Mbote", "Lingala"],
        ["Bok", "Croatian"], ["Sawubona", "Zulu"], ["Zdrasti", "Bulgarian"]]
    const [index, setIndex] = useState(Math.floor(Math.random() * (greetings.length - 1)))
    const [greeting, setGreeting] = useState(greetings[index][0])
    const [language, setLanguage] = useState(greetings[index][1])
    function doLogout(){
        dispatch(logout());
        return(<Redirect to='/login'/>); // why doesn't this redirect?
    };
    function goToSettings(){
        return (<Redirect to='/account'/>)
    }
    useEffect(()=>{
        return () =>{ setIndex(Math.floor(Math.random() * (greetings.length - 1)))
        setGreeting(greetings[index][0])
        setLanguage(greetings[index][1])}
    }, [])

    return(
        <nav>
            <div className="point"></div>
            <div className="greeting">
            <h1>{greeting}, {sessionUser.displayName}!</h1>
            <h3>Now you know how to greet people in {language}</h3>
            </div>
            <div className="buttonlist">
                <div className="listbutton" onClick={goToSettings}><Link to='/account'>Settings</Link></div>
                <div className="listbutton"><button>Help</button></div>
                <div className="listbutton" onClick={doLogout}>
                    <button className="logout">Log out</button>
                </div>
            </div>
        </nav>
    )
}