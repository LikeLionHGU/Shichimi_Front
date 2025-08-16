import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../assets/styles/StyledComponents";
import ellipse21Url from "../assets/images/Ellipse 21.svg?url";
import rectangle184Url from "../assets/images/Rectangle 184.svg?url";
import infoCircleUrl from "../assets/images/info.svg?url";
import infoGlyphUrl from "../assets/images/info1.svg?url";

// GlobalStyle — html, body, #root 전역 배경/리셋 (#FFFDF5, min-height:100%)
const GlobalStyle = createGlobalStyle`
  html, body, #root { min-height: 100%; background: #FFFDF5; }
  body { margin: 0; }
`;

// Page — 메인 레이아웃 컨테이너(1200px 고정, 중앙 정렬, 배경 #FFFDF5)
const Page = styled.main`
  display: grid;
  background: var(--white, #FFFDF5);
  gap: 16px;
  width: 1200px;            /* 픽셀 고정 */
  max-width: 1200px;        /* 픽셀 고정 */
  min-width: 1200px;        /* 래핑 방지 */
  padding: 8px 0;          /* 상하 여백 축소 */
  margin: 0 auto;           /* 중앙 정렬 */
`;

// Header — 타이틀 배지 + 정보 아이콘 가로 정렬(좌측 정렬, 간격 12px)
const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  margin: 8px 0 8px; /* 타이틀 위/아래 간격 축소 */
`;

// TitleBadge — 초록 직사각형 안에 흰 타원 + "비지토리 작성" 텍스트 컨테이너(286×92)
const TitleBadge = styled.div`
  position: relative;
  width: 286px;
  height: 92px;
