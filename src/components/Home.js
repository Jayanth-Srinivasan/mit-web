import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home({ authUser, onSignOut }) {
    const navigate = useNavigate();
    console.log(authUser)   
    return (
        <div className='overflow-hidden'>
            <section className='bg-gradient-to-br from-blue-200 to-purple-300 h-screen w-screen '>
                <nav className='flex justify-between p-4' >
                    <h1 className='text-2xl font-semibold font-mono'>Filey</h1>
                    <div className='flex gap-4 items-center'>
                        <h1 className='font-semibold font-mono text-lg'>{authUser?.name}</h1>
                        <img onClick={onSignOut} src={authUser?.photoURL} alt='Userdp' className='w-10 h-10 rounded-full' />
                    </div>
                </nav>

                <div className='h-full flex justify-center items-center flex-col'>
                    <h1 className='mb-10 md:text-3xl text-2xl font-semibold font-mono'>Share or Receive the Files</h1>
                    <div className='flex md:flex-row flex-col justify-evenly items-stretch gap-8'>
                        <div onClick={() => navigate('/send')} className='px-8 py-12 bg-purple-500/80 w-52 rounded-lg transform transition-all duration-300 hover:scale-110 hover:bg-purple-600/80'>
                            <div className="flex gap-4 items-center justify-center">
                                <h1 className='text-2xl font-semibold text-center tracking-wider'>Send</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </div>
                        </div>
                        <div onClick={() => navigate('/receive')} className='px-8 py-12 bg-purple-500/80 w-52 rounded-lg transform transition-all duration-300 hover:scale-110 hover:bg-purple-600/80'>
                            <div className="flex gap-4 items-center justify-center">
                                <h1 className='text-2xl font-semibold text-center tracking-wider'>Receive</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home