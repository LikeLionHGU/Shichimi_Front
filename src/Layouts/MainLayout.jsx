import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';


const DefaultLayout = styled.main`
  background-color: transparent;
`;

const MainLayout = () => {
  return (
    <>
      <Header/>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  );
};

export default MainLayout;