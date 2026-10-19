export interface MenuItem {
  name: string;
  price: string;
}

export interface Restaurant {
  id: number;
  name: string;
  category: 'korean' | 'snack' | 'chinese' | 'japanese' | 'western' | 'cafe';
  categoryName: string;
  categoryEmoji: string;
  dong: '면목동' | '상봉동' | '망우동' | '중화동' | '묵동' | '신내동';
  tag: string;
  tagColor: string;
  rating: number;
  reviews: number;
  signature: string;
  priceRange: string;
  priceScore: number; // 1: budget (<10k), 2: mid (10-15k), 3: full (15k+)
  popularity: number;
  address: string;
  stationInfo: string;
  hours: string;
  phone: string;
  description: string;
  image: string;
  menuItems: MenuItem[];
  vibe: 'solo' | 'friends' | 'date';
  coordinates: { x: number; y: number }; // Relative coordinates for interactive map
}

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 1,
    name: "면목 할머니 닭도리탕",
    category: "korean",
    categoryName: "한식",
    categoryEmoji: "🍲",
    dong: "면목동",
    tag: "골목 최강자",
    tagColor: "bg-primary-container text-on-primary",
    rating: 4.9,
    reviews: 520,
    signature: "마늘 폭탄 매콤 닭볶음탕",
    priceRange: "10,000원 ~ 15,000원",
    priceScore: 2,
    popularity: 100,
    address: "서울 중랑구 면목로55길 9 (면목동)",
    stationInfo: "면목역 2번 출구 도보 5분",
    hours: "15:00 ~ 23:30 (일요일 휴무)",
    phone: "02-492-3310",
    description: "간마늘을 아낌없이 한 국자 크게 올려 끓여내는 칼칼하고 진한 국물의 닭도리탕. 포슬포슬 익은 감자를 으깨어 밥에 비벼 먹으면 밥 두 공기는 순식간입니다.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFM6XZIgl7K-_CfdEYrGN0fxebdZjDcKU8nB7YFiOyr9iigx7zo3TImsYdhopJPh0dGl36kkJq7AAUFdLr6ETETfttMhsHi9y7AtII_Nay9pD2olvCnnELtNbbiREJG1Dd7M_l-iwDyKb6a4Z5SVMeqGUdeWj2bA_BzMki-kYRGoAMEsxLQ-ezX7rs2hu7U7ujddwtM03JgPyaA0WWIqlW6yRLLgQASl9Xzk3lmRrB2Mvtkawpg3wF",
    vibe: "friends",
    coordinates: { x: 38, y: 72 },
    menuItems: [
      { name: "마늘 닭도리탕 (중)", price: "26,000원" },
      { name: "넓적 당면 사리", price: "2,500원" },
      { name: "날치알 볶음밥", price: "3,000원" }
    ]
  },
  {
    id: 2,
    name: "사가정 혜원여고 즉석떡볶이",
    category: "snack",
    categoryName: "분식/노포",
    categoryEmoji: "🍢",
    dong: "면목동",
    tag: "학생 추천",
    tagColor: "bg-secondary-container text-on-secondary-container",
    rating: 4.9,
    reviews: 340,
    signature: "치즈 라볶이 세트 & 야끼만두",
    priceRange: "5,000원 ~ 7,500원",
    priceScore: 1,
    popularity: 99,
    address: "서울 중랑구 사가정로 382 (면목동)",
    stationInfo: "사가정역 1번 출구 도보 7분",
    hours: "11:00 ~ 20:00 (재료 소진 시 조기 마감)",
    phone: "02-493-1994",
    description: "혜원여고생들의 방과 후 성지이자 졸업생들이 성인이 되어서도 찾아오는 전설의 즉석떡볶이집. 달콤매콤한 춘장-고추장 황금비율 소스에 볶음밥은 필수!",
    image: "https://images.unsplash.com/photo-1662992850989-183e85e49c71?auto=format&fit=crop&w=800&q=80",
    vibe: "friends",
    coordinates: { x: 42, y: 84 },
    menuItems: [
      { name: "즉석 떡볶이 (1인분)", price: "5,000원" },
      { name: "치즈 볶음밥", price: "2,500원" },
      { name: "바삭 야끼만두 3개", price: "1,500원" }
    ]
  },
  {
    id: 3,
    name: "동부시장 맑은손칼국수",
    category: "korean",
    categoryName: "한식",
    categoryEmoji: "🍲",
    dong: "상봉동",
    tag: "가성비 최고",
    tagColor: "bg-tertiary-container text-on-tertiary-container",
    rating: 4.8,
    reviews: 215,
    signature: "바지락 손칼국수 & 겉절이",
    priceRange: "6,000원 ~ 8,000원",
    priceScore: 1,
    popularity: 98,
    address: "서울 중랑구 망우로32길 14 (상봉동, 동부시장 입구)",
    stationInfo: "상봉역 4번 출구 도보 5분",
    hours: "10:30 ~ 20:30 (매주 화요일 휴무)",
    phone: "02-435-8821",
    description: "동부시장에서 20년 넘게 주민들의 든든한 한 끼를 책임져온 손칼국수 노포. 매일 직접 반죽해 쫄깃한 면발과 해장으로 일품인 맑은 바지락 육수가 자랑입니다.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzjXVcAAZiK3cB0zpV-1BmZi-E9f4t2mbyyXa2IG8cfsmS2OvGKBv5FVM0bBuGRxcCUzzfNlByZ2UuVUQl7rvb6VQ9n4BdoZFXY68r8CdUpBBU8RkZuAxDbw4m6iglBcxe1Zwvueoq_GToQHPl4RCdqc7pXq5Q6KfDKjB75-v6VSj-m_DoahlS1awuWq6NR_T5oXGEkaoM_Sx8ZQRkQA__0wCXW37QA9bR1aIf8O-8ZqfYNtT_PMaW",
    vibe: "solo",
    coordinates: { x: 50, y: 55 },
    menuItems: [
      { name: "바지락 손칼국수", price: "7,000원" },
      { name: "얼큰 수제비", price: "7,500원" },
      { name: "수제 왕만두 (5개)", price: "6,000원" }
    ]
  },
  {
    id: 4,
    name: "상봉 먹자골목 연탄갈비",
    category: "korean",
    categoryName: "한식",
    categoryEmoji: "🍲",
    dong: "상봉동",
    tag: "주민 원픽",
    tagColor: "bg-primary-container text-on-primary",
    rating: 4.8,
    reviews: 410,
    signature: "연탄 초벌 돼지양념갈비",
    priceRange: "13,000원 ~ 18,000원",
    priceScore: 3,
    popularity: 97,
    address: "서울 중랑구 봉우재로33길 45 (상봉동 먹자골목)",
    stationInfo: "상봉역 2번 출구 도보 3분",
    hours: "16:00 ~ 24:00 (연중무휴)",
    phone: "02-432-1590",
    description: "은은한 연탄불에 미리 80% 초벌해 육즙이 가득 살아있는 양념갈비 맛집. 불향 가득한 갈비 한 점에 시원한 동치미국수 조합이 일품입니다.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDffzFEqLpSLzbiTRXtvqdJPa6fTPWxM1dXBR5deyxZoY257XE6phYfuXzmssTJTw0GP7peI5O0IYPKMozvFMYVkkoljcPUeLWpb24xFNkfv6a7Yeaifv1oq4YhXoRzgidEZ3TzmgMAbzOPJaz8aHAlc-P9O4cYcilUUQltGWi6iExQFQnSJMwWU7Jiegl1z_luQOX6igNcb46Ey9cKQp48R10j9xsA37V0O1qNiswtBmgMnPaRV5I9",
    vibe: "friends",
    coordinates: { x: 55, y: 50 },
    menuItems: [
      { name: "연탄초벌 돼지갈비 (250g)", price: "14,000원" },
      { name: "살얼음 동치미김치국수", price: "5,000원" },
      { name: "차돌 된장찌개", price: "6,000원" }
    ]
  },
  {
    id: 5,
    name: "신내 우디로그 하우스 카페",
    category: "cafe",
    categoryName: "카페/베이커리",
    categoryEmoji: "☕",
    dong: "신내동",
    tag: "감성 힐링",
    tagColor: "bg-surface-variant text-on-surface-variant",
    rating: 4.8,
    reviews: 310,
    signature: "시그니처 솔티드 크림라떼 & 소금빵",
    priceRange: "4,500원 ~ 7,000원",
    priceScore: 1,
    popularity: 95,
    address: "서울 중랑구 용마산로139가길 22 (신내동)",
    stationInfo: "봉화산역 3번 출구 도보 9분",
    hours: "10:00 ~ 22:00 (월요일 휴무)",
    phone: "070-8841-3912",
    description: "따뜻한 원목 인테리어와 통창 너머로 푸른 공원 뷰가 펼쳐지는 신내동 핫플레이스. 당일 구워내는 바삭 쫄깃한 버터 소금빵과 단짠 크림라떼가 인기입니다.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGiSDaR4-P0KFB8eDOS0AxXgb3cSn3RpGNyWJwSuS5fDZXQ3sf4FrY1zfifqdac3GF9UzetaaRnqztKue4seedYGDuUQn5pC_fHLYVYMvBv0bxJuBvYHedGkbu9NbYTFOHb4eN9QhHrFhCHQdQ4AmcB23-gRjrLBJ5oY0J5oIamE1PyCTSos7jzbrEm0e9rTWbi0kGzlXXmScOJHspeYUoVvmMEzd6OUPO-J1o3oVndE9XuIoU2qO_",
    vibe: "date",
    coordinates: { x: 70, y: 22 },
    menuItems: [
      { name: "솔티드 아인슈페너 라떼", price: "6,000원" },
      { name: "프랑스 발효버터 소금빵", price: "3,500원" },
      { name: "제주 말차 바스크 치즈케이크", price: "6,800원" }
    ]
  },
  {
    id: 6,
    name: "묵동 먹골골목 멘야라멘",
    category: "japanese",
    categoryName: "일식",
    categoryEmoji: "🍣",
    dong: "묵동",
    tag: "숨은 고수",
    tagColor: "bg-tertiary-container text-on-tertiary-container",
    rating: 4.9,
    reviews: 260,
    signature: "진한 돈코츠 차슈라멘 & 가라아게",
    priceRange: "9,000원 ~ 12,000원",
    priceScore: 2,
    popularity: 94,
    address: "서울 중랑구 동일로 932 (묵동)",
    stationInfo: "먹골역 7번 출구 도보 4분",
    hours: "11:30 ~ 21:00 (재료준비 15:00~17:00)",
    phone: "02-972-7741",
    description: "12시간 동안 우려낸 돼지 사골의 묵직한 풍미가 느껴지는 먹골역 골목의 일본식 라멘집. 두툼하고 부드럽게 녹아내리는 수제 차슈와 반숙 아지타마고가 백미!",
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80",
    vibe: "solo",
    coordinates: { x: 45, y: 20 },
    menuItems: [
      { name: "진한 돈코츠 라멘", price: "9,500원" },
      { name: "매운 카라라멘", price: "10,000원" },
      { name: "수제 치킨 가라아게 (5p)", price: "5,000원" }
    ]
  },
  {
    id: 7,
    name: "망우 맑은샘 떡볶이",
    category: "snack",
    categoryName: "분식/노포",
    categoryEmoji: "🍢",
    dong: "망우동",
    tag: "전통 노포",
    tagColor: "bg-surface-container-highest text-on-surface",
    rating: 4.7,
    reviews: 189,
    signature: "추억의 국물 쫄볶이 & 팥빙수",
    priceRange: "4,000원 ~ 6,500원",
    priceScore: 1,
    popularity: 92,
    address: "서울 중랑구 망우로60길 37 (망우동)",
    stationInfo: "망우역 1번 출구 도보 8분",
    hours: "12:00 ~ 19:00 (일요일 정기휴무)",
    phone: "02-437-3482",
    description: "30년 넘는 역사를 지닌 중랑구 레트로 분식의 대명사. 얇은 밀떡에 쫄면 사리를 듬뿍 넣은 매콤달콤 쫄볶이를 먹고 난 후 3천 원대 옛날식 팥빙수로 마무리하는 게 정석입니다.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    vibe: "friends",
    coordinates: { x: 74, y: 56 },
    menuItems: [
      { name: "맑은샘 쫄볶이", price: "4,000원" },
      { name: "옛날 팥빙수", price: "3,500원" },
      { name: "튀김오뎅 & 순대", price: "4,500원" }
    ]
  },
  {
    id: 8,
    name: "상봉 파스타 공방",
    category: "western",
    categoryName: "양식",
    categoryEmoji: "🍝",
    dong: "상봉동",
    tag: "데이트 성지",
    tagColor: "bg-primary-fixed text-on-primary-fixed",
    rating: 4.7,
    reviews: 198,
    signature: "우삼겹 매콤 크림 파스타 & 마르게리따",
    priceRange: "12,000원 ~ 16,000원",
    priceScore: 2,
    popularity: 91,
    address: "서울 중랑구 면목로92길 28 (상봉동)",
    stationInfo: "상봉역 3번 출구 도보 4분",
    hours: "11:30 ~ 21:30 (화요일 휴무)",
    phone: "02-438-9912",
    description: "상봉역 골목 안쪽에 자리한 아기자기한 이탈리안 캐주얼 비스트로. 한국인의 입맛에 꼭 맞춘 알싸한 매콤 크림소스 파스타와 화덕 스타일 피자가 훌륭합니다.",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80",
    vibe: "date",
    coordinates: { x: 58, y: 45 },
    menuItems: [
      { name: "우삼겹 매콤 크림 파스타", price: "13,900원" },
      { name: "트러플 버섯 리조또", price: "14,500원" },
      { name: "바질 마르게리따 화덕피자", price: "15,900원" }
    ]
  },
  {
    id: 9,
    name: "중랑천 뷰 브리즈 베이커리",
    category: "cafe",
    categoryName: "카페/베이커리",
    categoryEmoji: "☕",
    dong: "중화동",
    tag: "뷰 맛집",
    tagColor: "bg-tertiary text-on-tertiary",
    rating: 4.7,
    reviews: 280,
    signature: "먹골배 타르트 & 크루아상 샌드위치",
    priceRange: "5,000원 ~ 8,000원",
    priceScore: 1,
    popularity: 89,
    address: "서울 중랑구 중랑천로 151 (중화동 산책로 앞)",
    stationInfo: "중화역 2번 출구 도보 10분",
    hours: "09:00 ~ 21:00 (연중무휴)",
    phone: "02-491-7788",
    description: "중랑천 장미축제 산책로 바로 앞에 위치해 계절의 변화를 만끽할 수 있는 베이커리 카페. 지역 특산 먹골배로 만든 수제 배 타르트와 바삭한 페이스트리가 명물입니다.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    vibe: "date",
    coordinates: { x: 26, y: 38 },
    menuItems: [
      { name: "중랑 먹골배 수제 타르트", price: "6,500원" },
      { name: "바질 잠봉뵈르 샌드위치", price: "7,500원" },
      { name: "브리즈 블렌드 아메리카노", price: "4,500원" }
    ]
  },
  {
    id: 10,
    name: "중화 태릉배갈비마을",
    category: "korean",
    categoryName: "한식",
    categoryEmoji: "🍲",
    dong: "중화동",
    tag: "가족 외식 추천",
    tagColor: "bg-secondary-fixed text-on-secondary-fixed",
    rating: 4.6,
    reviews: 172,
    signature: "달콤 숙성 배돼지갈비 & 물냉면",
    priceRange: "14,000원 ~ 22,000원",
    priceScore: 3,
    popularity: 88,
    address: "서울 중랑구 중랑역로 108 (중화동)",
    stationInfo: "중화역 3번 출구 도보 6분",
    hours: "11:30 ~ 22:00 (브레이크타임 15:00~16:30)",
    phone: "02-495-2300",
    description: "중랑구 특산물이었던 먹골배로 천연 단맛을 내어 연육 작용을 극대화한 전통 갈비 전문점. 자극적이지 않고 부드러워 어르신부터 아이들까지 모두 좋아합니다.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    vibe: "friends",
    coordinates: { x: 33, y: 44 },
    menuItems: [
      { name: "태릉 먹골배 돼지갈비", price: "16,000원" },
      { name: "자가제면 함흥 물냉면", price: "9,000원" },
      { name: "영양 갈비탕", price: "12,000원" }
    ]
  }
];

