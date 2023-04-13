import { Link } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"
import NewsFeed from "./NewsFeed"
import './css/SplashPage.css'
import { useState } from "react"
import splashBGs from '../data/splashBGs.js'
import { useEffect } from "react"

export default function SplashPage(){
    const sessionUser = useSelector(state => state.session.user)
    const [imageurl, setImageurl] = useState(splashBGs[(Math.floor(Math.random() * (splashBGs.length - 1)))])
    useEffect(()=>{
       const interval = setInterval(()=>{
        setImageurl(splashBGs[(Math.floor(Math.random() * (splashBGs.length - 1)))])
        }, 8000)
        return () =>{clearInterval(interval)}
    },[])
    


    if (!sessionUser){
    return(
        <>
        <Header state="splash"/>
        <div className="splash-center" style={{ backgroundImage:`url(${imageurl})`, backgroundSize:'cover'}}>
            <h1 className="readable">Find your inspiration.</h1>
            <h2 className="readable">Join the Flickster community, home to tens of billions of photos and 2 million groups (potentially).</h2>
            <Link to='/sign-up'>Start for free</Link>
        </div>
        </>
    )}else{
        return(
            <NewsFeed />
        )
    }

}