import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";
import { format } from 'date-fns';

export default function JumbledWords() {
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [tableEntries, setTableEntries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedData, setEditedData] = useState({
        day: "",
        level: "",
        question: "",
        explanation: "",
        language:"",
        hintImg: "",
        answer: "",
        answerText: ""
    });

    const [selectedLevel, setSelectedLevel] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchJumbledWords = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/getJumbledWords`);
            console.log(response.data);
            setTableEntries(response.data);
        } catch (error) {
            console.error('Error fetching Jumbled Words:', error);
        }
    };
    
    // useEffect will still fetch data on component mount
    useEffect(() => {
        fetchJumbledWords();
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

    const handleFilterChange = (e) => {
        setSelectedLevel(e.target.value); // Set the selected level for filtering
        setCurrentPage(1); // Reset to first page when filter is applied
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        const entity = currentEntities[index];
        setEditedData({
            day: entity.day || "",
            level: entity.level || "",
            question: entity.question || "",
            explanation: entity.explanation || "",
            hintImg: entity.hintImg || "",
            answer: entity.answer || "",
            language:entity.language || "",
            answerText: entity.answerText || ""
        });
    };

    const handleSaveClick = async (id) => {
        try {
            const response = await axios.put(`${SERVER_URL}/api/updateJumbledWord`, {
                id,
                ...editedData
            });

            if (response.data.success) {
                const updatedEntities = tableEntries.map((entity, index) => {
                    if (entity.id === id) {
                        return { ...entity, ...editedData };
                    }
                    return entity;
                });

                setTableEntries(updatedEntities);
                setEditingIndex(null);
            } else {
                console.log("Update failed or no changes made.");
            }
        } catch (error) {
            console.error("Error updating Jumbled Word:", error);
        }
    };


    const handleCancel = () => {
        setShowAddModal(false); 
    };

    const handleCancelClick = () => {
        setEditingIndex(null);
        setEditedData({
            day: "",
            level: "",
            question: "",
            explanation: "",
            hintImg: "",
            answer: "",
            language:"",
            answerText: ""
        });
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/api/deleteJumbledWord`, {
                data: { id }
            });
            if (response.data.success) {
                const updatedEntities = tableEntries.filter(entity => entity.id !== id);
                setTableEntries(updatedEntities);
            }
        } catch (error) {
            console.error("Error deleting Jumbled Word:", error);
        }
    };
    
    const handleAddClick = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/addJumbledWord`, editedData);

            if (response.data.success) {
                alert('Jumbled Word added successfully');
                // setTableEntries([...tableEntries, response.data.newEntry]); 
                fetchJumbledWords();
            } else {
                alert('Failed to add Jumbled Word');
            }
        } catch (error) {
            console.error('Error adding Jumbled Word:', error);
            alert('Error adding Jumbled Word');
        }
    };

    const handleAddClicks = () => {
        setShowAddModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <div className="font-san mt-5 bg-white/5 rounded-2xl py-10 px-5 md:p-5">
                <p className="text-[#38B6FF] flex items-center gap-2 font-bold">Jumbled Word Vault</p>
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
                    <p className="text-xs mr-2">
                        Filter by level
                        <select
                            className="ml-2 outline-none rounded-md bg-transparent border-[1px]"
                            onChange={handleFilterChange}
                            value={selectedLevel}
                        >
                            <option className="text-black" value="">All Levels</option>
                            <option className="text-black" value="easy">Easy</option>
                            <option className="text-black" value="medium">Medium</option>
                            <option className="text-black" value="hard">Hard</option>
                        </select>
                    </p>
                </div>


                <div className="pb-5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead>
                                <tr className="text-sm md:text-md text-[#3AB6FF]">
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Day</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Level</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Language</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Question</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Explanation</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Hint Img</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Answer</th>
                                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Answer Text</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {currentEntities.map((entity, index) => (
                                    <tr key={index} className="h-16 text-xs md:text-sm cursor-pointer rounded-xl">
                                        <td className="px-5 lg:px-3 whitespace-nowrap">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="day"
                                                    value={editedData.day}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.day || "-"
                                            )}
                                        </td>

                                        <td className="px-5 lg:px-3 whitespace-nowrap">
                                            {editingIndex === index ? (
                                                <select
                                                    name="level"
                                                    value={editedData.level}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                >
                                                    <option className="text-black" value="easy">Easy</option>
                                                    <option className="text-black" value="medium">Medium</option>
                                                    <option className="text-black" value="hard">Hard</option>
                                                </select>
                                            ) : (
                                                entity.level || "-"
                                            )}
                                        </td>

                                        <td className="px-5 lg:px-3 whitespace-normal break-words">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="language"
                                                    value={editedData.language}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.language || "-"
                                            )}
                                        </td>
                                        <td className="px-5 lg:px-3 whitespace-normal break-words">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="question"
                                                    value={editedData.question}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.question || "-"
                                            )}
                                        </td>

                                        <td className="px-5 lg:px-3 whitespace-normal break-words">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="explanation"
                                                    value={editedData.explanation}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.explanation || "-"
                                            )}
                                        </td>

                                        <td className="px-5 lg:px-3 whitespace-normal break-words">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="hintImg"
                                                    value={editedData.hintImg}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.hintImg || "-"
                                            )}
                                        </td>

                                        <td className="px-5 lg:px-3 whitespace-nowrap">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="answer"
                                                    value={editedData.answer}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.answer || "-"
                                            )}
                                        </td>

                                        <td className="px-5 lg:px-3 whitespace-normal break-words">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="answerText"
                                                    value={editedData.answerText}
                                                    onChange={handleChange}
                                                    className="w-full px-2 py-1 bg-transparent"
                                                />
                                            ) : (
                                                entity.answerText || "-"
                                            )}
                                        </td>

                                        <td className="flex flex-col items-center gap-2 mt-10">
                                            {editingIndex === index ? (
                                                <>
                                                    <button
                                                        className="bg-blue-500 font-semibold rounded-md px-3 w-full py-1"
                                                        onClick={() => handleSaveClick(entity.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-red-500 font-semibold rounded-md px-3 w-full py-1"
                                                        onClick={handleCancelClick}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-blue-500 font-semibold rounded-md px-3 w-full py-1"
                                                        onClick={() => handleEditClick(index)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-white font-semibold rounded-md px-3 w-full py-1 text-blue-500"
                                                        onClick={() => handleDeleteClick(entity.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div className="mt-2 flex  text-l px-10">
                        <button
                            className="bg-green-500 text-white font-semibold rounded-md px-4 py-1 gap-6"
                            onClick={handleAddClicks}
                        >
                            ADD
                        </button>
                    </div>

                    {/* Modal */}
                    {showAddModal && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '50%',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <div className="flex justify-center">
                                    <h2 className="text-xl font-bold text-black mb-4">Add Content</h2>
                                </div>                                
                                <form>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Day:</label>
                                        <input
                                            type="text"
                                            name="day"
                                            value={editedData.day}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Level:</label>
                                        <select
                                            name="level"
                                            value={editedData.level}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        >
                                            <option className="text-black" value="">add level</option>
                                            <option className="text-black" value="easy">Easy</option>
                                            <option className="text-black" value="medium">Medium</option>
                                            <option className="text-black" value="hard">Hard</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Question:</label>
                                        <input
                                            type="text"
                                            name="question"
                                            value={editedData.question}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Language:</label>
                                        <input
                                            type="text"
                                            name="language"
                                            placeholder="language"
                                            value={editedData.language}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Explanation:</label>
                                        <input
                                            type="text"
                                            name="explanation"
                                            value={editedData.explanation}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Hint Image URL:</label>
                                        <input
                                            type="text"
                                            name="hintImg"
                                            value={editedData.hintImg}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Answer:</label>
                                        <input
                                            type="text"
                                            name="answer"
                                            value={editedData.answer}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Answer Text:</label>
                                        <input
                                            type="text"
                                            name="answerText"
                                            value={editedData.answerText}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={handleAddClick}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
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