import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../../assets/styles/StyledComponents";

const Tmi_box= styled.div`
  display: flex;
  
`;

const GrayTmiBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  margin-top: 3%;
  border: 1px solid  ${({ $color }) => $color };
  border-radius: 10px;
  background-color:  ${({ $color }) => $color };
  width: 10vw;
  height: 6vh;
  color: ${themeColors.white.color};
  font-weight: bold;
  font-size: 1vw;

  &:hover{
    cursor: pointer;
    box-shadow: 0 1px 0 ${themeColors.black.color};
  } 
`;



function Main_Tmi_btn ({$color}) {
  return (
    <>
      <Tmi_box>
        <GrayTmiBtn $color={$color} as={Link} to="/add" style={{textDecoration: "none"}}>
          <p>비지토리 작성하기</p>
        </GrayTmiBtn>
      </Tmi_box>
    </>
  )
}

export default Main_Tmi_btn;