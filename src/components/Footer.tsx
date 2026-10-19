import React from 'react';

interface FooterProps {
  onSelectDong: (dong: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDong }) => {
  return (
    <footer className="w-full bg-[#faf2ec] border-t border-[#eee7e1] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#eee7e1]">
          {/* Brand info */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-lg font-bold text-[#b02f00]">
                중랑구 맛집 탐방
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e8e1db] text-[#5b4039] font-label-sm text-xs font-semibold">
                골목 미식 가이드
              </span>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-[#5b4039] leading-relaxed">
              중랑구 주민들이 아끼는 골목 숨은 맛집, 전통시장 노포부터 따뜻한 감성 카페까지 진짜 동네 이야기를 기록하고 공유합니다.
            </p>
          </div>

          {/* Dong exploration links */}
          <div className="flex flex-col gap-2">
            <span className="font-label-md text-xs sm:text-sm font-bold text-[#1e1b17]">
              중랑구 동별 골목 탐방
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['면목동', '상봉동', '망우동', '중화동', '묵동', '신내동'].map(dong => (
                <button
                  key={dong}
                  type="button"
                  onClick={() => {
                    onSelectDong(dong);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="px-3 py-1 rounded-full bg-[#f4ede6] text-[#5b4039] hover:bg-[#b02f00] hover:text-white font-label-sm text-xs transition-colors cursor-pointer border border-[#eee7e1]"
                >
                  {dong}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[#5b4039] text-xs">
          <span className="font-label-sm">
            배포: GitHub Pages • 커뮤니티 기여 오픈소스 프로젝트
          </span>
          <span className="font-label-sm">
            © 2024 중랑구 맛집 탐방. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
