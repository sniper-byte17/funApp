import React, { useState } from 'react';
import moment from 'moment'
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  DatePicker,
  Space,
} from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import {useAuth} from '../hooks/useAuth';
import LoadingSpinner from './LadingSpinner';
const { Option } = Select;

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

const RegistrationForm = ({handleFormSwitch}) => {
  // const { getFieldDecorator } = this.props.form;
  const [form] = Form.useForm();
  // const {getFieldDecorator} = form;
  console.log(form)
  const {setUser} = useContext(UserContext);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [duplicateUsername, setDuplicateUsername] = useState(false);
  const router = useRouter();
  const {registerWithEmail, loading} = useAuth();
  const [date, setDate] = useState('');

  const onFinish = async (values) => {
    console.log(values);
    const properValues = {...values, dateOfBirth: date};
    console.log(properValues);
    
    try {
      const age = moment().diff(date, 'years');
      if(age < 18) {
        throw new Error('Must be at least 18 years.')
      }
      const registrationResult = await registerWithEmail(properValues);
    } catch(err) {

      console.log(err);
      toast.error(`${err.errorMessage || err.message}`);
      
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const storeDate = (date, dateString) => {
    // setDateoFBirth()
    
    // let today = new Date();
    // let birthDate = new Date(dateString);
    // const age = moment().diff(dateString, 'years');
    // if(age < 18) {
    //   toast.error("Must be 18years or above.");
    //   return;
    // }
    // console.log(age);
    setDate(dateString);
  }

  const reAppearForm = () => {
    setDuplicateEmail(false);
    setDuplicateEmail(false);
  }
  
  const NewFormButton = (handler, type) => {
    return <div onClick={() => handler(false)} className="already-exists-wrapper">{type} already exists. Use a different one. <button>Back to Form</button> </div>
  }

  let render;
  if(duplicateEmail && !duplicateUsername ) {
    render = NewFormButton(setDuplicateEmail, 'Email');
  } else if(duplicateUsername && !duplicateEmail) {
    render = NewFormButton(setDuplicateUsername, 'Username');
  } else if(duplicateEmail && duplicateUsername) {
    render = NewFormButton(reAppearForm, 'Both Email and Username')
  } else if(!duplicateEmail && !duplicateUsername) {
    render = <>
  <h2 className='login-form__title'>Sign Up</h2>
  <Form.Item
    name="firstname"
    className="registration-form-fieldset"
    label="First name"
    rules={[
      {
        required: true,
        message: 'Please input your firstname',
      },
    ]}
  >
    <Input className='authentication--input' />
  </Form.Item>

  <Form.Item
    name="lastname"
    className="registration-form-fieldset"
    label="Last name"
    rules={[
      {
        required: true,
        message: 'Please input your last name',
      },
    ]}
  >
    <Input className='authentication--input' />
  </Form.Item>

  <Form.Item 
    label="Date of Birth" 
    className="registration-form-fieldset"
    rules={[{ type: 'object', required: true, message: 'Please enter your date of birth.' }]}>
    <DatePicker className='authentication--input' onChange={storeDate} />
  </Form.Item>
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
    name="username"
    className="registration-form-fieldset"
    label="Username"
    tooltip="Create an unique username for you."
    rules={[
      {
        required: true,
        message: 'Please input an username',
        whitespace: true,
      },
    ]}
  >
    <Input className='authentication--input' />
  </Form.Item>


  <Form.Item
    name="gender"
    className="registration-form-fieldset"
    label="Gender"
    rules={[{ required: true, message: 'Please select gender!' }]}
  >
    <Select placeholder="select your gender">
      <Option value="male">Male</Option>
      <Option value="female">Female</Option>
      <Option value="transgenderMaleToFemale">Transgender Male to Female</Option>
      <Option value="transgenderFemaleToMale">Transgender Female to Male</Option>          
      <Option value="nonBinary">Non Binary</Option>
      <Option value="other">Other</Option>
    </Select>
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
    name="confirm"
    className="registration-form-fieldset"
    label="Confirm Password"
    dependencies={['password']}
    hasFeedback
    rules={[
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
      }),
    ]}
  >
    <Input.Password className='authentication--input' />
  </Form.Item>

  <Form.Item
    name="agreement-terms"
    className="registration-form-fieldset"
    valuePropName="checked"
    rules={[
      {
        validator: (_, value) =>
          value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
      },
    ]}
    {...tailFormItemLayout}
  >
    <Checkbox>
      I have read the <a href="">agreement</a>
    </Checkbox>
  </Form.Item>

  {/* <Form.Item
    name="agreement-age"
    className="registration-form-fieldset"
    valuePropName="checked"
    rules={[
      {
        validator: (_, value) =>
          value ? Promise.resolve() : Promise.reject(new Error('Should be at least 18 years to proceed.')),
      },
    ]}
    {...tailFormItemLayout}
  >
    <Checkbox>
      I am atleaset 18 years old.
    </Checkbox>
  </Form.Item> */}
  <Form.Item {...tailFormItemLayout} className="registration-form-signup-button">
    <Button type="primary" htmlType="submit" className="login-form-button" shape="round">
      Sign Up
    </Button>
  </Form.Item>
  <p className='login-register'>Already Registered? <span onClick={handleFormSwitch}>Sign In</span> </p>
    </>
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
  <Toaster />
    {
      loading ? <LoadingSpinner /> : render
    }
  </Form>
  );
};

export default RegistrationForm;