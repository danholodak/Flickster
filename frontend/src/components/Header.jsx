import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfMenu from "./ProfMenu"

export default function Header({state}){
    const [showProfMenu, setShowProfMenu] = useState(false);
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

    if(state==="loginSignup"){
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
                <button>You</button>
                <button>Explore</button>
                <button>Prints</button>
                <button>Get Pro</button>
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
