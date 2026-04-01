import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import Header from './Layout/Header';
import "./Style/style.css";
import ProfileInfo from './ProfileInfo';
import axiosInstance from '../config/axiosInstance';
import { useSelector } from 'react-redux';

// ─── Activity meta (same as TaskWeb.jsx) ─────────────────────────────────────
const ACTIVITY_META = [
  { id: 1,  name: 'AI FlashLearn',       desc: 'Watch & answer AI video quest',   icon: '🎓', key: 'videoAndQuestCompleted' },
  { id: 2,  name: 'AI Skill Quest',       desc: 'Daily quiz challenge',             icon: '🧠', key: 'rewardClaimed' },
  { id: 3,  name: 'Missing Letters',      desc: 'Fill in the blanks game',          icon: '🔤', key: 'Missing Letter' },
  { id: 4,  name: 'Jumble Word',          desc: 'Unscramble AI terms',              icon: '🔀', key: 'Jumble Word' },
  { id: 5,  name: 'Perfect Match',        desc: 'Match AI concepts',                icon: '🎯', key: 'Perfect Match' },
  { id: 6,  name: 'Memory Game',          desc: 'Test your memory',                 icon: '🃏', key: 'Memory Game' },
  { id: 7,  name: 'AI Insight Vault',     desc: 'Explore AI facts',                 icon: '💡', key: 'aiFunFactVisited' },
  { id: 8,  name: 'AI Emoji Challenge',   desc: 'Guess the AI emoji',               icon: '😎', key: 'emojiGameCompleted' },
  { id: 9,  name: 'AI StoryLens Blog',    desc: 'Read & claim daily blog',          icon: '📖', key: 'blogClaimed' },
  { id: 10, name: 'AI Space Mission',     desc: 'Complete AI mission',              icon: '🚀', key: 'aiMissionClaimed' },
  { id: 11, name: 'AI Myth Breaker',      desc: 'Bust AI myths',                    icon: '⚡', key: 'mythBreakerCompleted' },
  { id: 12, name: 'AI Failure Files',     desc: 'Learn from AI failures',           icon: '🛑', key: 'failureFilesCompleted' },
  { id: 13, name: 'AI Tool Arena',        desc: 'Pick the best AI tool',            icon: '🏆', key: 'toolArenaCompleted' },
  // { id: 14, name: 'Tap to Learn',         desc: 'Interactive learning session',    icon: '👆', key: 'TaptoLearn' },
];

const BONUS_META = [
  { id: 1, name: 'Farming Bonus',      desc: 'Claim your farming rewards',      icon: '🌾', key: 'FARMING BONUS' },
  { id: 2, name: 'Daily Active Bonus', desc: 'Reward for daily activity',       icon: '📆', key: 'DAILY ACTIVE BONUS' },
  { id: 3, name: 'Spin Wheel Bonus',   desc: 'Lucky spin rewards',              icon: '🎡', key: 'SPIN WHEEL BONUS' },
  { id: 4, name: 'Referral Bonus',     desc: 'Invite friends to earn',          icon: '👥', key: 'REFERRAL BONUS' },
  { id: 5, name: 'Retweet Bonus',      desc: 'Share on X for rewards',          icon: '🔁', key: 'RETWEET BONUS' },
];

