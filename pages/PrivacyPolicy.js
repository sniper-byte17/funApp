import React from 'react';
import { privacyData,PrivacySingle } from '../lib/PrivacyPolicy/PrivacyData';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContainer from '../lib/AppContainer';
import BodyWrapper from '../lib/BodyWrapper';

const PrivacyPolicy = () => {
    const headingStyle = {
        color: 'var(--primary-color)', 
        fontSize: '2.4rem',
        fontWeight: '700'
    }

    const lastModifiedStyles = {
        fontSize: '2.4rem',
        marginBottom: '1rem'
    }

    return (
    <div className="content-container">
        <div className='py-4'>
            <h2 style={headingStyle} >Privacy Policies</h2>
            <p style={lastModifiedStyles}>Last Modified : April 2022</p>
            <div className="space-y-2">
                {
                    privacyData.map((data)=><PrivacySingle key={data.id} data={data}/>)
                }
            </div>
        </div>
    </div>
    );
};

export default PrivacyPolicy;