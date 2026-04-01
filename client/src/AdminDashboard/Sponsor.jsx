import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Table from './Subscription/Table';
import Header from './Layout/Header';

const Sponsor = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
 
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeTable, setActiveTable] = useState("recentactivity");

  const columns = [
    { header: "sponsor id", accessor: "sponsorid" },
    { header: "sponsor name", accessor: "sponsorname" },
    { header: "sponsor package", accessor: "sponsorpackage" },
    { header: "total referrals", accessor: "totalreferrals" },
    { header: "active referrals", accessor: "activereferrals" },
    { header: "total commision", accessor: "commision" },
    { header: "this month", accessor: "thismonth" },
  ]

  const data = [
    { sponsorid: 'SKLRM9999', sponsorname: 'manjunath vijay', sponsorpackage: 'Premium ', totalreferrals: '10', activereferrals: '10',  commision: '$12,477.00', thismonth: '$124.00' },
    { sponsorid: 'SKLRM9999', sponsorname: 'manjunath vijay', sponsorpackage: 'Standard', totalreferrals: '10', activereferrals: '10', commision: '$9913.00', thismonth: '$124.00' },
    { sponsorid: 'SKLRM9999', sponsorname: 'manjunath vijay', sponsorpackage: 'Advanced', totalreferrals: '10', activereferrals: '10', commision: '$1335.00', thismonth: '$124.00' },
    { sponsorid: 'SKLRM9999', sponsorname: 'manjunath vijay', sponsorpackage: 'Premium ', totalreferrals: '10', activereferrals: '10', commision: '$516.00', thismonth: '$124.00' },
    { sponsorid: 'SKLRM9999', sponsorname: 'manjunath vijay', sponsorpackage: 'Basic', totalreferrals: '10', activereferrals: '10', commision: '$1429.00', thismonth: '$124.00' },
  ];

  const columns2 = [
    { header: "user id", accessor: "userid" },
    { header: "user name", accessor: "username" },
    { header: "sponsor id", accessor: "sponsorid" },
    { header: "sponsor name", accessor: "sponsorname" },
    { header: "sponsor package", accessor: "sponsorpackage" },
    { header: "user package", accessor: "userpackage" },
    { header: "amount", accessor: "amount" },
    { header: "referral %", accessor: "referral" },
    { header: "date credited", accessor: "date" },
    { header: "status", accessor: "status" },
  ]

  const data2 = [
    { userid: '#5089', username: 'manjunath vijay', sponsorid: '#5089', sponsorname: 'manjunath vijay',  sponsorpackage: 'Premium Learning ', userpackage: 'Premium Learning ', amount: '$1080', referral: '20%', date: '12-01-2025',  status: 'Paid' },
    { userid: '#5089', username: 'manjunath vijay', sponsorid: '#5089', sponsorname: 'manjunath vijay',  sponsorpackage: 'Basic Learning ', userpackage: 'Basic Learning', amount: '$1080', referral: '20%', date: '09-01-2025', status: 'Paid' },
    { userid: '#5089', username: 'manjunath vijay', sponsorid: '#5089', sponsorname: 'manjunath vijay',  sponsorpackage: 'Advanced Learning ', userpackage: 'Advanced Learning ', amount: '$1080', referral: '20%', date: '06-01-2025', status: 'Paid' },
    { userid: '#5089', username: 'manjunath vijay', sponsorid: '#5089', sponsorname: 'manjunath vijay',  sponsorpackage: 'Premium Learning ', userpackage: 'Premium Learning ', amount: '$1080', referral: '20%', date: '06-01-2025', status: 'Paid' },
    { userid: '#5089', username: 'manjunath vijay', sponsorid: '#5089', sponsorname: 'manjunath vijay',  sponsorpackage: 'Basic Learning ', userpackage: 'Basic Learning ', amount: '$1080', referral: '20%', date: '12-01-2025', status: 'Pending' },
  ];

  const dataWithoutButtons = data;
  const dataWithButtons = data2.map((item) => ({
    ...item,
    status: (
      <button className="bg-[#00D114] text-white px-3 py-1 rounded transition">
        {item.status}
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
        <h1 className="text-xl md:text-2xl font-medium mb-2">Sponsor & Referral Tracking</h1>
        <p className="text-white/70 text-sm md:text-base">Monitor sponsor relationships, referral commission, and performance metrics</p>
      </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2 ">
                <img src='/assets/merchant/blocks.svg' className=' w-6 '/>
                  <span className="text-sm">Total Referrals </span>
              </div>
              <div>
                <div className="text-xl font-semibold text-right ">1248</div>
                <p className=' text-[11px] text-white/70 '><span className='text-[#4CF85D]'>+52</span> This Month</p>
            </div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between">
              <div className="flex justify-between items-center gap-2">
                  <i className="fas fa-users text-blue-500"></i>
                  <span className="text-sm">Active Referrals</span>
              </div>
                <div>
                <div className="text-xl font-semibold text-right ">968</div>
                <p className=' text-[11px] text-white/70 '><span className='text-[#4CF85D]'>76.8% </span>Active Rate</p>
            </div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <img src='/assets/merchant/dollar.svg' className=' w-4 '/>
                  <span className="text-sm">Total Commission paid</span>
              </div>
                <div>
                <div className="text-xl font-semibold text-right ">$24,912</div>
                <p className=' text-[11px] text-white/70 text-right '><span className='text-[#4CF85D]'> +18.7% </span>vs Last Month</p>
            </div>
            </div>
          </div>

          <div className="bg-[#1A2028] rounded-2xl p-6 border border-[#F5EFFC33]">
            <div className="flex items-center justify-between ">
              <div className="flex items-start gap-2">
                <img src='/assets/merchant/badge.svg' className=' w-5 '/>
                  <span className="text-sm">Pending Commissions</span>
              </div>
              <div>
                <p className=' text-[11px] text-white/70 '>To be Processed</p>
                <div className="text-xl font-semibold text-right ">$3245</div>
            </div>
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
            <span className="text-sm">Active Referrals</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-[#8EF27E]/40 flex justify-center items-center ">
              <FontAwesomeIcon icon={faCheck} className=' text-xs text-[#8EF27E]'/>
            </div>
            <span className="text-sm">Total Referrals</span>
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

      <div>
        <p className="text-xl md:text-2xl font-medium mb-5 mt-10">Top Sponsor Performance</p>
      <Table columns={columns} data={dataWithoutButtons}/>
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

          <button className="bg-black text-white/70 px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap">
            <i className="fas fa-download"></i>
            Export to Excel
          </button>
        </div>
      </div>
        <div>
        <p className="text-xl md:text-2xl font-medium mb-5 mt-10">Referral Details</p>
      <Table columns={columns2} data={dataWithButtons}/>
       </div>


    </div>
    </div>
  );
};

export default Sponsor;