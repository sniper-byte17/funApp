import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Radio } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Img from './Img';
import 'antd/dist/antd.css';
import {useRouter} from 'next/router';

export default function SettingsAccordion() {
  const router = useRouter();
  console.log(router.query.panel === '2');
  const [expanded, setExpanded] = React.useState(false);
  const [preExpanded, setPreExpanded] = React.useState(false);
  const [language, setLanguage] = React.useState('En');
  // const [accordionState, setAccordionState] = React.useState([false, false, false]);
  const [accordion1State, setAccordion1State] = React.useState(false);
  const [accordion2State, setAccordion2State] = React.useState(false);
  const [accordion3State, setAccordion3State] = React.useState(false);
  const [renderingMain, setRenderingMain] = React.useState(true);
  const [formData, setFormData] = React.useState({
    username: '',
    displayName: '',
    bio: '',
    location: '',
    currentWebsite: '',
    websites: ['facebook', 'twitter', 'instagram']
  });
  const [accountData, setAccountData] = React.useState({
    email: '',
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

  const storeCurrentWebsite = (e) => {

    const {name, value} = e.target;
    setFormData( prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  const addWebsite = (e) => {
    console.log(e.target);
    const websites = [...formData.websites];
    const newWebsites = [...websites, formData.currentWebsite];
    
    setFormData( prevState => ({
      ...prevState,
      currentWebsite: '',
      websites: newWebsites
    }));

  }

  const removeWebsite = (clickedSite) => {
    const {websites} = formData;
    
    const newSites = websites.filter( site => site !== clickedSite);
    console.log(newSites);
    setFormData(prevState => ({
      ...prevState,
      websites: [...newSites]
    }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  const handlePasswordChanging = () => {
    router.push('/Settings/changePassword');
    setPreExpanded(true);
  };

  React.useEffect( ( ) => {
    setPreExpanded(false);
  }, [])


  const handleLanguageChange = (e) => {
    // console.log(`switch to ${checked}`);
    setLanguage(e.target.value)
  }
  
  const handleAccordionClick = (accordion) => {
    // 0, true. rest false
    if(accordion === 0) {
      setAccordion1State(true);
      setAccordion2State(false);
      setAccordion3State(false);
    } else if(accordion ===1) {
      setAccordion1State(false);
      setAccordion2State(true);
      setAccordion3State(false);
    } else if(accordion === 2) {
      setAccordion1State(false);
      setAccordion2State(false);
      setAccordion3State(true);
    }
  }

  return (
    <div className='setting-accordion-wrapper'>
      <div className="previous-page">
          <Img src="/angle-left.png" className="angle-left" alt="Back" onClick={() => router.push('/Profile')} />
          <h2 className="section-title">Back to Profile</h2>
      </div>
      <h2 className="setting-username">@arianamorgan</h2>
      <div className='setting-tabs-desktop'>
      <Accordion disableGutters expanded={accordion1State} onClick={() => handleAccordionClick(0)} className="setting-accordion"  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="setting-accordion-dropdown-icon hide-in-desktop" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <span className="setting-accordion-title">
            Profile
          </span>
        </AccordionSummary>
        <AccordionDetails className="setting-accordion-data">
          <h4 className="tab-title">Edit Profile</h4>
          <form className="tab-form">
            <div className="tab-form__field">
              <label>Username</label>
              <input type="text" value={formData.username} name="username" onChange={storeFormData} />
              <span className='username-showcase'>www.funfinder.com/{formData.username}</span>
            </div>
            <div className="tab-form__field">
              <label>Display Name</label>
              <input type="text" value={formData.displayName} name="displayName" onChange={storeFormData} />
            </div>
            <div className="tab-form__field">
              <label>Bio</label>              
              <textarea type="text" value={formData.bio} name="bio" onChange={storeFormData} />
            </div>
            <div className="tab-form__field">
              <label>Location</label>
              <input type="text" value={formData.location} name="location" onChange={storeFormData} />
            </div>
            <div className="tab-form__field">
              <label>Website URL</label>
              <input type="text" value={formData.currentWebsite} name="currentWebsite" onChange={storeCurrentWebsite} />
              <span className="tab-form__field-add-btn" onClick={addWebsite}>
                <Img src="/plus-circled.png" className="tab-form__field-add-icon" alt="Add" />
                Add URL
              </span>
              <div className="websites">
                {
                  formData.websites.map( site => {
                    return (
                      <p key={site}>
                        {site}
                        <span onClick={() => removeWebsite(site)}>x</span>
                      </p>
                    )
                  })
                }
              </div>
            </div>
            <input type="submit" value="Save" className="form-submit-btn" onClick={submitForm} />
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters expanded={accordion2State} onClick={() => handleAccordionClick(1)} className="setting-accordion"  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="setting-accordion-dropdown-icon hide-in-desktop" />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
        <span className="setting-accordion-title">
          Account Settings
        </span>
        </AccordionSummary>
        <AccordionDetails defaultExpanded={true}  className="setting-accordion-data">
        <h4 className="tab-title">Account Info</h4>
          <form className="tab-form">
            <div className="tab-form__field">
              <label>Email</label>
              <input type="email" value={accountData.email} name="email" onChange={storeAccountData} />
            </div>
            <div className="tab-form__field">
              <label>Phone Number</label>
              <input type="number" value={accountData.phone} name="phone" onChange={storeAccountData} />
            </div>
            <div className="tab-form__field">
              <label>Password</label>
              <input type="password" value={accountData.password} name="password" readOnly />
            </div>
            <p className="tab-form__action" onClick={() => router.push('/Settings/changePassword')}>Change Password</p>
            <p className="tab-form__action" onClick={() => router.push('/Settings/deleteAccount')}>Delete Account</p>
            <input type="submit" value="Save" className="form-submit-btn" onClick={submitForm} />
          </form>      
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters expanded={accordion3State} onClick={() => handleAccordionClick(2)} className="setting-accordion"  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="setting-accordion-dropdown-icon hide-in-desktop" />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
        <span className="setting-accordion-title">
          Language
        </span>
        </AccordionSummary>
        <AccordionDetails defaultExpanded={true}  className="setting-accordion-data">
          
        <h4 className="tab-title hide-in-mobile">Language</h4>
        <Radio.Group className='language-radio-wrapper' onChange={handleLanguageChange} value={language}>
          <Radio className='language-radio' value={'En'}>English</Radio>
          <Radio className='language-radio' value={'Esp'}>Spanish</Radio>
          <Radio className='language-radio' value={'German'}>German</Radio>
        </Radio.Group>      
        </AccordionDetails>
      </Accordion>
      </div>
      <div className='desktop-divider-line'>
      </div>
      
    </div>
  );
}
