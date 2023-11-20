import {useState} from 'react';
import LoginForm from '../components/Login';
import RegistrationForm from '../components/RegistrationForm';


export default function SignIn ({stopRedirectToProfile}) {
    const [isNewUser, setIsNewUser] = useState(true);
    const handleFormSwitch = () => {
        console.log('Switch')
        setIsNewUser(!isNewUser);
    }

    return (
        <>
            {
                isNewUser ? <LoginForm stopRedirectToProfile={stopRedirectToProfile} handleFormSwitch={handleFormSwitch} /> :<RegistrationForm handleFormSwitch={handleFormSwitch} />
    
            }
            {/* <LoginForm handleFormSwitch={handleFormSwitch} />
            <RegistrationForm handleFormSwitch={handleFormSwitch} /> */}
        </>
    )
}