`;
// TitleBadgeOuter: 초록 사각형(184.svg) 레이어 — 이미지 실패 시 #588B49로 표시
const TitleBadgeOuter = styled.div`
  position: absolute; inset: 0;
  background-color: #588B49; /* 이미지 로드 실패 대비 색상 */
  background-image: url(${rectangle184Url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 8px;           /* 바깥 녹색 박스 모서리 라운드 */
  overflow: hidden;             /* 내부 컨텐츠가 모서리를 넘지 않도록 */
`;
// TitleBadgeInner: 흰 타원(21.svg) + 텍스트 중앙 정렬 — inset으로 내부 여백 조절
const TitleBadgeInner = styled.div`
  position: absolute; inset: 7px 10px; /* 타원 상하/좌우 여백 조정 */
  border-radius: 9999px;        /* 완전한 타원 */
  background-color: #FFFDF5;    /* 흰 타원 색 */
  display: grid; place-items: center;
  overflow: hidden;             /* 타원 경계 밖 잘라냄 */
  /* 참고: 엘립스 이미지를 타원에 맞춰 100%로 채움 (없는 경우에도 타원 유지) */
  background-image: url(${ellipse21Url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
`;

// Title — 페이지 타이틀 텍스트("비지토리 작성", BM HANNA 35px)
const Title = styled.h1`
  color: var(--black, #2C2C2C);
  text-align: center;
  font-family: "BM HANNA 11yrs old OTF";
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  margin: 0;
`;

// Rectangle184 — 초록 직사각형 이미지(장식용, 현재 미사용)
const Rectangle184 = styled.div`
  width: 286px;
  height: 92px;
  flex-shrink: 0;
  background: var(--green, #588B49) url(${rectangle184Url}) center/contain no-repeat;
`;

// InfoIcon — 정보 툴팁 버튼(22×22). 내부에 info.svg(원)+info1.svg(i) 겹침
const InfoIcon = styled.button`
  position: relative;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  cursor: help;
  background-color: #FFFDF5; /* 배경색 깔아줌 */
  box-shadow: inset 0 0 0 1px ${themeColors.gray.color}; /* 항상 보이는 얇은 테두리 */
  overflow: hidden;
`;

// InfoCircleImg: info.svg — 바깥 원(전체 채움)
const InfoCircleImg = styled.img`
  position: absolute;
  left: 0px; top: 0px;
  width: 22px; height: 22px;
  object-fit: contain; pointer-events: none;
  z-index: 0;
`;
// InfoGlyphImg: info1.svg — 중앙 'i' 글리프(14×14)
const InfoGlyphImg = styled.img`
  position: absolute;
  left: 4px; top: 4px; /* 가운데 배치: (22-14)/2 */
  width: 14px; height: 14px;
  object-fit: contain; pointer-events: none;
  z-index: 1;
`;

// Info tooltip overlay/background (click outside to close)
const InfoOverlay = styled.div`
  position: fixed; inset: 0px; background: transparent; z-index: 70;
`;
// Wrapper that will be absolutely positioned via inline style near the anchor
const InfoBubbleWrap = styled.div`
  position: absolute; z-index: 71;
`;
// Speech-bubble box
const InfoBubble = styled.div`
  position: relative;
  max-width: 560px;
  background: #FFFDF5;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
  padding: 16px 44px 16px 16px; /* 우측 닫기 버튼 공간 */
  color: #2C2C2C;
  font-size: 16px; line-height: 24px;
`;
// Bubble left arrow
const InfoBubbleArrow = styled.div`
  position: absolute; left: -10px; top: 22px;
  width: 20px; height: 20px; transform: rotate(45deg);
  background: #FFFDF5;
  box-shadow: -3px 3px 8px rgba(0,0,0,0.06);
`;
// Close button (X)
const InfoCloseBtn = styled.button`
  position: absolute; right: 10px; top: 10px;
  width: 24px; height: 24px;
  border: 0; border-radius: 9999px; background: transparent; cursor: pointer;
  font-size: 18px; line-height: 1; color: #2C2C2C;
`;

// Tooltip component rendered in a portal, positioned next to the anchor
function InfoTooltip({ anchorRef, onClose }){
  const [pos, setPos] = React.useState({ top: 0, left: 0 });

  React.useEffect(()=>{
    const update = () => {
      const el = anchorRef?.current;
      if(!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY - 6;     // 살짝 위로 정렬
      const left = r.right + window.scrollX + 12; // 아이콘 오른쪽 12px
      setPos({ top, left });
    };
    const onKey = (e) => { if(e.key === 'Escape') onClose(); };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });
    document.addEventListener('keydown', onKey);
    return ()=>{
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
      document.removeEventListener('keydown', onKey);
    };
  }, [anchorRef, onClose]);

  return createPortal(
    <InfoOverlay onClick={onClose}>
      <InfoBubbleWrap style={{ top: pos.top + 'px', left: pos.left + 'px' }} onClick={(e)=> e.stopPropagation()}>
        <InfoBubble role="dialog" aria-modal="false">
          <InfoBubbleArrow />
          <p style={{ margin: 0 }}>비지토리는 죽도시장에 다녀온 여러분의(visitor) 이야기(story)를 말해요.</p>
          <p style={{ margin: '6px 0 0 0' }}>죽도시장에서 경험한 다양한 이야기를 들려주세요!</p>
          <InfoCloseBtn aria-label="닫기" onClick={onClose}>×</InfoCloseBtn>
        </InfoBubble>
      </InfoBubbleWrap>
    </InfoOverlay>,
    document.body
  );
}

// Card — (레거시) 폼 박스 래퍼. 현재 페이지 배경 위에 직결 배치
const Card = styled.section`
  background: var(--white, #FFFDF5);
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 16px;
`;

// Grid — 2열 고정 그리드(좌 520px / 우 640px, 간격 40px)
const Grid = styled.div`
  display: grid;
  grid-template-columns: 520px 640px; /* 픽셀 고정 컬럼 */
  column-gap: 40px;                   /* 픽셀 간격 */
  row-gap: 20px;
  align-items: start;
`;

// Field — 라벨+입력 한 묶음(세로 간격 8px)
const Field = styled.div`
  display: grid;
  gap: 8px;
`;

// InlineRow — 라벨 + 보조설명 한 줄 정렬(기준선 정렬, 줄바꿈 없음)
const InlineRow = styled.div`
  display: flex;
  align-items: baseline; /* 텍스트 기준선 정렬 */
  gap: 8px;
  flex-wrap: nowrap; /* 한 줄 유지 */
`;

// Label — 필드 라벨 텍스트(18px/600)
const Label = styled.label`
  color: var(--black, #2C2C2C);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.9px;
`;

// Helper — 보조설명(14px, 회색, 넘치면 말줄임)
const Helper = styled.p`
  margin: 0;
  color: var(--gray, #BABABA);
  font-family: Pretendard;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;        /* 한 줄로 */
  overflow: hidden;           /* 넘치면 숨김 */
  text-overflow: ellipsis;    /* 말줄임표 */
  min-width: 0;               /* flex 줄바꿈 방지용 */
  flex: 0 1 auto;             /* 수축 허용 */
`;

// ErrorText — 검증 실패 메시지(빨강 14px)
const ErrorText = styled.p`
  font-size: 14px;
  color: ${themeColors.red.color};
  margin: 0;
`;

// Input — 단일행 입력(520×42, 2px 보더)
const Input = styled.input`
  width: 520px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  padding: 0 12px;
`;

// Select — 장소 선택 셀렉트(520×44, 우측 내부 검색아이콘 자리 확보)
const Select = styled.select`
  width: 520px;
  height: 44px;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  background: #fff;
  color: ${themeColors.black?.color || "#111"};
  padding: 0 44px 0 12px; /* 우측 검색 아이콘 자리 확보 */
  appearance: none; /* 기본 화살표 숨김 */
  &:focus-visible { outline: 3px solid ${themeColors.gray.color}; outline-offset: 2px; }
`;

// Textarea — 본문 입력(640px 폭, 최소 220px 높이, 2px 보더)
const Textarea = styled.textarea`
  width: 640px;
  border: 2px solid var(--black, #2C2C2C);
  background: ${themeColors.white.color};
  color: ${themeColors.black?.color || "#111"};
  border-radius: 12px;
  padding: 12px 14px;
  min-height: 220px;
  font-size: 16px;
  resize: vertical;
  &:focus-visible { outline: 3px solid ${themeColors.gray.color}; outline-offset: 2px; }
`;

// TextareaBox — 글자수 카운터 우하단 고정용 래퍼
const TextareaBox = styled.div`
  position: relative;
  display: grid;
`;

// Actions — 폼 하단 버튼 영역(오른쪽 정렬)
const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 12px;
`;

// Button — 기본 버튼. data-variant="primary"만 사용(완료 버튼)
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  min-height: 44px;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid transparent;
  transition: transform 120ms ease, box-shadow 120ms ease;
  cursor: pointer;

  &[data-variant="primary"]{
    background: ${themeColors.red.color};
    color: ${themeColors.white.color};
    border-color: ${themeColors.red.color};
  }
  &[data-variant="ghost"]{
    background: ${themeColors.white.color};
    color: ${themeColors.black?.color || "#111"};
    border-color: ${themeColors.gray.color};
  }

  &:disabled{ cursor: not-allowed; }
  &[data-variant="primary"]:disabled{ background: #CFCFCF; border-color: #CFCFCF; color: ${themeColors.white.color}; opacity: 1; }
  &:hover:not(:disabled){ transform: translateY(-1px); }
`;

// RowH — (레거시) 입력+아이콘 2열 그리드. 현재 SelectWrap 사용으로 미사용
const RowH = styled.div`
  display: grid;
  grid-template-columns: 476px 32px;
  gap: 8px;
`;

// SelectWrap — 셀렉트 박스 내부 우측에 검색 아이콘 절대 배치용 래퍼(폭 520px)
const SelectWrap = styled.div`
  position: relative;
  width: 520px;
`;
// InlineIconBtn — 셀렉트 내부 우측 검색 버튼(32×32, 🔍)
const InlineIconBtn = styled.button`
  position: absolute;
  top: 6px; /* (44 - 32) / 2 */
  right: 6px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
`;

// IconBtn — (레거시) 일반 아이콘 버튼. 현재 미사용
const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${themeColors.gray.color};
  border-radius: 12px;
  background: ${themeColors.white.color};
`;

// ChipWrap — 카테고리 칩 컨테이너(랩, 간격 8px)
const ChipWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px; /* 라벨/헬퍼와 간격 */
`;

// Chip — 카테고리 토글 칩 버튼
const Chip = styled.button`
  border-radius: 9999px;
  padding: 8px 12px;
  font-weight: 600;
  border: 1px solid ${themeColors.gray.color};
  background: ${(p)=> p["data-active"] ? themeColors.black?.color || "#111" : themeColors.white.color};
  color: ${(p)=> p["data-active"] ? themeColors.white.color : themeColors.black?.color || "#111"};
`;

// Counter — 본문 글자수 표시(우하단 12px)
const Counter = styled.span`
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-size: 12px;
  color: ${themeColors.gray.color};
`;

// Fake API — 샘플 데이터/검색/저장 모의 (실서비스 시 백엔드 API로 대체)
// - fakePlaces: 샘플 장소 목록
// - searchPlaces: 부분 일치 검색(300ms 지연)
// - createPost: 저장 모의(500ms 지연)
const fakePlaces = [
  { id: "1", name: "죽도시장 횟집 101호" },
  { id: "2", name: "죽도시장 김밥천국" },
  { id: "3", name: "죽도시장 커피숍 골목" },
];

function searchPlaces(q){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const res = fakePlaces.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
      resolve(res);
    }, 300);
  });
}

function createPost(payload){
  // TODO: call your backend API
  return new Promise((resolve)=> setTimeout(()=> resolve({ id: "temp-123", ...payload }), 500));
}

// Backdrop — 모달 오버레이(반투명 검정)
const Backdrop = styled.div`
  position: fixed; inset: 0px; background: rgba(0,0,0,0.35);
  display: grid; place-items: center; z-index: 40;
`;

// Dialog — 모달 컨테이너(680px)
const Dialog = styled.div`
  width: 680px;
  background: ${themeColors.white.color};
  border: 1px solid ${themeColors.gray.color};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  display: grid; gap: 12px;
`;

// PlaceSearchDialog — 장소 검색 모달 (open/onClose/onSelect props)
function PlaceSearchDialog({ open, onClose, onSelect }){
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(()=>{
    if(!open) return;
    let active = true;
    setLoading(true);
    searchPlaces(query).then((r)=>{ if(active){ setResults(r); setLoading(false);} });
    return ()=> { active = false; };
  }, [open, query]);

  if(!open) return null;
  return createPortal(
    <Backdrop onClick={onClose}>
      <Dialog onClick={(e)=> e.stopPropagation()}>
        {/* 모달 라벨 텍스트: "가게/장소 검색" */}
        <Label htmlFor="place-search">가게/장소 검색</Label>
        {/* 모달 입력 placeholder: "상호명으로 검색" */}
        <Input id="place-search" placeholder="상호명으로 검색" value={query} onChange={(e)=> setQuery(e.target.value)} />
        {/* 모달 상태 텍스트: "검색 중…" */}
        {loading && <Helper>검색 중…</Helper>}
        <div style={{ display: 'grid', gap: 8, maxHeight: 260, overflow: 'auto' }}>
          {results.map((p)=> (
            <Button key={p.id} data-variant="ghost" onClick={()=>{ onSelect(p); onClose(); }}>
              {p.name}
            </Button>
          ))}
          {/* 모달 결과 없음 텍스트: "검색 결과가 없습니다." */}
          {!loading && results.length === 0 && <Helper>검색 결과가 없습니다.</Helper>}
        </div>
        <Actions>
          {/* 모달 닫기 버튼 텍스트: "닫기" */}
          <Button data-variant="ghost" onClick={onClose}>닫기</Button>
        </Actions>
      </Dialog>
    </Backdrop>,
    document.body
  );
}

// MAX_BODY — 본문 최대 글자수 제한
const MAX_BODY = 400;
// 카테고리 칩 텍스트 목록: "썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"
const CATEGORIES = ["썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"];

// AddTmiPage — 비지토리 작성 페이지 (폼 상태/검증/자동 분류/제출)
export default function AddTmiPage(){
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const infoBtnRef = useRef(null);
  const [place, setPlace] = useState({ id: "", name: "" });
  const [openPlaceModal, setOpenPlaceModal] = useState(false);
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const bodyCount = body.length;

  // 제출 가능 여부: 필수값 + 이메일/동의 조건 충족 시 활성화
  const emailOk = useMemo(() => !email.trim() || /.+@.+[.].+/.test(email), [email]);
  const canSubmit = useMemo(() => {
    const requiredOk = title.trim() && place.id && body.trim() && bodyCount <= MAX_BODY;
    const consentOk = !email.trim() || (emailOk && consent);
    return !!(requiredOk && consentOk);
  }, [title, place, body, bodyCount, email, consent, emailOk]);

  function validate(){
    const e = {};
    if(!title.trim()) e.title = "제목을 입력해주세요.";
    if(!place.id) e.place = "장소를 선택해주세요.";
    if(!body.trim()) e.body = "이야기를 입력해주세요.";
    if(bodyCount > MAX_BODY) e.body = `최대 ${MAX_BODY}자까지 작성할 수 있어요.`;

    if(email.trim()){
      const ok = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
      if(!ok) e.email = "올바른 이메일 형식이 아니에요.";
      if(!consent) e.consent = "쿠폰 발송을 위한 개인정보 수집·이용 동의가 필요해요.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e){
    e.preventDefault();
    if(!validate()) return;

    setSubmitting(true);

    let finalCategory = category;
    if(!finalCategory){
      const lowered = body.toLowerCase();
      if(lowered.includes("?")) finalCategory = "질문";
      else if(lowered.includes("리뷰")) finalCategory = "리뷰";
      else finalCategory = "썰";
    }

    try {
      const payload = {
        title: title.trim(),
        placeId: place.id,
        placeName: place.name,
        category: finalCategory,
        body: body.trim(),
        email: email.trim() || null,
        consent: !!consent,
      };
      await createPost(payload);
      nav("/", { replace: true, state: { flash: "게시글이 등록되었어요." } });
    } catch (err){
      alert("저장 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Page>
      <Header>
        <TitleBadge>
          <TitleBadgeOuter />
          <TitleBadgeInner>
            {/* 페이지 타이틀 텍스트: "비지토리 작성" */}
            <Title>비지토리 작성</Title>
          </TitleBadgeInner>
        </TitleBadge>
        {/* 정보 아이콘 툴팁(title): "카테고리를 고르지 않으면 본문을 분석해 자동 분류합니다." */}
        <InfoIcon ref={infoBtnRef} onClick={()=> setInfoOpen(true)}>
          <InfoCircleImg src={infoCircleUrl} alt="" />
          <InfoGlyphImg src={infoGlyphUrl} alt="" />
        </InfoIcon>
      </Header>

      {infoOpen && (
        <InfoTooltip anchorRef={infoBtnRef} onClose={()=> setInfoOpen(false)} />
      )}

      <>
        <form onSubmit={onSubmit} noValidate>
          <Grid>
            <div style={{ display: 'grid', gap: 16 }}>
              <Field>
                {/* 라벨 텍스트: "제목을 입력해주세요" */}
                <Label htmlFor="title">제목을 입력해주세요</Label>
                {/* 입력 placeholder: "글의 핵심이 잘 드러나도록 작성해주세요." */}
                <Input id="title" placeholder="글의 핵심이 잘 드러나도록 작성해주세요." value={title} onChange={(e)=> setTitle(e.target.value)} />
                {errors.title && <ErrorText>{errors.title}</ErrorText>}
              </Field>

              <Field>
                {/* 라벨 텍스트: "장소를 입력해주세요" */}
                <Label htmlFor="place">장소를 입력해주세요</Label>
                <SelectWrap>
                  <Select id="place" value={place.id} onChange={(e)=>{
                    const opt = fakePlaces.find(p=> p.id === e.target.value);
                    setPlace(opt ? opt : { id: "", name: "" });
                  }}>
                    {/* 셀렉트 placeholder: "해당 이야기가 일어난 가게를 입력해주세요." */}
                    <option value="">해당 이야기가 일어난 가게를 입력해주세요.</option>
                    {fakePlaces.map((p)=> <option key={p.id} value={p.id}>{p.name}</option>)}
                  </Select>
                  <InlineIconBtn type="button" aria-label="장소 검색 열기" onClick={()=> setOpenPlaceModal(true)} title="검색">🔍</InlineIconBtn>
                </SelectWrap>
                {errors.place && <ErrorText>{errors.place}</ErrorText>}
              </Field>

              <Field>
                {/* 라벨 텍스트: "인기글에 선정되면 할인쿠폰을 드려요" */}
                <Label htmlFor="email">인기글에 선정되면 할인쿠폰을 드려요</Label>
                {/* 입력 placeholder: "할인쿠폰을 받을 이메일 주소를 입력해주세요." */}
                <Input id="email" placeholder="할인쿠폰을 받을 이메일 주소를 입력해주세요." value={email} onChange={(e)=> setEmail(e.target.value)} />
                {/* 보조 설명 텍스트: "상품 수령을 위한 개인정보(이메일) 수집 및 이용에 동의합니다" */}
                <Helper>
                  상품 수령을 위한 <a href="#" onClick={(e)=> e.preventDefault()}>개인정보(이메일) 수집 및 이용</a>에 동의합니다
                </Helper>
                {/* 체크박스 라벨 텍스트: "동의합니다" */}
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={consent} onChange={(e)=> setConsent(e.target.checked)} /> 동의합니다
                </label>
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
              </Field>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              <Field>
                <InlineRow>
                  {/* 섹션 라벨 텍스트: "어떤 유형의 글인가요?" */}
                  <Label>어떤 유형의 글인가요?</Label>
                  {/* 보조 설명 텍스트: "(선택하지 않으면 AI가 본문을 분석해서 선택해줘요)" */}
                  <Helper>(선택하지 않으면 AI가 본문을 분석해서 선택해줘요)</Helper>
                </InlineRow>
                <ChipWrap>
                  {CATEGORIES.map((c)=> (
                    <Chip key={c} type="button" data-active={category === c} onClick={()=> setCategory((prev)=> prev === c ? "" : c)}>
                      {c}
                    </Chip>
                  ))}
                </ChipWrap>
              </Field>

              <Field>
                {/* 라벨 텍스트: "이야기를 입력해주세요" */}
                <Label htmlFor="body">이야기를 입력해주세요</Label>
                <TextareaBox>
                  {/* 입력 placeholder: "비지토리를 작성해주세요. (최대 400자)" */}
                  <Textarea id="body" placeholder="비지토리를 작성해주세요. (최대 400자)" value={body} onChange={(e)=> setBody(e.target.value)} maxLength={MAX_BODY+50} />
                  <Counter>{Math.min(bodyCount, MAX_BODY)}/{MAX_BODY}</Counter>
                </TextareaBox>
                {errors.body && <ErrorText>{errors.body}</ErrorText>}
              </Field>
            </div>
          </Grid>

          <Actions>
            {/* 제출 버튼 텍스트: 기본 "완료" / 로딩 시 "저장 중…" */}
            <Button type="submit" data-variant="primary" disabled={!canSubmit || submitting}>{submitting ? "저장 중…" : "완료"}</Button>
          </Actions>
        </form>
      </>

      <PlaceSearchDialog
        open={openPlaceModal}
        onClose={()=> setOpenPlaceModal(false)}
        onSelect={(p)=> setPlace(p)}
      />
    </Page>
    </>
  );
}
