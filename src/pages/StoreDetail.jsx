import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import Hist_Board from "../components/Details_hist_Board";
import Visit_Board from "../components/Details_Visit_Board";

// const BackgroundPageImg = styled.img`
//   height: auto;
//   min-height: 100%;
//   padding-bottom: 200px;
// `; 

const TotalPage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7%;
`;

const Detail_Left = styled.div`
  flex: 0 0 auto;
  margin-left: 12%;
  margin-top: 10%;
`;

const Detail_Right = styled.div`
  flex: 0 0 40vw;
  margin-right: 9%;
  margin-top: 10%;
`;

function StoreDetail(){
  return(
    <>
      <TotalPage>
        <Detail_Left>
          <Hist_Board />
        </Detail_Left>
        
        <Detail_Right>
          <Visit_Board />
        </Detail_Right>
      </TotalPage>
    </>
  );
};

export default StoreDetail;