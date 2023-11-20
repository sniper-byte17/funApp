import React from 'react';
import { termsConditionData } from '../lib/terms/TermsConditionData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContainer from '../lib/AppContainer';
import BodyWrapper from '../lib/BodyWrapper';

const TermsCondition = () => {
    return (
        <div className='content-container'>
            <div className='terms'>
                <h2 className="terms__title">Terms of service</h2>
                <p className="terms__modified-date">Last Modified : April 2022</p>
                <h4 className="terms__contents-heading">Contents</h4>

                <div className="terms__headings">
                    {
                        termsConditionData.map((data, i)=> <h3 key={i}>{data.id} . {data.heading}</h3>)
                    }
                </div>
                <div className="terms__general">
                    <h3 className='terms__general-heading'>Terms of use for all users</h3>
                    <p className='terms__general-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec nunc donec adipiscing purus. Leo convallis orci nisi, vel. Ut nunc, sit tempus convallis. Consectetur mi curabitur sapien, vitae egestas urna. Suscipit risus lacus, tincidunt ultrices nunc mollis consequat eget in. Mauris tellus scelerisque curabitur auctor orci. Nibh velit, massa nunc, quis condimentum consequat purus in adipiscing. Eget suscipit quis nisi, ultrices tortor, at purus. Vulputate varius cras at est est et proin in. Condimentum interdum orci, a dictum velit convallis ut pulvinar egestas. Nunc, ullamcorper morbi et accumsan, pretium sit amet. Est ultrices vulputate a aliquam malesuada ullamcorper et. Tincidunt habitant turpis quam id pretium egestas arcu. Aliquet at mauris dui quam. In amet id sagittis eget egestas nisi, nisl sit odio. Pulvinar id adipiscing interdum tellus scelerisque malesuada id diam. Sapien aliquam vitae curabitur quis. Enim, facilisi magnis leo fermentum commodo magna euismod blandit id. Interdum a placerat urna, ut nulla morbi risus.
                    </p>
                </div>                
            </div>
        </div>
    );
};

export default TermsCondition;