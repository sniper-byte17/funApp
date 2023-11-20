import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Radio, Select } from 'antd';
const { Option } = Select;
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Img from '../lib/Img';
import 'antd/dist/antd.css';
import {useRouter} from 'next/router';
import UploadMedia from '../lib/uploadMedia';
import LoadingSpinner from '../components/LadingSpinner';
import toast, { Toaster } from 'react-hot-toast';
import WebsiteAdder from '../lib/Modal';
import {useAuth} from '../hooks/useAuth';
import useAccordion from '../hooks/useAccordion';
import useAccountSettings from '../hooks/useAccountSettings';
import PasswordResetForm from '../components/auth/PasswordResetForm';
import AccountDeletionForm from '../components/auth/AccountDeletionForm';

export default function Settings({loggedInEmail, id}) {
  const {resetPassword} = useAuth();
  const router = useRouter();
  const {accordion1State, accordion2State, accordion3State, accordion4State, handleAccordionClick} = useAccordion();
  const {
    storeFormData, storeAccountData, storeWebsiteFormData, removeWebsite, handleTagSelect, handleEthnicity, accountData, submitForm, language, formData, username, loading, handleLanguageChange
  } = useAccountSettings();

  const availableOptions = [
    <Option key="solo">Solo</Option>,
    <Option key="b/g">B/G</Option>,
    <Option key="kink">Kink</Option>,
    <Option key="feet">Feet</Option>,
    <Option key="fetish">Fetish</Option>,
    <Option key="gay/lesbian">Gay/Lesbian</Option>,
    <Option key="public">Public</Option>,
    <Option key="toys">Toys</Option>,
    <Option key="celebrity">Celebrity</Option>
  ];

  return (
    <div className='setting-accordion-wrapper'>
      <div className="previous-page"  onClick={() => router.push(`/${username}/profile`)} >
          <Img src="/angle-left.png" className="angle-left" alt="Back"/>
          <h2 className="section-title">Back to Profile</h2>
      </div>
      <h2 className="setting-username">@{username}</h2>
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
          {loading ? <LoadingSpinner /> : 
          <>
            <Toaster />
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
                <label>Ethnicity</label>
                <Select
                  className="tab-form__field"
                  placeholder="Select Your Ethnicity"
                  defaultValue={formData.ethnicity}
                  onChange={handleEthnicity}
                >
                  <Option value="white/caucasion">White/Caucasian</Option>
                  <Option value="asian">Asian</Option>
                  <Option value="ebony">Ebony</Option>
                  <Option value="hispanic">Hispanic</Option>
                  <Option value="indian">Indian</Option>
                  <Option value="other">Other</Option>
                </Select>
              </div>
              <div className="tab-form__field">
                <label>Website URL</label>
                <WebsiteAdder storeWebsiteFormData={storeWebsiteFormData} currentWebsites={formData.websites} />
                <div className="added-websites" style={{display: 'flex', rowGap: '1rem', columnGap: '2rem', marginTop: '1rem'}}>
                  {
                    formData.websites.map( (website, i) => {
                      if(website) {
                        return (
                          <span className="website-preview hover-action-parent">
                            <Img src={`/${website.logo}.png`} alt={website.logo} className="websites-logo" /> 
                            {website.displayLink}
                            <span className='remove-website hover-action' onClick={() => removeWebsite(i)}>x</span>
                          </span>
                        )
                      }
                    })
                  }
                </div>                
                
              </div>
              
              <label>Tags for your content type</label>
              <Select 
                className="tab-form__field"
                mode="multiple"
                allowClear
                style={{
                  width: '100%'
                }}
                placeholder="Please select some tags for your content type"
                defaultValue={formData.contentCategory}
                onChange={handleTagSelect}
              >
                {availableOptions}
              </Select>
              <input type="submit" value="Save" className="form-submit-btn" onClick={submitForm} />
            </form>
          </>}
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters expanded={accordion2State} onClick={() => handleAccordionClick(1)} className="setting-accordion"  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="setting-accordion-dropdown-icon hide-in-desktop" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <span className="setting-accordion-title">
            Pictures and Videos
          </span>
        </AccordionSummary>
        <AccordionDetails className="setting-accordion-data">
          <h4 className="tab-title">Add Picutre and Videos for your fans!</h4>          
          <UploadMedia />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters expanded={accordion3State} onClick={() => handleAccordionClick(2)} className="setting-accordion"  >
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
            <PasswordResetForm resetPassword={resetPassword} currentEmail={loggedInEmail} />
            <AccountDeletionForm username={username} id={id} />
            <input type="submit" value="Save" className="form-submit-btn" onClick={submitForm} />
          </form>      
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters expanded={accordion4State} onClick={() => handleAccordionClick(3)} className="setting-accordion"  >
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
      {/* <div className='desktop-divider-line'>
      </div> */}
      
    </div>
  );
}
