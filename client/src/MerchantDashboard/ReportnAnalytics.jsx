import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Header from './Layout/Header';
import { SERVER_URL } from '../config';
import axios from 'axios';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const ReportsAnalytics = () => {
  const [sequenceData, setSequenceData] = useState([]);
  const [sequenceCount, setSequenceCount] = useState({
    SEQ_A_Count: 0,
    SEQ_B_Count: 0,
    SEQ_C_Count: 0,
    SEQ_D_Count: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSequenceData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/merchant/get-sequence-data`
        );

        console.log("sequence", response.data);

        if (response.data.success) {
          setSequenceData(response.data.data);
          setSequenceCount(response.data.counts);
        }
      } catch (error) {
        console.error("Failed to fetch sequence data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSequenceData();
  }, []);


  // seq chart
  const monthMap = {};

  sequenceData.forEach(item => {
    const month = dayjs(item.created_at).format('MMM YYYY');

    if (!monthMap[month]) {
      monthMap[month] = {
        'SEQ-A': 0,
        'SEQ-B': 0,
        'SEQ-C': 0,
        'SEQ-D': 0,
      };
    }

    monthMap[month][item.seq] += 1;
  });

  const sequenceLabels = Object.keys(monthMap).sort(
    (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
  );

  const buildSeriesData = (seq) =>
    sequenceLabels.map(month => monthMap[month][seq] || 0);

  const skillProgressionOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    xaxis: {
      categories: sequenceLabels,
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '12px',
        },
      },
    },
    grid: {
      borderColor: '#1f2937',
    },
    legend: { show: false },
    colors: ['#8b5cf6', '#10b981', '#3b82f6', '#f97316'],
  };

  const skillProgressionSeries = [
    {
      name: 'Concept-First (SEQ-A)',
      data: buildSeriesData('SEQ-A'),
    },
    {
      name: 'Visual-to-Action (SEQ-B)',
      data: buildSeriesData('SEQ-B'),
    },
    {
      name: 'Narrative-Reasoning (SEQ-C)',
      data: buildSeriesData('SEQ-C'),
    },
    {
      name: 'Momentum-Driven (SEQ-D)',
      data: buildSeriesData('SEQ-D'),
    },
  ];

  // seq distribution
  const totalSeq =
    sequenceCount.SEQ_A_Count +
    sequenceCount.SEQ_B_Count +
    sequenceCount.SEQ_C_Count +
    sequenceCount.SEQ_D_Count;

  const seqPercentages = totalSeq > 0 ? {
    A: ((sequenceCount.SEQ_A_Count / totalSeq) * 100).toFixed(1),
    B: ((sequenceCount.SEQ_B_Count / totalSeq) * 100).toFixed(1),
    C: ((sequenceCount.SEQ_C_Count / totalSeq) * 100).toFixed(1),
    D: ((sequenceCount.SEQ_D_Count / totalSeq) * 100).toFixed(1),
  } : { A: 0, B: 0, C: 0, D: 0 };

  const packageSeries = [
    Number(seqPercentages.A),
    Number(seqPercentages.B),
    Number(seqPercentages.C),
    Number(seqPercentages.D),
  ];

  const packageOptions = {
    chart: {
      type: 'donut',
    },
    labels: [
      `SEQ-A: ${seqPercentages.A}%`,
      `SEQ-B: ${seqPercentages.B}%`,
      `SEQ-C: ${seqPercentages.C}%`,
      `SEQ-D: ${seqPercentages.D}%`,
    ],
    colors: ['#8b5cf6', '#10b981', '#3b82f6', '#f97316'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff'],
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  };


  const learningStyles = [
    {
      name: 'Concept-First (Analytical / Accuracy)',
      color: 'bg-purple-500',
      count: sequenceCount?.SEQ_A_Count,
      percentageColor: 'text-green-600'
    },
    {
      name: 'Visual-to-Action (Task / Kinesthetic)',
      color: 'bg-blue-500',
      count: sequenceCount.SEQ_B_Count,
      percentageColor: 'text-yellow-600'
    },
    {
      name: 'Narrative-Reasoning (Intuitive / Accuracy)',
      color: 'bg-teal-500',
      count: sequenceCount.SEQ_C_Count,
      percentageColor: 'text-yellow-600'
    },
    {
      name: 'Momentum-Driven (Speed / Reward)',
      color: 'bg-orange-500',
      count: sequenceCount.SEQ_D_Count,
      percentageColor: 'text-yellow-600'
    },

  ];

  return (
    <div className=' font-poppins bg-black '>
      <Header />
      <div className="min-h-screen text-white md:p-6 p-3 font-poppins ">
        <div className="flex items-start md:items-center justify-between mb-8 ">
          <div>
            <h1 className="text-xl font-medium mb-1 font-inter">Reports & Analytics</h1>
            <p className="font-light text-sm text-white/70">Comprehensive insights into user engagement, and performance metrics.</p>
          </div>
          {/* <div className='flex sm:flex-row flex-col items-center gap-5'>
          <button className=' bg-gradient-to-r from-[#0285FF] to-[#1EEF32] px-8 py-2.5 rounded-lg font-medium '>
            Export PDF
          </button>
        <button className=" mt-2 md:mt-0 flex md:items-center gap-2 text-sm text-white font-inter ">
            <i class="fa-regular fa-bell"></i>
            <p className='md:block hidden'>Notifications</p>
          </button>
          </div> */}
        </div>

        <div className=''>
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <div className="bg-black flex lg:flex-row flex-col justify-around gap-10 md:gap-20 rounded-lg md:p-6 p-3 ">
                <div>
                  <p className="text-white text-base font-medium mb-4">
                    Package Distribution
                  </p>

                  <div className="flex items-center justify-center">
                    <div className="relative w-64">
                      <ReactApexChart
                        options={packageOptions}
                        series={packageSeries}
                        type="donut"
                        height={280}
                      />

                      <div
                        className="absolute inset-0 flex flex-col gap-2 text-xs"
                        style={{ top: '50%', left: '-20%', transform: 'translateY(-50%)' }}
                      >
                        <div className="text-blue-500">
                          SEQ-C: {seqPercentages.C}%
                        </div>
                      </div>

                      <div
                        className="absolute text-xs text-purple-500"
                        style={{ top: '15%', right: '-15%' }}
                      >
                        SEQ-A: {seqPercentages.A}%
                      </div>

                      <div
                        className="absolute text-xs text-green-500"
                        style={{ bottom: '30%', left: '15%' }}
                      >
                        SEQ-B: {seqPercentages.B}%
                      </div>

                      <div
                        className="absolute text-xs text-orange-500"
                        style={{ bottom: '10%', right: '-10%' }}
                      >
                        SEQ-D: {seqPercentages.D}%
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    {learningStyles.map((style, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[0.8px] rounded-lg"
                      >
                        <div className="bg-black rounded-lg p-3 flex items-center justify-between gap-5">

                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-4 h-4 rounded-full ${style.color}`}></div>
                            <p className="text-sm sm:text-base font-medium text-white">
                              {style.name}
                            </p>
                          </div>

                          <div className="text-right md:min-w-[80px]">
                            <span className="text-sm sm:text-lg font-semibold text-[#1EEF32] bg-[#3CBC4833] px-3 py-1 rounded">
                              {style.count}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
              <div className="bg-black rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-1">Skill Progression</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Monthly adoption of learning archetypes
                </p>

                <ReactApexChart
                  options={skillProgressionOptions}
                  series={skillProgressionSeries}
                  type="line"
                  height={360}
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;