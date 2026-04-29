import React, { useState, useEffect } from 'react'
import axios from "axios";
import './Recent.css';
import { TailSpin } from 'react-loader-spinner'
import Socials from '../Socials';
import { useSelector } from 'react-redux';
import Watchlist from '../Watchlist';

export default function Recent() {

    //Get API data
    const [data, setApiData] = useState([])
    useEffect(() => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/unusual-activity?nolimit=1`)
            .then((response) => {
                const reverse = response.data.data.collection.reverse();
                setApiData(reverse);
            })
    }, [])

    //****************Window size start*********************//
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //****************Window size end*********************//


    //***********Dark mode light mode***********//
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div className={darkMode ? "w-full md:min-h-60 dark" : "w-full md:min-h-60"}>
            <h1 className="text-3xl sm:text-4xl mt-6 dark:text-white" style={{fontFamily: '"Noto Serif", serif'}}>Recent unusual activity</h1>
            <div className='w-full relative'>
                <div className="recent-activity mt-4">
                    <table className="table">
                        <thead style={{ backgroundColor: '#facb92', color: 'white' }}>
                            <tr className="size">
                                <th scope="col" style={{ backgroundColor: '#facb92' }} className='col sticky left-0'></th>
                                <th scope="col" style={{ backgroundColor: '#facb92', minWidth: '190px' }} className='sticky left-0 bg-orange-400 pl-6'>Projects</th>
                                <th>Socials</th>
                                <th scope="col" className='whitespace-nowrap pl-6' style={{ minWidth: '200px' }}>Activities</th>
                            </tr>
                        </thead>
                        {data.length !== 0 ?
                            <tbody>
                                {data?.map((item) =>
                                    <tr className="size dark:text-white" key={item?.id}>
                                        <td className="name sticky left-0 items-center w-2 pl-2.5 dark:bg-gray-900">
                                            {/* <i className="fa-regular fa-star"></i> */}
                                            <Watchlist tableId={item.id} tableName={"unusual_activity"} />
                                        </td>
                                        <td className={darkMode ? "sticky left-0 dark:bg-gray-900 px-6 whitespace-nowrap cursor-auto" : "sticky left-0 bg-white px-6 whitespace-nowrap cursor-auto"} style={{ minWidth: '190px' }}>
                                            <div className="flex gap-x-2.5 items-center">
                                                <img src={item?.logo} className="h-10 w-10 rounded-full"></img>
                                                <span>{item?.project.length > 10 && screenSize.width < 1000 ? item?.project.substring(0, 10) + "..." : item?.project}</span>
                                            </div>
                                        </td>
                                        <td className='my-auto m-0'>
                                            <Socials socials={item?.share} />
                                        </td>
                                        <td className="px-6 whitespace-nowrap" style={{ minWidth: '180px' }}>
                                            {item?.activities}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            :
                            ""
                        }
                    </table>

                </div>
                {data.length === 0 ?
                    <div className="w-full absolute top-24 flex justify-center items-center">
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
                    :
                    ""
                }
            </div>
        </div>
    )
}
