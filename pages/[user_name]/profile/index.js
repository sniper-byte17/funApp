import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../lib/context';
import Profile from '../../../screens/profile';
import SignIn from '../../sign-in';
import { useRouter } from 'next/router';


const ProfilePage = () => {
    const {user} = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { username, email } = user;
    const router = useRouter();
    const queryUsername = router.query.user_name;


    useEffect( () => {
        // console.log(username);
        // console.log(router.query.user_name);
        if(!JSON.parse(window.sessionStorage.getItem("loggedInUser"))) {
            setIsLoggedIn(false);
        } else if(username !== queryUsername) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [queryUsername]);
    
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
            isLoggedIn && <Profile user={user} />
        }
        </>
    );
};

export default ProfilePage;