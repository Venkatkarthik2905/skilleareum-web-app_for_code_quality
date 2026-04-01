import React, { useState, useEffect } from "react";
import { faArrowLeft, faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { SERVER_URL } from "../config";

export default function Payment() {
  const [tableEntries, setTableEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(""); // State for sorting

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    // Fetch payment data from backend
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/payments`)
        setTableEntries(response.data.payments);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, [currentPage, entitiesPerPage]);

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;

  const filteredEntries = tableEntries.filter((item) =>
    !searchQuery || (item.from && item.from.toLowerCase().startsWith(searchQuery.toLowerCase()))
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortOption === "from-asc") {
      return (a.from || "").localeCompare(b.from || "");
    } else if (sortOption === "from-desc") {
      return (b.from || "").localeCompare(a.from || "");
    } else if (sortOption === "amount-asc") {
      return (a.amount || 0) - (b.amount || 0);
    } else if (sortOption === "amount-desc") {
      return (b.amount || 0) - (a.amount || 0);
    } else if (sortOption === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const currentEntities = sortedEntries.slice(indexOfFirstEntity, indexOfLastEntity);

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

  return (
    <div>
      <div>
        <div className="font-san md:w-[95%] bg-white/5 rounded-xl py-10 px-5 md:p-10">
          <div className="rounded-xl flex md:flex-row flex-col justify-center md:gap-0 gap-3  md:justify-between">
            <p className="text-[#38B6FF] flex items-center gap-2 font-bold">
              Payment History
            </p>
            <div className="flex justify-between items-center my-2">
              <div className="mr-2">
                <input
                  type="text"
                  className="w-full bg-white/20 text-white py-1 px-5 font-medium text-sm rounded-md focus:outline-none"
                  placeholder="Search by referral id"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <select
                className="outline-none rounded-md bg-transparent border-[1px]"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option className="text-black" value="">Sort By</option>
                <option className="text-black" value="from-asc">From (A to Z)</option>
                <option className="text-black" value="from-desc">From (Z to A)</option>
                <option className="text-black" value="amount-asc">Amount (Low to High)</option>
                <option className="text-black" value="amount-desc">Amount (High to Low)</option>
                <option className="text-black" value="date-asc">Date (Oldest to Newest)</option>
                <option className="text-black" value="date-desc">Date (Newest to Oldest)</option>
              </select>

              <div>
                <p className="text-end text-xs px-3 ">
                  Show no of entity
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
            </div>
          </div>
          <div className="pb-5 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="text-sm md:text-base text-[#0194FE]">
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">From</th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">Transaction ID</th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">Amount</th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">Date & Time</th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="pt-3">
                {currentEntities.map((data, index) => (
                  <tr key={index} className="h-16 text-sm rounded-md hover:bg-white/20 group cursor-pointer">
                    <td className="rounded-l-md px-5 md:px-0 whitespace-nowrap">{data.from}</td>
                    <td className="px-5 md:px-0 whitespace-nowrap">{data.transactionId}</td>
                    <td className="px-5 md:px-0 whitespace-nowrap">${data.amount}</td>
                    <td className="px-5 md:px-0 whitespace-nowrap">{data.date}</td>
                    <td className={`px-5 md:px-0 whitespace-nowrap ${data.status === "success" ? "text-[#1EEF32]" : data.status === "Incomplete" ? "text-[#FF0000]" : ""}`}>
                      {data.status}
                      <FontAwesomeIcon icon={faCheckCircle} className="pl-1 text-xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex justify-between text-xs px-3">
            <div>
              <p>{`${indexOfFirstEntity + 1}-${Math.min(indexOfLastEntity, tableEntries.length)} of ${tableEntries.length}`}</p>
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
        </div>
      </div>
    </div>
  );
}
