import { ReloadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../LadingSpinner';

const AccountDeletionForm = ({id, username}) => {
    const [code, setCode] = useState('');
    const generateCode = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
        console.log(result);
        setCode(prevState => result);
        return;
    }


    const [isModalVisible, setIsModalVisible] = useState(false);
    const {loading, deleteUser} = useAuth();
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        console.log(code);
    }, [code])



    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFinish = (value) => {
        if(code === value.code) {
            console.log('Code matched');
            deleteUser(id, username);
        } else {
            console.log('Code did not match.');
            toast.error('Wrong code!')
        }
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
            <div className="confirmation-code">
                {code}
            </div>
            <ReloadOutlined className='reload-code-button' onClick={() => generateCode(6)} />
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
        </>
    )
}

export default AccountDeletionForm