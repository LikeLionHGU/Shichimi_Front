import React, {useEffect , useState } from "react";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

const Pop_Box= styled.div`
  display: block;
`;

const Top_PopContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${themeColors.red.color};
  border: 1px solid ${themeColors.red.color};
  border-radius: 16px 16px 0 0;
  width: 23vw;
  height: 10vh;
`;

const Bottom_PopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  border: 2px solid ${themeColors.black.color};
  border-top: none;
  border-radius: 0 0 16px 16px;
  width: 23vw;
  height: 55vh;
`;


function PopularContainer () {
  return (
    <>
      <Pop_Box>
        <Top_PopContainer>
        </Top_PopContainer>
        <Bottom_PopContainer>
          <p>안녕하세요</p>
          <p>안녕하세요</p>
          <p>안녕하세요</p>
        </Bottom_PopContainer>
      </Pop_Box>
    </>
  )
}

export default PopularContainer;