import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import NextDoor_Board from "../components/Detail_NextDoor";
import Tops_Board from "../components/Details_Tops";
import Hist_Board from "../components/Details_Hist_Board";
import Visit_Board from "../components/Details_Visit_Board";
import crab from "../assets/images/Frame 35.svg";

import Ex from "../assets/images/Back01.svg";

const TotalPage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7%;

  margin-top: -5%;
  padding-top: 4.5%;
  padding-bottom: 5%;

  min-height: 100vh;
  background:
  linear-gradient(0deg,rgba(0,0,0,0.35),rgba(0,0,0,0.35)),url(${Ex});
  
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
  width: 8vw;
  height: 9vh;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  font-size: 1.4vw;
  border-radius: 0 15px 15px 0;
  background-color: ${themeColors.blue.color};
  color: ${themeColors.white.color};
  border: none;
`;

function StoreDetail(){
  return(
    <>
      <TotalPage>
        <Detail_Left>
          <StoreTitle>
            <StoreTitle_left_icon><img src={crab} alt="ICON" /></StoreTitle_left_icon>
            <StoreTitle_right_name>포항대게</StoreTitle_right_name>
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