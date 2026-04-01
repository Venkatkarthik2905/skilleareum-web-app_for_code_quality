import React, { useState, useEffect } from "react";
import { faArrowLeft, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { SERVER_URL } from "../config";

const ReferralDashboard = () => {
  const [stats, setStats] = useState({
    user_count: 0,
    total_referral_count: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("atoz"); // Default sorting option

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset to the first page after sorting
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/alluser_data`);
        const usersData = response.data;

        const totalReferrals = usersData.reduce((total, user) => total + user.referral_count, 0);

        setUsers(usersData);
        setStats((prevStats) => ({
          ...prevStats,
          user_count: usersData.length,
          total_referral_count: totalReferrals,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const sortUsers = (usersList) => {
    switch (sortOption) {
      case "atoz":
        return [...usersList].sort((a, b) => (a.referral_code || "").localeCompare(b.referral_code || ""));
      case "ztoa":
        return [...usersList].sort((a, b) => (b.referral_code || "").localeCompare(a.referral_code || ""));
      case "highToLow":
        return [...usersList].sort((a, b) => b.referral_count - a.referral_count);
      case "lowToHigh":
        return [...usersList].sort((a, b) => a.referral_count - b.referral_count);
      default:
        return usersList;
    }
  };

  const filteredEntries = users.filter((item) =>
    !searchQuery || (item.referral_code && item.referral_code.toLowerCase().startsWith(searchQuery.toLowerCase()))
  );

  const sortedEntries = sortUsers(filteredEntries);

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
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
    <div className="w-[85%] mx-auto font-san text-white">
      <div className="sec-3 py-5">
        <div className=" bg-black/50 py-7">
          <div className="w-[90%] mx-auto flex sm:flex-row flex-col">
            <div className="sm:w-1/2 sm:px-14 py-10 sm:py-0 border-b sm:border-b-0 sm:border-r flex justify-center gap-5">
              <div>
                <p className="md:text-3xl text-2xl font-bold text-center">{stats.user_count}</p>
                <p className="text-[#64748B] md:text-base text-sm font-medium text-center whitespace-nowrap">
                  Total Users
                </p>
              </div>
            </div>
            <div className="sm:w-1/2 sm:px-14 py-10 sm:py-0 flex justify-center gap-5">
              <div>
                <p className="md:text-3xl text-2xl font-bold text-center">{stats.total_referral_count}</p>
                <p className="text-[#64748B] md:text-base text-sm font-medium text-center whitespace-nowrap">
                  Total Referrals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex justify-between gap-3 items-center my-2">
            <input
              type="text"
              className="w-[1/3] bg-white/20 text-white py-1 px-5 font-medium text-sm rounded-md focus:outline-none"
              placeholder="Search by referral ID"
              value={searchQuery}
              onChange={handleSearch}
            />
            <select
              className="bg-transparent text-white border rounded-md py-1 px-2"
              onChange={handleSortChange}
              value={sortOption}
            >
                <option className="text-black" value="">Sort By</option>
              <option className="text-black" value="atoz">A to Z</option>
              <option className="text-black" value="ztoa">Z to A</option>
              <option className="text-black" value="highToLow">High to Low</option>
              <option className="text-black" value="lowToHigh">Low to High</option>
            </select>
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
          </div>

          <div className="pb-5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="text-sm md:text-md text-[#3AB6FF]">
                    <th className="py-5 px-5 md:px-0 whitespace-nowrap">SKLR ID</th>
                    <th className="py-5 px-5 md:px-0 whitespace-nowrap">USER NAME</th>
                    <th className="py-5 px-5 md:px-0 whitespace-nowrap">REFERRAL COUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentEntities.map((user, index) => (
                    <tr
                      key={index}
                      className="h-12 text-xs md:text-sm cursor-pointer rounded-xl"
                    >
                      <td className="px-5 lg:px-0 whitespace-nowrap">
                        <p className="font-semibold">{user.referral_code}</p>
                      </td>
                      <td className="px-5 lg:px-0 whitespace-nowrap">
                        <p className="font-semibold">{user.name}</p>
                      </td>
                      <td className="px-5 lg:px-0 whitespace-nowrap">{user.referral_count || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
};

export default ReferralDashboard;
