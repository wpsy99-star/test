import React, { useState } from 'react';
import { NEIGHBORHOOD_GUIDE, Restaurant } from '../data/restaurants';

interface NeighborhoodMapViewProps {
  restaurants: Restaurant[];
  onOpenDetail: (restaurant: Restaurant) => void;
  onGoToDirectoryWithDong: (dong: string) => void;
}

export const NeighborhoodMapView: React.FC<NeighborhoodMapViewProps> = ({
  restaurants,
  onOpenDetail,
  onGoToDirectoryWithDong
}) => {
  const [selectedDong, setSelectedDong] = useState<string>('상봉동');

  const currentDongInfo = NEIGHBORHOOD_GUIDE.find(n => n.dong === selectedDong) || NEIGHBORHOOD_GUIDE[0];
  const dongRestaurants = restaurants.filter(r => r.dong === selectedDong);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd167] text-[#251a00] font-label-md text-xs sm:text-sm font-bold shadow-sm mb-3">
          <span>🗺️ 중랑구 로컬 미식 지도</span>
          <span className="text-xs opacity-70">•</span>
          <span>6개 법정동 탐방</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl text-[#1e1b17] font-extrabold tracking-tight">
          골목마다 숨겨진 중랑의 맛과 이야기
        </h1>
        <p className="mt-2 text-xs sm:text-base text-[#5b4039] max-w-xl">
          전통시장 골목부터 학교 앞 추억의 거리까지, 동네별 특색 있는 맛집과 핫플레이스를 지도와 함께 한눈에 확인하세요.
        </p>
      </div>

      {/* Dong selector tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        {NEIGHBORHOOD_GUIDE.map(n => {
          const active = selectedDong === n.dong;
          return (
            <button
              key={n.dong}
              type="button"
              onClick={() => setSelectedDong(n.dong)}
              className={`px-4 sm:px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#ff5722] text-white shadow-md'
                  : 'bg-white text-[#5b4039] hover:bg-[#faf2ec] border border-[#eee7e1]'
              }`}
            >
              <span>{n.dong}</span>
              <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-[#faf2ec] text-[#b02f00]'}`}>
                {restaurants.filter(r => r.dong === n.dong).length}곳
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive stylized map card + Neighborhood Info & Restaurant list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Stylized Interactive District Map (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#eee7e1]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-sm text-base text-[#1e1b17] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ff5722]">explore</span>
              중랑구 행정구역 & 지하철 노선망
            </h3>
            <span className="text-[11px] bg-[#faf2ec] text-[#5b4039] px-2 py-0.5 rounded-full font-semibold">
              터치하여 선택
            </span>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative w-full aspect-square bg-[#faf2ec] rounded-2xl p-4 overflow-hidden border border-[#eee7e1]">
            {/* SVG stylized map of Jungnang-gu */}
            <svg className="w-full h-full" viewBox="0 0 400 400">
              {/* Subway line routes */}
              {/* Line 7 (Greenish) */}
              <path
                d="M170,40 L180,120 L200,200 L180,290 L160,370"
                fill="none"
                stroke="#63883a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="4 2"
                opacity="0.8"
              />
              {/* Gyeongui-Jungang / Gyeongchun (Blue/Teal) */}
              <path
                d="M80,230 L200,200 L320,180 L370,160"
                fill="none"
                stroke="#008379"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.75"
              />
              {/* Jungnangcheon River Stream */}
              <path
                d="M110,30 Q120,150 90,260 T70,380"
                fill="none"
                stroke="#a0d2eb"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* District polygon zones (interactive clickable areas) */}
              {/* Muk-dong (Top left) */}
              <polygon
                points="120,40 260,40 240,140 130,130"
                className={`cursor-pointer transition-colors ${selectedDong === '묵동' ? 'fill-[#ffdbd1] stroke-[#ff5722] stroke-2' : 'fill-white/80 hover:fill-[#ffdf9b]/60 stroke-[#eee7e1]'}`}
                onClick={() => setSelectedDong('묵동')}
              />
              <text x="180" y="90" textAnchor="middle" className="text-xs font-bold fill-[#5b4039] pointer-events-none">묵동</text>

              {/* Sinnae-dong (Top right) */}
              <polygon
                points="260,40 370,50 360,170 240,140"
                className={`cursor-pointer transition-colors ${selectedDong === '신내동' ? 'fill-[#ffdbd1] stroke-[#ff5722] stroke-2' : 'fill-white/80 hover:fill-[#ffdf9b]/60 stroke-[#eee7e1]'}`}
                onClick={() => setSelectedDong('신내동')}
              />
              <text x="300" y="105" textAnchor="middle" className="text-xs font-bold fill-[#5b4039] pointer-events-none">신내동</text>

              {/* Junghwa-dong (Center left) */}
              <polygon
                points="100,135 210,140 190,240 90,230"
                className={`cursor-pointer transition-colors ${selectedDong === '중화동' ? 'fill-[#ffdbd1] stroke-[#ff5722] stroke-2' : 'fill-white/80 hover:fill-[#ffdf9b]/60 stroke-[#eee7e1]'}`}
                onClick={() => setSelectedDong('중화동')}
              />
              <text x="145" y="190" textAnchor="middle" className="text-xs font-bold fill-[#5b4039] pointer-events-none">중화동</text>

              {/* Sangbong-dong (Center) */}
              <polygon
                points="210,140 310,140 300,250 190,240"
                className={`cursor-pointer transition-colors ${selectedDong === '상봉동' ? 'fill-[#ffdbd1] stroke-[#ff5722] stroke-2' : 'fill-white/80 hover:fill-[#ffdf9b]/60 stroke-[#eee7e1]'}`}
                onClick={() => setSelectedDong('상봉동')}
              />
              <text x="250" y="200" textAnchor="middle" className="text-xs font-bold fill-[#5b4039] pointer-events-none">상봉동 (중심)</text>

              {/* Mangu-dong (Center right) */}
              <polygon
                points="310,140 380,160 370,270 300,250"
                className={`cursor-pointer transition-colors ${selectedDong === '망우동' ? 'fill-[#ffdbd1] stroke-[#ff5722] stroke-2' : 'fill-white/80 hover:fill-[#ffdf9b]/60 stroke-[#eee7e1]'}`}
                onClick={() => setSelectedDong('망우동')}
              />
              <text x="340" y="210" textAnchor="middle" className="text-xs font-bold fill-[#5b4039] pointer-events-none">망우동</text>

              {/* Myeonmok-dong (Bottom large) */}
              <polygon
                points="90,240 320,250 280,380 110,380"
                className={`cursor-pointer transition-colors ${selectedDong === '면목동' ? 'fill-[#ffdbd1] stroke-[#ff5722] stroke-2' : 'fill-white/80 hover:fill-[#ffdf9b]/60 stroke-[#eee7e1]'}`}
                onClick={() => setSelectedDong('면목동')}
              />
              <text x="200" y="315" textAnchor="middle" className="text-xs font-bold fill-[#5b4039] pointer-events-none">면목동 (사가정)</text>

              {/* Interactive Station Nodes */}
              <g className="fill-white stroke-[#1e1b17] stroke-2">
                {/* Sangbong Station node */}
                <circle cx="200" cy="200" r="7" fill="#ff5722" stroke="#ffffff" />
                {/* Myeonmok Station */}
                <circle cx="185" cy="290" r="5" fill="#63883a" stroke="#ffffff" />
                {/* Sagajeong Station */}
                <circle cx="175" cy="340" r="5" fill="#63883a" stroke="#ffffff" />
                {/* Junghwa Station */}
                <circle cx="190" cy="150" r="5" fill="#63883a" stroke="#ffffff" />
                {/* Meokgol Station */}
                <circle cx="178" cy="100" r="5" fill="#63883a" stroke="#ffffff" />
                {/* Bonghwasan Station */}
                <circle cx="270" cy="110" r="5" fill="#c06014" stroke="#ffffff" />
                {/* Mangu Station */}
                <circle cx="280" cy="190" r="5" fill="#008379" stroke="#ffffff" />
              </g>

              {/* Restaurant Marker Pins */}
              {restaurants.map(r => {
                const isSelected = r.dong === selectedDong;
                const px = (r.coordinates.x * 4);
                const py = (r.coordinates.y * 4);
                return (
                  <g
                    key={r.id}
                    onClick={() => onOpenDetail(r)}
                    className="cursor-pointer group/pin"
                  >
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? "11" : "7"}
                      fill={isSelected ? "#b02f00" : "#ff5722"}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="transition-all hover:scale-125"
                    />
                    <text
                      x={px}
                      y={py - 14}
                      textAnchor="middle"
                      className={`text-[10px] font-bold ${isSelected ? 'fill-[#b02f00]' : 'fill-[#5b4039]'} select-none`}
                    >
                      {r.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] text-[#5b4039] border border-[#eee7e1]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
                <span>맛집 위치</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-1 bg-[#63883a]"></span>
                <span>7호선</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-1 bg-[#008379]"></span>
                <span>경의중앙/경춘선</span>
              </span>
            </div>
          </div>

          {/* Dong Quick Spec Badges */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#5b4039] bg-[#faf2ec] p-2.5 rounded-xl border border-[#eee7e1]">
              <span className="font-semibold">주요 전철역</span>
              <span className="text-[#1e1b17] font-bold">{currentDongInfo.stations.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#5b4039] bg-[#faf2ec] p-2.5 rounded-xl border border-[#eee7e1]">
              <span className="font-semibold">대표 핫스팟</span>
              <span className="text-[#1e1b17] font-bold">{currentDongInfo.hotspots.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Right: Neighborhood Story & Restaurants In This Dong (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Dong Summary Card */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-sm border border-[#eee7e1]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#ffdbd1] text-[#862200] font-label-sm text-xs font-bold">
                {currentDongInfo.subtitle}
              </span>
              <button
                type="button"
                onClick={() => onGoToDirectoryWithDong(selectedDong)}
                className="text-xs text-[#ff5722] hover:text-[#b02f00] font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <span>{selectedDong} 전체 둘러보기</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
            <h2 className="font-headline-md text-xl sm:text-2xl text-[#1e1b17] font-extrabold mb-1.5">
              {currentDongInfo.dong} 미식 산책
            </h2>
            <p className="text-xs sm:text-sm text-[#5b4039] leading-relaxed">
              {currentDongInfo.description}
            </p>
          </div>

          {/* Restaurants in this Dong */}
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-base text-[#1e1b17] font-bold flex items-center gap-1.5">
              <span className="text-[#ff5722]">🍽️</span>
              <span>{selectedDong} 등록 추천 찐맛집 ({dongRestaurants.length}곳)</span>
            </h3>

            {dongRestaurants.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl text-center text-[#5b4039] border border-[#eee7e1]">
                현재 등록 준비 중인 동네입니다. 맛집 제보하기로 추천해 주세요!
              </div>
            ) : (
              dongRestaurants.map(r => (
                <div
                  key={r.id}
                  onClick={() => onOpenDetail(r)}
                  className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm hover:shadow-md transition-all border border-[#eee7e1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#faf2ec]">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80";
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-[#f4ede6] text-[#1e1b17] font-label-sm text-[11px] font-bold">
                          {r.categoryEmoji} {r.categoryName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full ${r.tagColor} font-label-sm text-[11px] font-bold`}>
                          {r.tag}
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-base sm:text-lg text-[#1e1b17] font-bold group-hover:text-[#b02f00] transition-colors truncate">
                        {r.name}
                      </h4>
                      <p className="text-xs text-[#ff5722] font-semibold truncate">
                        ✨ {r.signature}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#5b4039]">
                        <span>⭐ {r.rating} ({r.reviews})</span>
                        <span>•</span>
                        <span>{r.stationInfo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#eee7e1]">
                    <span className="font-label-md text-xs sm:text-sm font-bold text-[#b02f00]">
                      {r.priceRange}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(r);
                      }}
                      className="px-4 py-2 rounded-full bg-[#f4ede6] hover:bg-[#eee7e1] text-[#1e1b17] font-label-md text-xs font-bold transition-colors cursor-pointer"
                    >
                      상세보기
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
