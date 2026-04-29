import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const tableNames = [
    'new_listing',
    'ido_ieo',
    'unusual_activity',
    'eco_system',
    'killer_project',
    'new_project',
    'funding_round'
]
export default function WatchlistData({ wishlistData }) {

    const [newlistingData, setNewlistingData] = useState()
    const [idoIeoData, setIdoIeoData] = useState()
    const [newProjectData, setNewProjectData] = useState()
    const [ecoSystemData, setEcoSystemData] = useState()
    const [fundingRoundData, setFundingRoundData] = useState()
    const [unusualActivityData, setUnusualActivityData] = useState()
    const [killerProjectData, setKillerProjectData] = useState()

    useEffect(() => {
        setNewlistingData(wishlistData.new_listing)
        setIdoIeoData(wishlistData.ido_ieo)
        setNewProjectData(wishlistData.new_project)
        setEcoSystemData(wishlistData.eco_system)
        setFundingRoundData(wishlistData.funding_round)
        setUnusualActivityData(wishlistData.unusual_activity)
        setKillerProjectData(wishlistData.killer_project)
    }, [wishlistData])


    //***********Dark mode light mode start***********//
    const darkMode = useSelector((state) => state.theme.darkMode);
    //***********Dark mode light mode ends***********//

    return (
        <div className={darkMode? `w-11/12 m-auto pt-10 pb-28 dark`:`w-11/12 m-auto pt-10 pb-28`}>
            <div style={{display: newlistingData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>New Listing</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {newlistingData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.name}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.category}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
            <div className='mt-5' style={{display: idoIeoData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>IDO IEO</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {idoIeoData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.project}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.backed_by}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
            <div className='mt-5' style={{display: newProjectData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>New Project</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {newProjectData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.project}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.category}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
            <div className='mt-5' style={{display: unusualActivityData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>Unusual Activity</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {unusualActivityData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.project}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.activities}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
            <div className='mt-5' style={{display: ecoSystemData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>Eco System</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {ecoSystemData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.project}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.name}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
            <div className='mt-5' style={{display: fundingRoundData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>Funding Round</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {fundingRoundData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.project}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.partners}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
            <div className='mt-5' style={{display: killerProjectData? 'block':'none'}}>
                <h2 className='text-center text-2xl text-black font-semibold dark:text-white'>Killer Project</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 relative'>
                    {killerProjectData?.map((item, index) =>
                        <figure className="rounded-xl md:p-0 p-3 shadow-xl bg-slate-100" key={index}>
                            <img className="w-16 h-16 rounded-full mx-auto" src={item?.logo} alt="" width="384" height="512" />
                            <div className="p-3 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-400">
                                        {item.project}
                                    </div>
                                    <div className="text-slate-700 dark:text-slate-500">
                                        {item.activities}
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
        </div>
    )
}
