import { Link } from "react-router-dom"
import  perks from '../data/flickr-pro-perks' 
import { useSelector } from "react-redux"

export default function AcctPersonalContent(){
    const sessionUser = useSelector(state => state.session.user)
    function profilePicEdit(){

    }
    return(
        <>
            <section className="left-column">
                <div className="content-box">
                    <header><h1>Membership status</h1></header>
                        <div className="flex inner-content-box">
                            <div className="pink-circle"><div className="inner-circle">1K</div></div>
                            <div>
                                <strong>You have a Flickster Free account.</strong>
                                <p>You get 1,000 of your favorite full-resolution photos
                                 and HD videos, shown with ads. <a href='https://flickr.com/account/upgrade/pro'>Upgrade to Flickster Pro</a></p>
                            </div>
                        </div>
                </div>
                <div className="content-box">
                    <header><h1>Pro Perks</h1></header>
                    {perks.map((perk)=>
                     <div className="flex inner-content-box">
                     <img src={perk.ImageUrl} alt=""/>
                     <div>
                         <p className="company">{perk.Company}.</p>
                         <p className="benefit">{perk.Benefit}</p> 
                         {/* <p><Link>Upgrade to Flickr Pro</Link></p> */}
                     </div>
                 </div>
                    )}
                </div>
            </section>
            <section className="right-column">
                <div className="content-box">
                    <header><h1>Account</h1></header>
                    <div className=" flex-cols inner-content-box">
                        <div className="column">
                            <strong>Login email</strong>
                            <p>{sessionUser.email}</p>
                        </div>
                        <div className="inner-left-column">
                            <strong>Password</strong>
                            <p><Link to='/change-password'>Edit your password</Link></p>
                        </div>
                    </div>
                    <div className="p2 inner-content-box">
                        <p>You can also <Link to='/'>get help with your account</Link>, or <Link to='/delete_account'>delete your Flickster account</Link>.</p>
                    </div>
                </div>
                <div className="content-box">
                    <header><h1>Profile</h1></header>
                    <div className="flex inner-content-box">
                        {sessionUser.profilePicUrl 
                        ? <img href={sessionUser.profilePicUrl} onClick={profilePicEdit} alt="user's profile pic"/> 
                        : <button className="profile" onClick={profilePicEdit}>
                            <i className="fa-solid fa-user"></i>
                        </button>
                        }
                        <div>
                            <p>Your real name is <strong className="inline-strong">{sessionUser.firstName} {sessionUser.lastName}.</strong> <Link to='/profile_edit'>Change</Link></p>
                            <p>Your display name is <strong className="inline-strong">{sessionUser.displayName}.</strong> <Link to='/profile_edit'>Change</Link></p>
                        </div>
                    </div>
                    <div className="p2 inner-content-box">
                        <p>Your account has been reviewed as <strong className="inline-strong">safe</strong> by Flickster staff. <a href='https://www.dictionary.com/browse/safe'>What does this mean?</a></p>
                        <strong>Web addresses</strong>
                        <p><Link to='/'>Create your own memorable Flickster web address!</Link> It’s an easy way to share your Flickster profile and your photostream with your friends.</p>
                    </div>

                </div>
                <div className="content-box">
                    <header><h1>Your Flickster Data</h1></header>
                    <div className="p2 inner-content-box">
                        <p>You can use this tool to download the information that Flickster has about your account, including account preferences, profile information, and your photos and videos. This process will take some time, so we’ll send you an email when it’s ready for you to download. Please note that if you delete your account before you receive your data, your request cannot be fulfilled.</p>
                        <p className="email">We'll send an email to: <strong>{sessionUser.email}</strong></p>
                        <button className="request">Request My Flickster Data</button>
                    </div>
                </div>

            </section>
        </>

    )
}