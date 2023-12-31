import React, { useContext, useEffect, useState } from 'react';
import Booking from '../Booking/Booking';
import services from './booking.json';
import { context } from '../../AuthContext/AuthContext';

const Services = () => {

    const {loader} = useContext(context);

    if(loader){
        return <p className='text-center '><span className="loading loading-dots loading-lg"></span></p>
    }

    return (
        <div className="mt-20 text-center">
            <p className="text-xl text-red-700 font-bold">Services</p>
            <h1 className='text-6xl font-bold mb-6'>Our Services With Areas</h1>
            <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16 justify-center items-center'>
            {
                services.map((service, i) => <Booking
                    key={i}
                    service={service}
                ></Booking>)
            }
            </div>
        </div>
    );
};

export default Services;