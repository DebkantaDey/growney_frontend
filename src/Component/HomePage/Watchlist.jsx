import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toggleSignin } from '../../context/themeSlice';
import { toast } from 'react-toastify';

export default function Watchlist({ tableId, tableName }) {


  //**********Get wishlist data start************//
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {

  }, [localStorage.getItem("authToken") > 0 || localStorage.getItem("authToken") != null])


  const [wishlistData, setWishlistData] = useState([])
  useEffect(() => {
    async function apiData() {
      if (!authToken) {
        return;
      }
      try {
        const response = await axios.get("https://rankterminal.com/growney/public/index.php/api/wishlist", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setWishlistData([response.data.data.wishlist])
      } catch (error) {
        if (error.response) {
          console.error("Response Error:", {
            status: error.response.status,
            data: error.response.data,
          });
        } else {

        }
      }
    }
    apiData()
  }, [])
  //**********Get wishlist data end************//


  //**********Add wishlist start************//
  const addWatchlist = async () => {
    try {
      const response = await axios.post("https://rankterminal.com/growney/public/index.php/api/wishlist",
        { "item_id": tableId, "table_name": tableName },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.error('Item added to watchlist')
      }
      else {
        toast.error('Item is already added')
      }
    } catch (error) {
      toast.error('Item is already added')
    }
  }
  //**********Add wishlist end************//


  //**********Check wishlist source start***********//
  const checkTableDetails = (id, name) => {
    switch (name) {
      case 'new_listing':
        addWatchlist(id, name)
        break;
      case 'ido_ieo':
        addWatchlist(id, name)
        break;
      case 'unusual_activity':
        addWatchlist(id, name)
        break;
      case 'eco_system':
        addWatchlist(id, name)
        break;
      case 'killer_project':
        addWatchlist(id, name)
        break;
      case 'new_project':
        addWatchlist(id, name)
        break;
      case 'funding_round':
        addWatchlist(id, name)
        break;
    }
  }
  //**********Check wishlist source end***********//

  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState()
  useEffect(() => {
    if (localStorage.getItem("authToken") > 0 || localStorage.getItem("authToken") != null) {
      setIsAuth(true)
    }
    else {
      setIsAuth(false)
    }
  }, [localStorage.getItem("authToken") > 0 || localStorage.getItem("authToken") != null])
  function functionHandler() {
    if (!isAuth) {
      dispatch(toggleSignin(true))
    }
    else {
      addWatchlist()
    }
  }

  return (
    <>
      <i className="fa-regular fa-star watchlist-star cursor-pointer" onClick={functionHandler}></i>

    </>
  )
}
