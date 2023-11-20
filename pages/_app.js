import 'antd/dist/antd.css';
import '../styles/globals.scss'
import { UserContext, SearchResultContext  } from '../lib/context'
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    ethnicity: '',
    contentCategory: [],
    profilePicture: '',
    cover: '',
    email: '',
    photos: [],
    videos: [],
    bio: '',
    websites: [''],
    referrals: [],
    age: ''
  })

  // console.log('[App.js]...');
  const [results, setResults] = useState([]);
  // if(JSON.parse(window.sessionStorage.getItem("loggedInUser"))!== null) {
  //   const user = JSON.parse(window.sessionStorage.getItem("loggedInUser"));
  //   setUser(prevState => user);
  // } else {
  //   setUser({});
  // }
  useEffect(() => {
    console.log('Ready to check session');
    if(JSON.parse(window.sessionStorage.getItem("loggedInUser"))!== null) {  
      const x = JSON.parse(window.sessionStorage.getItem("loggedInUser"));
      console.log(x);
      if(x.username) {
        setUser(prevState => x);
      }
    } else {
      setUser(user);
    }
  }, []);

  let Layout = Component.Layout || MainLayout;
  return (
    <StyledEngineProvider injectFirst>
      <UserContext.Provider value={{user, setUser}} >
        <SearchResultContext.Provider value={{results, setResults}}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchResultContext.Provider>
      </UserContext.Provider>
    </StyledEngineProvider>
  )
}

export default MyApp
