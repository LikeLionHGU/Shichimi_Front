import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";

import Detail_Tmi_Btn from "../components/common/detail_Tmi_btn";



function StoreDetail(){
  return(
    <>
      <h1>Store Detail Page</h1>
      <Detail_Tmi_Btn />
    </>
  );
};

export default StoreDetail;