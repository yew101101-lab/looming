# 🕯️ LOOMING — 불꽃이 녹이는 비밀

> *Things revealed from darkness and fog.*  
> 어둠과 안개 속에서 서서히 드러나는 것들.

프리미엄 메시지 비밀 캔들 브랜드 **LOOMING**의 공식 웹사이트입니다.  
왁스가 녹아내릴수록 숨겨진 메시지가 모습을 드러내는 감각적인 경험을 제공합니다.

---

## ✨ 주요 기능

### 🏠 홈 (메인 페이지)

- **Hero 섹션**
  - 마우스 움직임에 반응하는 패럴랙스 배경 (`mousePos × -24px`)
  - 캔들라이트 아이리스 글로우 오버레이 (마우스 위치 + 깜빡임 애니메이션)
  - Canvas 파티클 — 황금 헤일로 링 + 불씨 파티클
  - 타이틀 `5.2rem` 앰버-골드 4단 그라데이션 텍스트, 진입 시 letter-spacing 스프링 애니메이션
  - **동적 역광 시스템** — 커서 위치 기반으로 타이틀/서브 텍스트에 3중 `drop-shadow` 자동 방향 계산 (커서가 텍스트 뒤에 올 때도 가독성 유지)
  - 주변부 비네팅 오버레이로 시선 집중
  - 하단 캔들 플레임 글로우 블렌드로 CoreFeature와 시네마틱 연결

- **CoreFeature (2섹션)**
  - 스크롤 진행에 따라 이미지가 순차 전환되는 sticky 레이아웃 (데스크탑)
  - 모바일에서는 JS 인라인 스타일로 `position: sticky` 완전 해제 → 세로 스택 정렬
  - 상단 앰버 글로우 `::before` 오버레이로 Hero 색감 자연스럽게 이음

- **ScentNotes (3섹션)**
  - 향수 노트 아카이브, 향 피라미드 호버 이미지 전환
  - 데스크탑: 번호 + 이름 텍스트 탭
  - **모바일: 도트 인디케이터** — 선택된 향 이름 + 원형 도트, 3.5초 자동 슬라이드
  - 탭 전환 시 `opacity + translateX` fade-slide 트랜지션 (0.26s)
  - 배경색도 동기화 전환 (`background-color 0.5s`)

- **EditorialGrid** — 무드 포토 비대칭 그리드, 스크롤 패럴랙스 (모바일 비활성화)
- **Empathy / Quality / UseCase / FinalCTA** — 에디토리얼 감성 스크롤 리빌 섹션

### 🛍️ Shop (상품 페이지)
- 향 카테고리별 필터링 (전체 / 장미 / 소나무 / 세이지)
- 상품 카드 호버 시 상세 정보 노출
- 장바구니 담기 토스트 알림

### 🛒 Cart (장바구니)
- 수량 조절, 상품 삭제
- 주문 완료 모달 (주조 시작 애니메이션 포함)
- `localStorage` 영속 저장

### 👤 MyPage (마이페이지)
- **주조공방 탭** — 주조 대기 목록 관리, 라이브 캔들 프리뷰어
- **주문내역 탭** — 과거 주문 조회
- **받은편지함 탭** — 비밀 메시지 열람 (밀봉 애니메이션)
- `localStorage` 기반 데이터 영속성

### 📖 OurStory / ScentArchive
- 브랜드 스토리 에디토리얼 페이지
- 향 아카이브 — 향수 피라미드 / 재료 배지 상세 뷰

---

## 🎨 디자인 시스템

| 항목 | 값 |
|---|---|
| **주 색상** | `#F9F7F3` (크림 배경), `#3B332C` (다크 텍스트) |
| **액센트** | `#E88C7D` (앰버 로즈) |
| **주 폰트** | Cormorant Garamond, Noto Serif KR |
| **보조 폰트** | Inter |
| **테마** | 프리미엄 다크 / 촉각적 에디토리얼 |

