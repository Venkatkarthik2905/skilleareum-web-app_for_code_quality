import React, { useState, useEffect } from 'react'
import Header from './Layout/Header';
import axiosInstance from '../config/axiosInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function ReferralInformation() {

    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [referralData, setReferralData] = useState({
        referral_code: "N/A",
        total_referrals: 0,
        total_benefits: 0,
        sponsor_details: null,
        referral_history: []
    });

    const user = useSelector((state) => state.user_email);
    const userId = user?.id;

    useEffect(() => {
        const fetchReferralInfo = async () => {
            if (!userId) return;
            try {
                const response = await axiosInstance.get('/api/getReferralInformation');
                if (response.data.status === "success") {
                    setReferralData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching referral info:", error);
                toast.error("Failed to load referral information");
            } finally {
                setLoading(false);
            }
        };

        fetchReferralInfo();
    }, [userId]);


    const filteredEntries = referralData.referral_history.filter((entry) => {
        const search = searchTerm.toLowerCase();
        return Object.values(entry).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });


    const indexOfLastEntity = currentPage * entitiesPerPage;
    const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
    const currentEntities = filteredEntries?.slice(indexOfFirstEntity, indexOfLastEntity);

    const emptyRowCount = entitiesPerPage - currentEntities.length;


    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleDropdownChange = (e) => {
        setEntitiesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Referral code copied!");
    };

    if (loading) {
        return (
            <div className='bg-black min-h-screen flex items-center justify-center'>
                <div className="w-10 h-10 border-4 border-[#0285FF] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { referral_code, total_referrals, total_benefits, sponsor_details } = referralData;

    return (
        <div className='bg-black min-h-screen'>
            <Header />
            <div className='w-[90%] md:w-[95%] mx-auto py-7 text-white'>
                <div className='flex flex-col-reverse md:flex-row gap-5 lg:gap-0 items-center justify-between'>
                    <div>
                        <h1 className='text-2xl font-medium'>Referral Information</h1>
                        <p className='mt-2 text-white/70'>your Referral details</p>
                    </div>
                    <div className='w-full md:w-auto flex justify-end'>
                        <button className='cursor-pointer'><i className="fa-regular fa-bell mr-1"></i> Notifications</button>
                    </div>
                </div>
                <div className='mt-7 w-full bg-gradient-to-r from-[#0285FF] via-[#73BBFF] to-[#0285FF] p-5 lg:p-7 rounded-md flex flex-col lg:flex-row items-center justify-between gap-7'>
                    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-7'>
                        <div>
                            <div className='w-32 h-32 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-1'>
                                <img src='/assets/merchant/profile.svg' className='bg-[#0285FF] rounded-full w-full h-full object-cover' alt="profile"></img>
                            </div>
                        </div>
                        <div>
                            <p className='text-xl font-medium'>7 Days AI Learning Challenge</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => copyToClipboard(referral_code)}
                        className='bg-black px-3 py-1 rounded-md shadow-md cursor-pointer'
                    >
                        <span className='mr-2 text-white/70 font-medium'>Referral Code</span>
                        {referral_code} <i className="fa-solid fa-copy ml-2"></i>
                    </button>

                    <p className='flex font-semibold'><img src='/assets/refferal_users.svg' className='mr-2' alt="referrals"></img>Total Referrals: {total_referrals}</p>
                    <p className='font-semibold'><i className="fa-solid fa-arrow-trend-up mr-2 "></i>Benefits Earned: ${total_benefits}</p>

                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-medium'>Sponsor Details</h1>
                    <p className='mt-2 text-white/70'>your program sponsor details</p>
                    {sponsor_details ? (
                        <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between mt-5 bg-white/10 rounded-md py-3 px-5'>
                            <div className='flex flex-col md:flex-row items-center gap-3 md:gap-7'>
                                <div>
                                    <div className='w-20 h-20 rounded-full'>
                                        <img 
                                            src={sponsor_details.avatar || 'https://static.vecteezy.com/system/resources/previews/019/900/322/large_2x/happy-young-cute-illustration-face-profile-png.png'} 
                                            className='bg-[#0285FF] rounded-full w-full h-full object-cover' 
                                            alt="sponsor"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-3 md:gap-5'>
                                    <p className='text-xl font-medium'>{sponsor_details.name}</p>
                                    <span className='bg-white/30 rounded-full border px-3 py-1'>
                                        <i className='fa-solid fa-circle text-[5px] -translate-y-1 mr-2 text-[#00FF00]'></i>
                                        <span className='text-white'>ID: {sponsor_details.referral_code}</span>
                                    </span>
                                </div>
                            </div>
                            <p><i className="fa-solid fa-calendar-days mr-2"></i> Joined {new Date(sponsor_details.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    ) : (
                        <div className='mt-5 bg-white/5 rounded-md py-5 px-5 text-center text-white/50'>
                            No sponsor details available.
                        </div>
                    )}
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-medium'>Benefits To Sponsor <i className="fa-solid fa-gift ml-1 text-base"></i></h1>
                    <p className='mt-2 text-white/70'>Transparency of referral benefits provided</p>
                    <div className="pb-5 overflow-hidden">
                        <div className='overflow-x-auto rounded-md'>
                            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center px-3 pt-3">
                                <div className='bg-[#D9D9D9]/10 border rounded-full flex items-center '>
                                    <input
                                        className="bg-transparent rounded-md py-1 px-3 outline-none w-[100%]"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <i className='px-3 fa-solid fa-magnifying-glass'></i>
                                </div>
                                <p className="text-end text-xs px-3">
                                    Show no of entity
                                    <select
                                        className="ml-2 outline-none rounded-md bg-transparent border-[1px]"
                                        onChange={handleDropdownChange}
                                        value={entitiesPerPage}
                                    >
                                        <option className="text-black" value="5">
                                            5
                                        </option>
                                        <option className="text-black" value="10">
                                            10
                                        </option>
                                        <option className="text-black" value="20">
                                            20
                                        </option>
                                    </select>
                                </p>
                            </div>
                            <table className="w-full text-center text-sm 2xl:text-base bg-white/10 rounded-md mt-5">
                                <tbody className='divide-y-8 divide-black'>
                                    {currentEntities.length > 0 ? (
                                        currentEntities.map((tx, index) => (
                                            <tr
                                                key={index}
                                                className="h-16 text-xs md:text-sm"
                                            >
                                                <td className="px-5 lg:px-3 text-wrap md:text-base">
                                                    {tx.title}
                                                </td>
                                                <td className="px-5 lg:px-3 text-nowrap">
                                                    <span className='bg-white/20 rounded-full border px-3 py-1'>
                                                        <i className='fa-solid fa-circle text-[5px] -translate-y-1 mr-2 text-[#00FF00]'></i>
                                                        <span className='text-white'>${tx.amount}</span>
                                                    </span>
                                                </td>
                                                <td className="px-5 lg:px-3 text-wrap">
                                                    {tx.message}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="py-5 text-center text-sm"
                                            >
                                                No results found
                                            </td>
                                        </tr>
                                    )}
                                    {Array(Math.max(0, emptyRowCount))
                                        .fill()
                                        .map((_, index) => (
                                            <tr key={`empty-${index}`} className="h-16 text-xs md:text-sm rounded-xl">
                                                <td className="px-5 lg:px-0 whitespace-nowrap">&nbsp;</td>
                                                <td className="px-5 lg:px-0 whitespace-nowrap">&nbsp;</td>
                                                <td className="px-5 lg:px-0 whitespace-nowrap">&nbsp;</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mb-3 flex justify-end text-xs px-10">
                        <div className="flex gap-3">
                            <button className="px-3 py-1 rounded-lg bg-[#d2d2d2]/20"
                                onClick={handlePrevClick}
                                disabled={currentPage === 1}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className="px-3 py-1 rounded-lg bg-[#d2d2d2]/20"
                                onClick={handleNextClick}
                                disabled={filteredEntries.length <= indexOfLastEntity}
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
