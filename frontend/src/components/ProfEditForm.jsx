import './css/ProfEditForm.css'
import Header from './Header'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../store/users'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchUser, getUser } from '../store/users'

export default function ProfEditForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    useEffect(()=>{
        dispatch(fetchUser(sessionUser?.id))
    }, [sessionUser, dispatch])
    const user = useSelector(getUser(sessionUser?.id))
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [displayName, setDisplayName] = useState(user?.displayName)
    // const [timeZone, setTimeZone] = useState(sessionUser.timeZone)
    // const [gender, setGender] = useState(sessionUser.gender)
    // const [singleness, setSingleness] = useState(sessionUser.singleness)
    const [description, setDescription] = useState(user?.description)
    const [website, setWebsite] = useState(user?.website)
    const [websiteName, setWebsiteName] = useState(user?.websiteName)
    const [occupation, setOccupation] = useState(user?.occupation)
    const [hometown, setHometown] = useState(user?.hometown)
    const [currentCity, setCurrentCity] = useState(user?.currentCity)
    const [country, setCountry] = useState(user?.country)
    const [airport, setAirport] = useState(user?.airport)
    
    
    function saveIt(e){
        e.preventDefault() 
        const user = {id: sessionUser.id, firstName, lastName, displayName, description, website, websiteName, occupation, hometown, currentCity, country, airport }
        dispatch(updateUser(user))
        history.push('/account')
    }
    if (!sessionUser){
        return (<Redirect to='/'></Redirect>)
    }else{
        return(
            <>
                <Header state="loggedIn"/>
                <div className="whitebg">
                    <form className="edit-prof-form">
                        <header className="epf">
                            <h1 className="epf"><Link to='/account'>Your account</Link> / Edit your profile</h1>
                            <p className="epf">(Looking to change your <Link to='/'>buddy icon</Link> or <Link to='/account'>profile privacy</Link>?)</p>
                        </header>
                        <h3 className="epf">Basic bits</h3>
                        <table>
                            <tr>
                                <td className="table-label">First Name:</td>
                                <td >
                                    <div className="first-name-input"><input type="text"  value={firstName} 
                                    onChange={e => setFirstName(e.target.value)}/></div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="table-label">Last Name:</td>
                                <td>
                                    <input type="text"  value={lastName} 
                                    onChange={e => setLastName(e.target.value)}/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="table-label">Display Name:</td>
                                <td>
                                    <input type="text"  value={displayName} 
                                    onChange={e => setDisplayName(e.target.value)}/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="table-label">Your Timezone:</td>
                                <td >
                                    {/* add dropdown */}
                                    <div className="flexcol">
                                        <select className="time-zone" name="timeZone">
                                    <option value="1">-12:00 International Date Line West</option>
                                    <option value="2">-11:00 Midway Island, Samoa</option>
                                    <option value="3">-10:00 Hawaii</option>
                                    <option value="4">-09:00 Alaska</option>
                                    <option value="5">-08:00 Pacific Time (US &amp; Canada); Tijuana</option>
                                    <option value="6">-07:00 Arizona</option>
                                    <option value="7">-07:00 Chihuahua, La Paz, Mazatlan</option>
                                    <option value="8">-07:00 Mountain Time (US &amp; Canada)</option>
                                    <option value="9">-06:00 Central America</option>
                                    <option value="10">-06:00 Central Time (US &amp; Canada)</option>
                                    <option value="11">-06:00 Guadalajara, Mexico City, Monterrey</option>
                                    <option value="12">-06:00 Saskatchewan</option>
                                    <option value="13">-05:00 Bogota, Lima, Quito</option>
                                    <option value="14">-05:00 Eastern Time (US &amp; Canada)</option>
                                    <option value="15">-05:00 Indiana (East)</option>
                                    <option value="16">-04:00 Atlantic Time (Canada)</option>
                                    <option value="17">-04:00 Caracas, La Paz</option>
                                    <option value="18">-04:00 Santiago</option>
                                    <option value="19">-03:30 Newfoundland</option>
                                    <option value="20">-03:00 Brasilia</option>
                                    <option value="21">-03:00 Buenos Aires, Georgetown</option>
                                    <option value="22">-03:00 Greenland</option>
                                    <option value="23">-02:00 Mid-Atlantic</option>
                                    <option value="24">-01:00 Azores</option>
                                    <option value="25">-01:00 Cape Verde Is.</option>
                                    <option value="26">+00:00 Casablanca, Monrovia</option>
                                    <option value="27">+00:00 GMT: Dublin, Edinburgh, Lisbon, London</option>
                                    <option value="28">+01:00 Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                    <option value="29">+01:00 Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                    <option value="30">+01:00 Brussels, Copenhagen, Madrid, Paris</option>
                                    <option value="31">+01:00 Sarajevo, Skopje, Warsaw, Zagreb</option>
                                    <option value="32">+01:00 West Central Africa</option>
                                    <option value="33">+02:00 Athens, Beirut, Istanbul, Minsk</option>
                                    <option value="34">+02:00 Bucharest</option>
                                    <option value="35">+02:00 Cairo</option>
                                    <option value="36">+02:00 Harare, Pretoria</option>
                                    <option value="37">+02:00 Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                    <option value="38">+02:00 Jerusalem</option>
                                    <option value="39">+03:00 Baghdad</option>
                                    <option value="40">+03:00 Kuwait, Riyadh</option>
                                    <option value="41">+03:00 Moscow, St. Petersburg, Volgograd</option>
                                    <option value="42">+03:00 Nairobi</option>
                                    <option value="43">+03:30 Tehran</option>
                                    <option value="44">+04:00 Abu Dhabi, Muscat</option>
                                    <option value="45">+04:00 Baku, Tbilisi, Yerevan</option>
                                    <option value="46">+04:30 Kabul</option>
                                    <option value="47">+05:00 Ekaterinburg</option>
                                    <option value="48">+05:00 Islamabad, Karachi, Tashkent</option>
                                    <option value="49">+05:30 Chennai, Kolkata, Mumbai, New Delhi</option>
                                    <option value="50">+05:45 Kathmandu</option>
                                    <option value="51">+06:00 Almaty, Novosibirsk</option>
                                    <option value="52">+06:00 Astana, Dhaka</option>
                                    <option value="53">+06:00 Sri Jayawardenepura</option>
                                    <option value="54">+06:30 Rangoon</option>
                                    <option value="55">+07:00 Bangkok, Hanoi, Jakarta</option>
                                    <option value="56">+07:00 Krasnoyarsk</option>
                                    <option value="57">+08:00 Beijing, Chongqing, Hong Kong, Urumqi</option>
                                    <option value="58">+08:00 Irkutsk, Ulaan Bataar</option>
                                    <option value="59">+08:00 Kuala Lumpur, Singapore</option>
                                    <option value="60">+08:00 Perth</option>
                                    <option value="61">+08:00 Taipei</option>
                                    <option value="62">+09:00 Osaka, Sapporo, Tokyo</option>
                                    <option value="63">+09:00 Seoul</option>
                                    <option value="64">+09:00 Yakutsk</option>
                                    <option value="65">+09:30 Adelaide</option>
                                    <option value="66">+09:30 Darwin</option>
                                    <option value="67">+10:00 Brisbane</option>
                                    <option value="68">+10:00 Canberra, Melbourne, Sydney</option>
                                    <option value="69">+10:00 Guam, Port Moresby</option>
                                    <option value="70">+10:00 Hobart</option>
                                    <option value="71">+10:00 Vladivostok</option>
                                    <option value="72">+11:00 Magadan, Soloman Is., New Caledonia</option>
                                    <option value="73">+12:00 Auckland, Wellington</option>
                                    <option value="74">+12:00 Fiji, Kamchatka, Marshall Is.</option>
                                    <option value="75">+13:00 Nuku'alofa</option>
                                        </select>
                                    <label className="epf">
                                    <input type="checkbox" value="yes" />
                                        Adjust for Daylight Savings
                                    </label></div>
                                    
                                </td>
                            </tr>
                        
                            <tr>
                                <td className="table-label">Gender:</td>
                                <td>
                                    <div className="radio-section">
                                    <label className="epf">
                                    <input type="radio" name="gender" value="Female"/>
                                    Female
                                    </label>
                                    <label className="epf">
                                    <input type="radio" name="gender" value="Male"/>
                                    Male
                                    </label>
                                    <label className="epf">
                                    <input type="radio" name="gender" value="Other"/>
                                    Other
                                    </label>
                                    <label className="epf">
                                    <input type="radio" name="gender" value="Rather not say"/>
                                    Rather not say
                                    </label>
                                    </div>
                                </td>
                                <td className="table-label singleness">Singleness:</td>
                                <td>
                                <div className="radio-section">
                                    <label className="epf">
                                    <input type="radio" name="singleness" value="Single" />
                                    Single
                                    </label>
                                    <label className="epf">
                                    <input type="radio" name="singleness" value="Taken" />
                                    Taken
                                    </label>
                                    <label className="epf">
                                    <input type="radio" name="singleness" value="Open" />
                                    Open
                                    </label>
                                    <label className="epf">
                                    <input type="radio" name="singleness" value="Rather not say" />
                                    Rather not say
                                    </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-label">Describe Yourself...</td>
                                <td>
                                    <textarea className="description" 
                                    onChange={e => setDescription(e.target.value)} value={description}></textarea>
                                </td>
                            </tr>

                        </table>
                        <h3 className="epf">Online bits</h3>
                        <table>
                        <tr>
                                <td className="table-label">Your website address:</td>
                                <td className="webinput">
                                    <input className="website-input" type="text"  value={website} 
                                    onChange={e => setWebsite(e.target.value)}/>
                                    <p className="helper">Please include the http://</p>
                                </td>
                                
                                <td></td>
                        </tr>
                        <tr>
                                <td className="table-label">Website name:</td>
                                <td className="webinput">
                                    <input className="website-input" type="text"  value={websiteName} 
                                    onChange={e => setWebsiteName(e.target.value)}/>
                                </td>
                                
                                <td></td>
                        </tr>
                        </table>
                        
                        <h3 className="epf">Offline bits</h3>
                        <table>
                            <tr>
                                <td className="table-label">Your Occupation:</td>
                                <td >
                                    <div className="occupation-input"><input type="text"  value={occupation} 
                                    onChange={e => setOccupation(e.target.value)}/></div>
                                </td>
                                
                            </tr>
                            <tr>
                                <td className="table-label">Your Hometown:</td>
                                <td >
                                    <div className="occupation-input"><input type="text"  value={hometown} 
                                    onChange={e => setHometown(e.target.value)}/></div>
                                </td>
                                
                            </tr>
                            <tr>
                                <td className="table-label">City you live in now:</td>
                                <td >
                                    <div className="occupation-input"><input type="text"  value={currentCity} 
                                    onChange={e => setCurrentCity(e.target.value)}/></div>
                                </td>
                                <td className="table-label airport">3 letter Airport Code:</td>
                                <td className="airport-input-holder"><input type="text"  value={airport} 
                                className="airport-input" onChange={e => setAirport(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td className="table-label">Country:</td>
                                <td >
                                    <div className="occupation-input"><input type="text"  value={country} 
                                    onChange={e => setCountry(e.target.value)}/></div>
                                </td>
                                <td className="small"></td>
                                <td className="need-help">
                                    <p>(<a href="http://www.loglink.com/airports.asp">Need help finding yours?</a>)</p>
                                </td>
                            </tr>
                            
                        </table>
                        <section className="epf-bottom">
                            <button className="save-button" onClick={saveIt}>SAVE IT</button>
                            <p className="epf">Or, <Link to='/account'>go back to your account page</Link>.</p>
                        </section>
                    </form>
                </div>
            </>
        )
    }
    
}