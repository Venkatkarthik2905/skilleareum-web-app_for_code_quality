import React, {useState} from 'react'
import Header from './Layout/Header';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {

  const revenueData = [20, 35, 25, 45, 30, 50, 40, 60, 45, 65, 55, 75];

  const revenueOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#00FF0A"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#00FF0A",
            opacity: 0.4,
          },
          {
            offset: 100,
            color: "#00FF0A60",
            opacity: 0,
          },
        ],
      },
    },
    markers: {
      size: 4,
      colors: ["#000"],
      strokeColors: "#00FF0A",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: { show: false },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `$${val * 100}`,
      },
    },
  };

  const revenueSeries = [
    {
      name: "Revenue",
      data: revenueData,
    },
  ];

   const [period, setPeriod] = useState('Month');

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentMonthIndex = new Date().getMonth();

  const colors = months.map((_, index) =>
    index === currentMonthIndex
      ? "url(#blueGradient)" // gradient reference for current month
      : "#e5e7eb" // light gray for others
  );

  // Monthly User Growth Chart
  const monthlyGrowthOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%",
        distributed: true, // enable per-bar coloring
      },
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: "#3b82f6",
          fontSize: "11px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function (val) {
          return val + " users";
        },
      },
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
  };

const monthlyGrowthSeries = [
  {
    name: 'Users',
    data: [180, 120, 170, 140, 160, 240, 190, 130, 160, 145, 155, 250]
  }
];


  // Subscription Breakdown Donut Chart
  const subscriptionOptions = {
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    labels: ['Active', 'Expired', 'Pending'],
    colors: ['#1EEF32', '#0285FF', '#F8C140'],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '40%',
          background: 'transparent',
          labels: {
            show: false
          }
        }
      }
    },
    stroke: {
      width: 0
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function(val) {
          return val + ' users';
        }
      }
    }
  };

  const subscriptionSeries = [900, 178, 250];

  // Average User Task Completion Rate Chart
  const taskCompletionOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#2B94FF', '#00FF0A']
    },
    markers: {
      size: 5,
      colors: ['#2B94FF', '#00FF0A'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: ['0', '20', '40', '60', '80', '100', '120'],
      labels: {
        style: {
          colors: '#A098AE',
          fontSize: '11px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      borderColor: '#D1D1D1',
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'dark',
      shared: true,
      intersect: false
    }
  };

  const taskCompletionSeries = [
    {
      name: 'Rate 1',
      data: [30, 25, 45, 35, 55, 48, 38]
    },
    {
      name: 'Rate 2',
      data: [20, 35, 25, 45, 35, 50, 40]
    }
  ];

  // Impression Bar Chart
  const impressionOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
        colors: {
          ranges: [{
            from: 0,
            to: 100000,
            color: '#3b82f6'
          }]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function(val) {
          return val.toLocaleString();
        }
      }
    }
  };

  const impressionSeries = [{
    name: 'Impressions',
    data: [35000, 28000, 32000, 38000, 30000]
  }];


  return (
    <div className=' bg-black text-white '>
      <Header/>
      <div className=' md:px-14 px-5 py-10 '>
       <div className=" py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
     
          <div className=" space-y-10">
            <div className=" border-2 border-[#F5EFFC33] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <img src='/assets/merchant/blocks2.svg' className='w-6'/>
                  <div>
                  <span className="text-lg text-white">Active Subscriptions</span>
                   <p className="text-sm text-white/70 mt-1"><span className=' text-[#4CF85D] '>+8.2%{" "}</span>From Last Month</p>
                   </div>
                </div>
                <span className="text-xl md:text-2xl font-semibold">1932</span>
              </div>             
            </div>

            <div className=" border-2 border-[#F5EFFC33] rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img src='/assets/merchant/dollar.svg' className='mt-2'/>
                  <div>
                  <p className=" text-white text-lg ">Total Payments Received</p>
                </div>
                </div>
                <div className=''>
                <p className="text-right text-xl md:text-2xl font-semibold">$145,680</p>
                 <p className="text-right text-sm text-white/70 mt-1"><span className=' text-[#4CF85D] '>+22.5%</span> From Last Month</p>
              </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className=" border-2 border-[#F5EFFC33] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                 <i class="fa-solid fa-user-group" style={{color: '#0285FF', marginTop: "4px"}}></i>
                 <div>
                  <p className=" text-white text-lg ">Total Active Users</p>
                  <p className="text-sm text-white/70 mt-1"><span className=' text-[#4CF85D] '>+4.3% </span>From Last Month</p>
                  </div>
                </div>
                <span className=" text-xl md:text-2xl font-semibold">1,284</span>
              </div>
            </div>

            <div className=" border-2 border-[#F5EFFC33] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <img src='/assets/merchant/badge2.svg'/>
                  <div>
                  <p className="text-white text-lg">Referral Commissions Paid</p>
                </div>
                <div>
                <span className=" text-xl md:text-2xl font-semibold">68%</span>
                <p className="text-sm text-white/70 mt-1"><span className=' text-[#4CF85D] '>+5.6%</span> From Last Month</p>
                </div>
                    </div>
              </div>
            
            </div>
          </div>

          <div className=" border-2 border-[#F5EFFC33] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-semibold">Payment Summary</h3>
              <span className="text-2xl font-medium text-[#00FF0A]">$24,560</span>
            </div>
             <p className="text-sm text-white/70"><span className=' text-[#00FF0A] '>+18.2%</span> Growth From Last Month</p>
              <ReactApexChart
        options={revenueOptions}
        series={revenueSeries}
        type="area"
        height={150}
      />
            {/* <div className="h-32 flex items-end gap-1">
              {revenueData.map((value, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t" style={{ height: `${value}%` }}></div>
              ))}
            </div> */}
          </div>
        </div>
      <div className=' border-2 border-[#F5EFFC33] rounded-2xl mb-6 '>
      <div className="bg-black border-b-2 border-[#F5EFFC33] rounded-t-2xl p-6">
        <div className="flex md:flex-row flex-col gap-7 md:gap-0 items-center justify-between">
          <div className="flex sm:flex-row flex-col items-center gap-12">
            <div>
              <div className=" mb-1">Total Users</div>
              <div className=" text-xl md:text-3xl font-bold">345,678</div>
            </div>
            <div>
              <div className=" mb-1">New User</div>
              <div className="flex items-center gap-2">
                <span className="bg-[#86F552] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  <i className="fas fa-arrow-up" style={{color: 'black'}}></i> 
                </span>
                <span className="text-xl md:text-2xl font-bold">38</span>
              </div>
            </div>
            <div>
              <div className=" mb-1">Growth</div>
              <div className="text-2xl font-bold text-[#00FF0A] ">+10%</div>
            </div>
            <div>
              <div className=" mb-1">Period</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">Month</span>
                <i className="fas fa-chevron-down text-sm"></i>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Subscription Status Overview</span>
            <i className="fas fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>

   <div className="bg-black rounded-b-2xl p-6 relative">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>

      <ReactApexChart
        options={monthlyGrowthOptions}
        series={monthlyGrowthSeries}
        type="bar"
        height={220}
      />
    </div>


      </div>
      <div className="flex md:flex-row flex-col gap-6">
        <div className=" md:w-[25%] bg-black border border-[#F5EFFC33] rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 text-center ">Subscription Breakdown</h3>
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48">
              <ReactApexChart
                options={subscriptionOptions}
                series={subscriptionSeries}
                type="donut"
                height={192}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1EEF32]"></div>
                <span className="text-sm ">Active</span>
              </div>
              <span className="text-sm font-semibold text-[#1EEF32] ">968 Users</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0285FF] "></div>
                <span className="text-sm ">Expired</span>
              </div>
              <span className="text-sm font-semibold text-[#0285FF] ">78 Users</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F8C140]"></div>
                <span className="text-sm ">Pending</span>
              </div>
              <span className="text-sm font-semibold text-[#F8C140]">220 Users</span>
            </div>
          </div>
        </div>

        <div className=" md:w-[75%] flex md:flex-row flex-col gap-12 bg-black border border-[#F5EFFC33] rounded-2xl p-6">
          <div className=' md:w-[55%] '>
          <h3 className="text-lg font-semibold mb-4">Average User Task Completion Rate</h3>
          <ReactApexChart
            options={taskCompletionOptions}
            series={taskCompletionSeries}
            type="line"
            height={280}
          />
          </div>
 
          <div className=' md:w-[45%] '>
          <h3 className="text-xl font-semibold mb-6">Weekly Stats</h3>
          <div className="flex items-center justify-start gap-14 mb-8">
            <div>
              <div className=" text-sm mb-1">This Week</div>
              <div className="text-xl font-bold text-[#00FF0A]">+ 20%</div>
            </div>
            <div>
              <div className=" text-sm mb-1">Last Week</div>
              <div className="text-xl font-bold text-[#2B94FF]">+ 13%</div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-4">Impression</h4>
            <ReactApexChart
              options={impressionOptions}
              series={impressionSeries}
              type="bar"
              height={140}
            />
          </div>

          <div className="flex items-end justify-between text-xs mt-2 px-5">
            <span className="text-[#717171] font-bold text-sm ">12,345</span>
            <span className="text-[#A098AE]"> <span className=' text-[#86F552] '>5.4K</span> than last year</span>
          </div>
          </div>

        </div>
        </div>

        

      </div>
      </div>
  
  )
}

export default Dashboard