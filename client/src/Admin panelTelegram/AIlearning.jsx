import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";
import { format } from 'date-fns';

export default function AIlearning() {
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage, setEntitiesPerPage] = useState(5);
    const [tableEntries, setTableEntries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedData, setEditedData] = useState({
        day: "",
        topic_name: "",
        description: "",
        video_url: "",
        assessments:[],
    });
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const [editedAssessments, setEditedAssessments] = useState([]);

    const fetchJumbledWords = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/getAiLearning`);
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
    const toggleExpand = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleAssessmentChange = (e, index) => {
        const { name, value } = e.target;
        setEditedData((prevState) => {
            const updatedAssessments = prevState.assessments.map((assessment, i) =>
                i === index ? { ...assessment, [name]: value } : assessment
            );
            return { ...prevState, assessments: updatedAssessments };
        });
    };
    
    
    const addAssessment = () => {
        setEditedData((prevState) => ({
            ...prevState,
            assessments: [...prevState.assessments, { question: '', choices: '', correctAnswer: '' }]
        }));
    };
    
    const removeAssessment = (index) => {
        setEditedData((prevState) => {
            const updatedAssessments = [...prevState.assessments];
            updatedAssessments.splice(index, 1);
            return { ...prevState, assessments: updatedAssessments };
        });
    };
    


    const handleChange = (e, assessmentIndex = null) => {
        const { name, value } = e.target;

        if (assessmentIndex !== null) {
            // Update assessments
            const updatedAssessments = [...editedAssessments];
            updatedAssessments[assessmentIndex][name] = value;
            setEditedAssessments(updatedAssessments);
        } else {
            // Update entity fields
            setEditedData((prev) => ({ ...prev, [name]: value }));
        }
    };

   


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

    const handleEditClick = (index, entity) => {
        setEditingIndex(index);
        setEditedData({ ...entity });
        setEditedAssessments(entity.assessments || []);
    };

    const handleSaveClick = async (id) => {
        try {
            const response = await axios.put(`${SERVER_URL}/api/updateAiLearning`, {
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
            topic_name: "",
            description: "",
            video_url: "",
            assessments:[],
        });
    };

    const handleDeleteClick = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this AI Learning entry?");
        
        if (!isConfirmed) return;
    
        try {
            const response = await axios.delete(`${SERVER_URL}/api/deleteAiLearning?day=${id}`, {
                data: { id }
            });
            if (response.data.success) {
                const updatedEntities = tableEntries.filter(entity => entity.id !== id);
                setTableEntries(updatedEntities);
            }
            fetchJumbledWords();

        } catch (error) {
            console.error("Error deleting AI Learning:", error);
        }
    };
    
    
    const handleAddClick = async () => {
        if (editedData.assessments.length === 0) {
            alert("Please add at least one assessment.");
            return;
        }
    
        const payload = {
            topic_name: editedData.topic_name,
            description: editedData.description,
            video_url: editedData.video_url,
            day: editedData.day,
            assessments: editedData.assessments, // Send actual assessments array
        };
    
        try {
            const response = await axios.post(`${SERVER_URL}/api/createAiLearning`, payload);
    
            if (response.status === 201) {
                alert('AI Learning & Assessment added successfully');
                // Optionally, refresh data
                handleCancel()
                fetchJumbledWords()
            } else {
                alert('Failed to add AI Learning');
            }
        } catch (error) {
            console.error('Error adding AI Learning:', error);
            alert('Error adding AI Learning');
        }
    };
    
    

    const handleAddClicks = () => {
        setShowAddModal(true);
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
                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Topic</th>
                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Description</th>
                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Video Url</th>
                    <th className="py-5 px-3 md:px-0 whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {currentEntities.map((entity, index) => (
                    <>
                        {/* Main Row */}
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
                                    <input
                                        name="topic_name"
                                        value={editedData.topic_name}
                                        onChange={handleChange}
                                        className="w-full px-2 py-1 bg-transparent"
                                    />
                                ) : (
                                    entity.topic_name || "-"
                                )}
                            </td>

                            <td className="px-5 lg:px-3 whitespace-normal break-words">
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        name="description"
                                        value={editedData.description}
                                        onChange={handleChange}
                                        className="w-full px-2 py-1 bg-transparent"
                                    />
                                ) : (
                                    entity.description || "-"
                                )}
                            </td>

                            <td className="px-5 lg:px-3 whitespace-normal break-words">
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        name="video_url"
                                        value={editedData.video_url}
                                        onChange={handleChange}
                                        className="w-full px-2 py-1 bg-transparent"
                                    />
                                ) : (
                                    entity.video_url || "-"
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
                                            onClick={() => handleEditClick(index, entity)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-white font-semibold rounded-md px-3 w-full py-1 text-blue-500"
                                            onClick={() => handleDeleteClick(entity.day)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>

                            <td>
                                {/* Expand Button */}
                                <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                                    {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </td>
                        </tr>

                        {/* Assessment Rows */}
                        {expandedIndex === index && entity.assessments && (
                            <tr>
                                <td colSpan="6">
                                    <table className="w-full mt-2 border-t border-gray-500">
                                        <thead>
                                            <tr className="text-sm text-[#3AB6FF]">
                                                <th>Question</th>
                                                <th>Option A</th>
                                                <th>Option B</th>
                                                <th>Option C</th>
                                                <th>Option D</th>
                                                <th>Correct Option</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entity.assessments.map((assessment, i) => (
                                                <tr key={i} className="text-xs">
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                name="question"
                                                                value={editedAssessments[i]?.question}
                                                                onChange={(e) => handleChange(e, i)}
                                                                className="w-full px-2 py-1 bg-transparent"
                                                            />
                                                        ) : (
                                                            assessment.question || "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                name="option_a"
                                                                value={editedAssessments[i]?.option_a}
                                                                onChange={(e) => handleChange(e, i)}
                                                                className="w-full px-2 py-1 bg-transparent"
                                                            />
                                                        ) : (
                                                            assessment.option_a || "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                name="option_b"
                                                                value={editedAssessments[i]?.option_b}
                                                                onChange={(e) => handleChange(e, i)}
                                                                className="w-full px-2 py-1 bg-transparent"
                                                            />
                                                        ) : (
                                                            assessment.option_b || "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                name="option_c"
                                                                value={editedAssessments[i]?.option_c}
                                                                onChange={(e) => handleChange(e, i)}
                                                                className="w-full px-2 py-1 bg-transparent"
                                                            />
                                                        ) : (
                                                            assessment.option_c || "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                name="option_d"
                                                                value={editedAssessments[i]?.option_d}
                                                                onChange={(e) => handleChange(e, i)}
                                                                className="w-full px-2 py-1 bg-transparent"
                                                            />
                                                        ) : (
                                                            assessment.option_d || "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                name="correct_option"
                                                                value={editedAssessments[i]?.correct_option}
                                                                onChange={(e) => handleChange(e, i)}
                                                                className="w-full px-2 py-1 bg-transparent"
                                                            />
                                                        ) : (
                                                            assessment.correct_option || "-"
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                    </>
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                maxHeight:'80vh',
                overflowY: 'auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <div className="flex justify-center overflow-y-auto">
                <h2 className="text-xl font-bold text-black mb-4">Add AI Learning & Assessment</h2>
            </div>
            <form>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Day:</label>
                    <input type="text" name="day" value={editedData.day} onChange={handleChange} className="w-full px-2 py-1 border rounded-md text-gray-500" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Topic</label>
                    <input type="text" name="topic_name" value={editedData.topic_name} onChange={handleChange} className="w-full px-2 py-1 border rounded-md text-gray-500" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Description</label>
                    <input type="text" name="description" value={editedData.description} onChange={handleChange} className="w-full px-2 py-1 border rounded-md text-gray-500" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Video URL</label>
                    <textarea name="video_url" value={editedData.video_url} onChange={handleChange} className="w-full px-2 py-1 border rounded-md text-gray-500"></textarea>
                </div>

                {/* Assessments */}
                <h3 className="text-lg font-bold text-black mb-2">Assessments</h3>
                {editedData.assessments.map((assessment, index) => (
    <div key={index} className="mb-4 border p-3 rounded-md">
        <label className="block mb-1 text-black">Question:</label>
        <input 
            type="text" 
            name="question" 
            value={assessment.question} 
            onChange={(e) => handleAssessmentChange(e, index)} // Pass index
            className="w-full px-2 py-1 border rounded-md text-gray-500" 
        />
        <label className="block mb-1 text-black">Option A:</label>
        <input 
            type="text" 
            name="option_a" 
            value={assessment.option_a} 
            onChange={(e) => handleAssessmentChange(e, index)}
            className="w-full px-2 py-1 border rounded-md text-gray-500" 
        />
        <label className="block mb-1 text-black">Option B:</label>
        <input 
            type="text" 
            name="option_b" 
            value={assessment.option_b} 
            onChange={(e) => handleAssessmentChange(e, index)}
            className="w-full px-2 py-1 border rounded-md text-gray-500" 
        />
        <label className="block mb-1 text-black">Option C:</label>
        <input 
            type="text" 
            name="option_c" 
            value={assessment.option_c} 
            onChange={(e) => handleAssessmentChange(e, index)}
            className="w-full px-2 py-1 border rounded-md text-gray-500" 
        />
        <label className="block mb-1 text-black">Option D:</label>
        <input 
            type="text" 
            name="option_d" 
            value={assessment.option_d} 
            onChange={(e) => handleAssessmentChange(e, index)}
            className="w-full px-2 py-1 border rounded-md text-gray-500" 
        />
        <label className="block mb-1 text-black">Correct Answer:</label>
        <input 
            type="text" 
            name="correct_option" 
            value={assessment.correct_option} 
            onChange={(e) => handleAssessmentChange(e, index)}
            className="w-full px-2 py-1 border rounded-md text-gray-500" 
        />
        <button type="button" onClick={() => removeAssessment(index)} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">
            Remove
        </button>
    </div>
))}

                <button type="button" onClick={addAssessment} className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
                    + Add Assessment
                </button>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
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