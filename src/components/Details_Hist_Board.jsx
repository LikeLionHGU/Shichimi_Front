import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink, useParams } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import Ex from "../assets/images/Back01.svg";
import axios from "axios";
import { getMarketInfo } from "../server/apis/api";


const TopBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  border-radius: 12px 12px 0 0 ;
  width: 9.5vw;
  height: 4vh;
  padding: 0.5% 0;

  background-color:  ${({ $color }) => $color };
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
  width: 25vw;
  height: 63vh;
  padding-bottom: 0.5%;
`;

const HistImg = styled.img`
  display: flex;
  

  transform: scale(0.98);
  width: 90%;
  margin-top:4% ;
  margin-bottom:2.5% ;  
  border: 2px solid black;
  border-radius: 10px;
`;

const HistText = styled.div`
  width: 90%;
  height: auto;
  p{
    margin-top: 2%;
    font-size: 0.8vw;

    line-height: 1.5;
  }
`

function Details_History({$color}) {

  const {marketId} = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(()=> {
    let alive = true;
    (async()=>{
      try{
        const res = await getMarketInfo(marketId);
        
        if(!alive) return
          setData(res);
      }catch(e) {
        console.error("API 호출 실패:",e?.message, e?.response?.data);
        if(alive) setErr ("히스토리 정보를 불러오지 못했습니다.");
      }finally{
        if(alive) setLoading(false)
      }
    })();
    return () => {alive = false};
  }, [marketId]);

  if (loading) return <>불러오는 중...</>;
  if (err)     return <>{err}</>;

  const {
    history="",
    marketImg="",
  } = data ?? {};
  
  
  return(
    <>
      <TopBoard $color={$color}>가게 히스토리</TopBoard>
      <BottomBoard>
        <HistImg src={marketImg } alt ="가게 이미지"/>
        <HistText>
          AI가 들려주는 가게 이야기
          <p>{history}</p>
        </HistText>
      </BottomBoard>
    </>
  )
}

export default Details_History;