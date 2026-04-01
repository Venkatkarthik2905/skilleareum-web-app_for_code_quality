import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Header from './Layout/Header';

export default function ProfileInfo({onClose}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableEntries] = useState([]);
    const [transactions, setTransactions] = useState([
        {
            date: "2025-10-28 10:30 AM",
            package: "Starter Plan",
            amount: "$49",
            status: "Successfull",
            transactions_hash: "0xA1B2C3D4E5F6G7H8"
        },
        {
            date: "2025-10-26 04:15 PM",
            package: "Pro Plan",
            amount: "$99",
            status: "Pending",
            transactions_hash: "0xB7C8D9E1F2G3H4I5"
        },
        {
            date: "2025-10-20 09:50 AM",
            package: "Enterprise Plan",
            amount: "$199",
            status: "Failed",
            transactions_hash: "0xC3D4E5F6G7H8I9J1"
        },
        {
            date: "2025-10-18 07:25 PM",
            package: "Starter Plan",
            amount: "$49",
            status: "Successfull",
            transactions_hash: "0xD5E6F7G8H9I0J2K3"
        },
        {
            date: "2025-10-15 11:40 AM",
            package: "Pro Plan",
            amount: "$99",
            status: "Successfull",
            transactions_hash: "0xE8F9G0H1I2J3K4L5"
        }
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

    const rating = 3;
    return (
        <div className='bg-black min-h-screen'>
            <div className='w-[90%] md:w-[95%] mx-auto py-7 text-white'>
                <div className='flex flex-col-reverse md:flex-row gap-5 lg:gap-0 items-center justify-between'>
                    <div>
                        <div className='flex items-center gap-3'>
                        <button onClick={() => onClose()} className='cursor-pointer'><i class="fa-solid fa-arrow-left-long"></i></button>
                        <h1 className='text-2xl font-medium'>Profile Information</h1>
                        </div>
                        <p className='mt-2 text-white/70'>your personal details and account information.</p>
                    </div>
                    <div className='flex items-center gap-5'>
                    
                    <div className='w-full md:w-auto flex justify-end'>
                        <button className='cursor-pointer'><i class="fa-regular fa-bell mr-1"></i> Notifications</button>
                    </div>
                    </div>
                </div>
                <div className='mt-7 w-full bg-gradient-to-r from-[#0285FF] via-[#73BBFF] to-[#0285FF] p-5 lg:p-7 rounded-md flex flex-col md:flex-row items-center gap-7'>
                    <div>
                        <div className='w-32 h-32 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-1'>
                            <img src='../assets/merchant/profile.svg' className='bg-[#0285FF] rounded-full w-full h-full object-cover'></img>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-col md:flex-row items-center gap-3 md:gap-5'>
                            <p className='text-xl font-medium'>Manjunath Vijay Kumar</p>
                            <button className='bg-black px-3 py-1 rounded-md shadow-md cursor-pointer'>Edit Profile <i class="fa-solid fa-user-pen ml-1"></i></button>
                        </div>
                        <div className='mt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-1 lg:gap-0'>
                            <p><span className='text-white/70 font-medium'>Email Id :</span> <span>Manjunathvijaykumar@gmail.com</span></p>
                            <p><span className='text-white/70 font-medium'>SKLRM Id :</span> <span>SKLRM#20250219</span></p>
                            <p><span className='text-white/70 font-medium'>Referral Code :</span> <span>SKLRM#0219 <i className='fa-solid fa-copy ml-1'></i></span></p>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-medium'>Subscription Details</h1>
                    <p className='mt-2 text-white/70'>your current subscription plan and details</p>
                    <div className='mt-5 bg-white/10 rounded-md p-7 flex flex-col md:flex-row flex-nowrap md:flex-wrap justify-between items-center gap-2 lg:gap-0'>
                        <p className='flex flex-col md:flex-row items-center gap-2 md:gap-0'><span className='text-white/70 font-medium'>Subscribed Package</span><span className='ml-2 text-lg font-medium flex flex-col md:flex-row items-center'> Premium Learning Plan
                            <span className='ml-2 flex items-center'> {[...Array(rating)].map((_, index) => (
                                <img key={index} src='/assets/star-review.svg' ></img>
                            ))}</span></span></p>
                        <p><span className='text-white/70 font-medium'><i class="fa-solid fa-calendar-days mr-1"></i> Expires</span><span className='ml-2 font-medium'>December 15 2025</span></p>
                        <div className='border rounded-full bg-white/20 px-5 py-1 flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 bg-[#00ff00] rounded'></div> Active
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-medium'>Payment History</h1>
                    <div className="pb-5 overflow-hidden">
                        <div className='overflow-x-auto rounded-md mt-5 bg-white/10 rounded-md'>
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
                            <table className="w-full text-center text-sm 2xl:text-base">
                                <thead>
                                    <tr>
                                        <th className="py-5 px-5 md:px-2 ">
                                            DATE & TIME
                                        </th>
                                        <th className="py-5 px-5 md:px-2 ">
                                            PACKAGE
                                        </th>
                                        <th className="py-5 px-5 md:px-2 ">
                                            AMOUNT
                                        </th>
                                        <th className="py-5 px-5 md:px-2 ">
                                            STATUS
                                        </th>
                                        <th className="py-5 px-5 md:px-2 ">
                                            TRANSACTION HASH
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y'>
                                    {currentEntities.length > 0 ? (
                                        currentEntities.map((transactions, index) => (
                                            <tr
                                                key={index}
                                                className="h-16 text-xs md:text-sm"
                                            >
                                                <td className="px-5 lg:px-3 text-wrap">
                                                    {transactions.date}
                                                </td>
                                                <td className="px-5 lg:px-3 text-wrap">
                                                    {transactions.package}
                                                </td>
                                                <td className="px-5 lg:px-3 text-wrap">
                                                    {transactions.amount}
                                                </td>
                                                <td className={`px-5 lg:px-3 text-wrap ${transactions.status === 'Successfull' ? 'text-[#00FF00]' : transactions.status === 'Pending' ? 'text-[#FFBF00]' : 'text-[#FF0000]'}`}>
                                                    {transactions.status}
                                                </td>
                                                <td className="px-5 lg:px-3 text-nowrap">
                                                    {transactions.transactions_hash}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
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
