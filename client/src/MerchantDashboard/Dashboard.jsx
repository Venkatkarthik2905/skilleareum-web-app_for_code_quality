import React, { useState } from 'react'
import Header from './Layout/Header';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';


const Dashboard = () => {

 
  const [merchant, setMerchant] = useState(null);

  useEffect(() => {
    try {
      const persistRoot = JSON.parse(
        localStorage.getItem("persist:root")
      );

      if (persistRoot?.merchant) {
        setMerchant(JSON.parse(persistRoot.merchant));
      }
    } catch (err) {
      console.error("Failed to load merchant", err);
    }
  }, []);


  //console.log("Merchant:", merchant);
  const [enrollementStats, setEnrollementStats] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollmentStats = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/merchant/get-user-day`);
        console.log("res", response.data)

        if (response.data.success) {
          setEnrollementStats(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch enrollment stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentStats();
  }, []);

  // Total months for the chart
  const totalMonths = 12;

  // Generate last 12 months dynamically
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const lastMonths = [];
  const today = new Date();
  for (let i = totalMonths - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastMonths.push(`${monthNames[d.getMonth()]} ${d.getFullYear()}`);
  }

  // Split completed learners across months (simple approximation)
  const active = [];
  const dropoff = [];
  if (enrollementStats?.enrolled) {
    const completedPerMonth = enrollementStats.completed / totalMonths;

    for (let i = 0; i < totalMonths; i++) {
      const monthActive = Math.max(Math.round(enrollementStats.completed - completedPerMonth * i), 0);
      active.push(monthActive);

      const monthDropoff = enrollementStats.enrolled - monthActive;
      dropoff.push(monthDropoff);
    }
  }

  // ApexCharts series
  const chartSeries = [
    { name: "Active Learners", data: active, type: "area" },
    { name: "Drop-off", data: dropoff, type: "area" }
  ];

  // Chart options
  const chartOptions = {
    chart: {
      type: 'area',
      height: 200,
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true, speed: 800 }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.3, stops: [0, 100] }
    },
    xaxis: {
      categories: lastMonths, // <-- X-axis is now last 12 months
      labels: { style: { colors: '#9ca3af', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: [
      {
        title: { text: '' },
        min: 0,
        max: enrollementStats?.enrolled || 3000,
        tickAmount: 6,
        labels: {
          formatter: (val) => (val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val.toFixed(1)),
          style: { colors: '#9ca3af', fontSize: '11px' }
        }
      }
    ],
    tooltip: { enabled: true, shared: true, intersect: false },
    legend: { show: false },
    colors: ['#14b8a6', '#ef4444'],
    annotations: {
      points: [
        {
          x: lastMonths[totalMonths - 1], // Last month
          y: enrollementStats?.lastMonthCompleted || 0,
          marker: { size: 6, fillColor: '#FF0000', strokeColor: '#fff', strokeWidth: 2 },
          label: {
            text: 'Last Month Completed',
            style: { color: '#fff', background: '#FF0000', fontSize: '11px', fontWeight: 500 }
          }
        }
      ]
    }
  };


  // token balance

  const [balanceData, setBalanceData] = useState(0);

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/merchant/get-token-balance`);
        console.log("balance", response.data)

        if (response.data) {
          setBalanceData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch balance data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, []);

  // const totalTokenBalance = balanceData?.totalTokenBalance || 0;
  // const totalUsers = enrollementStats?.enrolled || 1; 

  // const averageSPPerLearner = (totalTokenBalance / totalUsers).toFixed(2);

  // Total SP per learner (current month)
  const averageSPPerLearner = enrollementStats?.completed
    ? balanceData.totalTokenBalance / enrollementStats.completed
    : 0;

  // Percentage average SP per learner (current month) relative to total token balance
  const percentageAverageSPPerLearner = enrollementStats?.completed
    ? (averageSPPerLearner / balanceData.totalTokenBalance) * 100
    : 0;

  // Last month SP per learner
  const lastMonthAverageSPPerLearner = enrollementStats?.lastMonthCompleted
    ? balanceData.totalTokenBalance / enrollementStats.lastMonthCompleted
    : 0;

  // Percentage of last month SP per learner relative to total token balance
  const percentageLastMonthAverageSPPerLearner = enrollementStats?.lastMonthCompleted
    ? (lastMonthAverageSPPerLearner / balanceData.totalTokenBalance) * 100
    : 0;


  // recent activity
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/merchant/get-recent-activity`);
        console.log("recent activity", response.data);

     
        if (response.data) {         
          setRecentActivities(Array.isArray(response.data) ? response.data : response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch recent activity", error);
        setRecentActivities([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now - past; // difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years + ` year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return months + ` month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return days + ` day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return hours + ` hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return minutes + ` minute${minutes > 1 ? 's' : ''} ago`;
    return seconds + ` second${seconds !== 1 ? 's' : ''} ago`;
  }



  return (
    <div className=' bg-black '>
      <Header />
      <div className="p-6 max-w-7xl mx-auto font-poppins text-white ">
        <div className="flex items-start md:items-center justify-between mb-6 ">
          <div>
            <h1 className="text-xl font-medium mb-1 ">Merchant Dashboard</h1>
            <p className="font-light text-sm text-white/70 ">Welcome back! Here is an overview of your organization performance.</p>
          </div>
          {/* <button className=" mt-2 md:mt-0 flex md:items-center gap-2 text-sm text-white font-inter ">
            <i class="fa-regular fa-bell"></i>
            <p className='md:block hidden'>Notifications</p>
          </button> */}
        </div>

        <div
          className=" bg-[#1A2028]/95 border-2 border-[#414955] rounded-2xl  mb-6 h-full bg-cover bg-center bg-norepeat relative overflow-hidden ">
          <img src='/assets/merchant/waves.svg' className='absolute z-10 rounded-2xl' />
          <img src='/assets/merchant/wavescolor.svg' className='absolute w-7/12 right-0 opacity-90 z-0 blur-xl ' />
          <div className=' bg-[#EFEFEF]/50 w-48 h-10 blur-lg z-0 absolute bottom-3 ' />
          <div className=' bg-[#1A202803]/5 backdrop-blur md:p-6 p-10 rounded-2xl '>
            <div className="rounded-2xl flex items-center justify-between">
              <div className="w-full flex md:flex-row flex-col items-center gap-4 font-inter ">
                <img
                  src="/assets/merchant/profile.svg"
                  alt="Profile"
                  className="w-24 h-24 border-4 rounded-full object-cover"
                />
                <div>

                  <div className="flex md:flex-row flex-col items-center gap-3 mb-2">
                    <h2 className="text-xl font-medium">{merchant?.name}</h2>
                    {/* <button className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-white text-xs px-3 py-2 border rounded flex items-center gap-2">
                    Edit Profile 
                    <i class="fa-solid fa-user-pen"></i>
                  </button> */}
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8 text-sm mt-5 ">
                    <div>
                      <span className="text-white/70 font-medium">Email Id</span>{' '}
                      <span className="text-white">{merchant?.email}</span>
                    </div>
                    <div>
                      <span className="text-white/70 font-medium">Merchant ID</span>{' '}
                      <span className="text-white">{merchant?.merchantId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='z-30 w-full h-10 rounded-b-2xl bg-gradient-to-r from-[#2B3FF2] to-[#9195B8] '></div>
        </div>

        <div className="my-10">
          <div className="w-full flex justify-between mb-2">
            <p>Completion vs Enrollments</p>
            <p>
              <span className="text-xl">
                {enrollementStats?.completed}
              </span>{" "}
              / {enrollementStats?.enrolled}
              <span className="ml-2 text-sm text-gray-500">
                ({enrollementStats?.completionPercentage}%)
              </span>
            </p>
          </div>

          <div className="w-full bg-white h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] h-full rounded-full transition-all duration-500"
              style={{ width: `${enrollementStats?.completionPercentage}%` }}
            ></div>
          </div>
        </div>



        <div className="flex lg:flex-row flex-col gap-5 mb-3 ">
          <div className=' w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-5 '>
            <div className=" space-y-10">
              <div className=" border-2 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <img src='/assets/merchant/blocks.svg' className='w-6' />
                    <div>
                      <span className="text-white">Average SP per Learner</span>
                      <p className="text-xs text-white/70 mt-1"><span className=' text-[#4CF85D] '>+{percentageLastMonthAverageSPPerLearner.toFixed(2)}% </span>From Last Month</p>
                    </div>
                  </div>
                  <span className="text-xl md:text-2xl font-semibold">{percentageAverageSPPerLearner.toFixed(2)}%</span>
                </div>

              </div>

              <div className=" border-2 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <img src='/assets/merchant/dollar.svg' />
                    <div>
                      <span className="text-white">Total Revenue</span>
                      <p className="text-xs text-white/70 mt-1"><span className=' text-[#4CF85D] '>{balanceData?.totalPaidUser}</span> Total paid users</p>
                    </div>
                  </div>
                  <span className="text-xl md:text-2xl font-semibold">${(balanceData?.total_revenue ?? 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className=" border-2 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <i class="fa-solid fa-user-group" style={{ color: '#0285FF' }}></i>
                    <div>
                      <p className="text-white">Certification Readiness</p>
                      <p className="text-xs text-white/70 mt-1"><span className=' text-[#4CF85D] '>+{enrollementStats?.lastMonthPercentage}% </span>From Last Month</p>
                    </div>
                  </div>
                  <span className=" text-xl md:text-2xl font-semibold">{enrollementStats?.completionPercentage}%</span>
                </div>
              </div>

              <div className=" border-2 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <img src='/assets/merchant/badge.svg' />
                    <div>
                      <span className="text-white">Completion Integrity</span>
                      <p className="text-sm text-white/70 mt-1"><span className=' text-[#4CF85D] '>+{enrollementStats?.lastMonthPercentage}%</span> From Last Month</p>
                    </div>
                  </div>
                  <span className=" text-xl md:text-2xl font-semibold">{enrollementStats?.completionPercentage}%</span>
                </div>

              </div>
            </div>
          </div>

          <div className='w-full lg:w-[40%] bg-white p-3'>
            <div className="mb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-gray-800 text-lg font-semibold mb-1">Day-wise Drop-offs</p>
                  <p className="text-gray-500 text-xs">Learner retention over the course duration</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span className="text-gray-600 text-xs">Active Learners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-gray-600 text-xs">Drop-off</span>
                  </div>
                </div>
              </div>
            </div>

            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={200}
            />
          </div>

        </div>

        <div className="font-poppins">
          <h2 className="text-xl font-medium mb-1">Recent Activity</h2>
          <p className="text-white/70 text-sm mb-6">Track your users recent activity and performance</p>

          <div className="space-y-3 ">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, i) => {
                const relativeTime = timeAgo(activity.created_at);
                return (
                  <div
                    key={i}
                    className="overflow-x-auto bg-white/10 rounded-lg p-5 flex items-center justify-between"
                  >
                    <p className="font-medium whitespace-nowrap px-5">
                      {activity.referral_code || 'Unknown Id'}
                    </p>
                    <p className="font-medium whitespace-nowrap px-5">
                      {activity.email || '-'}
                    </p>
                    
                    <p className="text-sm text-white whitespace-nowrap px-5 text-left">
                      {activity.action || '-'}
                    </p>
                    <span className="text-sm whitespace-nowrap px-5">{relativeTime}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-white/70 text-sm">No recent activity found.</p>
            )}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard