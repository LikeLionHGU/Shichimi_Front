import React, {useEffect , useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../assets/styles/StyledComponents";

import Map_svg from "../assets/images/Map_Container.svg";
import Map_name from "../assets/images/Map_Name_Container.svg"

import fish from "../assets/images/Frame 6.svg";
import crab from "../assets/images/Frame 35.svg";

const MapContainer = styled.div`
  position: relative;
  display: block;
`;
const MapImg = styled.img`
  display:block;
  position: relative;
  z-index: 0;
  width: 40vw;
  height: auto;
`;

const Map_Name = styled.img`
  display: flex;
  margin: 2% 0 1.5% 4%;
  width: 37vw;
  height: auto;
`;

/* 가로로 1~5열 */
const Row_icon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 8%;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
`;

const Store_btn = styled.button`
  width: 5vw;
  height: 3vh;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  };
`;

const Store_icon = styled.img`
  width: auto;
  height: auto;

`;
const Store_name = styled.div`
  margin-top: 1%;
`;

function Map () {
  return (
    <>
      <MapContainer>
        <Map_Name src={Map_name} alt="MAPNAME"/>
        <Row_icon>
          <Store_btn>
            <Store_icon src={crab} alt="어시장1"/>
            <Store_name>포항대게</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={crab} alt="어시장2"/>
            <Store_name>영광회대게센타</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={fish} alt="어시장3"/>
            <Store_name>승리회맛집</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={fish} alt="어시장4"/>
            <Store_name>동양횟집</Store_name>
          </Store_btn>
        </Row_icon>
        <MapImg src={Map_svg} alt="MAPIMG"/>
        
      </MapContainer>
    </>
  )
}

export default Map;