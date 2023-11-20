import { Button, Modal, Form, Input, Select } from 'antd';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import Img from './Img';
import useAccountSettings from '../hooks/useAccountSettings';
const { Option } = Select;

const WebsiteAdder =  React.forwardRef((props, ref) => {
  const {storeWebsiteFormData, currentWebsites, mode, website} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    link: '',
    displayLink: '',
    logo: 'other'
  });
  const [websites, setWebsites] = useState(currentWebsites);
  const {submitForm, updateWebsite} = useAccountSettings();
  // console.log(website);
  const showModal = () => {
    // console.log(website);
    // setFormData(website);
    setIsModalVisible(true);
  };
  useEffect( () => {
    if(website?.site) {
      setFormData(website.site);
    }
  }, [website]);


  const handleOk = (e) => {
    // console.log(formData);
    if(mode==='edit') {
      updateWebsite(e, formData, website.i);
      // submitForm(e);
    } else {
      storeWebsiteFormData(formData);
    }
  };

  const storeCurrentWebsite = (e) => {
    const {name, value} = e.target;
    // console.log(name, value);
    setFormData( prevState => ({
      ...prevState,
      [name]:value
    }))  
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    setFormData( prevState => ({
      ...prevState,
      ['logo']: value
    }))
  };

  return (
    <div>
      {
        mode ? 
        <Button onClick={(e) => showModal(e)} className="website-modal-btn" ref={ref} style={{display: 'none'}}>
          Add Website
        </Button>  : 
        <Button onClick={showModal} className="website-modal-btn">
          Add Website
        </Button>
      }
      <Modal title="Add a website link" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Select
        defaultValue="Other"
        style={{
            width: 120
        }}
        onChange={handleChange}
        >
            <Option value="onlyFans">OnlyFans</Option>
            <Option value="twitter">Twitter</Option>
            <Option value="facebook">Facebook</Option>
            <Option value="youtube">Youtube</Option>
            <Option value="other">Other</Option>
        </Select>
        <div className="tab-form__field">
          <label>Link</label>
          <input type="text" value={formData.link} name="link" onChange={storeCurrentWebsite} />
        </div>
        <div className="tab-form__field">
          <label>Display </label>
          <input type="text" value={formData.displayLink} name="displayLink" onChange={storeCurrentWebsite} />
        </div>       
        Previews: 
        <span className="website-preview" style={{border: 'none'}}>
          <Img src={`/${formData.logo ? formData.logo : 'other'}.png`} alt={formData.logo} className="websites-logo" /> 
          {formData.displayLink}
        </span>
        {/* <input type="submit" value="Save" className="form-submit-btn" onClick={submitForm} /> */}
      </Modal>
    </div>
  );
});

WebsiteAdder.displayName = 'WebsiteAdder';

export default WebsiteAdder;