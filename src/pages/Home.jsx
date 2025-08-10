import React, {useEffect , useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../assets/styles/StyledComponents";

import MapComponents from "../components/MapComponents";
import PopularContainer from "../components/PopularContainer";
import MainTmi_btn from "../components/common/Tmi_btn";

const Page = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9%;
`;

const Left_Coponent = styled.div`
  flex: 0 0 auto;
  margin-left: 12%;
`;

const Right_Coponent = styled.div`
  flex: 0 0 40vw;
  margin-right: 9%;
  margin-top: 2%;
`;

function Home () {
  return (
    <>
      <Page>
        <Left_Coponent>
          <MapComponents/>
        </Left_Coponent>
        <Right_Coponent>
          <PopularContainer/>
          <MainTmi_btn/>
        </Right_Coponent>
      </Page>
    </>
  )
}

export default Home;