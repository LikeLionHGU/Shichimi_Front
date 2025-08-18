import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { getMarketInfo } from "../server/apis/api";

export function hexToRgba(hex, alpha = 1) {
  let r = 0, g = 0, b = 0;
  hex = hex.replace('#', '');
  
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const TopBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 10%;

  border-radius: 12px 12px 0 0 ;
  width: 11vw;
  height: 4vh;

  padding: 0.5% 0;
  background-color: ${({ $color }) => $color };
  color: ${themeColors.white.color};
  font-size: 1.1vw;

`;
const BottomBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 23vw;
  height: 40vh;
`;

const ThisTmi = styled.div`
  display: flex;
  flex-direction: column;
  width: 23vw;
  height: 40vh;
  margin-top: 3%;
`;

const SectionPost = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2% 4% 1% 4%;
  
  min-height: 8vh;
  border-bottom: 1px solid ${hexToRgba(themeColors.gray.color, 0.5)} ;
  color: ${themeColors.black.color};

  &:hover{
    cursor: pointer;
    background-color: ${({ $color }) => hexToRgba($color, 0.3)} ;
    border-radius: 8px ;
    border-bottom: 1px solid  ${({ $color }) => hexToRgba($color, 0.1)}  ;  
  }

  h3{
    margin: 3% 0 1% 3%;
    font-size: 0.85vw;
    font-weight: 600;
    line-height: 1;
  }

  p {
    margin: 1% 0 2% 3%;

    font-size: 0.7vw;
    display: block;
    align-self: stretch;
    font-weight: 600;
    line-height: 1;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Details_Tops({p = []}) {

  const {marketId} = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [color, setColor] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);


  const normalize = (arr = []) =>
    arr.map((x, i) => ({
      id: x?.tmiId ?? `noid-${i}`,
      title: String(x?.title ?? "").trim() || "제목 없음",
      content: String(x?.content ?? "").trim() || "인기글 내용 없음",
    }));

  const getMarketPop = async(marketId) => {
    const {data} = await axios.get(`https://kihari.shop/market/topTmi/${encodeURIComponent(marketId)}`, {timeout:20000});
    return normalize(data);
  };

  useEffect(() => {
    let alive = true;
    (async() => {
      try{
        const [popRes, infoRes] = await Promise.all([
          getMarketPop(marketId),
          getMarketInfo(marketId, {select: (d) => ({color: d.color})}),
        ]);
        if(!alive) return
          setPosts(popRes);
          setColor(infoRes.color);
      }catch(e){
        console.error("API 호출 실패:",e?.message, e?.response?.data);
        if(alive) setErr("인기글 정보를 불러오지 못했습니다.");
      }finally{
        if(alive) setLoading(false);
      }
    })();
    return () => {alive = false};
  }, [marketId]);

  if (loading) return <>불러오는 중...</>;
  if (err)     return <>{err}</>;



  return(
    <>
      <TopBoard $color={color}>인기글 TOP 3</TopBoard>
      <BottomBoard>
        <ThisTmi>
          {posts.map((post) => (
            <SectionPost 
              key={post.id} 
              onClick={() => navigate(`/records/${post.id}`)}
              $color={color}
            >
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </SectionPost>
            ))
          }
      </ThisTmi>
      </BottomBoard>
    </>
  )
}

export default Details_Tops;