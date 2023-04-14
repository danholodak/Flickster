import './css/Footer.css'

export default function Footer(){

    return(
        <div className="footer">
            <div className="footer-top">
                <button className="disabled">About </button>
                <button className="disabled">Jobs</button>
                <button className="disabled">Blog</button>
                <button className="disabled">Developers</button>
                <button className="disabled">Guidelines</button>
                <button className="disabled">Help</button>
                <button className="disabled">Report abuse</button>
                <button className="disabled">Help forum</button>
                <button className="disabled">English</button>
            </div>
            <div className="footer-bottom">
            <div>
                <button className="disabled">Privacy</button>
                <button className="disabled">Terms</button>
                <button className="disabled">Cookies</button>
            </div>
            <p>This website was created by Dan Holodak, featuring photos by Beth Crane</p>
            <div>
                <a href="https://github.com/danholodak/Flickster">github</a>
                <a href="https://www.linkedin.com/in/danholodak/">linkedin</a>
            </div>
            </div>
        </div>
    )
}