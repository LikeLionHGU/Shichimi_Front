import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import ScrollBar from "./common/ScrollBar";
import TmiCard from "./tmiCard";

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



function Detail_Visitory() {
  return(
    <>
      <TopBoard>비지토리 게시판</TopBoard>
      <BottomBoard>
        <ScrollBar>
          {[...Array(10)].map((i) => (
            <TmiCard key={i}/>
        ))}


        </ScrollBar>
      </BottomBoard>
    </>
  )
}

export default Detail_Visitory;