export interface RouletteFoodItem {
  id: number;
  title: string;
  dong: string;
  tag: string;
  rating: string;
  reviews: string;
  menu: string;
  price: string;
  distance: string;
  description: string;
  budget: 'under-10k' | '10k-20k';
  vibe: 'solo' | 'friends' | 'date';
  rotDegree: number;
  image: string;
}

export const ROULETTE_SLICES: RouletteFoodItem[] = [
  {
    id: 3,
    title: "동부시장 맑은손칼국수",
    dong: "상봉동",
    tag: "전통시장 착한가격",
    rating: "4.8",
    reviews: "215+",
    menu: "바지락 손칼국수 & 겉절이",
    price: "6,000원 ~ 8,000원",
    distance: "상봉역 4번 출구 동부시장 도보 5분",
    description: "매일 아침 끓여내는 남해 멸치 육수와 바지락의 진한 감칠맛! 손으로 직접 반죽해 쫄깃한 면발과 알싸한 겉절이의 전설적인 조합.",
    budget: "under-10k",
    vibe: "solo",
    rotDegree: 22.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzjXVcAAZiK3cB0zpV-1BmZi-E9f4t2mbyyXa2IG8cfsmS2OvGKBv5FVM0bBuGRxcCUzzfNlByZ2UuVUQl7rvb6VQ9n4BdoZFXY68r8CdUpBBU8RkZuAxDbw4m6iglBcxe1Zwvueoq_GToQHPl4RCdqc7pXq5Q6KfDKjB75-v6VSj-m_DoahlS1awuWq6NR_T5oXGEkaoM_Sx8ZQRkQA__0wCXW37QA9bR1aIf8O-8ZqfYNtT_PMaW"
  },
  {
    id: 4,
    title: "상봉 먹자골목 연탄갈비",
    dong: "상봉동",
    tag: "연탄 직화 노포",
    rating: "4.8",
    reviews: "410+",
    menu: "연탄 초벌 돼지양념갈비",
    price: "13,000원 ~ 18,000원",
    distance: "상봉역 2번 출구 먹자골목 180m",
    description: "달콤 짭조름한 비법 간장에 숙성해 은은한 연탄 불향을 듬뿍 머금은 상봉동 대표 저녁 모임 성지입니다.",
    budget: "10k-20k",
    vibe: "friends",
    rotDegree: 67.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDffzFEqLpSLzbiTRXtvqdJPa6fTPWxM1dXBR5deyxZoY257XE6phYfuXzmssTJTw0GP7peI5O0IYPKMozvFMYVkkoljcPUeLWpb24xFNkfv6a7Yeaifv1oq4YhXoRzgidEZ3TzmgMAbzOPJaz8aHAlc-P9O4cYcilUUQltGWi6iExQFQnSJMwWU7Jiegl1z_luQOX6igNcb46Ey9cKQp48R10j9xsA37V0O1qNiswtBmgMnPaRV5I9"
  },
  {
    id: 2,
    title: "사가정 혜원여고 즉석떡볶이",
    dong: "면목동",
    tag: "레트로 학교앞 분식",
    rating: "4.9",
    reviews: "340+",
    menu: "치즈 라볶이 세트 & 야끼만두",
    price: "5,000원 ~ 7,500원",
    distance: "사가정역 1번 출구 도보 7분",
    description: "추억의 밀떡과 달큰칼칼한 춘장-고추장 즉석 소스, 마지막에 바닥까지 긁어먹는 치즈 볶음밥으로 가성비와 맛을 모두 잡은 곳.",
    budget: "under-10k",
    vibe: "friends",
    rotDegree: 112.5,
    image: "https://images.unsplash.com/photo-1662992850989-183e85e49c71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "중화 태릉배갈비마을",
    dong: "중화동",
    tag: "가족 외식 추천",
    rating: "4.6",
    reviews: "172+",
    menu: "달콤 숙성 배돼지갈비 & 물냉면",
    price: "14,000원 ~ 22,000원",
    distance: "중화역 3번 출구 도보 6분",
    description: "중랑구 특산 먹골배로 천연 연육과 단맛을 낸 전통 숯불 돼지갈비 전문점. 깊은 풍미와 부드러운 육질이 일품입니다.",
    budget: "10k-20k",
    vibe: "friends",
    rotDegree: 157.5,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "묵동 먹골골목 멘야라멘",
    dong: "묵동",
    tag: "바삭 촉촉 일식",
    rating: "4.9",
    reviews: "260+",
    menu: "진한 돈코츠 차슈라멘 & 가라아게",
    price: "9,000원 ~ 12,000원",
    distance: "먹골역 7번 출구 도보 4분",
    description: "12시간 동안 푹 끓여낸 진한 돈코츠 육수와 입안에서 살살 녹는 두툼한 수제 차슈가 일품인 골목 숨은 맛집.",
    budget: "10k-20k",
    vibe: "solo",
    rotDegree: 202.5,
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "상봉 파스타 공방",
    dong: "상봉동",
    tag: "데이트 성지",
    rating: "4.7",
    reviews: "198+",
    menu: "우삼겹 매콤 크림 파스타 & 마르게리따",
    price: "12,000원 ~ 16,000원",
    distance: "상봉역 3번 출구 240m",
    description: "아늑한 분위기 속에서 즐기는 한국식 퓨전 매콤 파스타와 바삭한 화덕피자. 데이트와 소모임 코스로 적극 추천합니다.",
    budget: "10k-20k",
    vibe: "date",
    rotDegree: 247.5,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 1,
    title: "면목 할머니 닭도리탕",
    dong: "면목동",
    tag: "골목 최강자",
    rating: "4.9",
    reviews: "520+",
    menu: "마늘 폭탄 매콤 닭볶음탕",
    price: "10,000원 ~ 15,000원",
    distance: "면목역 2번 출구 도보 5분",
    description: "마늘과 고춧가루를 아낌없이 넣어 국물이 진득하고 달달한 감자가 듬뿍 들어있는 중랑구 대표 소주 & 밥도둑 식당.",
    budget: "10k-20k",
    vibe: "friends",
    rotDegree: 292.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiBTJkCWy6t3tQXEU37zKgBuh7B_1BA7wWejuqJuaHms9WYkgfQjpJ_2uzejjQyCcXjmhLpC8dy4yqZ1jKWr_Lyq3k8-9S98xnMGzE-l4x9N8KVUcsxKZV1Ejkq9YkPSbwLZLBwhTD5imIzaTcEBA3XA2VwAcS4Ub1YeoO0whDZf_Thgsl-0sabj1VrHmYh4rd_QEjxciWU6ihglBROVXZPM-RcoNO9Vjut0mAr7lY0awCXV-r7nUP"
  },
  {
    id: 5,
    title: "신내 우디로그 하우스 카페",
    dong: "신내동",
    tag: "햇살 가득 디저트",
    rating: "4.8",
    reviews: "310+",
    menu: "시그니처 솔티드 크림라떼 & 소금빵",
    price: "4,500원 ~ 7,000원",
    distance: "봉화산역 3번 출구 도보 9분",
    description: "당일 직접 구워 파삭한 프랑스 버터 소금빵과 단짠 크림이 매력적인 감성 가득한 동네 쉼터 카페.",
    budget: "under-10k",
    vibe: "date",
    rotDegree: 337.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGiSDaR4-P0KFB8eDOS0AxXgb3cSn3RpGNyWJwSuS5fDZXQ3sf4FrY1zfifqdac3GF9UzetaaRnqztKue4seedYGDuUQn5pC_fHLYVYMvBv0bxJuBvYHedGkbu9NbYTFOHb4eN9QhHrFhCHQdQ4AmcB23-gRjrLBJ5oY0J5oIamE1PyCTSos7jzbrEm0e9rTWbi0kGzlXXmScOJHspeYUoVvmMEzd6OUPO-J1o3oVndE9XuIoU2qO_"
  }
];

export const LIVE_TICKER_DATA = [
  {
    title: "우림식당 얼큰닭볶음",
    location: "망우동 • 닭볶음탕",
    user: "면목동 주민 님이 뽑음",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFM6XZIgl7K-_CfdEYrGN0fxebdZjDcKU8nB7YFiOyr9iigx7zo3TImsYdhopJPh0dGl36kkJq7AAUFdLr6ETETfttMhsHi9y7AtII_Nay9pD2olvCnnELtNbbiREJG1Dd7M_l-iwDyKb6a4Z5SVMeqGUdeWj2bA_BzMki-kYRGoAMEsxLQ-ezX7rs2hu7U7ujddwtM03JgPyaA0WWIqlW6yRLLgQASl9Xzk3lmRrB2Mvtkawpg3wF"
  },
  {
    title: "카츠야마 상봉본점",
    location: "상봉동 • 돈카츠",
    user: "신내동 주민 님이 뽑음",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqOqxlDUsrHsGaQetZfhkgMSsP3rjou00aIwTjqrZkp_L-0Gnrhc4KiYtSBLGh7b-3q7QwU0rgEGpKBT7iKSs-g0EnGAWVeH4w1udMsHC0LCmarqylY2iFJkU7S46EVSKoNJViXI7MxE4b5HB9fFII_PbDsWa4aSrT2Umsqj5oELcBQFq8_9G2Gw6aW2rhRce7UnJ0LV7HqY7r5UQlOnUib7jPVf2B5K1kX5x365eRYIZS09jAbr8v"
  },
  {
    title: "골목집 연탄구이",
    location: "면목동 • 연탄갈비",
    user: "중화동 주민 님이 뽑음",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDffzFEqLpSLzbiTRXtvqdJPa6fTPWxM1dXBR5deyxZoY257XE6phYfuXzmssTJTw0GP7peI5O0IYPKMozvFMYVkkoljcPUeLWpb24xFNkfv6a7Yeaifv1oq4YhXoRzgidEZ3TzmgMAbzOPJaz8aHAlc-P9O4cYcilUUQltGWi6iExQFQnSJMwWU7Jiegl1z_luQOX6igNcb46Ey9cKQp48R10j9xsA37V0O1qNiswtBmgMnPaRV5I9"
  },
  {
    title: "오후의 정원 로스터리",
    location: "묵동 • 디저트카페",
    user: "묵동 주민 님이 뽑음",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGiSDaR4-P0KFB8eDOS0AxXgb3cSn3RpGNyWJwSuS5fDZXQ3sf4FrY1zfifqdac3GF9UzetaaRnqztKue4seedYGDuUQn5pC_fHLYVYMvBv0bxJuBvYHedGkbu9NbYTFOHb4eN9QhHrFhCHQdQ4AmcB23-gRjrLBJ5oY0J5oIamE1PyCTSos7jzbrEm0e9rTWbi0kGzlXXmScOJHspeYUoVvmMEzd6OUPO-J1o3oVndE9XuIoU2qO_"
  }
];

