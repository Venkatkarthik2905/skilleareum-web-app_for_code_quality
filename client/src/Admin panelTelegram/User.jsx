import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import axios from "axios";
import { SERVER_URL } from "../config";
import { format } from "date-fns";

export default function User() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(5);
  const [tableEntries, setTableEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    const tableref = useRef(null);
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/alluser_data`, {
        params: { startDate, endDate }
      });
      setTableEntries(response.data);
    } catch (err) {
      setError("Failed to load user data.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [startDate, endDate]);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableref.current,
    filename: "Users data",
    sheet: "Skilleareum User Registration and Subscription Report",
  });
  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;

  const filteredEntries = tableEntries.filter(
    (item) =>
      !searchQuery ||
      (item.email && item.email.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
      (item.referral_code && item.referral_code.toLowerCase().startsWith(searchQuery.toLowerCase()))
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortOption === "email-asc") {
      return (a.email || "").localeCompare(b.email || "");
    } else if (sortOption === "email-desc") {
      return (b.email || "").localeCompare(a.email || "");
    } else if (sortOption === "token-asc") {
      return (a.token_balance || 0) - (b.token_balance || 0);
    } else if (sortOption === "token-desc") {
      return (b.token_balance || 0) - (a.token_balance || 0);
    } else if (sortOption === "created-asc") {
      return new Date(a.created_at) - new Date(b.created_at); // Oldest to Newest
    } else if (sortOption === "created-desc") {
      return new Date(b.created_at) - new Date(a.created_at); // Newest to Oldest
    }
    return 0;
  });

  let currentEntities = sortedEntries.slice(indexOfFirstEntity, indexOfLastEntity);

  const emptyRowCount = entitiesPerPage - currentEntities.length;

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentEntities.length === entitiesPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDropdownChange = (e) => {
    setEntitiesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  const handleDateChange = (e, type) => {
    if (type === "start") setStartDate(e.target.value);
    else setEndDate(e.target.value);
  };
  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 
  return (
    <>
      <div className="font-san mt-5 bg-white/5 rounded-2xl py-10 px-5 md:p-5">
        <p className="text-[#38B6FF] flex items-center gap-2 font-bold">Users Data</p>
        <div className="flex justify-between items-center my-2 gap-2">
          <input
            type="text"
            className="w-[1/4] bg-white/20 text-white py-1 px-5 font-medium text-sm rounded-md focus:outline-none"
            placeholder="Search by Email or referral Id"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="outline-none rounded-md bg-transparent border-[1px]"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option className="text-black" value="">Sort By</option>
            <option className="text-black" value="email-asc">Email (A to Z)</option>
            <option className="text-black" value="email-desc">Email (Z to A)</option>
            <option className="text-black" value="token-asc">Token Balance (Low to High)</option>
            <option className="text-black" value="token-desc">Token Balance (High to Low)</option>
            <option className="text-black" value="created-asc">Created At (Oldest to Newest)</option>
            <option className="text-black" value="created-desc">Created At (Newest to Oldest)</option>
          </select>
       
          <input
          type="date"
          className="bg-white/20 text-white py-1 px-5 rounded-md"
          value={startDate}
          onChange={(e) => handleDateChange(e, "start")}
        />
        <input
          type="date"
          className="bg-white/20 text-white py-1 px-5 rounded-md"
          value={endDate}
          onChange={(e) => handleDateChange(e, "end")}
        />
          
          <div>
            <button
              onClick={()=>onDownload()}
              className="px-5 py-1 rounded-md text-sm font-medium bg-white/30"
            >
              Export
            </button>
          </div>
         <p className="text-end text-xs px-3">
            
            <select
              className="ml-2 outline-none rounded-md bg-transparent border-[1px]"
              onChange={handleDropdownChange}
              value={entitiesPerPage}
            >
              <option className="text-black" value="5">5</option>
              <option className="text-black" value="10">10</option>
              <option className="text-black" value="50">50</option>
              <option className="text-black" value="100">100</option>
            </select>
          </p>
        </div>
        <div className="pb-5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center" ref={tableref}>
            <thead>
  <tr className="text-sm md:text-md text-[#3AB6FF]">
    <th className="py-5 px-4 text-left whitespace-nowrap">S. No</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Referral Code</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Email</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Referral Count</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Subscription Status</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Telegram Id</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Wallet Address</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Token Balance</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Referral Earning</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Joining Type</th>
    <th className="py-5 px-4 text-left whitespace-nowrap">Created At</th>
  </tr>
</thead>

              <tbody className="divide-y divide-white/5">
                {currentEntities.map((entity, index) => (
                  <tr key={index} className="h-16 text-xs md:text-sm cursor-pointer rounded-xl">
                    <td className="px-5 lg:px-0 whitespace-nowrap">{index+1}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.referral_code || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.email || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.referral_count || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.sub_status || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.chatId || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.evm_wallet_address || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.token_balance || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{`${entity.referral_earning} USDT` || "-"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">{entity.platform || "SKLRM"}</td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">
                      {entity.created_at
                        ? format(new Date(entity.created_at), "yyyy-MM-dd HH:mm:ss")
                        : "-"}
                    </td>
                  </tr>
                ))}
                {emptyRowCount > 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500">
                      No more data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-2 flex justify-end text-xs px-10">
          <div className="flex gap-3">
            <button
              className="bg-white text-[#0285FF] rounded-md px-2 py-1"
              onClick={handlePrevClick}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="bg-[#0285FF] text-white rounded-md px-2 py-1"
              onClick={handleNextClick}
              disabled={currentEntities.length < entitiesPerPage}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
