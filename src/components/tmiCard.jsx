import React, {useEffect , useState } from "react";
import styled from "styled-components";
import {Link, NavLink } from "react-router-dom";

const Card =styled.div`
  display: block;

  h3{
    font-size: 0.8vw;
    font-weight: 800;
  }

  p{
    font-size: 0.8vw;
    font-weight: 400;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover{
    mix-blend-mode: multiply;
  }

`;


function TmiCard() {
  return (
    <>
      <Card>
        <h3>이 상점에 등록된 글의 제목</h3>
        <p>ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
      </Card>
    </>
  )
};

export default TmiCard;