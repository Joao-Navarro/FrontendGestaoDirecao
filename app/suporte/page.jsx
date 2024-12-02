// pages/index.js
import React from 'react';
import ContactForm from '../../components/ContactForm';
import Header from '@/components/Header';

const Home = () => {
    
    return (

        <div>
            <Header/>
            
            <ContactForm />
        </div>
    );
};

export default Home;