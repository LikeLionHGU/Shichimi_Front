import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";

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