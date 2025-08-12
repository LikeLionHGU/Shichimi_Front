import React from "react";
import {Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { themeColors  } from "../assets/styles/StyledComponents";

const NoCenterHorizontal = styled.div`
  display: flex;
  align-items: center;
  margin: 3% 0 0 10%;
`;

const LogoImg = styled.button`
  display : flex;
  align-items : center;
  width: 100px;
  height: 40px;
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