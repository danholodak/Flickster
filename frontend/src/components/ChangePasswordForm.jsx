import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"
import './css/LoginSignup.css'


export default function ChangePasswordForm(){
    const dispatch = useDispatch()
    const[newPassword, setNewPassword] = useState("")
    const[password, setPassword] = useState("")
    const[errors, setErrors] = useState([])
    const[forgotClicked, setForgotClicked] = useState(false)
    function handleSubmit(e){
        e.preventDefault()
        const user = {password, newPassword}
        //update user
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
    if(!sessionUser){
        return(<Redirect to='/'/>)
    }
    return (
            <>
            <Header state="loginsignup"/>
            <div className="form-flex password-reset">
                <form className="login-form password-reset" onSubmit={handleSubmit}>
                    <Link to='/account'className="back-arrow"><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
                    <strong className="form-logo">🔒</strong>
                    <h3>Set your new Flickster Password</h3>
                    {errors.map((error, i)=><div className="error" key={i}><p>{error}</p></div>)}
                    <label className="cp-label"htmlFor="current-password-input">Current Password</label>
                        <input className="current-password-input" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <label className="np-label" htmlFor="password-input">New Password</label>
                        <input className="password-input" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
                    <button className="submit-button" type="submit">Change your Flickster password</button>
                    <p className="forgot" onClick={forgotClick}>Forgot password?</p>
                </form>
                <div className="below-form password-reset"><div><p>English ⌵</p></div><div><Link to='/'>Help</Link><Link to='/'>Privacy</Link><Link to='/'>Terms</Link></div></div>
            </div>
            </>
    )
}