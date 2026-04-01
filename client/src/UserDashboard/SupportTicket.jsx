import React, { useState } from 'react'
import Header from './Layout/Header';

export default function SupportTicket() {

    const [active, setActive] = useState('div1')

    const handleActiveTab = (tab) => {
        setActive(tab);
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDivClick = () => {
        document.getElementById('fileInput').click();
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableEntries] = useState([]);
    const [transactions, setTransactions] = useState([
        {
            ticket_id: "TCK-1001",
            subject: "Login issue",
            img: "https://via.placeholder.com/40",
            date: "2025-10-25",
            status: "Resolved",
        },
        {
            ticket_id: "TCK-1002",
            subject: "Payment failed",
            img: "https://via.placeholder.com/40",
            date: "2025-10-26",
            status: "In Progress",
        },
        {
            ticket_id: "TCK-1003",
            subject: "Image not loading",
            img: "https://via.placeholder.com/40",
            date: "2025-10-27",
            status: "Open",
        },
        {
            ticket_id: "TCK-1004",
            subject: "Bug in dashboard",
            img: "https://via.placeholder.com/40",
            date: "2025-10-28",
            status: "Resolved",
        },
        {
            ticket_id: "TCK-1005",
            subject: "Request for refund",
            img: "https://via.placeholder.com/40",
            date: "2025-10-29",
            status: "Open",
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
                        <h1 className='text-2xl font-medium'>Support Tickets Management</h1>
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
                        <div className='flex flex-col lg:flex-row items-center gap-3 lg:gap-10'>
                            <p className='text-xl font-medium'>Manjunath Vijay Kumar</p>
                            <button className='ml-3 bg-black px-7 py-2 rounded-md shadow-md cursor-pointer'>Contact Live Support</button>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='border-b border-white/70'>
                        <button onClick={() => handleActiveTab('div1')} className={`px-5 py-2 ${active === 'div1' ? 'text-white font-medium border-b border-white border-b-2' : 'text-white/70 '}`}>Raise Ticket</button>
                        <button onClick={() => handleActiveTab('div2')} className={`px-5 py-2 ${active === 'div2' ? 'text-white font-medium border-b border-white border-b-2' : 'text-white/70 '}`}>Ticket History</button>
                    </div>
                    {active === 'div1' &&
                        <div className='pt-5 grid grid-cols-1 md:grid-cols-3 gap-5'>
                            <div className='col-span-1 md:col-span-2 relative h-44'>
                                <textarea className='border border-white/50 py-4 pl-4 pr-10 rounded-xl h-full w-full bg-black outline-none' placeholder='Describe The Issue'></textarea>
                                <i class="fa-solid fa-pen absolute right-4 top-4 text-white/50"></i>
                            </div>
                            <div
                                onClick={handleDivClick}
                                className='border border-white/50 p-4 rounded-xl cursor-pointer grid place-content-center text-center text-white/50 transition'
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {!selectedFile ? (
                                    <div>
                                        <p><i className="fa-solid fa-cloud-arrow-up text-3xl pb-3"></i></p>
                                        <p>Upload image</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p><i className="fa-solid fa-image text-3xl pb-3 text-white"></i></p>
                                        <p className="text-white">{selectedFile.name}</p>
                                    </div>
                                )}
                            </div>
                            <div className='border border-white/50 rounded-xl flex items-center gap-3'>
                                <input type='email' className='w-full bg-black px-4 py-3 rounded-xl outline-none' placeholder='Email'></input>
                                <i class="fa-solid fa-envelope text-white/50 px-3"></i>
                            </div>
                            <div className='border border-white/50 rounded-xl flex items-center gap-3'>
                                <input className='w-full px-4 py-3 bg-black rounded-xl outline-none' placeholder='Subject'></input>
                                <i class="fa-solid fa-circle-exclamation text-white/50 px-3"></i>
                            </div>
                            <div className='grid place-content-center'>
                                <button className='px-10 py-3 rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>Rise New Ticket</button>
                            </div>
                        </div>
                    }
                    {active === 'div2' &&
                        <div>
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
                                        <thead className='uppercase'>
                                            <tr>
                                                <th className="py-5 px-5 md:px-2 ">
                                                    Ticket id
                                                </th>
                                                <th className="py-5 px-5 md:px-2 ">
                                                    subject
                                                </th>
                                                <th className="py-5 px-5 md:px-2 ">
                                                    Image
                                                </th>
                                                <th className="py-5 px-5 md:px-2 ">
                                                    Date of ticket raised
                                                </th>
                                                <th className="py-5 px-5 md:px-2 ">
                                                    ticket Status
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
                                                            {transactions.ticket_id}
                                                        </td>
                                                        <td className="px-5 lg:px-3 text-wrap">
                                                            {transactions.subject}
                                                        </td>
                                                        <td className="px-5 lg:px-3 text-wrap">
                                                            {transactions.img}
                                                        </td>
                                                        <td className="px-5 lg:px-3 text-nowrap">
                                                            {transactions.date}
                                                        </td>
                                                        <td className={`px-5 lg:px-3 ${transactions.status === 'Resolved' ? 'text-[#00FF00]' : transactions.status === 'In Progress' ? 'text-[#FFBF00]' : 'text-[#FF0000]'}`}>
                                                            {transactions.status}
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
                    }
                </div>
            </div>
        </div>
    )
}
