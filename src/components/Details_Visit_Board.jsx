import React, {useEffect , useState } from "react";
import { get, Api } from "../server/apis/api";
import axois from 'axios';
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

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 43vw;
  height: 60vh;
`;

/* TMI 게시판 CARD 전체 Box */
const ThisTmi = styled.div`
  display: flex;
  width: 43vw;
  height: 50vh;
  margin: 0 2% 0 5%;
`;

/* 카테고리 설정 - 근데 아직 색상 선정 XXXX!!!  */

const TMICATEGORY = ["전체","썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"];

const CateChip_Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 40vw;
  gap: 8px;
  flex-wrap: wrap;
  margin: 10% 0 3% 2%
`;

const CateChip = styled.button`
  border-radius: 9999px;
  padding: 1% 2%;
  font-size: 0.8vw;

  &:hover {
    cursor: pointer;
    background-color: ${themeColors.blue.color};
    color: ${themeColors.white.color};
    border: 1px solid ${themeColors.blue.color};
  }
`;


function Detail_Visitory() {

  const [category, setCategory] = useState("");

  return(
    <>
      <TopBoard>비지토리 게시판</TopBoard>
      <BottomBoard>
        <CateChip_Container> 
            {TMICATEGORY.map((c) => (
              <CateChip key={c} 
                data-active={category === c} 
                onClick={() => setCategory((prev)=> prev === c ? "" : c)}
              >
                {c}
              </CateChip>              
            ))}
        </CateChip_Container>
        
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