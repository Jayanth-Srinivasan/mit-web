import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { db } from '../firebase';


function Receive() {
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (code) => {
    setCode(code);
  }

  const handleSubmit = async() => {
    console.log(code);
    const docRef = doc(db, 'shareRooms', code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const fileDoc = docSnap.data();
      setFile(fileDoc);
      console.log(fileDoc);
    }
    else{
      alert('Invalid Code');
    }
  }

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
            <div className="flex flex-col items-center justify-center w-full h-96 my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl ">
                    {
                      !file ?
                    <>
              <div className="mt-10 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-2">Enter the Filey Code</h2>
                <p className="text-xs text-gray-500">Enter the code from the sender to get the file</p>
              </div>
              <div>
                <div className='flex flex-col space-y-16'>
                  <div className='flex justify-center items-center'>
                    <OtpInput
                      value={code}
                      onChange={handleChange}
                      numInputs={5}
                      renderSeparator={<span style={{ width: "9px" }}></span>}
                      inputStyle={{
                        width: "40px",
                        height: "40px",
                        fontSize: "20px",
                        margin: "0 5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        textAlign: "center"
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <div className='flex flex-col space-y-5'>

                    <button onClick={handleSubmit} className='px-4 py-2 bg-gradient-to-br from-[#007FFF] to-indigo-200 text-white rounded-lg hover:bg-gradient-to-br hover:from-indigo-200 hover:to-[#007FFF] transform transition-all duration-300 hover:scale-110'>
                      Download
                    </button>

                  </div>
                </div>
              </div>
              </>
              :
              <>
                    <div className="mt-10 mb-10 text-center">
                      <h2 className="text-2xl font-semibold mb-2">Hurray!!, File Receieved</h2>
                      <p className="text-xs text-gray-500">{file.name}</p>
                    </div>
                    <div className='flex flex-col space-y-5'>
                      <a href={file.file} target="_blank" rel='noreferrer' className='px-4 py-2 bg-gradient-to-br from-[#007FFF] to-indigo-200 text-white rounded-lg hover:bg-gradient-to-br hover:from-indigo-200 hover:to-[#007FFF] transform transition-all duration-300 hover:scale-110'>
                        Download File
                      </a>
                    </div>
              </>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Receive