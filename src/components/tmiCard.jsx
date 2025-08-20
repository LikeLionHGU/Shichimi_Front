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
const CateChip = styled.button`
  border-radius: 9999px;
  padding: 1% 2%;
  font-size: 0.8vw;
  background-color: ${themeColors.white.color};
  border: 1px solid ${({ $chipColor }) => $chipColor };
  
`;



function TmiCard({title, content, onClick, $color, $chipColor, category}) {
  return (
    <>
      <Card onClick={onClick} $color={$color} >
        <h3>{title}<CateChip $chipColor={$chipColor}>{category}</CateChip></h3>
        <p>{content}</p>
      </Card>
    </>
  )
};

export default TmiCard;