import React from "react";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import InvoiceForm from "./InvoiceForm";
import { PageTitles } from "../config/constants";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, #f12711, #f5af19);
  min-height: 100vh;
  width: 100vw;
  font-family: "Roboto", sans-serif;
`;

const HomeTitle = styled.h1`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  user-select: none;
  margin: 0;
`;

const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #000;
  height: fit-content;
  align-items: center;
`;

const LogoutIcon = styled(MdLogout)`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const HistoryIcon = styled(FaHistory)`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const HomePage = () => {
  return (
    <HomeWrapper>
      <HomeHeader>
        <HistoryIcon />
        <HomeTitle>{PageTitles.HOME}</HomeTitle>
        <LogoutIcon />
      </HomeHeader>
      <InvoiceForm />
    </HomeWrapper>
  );
};

export default HomePage;
