import React, { useState, useRef, useEffect } from 'react';
import { ROULETTE_SLICES, RouletteFoodItem, LIVE_TICKER_DATA, Restaurant } from '../data/restaurants';
import { playClickSound, playTickSound, playWinFanfare } from '../utils/sound';

interface RouletteViewProps {
  onBackToDirectory: () => void;
  onOpenDetailById?: (id: number) => void;
  isBookmarked: (id: number) => void | boolean;
  onToggleBookmark: (restaurant: Restaurant) => void;
  allRestaurants: Restaurant[];
}

export const RouletteView: React.FC<RouletteViewProps> = ({
  onBackToDirectory,
  onOpenDetailById,
  isBookmarked,
  onToggleBookmark,
  allRestaurants
}) => {
  // Filter states
  const [selectedDong, setSelectedDong] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<'all' | 'under-10k' | '10k-20k'>('all');
  const [selectedVibe, setSelectedVibe] = useState<'solo' | 'friends' | 'date'>('friends');

  // Roulette Animation states
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<RouletteFoodItem | null>(null);
  const [previewText, setPreviewText] = useState<string>("동부시장 맑은손칼국수 & 연탄갈비");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(1842);

  const resultRef = useRef<HTMLDivElement>(null);

  // Increment visitor count randomly to make it feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorCount(prev => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Filter pool
  const filteredPool = () => {
    let pool = ROULETTE_SLICES;
    if (selectedDong !== 'all' && selectedDong !== '전통시장') {
      const dongMatch = pool.filter(item => item.dong === selectedDong);
      if (dongMatch.length > 0) pool = dongMatch;
    }
    if (selectedBudget !== 'all') {
      const budgetMatch = pool.filter(item => item.budget === selectedBudget);
      if (budgetMatch.length > 0) pool = budgetMatch;
    }
    return pool;
  };

  const handleDongClick = (val: string) => {
    setSelectedDong(val);
    const pool = ROULETTE_SLICES.filter(i => val === 'all' || val === '전통시장' || i.dong === val);
    if (pool.length > 0) {
      setPreviewText(pool.map(p => p.title).slice(0, 2).join(" • ") + (pool.length > 2 ? ` 외 ${pool.length - 2}곳` : ""));
    }
  };

  const handleResetFilters = () => {
    setSelectedDong('all');
    setSelectedBudget('all');
    setSelectedVibe('friends');
    setPreviewText("동부시장 맑은손칼국수 & 즉석떡볶이");
  };

  const triggerSpin = (preferredItem?: RouletteFoodItem) => {
    if (isSpinning) return;
    setIsSpinning(true);
    playClickSound();

    const pool = filteredPool();
    const winningItem = preferredItem || pool[Math.floor(Math.random() * pool.length)];

    // Target rotation: the arrow is at 0 degrees (top).
    // The slice's center is at winningItem.rotDegree.
    // To bring that slice to 0 deg, wheel must rotate (360 - winningItem.rotDegree).
    const extraSpins = (Math.floor(Math.random() * 3) + 5) * 360;
    const targetSliceDegree = winningItem.rotDegree;
    const nextRotation = rotation + extraSpins + ((360 - targetSliceDegree) - (rotation % 360));

    setRotation(nextRotation);
    setPreviewText("운명의 맛집을 추첨하는 중... 🎲");

    // Tick sound intervals during spin
    const ticks = [500, 1100, 1700, 2300, 2800, 3200, 3600, 3900, 4200];
    ticks.forEach(delay => {
      setTimeout(() => {
        playTickSound();
      }, delay);
    });

    // Conclude spin
    setTimeout(() => {
      setSelectedItem(winningItem);
      setIsSpinning(false);
      setPreviewText(`오늘의 운명 추천: ${winningItem.title} 🎉`);
      playWinFanfare();

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }, 4600);
  };

  const handleQuickQuiz = (type: 'soup' | 'spicy') => {
    if (type === 'soup') {
      const soup = ROULETTE_SLICES.find(i => i.title.includes('칼국수') || i.title.includes('라멘')) || ROULETTE_SLICES[0];
      setPreviewText("🍜 뜨끈한 국물 요리 풀이 선택되었습니다!");
      triggerSpin(soup);
    } else {
      const spicy = ROULETTE_SLICES.find(i => i.title.includes('닭도리탕') || i.title.includes('떡볶이')) || ROULETTE_SLICES[2];
      setPreviewText("🔥 화끈한 매운맛 요리 풀이 선택되었습니다!");
      triggerSpin(spicy);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const currentMatchedRestaurant = selectedItem
    ? allRestaurants.find(r => r.name.includes(selectedItem.title.split(' ')[0]) || r.name === selectedItem.title) || allRestaurants[0]
    : null;

  return (
    <div className="w-full relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient Warm Orbs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#ffd167]/30 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#ffdbd1]/40 blur-3xl pointer-events-none"></div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1e1b17] text-white px-5 py-2.5 rounded-full shadow-2xl font-label-md text-sm flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 relative z-10">
        {/* Breadcrumb Navigation & Top Action */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToDirectory}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#faf2ec] text-[#5b4039] hover:text-[#b02f00] hover:bg-[#eee7e1] transition-all text-xs sm:text-sm font-semibold border border-[#eee7e1] cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>전체 맛집 둘러보기</span>
          </button>
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-sm text-[#5b4039] font-label-sm text-xs border border-[#eee7e1]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00685f] animate-ping"></span>
            <span>오늘 동네 주민 {visitorCount.toLocaleString()}명이 돌렸어요!</span>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd167] text-[#251a00] font-label-md text-xs sm:text-sm font-bold shadow-sm">
            <span>✨ 결정장애 해결 솔루션</span>
            <span className="text-xs opacity-70">•</span>
            <span>중랑구 골목 미식 룰렛</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1e1b17] tracking-tight">
            고민 끝! 중랑구{' '}
            <span className="text-[#ff5722] relative inline-block">
              오늘 뭐 먹지?
              <svg
                className="absolute -bottom-1 left-0 w-full h-3 text-[#ffd167]"
                preserveAspectRatio="none"
                viewBox="0 0 100 12"
              >
                <path
                  d="M0,8 Q50,0 100,8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="6"
                ></path>
              </svg>
            </span>{' '}
            🎲
          </h1>
          <p className="font-body-lg text-sm sm:text-base text-[#5b4039] leading-relaxed max-w-2xl mt-1">
            점심 메뉴 고르기 힘들 때, 친구들이랑 뭐 먹을지 고민될 때! 중랑구 주민들이 검증한 로컬 찐 맛집 중 오늘의 운명의 식당을 돌려보세요.
          </p>
        </div>

        {/* Main Game Bento Grid: Filters + Roulette Machine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Controls: Mood, Neighborhood, Budget Preset (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 bg-white p-5 sm:p-7 rounded-3xl shadow-sm border border-[#eee7e1]">
            <div className="flex items-center justify-between pb-1 border-b-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff5722]">tune</span>
                <h2 className="font-headline-sm text-base sm:text-lg text-[#1e1b17] font-bold">
                  입맛 맞춤 필터 설정
                </h2>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-label-sm text-xs text-[#5b4039] hover:text-[#b02f00] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span> 기본값
              </button>
            </div>

            {/* Neighborhood Filter */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-xs sm:text-sm text-[#1e1b17] font-semibold flex items-center justify-between">
                <span>📍 탐방할 동네</span>
                <span className="text-[#b02f00] font-label-sm text-xs font-bold">
                  {selectedDong === 'all' ? '전체 동' : selectedDong}
                </span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'all', label: '전체' },
                  { id: '면목동', label: '면목동' },
                  { id: '상봉동', label: '상봉동' },
                  { id: '망우동', label: '망우동' },
                  { id: '중화동', label: '중화동' },
                  { id: '묵동', label: '묵동' },
                  { id: '신내동', label: '신내동' },
                  { id: '전통시장', label: '전통시장' },
                ].map((item) => {
                  const active = selectedDong === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleDongClick(item.id)}
                      className={`px-2 py-2 rounded-2xl font-label-sm text-xs text-center transition-all cursor-pointer font-semibold ${
                        active
                          ? 'bg-[#ff5722] text-white shadow-sm'
                          : 'bg-[#faf2ec] text-[#5b4039] hover:bg-[#eee7e1]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range Filter */}
            <div className="flex flex-col gap-2 mt-1">
              <label className="font-label-md text-xs sm:text-sm text-[#1e1b17] font-semibold flex items-center justify-between">
                <span>💰 예산대 (1인 기준)</span>
                <span className="text-[#b02f00] font-label-sm text-xs font-bold">
                  {selectedBudget === 'all' ? '상관없음' : selectedBudget === 'under-10k' ? '1만원 이하' : '1~2만원대'}
                </span>
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'all', label: '전체 가격대 (가성비부터 특식까지)', tag: 'Free', tagColor: 'text-[#5b4039]' },
                  { id: 'under-10k', label: '1만원 이하 (학생·직장인 가성비)', tag: '착한가격', tagColor: 'text-[#008379] font-bold' },
                  { id: '10k-20k', label: '1만 ~ 2만원대 (푸짐하고 든든한 한끼)', tag: '추천', tagColor: 'text-[#785a00] font-bold' },
                ].map((budget) => {
                  const checked = selectedBudget === budget.id;
                  return (
                    <label
                      key={budget.id}
                      onClick={() => setSelectedBudget(budget.id as 'all' | 'under-10k' | '10k-20k')}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all border ${
                        checked
                          ? 'bg-[#fff8f3] border-[#ff5722] shadow-sm'
                          : 'bg-[#faf2ec] border-transparent hover:bg-[#eee7e1]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="budget"
                          checked={checked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#ff5722] cursor-pointer"
                        />
                        <span className="font-body-md text-xs sm:text-sm text-[#1e1b17]">{budget.label}</span>
                      </div>
                      <span className={`font-label-sm text-xs ${budget.tagColor}`}>{budget.tag}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Situation / Vibe */}
            <div className="flex flex-col gap-2 mt-1">
              <label className="font-label-md text-xs sm:text-sm text-[#1e1b17] font-semibold">
                👥 누구와 함께하나요?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'solo', emoji: '🎒', label: '혼밥 환영' },
                  { id: 'friends', emoji: '🍻', label: '친구/동료' },
                  { id: 'date', emoji: '🕯️', label: '데이트/분위기' },
                ].map((v) => {
                  const active = selectedVibe === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVibe(v.id as 'solo' | 'friends' | 'date')}
                      className={`p-2.5 sm:p-3 rounded-2xl text-center flex flex-col items-center gap-1 transition-all cursor-pointer border ${
                        active
                          ? 'bg-[#ffdbd1] text-[#862200] border-[#ffb5a0] font-bold shadow-sm'
                          : 'bg-[#faf2ec] text-[#1e1b17] border-transparent hover:bg-[#eee7e1]'
                      }`}
                    >
                      <span className="text-xl">{v.emoji}</span>
                      <span className="font-label-sm text-xs">{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tip note */}
            <div className="p-3 bg-[#f4ede6] rounded-2xl flex items-start gap-2 text-[#5b4039] border border-[#eee7e1]">
              <span className="material-symbols-outlined text-[#008379] text-base shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <p className="font-body-sm text-xs leading-relaxed">
                상봉 먹자골목, 동원전통시장, 우림시장 인근 현지인 추천 데이터베이스 80여 곳을 실시간 필터링합니다.
              </p>
            </div>
          </div>

          {/* Right Side: The Wheel & Slot Machine Showcase (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm relative border border-[#eee7e1]">
            {/* Top Decorative Accent */}
            <div className="w-full flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#ff5722] animate-pulse"></span>
                <span className="font-label-sm text-xs text-[#5b4039] uppercase tracking-wider font-bold">
                  Jungnang Roulette Engine
                </span>
              </div>
              <span className="text-xs bg-[#faf2ec] text-[#785a00] px-2.5 py-1 rounded-full font-semibold">
                8개 시그니처 휠
              </span>
            </div>

            {/* Ticker Reel Display */}
            <div className="w-full max-w-md my-2 bg-[#faf2ec] p-2.5 rounded-2xl flex items-center justify-center shadow-inner border border-[#eee7e1]">
              <div className="flex items-center gap-2 truncate text-center">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffd167] text-[#251a00] font-label-sm font-bold shrink-0">
                  현재 선택 후보
                </span>
                <span className="font-label-md text-xs sm:text-sm text-[#b02f00] font-bold truncate">
                  {previewText}
                </span>
              </div>
            </div>

            {/* Roulette Visual Interactive Stage */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 my-6 flex items-center justify-center">
              {/* Pointer Arrow Indicator */}
              <div className="absolute -top-3.5 z-30 flex flex-col items-center drop-shadow-lg">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-[#ff5722]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white -mt-1 shadow-sm"></div>
              </div>

              {/* Rotating Wheel Container */}
              <div
                className="w-full h-full rounded-full relative shadow-2xl overflow-hidden transition-transform duration-[4500ms] ease-out border-4 border-[#eee7e1]"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionTimingFunction: 'cubic-bezier(0.12, 0.8, 0.33, 1)',
                }}
              >
                {/* SVG 8-slice pie matching design */}
                <svg className="w-full h-full transform" viewBox="0 0 400 400">
                  {/* Slice 1: 손칼국수 */}
                  <path d="M200,200 L200,0 A200,200 0 0,1 341.42,58.58 Z" fill="#ff7043"></path>
                  {/* Slice 2: 연탄갈비 */}
                  <path d="M200,200 L341.42,58.58 A200,200 0 0,1 400,200 Z" fill="#ffd167"></path>
                  {/* Slice 3: 즉석떡볶이 */}
                  <path d="M200,200 L400,200 A200,200 0 0,1 341.42,341.42 Z" fill="#ff8a65"></path>
                  {/* Slice 4: 차돌짬뽕 / 배갈비 */}
                  <path d="M200,200 L341.42,341.42 A200,200 0 0,1 200,400 Z" fill="#008379"></path>
                  {/* Slice 5: 수제돈카츠 / 멘야라멘 */}
                  <path d="M200,200 L200,400 A200,200 0 0,1 58.58,341.42 Z" fill="#ffb74d"></path>
                  {/* Slice 6: 화덕파스타 */}
                  <path d="M200,200 L58.58,341.42 A200,200 0 0,1 0,200 Z" fill="#b02f00"></path>
                  {/* Slice 7: 닭볶음탕 */}
                  <path d="M200,200 L0,200 A200,200 0 0,1 58.58,58.58 Z" fill="#ff5722"></path>
                  {/* Slice 8: 감성카페 */}
                  <path d="M200,200 L58.58,58.58 A200,200 0 0,1 200,0 Z" fill="#4db6ac"></path>

                  {/* Slice text labels */}
                  <g className="font-bold fill-white text-[13px] select-none pointer-events-none">
                    <text transform="rotate(22.5 245 75)" x="245" y="75">🍜 손칼국수</text>
                    <text fill="#251a00" transform="rotate(67.5 325 155)" x="325" y="155">🥩 연탄갈비</text>
                    <text transform="rotate(112.5 315 255)" x="315" y="255">🥘 즉석떡볶이</text>
                    <text transform="rotate(157.5 235 325)" x="235" y="325">🍖 숯불갈비</text>
                    <text fill="#251a00" transform="rotate(202.5 135 320)" x="135" y="320">🍜 일본라멘</text>
                    <text transform="rotate(247.5 65 235)" x="65" y="235">🍝 골목파스타</text>
                    <text transform="rotate(292.5 75 135)" x="75" y="135">🍲 닭볶음탕</text>
                    <text transform="rotate(337.5 145 70)" x="145" y="70">☕ 감성카페</text>
                  </g>
                </svg>
              </div>

              {/* Central Spin Trigger Button */}
              <button
                type="button"
                onClick={() => triggerSpin()}
                disabled={isSpinning}
                className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-2xl hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center group focus:outline-none ring-4 ring-[#ffdbd1] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                id="spin-btn"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff5722] to-[#b02f00] flex flex-col items-center justify-center text-white shadow-inner">
                  <span className={`text-2xl transition-transform duration-500 ${isSpinning ? 'rotate-180 animate-spin' : 'group-hover:rotate-180'}`}>
                    🎲
                  </span>
                  <span className="font-label-lg text-sm sm:text-base font-extrabold tracking-tight">
                    {isSpinning ? '추첨중' : '돌리기!'}
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom micro-actions */}
            <div className="flex items-center gap-3 text-[#5b4039] font-label-sm text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#00685f]">verified</span>
                100% 현지인 영수증 리뷰 기반
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#785a00]">casino</span>
                공평한 랜덤 알고리즘
              </span>
            </div>
          </div>
        </div>

        {/* Result Showcase Section (Reveals after spin) */}
        {selectedItem && (
          <div
            ref={resultRef}
            className="transition-all duration-700 ease-out transform animate-fadeIn"
            id="result-container"
          >
            <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white via-[#fff8f3] to-[#faf2ec] rounded-3xl shadow-xl relative overflow-hidden border border-[#eee7e1]">
              {/* Confetti celebration graphics */}
              <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-80">
                <svg fill="none" height="120" viewBox="0 0 120 120" width="120">
                  <circle cx="20" cy="20" fill="#ff5722" r="6"></circle>
                  <rect fill="#ffd167" height="10" transform="rotate(45 80 15)" width="10" x="80" y="15"></rect>
                  <circle cx="95" cy="70" fill="#008379" r="5"></circle>
                  <rect fill="#ff7043" height="6" transform="rotate(25 40 65)" width="12" x="40" y="65"></rect>
                  <polygon fill="#ffd167" points="60,10 65,25 50,20"></polygon>
                </svg>
              </div>

              {/* Section Head */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eee7e1]">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#ffd167] text-[#251a00] font-label-sm text-xs font-bold">
                    🎉 오늘의 미식 매치 완료!
                  </span>
                  <h3 className="font-headline-lg text-xl sm:text-2xl text-[#1e1b17] font-extrabold mt-1">
                    오늘 당신의 운명 맛집은 바로 여기!
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerSpin()}
                    disabled={isSpinning}
                    className="px-4 py-2.5 rounded-full bg-[#f4ede6] text-[#1e1b17] hover:bg-[#eee7e1] transition-colors font-label-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">replay</span>
                    <span>다시 돌리기</span>
                  </button>
                </div>
              </div>

              {/* Restaurant Profile Bento Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mt-5">
                {/* Hero Restaurant Photo */}
                <div className="md:col-span-5 h-64 sm:h-72 md:h-full min-h-[220px] relative rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1e1b17] font-label-sm text-xs font-bold">
                      📍 {selectedItem.dong}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#008379] text-white font-label-sm text-xs font-bold">
                      {selectedItem.tag}
                    </span>
                  </div>
                </div>

                {/* Restaurant Full Info */}
                <div className="md:col-span-7 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h4 className="font-headline-md text-xl sm:text-2xl text-[#1e1b17] font-extrabold">
                        {selectedItem.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[#785a00] font-label-lg text-sm font-bold bg-[#faf2ec] px-2.5 py-0.5 rounded-full border border-[#eee7e1]">
                        <span>★</span>
                        <span>{selectedItem.rating}</span>
                        <span className="text-[#5b4039] font-label-sm text-xs font-normal">
                          ({selectedItem.reviews})
                        </span>
                      </div>
                    </div>
                    <p className="font-body-md text-xs sm:text-sm text-[#5b4039] leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Key Specs Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#faf2ec] p-3 rounded-2xl border border-[#eee7e1]">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-xs text-[#5b4039]">대표 시그니처</span>
                      <span className="font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold truncate">
                        {selectedItem.menu}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-xs text-[#5b4039]">가격대 (1인)</span>
                      <span className="font-label-md text-xs sm:text-sm text-[#b02f00] font-bold">
                        {selectedItem.price}
                      </span>
                    </div>
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <span className="font-label-sm text-xs text-[#5b4039]">위치 / 이동</span>
                      <span className="font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold truncate">
                        {selectedItem.distance}
                      </span>
                    </div>
                  </div>

                  {/* Recommendation Reason Tag Cloud */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[#5b4039] font-label-sm text-xs mr-1 font-semibold">추천 포인트:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f4ede6] text-[#5b4039] font-label-sm text-xs">
                      #가성비최고
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f4ede6] text-[#5b4039] font-label-sm text-xs">
                      #현지인인증
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f4ede6] text-[#5b4039] font-label-sm text-xs">
                      #실시간인기
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f4ede6] text-[#5b4039] font-label-sm text-xs">
                      #중랑구로컬
                    </span>
                  </div>

                  {/* External Actions CTA */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={`https://map.naver.com/v5/search/${encodeURIComponent('중랑구 ' + selectedItem.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] text-center px-5 py-3 rounded-full bg-[#ff5722] text-white font-label-lg text-xs sm:text-sm font-bold shadow-md hover:bg-[#b02f00] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">navigation</span>
                      <span>네이버 지도로 길찾기</span>
                    </a>
                    {currentMatchedRestaurant && (
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(currentMatchedRestaurant)}
                        className={`px-4 py-3 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border ${
                          isBookmarked(currentMatchedRestaurant.id)
                            ? 'bg-[#ffdbd1] text-[#862200] border-[#ffb5a0]'
                            : 'bg-[#faf2ec] text-[#1e1b17] border-[#eee7e1] hover:bg-[#eee7e1]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm text-[#b02f00]">bookmark</span>
                        <span>{isBookmarked(currentMatchedRestaurant.id) ? '찜완료' : '찜하기'}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href);
                          showToast("링크가 복사되었습니다! 친구에게 공유해 보세요.");
                        } else {
                          showToast("현재 화면 링크가 준비되었습니다.");
                        }
                      }}
                      className="px-4 py-3 rounded-full bg-[#faf2ec] text-[#1e1b17] font-label-md text-xs sm:text-sm font-semibold hover:bg-[#eee7e1] transition-colors flex items-center gap-1.5 border border-[#eee7e1] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">share</span>
                      <span>친구에게 공유</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real-Time Activity Ticker & Popular Picks */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#785a00]">trending_up</span>
              <h3 className="font-headline-sm text-base sm:text-lg text-[#1e1b17] font-bold">
                방금 전 다른 주민들이 뽑은 맛집 현황
              </h3>
            </div>
            <span className="font-label-sm text-xs text-[#5b4039]">5초 전 자동 업데이트</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LIVE_TICKER_DATA.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow border border-[#eee7e1]"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#faf2ec]">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80";
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-xs text-[#ff5722] font-bold">{t.location}</span>
                  <span className="font-label-md text-xs sm:text-sm text-[#1e1b17] truncate font-semibold">
                    {t.title}
                  </span>
                  <span className="font-body-sm text-[11px] text-[#5b4039]">{t.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quiz Box */}
        <div className="bg-[#eee7e1] rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#e8e1db]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#ffd167] flex items-center justify-center text-2xl shrink-0 shadow-sm">
              🍜
            </div>
            <div>
              <h4 className="font-headline-sm text-base sm:text-lg text-[#1e1b17] font-bold">
                국물 vs 구이? 매운맛 vs 담백한 맛?
              </h4>
              <p className="font-body-sm text-xs sm:text-sm text-[#5b4039]">
                룰렛 전에 2가지 질문으로 카테고리를 좁혀보세요.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleQuickQuiz('soup')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-white hover:bg-[#fff8f3] text-[#1e1b17] font-label-md text-xs sm:text-sm font-semibold transition-all shadow-sm border border-[#eee7e1] cursor-pointer"
            >
              뜨끈한 국물 요리
            </button>
            <button
              type="button"
              onClick={() => handleQuickQuiz('spicy')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-white hover:bg-[#fff8f3] text-[#1e1b17] font-label-md text-xs sm:text-sm font-semibold transition-all shadow-sm border border-[#eee7e1] cursor-pointer"
            >
              화끈한 매운맛 & 볶음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
