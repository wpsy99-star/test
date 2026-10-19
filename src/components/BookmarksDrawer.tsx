import React from 'react';
import { Restaurant } from '../data/restaurants';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Restaurant[];
  onOpenDetail: (restaurant: Restaurant) => void;
  onRemoveBookmark: (id: number) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onOpenDetail,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#33302c]/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between border-l border-[#eee7e1] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#eee7e1] flex items-center justify-between bg-[#fff8f3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#b02f00]">bookmark</span>
            <h3 className="font-headline-sm text-lg text-[#1e1b17] font-bold">
              내가 찜한 맛집 ({bookmarks.length}곳)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#faf2ec] flex items-center justify-center text-[#5b4039] hover:bg-[#eee7e1] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-3">
          {bookmarks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 text-[#5b4039]">
              <span className="text-4xl mb-2">⭐</span>
              <p className="font-headline-sm text-sm font-bold text-[#1e1b17]">
                아직 찜한 식당이 없어요
              </p>
              <p className="text-xs text-[#5b4039] mt-1">
                맛집 카드의 북마크 아이콘이나 상세 페이지에서 마음에 드는 식당을 찜해보세요!
              </p>
            </div>
          ) : (
            bookmarks.map(r => (
              <div
                key={r.id}
                onClick={() => {
                  onClose();
                  onOpenDetail(r);
                }}
                className="bg-[#faf2ec] hover:bg-[#f4ede6] transition-colors p-3.5 rounded-2xl flex items-center justify-between gap-3 border border-[#eee7e1] cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#eee7e1]">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80";
                      }}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-sm font-bold text-[#1e1b17] truncate group-hover:text-[#b02f00]">
                      {r.name}
                    </span>
                    <span className="text-xs text-[#ff5722] truncate">
                      {r.signature}
                    </span>
                    <span className="text-[11px] text-[#5b4039]">
                      📍 {r.dong} • ⭐ {r.rating}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBookmark(r.id);
                  }}
                  className="p-2 text-[#5b4039] hover:text-[#b02f00] transition-colors cursor-pointer shrink-0"
                  title="찜 해제"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#eee7e1] bg-[#fff8f3] flex items-center justify-between text-xs text-[#5b4039]">
          <span>로컬 스토리지에 안전하게 보관됩니다</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#f4ede6] text-[#1e1b17] font-semibold hover:bg-[#eee7e1] cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
