import React, { useState } from 'react';
import Header from '../Layout/Header';
import ReactApexChart from "react-apexcharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';

const SubscriptionTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
 
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeTable, setActiveTable] = useState("table1");

  const columns = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "package", accessor: "package" },
    { header: "amount", accessor: "amount" },
    { header: "start date", accessor: "startdate" },
    { header: "renewal date", accessor: "renewaldate" },
    { header: "subscription status", accessor: "status" },
  ]

  const data = [
    { userid: '#5089', username: 'manjunath vijay', package: 'Premium Learning', amount: '$1080', startdate: '06-01-2025', renewaldate: '05-01-2026', status: 'Active' },
    { userid: '#5089', username: 'manjunath vijay', package: 'Basic Learning', amount: '$180', startdate: '06-01-2025', renewaldate: '05-01-2026', status: 'Active' },
    { userid: '#5089', username: 'manjunath vijay', package: 'Advanced Learning', amount: '$580', startdate: '06-01-2025', renewaldate: '05-01-2026', status: 'Active' },
    { userid: '#5089', username: 'manjunath vijay', package: 'Premium Learning', amount: '$1080', startdate: '06-01-2025', renewaldate: '05-01-2026', status: 'Active' },
    { userid: '#5089', username: 'manjunath vijay', package: 'Basic Learning', amount: '$180', startdate: '06-01-2025', renewaldate: '05-01-2026', status: 'Active' },
  ];

  const columns2 = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "date", accessor: "date" },
    { header: "time", accessor: "time" },
    { header: "amount", accessor: "amount" },
    { header: "package", accessor: "package" },
    { header: "referral 20%", accessor: "referral" },
    { header: "subscription status", accessor: "status" },

  ]

  const data2 = [
    { userid: '#5089', username: 'manjunath vijay', date: '06-01-2025', time: '14:32:00',amount: '$1080', package: 'Premium Learning', referral: '$99.80', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', date: '06-01-2025', time: '14:32:00',amount: '$1080', package: 'Basic Learning', referral: '$9.80', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', date: '06-01-2025', time: '14:32:00',amount: '$1080', package: 'Advanced Learning', referral: '$120', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', date: '06-01-2025', time: '14:32:00',amount: '$1080', package: 'Premium Learning', referral: '$19', status: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', date: '06-01-2025', time: '14:32:00',amount: '$1080', package: 'Basic Learning', referral: '$64', status: 'Completed' },
  ];

  const columns3 = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "upgrade date", accessor: "upgradedate" },
    { header: "from package", accessor: "frompackage" },
    { header: "to package", accessor: "topackage" },
    { header: "additional amount", accessor: "additionalamt" },
    { header: "account upgrade", accessor: "accountupgrade" },
  ]

  const data3 = [
    { userid: '#5089', username: 'manjunath vijay', upgradedate: '06-01-2025', frompackage: 'Premium Learning', topackage: 'Premium Learning', additionalamt: '$1080',  accountupgrade: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', upgradedate: '06-01-2025', frompackage: 'Basic Learning', topackage: 'Basic Learning', additionalamt: '$180', accountupgrade: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', upgradedate: '06-01-2025', frompackage: 'Advanced Learning', topackage: 'Advanced Learning', additionalamt: '$580', accountupgrade: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', upgradedate: '06-01-2025', frompackage: 'Premium Learning', topackage: 'Premium Learning', additionalamt: '$1080', accountupgrade: 'Completed' },
    { userid: '#5089', username: 'manjunath vijay', upgradedate: '06-01-2025', frompackage: 'Basic Learning', topackage: 'Basic Learning', additionalamt: '$180', accountupgrade: 'Completed' },
  ];

  const dataWithButtons = data.map((item) => ({
    ...item,
    status: (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {item.status}
      </button>
    ),
  }));

  const dataWithButtons2 = data2.map((item) => ({
    ...item,
    status: (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {item.status}
      </button>
    ),
  }));

  const dataWithButtons3 = data3.map((item) => ({
    ...item,
    accountupgrade: (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {item.accountupgrade}
      </button>
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
                <img src='/assets/merchant/blocks2.svg' className=' w-6 '/>
                  <span className="text-sm">Total Subscriptions</span>
              </div>
                <div className="text-xl font-semibold">986</div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between">
              <div className="flex justify-between items-center gap-2">
                  <i className="fas fa-users text-blue-500"></i>
                  <span className="text-sm">Active Subscriptions</span>
              </div>
                <div className="text-xl font-semibold">892</div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <img src='/assets/merchant/dollar.svg' className=' w-4 '/>
                  <span className="text-sm">Revenue This Month</span>
              </div>
                <div className="text-xl font-semibold">$24,560</div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between ">
              <div className="flex items-start gap-2">
                <img src='/assets/merchant/badge2.svg' className=' w-5 '/>
                  <span className="text-sm">Referral Commissions Paid</span>
              </div>
                <div className="text-xl font-semibold">$4,912</div>
            </div>
          </div>
        </div>
        
        </div>

       <div className=" lg:w-[40%] bg-[#1A2028] border border-white/30 rounded-3xl px-4 pt-4 text-white ">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-medium">Revenue And Referral Commission</h2>
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
            Monthly
          </button>
          <button
            className={`px-3 py-1 text-xs ${
              !isMonthly ? "bg-[#1A2028] text-white rounded" : "text-[#818181]"
            }`}
            onClick={() => setIsMonthly(false)}
          >
            Yearly
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-[#2B3FF2]/40 flex justify-center items-center ">
              <FontAwesomeIcon icon={faCheck} className=' text-xs text-[#2B3FF2]'/>
            </div>
            <span className="text-sm">Referral Cut</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-[#8EF27E]/40 flex justify-center items-center ">
              <FontAwesomeIcon icon={faCheck} className=' text-xs text-[#8EF27E]'/>
            </div>
            <span className="text-sm">Revenue</span>
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
              <option>All Status</option>
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
          <button onClick={() => setActiveTable("table1")} className="px-6 py-2 bg-black rounded-md transition text-sm">
          <p className={` ${activeTable === 'table1' ? 'bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-transparent bg-clip-text' : 'text-white/70' } `}>Export to Excel</p>
          </button>
          <button onClick={() => setActiveTable("table2")} className=" px-6 py-2 bg-black text-white/70 rounded-md transition text-sm">
           <p className={` ${activeTable === 'table2' ? 'bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-transparent bg-clip-text' : 'text-white/70' } `}>Export to Excel</p>
          </button>
          <button onClick={() => setActiveTable("table3")} className=" px-6 py-2 bg-black text-white/70 rounded-md transition text-sm">
            <p className={` ${activeTable === 'table3' ? 'bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-transparent bg-clip-text' : 'text-white/70' } `}>Export to Excel</p>
          </button>
        </div>
      </div>

     {activeTable === 'table1' && <Table columns={columns} data={dataWithButtons} /> }
     {activeTable === 'table2' && <Table columns={columns2} data={dataWithButtons2} /> }
     {activeTable === 'table3' && <Table columns={columns3} data={dataWithButtons3} /> }

    </div>
    </div>
  );
};

export default SubscriptionTracking;