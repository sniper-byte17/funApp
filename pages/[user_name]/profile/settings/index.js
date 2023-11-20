import {useState, useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import { UserContext } from '../../../../lib/context';
import SettingsMain from '../../../../screens/settings';
import SignIn from '../../../sign-in';

export default function Settings() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useContext(UserContext);
  const {username, email, _id} = user;

  useEffect( () => {
    if(!username) {
      setIsLoggedIn(false);
    } else if(username.length > 0) {
      setIsLoggedIn(true);
    }
  }, [username]);

  return (
    <>
    {
        !isLoggedIn && 
        <div>
            <h2 style={{textAlign: 'center'}}>Please login with your content creator account to view your profile.</h2>
            {/* <Login stopRedirectToProfile={true} /> */}
            <SignIn stopRedirectToProfile={false} />
        </div>
    }
    {
        isLoggedIn && <SettingsMain loggedInEmail={email} id={_id} />
    }
    </>
  );
}
