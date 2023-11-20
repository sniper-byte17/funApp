import Link from "next/link";
import DropdownBasic from "../lib/DropdownBasic";
import Img from "../lib/Img";

export default function Footer({}) {
    return (
        <footer className="footer">
            <div className="footer__column footer__column--1">
                <ul className="footer__links">
                    <li className="footer__links-link">Help</li>
                    <li className="footer__links-link">Store</li>
                    <li className="footer__links-link">How it works</li>
                    <li className="footer__links-link">Cookie Notice</li>
                    <li className="footer__links-link">Acceptable Use Policy</li>
                </ul>
                <p className="footer__copyright">&copy; Fun Findrr 2022</p>
            </div>
            <div className="footer__column footer__column--2">
                <ul className="footer__links">
                    <li className="footer__links-link">About</li>
                    <li className="footer__links-link">
                        <Link href="/PrivacyPolicy" passHref>
                            <a>
                                Privacy and Policy
                            </a>
                        </Link>        
                    </li>
                    <li className="footer__links-link">
                        <Link href="/terms" passHref>
                            <a>
                                Terms of Services
                            </a>
                        </Link>        
                    </li>
                    <li className="footer__links-link">
                        <Link href="/FAQ" passHref>
                            <a>
                                FAQ
                            </a>
                        </Link>        
                    </li>
                </ul>
                <div className="footer__links-social-links">
                    <Img src="/twitter.png" className="footer-twitter" />                    
                    <Img src="/insta-skel.png" className="footer-insta" />
                </div>
                
                {/* <select name="language" className="footer-language">
                    <option value="english">En</option>
                    <option value="bangla">Bn</option>
                </select> */}
            </div>
        </footer>
    )
}