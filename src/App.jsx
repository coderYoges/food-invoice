import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./login/Login";

const App = ({ isAuthenticated }) => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<div />} />

    <Route
      path="/"
      element={isAuthenticated ? <div /> : <Navigate replace to="/login" />}
    />
  </Routes>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
