import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfMenu from "./ProfMenu"
import RightDropdown from "./RightDropdown";
import './css/Header.css'
import { fetchUser, getUser } from "../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Header({state}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [showProfMenu, setShowProfMenu] = useState(false);
    const [showYou, setShowYou] = useState(false);
    const [showYou2, setShowYou2] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [showExplore2, setShowExplore2] = useState(false);
    const [showPrints, setShowPrints] = useState(false);
    const [showPrints2, setShowPrints2] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    useEffect(()=>{
        if (sessionUser?.id) {
            dispatch(fetchUser(sessionUser?.id))
        }
    }, [sessionUser, dispatch])
    const user = useSelector(getUser(sessionUser?.id))

    function profileDropdown(){
        if(!showProfMenu){
            setShowProfMenu(true);
        }
    }
    useEffect(() => {
        if (!showProfMenu) return;
        const closeMenu = () => {
          setShowProfMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
      }, [showProfMenu]);

    if(state==="loginsignup"){
        return(
            <div className="loginsignup header-bar">
                <Link to='/'><strong className="logo">💙💖</strong> flickster</Link>
            </div>
        )
    }
    if (state==="loggedIn"){
        return(
            <div className="header-bar logged-in">
                <div className="left-header">
                <Link to='/'> <strong className="logo">💙💖</strong>flickster</Link>
                <div className="button-dropdown" onMouseEnter={()=>{if(!showYou){setShowYou(true)}}} 
                onMouseLeave={()=>{if(showYou){setShowYou(false)}}} >
                <button className="you" onMouseEnter={()=>{if(!showYou2){setShowYou2(true)}}} 
                onMouseLeave={()=>{if(showYou2){setShowYou2(false)}}} >You</button>
                {(showYou || showYou2) && <RightDropdown kind="You" />}
                </div>
                <div className="button-dropdown" onMouseEnter={()=>{if(!showExplore){setShowExplore(true)}}} 
                onMouseLeave={()=>{if(showExplore){setShowExplore(false)}}}>
                <button onMouseEnter={()=>{if(!showExplore2){setShowExplore2(true)}}} 
                onMouseLeave={()=>{if(showExplore2){setShowExplore2(false)}}}>Explore</button>
                {(showExplore || showExplore2) && <RightDropdown kind="Explore"/>}
                </div>
                <div className="button-dropdown" onMouseEnter={() => setShowPrints(true)} 
                onMouseLeave={() => setShowPrints(false)}>
                <button onMouseEnter={() => setShowPrints2(true)} onMouseLeave={() => setShowPrints2(false)}>Prints</button>
                {(showPrints || showPrints2) && <RightDropdown kind="Prints"/>}
                </div>
                <div className="button-dropdown">
                <button className="disabled">Get Pro</button>
                </div>
                </div>
                <div className="right-header">
                    <button><a href="https://www.linkedin.com/in/danholodak/"><i className="fa-brands fa-linkedin"></i></a></button>
                    <button><a href="https://github.com/danholodak"><i className="fa-brands fa-square-github"></i></a></button>
                    {/* <button className="magnifier rh-button disabled">
                        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                    </button> */}
                    <button onClick={()=>history.replace('/photos/upload')} className="upload rh-button">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                    </button>
                    {/* <button className="notification rh-button disabled">
                        <i className="fa-solid fa-bell"></i>
                    </button> */}
                    
                    {(user?.profilePicUrl) ?  <button className="profile rh-button with-image" onClick={profileDropdown}><img className="header-profile-image" src={`${user?.profilePicUrl}`} alt="user profile pic" /></button> : <button className="profile rh-button" onClick={profileDropdown}><i className="fa-solid fa-user"></i></button>}
                    
                    {showProfMenu&& <ProfMenu/>}
                </div>
            </div>
        )
    }
    if(state==="splash"){
        return(
            <div className="header-bar splash">
                <Link to='/'><strong className="logo">💙💖</strong> flickster</Link>
                <div className="right-header">
                    <Link to='/'className="magnifier">
                        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <Link to='/login' className='login-header'>Log In</Link>
                    <Link to='/sign-up'className='signup-header'>Sign Up</Link>
                </div>
            </div>
        )
    }
    
}
