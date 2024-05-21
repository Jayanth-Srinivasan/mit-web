import React from 'react'
import HeroImg from '../assets/HeroImg.png';

function Hero({onSignIn}) {
    return (
        <section className='h-screen w-screen flex justify-center items-center'>
            <div className='md:h-3/5 h-5/6 w-full md:w-5/6 flex md:flex-row flex-col bg-slate-200/80 rounded-xl shadow-md '>
                <div className='md:w-1/2 h-full flex items-center justify-start'>
                    <div className='w-full p-5'>
                        <h1 className='text-4xl font-mono font-semibold'>Share Your <span className='text-[#007FFF]'>Files</span> in a Minute</h1>
                        <p className='text-lg '>This is my first application using ReactJS</p>
                        <button onClick={onSignIn} className='bg-[#0067CF] mt-5 text-stone-100 py-2 px-4 rounded-md hover:bg-[#007FFF]'>Share Now</button>
                    </div>
                </div>
                <div className='md:flex hidden justify-center items-center '>
                    <img src={HeroImg} alt='hero' />
                </div>
            </div>
        </section>
    )
}

export default Hero