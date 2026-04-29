import React, { useState, useEffect, useRef } from 'react'
import './Home.css';
import NewListing from './New Listing/NewListing';
import KillerProject from './KillerProject/KillerProject';
import Notchproject from './NewProject/NewProject';
import Fundinground from './FundingRound/Fundinground';
import Idoieo from './Idoieo/Idoieo';
import Hotnews from './Hotnews/Hotnews';
import Airdrop from './Airdrop/Airdrop';
import Ecosystem from './Knotchproject/Ecosystem';
import Recent from './RecentActivities/Recent';
import Growney from '../Header/Growney-logo.png';
import Footer from '../Footer';
import { useSelector } from 'react-redux';


export default function Home({ buttons, isDark }) {

    const [number, setNumber] = useState(0);
    const buttonChange = (id) => {
        setNumber(id);
    };

    const buttonsPerPage = buttons.length; // Change this number to adjust the number of buttons per page
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(buttons.length / buttonsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const startIndex = currentPage * buttonsPerPage;
    const visibleButtons = buttons.slice(startIndex, startIndex + buttonsPerPage);


    const [scrollPosition, setScrollPosition] = useState(0);

    const handleNext = () => {
        setScrollPosition(scrollPosition + 100);
    };

    const handlePrev = () => {
        setScrollPosition(scrollPosition - 100);
    };


    //***********Dark mode light mode start***********//
    const darkMode = useSelector((state) => state.theme.darkMode);
    //***********Dark mode light mode ends***********//


    //******* Window width code start *********//
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth < 970);
            setIsAtEnd(false)
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const container = buttonContainerRef.current;
        container.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    //******** Window width code end *******//

    const buttonContainerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    let touchStartX = 0;
    let touchEndX = 0;

    const scrollLeft = () => {
        buttonContainerRef.current.scrollBy({
            left: -150,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        buttonContainerRef.current.scrollBy({
            left: 150,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = buttonContainerRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    };

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const distance = touchEndX - touchStartX;
        if (distance > 50) {
            scrollLeft();
        } else if (distance < -50) {
            scrollRight();
        }
    };

    useEffect(() => {
        const container = buttonContainerRef.current;
        container.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className='w-full h-full dark:bg-gray-900'>
                <div className='container-fluid pt-4 main-container'>
                    <h1 className="website_heading text-black dark:text-white text-3xl sm:text-4xl" style={{fontFamily: '"Noto Serif", serif'}}>Always grow your money</h1>
                    <div className="d-flex mt-3 buttons-area items-center">
                        {/* <button
                            onClick={scrollLeft}
                            className={`scroll-btn`}
                            disabled={isAtStart}
                            style={{ display: isAtStart ? 'none' : '' }}
                        > */}
                            <i
                                onClick={scrollLeft}
                                className={`fa-solid fa-chevron-left p-3 scroll-btn mr-4`}
                                disabled={isAtStart}
                                style={{ display: isAtStart ? 'none' : '', color: '#e58a0b' }}></i>
                        {/* </button> */}
                        <div className="button-group overflow-x-scroll xl:overflow-hidden no-scrollbar"
                            style={{ transform: `translateX(-${scrollPosition}px)` }}
                            ref={buttonContainerRef}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {visibleButtons.map((button, index) =>
                                <button key={index} className={index === number ? "active text-nowrap" : "inactive text-nowrap"} onClick={() => buttonChange(index)}>
                                    {button}
                                </button>
                            )}
                        </div>
                        <i 
                        onClick={scrollRight}
                            className={`fa-solid fa-chevron-right p-3 scroll-btn ml-5`}
                            disabled={isAtEnd}
                            style={{ display: isAtEnd ? 'none' : '', color: '#e58a0b' }}></i>
                    </div>

                    {
                        number === 0 ? (
                            <>
                                <NewListing></NewListing>
                                <Recent />
                                <KillerProject />
                            </>
                        )
                            :
                            (
                                ""
                            )
                    }
                    {number === 1 ?
                        <Idoieo></Idoieo>
                        :
                        ""
                    }
                    {
                        number === 2 ?
                            <Hotnews></Hotnews>
                            :
                            ""
                    }
                    {
                        number === 3 ?
                            <Notchproject></Notchproject>
                            :
                            ""
                    }
                    {
                        number === 4 ?
                            <Airdrop></Airdrop>
                            :
                            ""
                    }
                    {
                        number === 5 ?
                            <Ecosystem></Ecosystem>
                            :
                            ""
                    }
                    {
                        number === 6 ?
                            <Fundinground></Fundinground>
                            :
                            ""
                    }
                    {/* container-fluid sm:flex justify-between sm:items-center w-11/12 */}
                </div>
            </div>
            <style jsx>{`
        
      `}</style>
        </div>
    )
}
