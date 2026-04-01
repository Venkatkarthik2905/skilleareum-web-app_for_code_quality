import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Header from './Layout/Header';

export default function ReferralSubcription() {

    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableEntries] = useState([]);
    const [transactions, setTransactions] = useState([
        {
            title: "React Premium Course",
            amount: "$49.00",
            rating: 4,
        },
        {
            title: "Node.js Advanced Module",
            amount: "$79.00",
            rating: 3,
        },
        {
            title: "Three.js 3D Workshop",
            amount: "$99.00",
            rating: 5,
        },
        {
            title: "UI/UX Design Basics",
            amount: "$39.00",
            rating: 1,
        },
        {
            title: "Full Stack Bootcamp",
            amount: "$149.00",
            rating: 2,
        },
    ]);



    const filteredEntries = transactions.filter((entry) => {
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

    return (
        <div className='bg-black min-h-screen'>
            <Header/>
            <div className='w-[90%] md:w-[95%] mx-auto py-7 text-white'>
                <div className='flex flex-col-reverse md:flex-row gap-5 lg:gap-0 items-center justify-between'>
                    <div>
                        <h1 className='text-2xl font-medium'>Referral Information</h1>
                        <p className='mt-2 text-white/70'>your Referral details</p>
                    </div>
                    <div className='w-full md:w-auto flex justify-end'>
                        <button className='cursor-pointer'><i class="fa-regular fa-bell mr-1"></i> Notifications</button>
                    </div>
                </div>
                <div className='mt-7 w-full bg-gradient-to-r from-[#0285FF] via-[#73BBFF] to-[#0285FF] p-5 lg:p-7 rounded-md flex flex-col lg:flex-row items-center justify-between gap-7'>
                    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-7'>
                        <div>
                            <div className='w-32 h-32 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-1'>
                                <img src='../assets/merchant/profile.svg' className='bg-[#0285FF] rounded-full w-full h-full object-cover'></img>
                            </div>
                        </div>
                        <div>
                            <p className='text-xl font-medium'>7 Days AI Learning Challenge</p>
                        </div>
                    </div>
                    <p><span className='font-semibold'>Current Subscription: </span>
                        <button className='ml-3 bg-black px-3 py-1 rounded-md shadow-md cursor-pointer'><span className='mr-2 text-white font-medium'>Premium Learning Package</span></button>
                    </p>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-medium'>Subscription Plans </h1>
                    <p className='mt-2 text-white/70'>your program subscription plans and its details</p>
                    <div className="pb-5 overflow-hidden">
                        <div className='overflow-x-auto rounded-md'>
                            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center px-3 pt-5">
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
                                                <td>
                                                    <span className="flex items-center justify-center w-[120px] lg:w-auto">
                                                        {[...Array(tx.rating)].map((_, i) => (
                                                            <img
                                                                key={i}
                                                                src="/assets/star-review.svg"
                                                                alt="star"
                                                                className="w-6 h-6"
                                                            />
                                                        ))}
                                                    </span>
                                                </td>
                                                <td className="px-5 lg:px-3 text-nowrap">
                                                    <span className='bg-white/20 rounded-full border px-3 py-1'>
                                                        <i className='fa-solid fa-circle text-[5px] -translate-y-1 mr-2 text-[#00FF00]'></i>
                                                        <span className='text-white'>{tx.amount}</span>
                                                    </span>
                                                </td>
                                                <td className="px-5 lg:px-3">
                                                    <button className='underline text-white/70'>Click To View More In Detail <FontAwesomeIcon icon={faChevronDown} className='ml-1 text-xs'/></button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="py-5 text-center text-sm"
                                            >
                                                No results found
                                            </td>
                                        </tr>
                                    )}
                                    {Array(emptyRowCount)
                                        .fill()
                                        .map((_, index) => (
                                            <tr key={`empty-${index}`} className="h-16 text-xs md:text-sm rounded-xl">
                                                <td className="px-5 lg:px-0 whitespace-nowrap">&nbsp;</td>
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
                                disabled={currentEntities.length < entitiesPerPage}
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
