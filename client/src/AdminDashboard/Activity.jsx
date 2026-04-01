import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Table from './Subscription/Table';
import Header from './Layout/Header';

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
 
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeTable, setActiveTable] = useState("recentactivity");

  const columns = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "activity date", accessor: "activitydate" },
    { header: "activity type", accessor: "activitytype" },
    { header: "module/task", accessor: "module" },
    { header: "task duration", accessor: "taskduration" },
    { header: "activity status", accessor: "status" },
  ]

  const data = [
    { userid: '#5089', username: 'manjunath vijay', activitydate: '06-01-2025', activitytype: 'Learning Module', module: 'Module 4',  taskduration: '45 Min', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', activitydate: '06-01-2025', activitytype: 'Daily Tasks', module: 'Daily Task', taskduration: '20 Min', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', activitydate: '06-01-2025', activitytype: 'Quiz', module: 'Quiz 3', taskduration: '10 Min', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', activitydate: '06-01-2025', activitytype: 'Learning Module', module: 'Module 5', taskduration: '15 Min', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', activitydate: '06-01-2025', activitytype: 'Learning Assessment', module: 'AI Assessment', taskduration: '30 Min', status: 'Completed' },
  ];

  const columns2 = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "total modules", accessor: "totalmodules" },
    { header: "completed", accessor: "completed" },
    { header: "progress", accessor: "progress" },
    { header: "last activity", accessor: "lastactivity" },
  ]

  const data2 = [
    { userid: '#5089', username: 'manjunath vijay', totalmodules: '10', completed: '8', progress: '75',  lastactivity: '06-01-2025' },
    { userid: '#5089', username: 'manjunath vijay', totalmodules: '10', completed: '8', progress: '75', lastactivity: '06-01-2025' },
    { userid: '#5089', username: 'manjunath vijay', totalmodules: '10', completed: '8', progress: '75', lastactivity: '06-01-2025' },
    { userid: '#5089', username: 'manjunath vijay', totalmodules: '10', completed: '8', progress: '75', lastactivity: '06-01-2025' },
    { userid: '#5089', username: 'manjunath vijay', totalmodules: '10', completed: '8', progress: '75', lastactivity: '06-01-2025' },
  ];

  const columns3 = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "module/task", accessor: "module" },
    { header: "total attempts", accessor: "totalattempt" },
    { header: "first attempt", accessor: "firstattempt" },
    { header: "last attempt", accessor: "lastattempt" },
    { header: "activity status", accessor: "status" },
  ]

  const data3 = [
    { userid: '#5089', username: 'manjunath vijay', module: 'Module 4', totalattempt: '10', firstattempt: '06-01-2025', lastattempt: '12-01-2025',  status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', module: 'Daily Task', totalattempt: '10', firstattempt: '06-01-2025', lastattempt: '09-01-2025', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', module: 'Quiz 3', totalattempt: '10', firstattempt: '06-01-2025', lastattempt: '06-01-2025', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', module: 'Module 5', totalattempt: '10', firstattempt: '06-01-2025', lastattempt: '06-01-2025', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', module: 'AI Assessment', totalattempt: '10', firstattempt: '06-01-2025', lastattempt: '12-01-2025', status: 'Completed' },
  ];

  const dataWithButtons = data.map((item) => ({
    ...item,
    status: (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {item.status}
      </button>
    ),
  }));

  
  const dataWithButtons2 = data3.map((item) => ({
    ...item,
    status: (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {item.status}
      </button>
    ),
  }));

  const dataWithProgress = data2.map((item) => ({
    ...item,
    progress: (
      <div className='w-[75%] mx-auto flex items-center gap-2 '>
     <div className="w-full bg-white h-2 rounded-full ">
        <div
          className="bg-[#1EEF32] h-2 rounded"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
      <p className='text-xs text-[#1EEF32]'>{item.progress}%</p>
      </div>
    ),
  }));


  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const referralData = [8000, 10000, 12500, 14612.33, 12000, 11000];
  const revenueData = [9000, 11500, 11800, 9500, 14200, 15200];

  const chartOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#2B3FF2", "#8EF27E"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#1e293b", "#1e293b"],
      strokeColors: ["#2B3FF2", "#8EF27E"],
      strokeWidth: 3,
      hover: { size: 8 },
    },
    grid: {
      borderColor: "#1f2937",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: false,
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    { name: "Referral Cut", data: referralData },
    { name: "Revenue", data: revenueData },
  ];

  
  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8 font-poppins ">
      <div className="flex lg:flex-row flex-col gap-10 mb-6">
        <div className=' lg:w-[60%] '>
        <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-medium mb-2">Subscription & Payment Tracking</h1>
        <p className="text-white/70 text-sm md:text-base">Monitor Subscriptions, Payment History, and referral breakdown</p>
      </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2 ">
                <img src='/assets/merchant/blocks.svg' className=' w-6 '/>
                  <span className="text-sm">Total Activities</span>
              </div>
                <div className="text-xl font-semibold">247</div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between">
              <div className="flex justify-between items-center gap-2">
                  <i className="fas fa-users text-blue-500"></i>
                  <span className="text-sm">Weekly Activities</span>
              </div>
                <div className="text-xl font-semibold">153</div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <img src='/assets/merchant/dollar.svg' className=' w-4 '/>
                  <span className="text-sm">Monthly Activities</span>
              </div>
                <div className="text-xl font-semibold">6842</div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between ">
              <div className="flex items-start gap-2">
                <img src='/assets/merchant/badge.svg' className=' w-5 '/>
                  <span className="text-sm">Average Completion Rate</span>
              </div>
                <div className="text-xl font-semibold">77%</div>
            </div>
          </div>
        </div>
        
        </div>

       <div className=" lg:w-[40%] bg-[#1A2028] border border-white/30 rounded-3xl px-4 pt-4 text-white ">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-medium">Task Completion Stats</h2>
          <p className="text-[#818181] text-sm">Based on user activity</p>
        </div>  
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex bg-[#141920] rounded p-1 text-xs overflow-hidden">
          <button
            className={`px-3 py-1 text-xs ${
              isMonthly ? "bg-[#1A2028] text-white rounded" : "text-[#818181]"
            }`}
            onClick={() => setIsMonthly(true)}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 text-xs ${
              !isMonthly ? "bg-[#1A2028] text-white rounded" : "text-[#818181]"
            }`}
            onClick={() => setIsMonthly(false)}
          >
            Monthly
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-[#2B3FF2]/40 flex justify-center items-center ">
              <FontAwesomeIcon icon={faCheck} className=' text-xs text-[#2B3FF2]'/>
            </div>
            <span className="text-sm">Tasks</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-[#8EF27E]/40 flex justify-center items-center ">
              <FontAwesomeIcon icon={faCheck} className=' text-xs text-[#8EF27E]'/>
            </div>
            <span className="text-sm">Season Activities</span>
          </div>
        </div>
      </div>

      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={180}
      />
    </div>
      </div>

      <div className="bg-[#1A2028] rounded-lg p-4 md:p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by User ID, Name, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black text-white/70 pl-12 pr-4 py-3 rounded-lg focus:outline-none"
            />
          </div>

          <div className="relative w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-black text-white/70 px-4 py-3 rounded-lg focus:outline-none appearance-none cursor-pointer"
            >
              <option>All Time</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Pending</option>
            </select>
            <i className="fas fa-caret-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>

             <div className="relative w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-black text-white/70 px-4 py-3 rounded-lg focus:outline-none appearance-none cursor-pointer"
            >
              <option>All Type</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Pending</option>
            </select>
            <i className="fas fa-caret-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>

          <button className="bg-black text-white/70 px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap">
            <i className="fas fa-download"></i>
            Export to Excel
          </button>
        </div>
      </div>

      <div className="bg-[#1A2028] rounded-lg p-4 mb-6 ">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setActiveTable("recentactivity")} className="px-6 py-2 bg-black rounded-md transition text-sm">
          <p className={` ${activeTable === 'recentactivity' ? 'bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-transparent bg-clip-text' : 'text-white/70' } `}>Recent Activities</p>
          </button>
          <button onClick={() => setActiveTable("completionreport")} className=" px-6 py-2 bg-black text-white/70 rounded-md transition text-sm">
           <p className={` ${activeTable === 'completionreport' ? 'bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-transparent bg-clip-text' : 'text-white/70' } `}>Completion Reports</p>
          </button>
          <button onClick={() => setActiveTable("attemptreports")} className=" px-6 py-2 bg-black text-white/70 rounded-md transition text-sm">
            <p className={` ${activeTable === 'attemptreports' ? 'bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-transparent bg-clip-text' : 'text-white/70' } `}>Attempt Reports</p>
          </button>
        </div>
      </div>

     {activeTable === 'recentactivity' && <Table columns={columns} data={dataWithButtons} /> }
     {activeTable === 'completionreport' && <Table columns={columns2} data={dataWithProgress} /> }
     {activeTable === 'attemptreports' && <Table columns={columns3} data={dataWithButtons2} /> }

    </div>
    </div>
  );
};

export default Activity;