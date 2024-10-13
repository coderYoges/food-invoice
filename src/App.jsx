import React, { Fragment } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./login/Login";
import HomePage from "./home/Home";
import ReviewPage from "./review/Review";
import HistoryPage from "./history/History";

const App = ({ isAuthenticated }) => (
  <Routes>
    {isAuthenticated ? (
      <React.Fragment>
        <Route path="/home" element={<HomePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </React.Fragment>
    ) : (
      <Fragment>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<Navigate replace to="/login" />} />
        <Route path="/review" element={<Navigate replace to="/login" />} />
      </Fragment>
    )}
    <Route path="*" element={<Navigate replace to="/home" />} />
  </Routes>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
