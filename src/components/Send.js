import React, { useState } from 'react'
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';

function Send() {

    const [fileName, setFileName] = useState(null);
    const [progressPrecent, setProgressPercent] = useState(0);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileUpload, setFileUpload] = useState(false);
    const [shareCode, setShareCode] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;
        const strogaeRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(strogaeRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setFileUrl(downloadURL);
                    console.log('File available at', downloadURL);
                    const shareId = await getRandShareId();
                    await setDoc(doc(
                        db, "shareRooms", shareId
                    ),
                        {
                            name: fileName,
                            file: downloadURL,
                            received: false,
                            createdAt: serverTimestamp()
                        },
                        { merge: true }
                    ).then(async () => {
                        console.log('File uploaded successfully');
                        setFileUpload(true);
                        setShareCode(shareId);
                    }).catch((error) => {
                        console.log(error);
                    }
                    )
                }
                )
            }
        )
    }
    const changeHandler = (e) => {
        if (e.target.files.length > 0) {
            let filename = e.target.files[0].name
            console.log(filename)
            setFileName(filename)
        }

    }

    const getRandShareId = async () => {
        const min = 10000;
        const max = 99999;
        const rand = min + Math.random() * (max - min);
        const collectionRef = collection(db, "shareRooms")
        const q = await getDocs(collectionRef);
        const ids = q.docs.map((doc) => doc.id);
        if (ids.includes(String(Math.round(rand)))) {
            getRandShareId();
        }
        return String(Math.round(rand));
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
                                !fileUpload ?
                                <>
                            
                            <div className="mt-10 mb-10 text-center">
                                <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                                <p className="text-xs text-gray-500">File should be of format .pdf, .docx, .xlsx or .txt</p>
                            </div>
                            <form onSubmit={handleSubmit} className="relative w-4/5 h-32 max-w-xs mb-10 bg-gray-100 rounded-lg shadow-inner">
                                <input type="file" id="file-upload" className='hidden' onChange={changeHandler} />
                                <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                                    {
                                        !fileName ?
                                            <>
                                                <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                                                <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                                                </svg>
                                            </>
                                            :
                                            <p>{fileName}</p>

                                    }
                                </label>
                                <div className='flex flex-col justify-center items-center mt-5 mb-5'>
                                    {
                                        !fileUrl ?

                                            <button type='submit' className='px-4 py-2 bg-gradient-to-br from-[#007FFF] to-indigo-200 text-white rounded-lg hover:bg-gradient-to-br hover:from-indigo-200 hover:to-[#007FFF] transform transition-all duration-300 hover:scale-110'>
                                                Upload
                                            </button>
                                            :
                                            <>
                                            {

                                            progressPrecent < 100 ?
                                                <button disabled className='px-4 py-2 bg-gradient-to-br from-[#007FFF] to-indigo-200 text-white rounded-lg hover:bg-gradient-to-br hover:from-indigo-200 hover:to-[#007FFF] transform transition-all duration-300 hover:scale-110'>
                                                    {progressPrecent}%
                                                </button>
                                                :
                                                <button disabled className='px-4 py-2 bg-gradient-to-br from-[#007FFF] to-indigo-200 text-white rounded-lg hover:bg-gradient-to-br hover:from-indigo-200 hover:to-[#007FFF] transform transition-all duration-300 hover:scale-110'>
                                                    Uploaded
                                                </button>
                                            }
                                            </>
                                    }


                                    <div className='flex justify-center items-center m-1'>
                                        <button className='font-light text-xs text-slate-500' >Cancel</button>
                                    </div>
                                </div>
                            </form>
                                </>
                                :
                                <>
                                        <div className="mt-10 mb-10 text-center">
                                            <h2 className="text-2xl font-semibold mb-2">Share the Filey Code</h2>
                                            <p className="text-xs text-gray-500">Share this code with the receiver to get the file</p>
                                        </div>
                                        <div className='relative w-4/5 h-32 bg-gray-100 rounded-lg shadow-inner max-w-xs mb-10 flex justify-center items-center'>
                                            <h1 className='text-4xl font-bold tracking-widest'>{shareCode}</h1>
                                        </div>
                                        <div className='flex justify-center items-center m-1'>
                                            <button className='font-light text-xs text-slate-500' >Cancel</button>
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

export default Send