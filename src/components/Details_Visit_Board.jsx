import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
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
  width: 13vw;
  height: 4vh;

  background-color: ${themeColors.blue.color};
  color: ${themeColors.white.color};
  font-size: 1.3vw;

`;
const BottomBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  /* 곧 없앨거 */
  border: 1px solid ${themeColors.black.color}; 

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 43vw;
  height: 60vh;
`;

const ThisTmi = styled.div`
  display: flex;

  width: 43vw;
  height: 50vh;
  margin: 10% 2% 0 5%;
`;


function Detail_Visitory() {
  return(
    <>
      <TopBoard>비지토리 게시판</TopBoard>
      <BottomBoard>
        <ThisTmi>
          <ScrollBar>
            {[...Array(10)].map((i) => (
              <TmiCard key={i}/>
          ))}
          </ScrollBar>
        </ThisTmi>
        <Detail_Tmi_Btn/>
      </BottomBoard>
    </>
  )
}

export default Detail_Visitory;