import React from "react";
import {Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { themeColors  } from "../assets/styles/StyledComponents";

import MainLogo from "../assets/images/Group 141.svg";

const NoCenterHorizontal = styled.div`
  display: flex;
  align-items: center;
  margin: 3% 0 0 12%;
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
      <header>
        <NoCenterHorizontal>
          <LogoBtn>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <img src={MainLogo} alt="LOGO" />
            </Link>
          </LogoBtn>
        </NoCenterHorizontal>
      </header>
    </>
  );
};

export default Header;