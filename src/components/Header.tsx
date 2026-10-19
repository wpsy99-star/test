import React, { useState } from 'react';

interface HeaderProps {
  currentTab: 'directory' | 'roulette' | 'map';
  onSelectTab: (tab: 'directory' | 'roulette' | 'map') => void;
  onOpenSubmit: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSubmit,
  onOpenBookmarks,
  bookmarkCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff8f3]/90 backdrop-blur-xl shadow-[0_2px_12px_rgba(68,50,30,0.06)] border-b border-[#eee7e1]/70">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Avatar */}
        <div 
          onClick={() => { onSelectTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
        >
          <img
            alt="중랑구 맛집 탐방 캐릭터"
            className="h-9 w-9 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBnfmlTa6CzZftBzZv3I7DYrHAySlB0nanPebWfBUpiUu9_03faXWxRVuvb81B9NCL8W27oSuzb2A7BIoQoOeIA7xCkMbK8ZF5CcFeXh92f-18pVkCDuNu7IhPzMuH_WgiWQe_6V81FTv9UHh6cYx6L-db9v4YNeelpsl3L3wudkjzM5YyNpaGoNsS1RrnH96qNQp2LzBPyV3fGuPzLi4kkq9W7bokRAaTHKR5TpR17G7e7ATL0Lu2"
            onError={(e) => {
              // fallback if network issue
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80";
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#b02f00]">
                중랑구 맛집 탐방
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffd167] text-[#765900] font-label-sm text-xs font-bold">
                우리 동네 찐 맛집
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#faf2ec] p-1.5 rounded-full border border-[#eee7e1]">
          <button
            type="button"
            onClick={() => onSelectTab('directory')}
            className={`px-4 py-2 transition-all font-label-md text-sm cursor-pointer rounded-full ${
              currentTab === 'directory'
                ? 'bg-[#ff5722] text-white font-bold shadow-[0_4px_12px_rgba(255,87,34,0.3)]'
                : 'text-[#5b4039] hover:text-[#1e1b17] hover:bg-[#eee7e1]'
            }`}
          >
            맛집 둘러보기
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('roulette')}
            className={`px-4 py-2 transition-all font-label-md text-sm cursor-pointer rounded-full flex items-center gap-1.5 ${
              currentTab === 'roulette'
                ? 'bg-[#ff5722] text-white font-bold shadow-[0_4px_12px_rgba(255,87,34,0.3)]'
                : 'text-[#5b4039] hover:text-[#1e1b17] hover:bg-[#eee7e1]'
            }`}
          >
            <span>오늘 뭐 먹지? (랜덤 추천)</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('map')}
            className={`px-4 py-2 transition-all font-label-md text-sm cursor-pointer rounded-full ${
              currentTab === 'map'
                ? 'bg-[#ff5722] text-white font-bold shadow-[0_4px_12px_rgba(255,87,34,0.3)]'
                : 'text-[#5b4039] hover:text-[#1e1b17] hover:bg-[#eee7e1]'
            }`}
          >
            동네별 지도
          </button>
          <button
            type="button"
            onClick={onOpenSubmit}
            className="px-4 py-2 rounded-full font-label-md text-sm text-[#5b4039] hover:text-[#1e1b17] hover:bg-[#eee7e1] transition-colors cursor-pointer"
          >
            맛집 제보
          </button>
        </nav>

        {/* Right CTA & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Bookmark Badge Button */}
          <button
            type="button"
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-full bg-[#faf2ec] hover:bg-[#eee7e1] text-[#5b4039] transition-colors flex items-center justify-center cursor-pointer"
            title="찜한 맛집 목록"
          >
            <span className="material-symbols-outlined text-xl text-[#b02f00]">bookmark</span>
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff5722] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Quick Roulette Button */}
          <button
            type="button"
            onClick={() => onSelectTab('roulette')}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#ffd167] text-[#251a00] font-label-md text-sm font-bold shadow-[0_4px_14px_rgba(120,90,0,0.15)] hover:bg-[#ffdf9b] transition-all active:scale-95 cursor-pointer"
          >
            <span>🎲</span>
            <span className="hidden sm:inline">
              {currentTab === 'roulette' ? '룰렛 플레이 중' : '오늘 점심 뭐 먹지?'}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center pl-1">
            <img
              alt="프로필 아바타"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffdbd1] shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASuidGismCfzfoN6neb_XYoEHqOESykj03FF3WoRj_MyfkMTK0zp3D3o8yZgntmLGF8ais4G2zajBKA3SYFHRNxkJ6FMJ_IB7Evl8YutQBOcdQ5wxRgOAiM-QYn6mIND0Ob8StuuWNZ86RaNysQoC7zbwNnJmFTu6JGI2Ay89jbNuxIgDigbKv39c_4gqjOLycRWnAT1SRA5od7gd6_pBlLo1DAa5pTnATs-JQVSR98bHFoVUYlW0I"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
              }}
            />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#5b4039] hover:bg-[#faf2ec] cursor-pointer"
            aria-label="메뉴 열기"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f3] border-b border-[#eee7e1] px-4 py-3 flex flex-col gap-2 shadow-lg animate-fadeIn">
          <button
            type="button"
            onClick={() => { onSelectTab('directory'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md text-sm ${
              currentTab === 'directory' ? 'bg-[#ff5722] text-white font-bold' : 'text-[#1e1b17] hover:bg-[#faf2ec]'
            }`}
          >
            📋 맛집 둘러보기
          </button>
          <button
            type="button"
            onClick={() => { onSelectTab('roulette'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md text-sm ${
              currentTab === 'roulette' ? 'bg-[#ff5722] text-white font-bold' : 'text-[#1e1b17] hover:bg-[#faf2ec]'
            }`}
          >
            🎲 오늘 뭐 먹지? (랜덤 추천 룰렛)
          </button>
          <button
            type="button"
            onClick={() => { onSelectTab('map'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md text-sm ${
              currentTab === 'map' ? 'bg-[#ff5722] text-white font-bold' : 'text-[#1e1b17] hover:bg-[#faf2ec]'
            }`}
          >
            🗺️ 동네별 지도
          </button>
          <button
            type="button"
            onClick={() => { onOpenSubmit(); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-xl font-label-md text-sm text-[#1e1b17] hover:bg-[#faf2ec]"
          >
            ✍️ 맛집 제보하기
          </button>
          <button
            type="button"
            onClick={() => { onOpenBookmarks(); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-xl font-label-md text-sm text-[#1e1b17] hover:bg-[#faf2ec] flex items-center justify-between"
          >
            <span>⭐ 내가 찜한 맛집</span>
            <span className="bg-[#ffdbd1] text-[#862200] px-2 py-0.5 rounded-full text-xs font-bold">
              {bookmarkCount}곳
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
