import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";

const Card =styled.div`
  display: block;
  background-color: #ECF0ED;
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
    background-color: #C4D7DB;
    cursor: pointer;
  }

`;


function TmiCard() {
  return (
    <>
      <Card>
        <h3>이 상점에 등록된 글의 제목</h3>
        <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
      </Card>
    </>
  )
};

export default TmiCard;