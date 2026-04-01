import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

export default function Passbook() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(4);
  const [tableEntries, setTableEntries] = useState([
    {
      id: "USER-001",
      email: "user1@example.com",
      paid_status: "Paid",
      token_balance: 150,
      created_at: "2024-11-01",
    },
    {
      id: "USER-002",
      email: "user2@example.com",
      paid_status: "Unpaid",
      token_balance: 75,
      created_at: "2024-10-28",
    },
    {
      id: "USER-003",
      email: "user3@example.com",
      paid_status: "Paid",
      token_balance: 200,
      created_at: "2024-10-20",
    },
  ]);

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;

  let currentEntities = tableEntries.slice(
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

  return (
    <>
      <div className="font-san mt-5 bg-white/5 rounded-xl py-10 px-5 md:p-5">
        <p className="text-end text-xs px-3 mb-2">
          Show no of entity
          <select
            className="ml-2 outline-none rounded-md bg-transparent border-[1px]"
            onChange={handleDropdownChange}
            value={entitiesPerPage}
          >
            <option className="text-black" value="4">
              4
            </option>
            <option className="text-black" value="5">
              5
            </option>
            <option className="text-black" value="10">
              10
            </option>
          </select>
        </p>
        <div className="pb-5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="text-sm md:text-md text-[#3AB6FF]">
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">
                    USER-SKLR-ID
                  </th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">
                    EMAIL ADDRESS
                  </th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">
                    PAID STATUS
                  </th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">
                    TOKEN BALANCE
                  </th>
                  <th className="py-5 px-5 md:px-0 whitespace-nowrap">
                    CREATED AT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentEntities.map((entity, index) => (
                  <tr
                    key={index}
                    className="h-16 text-xs md:text-sm cursor-pointer rounded-xl"
                  >
                    <td className="px-5 lg:px-0 whitespace-nowrap">
                        {entity.id}
                    </td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">
                      {entity.email}
                    </td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">
                        {entity.paid_status}
                    </td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">
                        {entity.token_balance}
                    </td>
                    <td className="px-5 lg:px-0 whitespace-nowrap">
                      {entity.created_at}
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
