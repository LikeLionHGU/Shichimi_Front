# 📌 마케토리 (Market + Story = Marketory)

## 📝 한 줄 요약
죽도시장의 **비수기 활성화를 돕는 AI 기반 로컬 시장 커뮤니티**

---

![마케토리 메인](./images/메인.svg)

## 🚀 서비스 개요
**마케토리(Marketory)** 는 죽도시장 상인과 방문객을 연결하는 **스토리 큐레이팅 기반 웹 서비스**입니다.  

- **유저 측면**
  - 시장 지도, 인기 글, 추천 콘텐츠 확인
  - **비지토리(Visit+Story)** 작성 및 리뷰 업로드
  - 활동 누적 → 리워드 제공 → 재방문 & 재구매 유도

- **상인 측면**
  - 간단한 정보 제공만으로 참여 가능
  - AI가 자동으로 콘텐츠 제작 및 온라인 마케팅 지원
  - 성과 확인으로 디지털 역량 부족 문제 최소화

---

## ✨ 핵심 기능

### 비지토리 (Visit + Story)
- 유저가 시장 방문 경험을 공유하는 리뷰형 콘텐츠
- AI가 기존 가게 역사 + 방문 기록을 엮어 **큐레이션 스토리** 제공

### AI 기반 큐레이션
- **스토리 생성 AI**: 가게의 역사와 비지토리를 연결해 내러티브 제공
- **카테고리 분류 AI**: 글 작성 시 본문을 분석해 최적 카테고리 자동 추천

### 시장 탐색 UX
- 시장 지도 기반 탐방
- 인기글/추천글 기반 동선 제안
- 리워드 시스템으로 참여 확대

---

## 🧠 AI 활용 전략
- **스토리 생성 AI**:  
  가게 역사 + 누적 방문 기록을 학습 → 내러티브 콘텐츠 제공  
- **카테고리 분류 AI**:  
  유저 글을 실시간 분석 → 자동 카테고리 설정  

→ 단순 보조가 아닌, **시장 정보 제공 + 사용자 경험 향상**의 핵심 역할 수행

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### 주의: vite 형식의 react는 `npm run dev` 로 실행
<br/>
<br/>
# Shichimi_Front

# Commit 형식

| type     | Description         | Example              |
| -------- | ------------------- | -------------------- |
| feat     | 새로운 기능 추가, 구현       | feat: 회원가입 기능 추가     |
| fix      | 버그 수정               | fix: 로그인 에러 수정       |
| docs     | 문서 작업               | docs: README 파일 업데이트 |
| style    | 코드 포맷, 스타일 관련 수정    | style: 코드 포맷 수정      |
| refactor | 코드 리팩토링             | refactor: 인증 로직 리팩토링 |
| test     | 테스트 케이스 추가 또는 수정    | test: 사용자 인증 테스트 추가  |
| chore    | 기타 변경사항 (빌드, 패키지 등) | chore: 패키지 의존성 업데이트  |

<br />
<br />

# Branch 형식

✹  **Git Branch 사용법**

- 각자 생성한 브랜치에서만 작업합니다.
- 브랜치 이름 구조는 <**본인이름/타입/이슈번호**> 입니다. (ex. yeonju/feat/1)
<br />
<br />

## checkout 해서 브랜치 변경 (중요!)

```bash
git checkout yeonju/feat/1
```
<br />
<br />
