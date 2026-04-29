import React, { useState, useEffect } from 'react'
//import FundingRound from './../../../details/FundingRound';
import axios from "axios";
import './FundingRound.css';
import { TailSpin } from 'react-loader-spinner'
import Socials from '../Socials';
import { useSelector } from 'react-redux';
import Watchlist from '../Watchlist';

export default function Fundinground() {

  //Get API data
  const [data, setApiData] = useState([])
  useEffect(() => {
    axios.get(`https://rankterminal.com/growney/public/index.php/api/funding-round?nolimit=1`)
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
    <div className={darkMode ? 'w-full relative md:min-h-screen dark pb-14' : 'w-full relative md:min-h-screen pb-14'}>
      <div className="fundingRound mt-4">
        <table className="table-auto w-full overflow-x-auto relative">
          <thead style={{ backgroundColor: '#facb92' }} className='relative'>
            <tr className="size">
              <th scope="col" style={{ backgroundColor: '#facb92' }} className='sticky left-0'></th>
              <th scope="col" className="sticky left-0 bg-orange-400 pl-6 md:w-60 whitespace-nowrap" style={{ backgroundColor: '#facb92', minWidth: '190px' }}>Project</th>
              <th>Socials</th>
              <th scope="col" className='whitespace-nowrap pl-6' style={{ minWidth: 'auto' }}>Partners</th>
              <th scope="col" className='whitespace-nowrap pl-6' style={{ minWidth: 'auto' }}>Investors/VCs</th>
              <th scope="col" className='whitespace-nowrap pl-6' style={{ minWidth: 'auto' }}>Category</th>
            </tr>
          </thead>
          {data.length !== 0 ?
            <tbody>

              {data?.map(item =>
                <tr className="item-name size border-b border-slate-400 dark:text-white" key={item?.id}>
                  <td className="name sticky left-0 items-center w-2 pl-2.5 dark:bg-gray-900">
                    <Watchlist tableId={item.id} tableName={"funding_round"} />
                    {/* <i className="fa-regular fa-star watchlist-star cursor-pointer"></i> */}
                  </td>
                  <td className={darkMode ? "sticky left-0 px-6 whitespace-nowrap cursor-auto dark:bg-gray-900" : "sticky left-0 px-6 bg-white whitespace-nowrap cursor-auto"} style={{ minWidth: '190px' }}>
                    <div className="flex gap-x-2.5 items-center">
                      <img src={item?.logo} className="h-10 w-10 rounded-full"></img>
                      <span>{item?.project.length > 10 && screenSize.width < 1000 ? item?.project.substring(0, 10) + "..." : item?.project}</span>
                    </div>
                  </td>
                  <td className='my-auto m-0' style={{ minWidth: 'auto' }}>
                    <Socials socials={item?.share} />
                  </td>
                  <td className='px-6 whitespace-nowrap' style={{ minWidth: 'auto' }}>{item?.partners}</td>
                  <td className='px-6 whitespace-nowrap' style={{ minWidth: 'auto' }}>{item?.investors}</td>
                  <td className='px-6 whitespace-nowrap' style={{ minWidth: 'auto' }}>{item?.category}</td>
                </tr>
              )}
            </tbody>
            :
            ""
          }
        </table>
      </div >
      {
        data.length === 0 ?
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
