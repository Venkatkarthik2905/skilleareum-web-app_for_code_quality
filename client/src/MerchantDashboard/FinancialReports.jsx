import React, { useState } from 'react'
import Header from './Layout/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { SERVER_URL } from '../config';
import axios from 'axios';
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const FinancialReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [subscriptionStats, setSubscriptionStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status'); // All, active, inactive

  useEffect(() => {
    const fetchEnrollmentStats = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/merchant/get-subscription-history`);
        if (response.data.status === 'success') {
          setSubscriptionHistory(response.data.data);
          setSubscriptionStats(response.data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch subscription history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentStats();
  }, []);

  // Filter logic
  const filteredData = subscriptionHistory.filter(user => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !search ||
      user?.referral_code?.toLowerCase().includes(search) ||
      user?.email?.toLowerCase().includes(search) ||
      user?.current_program?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'All Status' || user?.sub_status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset page on filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, itemsPerPage]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };


  const downloadExcel = () => {
    if (!currentData || currentData.length === 0) return;

    // Map data to exportable format
    const exportData = currentData.map((item, index) => ({
      "S.No": index + 1,
      "Sklr ID": item.referral_code,
      "Email": item.email,
      "Program Type": item.current_program,
      "Token": item.token,
      "Amount": item.amount,
      "Hash": item.hash,
      "Date & Time": item.createdAt,
      "Status": item.sub_status,
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");

    // Convert to excel buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Save file
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Financial_Report.xlsx");
  };


  return (
    <div className='bg-black'>
      <Header />
      <div className="md:p-6 p-4 max-w-7xl mx-auto font-poppins text-white ">
        <div className="flex items-start md:items-center justify-between mb-6 ">
          <div>
            <h1 className="text-xl font-medium mb-1 ">Financial Reports</h1>
            <p className="font-light text-sm text-white/70 ">View revenue, commissions, and transaction history.</p>
          </div>
          {/* <button className=" mt-2 md:mt-0 flex md:items-center gap-2 text-sm text-white font-inter ">
            <i class="fa-regular fa-bell"></i>
            <p className='md:block hidden'>Notifications</p>
          </button> */}
        </div>

        <div className=' flex gap-5 md:flex-row flex-col '>
          <div className="md:w-1/3 bg-[#1A2028]/95 border-2 border-[#414955] rounded-2xl  mb-6 h-full bg-cover bg-center bg-norepeat relative overflow-hidden ">
            <img src='/assets/merchant/waves.svg' className='absolute z-20 object-cover rounded-2xl' />
            <img src='/assets/merchant/wavescolor.svg' className='absolute w-7/12 right-0 opacity-90 z-0 blur-lg ' />
            <div className=' bg-[#EFEFEF]/50 w-20 h-7 blur-lg z-0 absolute bottom-3 ' />
            <div className=' bg-[#1A202803]/5 backdrop-blur md:p-6 p-10 rounded-2xl '>
              <div className="rounded-2xl flex items-center justify-between">
                <div className="w-full font-inter ">
                  <h2 className="text-xl text-center font-semibold ">Total Revenue  <span className=' text-2xl ml-3 '>${subscriptionStats?.totalRevenue?.toFixed(2) ?? '0.00'}</span> </h2>
                </div>
              </div>
            </div>
            <div className='z-30 w-full h-10 rounded-b-2xl bg-gradient-to-r from-[#2B3FF2] to-[#9195B8] flex justify-center items-center gap-2 '>
              <p className='font-medium text-sm'>All Time Earnings </p>
              <img src='/assets/merchant/dollar.svg' className=' w-4 ' />
            </div>
          </div>
          <div className="md:w-1/3 bg-[#1A2028]/95 border-2 border-[#414955] rounded-2xl  mb-6 h-full bg-cover bg-center bg-norepeat relative overflow-hidden ">
            <img src='/assets/merchant/waves.svg' className='absolute z-20 object-cover rounded-2xl' />
            <img src='/assets/merchant/wavescolor.svg' className='absolute w-7/12 right-0 opacity-90 z-0 blur-lg ' />
            <div className=' bg-[#EFEFEF]/50 w-20 h-7 blur-lg z-0 absolute bottom-3 ' />
            <div className=' bg-[#1A202803]/5 backdrop-blur md:p-6 p-10 rounded-2xl '>
              <div className="rounded-2xl flex items-center justify-between">
                <div className="w-full font-inter ">
                  <h2 className="text-xl text-center font-semibold ">Subscription Revenue  <span className=' text-2xl ml-3 '>${subscriptionStats?.totalRevenue?.toFixed(2) ?? '0.00'}</span> </h2>
                </div>
              </div>
            </div>
            <div className='z-30 w-full h-10 rounded-b-2xl bg-gradient-to-r from-[#2B3FF2] to-[#9195B8] flex justify-center items-center gap-2 '>
              <p className='font-medium text-sm'>From Subscriptions</p>
              <img src='/assets/merchant/dollar.svg' className=' w-4 ' />
            </div>
          </div>
          <div className="md:w-1/3 bg-[#1A2028]/95 border-2 border-[#414955] rounded-2xl  mb-6 h-full bg-cover bg-center bg-norepeat relative overflow-hidden ">
            <img src='/assets/merchant/waves.svg' className='absolute z-20 object-cover rounded-2xl' />
            <img src='/assets/merchant/wavescolor.svg' className='absolute w-7/12 right-0 opacity-90 z-0 blur-lg ' />
            <div className=' bg-[#EFEFEF]/50 w-20 h-7 blur-lg z-0 absolute bottom-3 ' />
            <div className=' bg-[#1A202803]/5 backdrop-blur md:p-6 p-10 rounded-2xl '>
              <div className="rounded-2xl flex items-center justify-between">
                <div className="w-full font-inter ">
                  <h2 className="text-xl text-center font-semibold ">Paid Users  <span className=' text-2xl ml-3 '>{subscriptionStats?.totalPaidUsers}</span> </h2>
                </div>
              </div>
            </div>
            <div className='z-30 w-full h-10 rounded-b-2xl bg-gradient-to-r from-[#2B3FF2] to-[#9195B8] flex justify-center items-center gap-2 '>
              <p className='font-medium text-sm'>{subscriptionStats?.paidUsersThisMonthPercentage}% This Month</p>
              <img src='/assets/merchant/dollar.svg' className=' w-4 ' />
            </div>
          </div>
        </div>


        <div className="bg-white rounded-2xl  text-[#202020] px-6 py-10 ">
          <div className=' flex md:flex-row flex-col justify-between items-center mb-10 md:gap-0 gap-5 '>
            <p className='text-xl font-semibold'>Transactions</p>
            <div className=' flex md:flex-row flex-col items-center gap-5 '>
              <button
                className='border border-[#DDDDDD] px-3 py-1.5 rounded-lg font-medium'
                onClick={downloadExcel}
              >
                <span className='mr-2'>
                  <FontAwesomeIcon icon={faDownload} className='text-[#707070]' />
                </span>
                Download Excel
              </button>

              {/* <button className='border bprder-[#DDDDDD] px-3 py-1.5 rounded-lg font-medium '><span className=' mr-2 '> <FontAwesomeIcon icon={faCalendar} className=' text-[#707070] ' /> </span>Filter Month</button> */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className=" text-[#202020] border border-[#DDDDDD] font-medium px-4 py-1.5 rounded-lg focus:outline-none pr-10">
                <option className=''>All Status</option>
                <option>active</option>
                <option>inactive</option>
              </select>
            </div>
          </div>
          <div className=' w-full overflow-hidden overflow-x-auto '>
            <table className="w-full overflow-x-auto border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Sklr Id</th>
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Email</th>
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Program Type</th>
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Token</th>
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Amount </th>
                  {/* <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">hash</th> */}
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Date & Time</th>
                  <th className="px-3 text-sm py-3 text-center font-medium text-[#8B909A] whitespace-nowrap uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[#23272E] ">
                {currentData.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-5 text-center whitespace-nowrap py-4 text-sm  font-medium">{user.referral_code}</td>
                    <td className="px-5 text-center font-medium whitespace-nowrap py-4 text-sm ">{user.email}</td>
                    <td className="px-5 text-center whitespace-nowrap py-4 text-sm  font-medium">{user.current_program}</td>
                    <td className="px-5 text-center font-medium whitespace-nowrap py-4 text-sm">
                      {user.token}
                    </td>
                    <td className="px-5 text-[#00AC10] text-center font-medium whitespace-nowrap py-4">
                      ${user.amount}
                    </td>
                    {/* <td className="px-5 text-center whitespace-nowrap py-4">
                      {user.hash.slice(0, 10)}
                    </td> */}
                    <td className="px-5 text-center whitespace-nowrap py-4">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-5 text-center whitespace-nowrap py-4">
                      <span className={`inline-flex items-center px-6 py-1.5 rounded-full text-sm font-medium ${user.sub_status === 'active'
                        ? 'text-[#00AC10]'
                        : 'text-[#C80000]'
                        }`}>
                        {user.sub_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex md:flex-row flex-col items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>of 50</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${currentPage === page
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialReports