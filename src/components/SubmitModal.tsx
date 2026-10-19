import React, { useState } from 'react';
import { Restaurant } from '../data/restaurants';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRestaurant: (newRestaurant: Restaurant) => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitRestaurant
}) => {
  const [name, setName] = useState('');
  const [dong, setDong] = useState<'면목동' | '상봉동' | '망우동' | '중화동' | '묵동' | '신내동'>('면목동');
  const [category, setCategory] = useState<'korean' | 'snack' | 'chinese' | 'japanese' | 'western' | 'cafe'>('snack');
  const [signature, setSignature] = useState('');
  const [priceRange, setPriceRange] = useState('6,000원 ~ 9,000원');
  const [stationInfo, setStationInfo] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('학생 추천');
  const [nickname, setNickname] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signature.trim()) {
      alert('식당 이름과 대표 메뉴를 입력해 주세요!');
      return;
    }

    const catMap: Record<string, { name: string; emoji: string }> = {
      korean: { name: '한식', emoji: '🍲' },
      snack: { name: '분식/노포', emoji: '🍢' },
      chinese: { name: '중식', emoji: '🥟' },
      japanese: { name: '일식', emoji: '🍣' },
      western: { name: '양식', emoji: '🍝' },
      cafe: { name: '카페/베이커리', emoji: '☕' }
    };

    const newRestaurant: Restaurant = {
      id: Date.now(),
      name: name.trim(),
      category,
      categoryName: catMap[category].name,
      categoryEmoji: catMap[category].emoji,
      dong,
      tag: tag || '주민 제보',
      tagColor: 'bg-[#ff5722] text-white',
      rating: 4.8,
      reviews: 1,
      signature: signature.trim(),
      priceRange: priceRange || '7,000원 ~ 10,000원',
      priceScore: 1,
      popularity: 85,
      address: `서울 중랑구 ${dong} 일대`,
      stationInfo: stationInfo || `${dong} 중심가 도보 5분`,
      hours: '11:00 ~ 21:00',
      phone: '02-490-0000',
      description: description.trim() || `${nickname ? `${nickname} 님이` : '동네 주민이'} 추천한 가성비와 맛이 뛰어난 중랑구 로컬 맛집입니다.`,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      vibe: 'friends',
      coordinates: { x: 50, y: 50 },
      menuItems: [
        { name: signature.trim(), price: priceRange.split('~')[0].trim() || '7,000원' }
      ]
    };

    onSubmitRestaurant(newRestaurant);
    alert(`🎉 '${name}' 맛집이 제보되었습니다! 둘러보기 목록에 즉시 추가되었습니다.`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#33302c]/65 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col border border-[#eee7e1]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#faf2ec] flex items-center justify-center text-[#5b4039] hover:bg-[#eee7e1] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="px-3 py-1 rounded-full bg-[#ffd167] text-[#251a00] font-label-sm text-xs font-bold">
            ✍️ 로컬 미식 제보
          </span>
        </div>
        <h3 className="font-headline-md text-xl sm:text-2xl text-[#1e1b17] font-extrabold">
          우리 동네 숨은 찐맛집 제보하기
        </h3>
        <p className="font-body-sm text-xs sm:text-sm text-[#5b4039] mt-1 mb-5">
          학생 시절 단골 분식집부터 골목 속 나만 알던 노포까지! 중랑구 이웃들과 함께 맛있는 이야기를 나눠보세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
              음식점 이름 *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 혜원분식, 상봉손만두"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
                동네 선택 *
              </label>
              <select
                value={dong}
                onChange={(e) => setDong(e.target.value as typeof dong)}
                className="w-full px-3 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722] cursor-pointer"
              >
                <option value="면목동">면목동</option>
                <option value="상봉동">상봉동</option>
                <option value="망우동">망우동</option>
                <option value="중화동">중화동</option>
                <option value="묵동">묵동</option>
                <option value="신내동">신내동</option>
              </select>
            </div>
            <div>
              <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
                카테고리 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full px-3 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722] cursor-pointer"
              >
                <option value="snack">🍢 분식/노포</option>
                <option value="korean">🍲 한식</option>
                <option value="chinese">🥟 중식</option>
                <option value="japanese">🍣 일식</option>
                <option value="western">🍝 양식</option>
                <option value="cafe">☕ 카페/베이커리</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
              대표 시그니처 메뉴 *
            </label>
            <input
              type="text"
              required
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="예: 치즈 쫄볶이, 연탄 고추장불고기"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
                예상 가격대
              </label>
              <input
                type="text"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                placeholder="예: 6,000원 ~ 9,000원"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
              />
            </div>
            <div>
              <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
                특징 태그
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="예: 학생 추천, 가성비 최고"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
              가까운 전철역 / 위치 팁
            </label>
            <input
              type="text"
              value={stationInfo}
              onChange={(e) => setStationInfo(e.target.value)}
              placeholder="예: 사가정역 2번 출구 도보 4분"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          <div>
            <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
              추천 이유 & 꿀팁 한 줄
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="이곳을 추천하는 특별한 이유나 주문 꿀팁을 적어주세요!"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722] resize-none"
            />
          </div>

          <div>
            <label className="block font-label-md text-xs sm:text-sm text-[#1e1b17] font-bold mb-1">
              제보자 닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 송곡여고 2회 졸업생, 면목동 토박이"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#faf2ec] border border-[#eee7e1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-[#faf2ec] text-[#5b4039] font-label-md text-xs sm:text-sm hover:bg-[#eee7e1] transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#ff5722] text-white font-label-lg text-xs sm:text-sm font-bold shadow-md hover:bg-[#b02f00] transition-all cursor-pointer"
            >
              제보 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
