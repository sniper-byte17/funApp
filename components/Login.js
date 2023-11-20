import { Form, Input, Button, Checkbox } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Img from '../lib/Img';
import { useState } from 'react';
import {useAuth} from '../hooks/useAuth';
import LoadingSpinner from './LadingSpinner';
import { ArrowLeftOutlined } from '@ant-design/icons';

const NormalLoginForm = ({handleFormSwitch, stopRedirectToProfile}) => { 
  const {loginWithEmail, loginWithGmail, loading, resetPassword} = useAuth(stopRedirectToProfile);
  const [form] = Form.useForm();
  const [forgotPassword, setForgotPassword] = useState(false);

  const onFinish = async (values, x) => {
    if(!forgotPassword) {
      const loginResult = await loginWithEmail(values.email, values.password);  
      if(loginResult) {
        console.log(loginResult);
        toast.error(`${loginResult?.code?.split('/')[1].split('-').join(' ')}`);
      }

      return;
    }
    // Handle password reset
    resetPassword(values.email);
  };

  const signInWithGoogle = async () => {
    const loginResult = await loginWithGmail();
  };



  const switchPasswordResetState = () => {
    console.log('Clicked')
    setForgotPassword(!forgotPassword);
  }

  // const 
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }; 
  let render;
  if(forgotPassword) {
    // render = <PasswordResetForm switchForm={switchPasswordResetState} />
    render = (
      <>
      <h2 className='login-form__title'>Reset Password</h2>
      <ArrowLeftOutlined className="resetform-back" onClick={() => setForgotPassword(prevState => false)} />
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
          <Input className='authentication--input' />
        </Form.Item>
        <Button className="ff-button-primary" style={{left: '50%', transform: 'translateX(-50%)'}} htmlType="submit">
          Send Password Reset Email
        </Button>
      </>
    )
  } else if(!forgotPassword) {
    render = (
      <>
        <Toaster />
        <h2 className='login-form__title'>Login</h2>
        <Form.Item
          name="email"
          className="registration-form-fieldset"
          label="E-mail"
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
          <Input className='authentication--input' />
        </Form.Item>

        <Form.Item
          name="password"
          className="registration-form-fieldset"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password className='authentication--input' />
        </Form.Item>
        <Form.Item
          className="registration-form-fieldset forgot-button"
          valuePropName="checked"
          onClick={switchPasswordResetState}
          {...tailFormItemLayout}
        >
          Forgot Your Password?
        </Form.Item>

        <Form.Item
          name="remember-user"
          className="registration-form-fieldset"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>
            Remeber me
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout} className="registration-form-signup-button">
            <Button size="large" type="primary" shape="round" htmlType="submit" className="login-form-button">
              Sign In
            </Button>
        </Form.Item>
        {/* <span className='divider--or'> Or </span> */}
        {/* <div className="login-with-other-accounts">
          <Img src="/twitter.png" className="login-with-other-accounts__link" alt="Twitter Login" />
          <Img onClick={signInWithGoogle} src="/google.png" className="login-with-other-accounts__link" alt="Google Login" />
        </div> */}
        <p className='login-register'>Not Registered? <span onClick={handleFormSwitch}>Create an Account</span> </p> 
      </>
    )
  }
 
  return (
    <Form
    {...formItemLayout}
    form={form}
    name="register"
    className="login-form registration-form"
    onFinish={onFinish}
    initialValues={{
      residence: ['zhejiang', 'hangzhou', 'xihu'],
      prefix: '86',
    }}
    scrollToFirstError
  > 
    {loading ? <LoadingSpinner /> : render}
  </Form>
  );
};

export default NormalLoginForm;