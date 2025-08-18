import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink, useParams } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import Ex from "../assets/images/Back01.svg";
import axios from "axios";


const TopBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  border-radius: 12px 12px 0 0 ;
  width: 11vw;
  height: 4vh;
  padding: 0.5% 0;

  background-color: ${themeColors.blue.color};
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
  width: 23vw;
  height: 62vh;
`;

const HistImg = styled.img`
  display: flex;
  
  width: 90%;
  margin-top:5% ;
  margin-bottom:5% ;  
  border: 2px solid black;
  border-radius: 10px;
`;

const HistText = styled.div`
  width: 90%;
  height: auto;
  p{
    font-size: 0.8vw;
  }
`

function Details_History() {

  const {marketId} = useParams();
  const [marketURL, setMarketURL] = useState(null);
  const [history, setHistory] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const getHistory = async() => {

    const res = await axios.get(`https://kihari.shop/market/info/${encodeURIComponent(marketId)}`, { timeout: 20000 });

    const {data} = res;

    console.log("요청 URL:", res.request?.responseURL);
    console.log("응답:",res.data);

    const text =  (typeof data?.history === "string" && data.history.trim()) || "히스토리 없음";
    const img =  (typeof data?.marketURL === "string" &&  data.marketURL.trim()) || "";

    return {text,img};
  };

  useEffect(()=> {
    let alive = true;
    (async()=>{
      try{
        const {text, img} = await getHistory();
        if(!alive) return
          setHistory(text);
          setMarketURL(img);
        
      }catch(e) {
        console.error("API 호출 실패:",e?.message, e?.response?.data);
        if(alive) {setErr ("히스토리 정보를 불러오지 못했습니다."); setHistory("");}
      }finally{
        if(alive) setLoading(false)
      }
    })();
    return () => {alive = false};
  }, [marketId]);

  if (loading) return <>불러오는 중...</>;
  if (err)     return <>{err}</>;

  return(
    <>
      <TopBoard>가게 히스토리</TopBoard>
      <BottomBoard>
        <HistImg src={marketURL } alt ="가게 이미지"/>
        <HistText>
          (AI가 들려주는 가게 이야기)
          <p>{history}</p>
        </HistText>
      </BottomBoard>
    </>
  )
}

export default Details_History;