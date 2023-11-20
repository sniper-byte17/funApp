import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SignIn from '../components/Login';
import LoginForm from '../components/Login';
import RegistrationForm from '../components/RegistrationForm';


const BasicModal = ({resetPassword, currentEmail}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);   
  const [isNewUser, setIsNewUser] = useState(true);
  const handleFormSwitch = () => {
      console.log('Switch')
      setIsNewUser(!isNewUser);
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

  };

  const handleFinish = (value) => {
    resetPassword(value.email, currentEmail);
  };

  return (
    <>
      <Toaster />
      <Button className="ff-button-primary" style={{marginBottom: '2rem', justifySelf: 'end', padding: '.5rem 3.5rem'}} type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal 
        onCancel={handleCancel} 
        footer={null} 
        className="antd-custom-modal" 
        visible={isModalVisible} 
        okText={'Send Password Reset Mail'}
      >
        {
          isNewUser ? <LoginForm handleFormSwitch={handleFormSwitch} /> :<RegistrationForm handleFormSwitch={handleFormSwitch} />
        }
      </Modal>
    </>
  );
};

export default BasicModal;