import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TopBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 5%;

  border-radius: 12px 12px 0 0 ;
  padding: 0.5% 0;
  width: 8vw;
  height: 4vh;

  background-color:${({ $color }) => $color };
  color: ${themeColors.white.color};
  font-size: 1.1vw;

`;
const BottomBoard = styled.div`
  display: flex;
  flex-direction: row;

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 43vw;
  height: 40vh;
`;

const ThisTmi = styled.div`
  display: flex;
  width: 43vw;
  height: 45vh;
  margin: 0 1.5%;
  gap: 2%;
`;

const NextPost = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2%;
  height: auto;

  &:hover{
    cursor: pointer;
  }

  img{
    display: flex;
    width: 13vw;
    height: 40%;
    margin: 4% 0 4% 3%;
    border: 2px solid black;
    border-radius: 10px;
  }
  h2{
    margin: 2% 0 2% 3%;
    font-size: 1.1vw;
    font-weight: bold;
    color: ${({$color}) => $color};
  }
  h3{
    margin: 2% 0 2% 3.2%;
    font-size: 0.9vw;
    font-weight: bold;
  }
  p{
    margin: 0 0 4% 3.5%;
    font-size: 0.8vw;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`


function NextDoor_Board ({$color}){

  const {marketId} = useParams();
  const navigate = useNavigate();

  const [nexts, setNexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const ABS = /^https?:\/\//i;
  const BASE = "https://kihari.shop";
  
  const toAbs = (u) => {
    const s = String(u ?? "").trim();
    if (!s) return null;
    if (ABS.test(s)) return s;
    const slash = s.startsWith("/") ? "" : "/";
    return `${BASE}${slash}${s}`;
  };

  const normalize = (arr = []) =>
    arr.map((x, i) => ({
      id: x?.tmiId ?? `noid-${i}`,
      name: String(x?.name ?? "").trim() || "이름 없음",
      title: String(x?.title ?? "").trim() || "제목 없음",
      text: String(x?.text ?? "").trim() || "내용 없음",
      marketImg: toAbs(x?.marketImg ?? x?.imageUrl),
    }));

  const getNextPost = async(marketId) => {
    const {data} = await axios.get(`https://kihari.shop/market/neighbors/${encodeURIComponent(marketId)}`, {timeout:20000});
    return normalize(data);
  };

  useEffect(() => {
    let alive = true;
    (async() => {
      try{
        const res = await getNextPost(marketId);
        console.log(res);
        if(!alive) return
          setNexts(res);
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


  return (
    <>
      <TopBoard $color={$color}>옆집 이야기</TopBoard>
      <BottomBoard>
        <ThisTmi>
          {nexts.map((n)=>(
            <NextPost
              key={n.id}
              onClick={()=> navigate(`records/${n.id}`)}
              $color={$color}
            >
              <img src={n.marketImg} alt="옆집"/>
              <h2 >{n.name}</h2>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </NextPost>
          ))}
        </ThisTmi>
        
      </BottomBoard>
    </>
  )
}

export default NextDoor_Board;
