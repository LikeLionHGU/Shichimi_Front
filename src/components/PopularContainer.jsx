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
  margin: 4% 3% 3% 3%;
  gap: 10px;
`;

const Mini_icon = styled.img`
  width: 29px;
  height: 29px;
  flex: 0 0 auto;
`;

const Mini_Text =styled.h2`
  margin: 0;

  font-weight: 800;
  line-height: 1;
  color: ${themeColors.black.color};
`;

// const DividerLine = styled.div`
//   height: 1px;
//   background-color: ${themeColors.gray.color};
//   width: 92%;
//   margin: 1% 4% 0 4%;
// `;

const SectionPost = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  /* border-bottom: 1px solid ${themeColors.gray.color}; */
  padding: 0 4% 0 4%;

  &:hover {
    background-color: #F27533;

  }

  h3 {
    margin: 2% 0 1% 0;
    font-weight: 600;
    line-height: 1;
    color: ${themeColors.black.color};
  
    
  }

  p {
    margin: 1% 0 2% 0;
    display: block;
    align-self: stretch;
    font-weight: 600;
    line-height: 1;
    color: ${themeColors.black.color};
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


function SectionTitle({leftIcon, rightIcon, alt, children}) {
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
          <SectionPost>
            <h3>인기글 제목 와랄ㄹ라</h3>
            <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          </SectionPost>
          {/* <DividerLine/> */}
          <SectionPost>
            <h3>인기글 제목 와랄ㄹ라</h3>
            <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          </SectionPost>

          <SectionTitle leftIcon={row2Left} rightIcon={row2Right} alt="중요">
            가장 널리 퍼진 이야기 (좋아요 1등)
          </SectionTitle>
          <SectionPost>
            <h3>인기글 제목 와랄ㄹ라</h3>
            <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          </SectionPost>
          <SectionPost>
            <h3>인기글 제목 와랄ㄹ라</h3>
            <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          </SectionPost>

          <SectionTitle leftIcon={row3Left} rightIcon={row3Right} alt="대박">
            가장 최근 게시된 이야기
          </SectionTitle>
          <SectionPost>
            <h3>인기글 제목 와랄ㄹ라</h3>
            <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          </SectionPost>
          <SectionPost>
            <h3>인기글 제목 와랄ㄹ라</h3>
            <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
          </SectionPost>

        </Bottom_PopContainer>
      </Pop_Box>
    </>
  )
}

export default PopularContainer;