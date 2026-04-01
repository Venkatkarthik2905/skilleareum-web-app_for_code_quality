import React, { useState } from 'react'
import Chart from "react-apexcharts";
import Header from './Layout/Header';

export default function CurrentProgram() {

    const chartOptions = {
        chart: {
            type: "radialBar",
            sparkline: { enabled: true },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: "60%" },
                dataLabels: {
                    show: false,
                },
            },
        },
        colors: ["#00FF00"],
    };

    const streakData = [
        { label: "Current Streak", icon: "/assets/currentyears.svg", value: 60, days: "3 Days" },
        { label: "Long Streak", icon: "/assets/longstreak.svg", value: 80, days: "6 Days" },
        { label: "Active Days", icon: "/assets/activedays.svg", value: 100, days: "138 Days" },
    ];


    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableEntries] = useState([]);
    const [transactions, setTransactions] = useState([
        {
            title: "React Fundamentals",
            number_of_attemps: 3,
            rating: 4,
            status: "Successfull",
        },
        {
            title: "Advanced JavaScript",
            number_of_attemps: 2,
            rating: 5,
            status: "Pending",
        },
        {
            title: "Node.js Mastery",
            number_of_attemps: 4,
            rating: 3,
            status: "Failed",
        },
        {
            title: "Three.js Basics",
            number_of_attemps: 1,
            rating: 2,
            status: "Successfull",
        },
        {
            title: "React + MySQL Project",
            number_of_attemps: 2,
            rating: 5,
            status: "Pending",
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
                        <h1 className='text-2xl font-medium'>Current Program</h1>
                        <p className='mt-2 text-white/70'>your current program details.</p>
                    </div>
                    <div className='w-full md:w-auto flex justify-end'>
                        <button className='cursor-pointer'><i class="fa-regular fa-bell mr-1"></i> Notifications</button>
                    </div>
                </div>
                <div className='mt-7 w-full bg-gradient-to-r from-[#0285FF] via-[#73BBFF] to-[#0285FF] p-5 lg:p-7 rounded-md flex flex-col lg:flex-row items-center justify-between gap-7'>
                    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-7'>
                    <div>
                        <div className='w-32 h-32 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-1'>
                            <img src='../assets/merchant/task.svg' className='bg-[#0285FF] rounded-full w-full h-full object-cover'></img>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl font-medium mb-4'>7 Days AI Learning Challenge</p>
                        <p><span className='text-white/70 font-medium'><i class="fa-solid fa-calendar-days mr-1"></i> Started :</span> <span>January 15 2025</span></p>
                    </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-7 w-full md:w-auto'>
                        <div className='bg-white rounded-md p-[1px] w-full md:w-96'>
                            <div className='rounded-md bg-gradient-to-r from-[#0285FF] to-[#1EEF32] w-[68%] h-2.5'></div>
                        </div>
                        <span className='text-lg font-medium'>68% Completed</span>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {streakData.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-white/10 rounded-md p-4"
                        >
                            <div className='h-[100px] grid content-center relative'>
                                <Chart
                                    options={chartOptions}
                                    series={[item.value]}
                                    type="radialBar"
                                    height={130}
                                    width={130}
                                />
                                <img src={item.icon} className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'></img>
                            </div>
                            <div className="text-center flex-1">
                                <p className="text-2xl font-semibold mb-1">{item.days}</p>
                                <p>{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-medium'>Module Attempt's </h1>
                    <p className='mt-2 text-white/70'>Track your learning attempt’s per module</p>
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
                                                <td className="px-5 lg:px-3 text-wrap">
                                                    <p className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
                                                        <span className="text-white/70 font-medium">Attempts</span>
                                                        <span className="md:ml-2 font-medium flex flex-col md:flex-row items-center">
                                                            {tx.number_of_attemps}
                                                            <span className="md:ml-2 flex items-center justify-center w-[120px] lg:w-auto">
                                                                {[...Array(tx.rating)].map((_, i) => (
                                                                    <img
                                                                        key={i}
                                                                        src="/assets/star-review.svg"
                                                                        alt="star"
                                                                        className="w-6 h-6"
                                                                    />
                                                                ))}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className={`px-5 lg:px-3 text-nowrap  ${tx.status === 'Successfull' ? 'text-[#00FF00]' : tx.status === 'Pending' ? 'text-[#FFBF00]' : 'text-[#FF0000]'}`}>
                                                    <span className='bg-white/10 rounded-full border px-3 py-1'>
                                                        <i className='fa-solid fa-circle text-[5px] -translate-y-1 mr-2'></i>
                                                        <span className='text-white'>{tx.status}</span>
                                                    </span>
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
