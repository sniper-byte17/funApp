import { useContext, useState } from 'react';
import {auth} from '../lib/firebase';
import {signInWithPopup, GoogleAuthProvider, deleteUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getIdToken, sendPasswordResetEmail } from 'firebase/auth'
import { UserContext } from '../lib/context';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';

class CustomError extends Error {
  constructor(message) {
    super();
    this.errorMessage = message;
  }
};

// const customError = new CustomError('tag1');
  
export const useAuth = (stopRedirectToProfile) => {
    const [loading, setLoading]  = useState(false);
    const {setUser} = useContext(UserContext);
    const router = useRouter();

    const loginWithEmail = async (email, password) => {
        // console.log(email, password);
        try {
            setLoading(true);
            const loggedInUser = await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
            const userEmail = loggedInUser.user.email;
            console.log(loggedInUser.user.accessToken);
            const userPromise = await fetch(`<HOSTED_URL>/api/v1/profile/email/${userEmail}`, {
              headers: {
                'authorization': `Bearer ${loggedInUser.user.accessToken}`
              }
            });
            const profile = await userPromise.json();
            
            // getIdToken(loggedInUser)
            // .then(token => console.log(token));

            setUser(profile.data[0]);
            window.sessionStorage.setItem("loggedInUser", JSON.stringify(profile.data[0]));

            setLoading(false);
            // toast.success('Logged in! Redirecting...');
            
            if(!stopRedirectToProfile) {
              console.log()
              const username = profile.data[0].username;
              router.push(`/${username}/profile`);
            }
            
        } catch(err) {
          console.log(err);
          setLoading(false);
          return err;
        }
    }

    const loginWithGmail = async (email, password) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const {user} = result;          
            console.log(user);
        } catch(err) {
            console.log(err);
        }
    }

    const registerWithEmail = async (values) => {
        try {
            setLoading(true);
            console.log('Received values of form: ', values);
            const {email, password, firstname, lastname, username, gender, dateOfBirth} = values;
            console.log(email, password);
            
            // Submit username to database, and check if it is unique. If unique, only then attempt to submit the form.
            const usernameCheckResponse = await fetch("<HOSTED_URL>/api/v1/profile/checkUsername", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },  
                body: JSON.stringify({username: username})
              });
            const usernameCheckResult = await usernameCheckResponse.json();
            
            if(usernameCheckResult.status === 'duplicate') {
              throw new CustomError('Username taken. Plese try a new one.');
            }
            
            const formattedEmail = email.toLowerCase();
            const userCreationResponse = await createUserWithEmailAndPassword(auth, formattedEmail, password);
            console.log(userCreationResponse);
            const profileCreation = await fetch('<HOSTED_URL>/api/v1/profile', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    firstname: firstname, 
                    lastname: lastname,
                    username: username,
                    email: formattedEmail,
                    gender: gender,
                    dateOfBirth: dateOfBirth
                  })
                });
            const createdProfileData = await profileCreation.json();
            const userEmail = createdProfileData.data.profile.email;
            const emailResponse = await fetch(`<HOSTED_URL>/api/v1/profile/email/${userEmail}`)
            const profile = await emailResponse.json();
            
            setUser(profile.data[0]);
            window.sessionStorage.setItem("loggedInUser", JSON.stringify(profile.data[0]));
            
            setLoading(false);
            router.push(`/${username}/profile`);
          } catch(err) {
            setLoading(false);
            if(err.code === 'auth/email-already-in-use') {
              throw new CustomError('This email is already in use.')
            } else {
              throw err;
            }

          }
    }

    const logout = async (email, password) => {
      // console.log(email, password);
      try {
        setLoading(true);
        const signOutResult = await signOut(auth);
        setUser({username: ''});
        window.sessionStorage.setItem("loggedInUser", null);
        setLoading(false);
        router.push('/');
      } catch(err) {
        console.log(err);
        setLoading(false);
        return err;
      }
    }

    const resetPassword = async (email) => {
      setLoading(true);
      try {
        setLoading(true);
        // console.log(email);
        const result = await sendPasswordResetEmail(auth, email);
        console.log(result);
        setLoading(false);
        toast.success('Password reset link sent!');
        
      } catch(err) {
        toast.error('An error occured. Please try again later.');
        setLoading(false);
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorMessage);
      }
    }

    const deleteUser = async (id, username) => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        console.log(user);
        if(!user) {
          setUser({username: ''});
          window.sessionStorage.setItem("loggedInUser", null);  
        }
        const deletionResult = await user.delete();
        const usernameCheckResponse = await fetch(`<HOSTED_URL>/api/v1/profile/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },  
          body: JSON.stringify({username: username})
        });


        setUser({username: ''});
        window.sessionStorage.setItem("loggedInUser", null);
        toast.success('Deleted your profile succesfully. Redirecting...');
        setLoading(false);
        router.push('/');
        console.log(user);
      } catch(err) {
        console.log(err);
        toast.error('An error occured');
        setLoading(false);
      }
    }

    return {
        loginWithEmail, loginWithGmail, registerWithEmail, loading, logout, resetPassword, deleteUser
    }
}
