import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";
import { hexToRgba } from "../components/Details_Tops";

const Card =styled.div`
  display: block;
  background-color: ${({ $color }) => hexToRgba($color, 0.1)};
  border-radius: 8px;
  width: 90%;

  h3{
    margin: 2% 5% 1% 2%;
    font-size: 0.8vw;
    font-weight: 800;
  }

  p{
    margin: 2% 5% 2% 2%;
    font-size: 0.8vw;
    font-weight: 400;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover{
    background-color: ${({ $color }) => hexToRgba($color, 0.3)};
    cursor: pointer;
  }

`;
const TMICATEGORY = ["전체","썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"];

const CateChip = styled.button`
  border-radius: 9999px;
  padding: 1% 2%;
  font-size: 0.8vw;
  background-color: ${themeColors.white.color};
  border: 1px solid ${themeColors.black.color};
  
  &:hover {
    cursor: pointer;
  }
  &[data-active = "true"]{
    background-color: ${({ $color }) => $color };
    color: ${themeColors.white.color};
    border: 1px solid  ${({ $color }) => $color };
  }
`;



function TmiCard({title, content, onClick, $color}) {
  return (
    <>
      <Card onClick={onClick} $color={$color} >
        <h3>{title}</h3>
        <p>{content}</p>
      </Card>
    </>
  )
};

export default TmiCard;