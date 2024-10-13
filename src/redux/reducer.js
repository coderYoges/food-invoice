import { createSlice } from "@reduxjs/toolkit";
import { InvoiceInitialValues } from "../config/yup-config";

export const AuthInitialState = {
  isAuthenticated: false,
  invoiceCurrentItems: { ...InvoiceInitialValues, selectedItems: {} },
  invoiceHistory: []
};

const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    setAuth: (state, action) => ({
      ...state,
      isAuthenticated: action.payload,
    }),
    setInvoice: (state, action) => ({
      ...state,
      invoiceCurrentItems: action.payload,
    }),
    resetInvoice: (state) => ({
      ...state,
      invoiceCurrentItems: { ...InvoiceInitialValues, selectedItems: {} },
    }),
    setInvoiceHistory : (state, action) => ({
      ...state,
      invoiceHistory: action.payload
    })
  },
});

export const { setAuth, setInvoice, resetInvoice, setInvoiceHistory } = authSlice.actions;

export default authSlice.reducer;