export const NEIGHBORHOOD_GUIDE = [
  {
    dong: "면목동",
    subtitle: "동원전통시장 & 혜원여고 골목",
    description: "사가정역과 면목역을 잇는 활기찬 골목길. 혜원여고 학생들의 떡볶이 명소와 가성비 넘치는 전통시장 국수, 진한 닭볶음탕이 유명합니다.",
    stations: ["면목역(7호선)", "사가정역(7호선)", "용마산역(7호선)"],
    hotspots: ["동원전통시장", "사가정 먹자골목", "용마폭포공원 둘레길"],
    restaurantCount: 2
  },
  {
    dong: "상봉동",
    subtitle: "상봉 먹자골목 & 엔터식스 상권",
    description: "경춘선, 경의중앙선, 7호선이 만나는 중랑구의 핵심 교통 요충지. 직장인과 청년들의 발길이 끊이지 않는 연탄갈비와 감성 파스타 골목이 공존합니다.",
    stations: ["상봉역(7호선, 경춘선, 경의중앙선)", "망우역"],
    hotspots: ["상봉 먹자골목", "동부전통시장", "상봉 코스트코 & 엔터식스"],
    restaurantCount: 3
  },
  {
    dong: "망우동",
    subtitle: "우림전통시장 & 망우역사문화공원",
    description: "오랜 전통을 지닌 우림골목시장과 학교 앞 정겨운 노포 분식집들이 숨어있는 곳. 따뜻하고 정 많은 동네 분위기가 매력적입니다.",
    stations: ["망우역(경의중앙선, 경춘선)", "양원역"],
    hotspots: ["우림골목시장", "망우역사문화공원", "망우 청소년 수련관"],
    restaurantCount: 1
  },
  {
    dong: "중화동",
    subtitle: "중랑천 장미축제 & 먹골배 명가",
    description: "매년 봄 수백만 명이 찾는 중랑천 장미축제의 본고장. 달콤한 먹골배로 숙성한 숯불갈비와 강변 뷰가 아름다운 베이커리 카페가 있습니다.",
    stations: ["중화역(7호선)", "중랑역(경의중앙선)"],
    hotspots: ["중랑천 장미공원", "중화 수경공원", "태릉 갈비골목"],
    restaurantCount: 2
  },
  {
    dong: "묵동",
    subtitle: "먹골역 안식처 & 태릉 감성 골목",
    description: "차분하고 정갈한 주택가 사이사이에 숨은 실력파 맛집들. 12시간 우린 진한 라멘집과 화덕 피자, 조용한 감성 카페들이 숨어있습니다.",
    stations: ["먹골역(7호선)", "태릉입구역(6, 7호선)"],
    hotspots: ["먹골 문화의거리", "봉화산 동쪽 산책로", "중랑천 뚝방길"],
    restaurantCount: 1
  },
  {
    dong: "신내동",
    subtitle: "봉화산 숲세권 & 힐링 카페 로드",
    description: "푸른 봉화산과 구릉산으로 둘러싸여 쾌적한 주거 단지. 가족 단위 나들이객과 산책 후 즐기기 좋은 자연 채광 베이커리 카페가 인기입니다.",
    stations: ["봉화산역(6호선)", "신내역(6호선, 경춘선)"],
    hotspots: ["봉화산 둘레길 & 옹기테마공원", "신내 데시앙 테라스", "중랑구립정보도서관"],
    restaurantCount: 1
  }
];
