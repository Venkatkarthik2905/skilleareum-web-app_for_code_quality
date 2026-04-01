import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";

export default function Subscriptionaccess() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(5);
  const [tableEntries, setTableEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/alluser_data?searchParam=${searchValue}`);
      setTableEntries(response.data);
    } catch (err) {
      setError("Failed to load user data.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;


  const filteredEntries = tableEntries.filter((item) =>
    !searchQuery || (item.email && item.email.toLowerCase().startsWith(searchQuery.toLowerCase()))
  || (item.referral_code && item.referral_code.toLowerCase().startsWith(searchQuery.toLowerCase()))
  );

  let currentEntities = filteredEntries.slice(
    indexOfFirstEntity,
    indexOfLastEntity
  );

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

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterChange = (e) => {
    setSelectedStatus(e.target.value);
    console.log("status", e.target.value);
    setCurrentPage(1);
  };

  const handleStatus = async (user) => {
    try {
      let status = user.sub_status === "active" ? "inactive" : "active";
      const response = await axios.put(
        `${SERVER_URL}/api/updatesubscriptionstatus`,
        {
          id: user.user_id,
          sub_status: status,
        }
      );

      if (response.data.success) {
        console.log("Status updated successfully");
        const updatedEntities = tableEntries.map((entity) =>
          entity.user_id === user.user_id
            ? { ...entity, sub_status: status }
            : entity
        );

        setTableEntries(updatedEntities);
      } else {
        console.log("Update failed or no changes made.");
      }
    } catch (error) {
      console.error("Error updating Jumbled Word:", error);
    }
  };

  return (
    <>
  <div className="font-san mt-5 bg-white/5 rounded-2xl py-6 px-5 md:p-5">
  <p className="text-[#38B6FF] flex items-center gap-2 font-bold mb-4">
    Users Data
  </p>

  {/* Horizontal Alignment */}
  <div className="flex items-center justify-between flex-wrap gap-4">
    {/* Search Bar */}
    {/* <div className="flex items-center">
      <input
        type="text"
        placeholder="Search by email or referral code"
        className="p-1 outline-none rounded-md bg-transparent border-[1px] w-48 text-sm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white rounded-md px-3 py-1 text-xs"
        onClick={fetchUserData}
      >
        Search
      </button>
    </div> */}

    <div>
    <input
            type="text"
            className="w-full bg-white/20 text-white py-1 px-5 font-medium text-sm rounded-md focus:outline-none"
            placeholder="Search by email or referral id"
            value={searchQuery}
            onChange={handleSearch}
          />
    </div>

    {/* Show Number of Entities */}
    <div className="flex items-center text-xs">
      <p>Show no of entity</p>
      <select
        className="ml-2 outline-none rounded-md bg-transparent border-[1px] px-2 py-1"
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
    </div>

    {/* Filter by Status */}
    <div className="flex items-center text-xs">
      <p>Filter by Status</p>
      <select
        className="ml-2 outline-none rounded-md bg-transparent border-[1px] px-2 py-1"
        onChange={handleFilterChange}
        value={selectedStatus}
      >
        <option className="text-black" value="">
          All
        </option>
        <option className="text-black" value="active">
          active
        </option>
        <option className="text-black" value="inactive">
          inactive
        </option>
      </select>
    </div>
  </div>



  <div className="pb-5 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-center">
        <thead>
          <tr className="text-sm md:text-md text-[#3AB6FF]">
            <th className="py-5 px-5 md:px-0 whitespace-nowrap">
              SKLR ID
            </th>
            <th className="py-5 px-5 md:px-0 uppercase whitespace-nowrap">
              referral code
            </th>
            <th className="py-5 px-5 md:px-0 whitespace-nowrap">
              EMAIL ADDRESS
            </th>
            <th className="py-5 px-5 md:px-0 whitespace-nowrap">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {currentEntities.map((entity, index) => (
            <tr
              key={index}
              className="h-16 text-xs md:text-sm cursor-pointer rounded-xl"
            >
              <td className="px-5 lg:px-0 whitespace-nowrap">
                {entity.user_id || "-"}
              </td>
              <td className="px-5 lg:px-0 whitespace-nowrap">
                {entity.referral_code || "-"}
              </td>
              <td className="px-5 lg:px-0 whitespace-nowrap">
                {entity.email || "-"}
              </td>
              <td className="px-5 lg:px-0 whitespace-nowrap">
                {entity.sub_status || "-"}
              </td>
              <td className="px-5 lg:px-0 whitespace-nowrap">
                <button
                  onClick={() => handleStatus(entity)}
                  className=" bg-blue-500 rounded-lg px-5 py-1.5 font-bold text-white text-sm "
                >
                  {entity.sub_status === "active"
                    ? "Remove access"
                    : "Give access"}
                </button>
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
  )
}
