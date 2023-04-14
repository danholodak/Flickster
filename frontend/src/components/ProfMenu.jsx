import { logout } from "../store/session"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './css/ProfMenu.css'
import { useHistory } from "react-router-dom";


export default function ProfMenu(){
    const history=useHistory()
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
        history.push('/login'); // why doesn't this redirect?
    };
    function goToSettings(){
        history.push('/account')
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
                <div className="listbutton" onClick={goToSettings}><button>Settings</button></div>
                <a className="nostyle" href="https://www.youtube.com/watch?v=2Q_ZzBGPdqE"><div className="listbutton"><button>Help</button></div></a>
                <div className="listbutton" onClick={doLogout}>
                    <button className="logout">Log out</button>
                </div>
            </div>
        </nav>
    )
}