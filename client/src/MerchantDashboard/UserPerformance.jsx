import React, { useState } from 'react';
import Header from './Layout/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { useEffect } from 'react';
import * as XLSX from "xlsx";

export default function UserPerformance() {
   const [searchTerm, setSearchTerm] = useState('');
const [programFilter, setProgramFilter] = useState("All Program Types");
const [sequenceFilter, setSequenceFilter] = useState("All Sequence");
const [dateFilter, setDateFilter] = useState("All days");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEnrollmentStats = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/api/merchant/get-user-data`);
          console.log("res", response.data)
  
          if (response.data.success) {
            setUserData(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch users data", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEnrollmentStats();
    }, []);

  const getCertReadinessColor = (value) => {
    if (value >= 60) return 'text-green-600';
    if (value >= 30) return 'text-yellow-600';
    return 'text-yellow-600';
  };

  // filter 
const isWithinRange = (date, range) => {
  if (range === "All days") return true;
  if (!date) return false;

  const startDate = new Date(date);
  const now = new Date();
  const diffDays = (now - startDate) / (1000 * 60 * 60 * 24);

  switch (range) {
    case "Last 30 Days":
      return diffDays <= 30;
    case "Last 90 Days":
      return diffDays <= 90;
    case "Last 6 Months":
      return diffDays <= 180;
    case "Last Year":
      return diffDays <= 365;
    default:
      return true;
  }
};


  const filteredData = userData.filter((user) => {
  const search = searchTerm.toLowerCase().trim();

  const matchesSearch =
    !search ||
    user?.current_program?.toLowerCase().includes(search) ||
    user?.referral_code?.toLowerCase().includes(search) ||
    user?.email?.toLowerCase().includes(search) 


  const matchesProgram =
    programFilter === "All Program Types" ||
    user?.current_program === programFilter;

  const matchesSequence =
    sequenceFilter === "All Sequence" ||
    user?.seq === sequenceFilter;

  const matchesDate =
    isWithinRange(user?.startDate, dateFilter);

  return (
    matchesSearch &&
    matchesProgram &&
    matchesSequence &&
    matchesDate
  );
});


const totalPages = Math.ceil(filteredData.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const currentData = filteredData.slice(startIndex, endIndex);


  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, programFilter, sequenceFilter, dateFilter, itemsPerPage]);


  const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const handleExportExcel = () => {
  if (!filteredData || filteredData.length === 0) return;


  const formattedData = filteredData.map((user, index) => ({
    "S. No.": index + 1, 
    "User ID": user.user_id,
    "Email": user.email,
    "SKLR ID": user.referral_code,
    "Program Type": user.current_program,
    "Day": user.day,
    "Completion %": user.completionPercentage,
    "Start Date": new Date(user.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    "Sequence": user.seq,
    "Archetype": user.archetype_id,
    "VARK Result": user.vark_result,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data");

  XLSX.writeFile(workbook, "users_data.xlsx");
};




  return (
    <div className="min-h-screen bg-black text-white">
      <Header/>

      <div className="px-6 py-8 max-w-[1400px] mx-auto font-dmsans ">

        <div className="flex md:items-center items-start justify-between mb-8">
          <div>
            <h1 className="text-xl font-medium mb-1 ">Cohort Overview</h1>
            <p className="font-light text-sm text-white/70 ">Compare performance across all cohorts</p>
          </div>
          {/* <button className=" mt-2 md:mt-0 flex md:items-center gap-2 text-sm text-white font-inter ">
             <i class="fa-regular fa-bell"></i>
            <p className='md:block hidden'>Notifications</p>
          </button> */}
        </div>

        <div className="min-h-screen bg-gray-50 p-3 rounded-lg">
        <div className="bg-white rounded-lg">
          <div className="mb-5  flex md:flex-row flex-col items-center gap-4">
            <div className="w-full md:w-[40%] relative">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Sklr ID or program type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          

            <div className="relative text-black">
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>All Program Types</option>
                <option>apprentice</option>
                <option>genesis</option>             
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <div className="relative text-black">
              <select
                value={sequenceFilter}
                onChange={(e) => setSequenceFilter(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>All Sequence</option>
                <option>SEQ-A</option>
                <option>SEQ-B</option>
                <option>SEQ-C</option>
                <option>SEQ-D</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>


            <div className="relative text-black">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>All days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
             <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>


          <div className=' w-full overflow-hidden overflow-x-auto '>
           <table className="w-full overflow-x-auto">
              <thead className="bg-[#f5f5f7] border-b border-gray-200">
                <tr>
                  <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    SKLR ID
                  </th>
                   <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Program Type
                  </th>
                  <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Day
                  </th>
                   <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Sequence Type
                  </th>
                  <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Archetype
                  </th>                 
                  <th className="px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Cert Readiness
                  </th>                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-center transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user?.referral_code ? user?.referral_code : "-"}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-600">
                      {user?.current_program ? user?.email : "-"}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-600">
                      {user?.current_program ? user?.current_program : "-"}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-600">
                       {formatDate(user.startDate)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                      {user?.day ? user?.day : "-"}
                    </td>
                   <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                      {user?.seq ? user?.seq : "-"}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                      {user?.archetype_id ? user?.archetype_id : "-"}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={` font-semibold ${getCertReadinessColor(user?.completionPercentage)}`}>
                        {user?.completionPercentage}%
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
              <span>{filteredData.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft}/>
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentPage === page
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
                disabled={currentPage === 5}
              >
                <FontAwesomeIcon icon={faChevronRight}/>
              </button>
            </div>
            </div>

        
        </div>
        </div>

        <div className="w-full flex justify-end mt-3">
  <button
    onClick={handleExportExcel}
    className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg px-8 py-2 font-semibold text-center"
  >
    Export Excel
  </button>
</div>

      </div>
    </div>
  );
}