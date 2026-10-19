import React, { useState, useMemo } from 'react';
import { Restaurant } from '../data/restaurants';

interface DirectoryViewProps {
  restaurants: Restaurant[];
  onOpenDetail: (restaurant: Restaurant) => void;
  onOpenQuickRoulette: () => void;
  onOpenSubmit: () => void;
  onGoToRoulette: () => void;
  isBookmarked: (id: number) => void | boolean;
  onToggleBookmark: (restaurant: Restaurant) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  restaurants,
  onOpenDetail,
  onOpenQuickRoulette,
  onOpenSubmit,
  onGoToRoulette,
  isBookmarked,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDong, setSelectedDong] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'popular' | 'rating' | 'budget'>('popular');

  // Filter & sort logic
  const filteredRestaurants = useMemo(() => {
    const list = restaurants.filter((r) => {
      // Category filter
      if (selectedCategory !== 'all' && r.category !== selectedCategory) {
        return false;
      }
      // Dong filter
      if (selectedDong !== 'all' && r.dong !== selectedDong) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesSig = r.signature.toLowerCase().includes(q);
        const matchesDong = r.dong.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesCat = r.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesSig && !matchesDong && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortOption === 'popular') return b.popularity - a.popularity;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'budget') return a.priceScore - b.priceScore;
      return 0;
    });

    return list;
  }, [restaurants, selectedCategory, selectedDong, searchQuery, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedDong('all');
    setSearchQuery('');
    setSortOption('popular');
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden pt-8 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        {/* Ambient Warm Orbs */}
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#ffdbd1]/50 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#ffdf9b]/50 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Text & CTAs (Left-aligned) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4ede6] shadow-sm mb-4 border border-[#eee7e1]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722] animate-ping"></span>
              <span className="font-label-md text-xs sm:text-sm text-[#5b4039] font-bold">
                중랑구 골목 식도락 로컬 프로젝트
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1e1b17] tracking-tight leading-tight">
              중랑구에서 오늘 점심 뭐 먹지?{' '}
              <span className="text-[#ff5722] inline-block hover:rotate-12 transition-transform cursor-pointer">
                🍱
              </span>
            </h1>

            <p className="mt-3 font-body-lg text-sm sm:text-base text-[#5b4039] max-w-xl leading-relaxed">
              중랑구 주민 & 고등학생들이 입 모아 추천하는 동네 찐 맛집 10곳!
              <br className="hidden sm:inline" /> 전통시장 노포 국수부터 학교 앞 추억의 즉석떡볶이, 감성 카페까지 생생하게 만나보세요.
            </p>

            {/* Stat Badges */}
            <div className="flex flex-wrap items-center justify-start gap-2.5 mt-5">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf2ec] shadow-sm border border-[#eee7e1]">
                <span className="text-[#ff5722] font-headline-sm">🔥</span>
                <span className="font-label-md text-xs sm:text-sm text-[#1e1b17]">
                  등록 찐맛집 <b className="text-[#b02f00]">10선</b>
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf2ec] shadow-sm border border-[#eee7e1]">
                <span className="text-[#785a00] font-headline-sm">📍</span>
                <span className="font-label-md text-xs sm:text-sm text-[#1e1b17]">
                  중랑 6개 법정동 완벽 커버
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf2ec] shadow-sm border border-[#eee7e1]">
                <span className="text-[#edc157] font-headline-sm">⭐</span>
                <span className="font-label-md text-xs sm:text-sm text-[#1e1b17]">
                  평점 <b className="text-[#1e1b17]">4.5+</b> 검증 명소
                </span>
              </div>
            </div>

            {/* CTA Roulette Trigger Button */}
            <div className="mt-7 flex flex-wrap items-center justify-start gap-3">
              <button
                onClick={onOpenQuickRoulette}
                type="button"
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#ffd167] via-[#ffdf9b] to-[#ffd167] text-[#251a00] font-headline-sm text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#ffd167]"
              >
                <span className="text-2xl transition-transform group-hover:rotate-180 duration-500">🎲</span>
                <span>오늘 점심 뭐 먹지? (추천 룰렛)</span>
                <span className="material-symbols-outlined text-[#251a00] font-bold text-xl">arrow_forward</span>
              </button>
              <button
                onClick={onGoToRoulette}
                type="button"
                className="px-4 py-3 rounded-full bg-white text-[#5b4039] hover:text-[#b02f00] hover:bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>엔진 전용화면</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Right Column: Uploaded Video Showcase */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#1e1b17] border-4 border-white group">
              {/* HTML5 Video Player */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <video
                  src="./royal_tomb_drone.mp4"
                  poster="./royal_tomb_poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-xs font-bold flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-ping"></span>
                    <span>중랑 역사문화로드 • 왕릉 드론 뷰</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3 pointer-events-none">
                  <span className="px-2 py-0.5 rounded-md bg-[#ffd167] text-[#251a00] font-label-sm text-[11px] font-extrabold shadow-sm">
                    HD 4K
                  </span>
                </div>
              </div>

              {/* Video Caption Bar */}
              <div className="bg-[#faf2ec] p-3.5 sm:p-4 flex items-center justify-between border-t border-[#eee7e1]">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="font-label-md text-xs sm:text-sm font-bold text-[#1e1b17] truncate">
                    조선왕릉 & 중랑 둘레길 항공 전경
                  </span>
                  <span className="text-[11px] text-[#5b4039] truncate">
                    미식 탐방과 함께 즐기는 고즈넉한 로컬 명소 투어
                  </span>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-[#ff5722]">
                  <span className="material-symbols-outlined text-xl">play_circle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS & FILTER SECTION */}
      <section className="sticky top-20 z-40 bg-[#fff8f3]/95 backdrop-blur-md shadow-sm py-4 px-4 sm:px-6 lg:px-8 transition-all border-b border-[#eee7e1]/80">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Top Row: Search Bar & Count & Sorting */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-2xl">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ff5722] pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="음식점 이름이나 대표 메뉴(예: 떡볶이, 갈비탕, 파스타) 검색..."
                className="w-full pl-12 pr-10 py-2.5 sm:py-3 rounded-full bg-white text-[#1e1b17] placeholder:text-[#5b4039]/60 font-body-md text-sm sm:text-base shadow-sm border border-[#eee7e1] focus:outline-none focus:ring-2 focus:ring-[#ff5722] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#eee7e1] flex items-center justify-center text-[#5b4039] hover:bg-[#e8e1db] transition-colors cursor-pointer"
                  title="검색어 지우기"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            {/* Meta Counters & Sort */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <div className="font-label-md text-xs sm:text-sm text-[#5b4039]">
                검색 결과: <span className="font-headline-sm text-base font-bold text-[#ff5722]">{filteredRestaurants.length}</span>곳
              </div>
              <div className="flex items-center gap-1 bg-[#faf2ec] px-3 py-1.5 rounded-full shadow-sm border border-[#eee7e1]">
                <span className="material-symbols-outlined text-sm text-[#5b4039]">tune</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as 'popular' | 'rating' | 'budget')}
                  className="bg-transparent text-[#1e1b17] font-label-md text-xs sm:text-sm focus:outline-none cursor-pointer pr-1"
                >
                  <option value="popular">인기순</option>
                  <option value="rating">평점 높은순</option>
                  <option value="budget">가격 낮은순 (가성비)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-nowrap">
            {[
              { id: 'all', label: '전체 보기', emoji: '' },
              { id: 'korean', label: '한식', emoji: '🍲' },
              { id: 'snack', label: '분식/노포', emoji: '🍢' },
              { id: 'chinese', label: '중식', emoji: '🥟' },
              { id: 'japanese', label: '일식', emoji: '🍣' },
              { id: 'western', label: '양식', emoji: '🍝' },
              { id: 'cafe', label: '카페/베이커리', emoji: '☕' },
            ].map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm transition-all cursor-pointer ${
                    active
                      ? 'bg-[#ff5722] text-white shadow-md font-bold'
                      : 'bg-white text-[#5b4039] hover:bg-[#faf2ec] border border-[#eee7e1] shadow-sm'
                  }`}
                >
                  {cat.emoji && <span className="mr-1">{cat.emoji}</span>}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Neighborhood Filter Sub-track */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 text-nowrap">
            <span className="font-label-sm text-xs text-[#5b4039] font-bold pr-1 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs text-[#ff5722]">near_me</span> 동별 이동:
            </span>
            {['all', '면목동', '상봉동', '망우동', '중화동', '묵동', '신내동'].map((dong) => {
              const active = selectedDong === dong;
              return (
                <button
                  key={dong}
                  type="button"
                  onClick={() => setSelectedDong(dong)}
                  className={`px-3 py-1 rounded-full font-label-sm text-xs transition-all cursor-pointer ${
                    active
                      ? 'bg-[#33302c] text-[#f7efe9] font-bold shadow-sm'
                      : 'bg-[#f4ede6] text-[#5b4039] hover:bg-[#eee7e1]'
                  }`}
                >
                  {dong === 'all' ? '전체 동' : dong}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESTAURANT GRID SECTION */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filteredRestaurants.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[#f4ede6] flex items-center justify-center text-4xl mb-4 shadow-inner">
              🔍
            </div>
            <h3 className="font-headline-sm text-lg text-[#1e1b17] font-bold">
              조건에 맞는 맛집을 찾을 수 없어요
            </h3>
            <p className="font-body-md text-sm text-[#5b4039] mt-1 max-w-sm">
              검색어를 수정하거나 선택된 필터를 초기화해 보세요!
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#ff5722] text-white font-label-md text-sm shadow-md hover:bg-[#b02f00] transition-all cursor-pointer"
            >
              전체 조건 초기화하기
            </button>
          </div>
        ) : (
          /* The 10 Restaurants Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredRestaurants.map((r) => {
              const bookmarked = Boolean(isBookmarked(r.id));
              return (
                <article
                  key={r.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 border border-[#eee7e1]"
                >
                  <div>
                    {/* Thumbnail Container */}
                    <div
                      onClick={() => onOpenDetail(r)}
                      className="relative w-full aspect-[16/10] overflow-hidden bg-[#faf2ec] cursor-pointer"
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>

                      {/* Badges Left */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1e1b17] font-label-sm text-xs font-bold shadow-sm">
                          {r.categoryEmoji} {r.categoryName}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full ${r.tagColor} font-label-sm text-xs font-bold shadow-sm`}>
                          {r.tag}
                        </span>
                      </div>

                      {/* Dong Badge Right & Bookmark */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-[#33302c]/85 backdrop-blur-md text-[#f7efe9] font-label-sm text-xs font-semibold">
                          📍 {r.dong}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(r);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            bookmarked
                              ? 'bg-[#ff5722] text-white shadow-md'
                              : 'bg-white/80 backdrop-blur-md text-[#5b4039] hover:bg-white'
                          }`}
                          title={bookmarked ? '찜 해제' : '찜하기'}
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            bookmark
                          </span>
                        </button>
                      </div>

                      {/* Signature Pill overlay bottom */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1e1b17] text-xs font-semibold truncate max-w-full shadow-sm">
                          ✨ 대표: {r.signature}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2">
                      {/* Title & Star Rating */}
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => onOpenDetail(r)}
                          className="font-headline-sm text-base sm:text-lg text-[#1e1b17] font-bold group-hover:text-[#b02f00] transition-colors cursor-pointer line-clamp-1"
                        >
                          {r.name}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0 bg-[#faf2ec] px-2 py-0.5 rounded-full border border-[#eee7e1]">
                          <span className="text-[#785a00] font-bold text-xs">⭐</span>
                          <span className="font-label-md text-xs font-bold text-[#1e1b17]">{r.rating}</span>
                          <span className="font-label-sm text-[11px] text-[#5b4039] font-normal">
                            ({r.reviews})
                          </span>
                        </div>
                      </div>

                      {/* Subway Station Walking distance */}
                      <p className="font-body-sm text-xs sm:text-sm text-[#5b4039] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#ff5722]">
                          directions_walk
                        </span>
                        <span>{r.stationInfo}</span>
                      </p>

                      {/* Price Range */}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="material-symbols-outlined text-xs text-[#5b4039]">payments</span>
                        <span className="font-label-sm text-xs text-[#5b4039] font-medium">
                          {r.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bottom Bar */}
                  <div className="px-4 sm:px-5 pb-4 pt-2 flex items-center gap-2 border-t border-[#faf2ec]">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(r)}
                      className="flex-1 py-2.5 rounded-full bg-[#f4ede6] text-[#1e1b17] font-label-md text-xs sm:text-sm font-bold hover:bg-[#eee7e1] active:scale-95 transition-all text-center cursor-pointer"
                    >
                      상세 정보 보기
                    </button>
                    <a
                      href={`https://map.naver.com/v5/search/${encodeURIComponent('중랑구 ' + r.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-full bg-[#faf2ec] text-[#5b4039] hover:text-[#b02f00] hover:bg-[#ffdbd1]/40 font-label-sm text-xs transition-colors flex items-center gap-0.5 border border-[#eee7e1]"
                      title="네이버 지도 길찾기"
                    >
                      <span>길찾기</span>
                      <span className="material-symbols-outlined text-xs">north_east</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* HIGHLIGHT BANNER: LOCAL STORY / STUDENTS */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f4ede6] via-[#eee7e1] to-[#faf2ec] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#eee7e1]">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#008379] text-white font-label-sm text-xs font-bold shadow-sm">
              학생 & 청년 로컬 맛지도
            </span>
            <h2 className="font-headline-lg text-xl sm:text-2xl text-[#1e1b17] font-extrabold">
              “나만 알기 아까운 중랑구 맛집이 있나요?”
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#5b4039] leading-relaxed">
              혜원여고, 송곡여고, 중화고 등 학생들이 즐겨 찾는 착한가격 식당과 골목 숨은 노포를 자유롭게 제보해 주세요.
              매달 베스트 리뷰어 3분께 디저트 상품권을 선물합니다!
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenSubmit}
              className="inline-flex justify-center items-center gap-1.5 px-6 py-3.5 rounded-full bg-[#ff5722] text-white font-label-lg text-sm font-bold shadow-md hover:bg-[#b02f00] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">edit_note</span>
              <span>우리 동네 맛집 제보하기</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
