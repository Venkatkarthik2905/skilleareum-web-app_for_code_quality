import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { SERVER_URL } from "../config";
import { format } from 'date-fns'; 

export default function AIfactVault() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(5);
  const [tableEntries, setTableEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
      const [showAddModal, setShowAddModal] = useState(false);
  
  const [editedData, setEditedData] = useState({
    aifact: "",
    aicurrentaffair: "",
    aihistory: "",
    aifuture: "",
    day:""
  });
  const fetchAIFacts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/getAIFacts`);
      setTableEntries(response.data);
    } catch (error) {
      console.error('Error fetching AI facts:', error);
    }
  };
  useEffect(() => {
  
    

    fetchAIFacts();
  }, []);

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;

  let currentEntities = tableEntries.slice(indexOfFirstEntity, indexOfLastEntity);

  const emptyRowCount = entitiesPerPage - currentEntities.length;

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleCancel = () => {
    setShowAddModal(false); 
};
const handleAddClicks = () => {
  setShowAddModal(true);
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


  const handleEditClick = (index) => {
    setEditingIndex(index);
    const entity = currentEntities[index];
    setEditedData({
      aifact: entity.aifact || "",
      aicurrentaffair: entity.aicurrentaffair || "",
      aihistory: entity.aihistory || "",
      aifuture: entity.aifuture || "",
      day:entity.date
    });
  };

const handleSaveClick = async (id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/api/updateAIFact`, {
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
      fetchAIFacts()
    } else {
      console.log("Update failed or no changes made.");
    }
  } catch (error) {
    console.error("Error updating AI Fact:", error);
  }
};
const handleAddFact = async () => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/addAIFact`,{
      editedData
    });

    if (response.status===200) {
      
      alert('AI Fact added successfully');
     
      fetchAIFacts();

    
      console.log("Added")
    } else {
      console.log("Update failed or no changes made.");
    }
  } catch (error) {
    console.error("Error addding AI Fact:", error);
  }
};


  const handleCancelClick = () => {
    setEditingIndex(null); 
    setEditedData({
      aifact: "",
      aicurrentaffair: "",
      aihistory: "",
      aifuture: ""
    }); 
  };


  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this AI Fact?");
    if (!isConfirmed) return; // Exit if the user cancels
  
    try {
      const response = await axios.delete(`${SERVER_URL}/api/deleteAIFact`, {
        data: { id }
      });
  
      if (response.data.success) {
        const updatedEntities = tableEntries.filter(entity => entity.id !== id);
        setTableEntries(updatedEntities);
      }
    } catch (error) {
      console.error("Error deleting AI Fact:", error);
    }
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
        <p className="text-[#38B6FF] flex items-center gap-2 font-bold">AI Fact Vault</p>
        <p className="text-end text-xs px-3 mb-2">
          Show number of entities
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
        <div className="pb-5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="text-sm md:text-md text-[#3AB6FF]">
                  <th className="py-5 px-3 md:px-0 whitespace-nowrap">DATE</th>
                  <th className="py-5 px-3 md:px-0 whitespace-nowrap">AI FACT</th>
                  <th className="py-5 px-3 md:px-0 whitespace-nowrap">AI CURRENT AFFAIR</th>
                  <th className="py-5 px-3 md:px-0 whitespace-nowrap">AI HISTORY</th>
                  <th className="py-5 px-3 md:px-0 whitespace-nowrap">AI FUTURE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentEntities.map((entity, index) => (
                  <tr key={index} className="h-16 text-xs md:text-sm cursor-pointer rounded-xl">
                  
                    <td className="px-5 lg:px-3 whitespace-nowrap">
                    <td className="px-5 lg:px-3 whitespace-nowrap">
  {editingIndex === index ? (
    <input
      type="date"
      name="day"
      value={editedData.day ? new Date(editedData.day).toISOString().split("T")[0] : ""}
      onChange={handleChange}
      className="w-full px-2 py-1 bg-transparent"
    />
  ) : (
    entity?.date ? format(new Date(entity.date), "dd-MM-yyyy") : "-"
  )}
</td>

                    </td>

                   
                    <td className="px-5 lg:px-3 whitespace-normal break-words">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="aifact"
                          value={editedData.aifact}
                          onChange={handleChange}
                          className="w-full px-2 py-1 bg-transparent"
                        />
                      ) : (
                        entity.aifact || "-"
                      )}
                    </td>

                    <td className="px-5 lg:px-3 whitespace-normal break-words">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="aicurrentaffair"
                          value={editedData.aicurrentaffair}
                          onChange={handleChange}
                          className="w-full px-2 py-1 bg-transparent"
                        />
                      ) : (
                        entity.aicurrentaffair || "-"
                      )}
                    </td>

                    <td className="px-5 lg:px-3 whitespace-normal break-words">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="aihistory"
                          value={editedData.aihistory}
                          onChange={handleChange}
                          className="w-full px-2 py-1 bg-transparent"
                        />
                      ) : (
                        entity.aihistory || "-"
                      )}
                    </td>

                    <td className="px-5 lg:px-3 whitespace-normal break-words">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="aifuture"
                          value={editedData.aifuture}
                          onChange={handleChange}
                          className="w-full px-2 py-1 bg-transparent"
                        />
                      ) : (
                        entity.aifuture || "-"
                      )}
                    </td>

                   
                    <td className="flex flex-col items-center gap-2 mt-5">
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
                {emptyRowCount > 0 &&
                  [...Array(emptyRowCount)].map((_, index) => (
                    <tr key={index} className="h-16">
                      <td colSpan="6" className="text-center text-gray-400">No more entries</td>
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
                                        <label className="block mb-1 text-black">Day: {editedData.day ? new Date(editedData.day).toISOString().split("T")[0] : ""}</label>
                                        
                                        <input
      type="date"
      name="day"
      value={editedData.day ? new Date(editedData.day).toISOString().split("T")[0] : ""}
      onChange={handleChange}
      className="w-full px-2 py-1 bg-transparent"
    />
                                    </div>
                                   
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Current Affair:</label>
                                        <input
                                            type="text"
                                            name="aicurrentaffair"
                                            value={editedData.aicurrentaffair}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Fun Fact:</label>
                                        <input
                                            type="text"
                                            name="aifact"
                                            value={editedData.aifact}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">Historical Fact:</label>
                                        <input
                                            type="text"
                                            name="aihistory"
                                            value={editedData.aihistory}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-black">AI Future:</label>
                                        <input
                                            type="text"
                                            name="aifuture"
                                            value={editedData.aifuture}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md text-gray-500"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={handleAddFact}
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
