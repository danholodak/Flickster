import './css/RightDropdown.css'

export default function RightDropdown({kind, onMouseEnter, onMouseLeave}){
    function doNothing(){
        console.log("not implemented yet, sorry")
    }
    const You = [[["About", doNothing], ["Photostream", doNothing],["Albums", doNothing],["Faves", doNothing], ["Galleries", doNothing], ["Groups", doNothing], ["Camera Roll", doNothing] ],[["People", doNothing], ["Organize", doNothing]]]
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
                {array[0].map((inner, i) => (<div key ={i}className="list-button"><button onClick={inner[1]} >{inner[0]}</button></div>))}
                </div>}
            
            {array && array[1] && <div className="bottom-button-list">
                {array[1].map((inner, i) => (<div key={i} className="list-button"><button onClick={inner[1]} >{inner[0]}</button></div>))}
                </div>}
        </nav>
    )

}