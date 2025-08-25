import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import tmiDetailUrl from "../assets/images/tmidetail.svg?url";
import sendButtonUrl from "../assets/images/sendbutton.svg?url";
import bottomImageUrl from "../assets/images/bottomimage.svg?url";
import viewsIconUrl from "../assets/images/views.svg?url";


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
        const d = parseKSTDate(iso);
        if (!d) return "";
        return new Intl.DateTimeFormat("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(d);
      } catch { return ""; }
}

function parseKSTDate(s) {
    if (!s) return null;
    if (/[zZ]|[+-]\d{2}:\d{2}$/.test(s)) return new Date(s); 
    const normalized = String(s).replace(" ", "T");
    return new Date(normalized + "+09:00");
  }


function sortCommentsDesc(list) {
  return [...(list || [])].sort((a, b) => {
    const ta = parseKSTDate(a?.createdDate)?.getTime?.() || 0;
    const tb = parseKSTDate(b?.createdDate)?.getTime?.() || 0;
    if (tb !== ta) return tb - ta;
    const ia = Number(a?.id) || 0;
    const ib = Number(b?.id) || 0;
    return ib - ia;
  });
}


async function fetchTmi(tmiId) {
  const url = apiUrl(`/tmi/records/${tmiId}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
  return res.json();
}
async function likeTmi(tmiId) {
  const url = apiUrl(`/tmi/${tmiId}/like`);
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) {
    const msg = cleanMsg(await res.text().catch(() => ""));
    throw new Error(`POST ${url} ${res.status} ${msg}`);
  }
  return res.json(); 
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
  return res.json(); 
}

const Page = styled.main`
  display: block;
  background: var(--white, #FFFDF5);
  width: 1720px;
  max-width: 100%;
  margin: 0 auto;
`;

const LocalBG = createGlobalStyle`
  html, body, #root { min-height: 100%; background: #FFFDF5; }
  body { margin: 0; }
`;


const Stage = styled.div`
  width: min(1100px, 95vw);
  margin: auto 80px;
  display: flex;
  align-items: flex-start;
  gap: 50px;
  box-sizing: border-box;
  margin-top: 100px;
  margin-bottom: -15%;
  margin-left: 12.5%;    


  /* 작은 화면: 1열 스택 */
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;


const PostCard = styled.article`
   position: relative;
   isolation: isolate;       
   overflow: hidden;         
   background: transparent;

   width: 760px;
   height: 618px;
   flex-shrink: 0;
   box-sizing: border-box;
   flex: 1 1 0;
   min-width: 620px;
   display: flex;
   flex-direction: column;
   gap: 10px;

   border: 0;                
   border-radius: 16px;
   padding: 36px 80px 56px;

 `;

const CardFrame = styled.img`
  position: absolute;
  inset: 0;                
  width: 100%;
  height: 618px;
  z-index: 0;
  pointer-events: none;
`;


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

const PlaceName = styled.div`
color: var(--black, #2C2C2C);
text-align: right;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 0.9px;
`
;

const PlaceNameLink = styled(Link)`
  color: var(--black, #2C2C2C);
  text-align: right;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.9px;
  text-decoration: none;
  cursor: pointer;
`;


const Spacer = styled.div`
display: flex;
flex-direction: row-reverse
`;
const Title = styled.h2`
  flex: 1 1 auto;
  margin: 0;
  text-align: center;
  color: #2c2c2c;
  font-size: 30px;
  line-height: 1.35;
  letter-spacing: 0.1px;
  font-weight: 700;

`;

const CircleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;          
  padding: 0 10px;           
  box-sizing: border-box;
  border-radius: 9999px;     
  border: 1px solid rgba(44, 44, 44, 0.50);
  background: var(--white, #FFFDF5);
  color: rgba(44, 44, 44, 0.50);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
  white-space: nowrap;       
`;

const Body = styled.div`
  position: relative;
  width: 620px;
  max-width: 100%;
  height: 232px;
  margin-top: 50px;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const BodyText = styled.div`
  color: var(--black, #2C2C2C);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 180%;
  letter-spacing: 0.48px;
  white-space: pre-wrap;
  max-height: 100%;
  overflow: auto;
`;


const BottomRow = styled.div`
  margin-top: auto; 
  display: flex;
  align-items: center;
  gap: 8px;
  color: #BABABA;
  font-size: 14px;
`;

const HeartBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 0;
  padding: 6px 8px;
  color: #BABABA; 
  cursor: pointer;
  transition: color .15s ease, opacity .15s ease, transform .05s ease;

  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.98); }
  &[data-active="true"] { color: #5e8a6b; } 
  &:disabled { opacity: 0.85; cursor: default; }
  &[data-active="true"]:disabled { opacity: 1; }
`;



function HeartIcon({ size = 24, filled = false }) {
  const h = Math.round(size * 22 / 24);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={h} viewBox="0 0 24 22" fill="none">
      <path d="M6.80556 1C3.59967 1 1 3.65882 1 6.93765C1 13.5 12 21 12 21C12 21 23 13.5 23 6.93765C23 2.87529 20.4003 1 17.1944 1C14.9211 1 12.9533 2.33647 12 4.28235C11.0467 2.33647 9.07889 1 6.80556 1Z"
        stroke="#588B49"
        fill={filled ? "currentColor" : "none"}
        strokeWidth="1.7" />
    </svg>
  );
} 

const ViewBtn = styled(HeartBtn).attrs({ as: "div" })`
   color: #BABABA;        
   pointer-events: none;  
   &[data-active="true"] { color: #BABABA; } 
   margin-bottom: 5px;
   margin-right: -8px;
 `;

function ViewsIcon({ width = 25, height = 25 }) {
   return <img src={viewsIconUrl} alt="" width={width} height={height} />;
 }


const Panel = styled.aside`
width: 444px;
height: 618px;
flex-shrink: 0;
box-sizing: border-box;
flex: 0 0 360px;          
display: flex;
flex-direction: column;

background: #fffdf5;
border: 1.5px solid #2c2c2c;
border-radius: 16px;
padding: 7px;
box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
max-height: 618px;
`;

const PanelTitle = styled.div`
  font-family: Pretendard;
  display: flex;
  margin: 10px 6px 10px;
  font-size: 18px;
  color: #2c2c2c;
  font-weight: 600;
  align-items: center;
  flex-direction: column;
  line-height: normal;
  letter-spacing: 0.9px;
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
  border-radius: 8px;
  background: rgba(88, 139, 73, 0.10);
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
  border: 1.5px solid #fffdf5;
  background: #fffdf5;
  padding: 12px 14px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 270%; 
  letter-spacing: 0.48px;
  outline: none;
  &::placeholder { color: #BABABA; }
`;

const SendBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 15px;

  border: 1.5px solid #588b49;
  background: #588b49;
  color: #fffdf5;

  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  appearance: none;
  -webkit-appearance: none;
  outline: none;
  &::-moz-focus-inner { border: 0; padding: 0; }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(88, 139, 73, 0.35);
  }

  & > img {
    width: 52px;   
    height: 52px;
    display: block;
    pointer-events: none;
  }
`;

// 비지토리에 실제 데이터가 있는 4곳만 링크 허용
const MARKET_NAME_TO_ID = {
  "포항대게": 1,
  "대화식당": 2,
  "옥수수": 3,
  "죽도어시장 공영주차장": 4,
};
const KNOWN_MARKET_IDS = new Set([1, 2, 3, 4]);

function resolveMarketId(tmi) {
  const byId = Number(tmi?.marketId);
  if (KNOWN_MARKET_IDS.has(byId)) return String(byId);
  const name = tmi?.marketName?.trim?.() || "";
  const fromName = MARKET_NAME_TO_ID[name];
  return fromName ? String(fromName) : null;
}

const PageFooter = styled.footer`
  width: 100%;
  margin-top: 300px;
`;

const BottomImg = styled.img`
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;     
  border-radius: 12px;
`;

export default function TmiDetailPage() {
  const { id: paramId } = useParams();
  const tmiId = String(paramId);
  

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

  const likedKey = `tmi-liked:${tmiId}`;
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    setLiked(!!localStorage.getItem(likedKey));
  }, [tmiId]);

  const mem = (window.__tmiMem ??= { inflight: new Map(), cache: new Map() });

  useEffect(() => {
  let alive = true;

  (async () => {
    try {
      setLoading(true);

     if (import.meta.env.DEV) {
       const cached = mem.cache.get(tmiId);
       if (cached) {
         if (!alive) return;
         setTmi(cached);
         setLikes(cached?.likes ?? 0);
         setViews(cached?.views ?? 0);
         setComments(sortCommentsDesc(Array.isArray(cached?.tmiCommentList) ? cached.tmiCommentList : []));
         setLoading(false);
         return;
       }
       const inflight = mem.inflight.get(tmiId);
       if (inflight) {
         const data = await inflight;
         if (!alive) return;
         setTmi(data);
         setLikes(data?.likes ?? 0);
         setViews(data?.views ?? 0);
         setComments(sortCommentsDesc(Array.isArray(data?.tmiCommentList) ? data.tmiCommentList : []));
         setLoading(false);
         return;
       }
     }

     const p = fetchTmi(tmiId);
     if (import.meta.env.DEV) mem.inflight.set(tmiId, p);
     const data = await p;

      if (!alive) return;
      setTmi(data);
      setLikes(data?.likes ?? 0);
      setViews(data?.views ?? 0);
      const initial = Array.isArray(data?.tmiCommentList) ? data.tmiCommentList : [];
      setComments(sortCommentsDesc(initial));
     if (import.meta.env.DEV) mem.cache.set(tmiId, data); 

      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: 0 });
      });
    } catch (e) {
      setErr("글을 불러오지 못했습니다.");
    } finally {
     if (import.meta.env.DEV) mem.inflight.delete(tmiId);
      if (alive) setLoading(false);
    }
  })();

  return () => { alive = false; };
}, [tmiId]);


  async function onLike() {
    if (liking || liked) return;
    setLiking(true);
    const prev = likes;
    setLikes(prev + 1);      
    setLiked(true);
    localStorage.setItem(likedKey, "1");
    try {
      const updated = await likeTmi(tmiId);
      if (typeof updated?.likes === "number") setLikes(updated.likes);
      if (typeof updated?.views === "number") setViews(updated.views);
      setTmi((p) => (updated ? { ...(p || {}), ...updated } : p));
    } catch (e) {
      setLikes(prev);         
      setLiked(false);
      localStorage.removeItem(likedKey);
      alert("좋아요 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLiking(false);
    }
  }

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
              
            </div>
          </PostCard>
        </Stage>
      </Page>
    );
  }

  return (
    <Page>
    <LocalBG/>
      <Stage>
        {/* 좌측 카드 */}
        
        <PostCard>
         <CardFrame src={tmiDetailUrl} alt="" aria-hidden="true" />
          <TitleBar>
            <Title>{tmi.title}</Title>
          </TitleBar>
          <PlaceBar>
            {(() => {
              const name = tmi.marketName?.trim();
              const marketId = resolveMarketId(tmi); 
              if (!name) return <Spacer />;
              return marketId ? (
                <PlaceNameLink to={`/info/${marketId}`} aria-label={`${name} 상세보기로 이동`}>
                  {name}
                </PlaceNameLink>
              ) : (
                <PlaceName>{name}</PlaceName>
              );
            })()}
          </PlaceBar>

          <Spacer>
          {tmi.category ? <CircleBadge>{tmi.category}</CircleBadge> : <Spacer />}
          </Spacer>
          <Body>
          
          <BodyText>{tmi.content}</BodyText>
          
          </Body>
          

          <BottomRow>
            <HeartBtn
              onClick={onLike}
              aria-label="좋아요"
              title="좋아요"
              disabled={liking || liked}
              data-active={liked}
            >
            <HeartIcon filled={liked} />
              <span>{(likes ?? 0).toLocaleString()}</span>
            </HeartBtn>
            <ViewBtn aria-label="조회수" title="조회수">
              <ViewsIcon />
            </ViewBtn>
            <span>{(views ?? 0).toLocaleString()}</span>
          </BottomRow>
        </PostCard>

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
            <SendBtn aria-label="보내기" disabled={sending || !commentText.trim()}>
              <img src={sendButtonUrl} alt="" />
            </SendBtn>

          </InputRow>
        </Panel>
      </Stage>
      {(() => {
        const footSrc = tmi?.bottomImageUrl || tmi?.imageUrl || bottomImageUrl;
        return footSrc ? (
          <PageFooter aria-label="페이지 푸터">
            <BottomImg src={footSrc} alt="" />
          </PageFooter>
        ) : null;
      })()}
    </Page>
    
  );
}
