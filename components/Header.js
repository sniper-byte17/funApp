import {useState, useEffect} from 'react';
import Link from 'next/link';
import Img from '../lib/Img';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const {user} = useContext(UserContext);
  const {firstname, profilePicture} = user || {firstname: '', profilePicture: ''};
  
  const proPic = profilePicture?.fileURL ? profilePicture.fileURL : '/user-dp-default.jpg';

  // console.log(profilePic);  
  const [renderingMobileSearchBar, setRenderingMobileSearchBar] = useState(false);
  const [dropDownClass, setDropDownClass] = useState('user-dropdown--hidden');
  const {logout} = useAuth();
  // console.log(user, username);
  const toggleSearchBar = () => {
    setRenderingMobileSearchBar(!renderingMobileSearchBar);
  }

  // let dropDownClass = 'user-dropdown--hidden'

  const toggleDropDown = () => {
    if(dropDownClass === 'user-dropdown--hidden') {
      setDropDownClass('user-dropdown--show')
    } else if(dropDownClass === 'user-dropdown--show') {
      setDropDownClass('user-dropdown--hidden')
    }
  }

  const handleLogOut = async (e) => {
    try {
      const logoutRes = await logout();
      setDropDownClass('user-dropdown--hidden');
      console.log(logoutRes)
    } catch(err) {
      console.log(err);      
    }
  };

  return (
    <header className='header'>
      <Link href="/" passHref>
        <a>
          <Img src="/logo.png" className="header__logo" alt="Fun Findrr" />
        </a>
      </Link>
      {
        !renderingMobileSearchBar ? 
        <Img src="/search-icon.png" className="header__search-icon" alt="Search" onClick={toggleSearchBar} />
        : 
        <Img src="/angle-left.png" className="header__back-icon" alt="Search" onClick={toggleSearchBar} />
      }
      {
        renderingMobileSearchBar && 
        <form className='header-search-form'>
          <input type="text" placeholder='Search...' className='header-search-form-field' />
          <input type="submit" value="" className='header-search-form-submit-icon' />
        </form>
      }
      {
        !renderingMobileSearchBar && 
        <form className='header-search-form header-search-form--desktop'>
          <input type="text" placeholder='Search...' className='header-search-form-field' />
          <input type="submit" value="" className='header-search-form-submit-icon' />
          <input type="submit" value="Search" className='header-search-form-submit-btn' />
        </form>
      }
      {
        (!renderingMobileSearchBar && user.username) && 
        <div className='header-user-controls'>
          <Img src="/messages-icon.png" className="header-user-controls__update" alt="Messages" />
          <Img src="/bell-icon.png" className="header-user-controls__update" alt="Messages" />
          <div className='header-user-controls__account'>
            <div 
              className='profile-picture' 
              style={{backgroundImage: `url(${proPic})`, 
                backgroundSize: 'cover', 
                border: '2px solid white', 
                backgroundPosition: 'center', 
                backgroundRepeat:'no-repeat', 
                borderRadius: '50%'}} />
            <span className='user-name'>{firstname}</span>
            <Img src="/angle-down.png" className="profile-more" alt="User" onClick={toggleDropDown} />
            <div className={`user-dropdown ${dropDownClass}`}>
              <span className={'logout-button'} onClick={handleLogOut}>Logout</span>
            </div>
          </div>
        </div>   
      }
      </header>
  )
}