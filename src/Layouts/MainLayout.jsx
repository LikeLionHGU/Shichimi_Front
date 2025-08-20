import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import { GlobalStyle } from '../assets/styles/StyledComponents';

const DefaultLayout = styled.main`
  background: #fffdf5;
  
`;

const MainLayout = () => {
  return (
    <>
      <GlobalStyle/>
        <Header/>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      
    </>
  );
};

export default MainLayout;