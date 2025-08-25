import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../assets/styles/StyledComponents";
import ellipse21Url from "../assets/images/Ellipse 21.svg?url";
import rectangle184Url from "../assets/images/Rectangle 184.svg?url";
import infoCircleUrl from "../assets/images/info.svg?url";
import checkUrl from "../assets/images/check.svg?url";
import xUrl from "../assets/images/x.svg?url";
import searchUrl from "../assets/images/search.svg?url";
import placetri1Url from "../assets/images/placetri1.svg?url"; 
import placetri2Url from "../assets/images/placetri2.svg?url";
import { useLocation } from "react-router-dom";


const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
 function apiUrl(path) {
   if (!API_BASE) throw new Error("VITE_API_BASE_URL이 비어 있습니다.");
   return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}


const GlobalStyle = createGlobalStyle`
  html, body, #root { min-height: 100%; background: #FFFDF5; }
  body { margin: 0; }
`;

const Page = styled.main`
  display: block;
  background: var(--white, #FFFDF5);
  width: 1720px;
  height: 1220px;
  max-width: 100%;


  margin: 0 auto;
  overflow: auto;
`;

const Stage = styled.div`
  width: 1200px;
 margin: 0;           
 margin-left: 12%;    
  display: grid;
  row-gap: 60px;
`;


const Header = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  justify-content: flex-start;
  margin: 50px 0 8px;

`;
const TitleBadge = styled.div`
  position: relative;
  width: 286px;
  height: 92px;
`;


const TitleBadgeOuter = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;   
  z-index: 0;
  pointer-events: none;
`;

/* 2층 래퍼: 안쪽 여백만 담당 */
const TitleBadgeInner = styled.div`
  position: absolute;
  inset: 7px 10px;    
  display: grid;
  place-items: center;
  z-index: 1;
`;

/* 2층: 흰 타원 이미지 */
const TitleBadgeInnerImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;   
  pointer-events: none;
`;

/* 3층: 텍스트 */
const Title = styled.h1`
  margin: 0;
  color: #2C2C2C;
  font-family: "BM HANNA 11yrs old OTF";
  font-size: 35px;
  font-weight: 400;
  line-height: 1;
  position: relative; 
  z-index: 2;       
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
  cursor: pointer;
`;

const InfoCircleImg = styled.img`
  position: absolute; left: 0; top: 0;
  width: 22px; height: 22px;
  object-fit: contain; pointer-events: none;
  z-index: 0;
`;


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
  position: absolute; left: -6px; top: 8.5px;
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
  row-gap: 28px;
  align-items: baseline;
`;

/* Field */
const Field = styled.div`
  display: grid;
  gap: 16px;
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
  display: flex;
  width: 420px;
  height: 22px;
  flex-direction: row;
  flex-shrink: 0;
  overflow: hidden;
  color: var(--black, #2C2C2C);
  text-overflow: ellipsis;
  white-space: nowrap;

  /* 본문 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; 
  letter-spacing: 0.48px;
`;

/* ErrorText */
const ErrorText = styled.p`
  font-size: 14px;
  color: ${themeColors.red.color};
  margin: 0;
`;

/* Input */
const Input = styled.input`
  width: 400px;
  height: 42px;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  padding: 0 12px;
  background: var(--white, #FFFDF5);
`;

/* Textarea */
const Textarea = styled.textarea`
  width: 624px;
  height: 222px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);

  background: ${themeColors.white.color};
  color: ${themeColors.black?.color || "#111"};

  padding: 12px 14px;
  height: 220px;
  font-size: 16px;
  resize: none;
  box-sizing: border-box;
`;

/* TextareaBox */
const TextareaBox = styled.div`
  position: relative;
  display: grid;
`;

/* Actions */
const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 12px;
  margin-right: 16px;
