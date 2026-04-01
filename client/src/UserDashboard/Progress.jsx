import React, { useState, useEffect } from 'react';
import Header from './Layout/Header';
import axiosInstance from '../config/axiosInstance';

const Progress = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);

  const [heatmapData, setHeatmapData] = useState({
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    values: Array(7).fill(0).map(() => Array(6).fill(null)),
    details: {}
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axiosInstance.get('/api/getUserOverallProgress');

        if (response.data.success) {
          const { dayProgress, currentStreak, longestStreak, activeDaysCount, program_type } = response.data.data;
          
          setProgressData({ currentStreak, longestStreak, activeDaysCount, program_type });

          // Map dayProgress to heatmap values
          const newValues = Array(7).fill(0).map(() => Array(6).fill(null));
          const newDetails = {};

          dayProgress.forEach((dp) => {
            const d = dp.day;
            const weekIndex = Math.floor((d - 1) / 7);
            const dayIndex = (d - 1) % 7;
            
            if (weekIndex < 6) {
              newValues[dayIndex][weekIndex] = dp.active ? d : (dp.day <= (program_type === 'apprentice' ? 7 : 37) ? d : null);
              newDetails[`${dayIndex}-${weekIndex}`] = {
                time: dp.time_spent || '30+ min',
                sp: dp.score || 0,
                active: dp.active
              };
            }
          });

          setHeatmapData(prev => ({
            ...prev,
            values: newValues,
            details: newDetails
          }));
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const getColorClass = (dayIndex, weekIndex) => {
    const detail = heatmapData.details[`${dayIndex}-${weekIndex}`];
    if (!detail) return 'bg-[#D9D9D91A]';
    
    const value = detail.sp;
    if (!detail.active) return 'bg-[#D9D9D91A]';
    
    if (value >= 1000) return 'bg-[#1EEF32]';
    if (value >= 500) return 'bg-green-500';
    if (value >= 200) return 'bg-green-600';
    if (value > 0) return 'bg-green-700';
    return 'bg-gray-700';
  };

  const handleCellClick = (dayIndex, weekIndex, value) => {
    if (value !== null) {
      const detail = heatmapData.details[`${dayIndex}-${weekIndex}`];
      setSelectedDay({ day: dayIndex, week: weekIndex, value, ...detail });
    }
  };

  const getDayDetails = (dayIndex, weekIndex) => {
    const key = `${dayIndex}-${weekIndex}`;
    return heatmapData.details[key] || { time: '0 min', sp: 0 };
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <div className='animate-pulse text-xl text-sky-400'>Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Header/>
    <div className=" p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-xl md:text-2xl font-medium mb-2">Learning Activity Heatmap</p>
            <p className="text-gray-400 text-sm">
              {progressData?.program_type === 'apprentice' ? '7-day pilot' : '37-day journey'} • {progressData?.activeDaysCount || 0} days active
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Low</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-[#1EEF32] rounded-sm"></div>
              </div>
              <span className="text-xs text-gray-400">High (SP)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-[#1EEF32] opacity-30 blur-lg"></div>
        <svg className="transform -rotate-90 w-16 h-16 relative z-10">
          <circle cx="32" cy="32" r="28" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeDasharray="4 4" opacity="0.3" />
          <circle
            cx="32" cy="32" r="28" stroke="#1EEF32" strokeWidth="6" fill="none"
            strokeDasharray={`${Math.min(((progressData?.longestStreak || 0) / 37) * 176, 176)} 176`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-trophy text-[#1EEF32]"></i>
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold">{progressData?.longestStreak || 0} Days</div>
        <div className="text-gray-400 text-sm">Longest Streak</div>
      </div>
    </div>
  </div>

  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-xl"></div>
        <svg className="transform -rotate-90 w-16 h-16 relative z-10">
          <circle cx="32" cy="32" r="28" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeDasharray="4 4" opacity="0.3" />
          <circle
            cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="6" fill="none"
            strokeDasharray={`${Math.min(((progressData?.activeDaysCount || 0) / 37) * 176, 176)} 176`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-calendar-check text-blue-400"></i>
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold">{progressData?.activeDaysCount || 0} Days</div>
        <div className="text-gray-400 text-sm">Total Active Days</div>
      </div>
    </div>
  </div>

  <div className="rounded-2xl p-5 bg-white/10 backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-30 blur-xl"></div>
        <svg className="transform -rotate-90 w-16 h-16 relative z-10">
          <circle cx="32" cy="32" r="28" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeDasharray="4 4" opacity="0.3" />
          <circle
            cx="32" cy="32" r="28" stroke="#F97316" strokeWidth="6" fill="none"
            strokeDasharray={`${Math.min(((progressData?.currentStreak || 0) / 10) * 176, 176)} 176`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-fire text-orange-500"></i>
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold">{progressData?.currentStreak || 0} Days</div>
        <div className="text-gray-400 text-sm">Current Streak</div>
      </div>
    </div>
  </div>
</div>

        <div className=" rounded-2xl p-4 md:p-6 overflow-x-auto bg-white/5 border border-white/10">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div className="text-sm text-gray-400 w-20"></div>
              {heatmapData.weeks.map((week, idx) => (
                <div key={idx} className="text-center text-sm font-medium text-gray-300">
                  {week}
                </div>
              ))}
            </div>

            {heatmapData.days.map((day, dayIndex) => (
              <div key={dayIndex} className="grid grid-cols-7 gap-2 mb-2">
                <div className="text-sm text-gray-400 flex items-center w-20 pr-2">
                  {day}
                </div>
                {heatmapData.values[dayIndex].map((value, weekIndex) => (
                  <div key={weekIndex} className="relative">
                    <button
                      onClick={() => handleCellClick(dayIndex, weekIndex, value)}
                      onMouseEnter={() => setHoveredDay({ day: dayIndex, week: weekIndex })}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-full h-10 aspect-square rounded ${getColorClass(dayIndex, weekIndex)} 
                        flex items-center justify-center text-xs font-semibold
                        hover:ring-2 hover:ring-white/50 transition-all cursor-pointer
                        ${value === null ? 'opacity-20 cursor-default' : ''}`}
                    >
                      {value !== null ? value : ''}
                    </button>

                    {hoveredDay?.day === dayIndex && hoveredDay?.week === weekIndex && value !== null && (
                      <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                        bg-gray-900 text-white p-3 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md whitespace-nowrap">
                        <div className="font-bold text-sm mb-1 text-sky-400 border-b border-white/10 pb-1">Day {value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-400">Total Reward</div>
                        <div className="text-sm font-mono text-[#1EEF32] mb-1">{getDayDetails(dayIndex, weekIndex).sp} SP</div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-400">Status</div>
                        <div className={`text-xs ${getDayDetails(dayIndex, weekIndex).active ? 'text-green-400' : 'text-gray-500'}`}>
                          {getDayDetails(dayIndex, weekIndex).active ? '✓ Completed' : '○ Pending'}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                          border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div className='mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-sm text-gray-400'>
             <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-[#1EEF32] rounded-sm'></div>
                <span>Excellent (&gt;1000 SP)</span>
             </div>
             <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-green-500 rounded-sm'></div>
                <span>Great (&gt;500 SP)</span>
             </div>
             <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-green-700 rounded-sm'></div>
                <span>Achieved (&gt;0 SP)</span>
             </div>
             <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-[#D9D9D91A] rounded-sm'></div>
                <span>Upcoming / Inactive</span>
             </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Progress;