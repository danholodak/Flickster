import './css/RightDropdown.css'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"


export default function RightDropdown({kind, onMouseEnter, onMouseLeave}){
    const history = useHistory()
    function doNothing(){
        console.log("not implemented yet, sorry")
    }
    function aboutRedirect(id){
        history.push(`/people/${id}`);
    }
    function photostreamRedirect(id){
        history.push(`/photos/${id}`)
    }
    function albumsRedirect(id){
        history.push(`/photos/${id}/albums`)
    }
    function favesRedirect(id){
        history.push(`/photos/${id}/favorites`)
    }
    const sessionUser = useSelector(state => state.session.user);
    const You = [[["About", aboutRedirect], ["Photostream", photostreamRedirect],["Albums", albumsRedirect],["Faves", favesRedirect]]]
    // future You content: [[["Galleries", doNothing], ["Groups", doNothing], ["Camera Roll", doNothing] ],[["People", doNothing], ["Organize", doNothing]]]
    const Explore = [[["Recent Photos", doNothing], ["Trending", doNothing], ["Events", doNothing], ["The Commons", doNothing], ["Flickster Galleries", doNothing], ["World Map", doNothing], ["Camera Finder", doNothing], ["Flickster Blog", doNothing]]]
    const Prints = [[["The Print Shop", doNothing],["Prints & Wall Art", doNothing],["Photo Books", doNothing]],[["View Cart", doNothing]]]
    let array;
    if (kind === "You"){
        array = You
    }else if (kind ==="Explore"){
        array = Explore
    }else{
        array = Prints
    }

    return (
        <nav className={kind} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="point"></div>
                {array && array[0] && <div className="top-button-list">
                {array[0].map((inner, i) => (<div key ={i}className="list-button"><button className={(inner[1]===doNothing) ? "disabled" : ""}onClick={(inner[1]===doNothing)? inner[1]: ()=>{inner[1](sessionUser.id)}} >{inner[0]}</button></div>))}
                </div>}
            
            {array && array[1] && <div className="bottom-button-list">
                {array[1].map((inner, i) => (<div key={i} className="list-button"><button className={(inner[1]===doNothing) ? "disabled" : ""} onClick={inner[1]} >{inner[0]}</button></div>))}
                </div>}
        </nav>
    )

}