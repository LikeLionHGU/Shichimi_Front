import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../assets/styles/StyledComponents";
import ellipse21Url from "../assets/images/Ellipse 21.svg?url";
import rectangle184Url from "../assets/images/Rectangle 184.svg?url";
import infoCircleUrl from "../assets/images/info.svg?url";
import infoGlyphUrl from "../assets/images/info1.svg?url";
import checkUrl from "../assets/images/check.svg?url";
import xUrl from "../assets/images/x.svg?url";

/* GlobalStyle — html, body, #root 전역 배경/리셋 (#FFFDF5, min-height:100%) */
const GlobalStyle = createGlobalStyle`
  html, body, #root { min-height: 100%; background: #FFFDF5; }
  body { margin: 0; }
`;

/* Page — 메인 레이아웃 컨테이너 (1720×1080 고정, 중앙 정렬, 배경 #FFFDF5) */
const Page = styled.main`
  display: block;
  background: var(--white, #FFFDF5);
  width: 1720px;
  height: 1080px;
  max-width: 100%;
  margin: 0 auto;
  overflow: auto;
`;

/* Stage — 내부 콘텐츠 래퍼(1200px 고정, 가운데 정렬) */
const Stage = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: grid;
  row-gap: 24px;
`;

/* Header — 타이틀 배지 + 정보 아이콘 가로 정렬 */
const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  margin: 8px 0 8px;
`;

/* TitleBadge — 초록 직사각형 안에 흰 타원 + "비지토리 작성" 텍스트 컨테이너(286×92) */
const TitleBadge = styled.div`
  position: relative;
  width: 286px;
  height: 92px;
`;

/* TitleBadgeOuter: 초록 사각형(184.svg) 레이어 — 이미지 실패 시 #588B49로 표시 */
const TitleBadgeOuter = styled.div`
  position: absolute; inset: 0;
  background-color: #588B49;
  background-image: url(${rectangle184Url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 8px;
  overflow: hidden;
`;

/* TitleBadgeInner: 흰 타원(21.svg) + 텍스트 중앙 정렬 */
const TitleBadgeInner = styled.div`
  position: absolute; inset: 7px 10px;
  border-radius: 9999px;
  background-color: #FFFDF5;
  display: grid; place-items: center;
  overflow: hidden;
  background-image: url(${ellipse21Url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
`;

/* Title — 페이지 타이틀 텍스트 */
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

/* InfoIcon — 정보 툴팁 버튼(22×22) */
const InfoIcon = styled.button`
  position: relative;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  background-color: #FFFDF5;
  box-shadow: inset 0 0 0 1px ${themeColors.gray.color};
  overflow: hidden;
`;

const InfoCircleImg = styled.img`
  position: absolute; left: 0; top: 0;
  width: 22px; height: 22px;
  object-fit: contain; pointer-events: none;
  z-index: 0;
`;
const InfoGlyphImg = styled.img`
  position: absolute; left: 4px; top: 4px;
  width: 14px; height: 14px;
  object-fit: contain; pointer-events: none;
  z-index: 1;
`;

/* Info tooltip overlay/background (click outside to close) */
const InfoOverlay = styled.div`
  position: fixed; inset: 0px; background: transparent; z-index: 70;
`;
const InfoBubbleWrap = styled.div`
  position: absolute; z-index: 71;
`;
const InfoBubble = styled.div`
  position: relative;
  max-width: 560px;
  background: #FFFDF5;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
  padding: 16px 44px 16px 16px;
  color: #2C2C2C;
  font-size: 16px; line-height: 24px;
`;
const InfoBubbleArrow = styled.div`
  position: absolute; left: -10px; top: 22px;
  width: 20px; height: 20px; transform: rotate(45deg);
  background: #FFFDF5;
  box-shadow: -3px 3px 8px rgba(0,0,0,0.06);
`;
const InfoCloseBtn = styled.button`
  position: absolute; right: 10px; top: 10px;
  width: 24px; height: 24px;
  border: 0; border-radius: 9999px; background: transparent; cursor: pointer;
  font-size: 18px; line-height: 1; color: #2C2C2C;
`;

