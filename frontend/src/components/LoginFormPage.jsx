import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../store/session"
import { Link, Redirect } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"
import './css/LoginSignup.css'
import { useEffect } from "react"


export default function LoginFormPage(){
    const dispatch = useDispatch()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[errors, setErrors] = useState([])
    const[forgotClicked, setForgotClicked] = useState(false)
    const[clueVisible, setClueVisible] = useState(false)
    function handleSubmit(e){
        e.preventDefault()
        const user = {email, password}
        return dispatch(login(user))
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
    }
    function forgotClick(){
        if(!forgotClicked){
            setErrors((prevErrors)=>[...prevErrors, "Maybe try 'password12345' 🤷‍♂️"])
            setForgotClicked(true)
        }
    }
    const sessionUser = useSelector(state => state.session.user);
    function loginDemo(){
        dispatch(login({email: 'demo@user.com', password: 'password12345'}))
    }
    function showClue(){
        setClueVisible(true)
    }
    function hideClue(){
        setClueVisible(false)
    }
    useEffect(()=>{
        let formElement = document.querySelector(".login-form")
        formElement.addEventListener("mouseover", showClue)
        formElement.addEventListener("mouseout", hideClue)
        return ()=>{
            formElement.removeEventListener("mouseover", showClue)
            formElement.addEventListener("mouseout", hideClue)
        }
    }, [])
    if(sessionUser){
        return(<Redirect to='/'/>)
    }
    return (
            <>
            <Header state="loginsignup"/>
            <div className="form-flex">
                <form className="login-form" onSubmit={handleSubmit}>
                    <strong className="form-logo">💙💖</strong>
                    <h3>Log in to Flickster</h3>
                    {errors.map((error, i)=><div className="error" key={i}><p>{error}</p></div>)}
                    <label className="email-label"htmlFor="email-input">Email address</label>
                        <input className="email-input" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <label className="password-label" htmlFor="password-input">Password</label>
                        <input className="password-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <input className="check" type="checkbox"/><label className="check-label">Remember email address</label>
                    <button className="submit-button" type="submit">Sign in</button>
                    <p className="forgot" onClick={forgotClick}>Forgot password?</p>
                    <p className="member">Not a Flickr member? <Link to='/sign-up'>Sign up here.</Link></p>
                    <div className={clueVisible?"hidden-clue":"hidden"}><p>Or log in as the demo user⤴</p></div>
                </form>
                <div className="below-form"><div><p className="disabled">English ⌵</p></div><div><Link onClick={loginDemo}to='/'>Demo</Link><Link className="disabled" to='/'>Privacy</Link><Link className="disabled" to='/'>Terms</Link></div></div>
            </div>
            </>
    )
}