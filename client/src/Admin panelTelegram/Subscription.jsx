import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { SERVER_URL } from "../config";
import axios from "axios";

export default function Subscription() {
  const tableref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(5);
  const [tableEntries, setTableEntries] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/admin/getSubscriptionData`)
      .then((response) => {
        console.log(response.data);
        setTableEntries(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription data:", error);
        setError("Failed to fetch subscription data.");
      });
  }, []);

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;

  const filteredEntries = tableEntries.filter(
    (item) =>
      !searchQuery ||
      (item.email &&
        item.email.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
      (item.referral_code &&
        item.referral_code.toLowerCase().startsWith(searchQuery.toLowerCase()))
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortOption === "atoz") {
      return a.email?.localeCompare(b.email);
    } else if (sortOption === "ztoa") {
      return b.email?.localeCompare(a.email);
    } else if (sortOption === "lowtohigh") {
      return (a.amount || 0) - (b.amount || 0);
    } else if (sortOption === "hightolow") {
      return (b.amount || 0) - (a.amount || 0);
    } else if (sortOption === "oldtonew") {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortOption === "newtoold") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return 0;
    }
  });
  

  let currentEntities = sortedEntries.slice(
    indexOfFirstEntity,
    indexOfLastEntity
  );

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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableref.current,
    filename: "subscription_data",
    sheet: "SubscriptionData",
  });

  return (
    <>
      <div className="font-san mt-5 bg-white/5 rounded-xl py-10 px-5 md:p-5">
        <div className="flex justify-end items-center mb-2">
          <div>
            <div className="flex justify-between items-center my-2">
              <div>
                <input
                  type="text"
                  className="w-full bg-white/20 text-white py-1 px-5 font-medium text-sm rounded-md focus:outline-none"
                  placeholder="Search by email or referral id"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div>
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
                    <option className="text-black" value="50">
                      50
                    </option>
                    <option className="text-black" value="100">
                      100
                    </option>
                  </select>
                </p>
              </div>
              <div>
  <p className="text-end text-xs px-3">
    Sort by
    <select
      className="ml-2 outline-none rounded-md bg-transparent border-[1px]"
      onChange={handleSortChange}
      value={sortOption}
    >
      <option className="text-black" value="">
        None
      </option>
      <option className="text-black" value="atoz">
        Email (A to Z)
      </option>
      <option className="text-black" value="ztoa">
        Email (Z to A)
      </option>
      <option className="text-black" value="lowtohigh">
        Amount (Low to High)
      </option>
      <option className="text-black" value="hightolow">
        Amount (High to Low)
      </option>
      <option className="text-black" value="oldtonew">
        Date (Oldest to Newest)
      </option>
      <option className="text-black" value="newtoold">
        Date (Newest to Oldest)
      </option>
    </select>
  </p>
</div>
            </div>
          </div>
          <div>
            <button
              onClick={onDownload}
              className="px-5 py-1 rounded-md text-sm font-medium bg-white/30"
            >
              Export
            </button>
          </div>
        </div>
        <div className="pb-5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-center" ref={tableref}>
              <thead>
                <tr className="text-sm md:text-md text-[#3AB6FF]">
                  <th className="py-5 px-5 uppercase whitespace-nowrap">
                    Referral Code
                  </th>
                  <th className="py-5 px-5 whitespace-nowrap">Email Address</th>
                  <th className="py-5 px-5 whitespace-nowrap">Chat ID</th>
                  <th className="py-5 px-5 whitespace-nowrap">Amount</th>
                  <th className="py-5 px-5 whitespace-nowrap">Token</th>
                  <th className="py-5 px-5 whitespace-nowrap">Transaction Hash</th>
                  <th className="py-5 px-5 whitespace-nowrap">Platform</th>
                  <th className="py-5 px-5 whitespace-nowrap">Referred By</th>
                  <th className="py-5 px-5 whitespace-nowrap">Joining date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentEntities.map((entity, index) => (
                  <tr
                    key={index}
                    className="h-16 text-xs md:text-sm cursor-pointer rounded-xl"
                  >
                    <td className="px-5 whitespace-nowrap">
                      {entity.referral_code}
                    </td>
                    <td className="px-5 whitespace-nowrap">
                      {entity.email || "N/A"}
                    </td>
                    <td className="px-5 whitespace-nowrap">
                      {entity.chatId || "N/A"}
                    </td>
                    <td className="px-5 whitespace-nowrap">
                      {entity.amount || "N/A"}
                    </td>
                    <td className="px-5 whitespace-nowrap">
                      {entity.token || "N/A"}
                    </td>
                    <td className="px-5 break-all">
                      {entity.hash || "N/A"}
                    </td>
                    <td className="px-5 uppercase whitespace-nowrap">
                      {entity.platform || "Open"}
                    </td>
                    <td className="px-5 whitespace-nowrap">
                      {entity.referred_by_referral_code || "N/A"}
                    </td>
                    <td className="px-5 whitespace-nowrap">
                      { entity.created_at || "N/A"}
                    </td>
                  </tr>
                ))}
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
