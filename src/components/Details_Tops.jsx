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
  margin-top: 10%;

  border-radius: 12px 12px 0 0 ;
  width: 11vw;
  height: 4vh;

  padding: 0.5% 0;
  background-color: ${themeColors.blue.color};
  color: ${themeColors.white.color};
  font-size: 1.1vw;

`;
const BottomBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;

  background-color: ${themeColors.white.color};
  border-radius: 0 12px 12px 12px ;
  width: 23vw;
  height: 40vh;
`;

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
    color: ${themeColors.white.color};
  }

  h3 {
    margin: 2% 0 1% 0;
    font-size: 0.85vw;
    font-weight: 600;
    line-height: 1;
  }

  p {
    margin: 1% 0 2% 0;

    font-size: 0.7vw;
    display: block;
    align-self: stretch;
    font-weight: 600;
    line-height: 1;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Details_Tops({posts = []}) {
  
  const navigate = useNavigate();
  const top3 = posts.slice(0, 3);

  return(
    <>
      <TopBoard>인기글 TOP 3</TopBoard>
      <BottomBoard>
        {top3.map((post) => (
          <SectionPost
            key={post.id}
            onClick={()=> {
              navigate(`/records/${post.id}`);
            }}
            >
              <h3>{post.title || "제목 없음"}</h3>
              <p>{post.content || "내용 없음"}</p>
            </SectionPost>
        ))}
      </BottomBoard>
    </>
  )
}

export default Details_Tops;