/* Tooltip component */
function InfoTooltip({ anchorRef, onClose }){
  const [pos, setPos] = React.useState({ top: 0, left: 0 });

  React.useEffect(()=>{
    const update = () => {
      const el = anchorRef?.current;
      if(!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY - 6;
      const left = r.right + window.scrollX + 12;
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

/* Card — 페이지 배경 위에 직결 배치 */
const Card = styled.section`
  background: var(--white, #FFFDF5);
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 16px;
`;

/* Grid — 2열 고정 그리드 */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 520px 640px;
  column-gap: 40px;
  row-gap: 20px;
  align-items: start;
`;

/* Field */
const Field = styled.div`
  display: grid;
  gap: 8px;
`;

/* InlineRow */
const InlineRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: nowrap;
`;

/* Label */
const Label = styled.label`
  color: var(--black, #2C2C2C);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.9px;
`;

/* Helper */
const Helper = styled.p`
  margin: 0;
  color: var(--gray, #BABABA);
  font-family: Pretendard;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 0 1 auto;
`;

/* ErrorText */
const ErrorText = styled.p`
  font-size: 14px;
  color: ${themeColors.red.color};
  margin: 0;
`;

/* Input */
const Input = styled.input`
  width: 520px;
  height: 42px;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  padding: 0 12px;
`;

/* Textarea */
const Textarea = styled.textarea`
  width: 640px;
  border: 2px solid var(--black, #2C2C2C);
  background: ${themeColors.white.color};
  color: ${themeColors.black?.color || "#111"};
  border-radius: 12px;
  padding: 12px 14px;
  height: 220px;
  min-height: 220px;
  max-height: 220px;
  font-size: 16px;
  resize: none;
  box-sizing: border-box;
  &:focus-visible { outline: 3px solid ${themeColors.gray.color}; outline-offset: 2px; }
`;

/* TextareaBox — 글자수 카운터 우하단 고정용 래퍼 */
const TextareaBox = styled.div`
  position: relative;
  display: grid;
`;

/* Actions — 폼 하단 버튼 영역 */
const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 12px;
`;

/* Button */
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

/* 장소 선택 입력/패널 */
const SelectWrap = styled.div`
  position: relative;
  width: 420px;
`;
const InlineIconBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
`;
const StatusBadge = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${(p)=> p.$ok ? "#4F8A4A" : "#E25C2F"};
  &::before{
    content: "";
    width: 16px;
    height: 16px;
    background-image: url(${(p)=> p.$icon || ""});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px 16px;
    display: block;
  }
`;
const StatusPos = styled.div`
  position: absolute;
  top: 6px;
  right: -44px;
`;
const PlaceInput = styled.input`
  width: 420px;
  height: 44px;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  background: #fff;
  padding: 0 44px 0 12px;
  cursor: text;
`;
const PlacePanel = styled.div`
  position: absolute;
  top: 52px;
  left: 0;
  width: 420px;
  max-height: 380px;
  background: #edf6ee;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  padding: 16px;
  z-index: 60;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
`;
const PlaceSearchRow = styled.div`
  position: relative;
`;
const PlaceSearchInput = styled.input`
  width: 100%;
  border: 0;
  background: transparent;
  outline: none;
  font-size: 20px;
  color: #2C2C2C;
  padding-right: 32px;
  &::placeholder{ color:#9CB0A1; }
`;
const PlaceSearchIcon = styled.span`
  position: absolute; right: 0; top: 0; font-size: 22px; color: #4a7e44;
`;
const PlaceList = styled.div`
  overflow: auto; padding-right: 8px;
`;
const PlaceItem = styled.button`
  width: 100%; text-align: left; border: 0; background: transparent;
  padding: 14px 8px; border-radius: 8px; font-size: 20px; cursor: pointer;
  color: #2C2C2C;
  &:hover{ background: rgba(0,0,0,0.05); }
`;

/* IconBtn — 미사용 */
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

/* Chip */
const ChipWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;
const Chip = styled.button`
  border-radius: 9999px;
  padding: 8px 12px;
  font-weight: 600;
  border: 1px solid ${themeColors.gray.color};
  background: ${(p)=> p["data-active"] ? themeColors.black?.color || "#111" : themeColors.white.color};
  color: ${(p)=> p["data-active"] ? themeColors.white.color : themeColors.black?.color || "#111"};
`;

/* Counter — 본문 글자수 표시 */
const Counter = styled.span`
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-size: 12px;
  color: ${themeColors.gray.color};
`;

/* Fake API */
const fakePlaces = [
  { id: "1", name: "가족식당" },
  { id: "2", name: "강원전집" },
  { id: "3", name: "경주전집" },
  { id: "4", name: "골드과메기" },
  { id: "5", name: "과메기마트" },
  { id: "6", name: "대동전집" },
  { id: "7", name: "대화식당" },
  { id: "8", name: "동양횟집" },
  { id: "9", name: "미소과메기" },
  { id: "10", name: "밀밥분식" },
  { id: "11", name: "바다건어물" },
  { id: "12", name: "벤엘건어물" },
  { id: "13", name: "부산밀면" },
  { id: "14", name: "삼일과메기" },
  { id: "15", name: "수정농산물" },
  { id: "16", name: "승리회맛집" },
  { id: "17", name: "영광회대게센타" },
  { id: "18", name: "영일만건어물" },
  { id: "19", name: "옥수수" },
  { id: "20", name: "웰빙농산물" },
  { id: "21", name: "은아건어물" },
  { id: "22", name: "장기식당" },
  { id: "23", name: "죽도어시장 공연 P" },
  { id: "24", name: "죽도어시장 공영 P" },
  { id: "25", name: "죽도포" },
  { id: "26", name: "진분식" },
  { id: "27", name: "태성청과" },
  { id: "28", name: "포원청과" },
  { id: "29", name: "포항대게" },
  { id: "30", name: "한성식품" },
];

function searchPlaces(q){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const res = fakePlaces.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
      resolve(res);
    }, 300);
  });
}

/* API 명세: POST /tmi/records */
async function createPost(payload){
  const res = await fetch('/tmi/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if(!res.ok){
    const msg = await res.text().catch(()=> '');
    throw new Error(`POST /tmi/records failed: ${res.status} ${msg}`);
  }
  return res.json();
}

/* 공용 모달 베이스 */
const Backdrop = styled.div`
  position: fixed; inset: 0px; background: rgba(0,0,0,0.35);
  display: grid; place-items: center;
  z-index: 1000; /* 최상단에 뜨도록 충분히 크게 */
`;
const Dialog = styled.div`
  width: 680px;
  background: ${themeColors.white.color};
  border: 1px solid ${themeColors.gray.color};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  display: grid; gap: 12px;
`;

/* 개인정보 팝오버 */
const PrivacyOverlay = styled.div`
  position: fixed; inset: 0; background: transparent; z-index: 80;
`;
const PrivacyWrap = styled.div`
  position: absolute; z-index: 81;
`;
const PrivacyCard = styled.div`
  width: 520px; max-width: 92vw; max-height: 70vh; overflow: auto;
  background: #FFFDF5; color: #2C2C2C;
  border: 1px solid ${themeColors.gray.color}; border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  padding: 16px 16px 16px 16px; position: relative;
`;
const PrivacyTitle = styled.h2`
  margin: 0 0 12px 0; font-size: 18px; font-weight: 700;
`;

/* 개인정보 팝오버 */
function PrivacyModal({ open, onClose, anchorRef }){
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(()=>{
    const update = ()=>{
      const el = anchorRef?.current; if(!el) return;
      const r = el.getBoundingClientRect();
      const top = r.bottom + window.scrollY + 8;
      const left = r.left + window.scrollX;
      setPos({ top, left });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });
    const onKey = (e)=>{ if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return ()=>{
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
      document.removeEventListener('keydown', onKey);
    };
  }, [anchorRef, onClose]);

  if(!open) return null;
  return createPortal(
    <PrivacyOverlay onClick={onClose}>
      <PrivacyWrap style={{ top: pos.top + 'px', left: pos.left + 'px' }} onClick={(e)=> e.stopPropagation()}>
        <PrivacyCard role="dialog" aria-modal="false" aria-labelledby="privacy-title">
          <InfoCloseBtn aria-label="닫기" onClick={onClose}>×</InfoCloseBtn>
          <PrivacyTitle id="privacy-title">개인정보 수집 및 이용 동의서</PrivacyTitle>
          <p style={{ marginTop: 0 }}>
            멋쟁이사자처럼 대학 13기 한동대학교 중앙해커톤 시치미팀은 마케토리 서비스 제휴상품 전달을 위해 아래와 같이 개인정보를 수집 및 이용합니다.
          </p>
          <p><strong>(수집 목적)</strong><br/>당일 인기글에 노출된 게시글의 작성자에게 사전 제휴된 가게 할인쿠폰 제공</p>
          <p><strong>(수집 항목)</strong><br/>이메일</p>
          <p><strong>(수집 근거)</strong><br/>개인정보 보호법 제15조 제1항</p>
          <p>
            귀하는 마케토리의 서비스 이용에 필요한 최소한의 개인정보 수집 및 이용에 동의하지 않을 수 있으나, 동의를 거부할 경우 가게 할인쿠폰 수령을 할 수 없습니다.
          </p>
        </PrivacyCard>
      </PrivacyWrap>
    </PrivacyOverlay>,
    document.body
  );
}

/* 확인 모달(완료 버튼 클릭 시 노출) */
function ConfirmDialog({ open, onCancel, onConfirm, busy }){
  if(!open) return null;
  return createPortal(
    <Backdrop onClick={onCancel}>
      <Dialog role="dialog" aria-modal="true" onClick={(e)=> e.stopPropagation()}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, textAlign: "center" }}>
          TMI 작성을 완료하시겠습니까?
        </h3>
        <p style={{ margin: "6px 0 0 0", textAlign: "center", color: "#555" }}>
          완료 시, 해당 글은 수정이 불가능합니다.
        </p>
        <Actions>
          <Button data-variant="ghost" onClick={onCancel} disabled={busy}>취소</Button>
          <Button data-variant="primary" onClick={onConfirm} disabled={busy}>
            {busy ? "저장 중…" : "확인"}
          </Button>
        </Actions>
      </Dialog>
    </Backdrop>,
    document.body
  );
}

/* 상수 */
const MAX_BODY = 400;
const CATEGORY_OPTIONS = [
  { id: "1", label: "썰" },
  { id: "2", label: "팁" },
  { id: "3", label: "사건/사고" },
  { id: "4", label: "기념" },
  { id: "5", label: "자랑" },
  { id: "6", label: "리뷰" },
  { id: "7", label: "질문" },
  { id: "8", label: "인사이트" },
];

/* 페이지 컴포넌트 */
export default function AddTmiPage(){
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const infoBtnRef = useRef(null);

  const [place, setPlace] = useState({ id: "", name: "" });
  const [placeText, setPlaceText] = useState("");
  const [placeOpen, setPlaceOpen] = useState(false);
  const [placeQuery, setPlaceQuery] = useState("");
  const placeWrapRef = useRef(null);

  const [categoryId, setCategoryId] = useState("");
  const [body, setBody] = useState("");

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const privacyAnchorRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* 확인 모달 표시 상태 */
  const [confirmOpen, setConfirmOpen] = useState(false);

  const bodyCount = body.length;

  /* 인라인 패널 필터 */
  const filteredPlaces = useMemo(() => {
    const q = placeQuery.trim().toLowerCase();
    if(!q) return fakePlaces;
    return fakePlaces.filter(p => p.name.toLowerCase().includes(q));
  }, [placeQuery]);

  /* 패널 외부 클릭시 닫기 */
  useEffect(()=>{
    const onDoc = (e)=>{
      if(placeOpen && placeWrapRef.current && !placeWrapRef.current.contains(e.target)){
        setPlaceOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return ()=> document.removeEventListener('mousedown', onDoc);
  }, [placeOpen]);

  /* 입력 텍스트가 목록과 정확히 일치하면 선택 인정 */
  useEffect(()=>{
    const t = placeText.trim();
    if(!t){ setPlace({ id: "", name: "" }); return; }
    const found = fakePlaces.find(p => p.name === t);
    if(found) setPlace(found); else setPlace({ id: "", name: "" });
  }, [placeText]);

  /* 버튼 활성화 조건: 제목 + 장소 텍스트 + 본문만 충족하면 활성화(입력 편의성) */
  const canSubmit = useMemo(() => {
    const requiredOk = title.trim() && placeText.trim() && body.trim() && bodyCount <= MAX_BODY;
    return !!requiredOk;
  }, [title, placeText, body, bodyCount]);

  /* 제출 시 검증(엄격): 실제 선택한 장소 id 필요, 이메일은 선택 */
  function validate(){
    const e = {};
    if(!title.trim()) e.title = "제목을 입력해주세요.";
    if(!place.id) e.place = "장소를 검색 결과에서 선택해주세요.";
    if(!body.trim()) e.body = "이야기를 입력해주세요.";
    if(body.length > MAX_BODY) e.body = `최대 ${MAX_BODY}자까지 작성할 수 있어요.`;

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* 실제 저장 로직(모달 '확인'에서 호출) */
  const doSubmit = async () => {
    setSubmitting(true);
    let finalCategoryId = categoryId;
    if(!finalCategoryId){
      const lowered = body.toLowerCase();
      const pick = (label)=> CATEGORY_OPTIONS.find(o=> o.label === label)?.id || "1";
      if(lowered.includes("?")) finalCategoryId = pick("질문");
      else if(lowered.includes("리뷰")) finalCategoryId = pick("리뷰");
      else finalCategoryId = pick("썰");
    }
    try {
      const payload = {
        title: title.trim(),
        category: String(finalCategoryId),
        location: String(place.id),
        text: body.trim(),
        ...(email.trim() ? { email: email.trim() } : {}),
      };
      await createPost(payload);
      nav("/", { replace: true, state: { flash: "게시글이 등록되었어요." } });
    } catch (err){
      alert("저장 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  /* 폼 submit — 검증 후 확인 모달 */
  async function onSubmit(e){
    e.preventDefault();
    // 겹침/포커스 방지: 열려 있던 것들 먼저 닫기
  setPlaceOpen(false);
  setInfoOpen(false);
  setPrivacyOpen(false);

  // (보정) 사용자가 텍스트만 입력했지만 정확히 일치하면 자동 선택
  const t = placeText.trim().toLowerCase();
  if(!place.id && t){
    const exact = fakePlaces.find(p => p.name.toLowerCase() === t);
    if(exact) setPlace(exact);
  }

  if(!validate()) return;   // 검증 실패 시 에러 표시만 하고 종료
  setConfirmOpen(true);     // 검증 통과 시 확인 모달 표시
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Stage>
          <Header>
            <TitleBadge>
              <TitleBadgeOuter />
              <TitleBadgeInner>
                <Title>비지토리 작성</Title>
              </TitleBadgeInner>
            </TitleBadge>
            <InfoIcon ref={infoBtnRef} onClick={()=> setInfoOpen(true)}>
              <InfoCircleImg src={infoCircleUrl} alt="" />
              <InfoGlyphImg src={infoGlyphUrl} alt="" />
            </InfoIcon>
          </Header>

          {infoOpen && (
            <InfoTooltip anchorRef={infoBtnRef} onClose={()=> setInfoOpen(false)} />
          )}

          <form onSubmit={onSubmit} noValidate>
            <Grid>
              <div style={{ display: 'grid', gap: 16 }}>
                <Field>
                  <Label htmlFor="title">제목을 입력해주세요</Label>
                  <Input id="title" placeholder="글의 핵심이 잘 드러나도록 작성해주세요." value={title} onChange={(e)=> setTitle(e.target.value)} />
                  {errors.title && <ErrorText>{errors.title}</ErrorText>}
                </Field>

                <Field>
                  <Label htmlFor="place">장소를 입력해주세요</Label>
                  <SelectWrap ref={placeWrapRef}>
                    <PlaceInput
                      id="place"
                      placeholder="해당 이야기가 일어난 가게를 입력해주세요."
                      value={placeText}
                      onChange={(e)=>{ setPlaceText(e.target.value); setPlaceQuery(e.target.value); setPlaceOpen(true); }}
                      onClick={()=> setPlaceOpen(true)}
                    />
                    <InlineIconBtn type="button" aria-label="장소 검색 열기" onClick={()=> setPlaceOpen(v=>!v)} title="검색">🔍</InlineIconBtn>

                    {placeText.trim() !== '' && (
                      <StatusPos>
                        {place.id ? (
                          <StatusBadge $ok $icon={checkUrl} />
                        ) : (
                          <StatusBadge $ok={false} $icon={xUrl} />
                        )}
                      </StatusPos>
                    )}

                    {placeOpen && (
                      <PlacePanel>
                        <PlaceSearchRow>
                          <PlaceSearchInput
                            placeholder="상점 이름을 검색해주세요."
                            value={placeQuery}
                            onChange={(e)=> setPlaceQuery(e.target.value)}
                            autoFocus
                          />
                          <PlaceSearchIcon>🔍</PlaceSearchIcon>
                        </PlaceSearchRow>
                        <PlaceList>
                          {filteredPlaces.map(p => (
                            <PlaceItem key={p.id} onClick={()=>{ setPlace(p); setPlaceText(p.name); setPlaceOpen(false); setPlaceQuery(""); }}>
                              {p.name}
                            </PlaceItem>
                          ))}
                        </PlaceList>
                      </PlacePanel>
                    )}
                  </SelectWrap>
                  {errors.place && <ErrorText>{errors.place}</ErrorText>}
                </Field>

                <Field>
                  <Label htmlFor="email">인기글에 선정되면 할인쿠폰을 드려요</Label>
                  <Input id="email" placeholder="할인쿠폰을 받을 이메일 주소를 입력해주세요." value={email} onChange={(e)=> setEmail(e.target.value)} />
                  <Helper>
                    상품 수령을 위한 <a href="#" ref={privacyAnchorRef} onClick={(e)=> { e.preventDefault(); setPrivacyOpen(true); }}>개인정보(이메일) 수집 및 이용</a>에 동의합니다
                  </Helper>
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
                    <Label>어떤 유형의 글인가요?</Label>
                    <Helper>(선택하지 않으면 AI가 본문을 분석해서 선택해줘요)</Helper>
                  </InlineRow>
                  <ChipWrap>
                    {CATEGORY_OPTIONS.map((opt)=> (
                      <Chip key={opt.id} type="button" data-active={categoryId === opt.id} onClick={()=> setCategoryId(prev=> prev === opt.id ? "" : opt.id)}>
                        {opt.label}
                      </Chip>
                    ))}
                  </ChipWrap>
                </Field>

                <Field>
                  <Label htmlFor="body">이야기를 입력해주세요</Label>
                  <TextareaBox>
                    <Textarea id="body" placeholder="비지토리를 작성해주세요. (최대 400자)" value={body} onChange={(e)=> setBody(e.target.value)} maxLength={MAX_BODY+50} />
                    <Counter>{Math.min(bodyCount, MAX_BODY)}/{MAX_BODY}</Counter>
                  </TextareaBox>
                  {errors.body && <ErrorText>{errors.body}</ErrorText>}
                </Field>
              </div>
            </Grid>

            <Actions>
              <Button type="submit" data-variant="primary" disabled={!canSubmit || submitting}>
                완료
              </Button>
            </Actions>
          </form>

          {/* 개인정보 팝오버 */}
          <PrivacyModal open={privacyOpen} anchorRef={privacyAnchorRef} onClose={()=> setPrivacyOpen(false)} />

          {/* 확인 모달 */}
          <ConfirmDialog
            open={confirmOpen}
            onCancel={()=> setConfirmOpen(false)}
            onConfirm={async ()=>{
              setConfirmOpen(false);
              await doSubmit();
            }}
            busy={submitting}
          />
        </Stage>
      </Page>
    </>
  );
}
