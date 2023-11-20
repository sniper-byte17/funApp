import { Button, Form, Input, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LadingSpinner';

const SimpleCaptcha = () => {
    const generateCode = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
        return result;    
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const {loading} = useAuth();
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        // loadCaptchaEnginge(6);
    }, [])



    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFinish = (value) => {
    
    }
    
    return (
        <>
            <div className='password-reset-form'>
            <Toaster />
            <Button className="ff-button-primary" type="primary" onClick={showModal}>
                Delete Account
            </Button>
            <Modal 
                onCancel={handleCancel} 
                footer={null} 
                className="antd-custom-modal" 
                title="Delete Account" 
                visible={isModalVisible} >
            {
                loading 
                ? <LoadingSpinner />
                : <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name="code"
                        className="registration-form-fieldset"
                        label="Enter the code above"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the code above',
                        },
                        ]}
                    >
                        <Input className='authentication--input' />
                    </Form.Item>
                    <Button className="ff-button-primary" style={{left: '50%', transform: 'translateX(-50%)'}} htmlType="submit">
                        Confirm Account Deletion
                    </Button>
                    </Form> 
            }
            </Modal>
        </div>
        <div className="confirmation-code">
            {
                // result.map( (char, i) => <span key={i}>{char}</span>)
            }
        </div>
        </>
    )
}