import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfMenu from "./ProfMenu"
import RightDropdown from "./RightDropdown";
import './css/Header.css'

export default function Header({state}){
    const [showProfMenu, setShowProfMenu] = useState(false);
    const [showYou, setShowYou] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [showPrints, setShowPrints] = useState(false);
    function youMouseEnter(){
        if(!showYou){setShowYou(true)}
    }
    function youMouseLeave(){
        if(showYou){setShowYou(false)}
    }
    function exploreMouseEnter(){
        if(!showExplore){setShowExplore(true)}
    }
    function exploreMouseLeave(){
        if(showExplore){setShowExplore(false)}
    }
    function printsMouseEnter(){
        if(!showPrints){setShowPrints(true)}
    }
    function printsMouseLeave(){
        if(showPrints){setShowPrints(false)}
    }
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
            <div className="header-bar">
                <Link to='/'><strong className="logo">💙💖</strong> flickster</Link>
            </div>
        )
    }
    if (state==="loggedIn"){
        return(
            <div className="header-bar logged-in">
                <div className="left-header">
                <Link to='/'> <strong className="logo">💙💖</strong>flickster</Link>
                <div className="button-dropdown" onMouseEnter={youMouseEnter} onMouseLeave={youMouseLeave} >
                <button className="you" >You</button>
                {showYou && <RightDropdown kind="You" />}
                </div>
                <div className="button-dropdown" onMouseEnter={exploreMouseEnter} onMouseLeave={exploreMouseLeave}>
                <button >Explore</button>
                {showExplore && <RightDropdown kind="Explore" onMouseEnter={exploreMouseEnter} onMouseLeave={exploreMouseLeave}/>}
                </div>
                <div className="button-dropdown" onMouseEnter={printsMouseEnter} onMouseLeave={printsMouseLeave}>
                <button >Prints</button>
                {showPrints && <RightDropdown kind="Prints" onMouseEnter={printsMouseEnter} onMouseLeave={printsMouseLeave}/>}
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
                    {/* <button onClick={doLogout}>logout</button> */}
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