### UI 특징
- 커스텀 캔들라이트 마우스 커서 (모바일 자동 비활성화)
- 글로벌 종이 노이즈 텍스처 오버레이
- 배경 Ambient Glow Orb 애니메이션
- **Hero → CoreFeature 시네마틱 블렌드** — 캔들 플레임 글로우 + 앰버 `::before` 오버레이
- **동적 역광 그림자** — `rawMouse` 좌표 기반 `drop-shadow` CSS 변수 실시간 갱신 (`--backlight-shadow`)
- `IntersectionObserver` 기반 스크롤 리빌 애니메이션 (모바일 `threshold: 0`, 데스크탑 `threshold: 0.3`)
- `ReactDOM.createPortal` 기반 로딩 모달 (뷰포트 중앙 고정)

---

## 📱 반응형

| 브레이크포인트 | 레이아웃 |
|---|---|
| `> 992px` | 데스크탑 풀 레이아웃, 패럴랙스·sticky 모두 활성 |
| `≤ 768px` | 모바일 — 1열 스택, 드로어 메뉴, ScentNotes 도트 슬라이더, JS 인라인 스타일로 `sticky` 완전 해제 |
| `≤ 480px` | 소형 폰 — 폰트 추가 축소, 이미지 높이 최적화 |

### 모바일 전용 처리
- **Hero**: `isMobile` state — 마우스 패럴랙스 완전 차단, 텍스트 중앙 고정
- **CoreFeature**: JS 인라인 `style` 오브젝트로 `position: sticky` 해제 (CSS `!important` 우회)
- **ScentNotes**: `isMobile` state로 탭/도트 조건부 렌더링 + 자동 슬라이드 `setInterval`
- **EditorialGrid**: `window.matchMedia` 스크롤 핸들러 내 모바일 guard
- **IntersectionObserver**: 모바일에서 `threshold: 0` + 초기 가시 요소 즉시 `is-visible` 부여

---

## 🗂️ 프로젝트 구조

```
candle/
├── public/                  # 정적 이미지 에셋
│   ├── scent_rose.png
│   ├── mood_bedroom.png
│   └── ...
├── src/
│   ├── components/          # 홈 페이지 섹션 컴포넌트
│   │   ├── Hero.jsx / Hero.css
│   │   ├── CoreFeature.jsx / CoreFeature.css
│   │   ├── ScentNotes.jsx / ScentNotes.css
│   │   ├── EditorialGrid.jsx / EditorialGrid.css
│   │   ├── Quality.jsx / Quality.css
│   │   ├── UseCase.jsx / UseCase.css
│   │   ├── Empathy.jsx / Empathy.css
│   │   ├── FinalCTA.jsx / FinalCTA.css
│   │   ├── Header.jsx / Header.css
│   │   └── CustomCursor.jsx
│   ├── pages/               # 개별 페이지
│   │   ├── Shop.jsx / Shop.css
│   │   ├── Cart.jsx / Cart.css
│   │   ├── MyPage.jsx / MyPage.css
│   │   ├── OurStory.jsx / OurStory.css
│   │   └── ScentArchive.jsx / ScentArchive.css
│   ├── App.jsx              # 전역 상태 관리, 라우팅, IntersectionObserver
│   ├── App.css
│   ├── index.css            # 글로벌 디자인 토큰 & 유틸리티
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 시작하기

### 요구사항
- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| **프레임워크** | React 19 |
| **번들러** | Vite 8 |
| **스타일링** | Vanilla CSS (CSS Variables, Media Queries) |
| **상태관리** | React useState / useEffect (로컬) |
| **영속성** | localStorage |
| **애니메이션** | CSS Keyframes, IntersectionObserver, requestAnimationFrame, CSS Variables (`--backlight-shadow`) |
| **포털** | ReactDOM.createPortal |

---

## 📄 라이선스

본 프로젝트는 개인/포트폴리오 용도로 제작되었습니다.
