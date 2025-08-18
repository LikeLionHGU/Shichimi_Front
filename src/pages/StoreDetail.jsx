import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";
import {useParams} from "react-router-dom";

import NextDoor_Board from "../components/Detail_NextDoor";
import Tops_Board from "../components/Details_Tops";
import Hist_Board from "../components/Details_Hist_Board";
import Visit_Board from "../components/Details_Visit_Board";
import crab from "../assets/images/Frame 35.svg";

import Ex from "../assets/images/Back01.svg";
import { getMarketInfo } from "../server/apis/api";

const TotalPage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7%;

  margin-top: -5%;
  padding-top: 4.5%;
  padding-bottom: 5%;

  min-height: 100vh;
  background:
  linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${({ $bg }) => $bg});
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Detail_Left = styled.div`
  flex: 0 0 auto;
  margin-left: 12%;
`;

const Detail_Right = styled.div`
  flex: 0 0 40vw;
  margin-right: 9%;
  margin-top: 7%;
`;

const StoreTitle = styled.div`
  display: flex;
  margin: 5% 0 7% 0;
`;

const StoreTitle_left_icon = styled.div`
  width: 5vw;
  height: 9vh;
  
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border-radius: 15px 0 0 15px;
  background-color: ${themeColors.white.color};
  border: none;

`;
const StoreTitle_right_name = styled.div`
  width: auto;
  height: 9vh;
  padding: 0 4%;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  font-size: 1.4vw;
  border-radius: 0 15px 15px 0;
  background-color: ${({ $color }) => $color };   
  color: ${themeColors.white.color};
  border: none;
`;

function StoreDetail(){
  const {marketId} = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    (async() => {
      try{
        const res = await getMarketInfo(marketId);
        
        if(!alive) return
          setData(res);
      }catch(e){
        console.error("API 호출 실패:",e?.message, e?.response?.data);
        if(alive) setErr("가게의 상세 정보를 불러오지 못했습니다.");
      }finally{
        if(alive) setLoading(false);
      }
    })();
    return () => {alive = false};
  }, [marketId]);

  if (loading) return <>불러오는 중...</>;
  if (err)     return <>{err}</>;

  const {
    name= "",
    phoneNumber= "",
    address="",
    openTime= "",
    marketLogo="",
    foodMenuImg="",
    color = themeColors.blue?.color,
  } = data ?? {};

  // console.log('api color:', color);

  return(
    <>
      <TotalPage $bg ={foodMenuImg}>
        <Detail_Left>
          <StoreTitle>
            <StoreTitle_left_icon><img src={marketLogo} alt="ICON" /></StoreTitle_left_icon>
            <StoreTitle_right_name $color={color}>{name}</StoreTitle_right_name>
          </StoreTitle>

          <Hist_Board />
          <Tops_Board />
        </Detail_Left>
        
        <Detail_Right>
          <Visit_Board />
          <NextDoor_Board />
        </Detail_Right>
      </TotalPage>
    </>
  );
};

export default StoreDetail;