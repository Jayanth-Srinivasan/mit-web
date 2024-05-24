import React from 'react'

function Send() {
    return (
        <div className='overflow-hidden'>
            <section className='bg-gradient-to-br from-blue-200 to-purple-300 h-screen w-screen '>
                <nav className='flex justify-between p-4' >
                    <h1 className='text-2xl font-semibold font-mono'>Filey</h1>
                    <div className='flex gap-4 items-center'>
                        {/* <h1 className='font-semibold font-mono text-lg'>{authUser?.name}</h1>
                      <img onClick={ondiv className='overflow-hidden'SignOut} src={authUser?.photoURL} alt='Userdp' className='w-10 h-10 rounded-full' /> */}
                    </div>
                </nav>
                <div className='h-full w-full justify-center items-center'>
                    <div className='flex items-center justify-center w-full mx-auto sm:max-w-lg'>
                        <div className='flex flex-col items-center justify-center w-full md:w-3/4 rounded-lg shadow-xl h-96 my-20 bg-slate-200 '>
                            <div>
                                <h1 className='text-2xl font-semibold font-mono'>Send Files</h1>
                                <p className='text-xs text-gray-500'>Files Should........</p>
                            </div>
                            <form className=''>
                                <input type='file' className='w-3/4 p-2 my-4 border-2 border-gray-300 rounded-lg' />
                    
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Send