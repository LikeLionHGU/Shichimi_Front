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
  border: 1px solid ${themeColors.gray.color};
  border-radius: 16px;
  background-color: ${themeColors.gray.color};
  width: 15vw;
  height: 6vh;
  color: ${themeColors.black.color};
  font-weight: bold;
  font-size: 1vw;

  &:hover{
    cursor: pointer;
    box-shadow: 0 2px 0 ${themeColors.black.color};
  } 
`;



function Main_Tmi_btn () {
  return (
    <>
      <Tmi_box>
        <GrayTmiBtn as={Link} to="/add" style={{textDecoration: "none"}}>
          <p>비지토리 작성하기</p>
        </GrayTmiBtn>
      </Tmi_box>
    </>
  )
}

export default Main_Tmi_btn;