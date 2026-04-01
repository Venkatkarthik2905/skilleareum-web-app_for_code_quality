import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ContactMessages = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [tableEntries, setTableEntries] = useState([]);

    const [editedData, setEditedData] = useState({
        email: "",
        first_name: "",
        message: "",
        phone_number: "",
        created_at: ""
    });

    const [selectedLevel, setSelectedLevel] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchMissingWords = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/getAllContactMessages`);
            console.log(response.data);
            setTableEntries(response.data.data);
        } catch (error) {
            console.error('Error fetching  Missing Words:', error);
        }
    };

    // useEffect will still fetch data on component mount
    useEffect(() => {
        fetchMissingWords();
    }, []);

    // Filter entries based on selected level
    const filteredEntries = selectedLevel
        ? tableEntries.filter(entry => entry.level === selectedLevel)
        : tableEntries;

    const indexOfLastEntity = currentPage * entitiesPerPage;
    const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;

    let currentEntities = filteredEntries.slice(indexOfFirstEntity, indexOfLastEntity);

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

    console.log(currentEntities)

    return (
        <>
            <div className="font-san mt-5 bg-white/5 rounded-2xl py-10 px-5 md:p-5">
                <p className="text-[#38B6FF] flex items-center gap-2 font-bold">Contact us</p>
                <div className="flex items-center gap-2 ml-auto px-3 mb-2 justify-end">
                    <p className="text-xs mr-2 ">
                        Show number of entities
                        <select
                            className="ml-2 outline-none rounded-md bg-transparent border-[1px]"
                            onChange={handleDropdownChange}
                            value={entitiesPerPage}
                        >
                            <option className="text-black" value="5">5</option>
                            <option className="text-black" value="10">10</option>
                            <option className="text-black" value="50">50</option>
                        </select>
                    </p>

                    {/* Filter by level dropdown */}

                </div>


                <div className="pb-5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead>
                                <tr className="text-sm md:text-md text-[#3AB6FF]">
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Name</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Email</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Phone</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Message</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">created At</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {currentEntities.length > 0 && currentEntities.map((entity, index) => (
                                    <tr key={index} className="h-16 text-xs md:text-sm cursor-pointer rounded-xl">
                                        <td className="px-5 lg:px-3 whitespace-nowrap">

                                            {entity.first_name || "-"}

                                        </td>

                                        <td className="px-5 lg:px-3 py-2 whitespace-nowrap">
                                            {
                                                entity.email || "-"
                                            }
                                        </td>

                                        <td className="px-5 lg:px-3 py-2 whitespace-normal break-words">
                                            {
                                                entity.phone_number || "-"
                                            }
                                        </td>
                                        <td className="px-5 lg:px-3 py-2 whitespace-normal break-words">
                                            {
                                                entity.message || "-"
                                            }
                                        </td>

                                        <td className="px-5 lg:px-3 py-2 whitespace-normal break-words">
                                            {
                                                entity.created_at.split("T")[0] || "-"
                                            }
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
};

export default ContactMessages;
