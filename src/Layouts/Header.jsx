import React from "react";
import {Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { themeColors  } from "../assets/styles/StyledComponents";

import MainLogo from "../assets/images/Group 141.svg";

const NoCenterHorizontal = styled.header`
  position: relative;
  /* top: 0;
  left: 0;
  right: 0; */
  z-index: 10;
  display: flex;
  align-items: center;
  /* padding: 1.5% 0 1% 12%; */
  padding-left: 12%;
  padding-top: 1%;
  height: 72px;
  background: transparent !important;
`;

const LogoBtn = styled.button`
  display : flex;
  align-items : center;
  
  background-color: transparent;
  border: none;
  width: 100px;
  height: 40px;
`;

const LogoImg = styled.img`
  height: 38px;     
  width: auto;
  transform: scale(0.9);
  display: block;    
  object-fit: contain;
`;

const Header = () => {
  return(
    <>
      <NoCenterHorizontal>
        <LogoBtn>
          {/* <Link to='/' style={{ textDecoration: 'none' }}>
            <img src={MainLogo} alt="LOGO" />
          </Link> */}
          <Link to='/' style={{ textDecoration: 'none' }}>
          <LogoImg src={MainLogo} alt="LOGO" />
        </Link>
        </LogoBtn>
      </NoCenterHorizontal>
    </>
  );
};

export default Header;