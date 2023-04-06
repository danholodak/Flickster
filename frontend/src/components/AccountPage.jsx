import { useState } from 'react'
import './css/AccountPage.css'
import Header from './Header'
import { useSelector } from 'react-redux'

export default function AccountPage(){
    const sessionUser = useSelector(state => state.session.user)
    const [personalActive, setPersonalActive] = useState(false)
    const [privacyActive, setPrivacyActive] = useState(false)
    const [emailsActive, setEmailsActive] = useState(false)
    const [sharingActive, setSharingActive] = useState(false)
    function personalClick(e){
        e.preventDefault()
        setPersonalActive(true)
        setPrivacyActive(false)
        setEmailsActive(false)
        setSharingActive(false)
    }
    function privacyClick(e){
        e.preventDefault()
        setPersonalActive(false)
        setPrivacyActive(true)
        setEmailsActive(false)
        setSharingActive(false)
    }
    function emailsClick(e){
        e.preventDefault()
        setPersonalActive(false)
        setPrivacyActive(false)
        setEmailsActive(true)
        setSharingActive(false)
    }
    function sharingClick(e){
        e.preventDefault()
        setPersonalActive(false)
        setPrivacyActive(false)
        setEmailsActive(false)
        setSharingActive(true)
    }

    return(
        <>
        <Header state="loggedIn"/>
        <section className="acct-settings"><h1>Account Settings</h1></section>
        <section className="acct-tabs">
            <button className={personalActive? "active" : ""} onClick={personalClick}>Personal Information</button>
            <button className={privacyActive? "active" : ""} onClick={privacyClick}>Privacy & Permissions</button>
            <button className={emailsActive? "active" : ""} onClick={emailsClick}>Emails & Notifications</button>
            <button className={sharingActive? "active" : ""} onClick={sharingClick}>Sharing & Extending</button>
        </section>
        <section className="content">
            <section className="left-column">


            </section>
            <section className="right-column">

            </section>
        </section>

        </>
    )

}