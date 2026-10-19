import React, { useState, useEffect } from 'react';
import { Restaurant } from '../data/restaurants';
import { playTickSound, playWinFanfare } from '../utils/sound';

interface QuickRouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  onOpenDetail: (restaurant: Restaurant) => void;
}

export const QuickRouletteModal: React.FC<QuickRouletteModalProps> = ({
  isOpen,
  onClose,
  restaurants,
  onOpenDetail
}) => {
  const [isRolling, setIsRolling] = useState(true);
  const [currentCandidate, setCurrentCandidate] = useState<Restaurant>(restaurants[0]);
  const [currentEmoji, setCurrentEmoji] = useState('🍜');
  const [chosenPick, setChosenPick] = useState<Restaurant | null>(null);

  const startSpin = () => {
    setIsRolling(true);
    setChosenPick(null);
    const emojis = ["🍜", "🍢", "🍲", "🥩", "🥟", "🍣", "☕", "🍕"];
    let step = 0;
    const maxSteps = 14;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const randomItem = restaurants[randomIndex];
      setCurrentCandidate(randomItem);
      setCurrentEmoji(emojis[step % emojis.length]);
      playTickSound();
      step++;

      if (step >= maxSteps) {
        clearInterval(interval);
        const finalPick = restaurants[Math.floor(Math.random() * restaurants.length)];
        setChosenPick(finalPick);
        setIsRolling(false);
        playWinFanfare();
      }
    }, 110);
  };

  useEffect(() => {
    if (isOpen) {
      startSpin();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#33302c]/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center transform animate-scaleUp border border-[#eee7e1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#faf2ec] flex items-center justify-center text-[#5b4039] hover:bg-[#eee7e1] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <span className="px-3 py-1 rounded-full bg-[#ffd167] text-[#251a00] font-label-sm text-xs font-bold mb-2">
          오늘의 행운 픽! 🍽️
        </span>
        <h3 className="font-headline-md text-xl text-[#1e1b17] font-extrabold">
          중랑구 룰렛이 추천하는 식당
        </h3>
        <p className="font-body-sm text-xs text-[#5b4039] mt-1">
          결정 장애 탈출! 오늘 식사는 이곳으로 정해졌어요.
        </p>

        {/* Animated Roulette Wheel Visual Box */}
        <div className="relative w-full my-4 bg-[#faf2ec] rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden min-h-[220px] border border-[#eee7e1]">
          {isRolling ? (
            <div className="flex flex-col items-center justify-center transition-all animate-pulse">
              <div className="text-6xl animate-bounce mb-2">{currentEmoji}</div>
              <div className="font-headline-md text-lg text-[#ff5722] font-bold">
                {currentCandidate.name}
              </div>
              <p className="font-body-sm text-xs text-[#5b4039] mt-1 truncate max-w-xs">
                {currentCandidate.signature}
              </p>
            </div>
          ) : chosenPick ? (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 shadow-sm bg-[#eee7e1]">
                <img
                  src={chosenPick.image}
                  alt={chosenPick.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#33302c]/80 backdrop-blur-sm text-white font-label-sm text-xs">
                  📍 {chosenPick.dong}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#ff5722] text-white font-label-sm text-xs font-bold">
                  {chosenPick.categoryEmoji} {chosenPick.categoryName}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#785a00] mb-0.5 font-headline-sm text-sm font-bold">
                <span>⭐</span>
                <span>{chosenPick.rating}</span>
                <span className="text-[#5b4039] font-normal text-xs">({chosenPick.reviews})</span>
              </div>
              <h4 className="font-headline-md text-lg text-[#1e1b17] font-extrabold">
                {chosenPick.name}
              </h4>
              <p className="font-body-md text-xs sm:text-sm text-[#ff5722] font-semibold mt-0.5 truncate max-w-full">
                ✨ {chosenPick.signature}
              </p>
              <p className="font-label-sm text-xs text-[#5b4039] mt-2 bg-white px-3 py-1 rounded-full border border-[#eee7e1]">
                평균 {chosenPick.priceRange}
              </p>
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2 mt-1">
          <button
            type="button"
            onClick={startSpin}
            disabled={isRolling}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#ffd167] to-[#ffdf9b] text-[#251a00] font-headline-sm text-sm font-bold shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">autorenew</span>
            <span>다른 메뉴 다시 돌리기</span>
          </button>
          {chosenPick && !isRolling && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDetail(chosenPick);
              }}
              className="w-full py-3 rounded-full bg-[#ff5722] text-white font-label-lg text-sm font-bold shadow-md hover:bg-[#b02f00] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>이 식당 상세 정보 보기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
