import React from "react";
import {Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { themeColors  } from "../assets/styles/StyledComponents";

import MainLogo from "../assets/images/Group 141.svg";

const NoCenterHorizontal = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 1.5% 0 1% 12%;
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


const Header = () => {
  return(
    <>
      <NoCenterHorizontal>
        <LogoBtn>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <img src={MainLogo} alt="LOGO" />
          </Link>
        </LogoBtn>
      </NoCenterHorizontal>
    </>
  );
};

export default Header;