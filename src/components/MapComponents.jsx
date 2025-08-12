import React, {useEffect , useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../assets/styles/StyledComponents";

import Map_svg from "../assets/images/Map_Container.svg";
import Map_name from "../assets/images/Map_Name_Container.svg"

import fish from "../assets/images/Frame 6.svg";
import crab from "../assets/images/Frame 35.svg";
import car from "../assets/images/Frame 9.svg";
import rice from "../assets/images/Frame 3.svg";
import pan from "../assets/images/Frame 11.svg";
import apple from "../assets/images/Frame 13.svg";
import cabbage from "../assets/images/Frame 14.svg";
import soup from "../assets/images/Frame 15.svg";
import squid from "../assets/images/Frame 26.svg";
import cup from "../assets/images/Frame 36.svg";
import noodle from "../assets/images/Frame 37.svg";
import { Link } from "react-router-dom";



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

const Map_Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  img{
    position: absolute;
    margin: 2% 0 3% 0;
    width: 36vw;
    height: auto;
  }

  h2{
    position: relative;
    font-size: 1.5vw;
    font-weight: 800;
  }
`;

// const Map_Name = styled.img`
//   display: flex;
//   position: absolute;
//   margin: 2% 0 1.5% 5%;
//   width: 36vw;
//   height: auto;
// `;

// const Map_Name_Text = styled.h2`
//   display: block;
//   position: relative;

//   font-size: 1.8vw;
//   font-weight: 800;
// `;

const Store_btn = styled(Link).attrs(props => ({
  to: `/${props.id}`
}))`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 6vw;
  height: 3vh;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  };
`;

const Store_icon = styled.img`
  width: 2.3vw;
  height: auto;
`;

const Store_name = styled.div`
  margin-top: 3%;
  font-size: 0.8vw;
`;

/* 가로로 1~5열 */
const Row1_icon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;

  top: 16%;
  left: 4%;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
`;

const Row2_icon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;

  top: 37%;
  left: 4%;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
`;

const Row3_icon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;

  top: 53%;
  left:4%;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
`;

const Row4_icon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;

  top: 71%;
  left: 4%;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
`;

const Row5_icon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;

  top: 90%;
  left:4%;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
`;

function Map () {
  return (
    <>
      <MapContainer>
        <Map_Top>
          <img src={Map_name} alt="MAPNAME"/>
          <h2>죽도시장 지도</h2>
        </Map_Top>
        {/* <Map_Name src={Map_name} alt="MAPNAME"/>  
        <Map_Name_Text>죽도시장 시장</Map_Name_Text> */}
        <Row1_icon>
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
          <Store_btn>
            <Store_icon src={car} alt="주차장1"/>
            <Store_name>죽도시장 P</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={car} alt="주차장2"/>
            <Store_name>죽도어시장 P</Store_name>
          </Store_btn>
        </Row1_icon>

        <Row2_icon>
          <Store_btn>
            <Store_icon src={rice} alt="어시장1"/>
            <Store_name>대화식당</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={fish} alt="어시장2"/>
            <Store_name>삼일과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={fish} alt="어시장3"/>
            <Store_name>미소과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={fish} alt="어시장4"/>
            <Store_name>골드과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={squid} alt="주차장1"/>
            <Store_name>은아건어물</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={apple} alt="주차장2"/>
            <Store_name>포원청과</Store_name>
          </Store_btn>
        </Row2_icon>

        <Row3_icon>
          <Store_btn>
            <Store_icon src={rice} alt="어시장1"/>
            <Store_name>대화식당</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={fish} alt="어시장2"/>
            <Store_name>삼일과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={squid} alt="어시장3"/>
            <Store_name>미소과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={squid} alt="어시장4"/>
            <Store_name>골드과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={squid} alt="주차장1"/>
            <Store_name>은아건어물</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={apple} alt="주차장2"/>
            <Store_name>포원청과</Store_name>
          </Store_btn>
        </Row3_icon>

        <Row4_icon>
          <Store_btn>
            <Store_icon src={cup} alt="어시장1"/>
            <Store_name>대화식당</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={soup} alt="어시장2"/>
            <Store_name>삼일과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={soup} alt="어시장3"/>
            <Store_name>미소과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={soup} alt="어시장4"/>
            <Store_name>골드과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={soup} alt="주차장1"/>
            <Store_name>은아건어물</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={cabbage} alt="주차장2"/>
            <Store_name>포원청과</Store_name>
          </Store_btn>
        </Row4_icon>

        <Row5_icon>
          <Store_btn>
            <Store_icon src={noodle} alt="어시장1"/>
            <Store_name>대화식당</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={pan} alt="어시장2"/>
            <Store_name>삼일과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={pan} alt="어시장3"/>
            <Store_name>미소과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={pan} alt="어시장4"/>
            <Store_name>골드과메기</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={pan} alt="주차장1"/>
            <Store_name>은아건어물</Store_name>
          </Store_btn>
          <Store_btn>
            <Store_icon src={cabbage} alt="주차장2"/>
            <Store_name>포원청과</Store_name>
          </Store_btn>
        </Row5_icon>

        <MapImg src={Map_svg} alt="MAPIMG"/>
        
      </MapContainer>
    </>
  )
}

export default Map;