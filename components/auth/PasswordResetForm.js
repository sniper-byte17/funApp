import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from '../LadingSpinner';
import { useAuth } from '../../hooks/useAuth';


const PasswordResetForm = ({resetPassword, currentEmail}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {loading} = useAuth();
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };



  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (value) => {
    resetPassword(value.email, currentEmail);
  }
  console.log(loading);

  return (
    <div className='password-reset-form'>
      <Toaster />
      <Button className="ff-button-primary" style={{marginBottom: '2rem'}} type="primary" onClick={showModal}>
        Change Password
      </Button>
      <Modal onCancel={handleCancel} footer={null} className="antd-custom-modal" title="Basic Modal" visible={isModalVisible} okText={'Send Password Reset Mail'}>
      {
        loading 
          ? <LoadingSpinner />
          : <Form form={form} onFinish={handleFinish}>
              <Form.Item
                name="email"
                className="registration-form-fieldset"
                label="Email"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
              >
                <p>Hello World</p>
                <Input className='authentication--input' />
              </Form.Item>
              <Button className="ff-button-primary" style={{left: '50%', transform: 'translateX(-50%)'}} htmlType="submit">
                Send Password Reset Email
              </Button>
            </Form> 
      }
      {/* <LoadingSpinner /> */}

      </Modal>
    </div>
  );
};

export default PasswordResetForm;