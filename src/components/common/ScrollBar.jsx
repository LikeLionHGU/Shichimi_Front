import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { themeColors } from "../../assets/styles/StyledComponents";

const Scroll_bar = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  gap: 10px;
  
  &::-webkit-scrollbar-thumb {
    background: rgba(158,158,158,0.7);
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-button {display: none;}
`;

function ScrollBar({children}){
  return (
    <>
      <Scroll_bar>{children}</Scroll_bar>
    </>
  )
};

export default ScrollBar;