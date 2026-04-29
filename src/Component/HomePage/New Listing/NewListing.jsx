import React, { useState, useEffect } from "react";
import "./NewListing.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ImagesGroup from "./ImagesGroup";
import { TailSpin } from 'react-loader-spinner'
import Socials from "../Socials";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSignin } from "../../../context/themeSlice";
import Watchlist from "../Watchlist";


export default function NewListing({ buttons, isDark }) {




  //*******************Get API data start*********************//
  const [data, setApiData] = useState([])
  useEffect(() => {
    axios.get(`https://rankterminal.com/growney/public/index.php/api/new-listing?nolimit=1`)
      .then((response) => {
        const reverse = response.data.data.collection.reverse();
        setApiData(reverse);
      })
  }, [])
  //*******************Get API data end*********************//


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


  //***********Dark mode light mode start***********//
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch()
  //***********Dark mode light mode start***********//


  //********** Watchlist work start **********//
  const authData = localStorage.getItem('authToken');
  const authToken = localStorage.getItem("authToken");


  //************ Star handler start ********//
  const [changeStarColor, setChangeStarColor] = useState(false)
  const starHandler = (id) => {
    if (!authData) {
      dispatch(toggleSignin(true))
    }
  }


  return (
    <div className={darkMode ? "mt-2 newListng relative dark" : "mt-2 newListng relative"}>
      <div className=' float-start mt-3 new-listing mb-6 relative'>
        <table className="table-auto w-full overflow-x-auto">
          <thead style={{ backgroundColor: '#facb92', zIndex: 2 }} className="sticky top-0">
            <tr className="size text-white">
              <th scope="col" className="sticky left-0" style={{ backgroundColor: '#facb92' }}></th>
              <th scope="col" className="sticky left-0 pl-6" style={{ backgroundColor: '#facb92', minWidth: '190px' }}>Name</th>
              <th scope="col" className="whitespace-nowrap cursor-auto pl-1" style={{ minWidth: 'auto' }}>Socials</th>
              <th scope="col" className="whitespace-nowrap cursor-auto pl-6" style={{ minWidth: 'auto' }}>Backed by / investors</th>
              <th scope="col" className="whitespace-nowrap cursor-auto pl-6" style={{ minWidth: 'auto' }}>Category</th>
              <th scope="col" className="whitespace-nowrap cursor-auto pl-6" style={{ minWidth: 'auto' }}>Network</th>
              <th scope="col" className="whitespace-nowrap cursor-auto pl-6" style={{ minWidth: 'auto' }}>Max Supply</th>
            </tr>
          </thead>
          {data.length !== 0 ?
            <tbody>
              {data?.map(item =>
                <tr className="item-name size border-b border-slate-400 dark:text-white" key={item?.id}>
                  <td className="name sticky left-0 items-center w-2 pl-2.5 dark:bg-gray-900">
                    <Watchlist tableId={item.id} tableName={"new_listing"} />
                    {/* <i className="fa-regular fa-star watchlist-star" onClick={() => starHandler(item?.id)} style={{ color: changeStarColor ? 'red' : '' }}></i> */}
                  </td>
                  <td className={darkMode ? "sticky left-0 bg-gray-900 px-6 whitespace-nowrap cursor-auto" : "sticky left-0 bg-white px-6 whitespace-nowrap cursor-auto"}

                    style={{ minWidth: '190px', zIndex: 1 }}>
                    <div className="flex gap-x-2.5 items-center">
                      <img src={item?.logo} className="h-10 w-10 rounded-full"></img>
                      <span>{item?.name.length > 10 && screenSize.width < 1000 ? item?.name.substring(0, 10) + "..." : item?.name}</span>
                    </div>
                  </td>
                  <td className='my-auto p-0 m-0'>
                    <Socials socials={item?.share} />
                  </td>
                  <td className="whitespace-nowrap cursor-auto px-6" style={{ minWidth: 'auto' }}><ImagesGroup images={item?.investors} /></td>
                  <td className="whitespace-nowrap cursor-auto px-6" style={{ minWidth: 'auto' }}>{item?.category}</td>
                  <td className="whitespace-nowrap cursor-auto px-6" style={{ minWidth: 'auto' }}>{item?.network}</td>
                  <td className="whitespace-nowrap cursor-auto px-6" style={{ minWidth: 'auto' }}>{item?.max_supply}</td>
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

  );
}
