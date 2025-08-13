import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../../assets/styles/StyledComponents";

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

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 23vw;
  height: 60vh;
`;



function Details_History() {
  return(
    <>
      <TopBoard>가게 히스토리</TopBoard>
      <BottomBoard>


      </BottomBoard>
    </>
  )
}

export default Details_History;