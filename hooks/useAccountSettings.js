import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../lib/context'
import toast from 'react-hot-toast'

export default function useAccountSettings() {
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('En');
    const {username, firstname, bio, country, websites, email, ethnicity, contentCategory, _id} = user;
    
    const [formData, setFormData] = useState({
      username: username,
      displayName: firstname,
      bio: bio,
      location: country,
      currentWebsite: '',
      websites: websites,
      ethnicity: ethnicity,
      contentCategory: contentCategory
    });
    
    const submitForm =  async (e) => {
      e.preventDefault();
      console.log(formData);
      try {
          // make a requesst to a url to update the profile with the current data
          setLoading(true);
          const endpoint = `<HOSTED_URL>/api/v1/profile/email/${email}`;
          const requestResponse = await fetch(endpoint, {
              method: 'PATCH',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                bio: formData.bio,
                country: formData.location,
                websites: [...formData.websites],
                ethnicity: formData.ethnicity,
                contentCategory: formData.contentCategory
              })
          });
  
          const updatedData = await requestResponse.json();
          setUser(updatedData.data.profile);
          setLoading(false);
          toast.success('Settings saved succesfully!');
      } catch(err) {
        setLoading(false);
        toast.error('An error occured.');
        console.log(err);
      }
    }
  
    const [accountData, setAccountData] = useState({
      email: email,
      phone: '',
      password: 'demopassword'
    })
  
    const storeFormData = (e) => {
      const {name, value} = e.target;
      setFormData( prevState => ({
        ...prevState,
        [name]:value
      }))
    }
  
    const storeAccountData = (e) => {
      const {name, value} = e.target;
      setAccountData( prevState => ({
        ...prevState,
        [name]:value
      }))
    }
  
    const storeWebsiteFormData = (website) => {
      console.log(website);
      setFormData( prevState => ({
        ...prevState,
        ['websites']: [...prevState.websites, website]
      }));
      console.log(formData);
    }

    const updateWebsite = async (e, website, index) => {
      const updatedWebsites = websites.map((site, i) => {
        // console.log(`current: ${i}.....to be changed: ${index}`);
        if(i === index) {
          return website;
        } else {
          return site;
        }
      });
      // console.log(updatedWebsites);
      setFormData(prevState => ({
        ...prevState,
        ['websites']: [...updatedWebsites]
      }));

       try {
          // make a requesst to a url to update the profile with the current data
          setLoading(true);
          const endpoint = `<HOSTED_URL>/api/v1/profile/email/${email}`;
          const requestResponse = await fetch(endpoint, {
              method: 'PATCH',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                websites: updatedWebsites
              })
          });
  
          const updatedData = await requestResponse.json();
          setUser(updatedData.data.profile);
          setLoading(false);
          toast.success('Settings saved succesfully!');
      } catch(err) {
        setLoading(false);
        toast.error('An error occured.');
        console.log(err);
      }

    }
  
  
  
    const removeWebsite = (i) => {
      const {websites} = formData;
      
      const newSites = websites.filter( (site, index) => index !== i);
      console.log(newSites);
      setFormData(prevState => ({
        ...prevState,
        websites: [...newSites]
      }));
    };
  
    const handleTagSelect = (value, e) => {
      // console.log(e);
      // contentCategory = 
      setFormData( prevData => ({
        ...prevData,
        contentCategory: value
      }) )
    };
  
    const handleEthnicity = (value) => {
      console.log(value);
      setFormData( prevData => ({
        ...prevData,
        ethnicity: value
      }))
    };

    const handleLanguageChange = () => {

    }
    return {
        storeFormData, storeAccountData, storeWebsiteFormData, removeWebsite, handleTagSelect, handleEthnicity, accountData, submitForm, language, formData, username, loading, handleLanguageChange
        , updateWebsite
      }

}