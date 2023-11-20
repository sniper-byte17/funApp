import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { faqData } from '../lib/FAQ/FaqData';
import FaqQA from '../lib/FAQ/FaqQA';

import AppContainer from '../lib/AppContainer';
import BodyWrapper from '../lib/BodyWrapper';
import { Button } from 'antd';



const Faq = () => {
     
    return (
        <div className="profile">
            <div className='md:flex justify-between mt-10'>
                <div className="md:w-1/2 mt-4">
                    <div className="md:w-10/12 mx-auto space-y-3">
                        <h2 className="text-mycolor-200 font-extrabold text-2xl">FAQs</h2>
                        {
                            faqData.map((data)=><FaqQA key={data.id} data={data}/>)
                        }
                        </div>
                </div>
                <div className="md:w-1/2 mb-3 md:mb-0 mt-4">
                    <div className="bg-mycolor-100 md:w-10/12 py-3 my-auto rounded-md mt-10">
                        <div className="text-center">
                            <h1 className="text-mycolor-200 font-extrabold text-xl" style={{fontSize: '2.4rem', marginBottom: '2rem'}}>Any Question</h1>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </div>
                        <div className="w-10/12 mx-auto  space-y-2">
                            <div className="">
                                <label htmlFor="email">Email*</label><br />
                                <input type="email" name="email" className="w-full rounded-full h-[42px] pl-4 outline-none " />
                            </div>
                            <div className="">
                                <label htmlFor="email">Massage</label><br />
                                <textarea type="email" name="email" className="w-full rounded-lg py-1 px-2 h-[121px] outline-none" />
                            </div>
                            <div className="flex justify-end">
                            <Button size="large" type="primary" shape="round" htmlType="submit" className="login-form-button">
                            Send
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div> 
    );
};

export default Faq;