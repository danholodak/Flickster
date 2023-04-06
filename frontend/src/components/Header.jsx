import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfMenu from "./ProfMenu"
import RightDropdown from "./RightDropdown";
import './css/Header.css'

export default function Header({state}){
    const [showProfMenu, setShowProfMenu] = useState(false);
    const [showYou, setShowYou] = useState(false);
    const [showYou2, setShowYou2] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [showExplore2, setShowExplore2] = useState(false);
    const [showPrints, setShowPrints] = useState(false);
    const [showPrints2, setShowPrints2] = useState(false);

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
                <button>Get Pro</button>
                </div>
                </div>
                <div className="right-header">
                    <button className="magnifier">
                        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button className="upload">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                    </button>
                    <button className="notification">
                        <i className="fa-solid fa-bell"></i>
                    </button>
                    <button className="profile" onClick={profileDropdown}>
                        <i className="fa-solid fa-user"></i>
                    </button>
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