`;

/* Button */
const Button = styled.button`
  width: 150px;
  height: 60px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid transparent;
  transition: transform 120ms ease, box-shadow 120ms ease;
  cursor: pointer;
  color: var(--white, #FFFDF5);
  text-align: center;
  font-family: "BM HANNA 11yrs old OTF";
  font-size: 22px;
  font-style: normal;
  line-height: normal;

  &[data-variant="primary"]{
    background: var(--green, #588B49);
    color: ${themeColors.white.color};
    border-color: ${themeColors.black.color};
    width: 200px;
    height: 54px;
    flex-shrink: 0;
    color: var(--black, #2C2C2C);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  &[data-variant="ghost"]{
    background: ${themeColors.white.color};
    color: ${themeColors.white.color};
    border-color: ${themeColors.black.color};
    width: 200px;
    height: 54px;
    flex-shrink: 0;
    color: var(--black, #2C2C2C);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  &[data-variant="submit"]{
  background: var(--green, #588B49);
  color: ${themeColors.white.color};
  border-color: ${themeColors.black.color};
  border-radius: 8px;
  width: 150px;
  height: 60px;
  flex-shrink: 0;
  color: var(--black, #2C2C2C);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  }

  &:disabled{ cursor: not-allowed; }
  &[data-variant="primary"]:disabled{ background: #CFCFCF; border-color: #CFCFCF; color: ${themeColors.white.color}; opacity: 1; }
  &:hover:not(:disabled){ transform: translateY(-1px); }
`;

const PageButton = styled.button`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  width: 150px; height: 60px; min-height: 44px; padding: 0 16px;
  border-radius: 12px; border: 1.5px solid transparent;
  font-family: "BM HANNA 11yrs old OTF"; font-size: 22px; font-weight: 400; line-height: 1;
  cursor: pointer; transition: transform 120ms ease, background-color 120ms ease, color 120ms ease, border-color 120ms ease;

  background: #CFCFCF; color: #FFFFFF; border-color: #CFCFCF;

  &:not(:disabled){
    background: #588B49; color: #FFFDF5; border-color: #3D5F33;
  }

  &:hover:not(:disabled){ transform: translateY(-1px); }
  &:disabled{ cursor: not-allowed; opacity: 1; }
`;

const DialogButton = styled.button`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  width: 200px; height: 54px; padding: 0 16px;
  border-radius: 12px; border: 1.5px solid #2C2C2C;
  background: #FFFFFF; color: #2C2C2C;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  font-size: 16px; font-weight: 700; line-height: 1;
  cursor: pointer; transition: transform 120ms ease, background-color 120ms ease, color 120ms ease, border-color 120ms ease;

  &:hover:not(:disabled){
    background: #588B49; color: #FFFDF5; border-color: #3D5F33;
    transform: translateY(-1px);
  }
  &:disabled{
    cursor: not-allowed; background: #F3F3F3; color: #A0A0A0; border-color: #D0D0D0;
    transform: none;
  }
`;


const SelectWrap = styled.div`
  position: relative;
  width: 400px;
`;
const InlineIconBtn = styled.button`
  position: absolute;
  top: 8px;
  right: -15px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
`;
const StatusBadge = styled.span`

  & > img {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
  }
`;

const StatusPos = styled.div`
  position: absolute;
  top: 8px;
  right: -70px;
  z-index: 61;
`;
const PlaceInput = styled.input`
  width: 400px;
  height: 44px;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  background: var(--white, #FFFDF5);
    padding: 0 12px 0 12px;
  cursor: text;
`;
const PlacePanel = styled.div`
  position: absolute;
  top: 0px;
  left: 0;

  width: 400px;
  height: 229px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #F0F8ED;

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
  border: 0;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #2C2C2C;
  padding-right: 64px; 
  &::placeholder{ color:#9CB0A1; }
`;

const PlaceSearchIcon = styled.span`
  position: absolute; right: 0; top: 0;
  width: 24.593px;
  height: 24.593px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
`;

const PlaceToggleIcon = styled.button`
  position: absolute; right: 32px; top: 0;  
  width: 24.593px;
  height: 24.593px;
  aspect-ratio: 1 / 1;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

const PlaceList = styled.div`
  overflow: auto; padding-right: 8px;
`;
const PlaceItem = styled.button`
  width: 100%; height: 22px; text-align: left; border: 0; background: transparent;
  padding: 0px 12px; border-radius: 8px; font-size: 16px; cursor: pointer;
  color: #2C2C2C;
  align-items: center; 
  min-height: 40px;    
  &:hover{ background: rgba(0,0,0,0.05); }
`;

/* Chip */
const ChipWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: -15px;
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
  right: 30px;
  bottom: 8px;
  font-size: 12px;
  color: var(--gray, #BABABA);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: 0.42px;
`;



const fakePlaces = [
  
    {
        "id": 1,
        "name": "포항대게"
    },
    {
        "id": 2,
        "name": "대화식당"
    },
    {
        "id": 3,
        "name": "옥수수"
    },
    {
        "id": 4,
        "name": "죽도어시장 공영주차장"
    },
    {
        "id": 5,
        "name": "영광회대게센타"
    },
    {
        "id": 6,
        "name": "승리회맛집"
    },
    {
        "id": 7,
        "name": "동양횟집"
    },
    {
        "id": 8,
        "name": "장기식당"
    },
    {
        "id": 9,
        "name": "죽도포포"
    },
    {
        "id": 10,
        "name": "부산밀면"
    },
    {
        "id": 11,
        "name": "밀밭분식"
    },
    {
        "id": 12,
        "name": "가족식당"
    },
    {
        "id": 13,
        "name": "진분식"
    },
    {
        "id": 14,
        "name": "죽도시장 공영주차장"
    },
    {
        "id": 15,
        "name": "포원청과"
    },
    {
        "id": 16,
        "name": "태성청과"
    }

  ];

  

async function createPost(payload){
   const url = apiUrl("/tmi/records");
   const res = await fetch(url, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
    
   });
   if (!res.ok) {
     const msg = await res.text().catch(() => "");
     throw new Error(`POST ${url} failed: ${res.status} ${msg}`);
   }
   const txt = await res.text().catch(() => "");
   return txt ? JSON.parse(txt) : null;
 }

const Backdrop = styled.div`
  position: fixed; inset: 0px; background: rgba(0,0,0,0.35);
  display: grid; place-items: center;
  z-index: 1000; 
`;
const Dialog = styled.div`
  width: 500px;
  height: 280px;
  flex-shrink: 0;
  justify-content: center;
  background: ${themeColors.white.color};
  border: 1px solid ${themeColors.gray.color};
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  display: grid; gap: 12px;
  
`;

/* 개인정보 팝오버 */
const PrivacyOverlay = styled.div`
  position: fixed; 
  inset: 0; 
  background: transparent; z-index: 80;
`;
const PrivacyWrap = styled.div`
  position: fixed; 
  z-index: 81;

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
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(()=>{
    const update = ()=>{
      const el = anchorRef?.current; if(!el) return;
      const r = el.getBoundingClientRect();
     let top = r.bottom + 8;
     let left = r.left;

     const padding = 8;
     const maxLeft = window.innerWidth - 520 - padding; 
     left = Math.max(padding, Math.min(left, maxLeft));

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
        <PrivacyCard
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
          tabIndex={-1}
          onKeyDown={(e)=>{ if(e.key==='Escape') onClose(); }}
        >
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
        <h3 style={{ marginTop: 40, marginBottom:-30, fontSize: 24, fontWeight: 600, textAlign: "center" }}>
          비지토리 작성을 완료하시겠습니까?
        </h3>
        <p style={{ margin: "6px 0 0 0", textAlign: "center", color: "#555" }}>
          완료 시, 해당 글은 수정이 불가능합니다.
        </p>
        <Actions>
          <DialogButton onClick={onCancel} disabled={busy}>취소</DialogButton>
          <DialogButton onClick={onConfirm} disabled={busy}>
            {busy ? "저장 중…" : "확인"}
          </DialogButton>
        </Actions>

      </Dialog>
    </Backdrop>,
    document.body
  );
}

const MAX_BODY = 400;
const MAX_TITLE = 30;          
const MIN_BODY_FOR_SUBMIT = 10; 
const CATEGORY_OPTIONS = [
  { id: "1", label: "썰" },
  { id: "2", label: "팁" },
  { id: "3", label: "사건/사고", value: "사건사고" },
  { id: "4", label: "기념" },
  { id: "5", label: "자랑" },
  { id: "6", label: "리뷰" },
  { id: "7", label: "질문" },
  { id: "8", label: "인사이트" },
];

/* 페이지 컴포넌트 */
export default function AddTmiPage(){
  const nav = useNavigate();
  const { state } = useLocation();

  const [title, setTitle] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const infoBtnRef = useRef(null);

  const [place, setPlace] = useState({ id: "", name: "" });
  const [placeText, setPlaceText] = useState("");
  const [placeOpen, setPlaceOpen] = useState(false);
  const [placeQuery, setPlaceQuery] = useState("");
  const placeWrapRef = useRef(null);

  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  const [userPickedCategory, setUserPickedCategory] = useState(false);
  const [,setAiSuggested] = useState("");

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const privacyAnchorRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmBusy, setConfirmBusy] = useState(false);

  const [placeDirty, setPlaceDirty] = useState(false);

  const normalize = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();



  /* 확인 모달 표시 상태 */
  const [confirmOpen, setConfirmOpen] = useState(false);

  const bodyCount = body.length;

  const koCollator = useMemo(
    () => new Intl.Collator("ko-KR", { sensitivity: "base", numeric: true }),
    []
  );

  const placesSorted = useMemo(
    () => [...fakePlaces].sort((a, b) => koCollator.compare(a.name, b.name)),
    [koCollator]
  );

  const filteredPlaces = useMemo(() => {
    const q = placeQuery.trim();
    if (!q) return placesSorted;
    const lower = q.toLowerCase();
    return placesSorted.filter(p => p.name.toLowerCase().includes(lower));
  }, [placeQuery, placesSorted]);


  useEffect(()=>{
    const onDoc = (e)=>{
      if(placeOpen && placeWrapRef.current && !placeWrapRef.current.contains(e.target)){
        setPlaceOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return ()=> document.removeEventListener('mousedown', onDoc);
  }, [placeOpen]);

  

  useEffect(()=>{
      const t = placeText;
      if (!t.trim()) { setPlace({ id: "", name: "" }); return; }
      const norm = normalize(t);
      const found = fakePlaces.find(p => normalize(p.name) === norm);
      setPlace(found ? found : { id: "", name: "" });
    }, [placeText]);

  useEffect(() => {
        if (state?.prefillPlaceId) {
          setPlace({ id: state.prefillPlaceId, name: state.prefillPlaceName || "" });
          setPlaceText(state.prefillPlaceName || "");
        }
      }, [state]);

const canSubmit = useMemo(() => {
  const tLen = title.trim().length;
  const bLen = body.trim().length;

  const requiredOk =
    tLen > 0 &&
    tLen <= MAX_TITLE &&         
    placeText.trim().length > 0 &&
    bLen > 10 &&                 
    bLen <= MAX_BODY;

  return requiredOk;
}, [title, placeText, category, body]);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validate(){
    const e = {};
    if(!title.trim()) e.title = "제목을 입력해주세요.";
    if(!place.id) e.place = "장소를 검색 결과에서 선택해주세요.";
    if(!body.trim()) e.body = "이야기를 입력해주세요.";
    if(body.length > MAX_BODY) e.body = `최대 ${MAX_BODY}자까지 작성할 수 있어요.`;
    if (email.trim()) {
      if (!EMAIL_RE.test(email.trim())) e.email = "올바른 이메일 형식이 아니에요.";
      if (!consent) e.consent = "이메일을 입력하면 개인정보 동의가 필요해요.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const doSubmit = async () => {
    setSubmitting(true);
   let finalCategory = category || "썰";
   const sel = CATEGORY_OPTIONS.find(o => o.label === finalCategory);
   const categoryForServer = sel?.value ?? finalCategory.replace(/\//g, "");

    try {
      const payload = {
        marketId: Number(place.id),              
        title: title.trim(),
        content: body.trim(),                     
        category: categoryForServer,                  
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


    useEffect(() => {
        if (userPickedCategory) return;      
        if (category) return;               
        if (body.trim().length <= 10) return;
    
        const ctrl = new AbortController();
        const id = setTimeout(async () => {
          try {
            const res = await fetch("/.netlify/functions/classify-category", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: body }),
              signal: ctrl.signal
            });
            if (!res.ok) throw new Error("bad-status");
            const { label } = await res.json();
            if (!userPickedCategory && !category && label) {
              setAiSuggested(label);
              setCategory(label);
            }
          } catch {
            
          }
        }, 400);
    
        return () => { clearTimeout(id); ctrl.abort(); };
      }, [body, userPickedCategory, category]);
    
  

  

  async function onSubmit(e){
    e.preventDefault();
  setPlaceOpen(false);
  setInfoOpen(false);
  setPrivacyOpen(false);

  const t = placeText.trim().toLowerCase();
  if(!place.id && t){
    const exact = fakePlaces.find(p => p.name.toLowerCase() === t);
    if(exact) setPlace(exact);
  }

  if(!validate()) return;   
  setConfirmOpen(true);    
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Stage>
          <Header>
          <TitleBadge>
      <TitleBadgeOuter src={rectangle184Url} alt="" />
      <TitleBadgeInner>
        <TitleBadgeInnerImg src={ellipse21Url} alt="" />
        <Title>비지토리 작성</Title>
      </TitleBadgeInner>
    </TitleBadge>
            <InfoIcon ref={infoBtnRef} onClick={()=> setInfoOpen(true)}>
              <InfoCircleImg src={infoCircleUrl} alt="" />
            </InfoIcon>
          </Header>

          {infoOpen && (
            <InfoTooltip anchorRef={infoBtnRef} onClose={()=> setInfoOpen(false)} />
          )}

          <form onSubmit={onSubmit} noValidate>
            <Grid>
              <div style={{ display: 'grid', gap: 80 }}>
                <Field>
                  <Label htmlFor="title">제목을 입력해주세요*</Label>
                  <Input id="title" placeholder="글의 핵심이 잘 드러나도록 작성해주세요." value={title} onChange={(e)=> setTitle(e.target.value)} maxLength={MAX_TITLE}/>
                  {errors.title && <ErrorText>{errors.title}</ErrorText>}
                </Field>
            
                <Field>
                  <Label htmlFor="place">장소를 입력해주세요*</Label>
                  <SelectWrap ref={placeWrapRef}>
                    <PlaceInput
                      id="place"
                      placeholder="해당 이야기가 일어난 가게를 입력해주세요."
                      value={placeText}
                      onChange={(e)=>{ setPlaceDirty(true); setPlaceText(e.target.value); setPlaceQuery(e.target.value); setPlaceOpen(true); }}
                      onClick={()=> setPlaceOpen(true)}

                    />

                        <PlaceToggleIcon
                          type="button"
                          aria-label={placeOpen ? "검색 패널 접기" : "검색 패널 펼치기"}
                          onClick={()=> setPlaceOpen(o => !o)}
                        >
                          <img
                            src={placeOpen ? placetri2Url : placetri1Url}
                            alt=""
                            style={{ width: "10px", height: "6px", objectFit: "contain", marginTop: "20px", marginRight: "-30px" }}
                          />
                        </PlaceToggleIcon>

                    <InlineIconBtn type="button" aria-label="장소 검색 열기" onClick={()=> setPlaceOpen(v=>!v)} title="검색">
                      <img src = {searchUrl}/>
                    </InlineIconBtn>


                    {placeDirty && (placeText.trim() !== '' || placeQuery.trim() !== '') && (                      <StatusPos>
                        <StatusBadge $ok={!!place.id}>
                          <img src={place.id ? checkUrl : xUrl} alt="" aria-hidden="true" />
                        </StatusBadge>
                      </StatusPos>
                    )}


                    {placeOpen && (
                      <PlacePanel>
                      <PlaceSearchRow>
                        <PlaceSearchInput
                          placeholder="상점 이름을 검색해주세요."
                          value={placeQuery}
                          onChange={(e)=> { setPlaceDirty(true); setPlaceQuery(e.target.value); }}

                          autoFocus
                        />
                        <PlaceToggleIcon
                          type="button"
                          aria-label={placeOpen ? "검색 패널 접기" : "검색 패널 펼치기"}
                          onClick={()=> setPlaceOpen(o => !o)}
                        >
                          <img
                            src={placeOpen ? placetri2Url : placetri1Url}
                            alt=""
                            style={{ width: "10px", height: "6px", objectFit: "contain", marginBottom: "5px"}}
                          />
                        </PlaceToggleIcon>
                    
                        <PlaceSearchIcon aria-hidden="true">
                          <img src={searchUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}/>
                        </PlaceSearchIcon>
                      </PlaceSearchRow>
                    
                      {placeOpen && (
                        <PlaceList>
                          {filteredPlaces.map(p => (
                            <PlaceItem
                              key={p.id}
                              onClick={()=>{
                                setPlace(p);
                                setPlaceText(p.name);
                                setPlaceOpen(false);
                                setPlaceQuery("");
                              }}
                            >
                              {p.name}
                            </PlaceItem>
                          ))}
                        </PlaceList>
                      )}
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
                    <input type="checkbox" checked={consent} onChange={(e)=> setConsent(e.target.checked)} />
                  </Helper>
              
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
                </Field>
              </div>

              <div style={{ display: 'grid', gap: 90 }}>
                <Field>
                  <InlineRow>
                    <Label>어떤 유형의 글인가요?</Label>
                    <Helper>(선택하지 않으면 AI가 본문을 분석해서 선택해줘요)</Helper>
                  </InlineRow>
                  <ChipWrap>
                    {CATEGORY_OPTIONS.map((opt)=> (
                      <Chip key={opt.id} type="button" data-active={category === opt.label}
                      onClick={()=>{
                           const next = (category === opt.label) ? "" : opt.label;
                           setCategory(next);
                           setUserPickedCategory(next !== ""); 
                        }}>
                         {opt.label}
                         
                       </Chip>
                    ))}
                  </ChipWrap>
                </Field>

                <Field>
                  <Label htmlFor="body">이야기를 입력해주세요*</Label>
                  <TextareaBox>
                    <Textarea id="body" placeholder="비지토리를 작성해주세요. (최대 400자)" value={body} onChange={(e)=> setBody(e.target.value)} maxLength={MAX_BODY} />
                    <Counter>{Math.min(bodyCount, MAX_BODY)}/{MAX_BODY}</Counter>
                  </TextareaBox>
                  {errors.body && <ErrorText>{errors.body}</ErrorText>}
                </Field>

                
              </div>
            </Grid>

            <Actions>
              <PageButton type="submit" disabled={!canSubmit || submitting}>
                완료
              </PageButton>
            </Actions>

          </form>

          <PrivacyModal open={privacyOpen} anchorRef={privacyAnchorRef} onClose={()=> setPrivacyOpen(false)} />

          <ConfirmDialog
            open={confirmOpen}
                onCancel={()=> setConfirmOpen(false)}
                onConfirm={async ()=>{
                  if (confirmBusy) return;
                  setConfirmBusy(true);
                  setConfirmOpen(false);
                  await doSubmit();
                  setConfirmBusy(false);
                }}
                busy={confirmBusy || submitting}
          />
        </Stage>
      </Page>
    </>
  );
}
