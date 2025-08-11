import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../../assets/styles/StyledComponents";

const Tmi_box= styled.div`
  display: flex;
`;

const TmiBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 3%;
  border: 1px solid ${themeColors.red.color};
  border-radius: 16px;
  background-color: ${themeColors.red.color};
  width: 23vw;
  height: 7vh;
  color: ${themeColors.white.color};
  font-weight: bold;
  font-size: large;

  &:hover{
    cursor: pointer;
    box-shadow: 0 2px 0 ${themeColors.gray.color};
  } 
`;


function Main_Tmi_btn () {
  return (
    <>
      <Tmi_box>
        <TmiBtn as={Link} to="/add" style={{textDecoration: "none"}}>
          <p>비지토리 작성</p>
        </TmiBtn>
      </Tmi_box>
    </>
  )
}

export default Main_Tmi_btn;