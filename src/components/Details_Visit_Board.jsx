import React, {useEffect , useState, useRef } from "react";
import axios from 'axios';
import styled from "styled-components";
import {Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import ScrollBar from "./common/ScrollBar";
import TmiCard from "./tmiCard";
import Detail_Tmi_Btn from "../components/common/detail_Tmi_btn";

const TopBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  border-radius: 12px 12px 0 0 ;
  width: 12vw;
  height: 4vh;

  margin-top: -0.5%;
  padding: 0.5% 0;
  background-color: ${({ $color }) => $color };
  color: ${themeColors.white.color};
  font-size: 1.1vw;

`;
const BottomBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 43vw;
  padding-bottom: 2%;
`;

/* TMI 게시판 CARD 전체 Box */
const ThisTmi = styled.div`
  display: flex;
  width: 43vw;
  height: 45vh;
  margin: 0 2% 0 5%;
`;

const TMICATEGORY = ["전체","썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"];

const CATEGORY_TO_SERVER = {
  "사건/사고": "사건사고",
};


const CateChip_Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 40vw;
  gap: 0.7%;
  flex-wrap: wrap;
  margin: 2% 0 2% 2%;
`;

const CateChip = styled.button`
  border-radius: 9999px;
  padding: 1% 2%;
  font-size: 0.8vw;
  background-color: ${themeColors.white.color};
  border: 1px solid ${themeColors.black.color};
  
  &:hover {
    cursor: pointer;
  }
  &[data-active = "true"]{
    background-color: ${({ $color }) => $color };
    color: ${themeColors.white.color};
    border: 1px solid  ${({ $color }) => $color };
  }
`;

const NoCenterHorizontalReverse = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-top: 1%;
  width: 82%;
`;

function Detail_Visitory({ $color, chipColor, marketName }) {

  const {marketId} = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("전체");
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const reqIdRef = useRef(0);

  const normalize = (arr = []) =>
    arr.map((x, i) => ({
      id: x?.tmiId ?? `noid-${i}`,
      title: String(x?.title ?? "").trim() || "제목 없음",
      content: String(x?.content ?? "").trim() || "내용 없음",
      category: String(x?.category ?? "").trim() || "카테고리 없음",
    }));

const getTmiCategory = async(marketId, categoryChip) => {
  const serverKey = CATEGORY_TO_SERVER[categoryChip] ?? categoryChip;
  const urlCat = `https://kihari.shop/tmi/market/${marketId}/category/${encodeURIComponent(serverKey)}`;

  const { data } = await axios.get(urlCat, { timeout: 20000 });
  const raw = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
  return normalize(raw);
};
  
  useEffect(() => {
    let canceled = false;
    const myReqId = ++reqIdRef.current;
    
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const list = await getTmiCategory(marketId, category );
          if (canceled || myReqId !== reqIdRef.current) return;
          setItems(list);
        } catch (e) {
          if (canceled || myReqId !== reqIdRef.current) return;
          console.error("데이터 로드 실패:", e?.message, e?.response?.data);
          setErr("게시글을 불러오지 못했습니다.");
        } finally {
          if (canceled || myReqId !== reqIdRef.current) return;
          setLoading(false);
        }
      })();
      return () => { canceled = true; };
    }, [marketId,category]);
  

  if (loading) return <>불러오는 중...</>;
  if (err)     return <>{err}</>;

  return(
    <>
      <TopBoard $color={$color}>비지토리 게시판</TopBoard>
      <BottomBoard>
        <CateChip_Container> 
            {TMICATEGORY.map((c) => (
              <CateChip 
                $color={$color}
                key={c} 
                data-active={category === c} 
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
              >
                {c}
              </CateChip>              
            ))}
        </CateChip_Container>
        
        <ThisTmi>
          <ScrollBar>
            { !loading && !err && items.map((p) => (
              <TmiCard 
                key={p.id}
                title={p.title}
                content={p.content}
                chipColor={chipColor}
                category={p.category}
                onClick ={()=> navigate(`/records/${p.id}`)}
                $color={$color}
                
              />
          ))}
          </ScrollBar>
        </ThisTmi>
        <NoCenterHorizontalReverse>

          <Detail_Tmi_Btn $color={$color}
          onClick={() =>
              navigate("/add", {
                state: {
                  prefillPlaceId: Number(marketId),
                  prefillPlaceName: marketName || "",
                },
              })
            }
          />
        </NoCenterHorizontalReverse>
        </BottomBoard>
    </>
  )
}

export default Detail_Visitory;