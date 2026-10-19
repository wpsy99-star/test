import React from 'react';
import { Restaurant } from '../data/restaurants';

interface DetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  restaurant,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!restaurant) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#33302c]/65 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl flex flex-col transform animate-scaleUp border border-[#eee7e1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Banner with Badges */}
        <div className="relative w-full h-56 sm:h-64 shrink-0 bg-[#faf2ec]">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#33302c]/75 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#33302c] transition-colors cursor-pointer"
            title="닫기"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-[#ff5722] text-white font-label-sm text-xs font-bold shadow-sm">
              {restaurant.categoryEmoji} {restaurant.categoryName}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1e1b17] font-label-sm text-xs font-semibold">
              📍 {restaurant.dong}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#ffd167] text-[#251a00] font-label-sm text-xs font-bold">
              {restaurant.tag}
            </span>
          </div>
        </div>

        {/* Detail Body Content */}
        <div className="p-5 sm:p-7 flex flex-col gap-5">
          {/* Title & Rating Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-headline-lg text-xl sm:text-2xl text-[#1e1b17] font-extrabold">
                {restaurant.name}
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#5b4039] mt-1 leading-relaxed">
                {restaurant.description}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 text-[#785a00]">
                <span className="material-symbols-outlined text-xl text-[#ffd167]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-headline-sm text-lg font-bold text-[#1e1b17]">
                  {restaurant.rating}
                </span>
              </div>
              <span className="font-label-sm text-xs text-[#5b4039]">
                리뷰 {restaurant.reviews}개
              </span>
            </div>
          </div>

          {/* Signature Menu List */}
          <div className="bg-[#faf2ec] rounded-2xl p-4 border border-[#eee7e1]">
            <h4 className="font-label-lg text-xs sm:text-sm text-[#1e1b17] font-bold flex items-center gap-1.5 mb-2.5">
              <span className="material-symbols-outlined text-[#ff5722] text-lg">restaurant_menu</span>
              대표 시그니처 메뉴
            </h4>
            <div className="flex flex-col gap-1.5">
              {restaurant.menuItems.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1 px-1 border-b border-[#eee7e1] last:border-b-0 text-[#1e1b17]"
                >
                  <span className="font-body-md text-xs sm:text-sm font-semibold">{m.name}</span>
                  <span className="font-label-lg text-xs sm:text-sm text-[#b02f00] font-bold">{m.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grid (Hours, Address, Price, Phone) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#5b4039] font-body-sm text-xs sm:text-sm">
            <div className="flex items-start gap-2 bg-[#fff8f3] p-3 rounded-xl border border-[#eee7e1]">
              <span className="material-symbols-outlined text-base text-[#ff5722] mt-0.5">location_on</span>
              <div>
                <span className="block font-label-sm text-xs text-[#1e1b17] font-bold">도로명 주소</span>
                <span className="text-xs text-[#5b4039]">{restaurant.address}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-[#fff8f3] p-3 rounded-xl border border-[#eee7e1]">
              <span className="material-symbols-outlined text-base text-[#ff5722] mt-0.5">schedule</span>
              <div>
                <span className="block font-label-sm text-xs text-[#1e1b17] font-bold">영업 시간</span>
                <span className="text-xs text-[#5b4039]">{restaurant.hours}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-[#fff8f3] p-3 rounded-xl border border-[#eee7e1]">
              <span className="material-symbols-outlined text-base text-[#ff5722] mt-0.5">payments</span>
              <div>
                <span className="block font-label-sm text-xs text-[#1e1b17] font-bold">평균 1인 가격대</span>
                <span className="text-xs text-[#5b4039]">{restaurant.priceRange}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-[#fff8f3] p-3 rounded-xl border border-[#eee7e1]">
              <span className="material-symbols-outlined text-base text-[#ff5722] mt-0.5">phone</span>
              <div>
                <span className="block font-label-sm text-xs text-[#1e1b17] font-bold">전화번호</span>
                <span className="text-xs text-[#5b4039]">{restaurant.phone}</span>
              </div>
            </div>
          </div>

          {/* External Link & Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={`https://map.naver.com/v5/search/${encodeURIComponent('중랑구 ' + restaurant.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-full bg-[#03C75A] text-white font-label-lg text-xs sm:text-sm font-bold shadow-md hover:bg-[#02b350] transition-colors flex items-center justify-center gap-2"
            >
              <span className="font-bold">N</span>
              <span>네이버 지도에서 길찾기 & 리뷰 보기</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
            <button
              type="button"
              onClick={onToggleBookmark}
              className={`px-5 py-3.5 rounded-full font-label-md text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border ${
                isBookmarked
                  ? 'bg-[#ffdbd1] text-[#862200] border-[#ffb5a0]'
                  : 'bg-[#faf2ec] text-[#1e1b17] border-[#eee7e1] hover:bg-[#eee7e1]'
              }`}
            >
              <span className="material-symbols-outlined text-base text-[#b02f00]">bookmark</span>
              <span>{isBookmarked ? '찜 해제' : '찜하기'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3.5 rounded-full bg-[#f4ede6] text-[#5b4039] font-label-lg text-xs sm:text-sm font-semibold hover:bg-[#eee7e1] transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
