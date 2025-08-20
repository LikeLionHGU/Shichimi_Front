// src/pages/TmiDetailPage.jsx
// - 라우트: /records/:id
// - API: GET /tmi/records/{tmiId} (조회수 자동 증가)
//        POST /tmi/{tmiId}/like
//        POST /tmi/{tmiId}/comments  body: { content }
// - 전부 flex 레이아웃 / 댓글 최신순 상단 / 등록 시 스크롤 최상단 / 좋아요 중복 방지+롤백
// - 한국 로케일 및 Asia/Seoul 고정 / 에러 메시지 정리

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

/* ===================== 공통 유틸/설정 ===================== */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
function apiUrl(path) {
  if (!API_BASE) throw new Error("VITE_API_BASE_URL이 비어 있습니다.");
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
function cleanMsg(txt) {
  if (!txt) return "";
  return txt.replace(/<[^>]*>/g, "").slice(0, 300);
}
function fmtKST(iso) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
function sortCommentsDesc(list) {
  return [...(list || [])].sort((a, b) => {
    const ta = Date.parse(a?.createdDate || "") || 0;
    const tb = Date.parse(b?.createdDate || "") || 0;
    if (tb !== ta) return tb - ta;
    const ia = Number(a?.id) || 0;
    const ib = Number(b?.id) || 0;
    return ib - ia;
  });
}

/* ===================== API 호출 (스펙 고정) ===================== */
async function fetchTmi(tmiId) {
  const url = apiUrl(`/tmi/records/${tmiId}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
  return res.json(); // { tmiId, title, content, category, email, likes, views, marketId, marketName, tmiCommentList: [...] }
}
async function likeTmi(tmiId) {
  const url = apiUrl(`/tmi/${tmiId}/like`);
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) {
    const msg = cleanMsg(await res.text().catch(() => ""));
    throw new Error(`POST ${url} ${res.status} ${msg}`);
  }
  return res.json(); // 갱신된 TMI 객체
}
async function createComment(tmiId, content) {
  const url = apiUrl(`/tmi/${tmiId}/comments`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const msg = cleanMsg(await res.text().catch(() => ""));
    throw new Error(`POST ${url} ${res.status} ${msg}`);
  }
  return res.json(); // { id, content, createdDate }
}

/* ===================== 스타일(모두 flex, 박스사이징 통일) ===================== */
const Page = styled.main`
  min-height: 100vh;
  background: #fffdf5;
  display: flex;
  flex-direction: column;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
`;

const Stage = styled.div`
  /* 디자인 컨테이너: 폭은 이미지 기준으로 최적화, 작은 화면에서는 1열로 스택 */
  width: min(1100px, 95vw);
  margin: 24px auto 80px;
  display: flex;
  align-items: flex-start;
  gap: 28px;                 /* 시안 간격 */
  flex-wrap: nowrap;         /* 2열 배치 강제 */
  box-sizing: border-box;
`;

/* 좌측 카드: 패딩/보더 포함 폭 계산을 위해 border-box 명시 */
const PostCard = styled.article`
  background: #fffdf5;
width: 760px;
height: 618px;
flex-shrink: 0;
  box-sizing: border-box;
  flex: 1 1 0;               /* 남는 공간을 전부 사용 */
  min-width: 620px;          /* 댓글 패널이 옆에 붙을 때의 최소 폭 */
  display: flex;
  flex-direction: column;
  gap: 10px;

  border: 1.5px solid #2c2c2c;
  border-radius: 16px;
  padding: 36px 44px 56px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  
`;

/* 제목 줄: 좌측 스페이서 · 중앙 제목 · 우측 원형 배지 */
const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlaceBar = styled.div`
    display: flex;
    flex-direction: row-reverse
`
;

const place = styled.div`
color: var(--black, #2C2C2C);
text-align: right;

/* 본문 제목 */
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 0.9px;
`
;

const Spacer = styled.div`
display: flex;
flex-direction: row-reverse
`;
const Title = styled.h2`
  flex: 1 1 auto;
  margin: 0;
  text-align: center;
  color: #2c2c2c;
  font-size: 28px;
  line-height: 1.35;
  letter-spacing: 0.1px;
  font-weight: 700;

`;
const CircleBadge = styled.div`
display: flex;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
border: 1px solid rgba(44, 44, 44, 0.50);
background: var(--white, #FFFDF5);
color: rgba(44, 44, 44, 0.50);
text-align: right;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: 0.7px;
`;


const Body = styled.div`
width: 529px;
max-width: 600px;
margin-top: 100px;
height: 232px;
flex-shrink: 0;
overflow: hidden;
color: var(--black, #2C2C2C);
text-overflow: ellipsis;
white-space: nowrap;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 180%; /* 28.8px */
letter-spacing: 0.48px;
`;

const BottomRow = styled.div`
  margin-top: auto; /* 카드 하단 고정 */
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7fa889;
  font-size: 14px;
`;

const HeartBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 0;
  padding: 6px 8px;
  color: #7fa889;
  cursor: pointer;
  &:hover { opacity: 0.9; }
  &[data-active="true"] { color: #5e8a6b; }
  &:disabled { opacity: 0.85; cursor: default; }
`;
function HeartIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.1 8.64l-.1.1-.11-.11C10.14 6.96 7.4 6.91 5.64 8.67c-1.77 1.77-1.77 4.64 0 6.41l5.78 5.78c.32.32.84.32 1.16 0l5.78-5.78c1.77-1.77 1.77-4.64 0-6.41-1.77-1.77-4.5-1.72-6.26.04z"
        fill="none"
        stroke="#7FA889"
        strokeWidth="1.7"
      />
    </svg>
  );
}

/* 우측 댓글 패널: 고정폭 + border-box 로 합산폭 정확히 맞춤 */
const Panel = styled.aside`
width: 424px;
height: 618px;
flex-shrink: 0;
  box-sizing: border-box;
  flex: 0 0 360px;           /* 패딩/보더 포함 폭 360px로 고정(시안 느낌) */
  display: flex;
  flex-direction: column;

  background: #fffdf5;
  border: 1.5px solid #2c2c2c;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  height: 700px;
  max-height: 618px;
`;

const PanelTitle = styled.h3`
  margin: 6px 6px 10px;
  font-size: 18px;
  color: #2c2c2c;
  font-weight: 700;
`;

const List = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px;
`;

const Bubble = styled.div`
  background: #e8f1e7;
  color: #2c2c2c;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 15px;
  line-height: 1.55;
`;

const InputRow = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`;

const CommentInput = styled.textarea`
  flex: 1 1 auto;
  height: 44px;
  resize: none;
  border-radius: 12px;
  border: 1.5px solid #2c2c2c;
  background: #fffdf5;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
  &::placeholder { color: #b7b7b7; }
  &:focus { box-shadow: 0 0 0 3px rgba(88, 139, 73, 0.15); }
`;

const SendBtn = styled.button`
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 1.5px solid #2c2c2c;
  background: #588b49;
  color: #fffdf5;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:disabled { background: #cfcfcf; border-color: #cfcfcf; cursor: not-allowed; }
`;

/* ===================== 페이지 ===================== */
export default function TmiDetailPage() {
  const { id: paramId } = useParams();
  const tmiId = String(paramId);
  const nav = useNavigate();

  const [tmi, setTmi] = useState(null);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);
  const [liking, setLiking] = useState(false);

  const listRef = useRef(null);

  // 좋아요 중복 방지(LocalStorage)
  const likedKey = `tmi-liked:${tmiId}`;
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(!!localStorage.getItem(likedKey));
  }, [tmiId]);

  // 상세 조회(조회수 자동 증가)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTmi(tmiId);
        if (!alive) return;
        setTmi(data);
        setLikes(data?.likes ?? 0);
        setViews(data?.views ?? 0);
        const initial = Array.isArray(data?.tmiCommentList) ? data.tmiCommentList : [];
        setComments(sortCommentsDesc(initial));
        requestAnimationFrame(() => {
          listRef.current?.scrollTo({ top: 0 });
        });
      } catch (e) {
        console.error(e);
        setErr("글을 불러오지 못했습니다.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [tmiId]);

  // 좋아요
  async function onLike() {
    if (liking || liked) return;
    setLiking(true);
    const prev = likes;
    setLikes(prev + 1);       // 낙관적 업데이트
    setLiked(true);
    localStorage.setItem(likedKey, "1");
    try {
      const updated = await likeTmi(tmiId);
      if (typeof updated?.likes === "number") setLikes(updated.likes);
      if (typeof updated?.views === "number") setViews(updated.views);
      setTmi((p) => (updated ? { ...(p || {}), ...updated } : p));
    } catch (e) {
      console.error(e);
      setLikes(prev);         // 롤백
      setLiked(false);
      localStorage.removeItem(likedKey);
      alert("좋아요 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLiking(false);
    }
  }

  // 댓글 전송(최상단 추가 + 스크롤 맨 위)
  async function onSendComment(e) {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    setSending(true);
    try {
      const created = await createComment(tmiId, text);
      setComments((prev) => sortCommentsDesc([created, ...prev]));
      setCommentText("");
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      });
    } catch (e) {
      console.error(e);
      alert("댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  }

  /* ===================== 렌더 ===================== */
  if (loading) {
    return (
      <Page>
        <Stage>
          <PostCard>
            <TitleBar>
              <Spacer />
              <Title>로딩 중…</Title>
              <Spacer />
            </TitleBar>
            <Body>글 내용을 불러오고 있어요.</Body>
          </PostCard>

          <Panel>
            <PanelTitle>댓글</PanelTitle>
            <List ref={listRef} />
            <InputRow>
              <CommentInput disabled placeholder="댓글을 적어주세요." />
              <SendBtn disabled aria-label="댓글 전송">↑</SendBtn>
            </InputRow>
          </Panel>
        </Stage>
      </Page>
    );
  }

  if (err || !tmi) {
    return (
      <Page>
        <Stage>
          <PostCard>
            <TitleBar>
              <Spacer />
              <Title>문제가 발생했어요</Title>
              <Spacer />
            </TitleBar>
            <Body>{err || "존재하지 않는 글입니다."}</Body>
            <div style={{ marginTop: 16, display: "flex" }}>
              <button
                onClick={() => nav(-1)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #2C2C2C",
                  background: "#FFF",
                }}
              >
                뒤로가기
              </button>
            </div>
          </PostCard>
        </Stage>
      </Page>
    );
  }

  return (
    <Page>
      <Stage>
        {/* 좌측 카드 */}
        <PostCard>
          <TitleBar>
            <Title>{tmi.title}</Title>
          </TitleBar>
          <PlaceBar>
          {tmi.marketName ? <place>{tmi.marketName}</place> : <Spacer />}
          </PlaceBar>
          <Spacer>
          {tmi.category ? <CircleBadge>{tmi.category}</CircleBadge> : <Spacer />}
          </Spacer>
          <Body>{tmi.content}</Body>
          <BottomRow>
            <HeartBtn
              onClick={onLike}
              aria-label="좋아요"
              title="좋아요"
              disabled={liking || liked}
              data-active={liked}
            >
              <HeartIcon />
              <span>{(likes ?? 0).toLocaleString()}</span>
            </HeartBtn>
            {/* 필요 시 조회수 표기
            <span style={{ color: "#6A6A6A" }}>조회 {views.toLocaleString()}</span> */}
          </BottomRow>
        </PostCard>

        {/* 우측 댓글 패널 */}
        <Panel>
          <PanelTitle>댓글</PanelTitle>
          <List ref={listRef}>
            {comments.length === 0 && (
              <div style={{ color: "#999", fontSize: 13, padding: 6 }}>
                아직 댓글이 없습니다.
              </div>
            )}
            {comments.map((c) => (
              <Bubble key={c.id}>
                {c.content}
                {c.createdDate && (
                  <div style={{ marginTop: 6, fontSize: 12, color: "#7C7C7C" }}>
                    {fmtKST(c.createdDate)}
                  </div>
                )}
              </Bubble>
            ))}
          </List>
          <InputRow onSubmit={onSendComment}>
            <CommentInput
              placeholder="댓글을 적어주세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              maxLength={400}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (commentText.trim() && !sending) onSendComment(e);
                }
              }}
            />
            <SendBtn
              type="submit"
              aria-label="댓글 전송"
              title="댓글 전송"
              disabled={!commentText.trim() || sending}
            >
              ↑
            </SendBtn>
          </InputRow>
        </Panel>
      </Stage>
    </Page>
  );
}
