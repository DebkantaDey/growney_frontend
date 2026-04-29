import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from "react-router-dom";
import Home from './Component/HomePage/Home';
import { Toaster } from 'react-hot-toast'
import ScrollToTop from "./Component/scrollToTop/ScrollToTop";
import Reset from "./Component/resetPassword/Reset";
import Withdrawal from "./Component/withdrawal/Withdrawal";
import ReferEarn from "./Component/referEarn/ReferEarn";
import { useSelector } from 'react-redux';
import WatchlistPage from "./Component/watchlist/WatchlistPage";
import Footer from './Component/Footer'

function App() {


  const [isSidebar, setSidebar] = useState(false);
  const sidebarHandler = () => {
    setSidebar(!isSidebar);
  };

  const [isSignin, setSignin] = useState(false);
  const signinHandler = () => {
    setSignin(true)
  }

  const [isDark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!isDark)
  }

  const buttons = [
    'New Listing',
    'IDO/IEO',
    'Gamefi',
    'NewlyProjects',
    'Airdrop',
    'EcoSystem',
    'Funding Round'
  ]


  //******************Scroll to top***************//
  const [scrollvisible, setScrollVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setScrollVisible(true)
    }
    else if (scrolled <= 300) {
      setScrollVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);
  //*************Scroll to top end**************//


  //**************Dark mode and light mode*************//
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (

    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Router>
          <Header sidebarShow={isSidebar} sidebarHandle={sidebarHandler} signinHandler={signinHandler} isDark={isDark} darkHandler={darkModeHandler}></Header>
          <Routes>
            <Route path="/reset-password" element={<Reset></Reset>} />
            <Route path="/withdrawal" element={<Withdrawal></Withdrawal>} />
            <Route path="/refer&earn" element={<ReferEarn></ReferEarn>} />
            <Route path="/watchlist" element={<WatchlistPage></WatchlistPage>} />
            <Route exact path="/" element={<Home sidebarShow={isSidebar} showsignin={isSignin} buttons={buttons} isDark={isDark}></Home>} />
            {/* <Route path="/:name" element={<PrivateRoute><Home sidebarShow={isSidebar} showsignin={isSignin} buttons={buttons} isDark={isDark}></Home></PrivateRoute>} /> */}
          </Routes>
          <Footer></Footer>
      </Router>
      <ScrollToTop />
    </>

  );
}
export default App;
