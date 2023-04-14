# Flickster

## Intro

Flickster is a clone of popular photo-sharing site Flickr. On Flickr, users are able to upload photos, and add them to albums, as well as add tags and comments to photos.  The way Flickr displays collections of photos on a page is unique as rather than cropping any part of the image, the images are allowed to take up any aspect ratio and neighboring images are re-sized to accomodate. Additionally users are able to join groups, enabling even more interaction. In cloning the site I was able to get as far as creating a user, being able to edit all the user's information and connecting the user to photos, including a unique profile picture and header-image for their page.

Technologies I used in creating Flickster:

* Languages: Jacascript, Ruby, HTML, CSS

* Frontend: React-Redux

* Configuration

* Database: PostgreSQL

* Hosted on Render

* Assets stored on AWS

## Features

### Users

On flickster, a user is able to view and edit a wealth of information about themselves. Separate forms allow a user to change their password, and other general information.
<img width="1550" alt="Screen Shot 2023-04-14 at 2 13 52 PM" src="https://user-images.githubusercontent.com/47993465/232125172-7e9c2e6d-a555-4a39-a80e-fe6237c14c86.png">
<img width="1551" alt="Screen Shot 2023-04-14 at 2 13 35 PM" src="https://user-images.githubusercontent.com/47993465/232125198-b7246691-4376-443e-94a5-5133caa3ad6a.png">

Here's a bit of how this works:

```javascript
export default function ChangePasswordForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const[newPassword, setNewPassword] = useState("")
    const[password, setPassword] = useState("")
    const[errors, setErrors] = useState([])
    const[forgotClicked, setForgotClicked] = useState(false)
    function handleSubmit(e){
        e.preventDefault()
        const user = {id: sessionUser.id, password, newPassword}
        dispatch(updateUser(user))
        .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
        history.push('/')
    }
    function forgotClick(){
        if(!forgotClicked){
            setErrors((prevErrors)=>[...prevErrors, "Maybe try 'password12345' 🤷‍♂️"])
            setForgotClicked(true)
        }
    }
    const sessionUser = useSelector(state => state.session.user);
    if(!sessionUser){
        return(<Redirect to='/'/>)
    }
    return (
            <>
            <Header state="loginsignup"/>
            <div className="form-flex password-reset">
                <form className="login-form password-reset" onSubmit={handleSubmit}>
                    <Link to='/account'className="back-arrow"><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
                    <strong className="form-logo"><i className="fa-solid fa-lock"></i></strong>
                    <h3>Set your new Flickster Password</h3>
                    {errors.map((error, i)=><div className="error" key={i}><p>{error}</p></div>)}
                    <label className="cp-label"htmlFor="current-password-input">Current Password</label>
                        <input className="current-password-input" type="password" value={password} 
                            onChange={(e)=>setPassword(e.target.value)} required/>
                    <label className="np-label" htmlFor="password-input">New Password</label>
                        <input className="password-input" type="password" value={newPassword} 
                            onChange={(e)=>setNewPassword(e.target.value)} required/>
                    <button className="submit-button" type="submit">Change your Flickster password</button>
                    <p className="forgot" onClick={forgotClick}>Forgot password?</p>
                </form>
                <div className="below-form password-reset disabled">
                    <div><p>English ⌵</p></div>
                    <div>
                        <Link to='/'>Help</Link>
                        <Link to='/'>Privacy</Link>
                        <Link to='/'>Terms</Link>
                    </div>
                </div>
            </div>
            </>
    )
}
```
On a user's Photostream page, we are able to view any photo they've uploaded and each links to a single photo show page. On the show page, options to edit or deelete the photo are visible only if the photo belongs to the current user.

<img width="1554" alt="Screen Shot 2023-04-14 at 2 11 44 PM" src="https://user-images.githubusercontent.com/47993465/232129407-787af8b4-1b81-462e-810c-9155cf650560.png">

<img width="1556" alt="Screen Shot 2023-04-14 at 2 11 18 PM" src="https://user-images.githubusercontent.com/47993465/232129478-d001a4e8-d424-4979-91d1-d6edd59a7652.png">



```javascript
export default function PhotostreamPage(){
    const history = useHistory()
    const {userId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser(userId))
        dispatch(fetchPhotos())
    }, [userId, dispatch])
    const user = useSelector(getUser(userId));
    const photos = useSelector(getPhotos)
    if (!user){
        return null
    }else if((!photos||user.photoIds==={})){
        return (
            <>
            <Header state="loggedIn"/>
            <SubHeader selection="photostream"/>
            <section className="content">
                <h1>
                    {user.displayName} doesn't have any photos yet. 😢
                </h1>
            </section>
        </>
        )
    }else {
        return(
            <>
                <Header state="loggedIn"/>
                <SubHeader selection="photostream"/>
                <section className="content photostream">
                    <section className="photo-column">
                        {user.photoIds.map((id, i)=>
                        <Link to={`/photos/${photos[id]?.userId}/${id}`}>
                            <img key={i} src={photos[id]?.img} alt={photos[id]?.title}  />
                        </Link>)}
                    </section>
                </section>
            </>
        )
    }
}
```

In addition, the home page displays either a splash page that cycles through images if the user is logged out or shows a news feed of new photo uploads from all users, if the user is logged in.
<img width="1675" alt="Screen Shot 2023-04-14 at 2 43 10 PM" src="https://user-images.githubusercontent.com/47993465/232130292-3852dc24-a983-4dd8-b738-0e8117237b98.png">

<img width="1636" alt="Screen Shot 2023-04-14 at 2 15 21 PM" src="https://user-images.githubusercontent.com/47993465/232129852-7f35f482-909a-4ac0-95f4-ab123049168f.png">


```javascript
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

```






This project was created start-to-finish in a 2 week period.  Thanks so much for checking it out!
