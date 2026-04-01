import React, { useState } from 'react';
import Header from './Layout/Header';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const users = [
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 76, attempts: 12, gaps: 0, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 73, attempts: 2, gaps: 2, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 66, attempts: 8, gaps: 2, status: 'Expired' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 82, attempts: 6, gaps: 0, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 78, attempts: 3, gaps: 3, status: 'Pending' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 78, attempts: 1, gaps: 1, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 78, attempts: 11, gaps: 5, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 78, attempts: 9, gaps: 4, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 78, attempts: 7, gaps: 2, status: 'Active' },
    { id: '#5089', email: 'manju@gmail.com', startDate: '06-01-2025', progress: 78, attempts: 5, gaps: 3, status: 'Active' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#00D114]';
      case 'Expired':
        return 'bg-[#FC003C]';
      case 'Pending':
        return 'bg-[#F98736]';
      default:
        return 'bg-gray-500';
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div>
  <Header/>
    <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8 font-poppins ">
   
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-medium mb-2">User Management</h1>
        <p className="text-white/70 text-sm md:text-base">Manage all users, track progress and monitor subscription status</p>
      </div>

      <div className="bg-[#1A2028] rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by User ID, Name, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none "
            />
          </div>

          <div className="relative w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-black text-white px-4 py-3 rounded-lg focus:outline-none appearance-none cursor-pointer text-white/70 "
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Pending</option>
            </select>
            <i className="fas fa-caret-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>

          <button className="bg-black text-white px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap text-white/70 ">
            <i className="fas fa-download"></i>
            Export to Excel
          </button>
        </div>
      </div>

      <div className=" overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E9E7FD] whitespace-nowrap ">
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">User ID</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Email ID</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Start Date</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Progress</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Attempts</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Gaps</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Subscription Status</th>
                <th className="text-center px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-[#8B909A] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="whitespace-nowrap border-b border-[#E9E7FD] transition text-center ">
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base">{user.id}</td>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base">{user.email}</td>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base">{user.startDate}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-[#1EEF32] h-2 rounded-full"
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[#1EEF32] text-sm font-medium">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base">{user.attempts}</td>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base">{user.gaps}</td>
                  <td className="px-4 md:px-6 py-4">
                    <span className={`${getStatusColor(user.status)} px-4 py-2 rounded-lg text-white text-sm font-medium inline-block min-w-[80px] text-center`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <button className=" hover:text-white text-sm ">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/70">Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-black text-white px-3 py-1 rounded border border-white focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-white/70">of 50</span>
          </div>

          <div className="flex gap-2">
            <button className="w-7 h-7 bg-[#F1F2F6] text-black rounded flex items-center justify-center hover:bg-gray-200 transition">
              <i className="fas fa-angle-left"></i>
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded flex items-center justify-center transition ${
                  currentPage === page
                    ? 'bg-[#F1F2F6] text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="w-7 h-7 bg-[#F1F2F6] text-black rounded flex items-center justify-center transition">
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>

      
    </div>
    </div>
  );
};

export default UserManagement;