const StatusBadge = ({ status }) => {
  if (status === 'completed') return (
    <span className="flex items-center gap-1 text-green-400 text-xs font-semibold whitespace-nowrap">
      <i className="fa-regular fa-circle-check"></i> Done
    </span>
  );
  if (status === 'in-progress') return (
    <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold whitespace-nowrap">
      <i className="fa-solid fa-circle-half-stroke"></i> Pending
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-gray-600 text-xs whitespace-nowrap">
      <i className="fa-solid fa-lock"></i> Locked
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  // Overview & SP trend data
  const [overviewData, setOverviewData] = useState(null);

  // Assessment days array from backend: [{day, status, percentage?}]
  const [assessmentDays, setAssessmentDays] = useState([]);

  // Currently selected day to inspect
  const [selectedDay, setSelectedDay] = useState(null);

  // Progress for the selected day
  const [dailyProgress, setDailyProgress] = useState(null);

  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(false);

  const user = useSelector((state) => state.user_email);
  const userId = user?.id;
  const email = user?.email;
  // current_program: 'apprentice' = 7-day program | 'genesis' = 30-day program
  const program_type = user?.current_program || 'apprentice';

  // ── Helpers ────────────────────────────────────────────────────────────────
  // Derive "current day" = the Available day or the highest completed day
  const currentDay = assessmentDays.find(d => d.status === 'Available')?.day
    || (assessmentDays.length > 0 ? Math.max(...assessmentDays.map(d => d.day)) : 1);

  const activeDays = overviewData?.user?.created_at
    ? Math.ceil((new Date() - new Date(overviewData.user.created_at)) / (1000 * 60 * 60 * 24))
    : 0;

  const joinDateFormatted = overviewData?.user?.created_at
    ? new Date(overviewData.user.created_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : '...';

  const chartDataArr = overviewData?.spTrend?.data || Array(12).fill(0);
  const chartLabels = overviewData?.spTrend?.labels || Array(12).fill('');
  const todayEarnings = chartDataArr[chartDataArr.length - 1] || 0;

  // ── Activities for selected day ────────────────────────────────────────────
  const getStatus = (key) => {
    if (!dailyProgress) return 'locked';
    const val = dailyProgress[key];
    return (val === true || val === 1) ? 'completed' : 'in-progress';
  };

  const activities = ACTIVITY_META.map(a => ({
    ...a,
    status: selectedDay && dailyProgress ? getStatus(a.key) : 'locked',
  }));

  const bonuses = BONUS_META.map(b => ({
    ...b,
    status: selectedDay && dailyProgress ? getStatus(b.key) : 'locked',
  }));

  const totalCoreCount = ACTIVITY_META.length;
  const completedCount = activities.filter(a => a.status === 'completed').length;
  const progressPercent = Math.round((completedCount / totalCoreCount) * 100);

  // Is the selected day already fully completed (Completed status from server)?
  const selectedDayInfo = assessmentDays.find(d => d.day === selectedDay);
  const isDayCompleted = selectedDayInfo?.status === 'Completed';

  // ── Data Fetching ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const [overviewRes, daysRes] = await Promise.all([
          axiosInstance.get('/api/getAllData', { params: { userId, email } }),
          axiosInstance.get('/api/getAllAssessmentDaysController', { params: { email: userId } }),
        ]);
        setOverviewData(overviewRes.data);
        const days = daysRes.data || [];
        setAssessmentDays(days);

        // Select the current / available day by default
        const avail = days.find(d => d.status === 'Available');
        const maxDay = avail?.day || (days.length > 0 ? Math.max(...days.map(d => d.day)) : 1);
        setSelectedDay(maxDay);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchInitial();
  }, [userId, email]);

  // Fetch daily progress whenever the selected day changes
  // program_type: 'apprentice' = 7-day | 'genesis' = 30-day (read from Redux)
  const fetchDailyProgress = useCallback(async (day) => {
    if (!day || !userId) return;
    setProgressLoading(true);
    try {
      const res = await axiosInstance.get('/api/getUserDailyProgress', {
        params: { userId, day, program_type },
      });
      setDailyProgress(res.data?.data || null);
    } catch (err) {
      console.error('Error fetching daily progress:', err);
      setDailyProgress(null);
    } finally {
      setProgressLoading(false);
    }
  }, [userId, program_type]);

  useEffect(() => {
    if (selectedDay) fetchDailyProgress(selectedDay);
  }, [selectedDay, fetchDailyProgress]);

  // ── Chart Config ───────────────────────────────────────────────────────────
  const chartOptions = {
    chart: { type: 'bar', height: 200, toolbar: { show: false }, background: 'transparent' },
    plotOptions: { bar: { columnWidth: '65%', borderRadius: 3 } },
    colors: ['#0285FF'],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['#1EEF32'] },
    grid: { show: false, padding: { left: 0, right: 0, top: -20, bottom: 0 } },
    xaxis: { categories: chartLabels, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false, min: 0, max: Math.max(...chartDataArr, 10) },
    tooltip: { enabled: true, theme: 'dark', y: { formatter: v => `${v} SP` } },
  };
  const chartSeries = [
    { name: 'SP Earned', data: chartDataArr },
    { name: 'Trend', type: 'line', data: chartDataArr },
  ];

  // ── Greeting helper ────────────────────────────────────────────────────────
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';

  // ── Day pill styles ────────────────────────────────────────────────────────
  const dayPillClass = (d) => {
    const isSelected = d.day === selectedDay;
    if (d.status === 'Completed')
      return isSelected
        ? 'bg-green-500 text-white border-green-500 scale-105'
        : 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25';
    if (d.status === 'Available')
      return isSelected
        ? 'bg-[#0285FF] text-white border-[#0285FF] scale-105'
        : 'bg-[#0285FF]/15 text-[#0285FF] border-[#0285FF]/30 hover:bg-[#0285FF]/25';
    return 'bg-white/5 text-gray-600 border-white/10 cursor-not-allowed';
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {!showProfile ? (
        <div className="text-white p-4 md:p-8">
          <div className="max-w-7xl mx-auto">

            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold mb-1">Learner Dashboard</h1>
                <p className="text-gray-400 text-sm">Your Daily AI Learning Progress</p>
              </div>
              <button onClick={() => setShowProfile(true)} className="flex items-center gap-2">
                <img src="./assets/WebApp/icons/profilepic.svg" className="w-10 h-10" alt="profile" />
                <span className="hidden md:inline font-medium">Profile</span>
              </button>
            </div>

            {/* ── Greeting ── */}
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-medium mb-3">
                Good {greeting}, {overviewData?.user?.name || user?.name || 'Learner'} 👋
              </h2>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg bg-white/5">
                  <i className="fa-solid fa-fire-flame-curved text-red-500"></i>
                  <span>{activeDays} Days Active</span>
                </div>
                <div className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg bg-white/5">
                  <i className="fa-regular fa-star text-[#0285FF]"></i>
                  <span>{(overviewData?.user?.token_balance || 0).toLocaleString()} SP</span>
                </div>
                <div className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg bg-white/5">
                  <i className="fa-solid fa-calendar-check text-[#1EEF32]"></i>
                  <span>Current Day: {loading ? '...' : currentDay} of 7</span>
                </div>
              </div>
            </div>

            {/* ── 7-Day Challenge Banner ── */}
            <div className="mb-7 w-full bg-gradient-to-r from-[#0285FF] via-[#73BBFF] to-[#0285FF] p-5 lg:p-7 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-1 flex-shrink-0">
                  <img src="../assets/merchant/task.svg" className="bg-[#0285FF] rounded-full w-full h-full object-cover" alt="task" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">7 Days AI Learning Challenge</p>
                  <p className="text-sm text-white/80">
                    <i className="fa-solid fa-calendar-days mr-1"></i> Started: {joinDateFormatted}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 w-full md:w-auto min-w-[260px]">
                <div className="w-full flex justify-between text-sm mb-1">
                  <span>Day {currentDay}/7 completed</span>
                  <span className="font-semibold">
                    {Math.round(((currentDay - 1) / 7) * 100)}%
                  </span>
                </div>
                <div className="bg-white/30 rounded-full w-full h-3">
                  <div
                    className="rounded-full bg-gradient-to-r from-white to-[#1EEF32] h-3 transition-all duration-500"
                    style={{ width: `${Math.round(((currentDay - 1) / 7) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* ── Day Selector ── */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3 font-medium">Select Day to View Progress:</p>
              <div className="flex flex-wrap gap-2">
                {loading
                  ? Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="w-16 h-10 rounded-lg bg-white/10 animate-pulse"></div>
                    ))
                  : Array.from({ length: 7 }, (_, i) => {
                      const d = i + 1;
                      const info = assessmentDays.find(a => a.day === d);
                      const isAvailable = !!info;
                      const pill = info ? dayPillClass(info) : 'bg-white/5 text-gray-600 border-white/10 cursor-not-allowed';
                      return (
                        <button
                          key={d}
                          disabled={!isAvailable}
                          onClick={() => isAvailable && setSelectedDay(d)}
                          className={`relative flex flex-col items-center justify-center w-16 h-12 rounded-xl border text-xs font-bold transition-all duration-200 ${pill}`}
                        >
                          <span>Day {d}</span>
                          {info?.status === 'Completed' && (
                            <i className="fa-solid fa-check text-[9px] mt-0.5"></i>
                          )}
                          {info?.status === 'Available' && (
                            <span className="text-[9px] mt-0.5 font-normal opacity-80">Today</span>
                          )}
                        </button>
                      );
                    })}
              </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* ── Activities Panel ── */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Day {selectedDay ?? '–'} Activities
                      {isDayCompleted && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                          Completed ✓
                        </span>
                      )}
                      {selectedDayInfo?.status === 'Available' && (
                        <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                          Today
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {isDayCompleted
                        ? `Completed with ${selectedDayInfo?.percentage ?? '--'}%`
                        : 'Complete all tasks to earn maximum SP'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#1EEF32] text-sm font-bold">
                      {progressLoading ? '…' : `${completedCount}/${totalCoreCount}`}
                    </span>
                    <p className="text-gray-400 text-xs">Done</p>
                  </div>
                </div>

                {/* Progress Bar for selected day */}
                {!progressLoading && dailyProgress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Daily Progress</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-2">
                      <div
                        className="rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] h-2 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {progressLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="w-6 h-6 border-2 border-[#0285FF] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : !selectedDay ? (
                  <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
                    Select a day above to view activities
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                    {/* Core Activities */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-bold">Core Learning Tasks</h4>
                      <div className="space-y-2">
                        {activities.map((activity) => (
                          <div
                            key={activity.id}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all border
                              ${activity.status === 'completed'
                                ? 'bg-green-500/10 border-green-500/20'
                                : activity.status === 'in-progress'
                                ? 'bg-yellow-500/5 border-yellow-500/15'
                                : 'bg-white/3 border-white/8 opacity-40'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0
                                ${activity.status === 'completed' ? 'bg-green-500/20' : 'bg-white/10'}`}>
                                {activity.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium leading-tight">{activity.name}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{activity.desc}</p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <StatusBadge status={activity.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Daily Bonuses */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-bold">Daily Bonuses</h4>
                      <div className="space-y-2">
                        {bonuses.map((bonus) => (
                          <div
                            key={bonus.id}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all border
                              ${bonus.status === 'completed'
                                ? 'bg-green-500/10 border-green-500/20'
                                : bonus.status === 'in-progress'
                                ? 'bg-yellow-500/5 border-yellow-500/15'
                                : 'bg-white/3 border-white/8 opacity-40'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0
                                ${bonus.status === 'completed' ? 'bg-green-500/20' : 'bg-white/10'}`}>
                                {bonus.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium leading-tight">{bonus.name}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{bonus.desc}</p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <StatusBadge status={bonus.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Right Column ── */}
              <div className="flex flex-col gap-6">

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-xs mb-1">Total SP</p>
                    <p className="text-2xl font-bold text-[#0285FF]">
                      {(overviewData?.user?.token_balance || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Skill Points</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-xs mb-1">Today's Earnings</p>
                    <p className="text-2xl font-bold text-[#1EEF32]">+{todayEarnings}</p>
                    <p className="text-xs text-gray-500 mt-1">SP earned today</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-xs mb-1">Day {selectedDay ?? '-'} Progress</p>
                    <p className="text-2xl font-bold text-white">
                      {progressLoading ? '…' : `${completedCount}/${totalCoreCount}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Tasks done</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-xs mb-1">Days Completed</p>
                    <p className="text-2xl font-bold text-white">
                      {assessmentDays.filter(d => d.status === 'Completed').length}/7
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Challenge days</p>
                  </div>
                </div>

                {/* SP Trend Chart */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex-1">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">SP Trend</h3>
                    <p className="text-gray-400 text-xs">Last 12 days earnings</p>
                  </div>
                  <div className="h-48">
                    <ReactApexChart
                      options={chartOptions}
                      series={chartSeries}
                      type="line"
                      height={200}
                    />
                  </div>
                </div>

                {/* Past Days Summary */}
                {assessmentDays.filter(d => d.status === 'Completed').length > 0 && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <h3 className="text-lg font-semibold mb-4">Past Days Summary</h3>
                    <div className="space-y-3">
                      {assessmentDays
                        .filter(d => d.status === 'Completed')
                        .sort((a, b) => b.day - a.day)
                        .map(d => (
                          <div
                            key={d.day}
                            onClick={() => setSelectedDay(d.day)}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all
                              ${selectedDay === d.day
                                ? 'bg-green-500/15 border-green-500/40'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <i className="fa-solid fa-check text-green-400 text-xs"></i>
                              </div>
                              <span className="text-sm font-medium">Day {d.day}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-[#1EEF32]">{d.percentage ?? '--'}%</p>
                              <p className="text-xs text-gray-400">Quiz Score</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileInfo onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default Dashboard;