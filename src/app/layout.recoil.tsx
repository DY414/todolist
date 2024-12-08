"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { Global, css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

const GlobalStyle = () => (
  <Global
    styles={css`
      body {
        width: 100%;
        min-height: 100vh;
        background-color: #F6F6F6;
        display: flex;
        justify-content: center;
      }
    `}
  />
);


const LayoutRecoil = ({ children }: Props) => {
  return (<>
    <GlobalStyle />
    <RecoilRoot>{children}</RecoilRoot>
  </>)
};

export default LayoutRecoil;
