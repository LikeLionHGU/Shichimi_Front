import React from "react";
import {Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { themeColors  } from "../assets/styles/StyledComponents";

const NoCenterHorizontal = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${themeColors.gray.color};
  height: 84px;
`;

const LogoImg = styled.button`
  display : flex;
  align-items : center;
  margin: 0 0 0 88px;
`;


const Header = () => {
  return(
    <>
      <header>
        <NoCenterHorizontal>
          <LogoImg>
            <Link to='/'>Logo</Link>
          </LogoImg>
        </NoCenterHorizontal>
      </header>
    </>
  );
};

export default Header;