import React, {useEffect , useState } from "react";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import row3Left from "../assets/images/Group 94.svg"
import row3Right from "../assets/images/Group 95.svg"
import row1Left from "../assets/images/Group 96.svg"
import row1Right from "../assets/images/Group 97.svg"
import row2Left from "../assets/images/Group 117.svg"
import row2Right from "../assets/images/Group 118.svg"

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

const Mini_title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Mini_icon = styled.img`
  width: 29px;
  height: 29px;
  flex: 0 0 auto;
`;

const Mini_Text =styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  color: ${themeColors.black.color};
`;

function SectionTitle({leftIcon,rightIcon, alt, children}) {
  return(
    <Mini_title>
      <Mini_icon src={leftIcon} alt={alt} />
      <Mini_Text>{children}</Mini_Text>
      <Mini_icon src={rightIcon} alt={alt}/>
    </Mini_title>
  )
}

function PopularContainer () {
  return (
    <>
      <Pop_Box>
        <Top_PopContainer>
          인기글
        </Top_PopContainer>
        
        <Bottom_PopContainer>
          <SectionTitle leftIcon={row1Left} rightIcon={row1Right} alt="핫태">
            가장 널리 퍼진 이야기 (조회수 1등)
          </SectionTitle>

          <SectionTitle leftIcon={row2Left} rightIcon={row2Right} alt="중요">
            가장 널리 퍼진 이야기 (좋아요 1등)
          </SectionTitle>

          <SectionTitle leftIcon={row3Left} rightIcon={row3Right} alt="대박">
            가장 최근 게시된 이야기
          </SectionTitle>

        </Bottom_PopContainer>
      </Pop_Box>
    </>
  )
}

export default PopularContainer;