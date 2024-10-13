import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import { PageTitles } from "../config/constants";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { setInvoiceHistory, setAuth } from "../redux/reducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import DatePicker from "react-datepicker";

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

const BackIcon = styled(IoArrowBackSharp)`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  padding: 3rem 1.5rem;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 1rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  padding-bottom: 1.5rem;
`;

const HistoryCmpt = ({ setInvoiceHistory, setAuth, invoiceHistory }) => {
  const [searchedWord, setSearchedWord] = useState("");
  const [searchedDate, setSearchedDate] = useState("");

  const navigate = useNavigate();
  const invoiceCollectionRef = collection(db, "invoice-items-list");

  const onLogout = () => {
    setAuth(false);
    navigate("/login", { replace: true });
  };

  const onBack = () => {
    navigate("/home", { replace: true });
  };

  const resetValues = () => {
    setSearchedDate("");
    setSearchedWord("");
  };

  const getInvoices = async () => {
    const data = await getDocs(invoiceCollectionRef);
    const invoiceData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setInvoiceHistory(invoiceData);
  };

  const isFilteredData = searchedDate || searchedWord

  const filteredData = isFilteredData
    ? invoiceHistory.filter(
        (invoice) => 
          invoice?.customerName?.toLowerCase()?.includes(searchedWord?.toLowerCase()) &&
          invoice.functionDate === searchedDate
      )
    : invoiceHistory;

  const arrangedData = filteredData.reduce(
    (r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  );

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <HomeWrapper>
        <HomeHeader>
          <BackIcon onClick={onBack} />
          <HomeTitle>{PageTitles.HISTORY}</HomeTitle>
          <LogoutIcon onClick={onLogout} />
        </HomeHeader>
        <SearchBarWrapper>
          <div className="input-group uf-input-group input-group-lg mb-3">
            <input
              type="text"
              name="searchInput"
              className="form-control"
              placeholder="Customer Name"
              autoComplete="off"
              maxLength={20}
              onChange={(e) => setSearchedWord(e.target.value)}
            />
            <DatePicker
              selected={searchedDate}
              className="form-control date-picker"
              onChange={(date) =>
                setSearchedDate(new Date(date).toJSON().slice(0, 10))
              }
              placeholderText="Select by Date"
            />
            <div className="history-wrapper" onClick={resetValues}>
              <RxReset className="history-icon-style" />
            </div>
          </div>
        </SearchBarWrapper>
        {arrangedData.map((subArray, indexing) => {
          return (
            <div
              class="card-group mx-4 my-3 gap-4"
              key={"invoice-row-" + indexing}
            >
              {subArray.map((item, index) => {
                return (
                  <div class="card" key={"invoice-column" + index}>
                    <div class="card-body">
                      <h5 class="card-title">{item.customerName}</h5>
                      <p class="card-text text-secondary">
                        {item.customerLocality +
                          " , " +
                          item.customerCity +
                          " , " +
                          item.customerPinCode}
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{item.functionName}</li>
                      <li class="list-group-item">{item.totalPrice}</li>
                      <li class="list-group-item">{item.functionDate}</li>
                    </ul>
                    {/* <div class="card-footer">
                      <small class="text-muted">{item.functionDate}</small>
                    </div> */}
                  </div>
                );
              })}
            </div>
          );
        })}
      </HomeWrapper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  invoiceHistory: state.auth.invoiceHistory,
});

const mapDispatchToProps = {
  setInvoiceHistory: setInvoiceHistory,
  setAuth: setAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCmpt);
