import { useState } from "react"
import { useDispatch } from "react-redux"
import { signup } from "../store/session"
import { Link } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import './css/LoginSignup.css'

export default function SignUpFormPage(){
    const dispatch = useDispatch()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[age, setAge]= useState("")
    const[errors, setErrors] = useState([])
    function handleSubmit(e){
        e.preventDefault()
        const user = {user: {firstName, lastName, age: parseInt(age), email, password}}
        return dispatch(signup(user))
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
            console.log(data);
          });
    }
    const sessionUser = useSelector(state => state.session.user);
    if(sessionUser){
        return(<Redirect to='/'/>)
    }
    return (
        <>
        <Header state="loginsignup"/>
        <div className="bg-image">
            <div className="form-flex">
                <form className="login-form" onSubmit={handleSubmit}>
                    <strong className="form-logo">💙💖</strong>
                    <h3>Sign up for Flickster</h3>
                    {errors.map((error, i)=><div key={i} className="error"><p>{error}</p></div>)}
                    <label className="fname-label"htmlFor="fname-input">First Name</label>
                        <input className="fname-input" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required/>
                    <label className="lname-label"htmlFor="lname-input">Last Name</label>
                        <input className="lname-input" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
                    <label className="age-label"htmlFor="age-input">Your age</label>
                        <input className="age-input" type="text" value={age} onChange={(e)=>setAge(e.target.value)} required/>
                    <label className="email-label"htmlFor="email-input">Email address</label>
                        <input className="email-input" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <label className="password-label" htmlFor="password-input">Password</label>
                        <input className="password-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button className="submit-button" type="submit">Sign up</button>
                    <p className="terms">By signing up, you agree with Flickr's <Link to='/'>Terms of Services</Link>  and <Link to='/'>Privacy Policy.</Link></p>
                    <p className="member">Already a Flickr member? <Link to='/login'>Log in here.</Link></p>
                </form>
                <div className="below-form"><div><p>English ⌵</p></div><div><Link to='/'>Help</Link><Link to='/'>Privacy</Link><Link to='/'>Terms</Link></div></div>
            </div>
            </div>
            </>
    )
}