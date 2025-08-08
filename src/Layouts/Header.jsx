import React from "react";
import {Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { themeColors  } from "../assets/styles/StyledComponents";



const Header = () => {
  return(
    <>
      <header>
        <div>
          <Link to='/'>Logo</Link>
        </div>
      </header>
    </>
  );
};

export default Header;