import React, { useState, useEffect } from 'react'
import axios from "axios";
import './Idoieo.css';
import { TailSpin } from 'react-loader-spinner'
import Socials from '../Socials';
import { useSelector } from 'react-redux';
import Watchlist from '../Watchlist';

export default function Idoieo() {


    //Get API data
    const [data, setApiData] = useState([])
    useEffect(() => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/ido-ieo?nolimit=1`)
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
    //****************Window size start*********************//



    //***********Dark mode light mode***********//
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div className={darkMode ? 'w-full relative md:min-h-screen dark pb-14' : 'w-full relative md:min-h-screen pb-14'}>
            <div className="idoIeo mt-4">
                <table className="table-auto w-full overflow-x-auto">
                    <thead style={{ backgroundColor: '#facb92', color: 'white' }} className='relative'>
                        <tr className="size">
                            <th scope="col" className="sticky left-0" style={{ backgroundColor: '#facb92' }}></th>
                            <th scope="col" style={{ backgroundColor: '#facb92', minWidth: '190px' }} className='sticky left-0 bg-orange-400 pl-6'>Project</th>
                            <th>Socials</th>
                            <th scope="col" style={{ minWidth: 'auto' }} className='pl-6'>Backedby</th>
                            <th scope="col" style={{ minWidth: 'auto' }} className='pl-6'>Partners</th>
                            <th scope="col" style={{ minWidth: '180px' }} className='pl-6'>Coin/Token Sale Partnars</th>
                            <th scope="col" style={{ minWidth: 'auto' }} className='pl-6'>Audits</th>
                        </tr>
                    </thead>
                    {data.length !== 0 ?
                        <tbody>
                            {data?.map(item =>
                                <tr className="item-name size border-b border-slate-400 dark:text-white" key={item?.id}>
                                    <td className="name sticky left-0 items-center w-2 pl-2.5 dark:bg-gray-900">
                                        <Watchlist tableId={item.id} tableName={"ido_ieo"} />
                                        {/* <i className="fa-regular fa-star watchlist-star"></i> */}
                                    </td>
                                    <td className={darkMode ? "sticky left-0 px-6 whitespace-nowrap cursor-auto bg-gray-900" : "sticky left-0 bg-white px-6 whitespace-nowrap cursor-auto"} style={{ minWidth: '190px' }}>
                                        <div className="flex gap-x-2.5 items-center">
                                            <img src={item?.logo} className="h-10 w-10 rounded-full"></img>
                                            <span>{item?.project.length > 10 && screenSize.width < 1000 ? item?.project.substring(0, 10) + "..." : item?.project}</span>
                                        </div>
                                    </td>
                                    <td className='my-auto p-0 m-0'>
                                        <Socials socials={item?.share} />
                                    </td>
                                    <td style={{ minWidth: 'auto' }} className='px-6'>{item?.backed_by}</td>
                                    <td style={{ minWidth: 'auto' }} className='px-6'>{item?.partners}</td>
                                    <td style={{ minWidth: '180px' }} className='px-6'>{item?.coin_token_sale_partner}</td>
                                    <td style={{ minWidth: 'auto' }} className='px-6'>{item?.audits}</td>
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
    )
}
