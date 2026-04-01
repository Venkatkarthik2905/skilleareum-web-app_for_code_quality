import React, {useState} from 'react'

const Table = ({ columns, data }) => {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('monthly');


  return (
       <div className=" overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E9E7FD] whitespace-nowrap ">
                {columns.map((col, index) => (
                <th key={index} className="text-center px-2 md:px-3 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider"> {col.header}</th>
                 ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
            data.map((row, rowIndex) => (
                <tr key={rowIndex} className="whitespace-nowrap border-b border-[#E9E7FD] transition text-center ">
                    {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-2 md:px-3 py-4 text-sm">
                    {row[col.accessor]}
                    {/* {colIndex === columns.length - 1 ? (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {row[col.accessor]}
      </button>
    ) : ( */}
      
    {/* )} */}
    </td>
                    ))}
                </tr>
            ))
          ) : (
             <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
            </tbody>
          </table>
        </div>

         <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4 mt-7 ">
          <div className="flex items-center gap-2 text-sm">
            <span className=" text-white/70 ">Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-black text-white px-3 py-1 rounded border focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-white/70">of 50</span>
          </div>

          <div className=" flex gap-1 ">
            <button className="w-7 h-7 bg-white text-black rounded flex items-center justify-center hover:bg-gray-200 transition">
              <i className="fas fa-angle-left"></i>
            </button>
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 text-sm font-medium rounded bg-white flex items-center justify-center transition ${
                  currentPage === page
                    ? ' text-black '
                    : ' text-black/70 '
                }`}
              > 
                {page}
              </button>
            ))}
            <button className="w-7 h-7 bg-white text-black/70 text-white rounded flex items-center justify-center transition">
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div> 
      </div>
  )
}

export default Table