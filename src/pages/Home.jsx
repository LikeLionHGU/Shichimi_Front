import React, {useEffect , useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../assets/styles/StyledComponents";
import Likes from "../components/Likes";



function Home () {
  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}

export default function Home() {
  return (
    <main className="p-6">
      <LikeButton />
    </main>
  );
}
