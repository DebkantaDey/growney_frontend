import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'
import Socials from '../Socials';

export default function Hotnews() {


    //Get API data
    const [data, setApiData] = useState([])
    useEffect(() => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/hot-news?nolimit=1`)
            .then((response) => {
                const reverse = response.data.data.collection.reverse();
                setApiData(reverse);
            })
    }, [])
    return (
        <div className='md:min-h-screen pb-14'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative">
                {data.length !== 0 ?
                    <>
                        {data?.map(item =>
                            <figure className="bg-slate-100 rounded-xl md:p-0 p-3 shadow-xl" key={item?.id}>
                                <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                                <div className="p-3 text-center md:text-left space-y-4">
                                    <figcaption className="font-medium">
                                        <div className="text-sky-500 dark:text-sky-400">
                                            {item?.heading}
                                        </div>
                                        <div className="text-slate-700 dark:text-slate-500">
                                            {item?.sub_heading}
                                        </div>
                                    </figcaption>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Socials socials={item?.share}/>
                                </div>
                            </figure>
                        )}
                    </>
                    :
                    <div className='w-full absolute top-18 flex justify-center items-center'>
                        <TailSpin
                            visible={true}
                            height="50"
                            width="50"
                            color="#facb92"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                }
            </div>
        </div>
    )
}
