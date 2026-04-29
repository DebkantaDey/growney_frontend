import React, { useState, useEffect } from 'react'
import axios from 'axios';
import WatchlistData from './WatchlistData';
import { TailSpin } from 'react-loader-spinner'
import Wishlist from '../../../public/Wishlist.jpg';
import W from '../../../public/W.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSignin, signin, signout } from '../../context/themeSlice';

export default function WatchlistPage() {


  const authData = useSelector((state) => state.theme.authData);
  const dispatch = useDispatch();
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistData = async (token) => {
    setLoading(true);
    try {
      const response = await fetch("https://rankterminal.com/growney/public/index.php/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setWishlistData([data.data.wishlist] || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authData) {
      fetchWishlistData(authData);
    } else {
      setWishlistData([]);
    }
  }, [authData]);



  //***********Dark mode light mode start***********//
  const darkMode = useSelector((state) => state.theme.darkMode);
  //***********Dark mode light mode ends***********//



  return (
    <div className={darkMode ? `relative min-h-screen dark bg-gray-900` : `relative min-h-screen`}>
      {!authData ? (
        <div className="w-full flex justify-center flex-col items-center pb-5">
          <img src={W} alt="" className="h-1/3 w-1/3 mt-3 rounded-md" />
          <p className="mt-2 dark:text-white text-black">Login to see the watchlist items</p>
          <button
            className="bg-orange-500 px-12 py-2 rounded text-white font-semibold mt-3"
            onClick={() => dispatch(toggleSignin(true))}
          >
            Signin
          </button>
        </div>
      ) : (
        <div className="w-full relative">
          {loading ? (
            <div className="w-full absolute top-32 flex justify-center items-center">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#facb92"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : wishlistData.length === 0 ? (
            <p className="text-center text-gray-500 mt-5">No items in your watchlist</p>
          ) : (
            wishlistData.map((item, index) => (
              <WatchlistData key={index} wishlistData={item} />
            ))
          )}
        </div>
      )}
    </div>
  )
}
