import React, { useEffect } from "react";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import InvoiceForm from "./InvoiceForm";
import { PageTitles } from "../config/constants";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { setInvoiceHistory, setAuth } from "../redux/reducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, #f12711, #f5af19);
  min-height: 100vh;
  width: 100vw;
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
`;

const HomeTitle = styled.h1`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  user-select: none;
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

const HomePage = ({ setInvoiceHistory, setAuth }) => {
  const navigate = useNavigate();
  const invoiceCollectionRef = collection(db, "invoice-items-list");

  const onLogout = () => {
    setAuth(false);
    navigate("/login", { replace: true });
  };

  const onHistory = () => {
    navigate("/history", { replace: true });
  };

  const getInvoices = async () => {
    const data = await getDocs(invoiceCollectionRef);
    const invoiceData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setInvoiceHistory(invoiceData);
  };

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line
  }, []);

  return (
    <HomeWrapper>
      <HomeHeader>
        <HistoryIcon onClick={onHistory} />
        <HomeTitle>{PageTitles.HOME}</HomeTitle>
        <LogoutIcon onClick={onLogout} />
      </HomeHeader>
      <InvoiceForm />
    </HomeWrapper>
  );
};

const mapDispatchToProps = {
  setInvoiceHistory: setInvoiceHistory,
  setAuth: setAuth,
};

export default connect(null, mapDispatchToProps)(HomePage);
