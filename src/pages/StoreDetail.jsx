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
import { useNavigate } from "react-router-dom";


const BgFixed = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  &::before{
    content: "";
    position: absolute;
    inset: 0;
    background:
    linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url(${({ $bg }) => $bg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  
    filter: blur(8px);
    transform: scale(1.05);
    z-index: 0;
  }

`;

const TotalPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 55vw;          
  grid-template-areas:
    "header header"
    "left   right";
  column-gap: 3%;
  align-items: start;
  
  margin-top: -5%;
  padding: 4.5% 0 5%;

  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const DetailHeader = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  margin-top: 2%;
  margin-left: 12.5%;
  margin-bottom: 2%; 
`;

const Detail_Left = styled.div`
  grid-area: left;
  margin-left: 30%;
`;

const Detail_Right = styled.div`
  grid-area: right;
`;


const StoreTitle = styled.div`
  display: flex;
  width: auto;
`;

const StoreTitle_left_icon = styled.div`
  height: 9vh;
  width: 5vw;
  padding: 0 9%;
  
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border-radius: 11px 0 0 11px;
  background-color: ${themeColors.white.color};
  border: none;
  img{
    transform: scale(0.8);
  }
`;
const StoreTitle_right_name = styled.div`
  width: auto;
  height: 9vh;
  padding: 0 6%;

  white-space: nowrap;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  font-size: 1.4vw;
  border-radius: 0 11px 11px 0;
  background-color: ${({ $color }) => $color };   
  color: ${themeColors.white.color};
  border: none;
`;

const StoreInfo = styled.div`
  display: flex;
  gap: 1%;
  width: auto;
  flex-direction: column;
  margin-left: 6%;
  h3{
    color: ${themeColors.white.color};
    margin: 0;
    font-size: 0.8vw;
    font-weight: 400;
    white-space: nowrap;
    line-height: 1.8;
  }
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
        console.log(res);
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
    info="",
    openTime= "",
    marketLogo="",
    foodMenuImg="",
    color = themeColors.blue?.color,
    raw = {},
  } = data ?? {};

  const chipColor = data?.chipColor ?? raw?.chipColor ?? "";

  const isFeeCase = Number(marketId) === 4; 
  const thirdLabel = isFeeCase ? "이용요금" : "전화번호";
  const thirdValue = isFeeCase ? (info || "-") : (phoneNumber || "-");

  console.log('api color:', chipColor);

  return(
    <>
      <BgFixed $bg ={foodMenuImg}/>
        <TotalPage >
          <DetailHeader>
            <StoreTitle>
              <StoreTitle_left_icon><img src={marketLogo} alt="ICON" /></StoreTitle_left_icon>
              <StoreTitle_right_name $color={color}>{name}</StoreTitle_right_name>
            </StoreTitle>
            <StoreInfo>
              <h3>운영시간  {openTime}</h3>
              <h3>가게주소  {address}</h3>
              <h3>{thirdLabel}  {thirdValue}</h3>
            </StoreInfo>            
          </DetailHeader>
          
          <Detail_Left>
            <Hist_Board $color={color}/>
            <Tops_Board $color={color} />
          </Detail_Left>

          <Detail_Right>
          <Visit_Board $color={color} chipColor={chipColor} marketName={name} />            <NextDoor_Board $color={color} />
          </Detail_Right>
        </TotalPage>
    </>
  );
};

export default StoreDetail;