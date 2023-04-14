# Flickster

##Intro

Flickster is a clone of popular photo-sharing site Flickr. On Flickr, users are able to upload photos, and add them to albums, as well as add tags and comments to photos.  The way Flickr displays collections of photos on a page is unique as rather than cropping any part of the image, the images are allowed to take up any aspect ratio and neighboring images are re-sized to accomodate. Additionally users are able to join groups, enabling even more interaction. In cloning the site I was able to get as far as creating a user, being able to edit all the user's information and connecting the user to photos, including a unique profile picture and header-image for their page.

Technologies I used in creating Flickster:

* Languages: Jacascript, Ruby, HTML, CSS

* Frontend: React-Redux

* Configuration

* Database: PostgreSQL

* Hosted on Render

* Assets stored on AWS

##Features

###Users

On flickster, a user is able to view and edit a wealth of information about themselves. Separate forms allow a user to change their password, and other general information.
<img width="1550" alt="Screen Shot 2023-04-14 at 2 13 52 PM" src="https://user-images.githubusercontent.com/47993465/232125172-7e9c2e6d-a555-4a39-a80e-fe6237c14c86.png">
<img width="1551" alt="Screen Shot 2023-04-14 at 2 13 35 PM" src="https://user-images.githubusercontent.com/47993465/232125198-b7246691-4376-443e-94a5-5133caa3ad6a.png">

Here's a bit of how this works:

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
                        {user.photoIds.map((id, i)=><Link to={`/photos/${photos[id]?.userId}/${id}`}><img key={i} src={photos[id]?.img} alt={photos[id]?.title}  /></Link>)}
                    </section>
                </section>
            </>
        )
    }
    

}
```






This project was created start-to-finish in a 2 week period.  Thanks so much for checking it out!
