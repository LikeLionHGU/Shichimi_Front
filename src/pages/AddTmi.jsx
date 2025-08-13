import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../assets/styles/StyledComponents";
import ellipse21Url from "../assets/images/Ellipse 21.svg";
import rectangle184Url from "../assets/images/Rectangle 184.svg";

// 페이지 메인 래퍼
const Page = styled.main`
  display: grid;
  background: var(--white, #FFFDF5);
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding: clamp(16px, 3vw, 32px);
  max-width: 1100px;
  margin: 0 auto;
`;

// 상단 헤더(타이틀, 정보아이콘)
const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
`;

// 타이틀 배지: 초록 직사각형 안에 Ellipse + 텍스트
const TitleBadge = styled.div`
  position: relative;
  width: 286px;
  height: 92px;
`;
const TitleBadgeOuter = styled.div`
  position: absolute; inset: 0;
  background: url(${rectangle184Url}) center/contain no-repeat;
`;
const TitleBadgeInner = styled.div`
  position: absolute; inset: 10px 18px;
  background: url(${ellipse21Url}) center/contain no-repeat;
  display: grid; place-items: center;
`;

// 페이지 제목 텍스트 (Ellipse 안에 들어감)
const Title = styled.h1`
  color: var(--black, #2C2C2C);
  text-align: center;
  font-family: "BM HANNA 11yrs old OTF";
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

// (선택) 사각형 장식 이미지
const Rectangle184 = styled.div`
  width: 286px;
  height: 92px;
  flex-shrink: 0;
  background: var(--green, #588B49) url(${rectangle184Url}) center/contain no-repeat;
`;

// 정보 툴팁 아이콘 버튼
const InfoIcon = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  border: 1px solid ${themeColors.gray.color};
  background: ${themeColors.white.color};
  font-size: 12px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
`;

// 카드 래퍼(폼 박스)
const Card = styled.section`
  background: var(--white, #FFFDF5);
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: clamp(16px, 2vw, 24px);
`;

// 좌우 2열 그리드 레이아웃
const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  @media (min-width: 980px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
`;

// 단일 폼 필드 컨테이너
const Field = styled.div`
  display: grid;
  gap: 8px;
`;

// 필드 라벨 텍스트
const Label = styled.label`
  color: var(--black, #2C2C2C);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.9px;
`;

// 보조 설명 텍스트
const Helper = styled.p`
  display: flex;
  width: 310px;
  height: 22px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: var(--gray, #BABABA);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.48px;
  margin: 0;
`;

// 에러 메시지 텍스트
const ErrorText = styled.p`
  font-size: 0.875rem;
  color: ${themeColors.red.color};
  margin: 0;
`;

// 텍스트 입력 컴포넌트
const Input = styled.input`
  width: 400px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  padding: 0 12px;
`;

// 셀렉트 박스
const Select = styled.select`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: 2px solid var(--black, #2C2C2C);
  background: #fff;
  color: ${themeColors.black?.color || "#111"};
  padding: 0 44px 0 12px; /* 우측 검색 아이콘 자리 확보 */
  appearance: none; /* 기본 화살표 숨김 */
  &:focus-visible { outline: 3px solid ${themeColors.gray.color}; outline-offset: 2px; }
`;

// 본문 입력 텍스트영역
const Textarea = styled.textarea`
  border: 1px solid ${themeColors.gray.color};
  background: ${themeColors.white.color};
  color: ${themeColors.black?.color || "#111"};
  border-radius: 12px;
  padding: 12px 14px;
  min-height: 220px;
  font-size: 1rem;
  resize: vertical;
  &:focus-visible { outline: 3px solid ${themeColors.gray.color}; outline-offset: 2px; }
`;

// 폼 하단 버튼 영역
const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 12px;
`;

// 기본 버튼
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

  &:disabled{ opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled){ transform: translateY(-1px); }
`;

// 입력 + 아이콘 정렬 행
const RowH = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
`;

// 셀렉트 내부에 아이콘을 넣기 위한 래퍼
const SelectWrap = styled.div`
  position: relative;
  width: 100%;
`;
const InlineIconBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
`;

// 돋보기 아이콘 버튼
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

// 카테고리 칩 래퍼
const ChipWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// 카테고리 칩 버튼
const Chip = styled.button`
  border-radius: 9999px;
  padding: 8px 12px;
  font-weight: 600;
  border: 1px solid ${themeColors.gray.color};
  background: ${(p)=> p["data-active"] ? themeColors.black?.color || "#111" : themeColors.white.color};
  color: ${(p)=> p["data-active"] ? themeColors.white.color : themeColors.black?.color || "#111"};
`;

// 글자수 카운터
const Counter = styled.span`
  display: inline-block;
  font-size: 12px;
  color: ${themeColors.gray.color};
  margin-left: auto;
`;

// Fake API replace with real services
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

// 모달 배경
const Backdrop = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.35);
  display: grid; place-items: center; z-index: 40;
`;

// 모달 컨테이너
const Dialog = styled.div`
  width: min(680px, 92vw);
  background: ${themeColors.white.color};
  border: 1px solid ${themeColors.gray.color};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  display: grid; gap: 12px;
`;

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
        <Label htmlFor="place-search">가게/장소 검색</Label>
        <Input id="place-search" placeholder="상호명으로 검색" value={query} onChange={(e)=> setQuery(e.target.value)} />
        {loading && <Helper>검색 중…</Helper>}
        <div style={{ display: 'grid', gap: 8, maxHeight: 260, overflow: 'auto' }}>
          {results.map((p)=> (
            <Button key={p.id} data-variant="ghost" onClick={()=>{ onSelect(p); onClose(); }}>
              {p.name}
            </Button>
          ))}
          {!loading && results.length === 0 && <Helper>검색 결과가 없습니다.</Helper>}
        </div>
        <Actions>
          <Button data-variant="ghost" onClick={onClose}>닫기</Button>
        </Actions>
      </Dialog>
    </Backdrop>,
    document.body
  );
}

const MAX_BODY = 400;
const CATEGORIES = ["썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"];

export default function AddTmiPage(){
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState({ id: "", name: "" });
  const [openPlaceModal, setOpenPlaceModal] = useState(false);
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const bodyCount = body.length;

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
    <Page>
      <Header>
        <TitleBadge>
          <TitleBadgeOuter />
          <TitleBadgeInner>
            <Title>비지토리 작성</Title>
          </TitleBadgeInner>
        </TitleBadge>
        <InfoIcon aria-label="도움말" title="카테고리를 고르지 않으면 본문을 분석해 자동 분류합니다.">i</InfoIcon>
      </Header>

      <Card>
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
                <SelectWrap>
                  <Select id="place" value={place.id} onChange={(e)=>{
                    const opt = fakePlaces.find(p=> p.id === e.target.value);
                    setPlace(opt ? opt : { id: "", name: "" });
                  }}>
                    <option value="">해당 이야기가 일어난 가게를 입력해주세요.</option>
                    {fakePlaces.map((p)=> <option key={p.id} value={p.id}>{p.name}</option>)}
                  </Select>
                  <InlineIconBtn type="button" aria-label="장소 검색 열기" onClick={()=> setOpenPlaceModal(true)} title="검색">🔍</InlineIconBtn>
                </SelectWrap>
                {errors.place && <ErrorText>{errors.place}</ErrorText>}
              </Field>

              <Field>
                <Label htmlFor="email">인기글에 선정되면 할인쿠폰을 드려요</Label>
                <Input id="email" placeholder="할인쿠폰을 받을 이메일 주소를 입력해주세요." value={email} onChange={(e)=> setEmail(e.target.value)} />
                <Helper>
                  상품 수령을 위한 <a href="#" onClick={(e)=> e.preventDefault()}>개인정보(이메일) 수집 및 이용</a>에 동의합니다
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
                <Label>어떤 유형의 글인가요?</Label>
                <Helper>(선택하지 않으면 AI가 본문을 분석해서 선택해줘요)</Helper>
                <ChipWrap>
                  {CATEGORIES.map((c)=> (
                    <Chip key={c} type="button" data-active={category === c} onClick={()=> setCategory((prev)=> prev === c ? "" : c)}>
                      {c}
                    </Chip>
                  ))}
                </ChipWrap>
              </Field>

              <Field>
                <Label htmlFor="body">이야기를 입력해주세요</Label>
                <div style={{ position: 'relative', display: 'grid', gap: 6 }}>
                  <Textarea id="body" placeholder="비지토리를 작성해주세요. (최대 400자)" value={body} onChange={(e)=> setBody(e.target.value)} maxLength={MAX_BODY+50} />
                  <div style={{ display:'flex' }}>
                    <Counter>{Math.min(bodyCount, MAX_BODY)}/{MAX_BODY}</Counter>
                  </div>
                </div>
                {errors.body && <ErrorText>{errors.body}</ErrorText>}
              </Field>
            </div>
          </Grid>

          <Actions>
            <Button type="submit" data-variant="primary" disabled={submitting}>{submitting ? "저장 중…" : "완료"}</Button>
          </Actions>
        </form>
      </Card>

      <PlaceSearchDialog
        open={openPlaceModal}
        onClose={()=> setOpenPlaceModal(false)}
        onSelect={(p)=> setPlace(p)}
      />
    </Page>
  );
}
