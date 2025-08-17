import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";
import { useNavigate } from "react-router-dom";


const TopBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 5.5%;

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
  flex-direction: column;

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 43vw;
  height: 40vh;
`;

function NextDoor_Board (){
  return (
    <>
      <TopBoard>옆집 이야기</TopBoard>
      <BottomBoard>

      </BottomBoard>
    </>
  )
}

export default NextDoor_Board;