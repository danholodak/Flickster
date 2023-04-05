import { Link } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"
import NewsFeed from "./NewsFeed"

export default function SplashPage(){
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser){
    return(
        <>
        <Header state="splash"/>
        <div className="splash-center">
            <h1>Find your inspiration.</h1>
            <h2>Join the Flickr community, home to tens of billions of photos and 2 million groups.</h2>
            <Link to='/sign-up'>Start for free</Link>
        </div>
        </>
    )}else{
        return(
            <NewsFeed />
        )
    }

}