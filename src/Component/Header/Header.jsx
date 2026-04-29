import React, { useState, useEffect, useRef } from 'react'
import './Header.css';
import Growney from './Growney-logo.png';
import { useNavigate, Link } from 'react-router-dom';
import Signin from '../signin/Signin';
import Registration from '../registration/Registration';
import Forgot from '../forgotPassword/Forgot';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, toggleSignin, toggleSignup } from '../../context/themeSlice';
import ProfileValidation from './ProfileValidation';


export default function Header(props) {

  //For navigation
  //const navigate = useNavigate()
  //const isLogin = window.localStorage.getItem("isLogin");
  const userName = window.localStorage.getItem("userName");


  //**************Dark mode light mode toggle start**************//
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const signinData = useSelector((state) => state.theme.isLogin);
  const signupData = useSelector((state) => state.theme.isSignup);
  //**************Dark mode light mode toggle end**************//

  // const [isSignin, setSignin] = useState(false)
  // const signinHandler = (event) => {
  //   event.preventDefault()
  //   setSignin(!isSignin);
  //   setSignup(false)
  // }

  // const [isSignup, setSignup] = useState(false)
  // const signupHandler = (event) => {
  //   event.preventDefault()
  //   setSignup(!isSignup);
  //   setSignin(false)
  // }

  const [isForgot, setForgot] = useState(false);
  const forgotForm = (e) => {
    e.preventDefault();
    setForgot(true);
    // setSignin(false)
    dispatch(toggleSignin(false))
  }
  // window.onClick = function (event) {
  //   if (event.target == isSignin) {
  //     setSignin(false)
  //   }
  // }

  const [isSidebar, setSidebar] = useState(false)
  const sidebarHandler = () => {
    setSidebar(!isSidebar)
  }


  //**************Logout start**************//
  const handleLogout = () => {
    // window.localStorage.removeItem('isLogin');
    // window.localStorage.setItem("isLogin", false)
    // window.localStorage.removeItem('userName');
    // window.location.href = `/`;
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer {{auth}}");

    // const raw = "";

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow"
    // };

    // fetch("https://rankterminal.com/growney/public/index.php/api/logout", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));

    localStorage.removeItem('authToken');


  };
  //**************Logout end****************//



  const [searchBar, setSearchBar] = useState(false)
  const searchbarRef = useRef(null);
  //***********Close searchBar on clicking outside of it.************//
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
        setSearchBar(false)
      }
    };

    if (searchBar) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchBar]);
  //***********Close searchBar on clicking outside of it.************//



  return (
    <>
      <header className=' header-container flex justify-between items-center py-4'>
        <nav className='navbar flex justify-between items-center w-full'>
          <div className="container-fluid navs h-100 align-items-center">
            <div className='flex justify-between items-center'>
              <i className="fa-solid fa-bars bars pt-3 pr-3 pb-3 sm:p-3 bars text-white cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop" onClick={sidebarHandler}></i>
              <Link to={'/'}><h2 className='text-white font-medium font-sans leading-7 main-heading'>Growney</h2></Link>
            </div>
            <div className='flex justify-between items-center'>
              <div className="justify-between items-center hidden lg:flex">
                <ul className='flex justify-between items-center refer-earn text-white gap-3 lg:gap-4'>
                  <Link to={'/refer&earn'}><li className='list-item cursor-pointer text-white'>Refer & Earn</li></Link>
                  <li className='list-item cursor-pointer'>Trending</li>
                  <Link to={'/watchlist'}><li className='text-white list-item cursor-pointer'>
                    <i className="fa-regular fa-star me-2"></i>Watchlist
                  </li></Link>
                </ul>
                <div className='d-flex'>
                  <i className="bi bi-search" id='search-icon'></i>
                  <input type="text" className="search-input form-control shadow bg-body rounded ps-5 me-3 mt-1" id="formGroupExampleInput" placeholder="Search for coins, Contracts, IDO..." />
                </div>
              </div>
              <i className="bi bi-search lg:hidden text-white mr-3 cursor-pointer" onClick={() => setSearchBar(!searchBar)}></i>
              {
                searchBar &&
                <div className='search-container lg:hidden' ref={searchbarRef}>
                  <i className="fa-solid fa-xmark dark:text-white" onClick={() => setSearchBar(false)}></i>
                  <input type="text" className="rounded p-2" placeholder="Search for coins, Contracts, IDO..." />
                </div>
              }
              {/* <ProfileValidation signinHandler={signinHandler} /> */}
              <ProfileValidation />
              <i className={darkMode ? 'fas fa-moon ms-2 lightdark text-dark cursor-pointer sm:pr-3' : 'fa-solid fa-sun ms-2 lightdark text-white cursor-pointer sm:pr-3'} onClick={() => dispatch(toggleDarkMode())}></i>
            </div>
          </div>
        </nav >
      </header>
      <div className={darkMode ? 'xs:w-11/12 sm:w-3/6 md:w-2/5 lg:w-2/6 xl:w-1/5 dark' : 'xs:w-11/12 sm:w-3/6 md:w-2/5 lg:w-2/6 xl:w-1/5'}>
        <div className="offcanvas offcanvas-start dark:bg-gray-900" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
          <div className="w-full flex justify-between items-center py-3">
            <Link to={'/'} className='w-10/12' data-bs-dismiss="offcanvas" aria-label="Close">
              <div className='flex justify-start items-center'>
                <img src={Growney} alt="logo" className='growney-logo' />
                <h2 className="sidebar-title font-sans">Rank Terminal</h2>
              </div>
            </Link>
            <button type="button" className="btn-close text-reset offcanvas-stop text-lg font-semibold w-1/6 dark:bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className='sidebar-ul ml-2'>
              <Link to={'/'} data-bs-dismiss="offcanvas" aria-label="Close"><li className='text-xl pl-2 pr-2 md:py-4 py-3 dark:text-white'><i className="fa-solid fa-house me-2"></i>Home</li></Link>
              <li className='text-xl pl-2 pr-2 md:py-4 py-3 dark:text-white'><i className="fa-solid fa-user me-2"></i>Profile</li>
              <Link to={'/watchlist'}><li className='text-xl pl-2 pr-2 md:py-4 py-3 dark:text-white'><i className="fa-regular fa-star me-2"></i>Watchlist</li></Link>
              <Link to={'/refer&earn'} data-bs-dismiss="offcanvas" aria-label="Close"><li className='text-xl pl-2 pr-2 md:py-4 py-3 dark:text-white'><i className="fa-solid fa-gift me-2"></i>Refer & Earn</li></Link>
              <li className='text-xl pl-2 pr-2 md:p y-4 py-3 dark:text-white'><i className="fa-solid fa-wallet me-2"></i>Wallet</li>
              <Link to={'/withdrawal'} data-bs-dismiss="offcanvas" aria-label="Close"><li className='text-xl pl-2 pr-2 md:py-4 py-3 dark:text-white'><i className="fa-solid fa-dollar-sign me-2"></i>Withdrawal</li></Link>
            </ul>
          </div>
        </div>
      </div>
      {
        signinData ?
          <Signin forgotForm={forgotForm}></Signin>
          :
          signupData ?
            <Registration ></Registration>
            :
            ""
      }
      {
        isForgot ?
          <Forgot setForgot={setForgot} />
          :
          ""
      }
    </>
  )
}
